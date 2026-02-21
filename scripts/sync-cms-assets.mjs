import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const CMS_DIR = path.join(PUBLIC_DIR, "_cms");
const ASSETS_DIR = path.join(CMS_DIR, "assets");

function getBasePath() {
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isUserOrOrgPagesRepo = repoName.endsWith(".github.io");
  if (isGithubActions && repoName && !isUserOrOrgPagesRepo) {
    return `/${repoName}`;
  }
  return "";
}

const BASE_PATH = getBasePath();

async function readEnvFile(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    const out = {};
    for (const line of raw.split("\n")) {
      const clean = line.trim();
      if (!clean || clean.startsWith("#")) continue;
      const idx = clean.indexOf("=");
      if (idx === -1) continue;
      const key = clean.slice(0, idx).trim();
      const value = clean.slice(idx + 1).trim().replace(/^['\"]|['\"]$/g, "");
      out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

async function getStrapiUrl() {
  if (process.env.NEXT_PUBLIC_STRAPI_URL) return process.env.NEXT_PUBLIC_STRAPI_URL;
  const envLocal = await readEnvFile(path.join(process.cwd(), ".env.local"));
  if (envLocal.NEXT_PUBLIC_STRAPI_URL) return envLocal.NEXT_PUBLIC_STRAPI_URL;
  const env = await readEnvFile(path.join(process.cwd(), ".env"));
  return env.NEXT_PUBLIC_STRAPI_URL ?? null;
}

function toAbsolute(url, strapiUrl) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${strapiUrl}${url}`;
}

function toAssetPath(absUrl) {
  const parsed = new URL(absUrl);
  const rawExt = path.extname(parsed.pathname).toLowerCase();
  const ext = rawExt || ".bin";
  const hash = createHash("sha1").update(absUrl).digest("hex").slice(0, 20);
  return `${BASE_PATH}/_cms/assets/${hash}${ext}`;
}

async function fetchJson(strapiUrl, endpoint) {
  const res = await fetch(`${strapiUrl}${endpoint}`);
  if (!res.ok) return null;
  return res.json();
}

async function download(absUrl, targetPath) {
  const res = await fetch(absUrl);
  if (!res.ok) throw new Error(`Falha ao baixar ${absUrl}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(targetPath, buffer);
}

async function run() {
  const strapiUrl = await getStrapiUrl();
  if (!strapiUrl) {
    console.log("[sync-cms-assets] NEXT_PUBLIC_STRAPI_URL ausente; pulando.");
    return;
  }

  await mkdir(ASSETS_DIR, { recursive: true });

  const [homeRes, projectsRes, territoriesRes] = await Promise.all([
    fetchJson(strapiUrl, "/api/home?populate[heroImage]=true&populate[logo]=true"),
    fetchJson(strapiUrl, "/api/projects?populate[gallery]=true&pagination[pageSize]=200"),
    fetchJson(strapiUrl, "/api/territories?populate[image]=true&pagination[pageSize]=200"),
  ]);

  const mediaUrls = new Set();
  const home = homeRes?.data ?? null;
  const homeLogoUrl = toAbsolute(home?.logo?.url ?? null, strapiUrl);
  const homeHeroUrl = toAbsolute(home?.heroImage?.url ?? null, strapiUrl);

  if (homeLogoUrl) mediaUrls.add(homeLogoUrl);
  if (homeHeroUrl) mediaUrls.add(homeHeroUrl);

  for (const project of projectsRes?.data ?? []) {
    for (const image of project.gallery ?? []) {
      const abs = toAbsolute(image?.url, strapiUrl);
      if (abs) mediaUrls.add(abs);
    }
  }

  for (const territory of territoriesRes?.data ?? []) {
    const abs = toAbsolute(territory?.image?.url, strapiUrl);
    if (abs) mediaUrls.add(abs);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    basePath: BASE_PATH,
    items: {},
    home: {
      logo: null,
      heroImage: null,
    },
  };

  for (const absUrl of mediaUrls) {
    const assetWebPath = toAssetPath(absUrl);
    const relativeFile = assetWebPath.replace(`${BASE_PATH}/_cms/assets/`, "");
    const targetPath = path.join(ASSETS_DIR, relativeFile);

    if (!existsSync(targetPath)) {
      await download(absUrl, targetPath);
    }

    manifest.items[absUrl] = assetWebPath;
  }

  manifest.home.logo = homeLogoUrl ? manifest.items[homeLogoUrl] ?? null : null;
  manifest.home.heroImage = homeHeroUrl ? manifest.items[homeHeroUrl] ?? null : null;

  await writeFile(path.join(CMS_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`[sync-cms-assets] ${mediaUrls.size} assets sincronizados.`);
}

run().catch(async (err) => {
  console.warn("[sync-cms-assets] erro, seguindo sem cache local:", err.message);
  const fallback = {
    generatedAt: new Date().toISOString(),
    basePath: BASE_PATH,
    items: {},
    home: { logo: null, heroImage: null },
  };
  await mkdir(CMS_DIR, { recursive: true });
  await writeFile(path.join(CMS_DIR, "manifest.json"), JSON.stringify(fallback, null, 2));
});
