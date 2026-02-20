import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/territorios", label: "Territórios" },
  { href: "/residencias", label: "Residências" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

function getStrapiBaseUrl() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadLogo() {
      try {
        const res = await fetch(`${getStrapiBaseUrl()}/api/home?populate[logo]=true`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const json = await res.json();
        const url = json?.data?.logo?.url as string | undefined;
        if (!url) return;
        setLogoUrl(url.startsWith("http") ? url : `${getStrapiBaseUrl()}${url}`);
      } catch {
        // fallback textual logo
      }
    }
    loadLogo();
    return () => controller.abort();
  }, []);

  return (
    <header
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      className="sticky top-0 z-50 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[#D8D3CA]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center leading-none group min-w-[170px]">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt="Juca Maria"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="flex flex-col">
              <span
                style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                className="text-lg font-semibold text-[#2B2B2B] group-hover:text-[#C65A3A] transition-colors"
              >
                Juca Maria
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C65A3A] font-medium">
                Cultura · Arte · Educação
              </span>
            </div>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#2B2B2B] hover:text-[#C65A3A] transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Abrir menu"
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

      {menuOpen && (
        <div className="md:hidden border-t border-[#D8D3CA] bg-[#FAFAF7]">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-[#2B2B2B] hover:text-[#C65A3A] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
