import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import { PROJECT_TYPE_LABELS } from "@/types/project";
import {
  getProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/data";
import type { Project } from "@/types/project";
import type { GetStaticPaths, GetStaticProps } from "next";

interface ProjectPageProps {
  project: Project;
  related: Project[];
}

export default function ProjectPage({ project, related }: ProjectPageProps) {
  const [hero, ...rest] = project.gallery;
  const fallbackHero = {
    src: "/images/placeholders/project-placeholder.svg",
    alt: project.title,
  };
  const heroImage = hero ?? fallbackHero;

  return (
    <Layout
      title={project.title}
      description={project.description}
      image={hero?.src ?? fallbackHero.src}
    >
      {/* ── Cabeçalho ─────────────────────── */}
      <section className="pt-16 pb-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-[#888] mb-6">
          <Link href="/projetos" className="hover:text-[#C65A3A] transition-colors">
            Projetos
          </Link>
          <span>›</span>
          <span>{project.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2 py-1 bg-[#C65A3A]/10 text-[#C65A3A] rounded-sm">
            {PROJECT_TYPE_LABELS[project.type]}
          </span>
          <span className="text-sm text-[#888]">{project.territory}</span>
        </div>

        <h1
          style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
          className="text-4xl md:text-5xl font-semibold text-[#2B2B2B] max-w-3xl mb-6 leading-tight"
        >
          {project.title}
        </h1>
        <p className="text-[#555] text-lg max-w-2xl leading-relaxed">
          {project.description}
        </p>
      </section>

      {/* ── Galeria ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Imagem principal — ocupa 2 colunas */}
          <div className="md:col-span-2 relative aspect-[16/10] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="w-full h-full object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {/* Imagens secundárias */}
          <div className="grid grid-rows-2 gap-3">
            {rest.slice(0, 2).map((img) => (
              <div key={img.src} className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Imagens adicionais */}
        {rest.length > 2 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {rest.slice(2).map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Conteúdo + Sidebar ────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Texto principal */}
        <div className="md:col-span-2">
          {project.longDescription && (
            <div
              className="prose prose-lg max-w-none text-[#2B2B2B]"
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-10">
          {/* Período */}
          {(project.startDate || project.endDate) && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Período
              </h2>
              <p className="text-sm text-[#555]">
                {project.startDate
                  ? new Date(project.startDate + "T00:00:00").toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
                {" até "}
                {project.endDate
                  ? new Date(project.endDate + "T00:00:00").toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })
                  : "em andamento"}
              </p>
            </div>
          )}

          {/* Parceiros & Equipe */}
          {project.partners && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Parceiros &amp; Equipe
              </h2>
              <div
                className="prose prose-sm max-w-none text-[#555]"
                dangerouslySetInnerHTML={{ __html: project.partners }}
              />
            </div>
          )}
        </aside>
      </section>

      {/* ── Projetos relacionados ─────────── */}
      {related.length > 0 && (
        <section className="bg-[#EDE9E0] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-2xl font-semibold text-[#2B2B2B] mb-8"
            >
              Outros projetos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const all = await getProjects();
  const paths = all.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { notFound: true };
  }

  const related = await getRelatedProjects(project);

  return {
    props: { project, related },
  };
};
