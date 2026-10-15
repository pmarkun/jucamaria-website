const assert = require("node:assert/strict");
const { test } = require("node:test");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

function basePath(settings) {
  const env = { ...process.env };
  for (const key of ["GITHUB_ACTIONS", "GITHUB_REPOSITORY", "SITE_BASE_PATH"]) delete env[key];
  const result = spawnSync(process.execPath, ["--input-type=module", "-e",
    'import config from "./next.config.mjs"; console.log(JSON.stringify(config.basePath))',
  ], { cwd: path.resolve(__dirname, ".."), env: { ...env, ...settings }, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("local development and account Pages use the root", () => {
  assert.equal(basePath({}), "");
  assert.equal(basePath({ GITHUB_ACTIONS: "true", GITHUB_REPOSITORY: "pmarkun/pmarkun.github.io" }), "");
});

test("project Pages default to the repository prefix", () => {
  assert.equal(basePath({ GITHUB_ACTIONS: "true", GITHUB_REPOSITORY: "pmarkun/jucamaria-website" }), "/jucamaria-website");
});

test("a custom domain respects the empty base path from configure-pages", () => {
  assert.equal(basePath({ GITHUB_ACTIONS: "true", GITHUB_REPOSITORY: "pmarkun/jucamaria-website", SITE_BASE_PATH: "" }), "");
  assert.equal(basePath({ GITHUB_ACTIONS: "true", GITHUB_REPOSITORY: "pmarkun/jucamaria-website", SITE_BASE_PATH: "/custom" }), "/custom");
});
