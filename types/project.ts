export interface CategoryRef {
  slug: string;
  name: string;
}

export interface TerritoryRef {
  slug: string;
  name: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string | null;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string | null;
  type: string;
  territory: string;
  categorySlug?: string | null;
  territorySlug?: string | null;
  gallery: GalleryImage[];
  featured?: boolean;
  partners?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface MethodItem {
  title: string;
  description: string;
}

export interface HomeData {
  heroTitle: string;
  heroSubtitle: string | null;
  heroImage: string | null;
  logo: string | null;
  methods: MethodItem[];
}

export interface TerritoryData {
  slug: string;
  name: string;
  description: string;
  phrase: string;
  image: string;
}

export interface CategoryData {
  slug: string;
  name: string;
  longDescription?: string | null;
}
