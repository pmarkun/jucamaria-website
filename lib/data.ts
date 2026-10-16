import type { CategoryData, HomeData, Project, TerritoryData } from "@/types/project";
import homeContent from "@/content/home.json";
import projectContent from "@/content/projects.json";
import territoryContent from "@/content/territories.json";
import categoryContent from "@/content/categories.json";
import mangueDasCapivaras from "@/content/projects/mangue-das-capivaras.json";

const projects: Project[] = [mangueDasCapivaras, ...projectContent];
const territories: TerritoryData[] = territoryContent;
const categories: CategoryData[] = categoryContent;

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find(project => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter(project => project.featured);
}

export async function getProjectsByCategorySlug(slug: string): Promise<Project[]> {
  return projects.filter(project => project.categorySlug === slug);
}

export async function getProjectsByTerritorySlug(slug: string): Promise<Project[]> {
  return projects.filter(project => project.territorySlug === slug);
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  return projects.filter(candidate =>
    candidate.slug !== project.slug && (
      (project.categorySlug && candidate.categorySlug === project.categorySlug) ||
      (project.territorySlug && candidate.territorySlug === project.territorySlug)
    )
  ).slice(0, limit);
}

export async function getTerritories(): Promise<TerritoryData[]> {
  return territories;
}

export async function getCategories(): Promise<CategoryData[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryData | undefined> {
  return categories.find(category => category.slug === slug);
}

export async function getHomePage(): Promise<HomeData> {
  return homeContent;
}
