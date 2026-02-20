const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  longDescription?: string | null;
  publishedAt: string;
}

export interface StrapiTerritory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  phrase: string;
  image?: StrapiMedia | null;
  publishedAt: string;
}

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  type?: string | null;
  territory?: string | null;
  category?: Pick<StrapiCategory, "name" | "slug"> | null;
  territoryRelation?: Pick<StrapiTerritory, "name" | "slug"> | null;
  featured?: boolean;
  partners?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  gallery?: StrapiMedia[] | null;
  publishedAt: string;
}

export interface StrapiMethodItem {
  id: number;
  title: string;
  description: string;
}

export interface StrapiHome {
  id: number;
  documentId: string;
  heroTitle: string;
  heroSubtitle?: string | null;
  heroImage?: StrapiMedia | null;
  logo?: StrapiMedia | null;
  methods?: StrapiMethodItem[] | null;
  publishedAt: string;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

async function strapiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText} — ${url.toString()}`);
  }

  return res.json() as Promise<T>;
}

export function mediaUrl(media: StrapiMedia | null | undefined): string | null {
  if (!media) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

export async function fetchProjects(params?: Record<string, string>): Promise<StrapiProject[]> {
  try {
    const response = await strapiGet<StrapiListResponse<StrapiProject>>("/projects", {
      "populate[gallery]": "true",
      "populate[category]": "true",
      "populate[territoryRelation]": "true",
      "pagination[pageSize]": "100",
      ...params,
    });
    return response.data;
  } catch {
    const response = await strapiGet<StrapiListResponse<StrapiProject>>("/projects", {
      "populate[gallery]": "true",
      "pagination[pageSize]": "100",
      ...params,
    });
    return response.data;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<StrapiProject | null> {
  try {
    const response = await strapiGet<StrapiListResponse<StrapiProject>>("/projects", {
      "filters[slug][$eq]": slug,
      "populate[gallery]": "true",
      "populate[category]": "true",
      "populate[territoryRelation]": "true",
    });
    return response.data[0] ?? null;
  } catch {
    const response = await strapiGet<StrapiListResponse<StrapiProject>>("/projects", {
      "filters[slug][$eq]": slug,
      "populate[gallery]": "true",
    });
    return response.data[0] ?? null;
  }
}

export async function fetchFeaturedProjects(): Promise<StrapiProject[]> {
  return fetchProjects({ "filters[featured][$eq]": "true" });
}

export async function fetchProjectsByCategorySlug(slug: string): Promise<StrapiProject[]> {
  try {
    return await fetchProjects({ "filters[category][slug][$eq]": slug });
  } catch {
    return [];
  }
}

export async function fetchProjectsByTerritorySlug(slug: string): Promise<StrapiProject[]> {
  return fetchProjects({ "filters[territoryRelation][slug][$eq]": slug });
}

export async function fetchCategories(): Promise<StrapiCategory[]> {
  try {
    const response = await strapiGet<StrapiListResponse<StrapiCategory>>("/categories", {
      "sort": "name:asc",
      "pagination[pageSize]": "100",
    });
    return response.data;
  } catch {
    return [];
  }
}

export async function fetchCategoryBySlug(slug: string): Promise<StrapiCategory | null> {
  try {
    const response = await strapiGet<StrapiListResponse<StrapiCategory>>("/categories", {
      "filters[slug][$eq]": slug,
    });
    return response.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchHome(): Promise<StrapiHome | null> {
  try {
    const response = await strapiGet<{ data: StrapiHome }>("/home", {
      "populate[heroImage]": "true",
      "populate[logo]": "true",
      "populate[methods]": "true",
    });
    return response.data ?? null;
  } catch {
    return null;
  }
}

export async function fetchTerritories(): Promise<StrapiTerritory[]> {
  const response = await strapiGet<StrapiListResponse<StrapiTerritory>>("/territories", {
    "populate[image]": "true",
    "sort": "name:asc",
  });
  return response.data;
}

export async function fetchTerritoryBySlug(slug: string): Promise<StrapiTerritory | null> {
  const response = await strapiGet<StrapiListResponse<StrapiTerritory>>("/territories", {
    "filters[slug][$eq]": slug,
    "populate[image]": "true",
  });
  return response.data[0] ?? null;
}
