import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import { territories, getProjectsByTerritory } from "@/lib/data";
import type { TerritoryData, Project } from "@/types/project";

interface TerritoriosPageProps {
  territoriesWithProjects: Array<TerritoryData & { projects: Project[] }>;
}

export default function TerritoriosPage({
  territoriesWithProjects,
}: TerritoriosPageProps) {
  return (
    <Layout
      title="Territórios"
      description="A Juca Maria atua em Florianópolis, Atibaia e no Nordeste. Cada território produz sua própria linguagem."
    >
      {/* Header */}
      <section className="bg-[#2B2B2B] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Presença
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#F2EFE8] mb-4"
          >
            Territórios
          </h1>
          <p className="text-[#D8D3CA] text-lg max-w-xl">
            Cada território produz sua própria linguagem.
          </p>
        </div>
      </section>

      {/* Territories */}
      {territoriesWithProjects.map((territory, index) => (
        <section
          key={territory.slug}
          id={territory.slug}
          className={`py-20 ${index % 2 === 1 ? "bg-[#EDE9E0]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={territory.image}
                  alt={territory.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
                  {territory.phrase}
                </p>
                <h2
                  style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                  className="text-3xl font-semibold text-[#2B2B2B] mb-4"
                >
                  {territory.name}
                </h2>
                <p className="text-[#555] leading-relaxed text-base">
                  {territory.description}
                </p>
              </div>
            </div>

            {/* Projects in this territory */}
            {territory.projects.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-6">
                  Projetos em {territory.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {territory.projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl font-semibold text-[#2B2B2B] mb-4"
          >
            Atua em outro território?
          </h2>
          <p className="text-[#555] mb-8">
            A Juca Maria está sempre aberta a novas parcerias territoriais.
            Conte-nos sobre seu contexto.
          </p>
          <Link
            href="/contato?assunto=territorio"
            className="inline-block px-8 py-3 bg-[#C65A3A] text-[#F2EFE8] text-sm font-medium hover:bg-[#a8492e] transition-colors"
          >
            Convidar para atuar no seu território
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const territoriesWithProjects = territories.map((t) => ({
    ...t,
    projects: getProjectsByTerritory(t.name),
  }));

  return {
    props: { territoriesWithProjects },
  };
}
