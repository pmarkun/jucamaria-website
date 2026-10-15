import { localizedPath, useLanguage } from "@/lib/i18n";
import NextLink from "next/link";
import Link from "@/components/LocalizedLink";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import home from "@/content/home.json";

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/territorios", label: "Territórios" },
  { href: "/c/residencias", label: "Residências" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const { t, language, asset } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const logoUrl = home.logo ? asset(home.logo) : null;
  const router = useRouter();
  const [switchPath, setSwitchPath] = useState(router.asPath.split(/[?#]/)[0]);

  useEffect(() => {
    setSwitchPath(router.asPath);
  }, [router.asPath]);

  return (
    <header
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      className="sticky top-0 z-50 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[#D8D3CA]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center leading-none group min-w-[170px]">
          {logoUrl ? (
            <div className="relative h-10 w-[180px] max-w-[45vw]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Juca Maria"
                className="absolute inset-0 w-full h-full object-contain object-left"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <span
                style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                className="text-lg font-semibold text-[#2B2B2B] group-hover:text-[#C65A3A] transition-colors"
              >
                Juca Maria
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C65A3A] font-medium">
                {t("Cultura · Arte · Educação")}
              </span>
            </div>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#2B2B2B] hover:text-[#C65A3A] transition-colors font-medium"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <nav aria-label={t("Idioma")} className="flex gap-2 text-sm shrink-0">
            {(["pt", "en"] as const).map((locale) => (
              <NextLink
                key={locale}
                href={localizedPath(switchPath, locale)}
                hrefLang={locale === "pt" ? "pt-BR" : "en"}
                lang={locale === "pt" ? "pt-BR" : "en"}
                aria-label={locale === "pt" ? "Português" : "English"}
                aria-current={language === locale ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`p-2 ${language === locale ? "font-bold text-[#C65A3A] underline underline-offset-4" : "text-[#555] hover:underline"}`}
              >
                {locale.toUpperCase()}
              </NextLink>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-1"
            aria-label={t(menuOpen ? "Fechar menu" : "Abrir menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`block w-6 h-0.5 bg-[#2B2B2B] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#2B2B2B] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#2B2B2B] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-[#D8D3CA] bg-[#FAFAF7]">
          <nav id="mobile-navigation" className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-[#2B2B2B] hover:text-[#C65A3A] transition-colors font-medium"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
