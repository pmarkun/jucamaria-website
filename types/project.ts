export type ProjectType =
  | "arte"
  | "tecnologia"
  | "educacao"
  | "residencia"
  | "oficina"
  | "pesquisa"
  | "outro";

export type Territory = "Florianópolis" | "Atibaia" | "Nordeste" | "Nacional";

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
  type: ProjectType;
  territory: Territory;
  gallery: GalleryImage[];
  featured?: boolean;
  /** Markdown/HTML com equipe e parceiros, gerado pelo WYSIWYG do CMS */
  partners?: string | null;
  /** Data de início do projeto (YYYY-MM-DD) */
  startDate?: string | null;
  /** Data de encerramento do projeto (YYYY-MM-DD) */
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
  methods: MethodItem[];
}

export interface TerritoryData {
  slug: string;
  name: Territory;
  description: string;
  phrase: string;
  image: string;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  arte: "Arte",
  tecnologia: "Tecnologia",
  educacao: "Educação",
  residencia: "Residência",
  oficina: "Oficina",
  pesquisa: "Pesquisa",
  outro: "Outro",
};
