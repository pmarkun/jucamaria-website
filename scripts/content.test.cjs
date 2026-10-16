const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const read = name => require(path.join(root, "content", `${name}.json`));
const projects = [require("../content/projects/mangue-das-capivaras.json"), ...read("projects")];
const territories = read("territories");
const categories = read("categories");
const home = read("home");

// Exercise the real local data queries without installing a TypeScript runner.
const filename = path.join(root, "lib/data.ts");
const source = new Module(filename, module);
source.filename = filename;
source.paths = Module._nodeModulePaths(path.dirname(filename));
source.require = id => id.startsWith("@/") ? require(path.join(root, id.slice(2))) : require(id);
source._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText, filename);
const data = source.exports;

test("local content has unique routes and valid project relationships", () => {
  for (const records of [projects, territories, categories]) {
    assert.ok(records.length > 0);
    assert.equal(new Set(records.map(item => item.slug)).size, records.length);
    for (const item of records) assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
  for (const project of projects) {
    assert.ok(project.title && project.description);
    if (project.categorySlug) assert.ok(categories.some(c => c.slug === project.categorySlug));
    assert.ok(territories.some(t => t.slug === project.territorySlug));
  }
});

test("every content image exists locally and no remote media is required", () => {
  const images = [home.logo, home.heroImage, ...territories.map(t => t.image), ...projects.flatMap(p => p.gallery.map(i => i.src))];
  for (const image of images) {
    assert.match(image, /^\/images\//);
    assert.ok(fs.existsSync(path.join(root, "public", image)), image);
  }
  for (const font of ["lora-latin.woff2", "inter-latin.woff2"]) {
    assert.ok(fs.statSync(path.join(root, "public/fonts", font)).size > 0);
  }
});

test("project, territory and category pages use the same local content", async () => {
  assert.deepEqual(await data.getProjects(), projects);
  assert.deepEqual(await data.getFeaturedProjects(), projects.filter(p => p.featured));
  assert.equal(await data.getProjectBySlug("does-not-exist"), undefined);
  assert.equal(await data.getCategoryBySlug("does-not-exist"), undefined);
  for (const project of projects) assert.deepEqual(await data.getProjectBySlug(project.slug), project);
  for (const category of categories) assert.deepEqual(await data.getProjectsByCategorySlug(category.slug), projects.filter(p => p.categorySlug === category.slug));
  for (const territory of territories) assert.deepEqual(await data.getProjectsByTerritorySlug(territory.slug), projects.filter(p => p.territorySlug === territory.slug));
  assert.deepEqual(await data.getHomePage(), home);
});

test("related projects require a real shared territory or category", async () => {
  for (const project of projects) {
    for (const related of await data.getRelatedProjects(project)) {
      assert.notEqual(project.slug, related.slug);
      assert.ok((project.categorySlug && project.categorySlug === related.categorySlug) || (project.territorySlug && project.territorySlug === related.territorySlug));
    }
  }
  assert.deepEqual(await data.getRelatedProjects({ slug: "no-relations", categorySlug: null, territorySlug: null }), []);
  assert.equal((await data.getRelatedProjects({ slug: "new", territorySlug: territories[0].slug }, 0)).length, 0);
});

test("Mangue das Capivaras is discoverable in Florianópolis and literature", async () => {
  const project = await data.getProjectBySlug("mangue-das-capivaras");
  assert.ok(project);
  assert.ok((await data.getProjectsByTerritorySlug("florianopolis")).some(p => p.slug === project.slug));
  assert.ok((await data.getProjectsByCategorySlug("literatura")).some(p => p.slug === project.slug));
  assert.ok((await data.getFeaturedProjects()).some(p => p.slug === project.slug));
  assert.equal(project.status, "Em desenvolvimento");
  assert.equal(project.startDate, undefined);
  assert.equal(project.endDate, undefined);
  assert.ok(project.sections.every(section => section.id && section.title && section.paragraphs.length));
  assert.equal(new Set(project.sections.map(section => section.id)).size, project.sections.length);
  assert.ok((await data.getRelatedProjects(project)).some(p => p.slug === "laboratorio-passarinho"));
});
