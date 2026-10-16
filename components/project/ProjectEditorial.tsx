import Link from "@/components/LocalizedLink";
import Layout from "@/components/layout/Layout";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/lib/i18n";
import type { Project } from "@/types/project";

const displayFont = { fontFamily: "var(--font-lora, Lora, serif)" };

export default function ProjectEditorial({ project, related }: { project: Project; related: Project[] }) {
  const { t, asset } = useLanguage();
  const cover = project.gallery[0];
  const territoryHref = `/territorios#${project.territorySlug}`;

  return (
    <Layout title={project.title} description={project.description} image={cover ? asset(cover.src) : undefined}>
      <section className="bg-[#F2EFE8]">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 md:pb-24">
          <nav aria-label={t("Caminho da página")} className="flex flex-wrap gap-2 text-sm text-[#555] mb-12">
            <Link href="/projetos" className="hover:underline">{t("Projetos")}</Link>
            <span aria-hidden="true">/</span>
            <Link href={territoryHref} className="hover:underline">{project.territory}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-medium tracking-widest uppercase">
                <span className="text-[#C65A3A]">{project.type}</span>
                {project.status && <span className="px-3 py-2 bg-[#DFE5D9] text-[#344E3D]">{project.status}</span>}
              </div>
              <h1 style={displayFont} className="text-5xl sm:text-6xl lg:text-7xl leading-[1.08] font-semibold text-[#2B2B2B] mb-8">
                {project.title}
              </h1>
              {project.lead && <p style={displayFont} className="text-2xl md:text-3xl leading-snug text-[#344E3D] mb-6">{project.lead}</p>}
              <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-xl mb-8">{project.description}</p>
              <Link href={territoryHref} className="inline-flex items-center gap-3 border-b border-[#344E3D] pb-2 text-sm font-medium" style={{ color: "#344E3D" }}>
                {t("Conhecer o território")} · {project.territory} <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {cover && (
              <figure className="m-0">
                <div className="aspect-[4/5] bg-[#DFE5D9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(cover.src)} alt={cover.alt} width={720} height={1280}
                    className="object-cover" style={{ width: "100%", height: "100%" }} />
                </div>
                {cover.caption && <figcaption className="text-xs text-[#666] leading-relaxed mt-3">{cover.caption}</figcaption>}
              </figure>
            )}
          </div>
        </div>
      </section>

      {project.facts && (
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[#D8D3CA] pb-10 md:pb-12">
            {project.facts.map(fact => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-widest text-[#666] mb-3">{fact.label}</dt>
                <dd style={displayFont} className="text-xl text-[#2B2B2B] leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-4 pb-20 md:pb-24 grid lg:grid-cols-[240px_minmax(0,1fr)] gap-10 lg:gap-20">
        <aside>
          <nav aria-label={t("Neste projeto")} className="lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-widest text-[#C65A3A] font-medium mb-5">{t("Neste projeto")}</p>
            <ol className="flex flex-col gap-4 text-sm text-[#555]">
              {project.sections?.map((section, index) => (
                <li key={section.id} className="flex gap-3">
                  <span className="text-[#888] text-xs pt-0.5">{String(index + 1).padStart(2, "0")}</span>
                  <a href={`#${section.id}`} className="hover:underline leading-relaxed">{section.title}</a>
                </li>
              ))}
              {project.team?.length ? <li><a href="#equipe" className="hover:underline">{t("Equipe e realização")} ↓</a></li> : null}
            </ol>
          </nav>
        </aside>
        <div className="min-w-0 max-w-3xl">
          {project.sections?.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-24 mb-14 last:mb-0">
              <h2 style={displayFont} className="text-3xl md:text-4xl font-semibold text-[#2B2B2B] mb-6 leading-tight">{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index} className="text-[#555] text-base md:text-lg leading-relaxed mb-5 last:mb-0">{paragraph}</p>)}
            </section>
          ))}
        </div>
      </div>

      {project.process && (
        <section className="bg-[#344E3D] py-16 md:py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#E7B53E] mb-4">{t("Processo de criação")}</p>
            <h2 style={displayFont} className="text-3xl md:text-4xl font-semibold text-[#FAFAF7] max-w-2xl mb-12">{t("Da escuta ao livro, um trabalho coletivo.")}</h2>
            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.process.map((step, index) => (
                <li key={step.title} className="border-t border-[#FAFAF7]/30 pt-6">
                  <span className="text-sm text-[#E7B53E]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 style={displayFont} className="text-2xl text-[#FAFAF7] mt-5 mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#E0E5DC]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section id="equipe" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest text-[#C65A3A] mb-4">{t("Autoria e colaboração")}</p>
        <h2 style={displayFont} className="text-3xl md:text-4xl font-semibold text-[#2B2B2B] mb-10">{t("Equipe e realização")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {project.team?.map(person => (
            <div key={person.name} className="border-t border-[#D8D3CA] pt-5">
              <h3 style={displayFont} className="text-xl mb-2 text-[#2B2B2B]">{person.name}</h3>
              <p className="text-sm text-[#555] leading-relaxed">{person.role}</p>
            </div>
          ))}
        </div>
        <dl className="grid md:grid-cols-3 gap-8 bg-[#F2EFE8] p-6 md:p-8">
          {project.organizations?.map(organization => (
            <div key={organization.name}>
              <dt className="text-xs uppercase tracking-wider text-[#666] mb-3">{organization.role}</dt>
              <dd className="text-base font-medium text-[#2B2B2B] leading-relaxed">{organization.name}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="bg-[#F2EFE8] py-16 md:py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-5 items-end justify-between mb-10">
              <h2 style={displayFont} className="text-3xl font-semibold">{t("Outros projetos")}</h2>
              <Link href={territoryHref} className="text-sm border-b border-[#555] pb-1">{project.territory} →</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map(item => <ProjectCard key={item.slug} project={item} />)}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
