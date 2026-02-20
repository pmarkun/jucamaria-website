import type { Project, TerritoryData, ProjectType, Territory } from "@/types/project";
import {
  fetchProjects,
  fetchProjectBySlug,
  fetchFeaturedProjects,
  fetchProjectsByType,
  fetchProjectsByTerritory,
  fetchTerritories,
  mediaUrl,
  type StrapiProject,
  type StrapiTerritory,
} from "./strapi";

// ---------------------------------------------------------------------------
// Adaptadores: Strapi → tipos internos do site
// ---------------------------------------------------------------------------

function adaptProject(raw: StrapiProject): Project {
  const gallery = (raw.gallery ?? []).map((img) => ({
    src: mediaUrl(img) ?? "",
    alt: img.alternativeText ?? img.caption ?? raw.title,
    caption: img.caption ?? undefined,
  }));

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.longDescription ?? undefined,
    type: raw.type as ProjectType,
    territory: raw.territory as Territory,
    featured: raw.featured ?? false,
    partners: raw.partners ?? undefined,
    gallery,
  };
}

function adaptTerritory(raw: StrapiTerritory): TerritoryData {
  return {
    slug: raw.slug,
    name: raw.name as Territory,
    description: raw.description,
    phrase: raw.phrase,
    image: mediaUrl(raw.image) ?? "/images/placeholders/territorio-placeholder.svg",
  };
}

// ---------------------------------------------------------------------------
// Funções públicas — mesma interface que as páginas já usam
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  const data = await fetchProjects();
  return data.map(adaptProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const data = await fetchProjectBySlug(slug);
  return data ? adaptProject(data) : undefined;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const data = await fetchFeaturedProjects();
  return data.map(adaptProject);
}

export async function getProjectsByType(type: string): Promise<Project[]> {
  const data = await fetchProjectsByType(type);
  return data.map(adaptProject);
}

export async function getProjectsByTerritory(territory: string): Promise<Project[]> {
  const data = await fetchProjectsByTerritory(territory);
  return data.map(adaptProject);
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const all = await fetchProjects();
  return all
    .filter(
      (p) =>
        p.slug !== project.slug &&
        (p.type === project.type || p.territory === project.territory)
    )
    .slice(0, limit)
    .map(adaptProject);
}

export async function getTerritories(): Promise<TerritoryData[]> {
  const data = await fetchTerritories();
  return data.map(adaptTerritory);
}
