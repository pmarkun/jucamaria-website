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
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: ProjectType;
  territory: Territory;
  gallery: GalleryImage[];
  featured?: boolean;
  /** Markdown/HTML com equipe e parceiros, gerado pelo WYSIWYG do CMS */
  partners?: string;
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
