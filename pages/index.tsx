import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project, TerritoryData } from "@/types/project";
import { getFeaturedProjects, territories } from "@/lib/data";

interface HomeProps {
  featuredProjects: Project[];
  territoriesData: TerritoryData[];
}

export default function Home({ featuredProjects, territoriesData }: HomeProps) {
  return (
    <Layout>
      {/* ── BLOCO 1: Hero ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1800&q=85"
            alt="Oficina de arte com pessoas trabalhando"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/90 via-[#2B2B2B]/40 to-transparent" />
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
            Laboratórios de arte, cultura e tecnologia que criam presença no
            mundo.
          </h1>
          <p className="text-[#D8D3CA] text-lg md:text-xl max-w-xl mb-10">
            Residências, oficinas e projetos territoriais em rede.
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
              className="inline-block px-8 py-3 border border-[#F2EFE8]/60 text-[#F2EFE8] text-sm font-medium hover:bg-[#F2EFE8]/10 transition-colors"
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
                className="group relative overflow-hidden aspect-[3/4] block"
              >
                <Image
                  src={territory.image}
                  alt={territory.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
          {[
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
          ].map((item) => (
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

      {/* ── BLOCO 5: Legitimidade institucional ───────────── */}
      <section className="bg-[#EDE9E0] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              Organização
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl md:text-4xl font-semibold text-[#2B2B2B] mb-6"
            >
              Uma casa de projetos, com autoria e colegiado
            </h2>
            <p className="text-[#555] leading-relaxed text-base mb-8">
              A Juca Maria é uma produtora cultural associativa com função
              pública. Não centralizamos autoria — cuidamos das condições para
              que projetos existam e floresçam. Artistas, educadores, tecnólogos
              e pesquisadores desenvolvem trabalhos em diferentes territórios,
              com suporte institucional, estrutura e tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Colegiado */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Colegiado
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "Ana Vieira",
                  "Beatriz Fontes",
                  "Rafael Souza",
                  "Joana Ferreira",
                  "Lucas Alves",
                ].map((name) => (
                  <li key={name} className="text-sm text-[#2B2B2B]">
                    {name}
                  </li>
                ))}
              </ul>
              <Link
                href="/sobre#colegiado"
                className="text-xs text-[#C65A3A] hover:underline mt-3 inline-block"
              >
                Ver todos →
              </Link>
            </div>

            {/* Parceiros */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Parceiros
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "Escola Municipal Henrique Veras",
                  "Secretaria de Cultura de Atibaia",
                  "Colônia de Pesca Z-6",
                  "Coletivo Margem",
                ].map((name) => (
                  <li key={name} className="text-sm text-[#2B2B2B]">
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Transparência */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Transparência
              </h3>
              <p className="text-sm text-[#555] mb-3">
                Documentos, relatórios e prestações de contas disponíveis para
                parceiros e financiadores.
              </p>
              <Link
                href="/sobre#transparencia"
                className="text-xs font-medium px-4 py-2 border border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-[#F2EFE8] transition-colors inline-block"
              >
                Acessar documentos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCO 6: CTA final ────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6 text-center">
        <h2
          style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
          className="text-4xl md:text-5xl font-semibold text-[#2B2B2B] mb-6"
        >
          Quer criar com a gente?
        </h2>
        <p className="text-[#555] text-lg max-w-md mx-auto mb-10">
          Trabalhamos com pessoas, não com públicos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contato?assunto=parceria"
            className="inline-block px-8 py-3 bg-[#C65A3A] text-[#F2EFE8] text-sm font-medium hover:bg-[#a8492e] transition-colors"
          >
            Propor parceria
          </Link>
          <Link
            href="/vivencias"
            className="inline-block px-8 py-3 border border-[#2B2B2B] text-[#2B2B2B] text-sm font-medium hover:bg-[#2B2B2B] hover:text-[#F2EFE8] transition-colors"
          >
            Participar de uma residência ou oficina
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const featuredProjects = getFeaturedProjects();
  return {
    props: {
      featuredProjects,
      territoriesData: territories,
    },
  };
}
