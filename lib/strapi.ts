/**
 * Cliente para a API do Strapi v5.
 * Base URL configurável via NEXT_PUBLIC_STRAPI_URL (default: http://localhost:1337).
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// ---------------------------------------------------------------------------
// Tipos brutos da API do Strapi v5
// ---------------------------------------------------------------------------

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  type: string;
  territory: string;
  year?: number | null;
  featured?: boolean;
  highlights?: string[] | null;
  credits?: { name: string; role: string }[] | null;
  partners?: string[] | null;
  gallery?: StrapiMedia[] | null;
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

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface StrapiSingleResponse<T> {
  data: T;
  meta: object;
}

// ---------------------------------------------------------------------------
// Fetch helper
// ---------------------------------------------------------------------------

async function strapiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    // next.js revalidation — revalida a cada hora em produção
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText} — ${url.toString()}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Helpers de URL de mídia
// ---------------------------------------------------------------------------

export function mediaUrl(media: StrapiMedia | null | undefined): string | null {
  if (!media) return null;
  const url = media.url;
  // URLs absolutas (CDN externo) ficam como estão
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ---------------------------------------------------------------------------
// Queries de projetos
// ---------------------------------------------------------------------------

export async function fetchProjects(params?: Record<string, string>): Promise<StrapiProject[]> {
  const response = await strapiGet<StrapiListResponse<StrapiProject>>("/projects", {
    "populate[gallery]": "true",
    "pagination[pageSize]": "100",
    "sort": "year:desc",
    ...params,
  });
  return response.data;
}

export async function fetchProjectBySlug(slug: string): Promise<StrapiProject | null> {
  const response = await strapiGet<StrapiListResponse<StrapiProject>>("/projects", {
    "filters[slug][$eq]": slug,
    "populate[gallery]": "true",
  });
  return response.data[0] ?? null;
}

export async function fetchFeaturedProjects(): Promise<StrapiProject[]> {
  return fetchProjects({ "filters[featured][$eq]": "true" });
}

export async function fetchProjectsByType(type: string): Promise<StrapiProject[]> {
  return fetchProjects({ "filters[type][$eq]": type });
}

export async function fetchProjectsByTerritory(territory: string): Promise<StrapiProject[]> {
  return fetchProjects({ "filters[territory][$eq]": territory });
}

// ---------------------------------------------------------------------------
// Queries de territórios
// ---------------------------------------------------------------------------

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
