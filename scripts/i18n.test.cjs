const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Load the actual TypeScript helpers using the project's existing compiler.
const filename = path.resolve(__dirname, "../lib/i18n.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const source = new Module(filename, module);
source.filename = filename;
source.paths = Module._nodeModulePaths(path.dirname(filename));
source._compile(compiled, filename);
const { localizedPath, languageFromPath, translate, translateContent, assetPath } = source.exports;

test("static assets respect GitHub Pages base path and localized placeholders", () => {
  assert.equal(assetPath("/images/placeholders/project-placeholder.svg", "/site", "en"), "/site/images/placeholders/en/project-placeholder.svg");
  assert.equal(assetPath("/images/placeholders/project-placeholder.svg", "/site", "pt"), "/site/images/placeholders/project-placeholder.svg");
  assert.equal(assetPath("/site/_cms/photo.jpg", "/site", "en"), "/site/_cms/photo.jpg");
  assert.equal(assetPath("https://example.org/photo.jpg", "/site", "en"), "https://example.org/photo.jpg");
});

test("language selection matches a complete route segment", () => {
  for (const route of ["/en", "/en/", "/en/projetos/", "/en?ref=home", "/en#home"])
    assert.equal(languageFromPath(route), "en");
  for (const route of ["/", "/projetos", "/english", "/enough"])
    assert.equal(languageFromPath(route), "pt");
});

test("switching language preserves project, query and anchor without duplicating prefixes", () => {
  const route = "/projetos/laboratorio-passarinho/?ref=home#galeria";
  assert.equal(localizedPath(route, "en"), `/en${route}`);
  assert.equal(localizedPath(`/en${route}`, "en"), `/en${route}`);
  assert.equal(localizedPath(`/en${route}`, "pt"), route);
  assert.equal(localizedPath("/en?ref=home#top", "pt"), "/?ref=home#top");
  assert.equal(localizedPath("/en/", "pt"), "/");
  for (const url of ["https://example.org", "//example.org", "mailto:hello@example.org", "#top"])
    assert.equal(localizedPath(url, "en"), url);
});

test("Portuguese stays intact and English handles multiline editorial text", () => {
  assert.equal(translate("Projetos", "pt"), "Projetos");
  assert.equal(translate("Projetos", "en"), "Projects");
  assert.equal(translate("Cada território produz\nsua própria linguagem.", "en"), "Every territory develops its own language.");
  assert.equal(translate("Florianópolis", "en"), "Florianópolis");
});

test("content translation preserves identifiers and does not mutate CMS props", () => {
  const original = { title: "Tecnologia", slug: "Tecnologia", gallery: [{ alt: "Territórios", src: "/Territórios.jpg" }], startDate: "2024-04-01", projects: [{ description: "A Juca Maria existe através dos projetos." }] };
  const result = translateContent(original, "en");
  assert.equal(result.title, "Technology");
  assert.equal(result.slug, "Tecnologia");
  assert.equal(result.gallery[0].alt, "Territories");
  assert.equal(result.gallery[0].src, original.gallery[0].src);
  assert.equal(result.startDate, original.startDate);
  assert.equal(result.projects[0].description, "Juca Maria comes to life through its projects.");
  assert.equal(original.title, "Tecnologia");
  assert.equal(translateContent(original, "pt"), original);
});
