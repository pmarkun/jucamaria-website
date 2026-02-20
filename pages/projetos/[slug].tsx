import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import { PROJECT_TYPE_LABELS } from "@/types/project";
import {
  projects,
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

  return (
    <Layout
      title={project.title}
      description={project.description}
      image={hero?.src}
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
          {project.year && (
            <span className="text-sm text-[#888]">{project.year}</span>
          )}
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
        {hero && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Imagem principal — ocupa 2 colunas */}
            <div className="md:col-span-2 relative aspect-[16/10] overflow-hidden">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            {/* Imagens secundárias */}
            <div className="grid grid-rows-2 gap-3">
              {rest.slice(0, 2).map((img) => (
                <div key={img.src} className="relative overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Imagens adicionais */}
        {rest.length > 2 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {rest.slice(2).map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
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
            <div className="prose prose-lg max-w-none text-[#2B2B2B]">
              {project.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="mb-5 leading-relaxed text-[#444]">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-10">
          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h2
                className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4"
              >
                O que aconteceu
              </h2>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#2B2B2B]">
                    <span className="text-[#C65A3A] mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Créditos */}
          {project.credits && project.credits.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Equipe
              </h2>
              <ul className="flex flex-col gap-2">
                {project.credits.map((c) => (
                  <li key={c.name} className="text-sm">
                    <span className="font-medium text-[#2B2B2B]">{c.name}</span>
                    <br />
                    <span className="text-[#888]">{c.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Parceiros */}
          {project.partners && project.partners.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Parceiros
              </h2>
              <ul className="flex flex-col gap-1.5">
                {project.partners.map((p) => (
                  <li key={p} className="text-sm text-[#555]">
                    {p}
                  </li>
                ))}
              </ul>
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
  const paths = projects.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { notFound: true };
  }

  const related = getRelatedProjects(project);

  return {
    props: { project, related },
  };
};
