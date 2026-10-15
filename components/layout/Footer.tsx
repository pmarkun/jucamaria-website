import { useLanguage } from "@/lib/i18n";
import Link from "@/components/LocalizedLink";

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/territorios", label: "Territórios" },
  { href: "/c/residencias", label: "Residências" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
      className="bg-[#2B2B2B] text-[#F2EFE8]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Mini-manifesto */}
          <div className="md:col-span-1">
            <div
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-xl font-semibold mb-3"
            >
              Juca Maria
            </div>
            <p className="text-sm text-[#D8D3CA] leading-relaxed mb-4">
              {t("Não levamos cultura.")}<br />
              {t("Construímos situações para ela existir.")}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/jucamariaorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D8D3CA] hover:text-[#E7B53E] transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="mailto:contato@jucamaria.org"
                className="text-[#D8D3CA] hover:text-[#E7B53E] transition-colors text-sm"
              >
                {t("E-mail")}
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C65A3A] font-medium mb-4">
              {t("Navegação")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#D8D3CA] hover:text-[#F2EFE8] transition-colors"
                >
                  {t(link.label)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C65A3A] font-medium mb-4">
              {t("Institucional")}
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-[#D8D3CA]">
                {t("Juca Maria — Cultura, Arte e Educação")}
              </span>
              <span className="text-sm text-[#D8D3CA]">{t("Associação Civil")}</span>
              <Link
                href="/sobre#transparencia"
                className="text-sm text-[#D8D3CA] hover:text-[#F2EFE8] transition-colors mt-2"
              >
                {t("Transparência")}
              </Link>
              <a
                href="mailto:contato@jucamaria.org"
                className="text-sm text-[#D8D3CA] hover:text-[#F2EFE8] transition-colors"
              >
                contato@jucamaria.org
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3a3a3a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-[#888] ">
            © {new Date().getFullYear()} {t("Juca Maria — Cultura, Arte e Educação.")} {t("Todos os direitos reservados.")}
          </p>
          <p className="text-xs text-[#888]">
            {t("A arte reorganiza o possível.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
