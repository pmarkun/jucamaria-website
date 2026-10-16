import { useRouter } from "next/router";
import english from "./translations/en.json";

export type Language = "pt" | "en";

export function languageFromPath(path: string): Language {
  return /^\/en(?:\/|$|[?#])/.test(path) ? "en" : "pt";
}

export function localizedPath(path: string, language: Language): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const stripped = path.replace(/^\/en(?=\/|$|[?#])/, "") || "/";
  const unprefixed = stripped.startsWith("/") ? stripped : `/${stripped}`;
  return language === "en" ? `/en${unprefixed}` : unprefixed;
}

export function assetPath(url: string, basePath: string, language: Language): string {
  if (!url.startsWith("/") || url.startsWith("//")) return url;
  if (basePath && (url === basePath || url.startsWith(`${basePath}/`))) return url;
  const localized = language === "en"
    ? url.replace(/^\/images\/placeholders\/(hero|project-placeholder|territorio-placeholder)\.svg$/, "/images/placeholders/en/$1.svg")
    : url;
  return `${basePath}${localized}`;
}

export function translate(text: string, language: Language): string {
  if (language === "pt") return text;
  const messages: Record<string, string> = english;
  return messages[text] ?? messages[text.replace(/\s+/g, " ").trim()] ?? text;
}

// Only translate editorial fields; URLs, slugs, dates and other identifiers stay stable.
const editorialFields = new Set([
  "title", "name", "description", "longDescription", "type", "territory", "phrase",
  "heroTitle", "heroSubtitle", "alt", "caption", "partners",
  "status", "lead", "label", "value", "paragraphs", "role",
]);

export function translateContent<T>(value: T, language: Language): T {
  if (language === "pt" || !value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(item => translateContent(item, language)) as T;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    editorialFields.has(key) && typeof item === "string"
      ? translate(item, language)
      : editorialFields.has(key) && Array.isArray(item)
        ? item.map(entry => typeof entry === "string" ? translate(entry, language) : translateContent(entry, language))
        : translateContent(item, language),
  ])) as T;
}

export function useLanguage() {
  const router = useRouter();
  const language = languageFromPath(router.asPath);
  return {
    language,
    t: (text: string) => translate(text, language),
    path: (url: string) => localizedPath(url, language),
    asset: (url: string) => assetPath(url, router.basePath, language),
  };
}
