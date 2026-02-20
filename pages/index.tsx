import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project, TerritoryData, HomeData } from "@/types/project";
import { getFeaturedProjects, getTerritories, getHomePage } from "@/lib/data";

const FALLBACK_METHODS = [
  {
    icon: "◈",
    title: "Laboratório",
    description:
      "Prototipar, experimentar, errar rápido. Criamos espaços onde a tentativa é o método — não o fracasso.",
  },
  {
    icon: "◉",
    title: "Residência",
    description:
      "Tempo longo, imersão, produção coletiva. Quando o processo tem duração, ele transforma.",
  },
  {
    icon: "◎",
    title: "Circulação",
    description:
      "Compartilhar com o território: mostras, encontros, publicações. O que foi criado precisa chegar a quem não estava lá.",
  },
];

const ICONS = ["◈", "◉", "◎"];

interface HomeProps {
  featuredProjects: Project[];
  territoriesData: TerritoryData[];
  homeData: HomeData | null;
}

export default function Home({ featuredProjects, territoriesData, homeData }: HomeProps) {
  const heroTitle =
    homeData?.heroTitle ?? "Laboratórios de arte, cultura e tecnologia que criam presença no mundo.";
  const heroSubtitle =
    homeData?.heroSubtitle ?? "Residências, oficinas e projetos territoriais em rede.";
  const heroImage = homeData?.heroImage ?? "/images/placeholders/hero.svg";

  const methods =
    homeData?.methods && homeData.methods.length > 0
      ? homeData.methods.map((m, i) => ({ ...m, icon: ICONS[i] ?? "◎" }))
      : FALLBACK_METHODS;

  return (
    <Layout>
      {/* ── BLOCO 1: Hero ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt="Imagem de capa da Juca Maria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/85 via-[#2B2B2B]/20 to-[#1C2B3A]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <p className="text-[#E7B53E] text-xs uppercase tracking-widest font-medium mb-6">
            Cultura · Arte · Educação
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[#F2EFE8] max-w-3xl leading-tight mb-6"
          >
            {heroTitle}
          </h1>
          <p className="text-[#D8D3CA] text-lg md:text-xl max-w-xl mb-10">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/projetos"
              className="inline-block px-8 py-3 bg-[#C65A3A] text-[#F2EFE8] text-sm font-medium hover:bg-[#a8492e] transition-colors"
            >
              Ver projetos
            </Link>
            <Link
              href="/sobre"
              className="inline-block px-8 py-3 border border-[#F2EFE8]/60 text-[#F2EFE8] text-sm font-medium hover:bg-[#FAFAF7]/10 transition-colors"
            >
              Conhecer a organização
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOCO 2: Projetos em destaque ─────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              Portfólio
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl md:text-4xl font-semibold text-[#2B2B2B]"
            >
              Projetos
            </h2>
            <p className="text-[#555] mt-2 max-w-md">
              A Juca Maria existe através dos projetos.
            </p>
          </div>
          <Link
            href="/projetos"
            className="text-sm font-medium text-[#2F4E6F] hover:text-[#C65A3A] transition-colors underline-offset-4 hover:underline whitespace-nowrap"
          >
            Ver todos os projetos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ── BLOCO 3: Territórios ──────────────────────────── */}
      <section className="bg-[#2B2B2B] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              Presença
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl md:text-4xl font-semibold text-[#F2EFE8]"
            >
              Territórios
            </h2>
            <p className="text-[#D8D3CA] mt-2 max-w-md">
              Cada território produz sua própria linguagem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {territoriesData.map((territory) => (
              <Link
                key={territory.slug}
                href={`/territorios#${territory.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden" style={{ paddingBottom: "133.33%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={territory.image}
                    alt={territory.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3
                      style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                      className="text-xl font-semibold text-[#F2EFE8] mb-1"
                    >
                      {territory.name}
                    </h3>
                    <p className="text-xs text-[#D8D3CA] uppercase tracking-wider">
                      {territory.phrase}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCO 4: Como atuamos ─────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Método
          </p>
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl md:text-4xl font-semibold text-[#2B2B2B]"
          >
            Como atuamos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {methods.map((item) => (
            <div key={item.title} className="group">
              <div className="text-4xl text-[#C65A3A] mb-6 font-light">
                {item.icon}
              </div>
              <h3
                style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                className="text-xl font-semibold text-[#2B2B2B] mb-3"
              >
                {item.title}
              </h3>
              <p className="text-[#555] leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const [featuredProjects, territoriesData, homeData] = await Promise.all([
    getFeaturedProjects(),
    getTerritories(),
    getHomePage(),
  ]);
  return {
    props: {
      featuredProjects,
      territoriesData,
      homeData,
    },
  };
}
