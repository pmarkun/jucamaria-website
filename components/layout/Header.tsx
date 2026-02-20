import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/territorios", label: "Territórios" },
  { href: "/vivencias", label: "Residências" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      className="sticky top-0 z-50 bg-[#F2EFE8]/95 backdrop-blur-sm border-b border-[#D8D3CA]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-lg font-semibold text-[#2B2B2B] group-hover:text-[#C65A3A] transition-colors"
          >
            Juca Maria
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#C65A3A] font-medium">
            Cultura · Arte · Educação
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile menu button */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#D8D3CA] bg-[#F2EFE8]">
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
