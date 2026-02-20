import Layout from "@/components/layout/Layout";
import ProjectGrid from "@/components/project/ProjectGrid";
import type { Project } from "@/types/project";
import { getProjects } from "@/lib/data";

interface ProjectsPageProps {
  projects: Project[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <Layout
      title="Projetos"
      description="A Juca Maria existe através dos projetos. Conheça as oficinas, laboratórios e ações culturais em todo o Brasil."
    >
      {/* Header */}
      <section className="bg-[#FAFAF7] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Portfólio
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#2B2B2B] mb-4"
          >
            Projetos
          </h1>
          <p className="text-[#555] text-lg max-w-xl">
            A Juca Maria existe através dos projetos.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <ProjectGrid projects={projects} showFilters showSearch />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const all = await getProjects();
  const projects = all.filter((p) => p.categorySlug !== "residencias" && p.type.toLowerCase() !== "residencia");
  return {
    props: {
      projects,
    },
  };
}
