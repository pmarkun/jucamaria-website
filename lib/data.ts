import type { CategoryData, HomeData, Project, TerritoryData } from "@/types/project";
import {
  fetchCategories,
  fetchCategoryBySlug,
  fetchFeaturedProjects,
  fetchHome,
  fetchProjectBySlug,
  fetchProjects,
  fetchProjectsByCategorySlug,
  fetchTerritories,
  mediaUrl,
  type StrapiCategory,
  type StrapiProject,
  type StrapiTerritory,
} from "./strapi";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function adaptProject(raw: StrapiProject): Project {
  const gallery = (raw.gallery ?? []).map((img) => ({
    src: mediaUrl(img) ?? "",
    alt: img.alternativeText ?? img.caption ?? raw.title,
    caption: img.caption ?? null,
  }));

  const territoryName = raw.territoryRelation?.name ?? raw.territory ?? "Sem território";
  const territorySlug = raw.territoryRelation?.slug ?? null;
  const categoryName = raw.category?.name ?? raw.type ?? "Sem categoria";
  const categorySlug = raw.category?.slug ?? null;

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.longDescription ?? null,
    type: categoryName,
    territory: territoryName,
    categorySlug,
    territorySlug,
    featured: raw.featured ?? false,
    partners: raw.partners ?? null,
    startDate: raw.startDate ?? null,
    endDate: raw.endDate ?? null,
    gallery,
  };
}

function adaptTerritory(raw: StrapiTerritory): TerritoryData {
  return {
    slug: raw.slug,
    name: raw.name,
    description: raw.description,
    phrase: raw.phrase,
    image: mediaUrl(raw.image) ?? "/images/placeholders/territorio-placeholder.svg",
  };
}

function adaptCategory(raw: StrapiCategory): CategoryData {
  return {
    slug: raw.slug,
    name: raw.name,
    longDescription: raw.longDescription ?? null,
  };
}

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

export async function getProjectsByCategorySlug(slug: string): Promise<Project[]> {
  const data = await fetchProjectsByCategorySlug(slug);
  return data.map(adaptProject);
}

export async function getProjectsByTerritorySlug(slug: string): Promise<Project[]> {
  const all = await fetchProjects();
  return all
    .filter((p) => p.territoryRelation?.slug === slug || slugify(p.territory ?? "") === slug)
    .map(adaptProject);
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const all = await fetchProjects();
  return all
    .map(adaptProject)
    .filter(
      (p) =>
        p.slug !== project.slug &&
        (p.categorySlug === project.categorySlug || p.territorySlug === project.territorySlug)
    )
    .slice(0, limit);
}

export async function getTerritories(): Promise<TerritoryData[]> {
  const data = await fetchTerritories();
  return data.map(adaptTerritory);
}

export async function getCategories(): Promise<CategoryData[]> {
  const data = await fetchCategories();
  return data.map(adaptCategory);
}

export async function getCategoryBySlug(slug: string): Promise<CategoryData | undefined> {
  const data = await fetchCategoryBySlug(slug);
  return data ? adaptCategory(data) : undefined;
}

export async function getHomePage(): Promise<HomeData | null> {
  const raw = await fetchHome();
  if (!raw) return null;
  return {
    heroTitle: raw.heroTitle,
    heroSubtitle: raw.heroSubtitle ?? null,
    heroImage: mediaUrl(raw.heroImage ?? null) ?? null,
    logo: mediaUrl(raw.logo ?? null) ?? null,
    methods: (raw.methods ?? []).map((m) => ({
      title: m.title,
      description: m.description,
    })),
  };
}
