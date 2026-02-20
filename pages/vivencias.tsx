import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import { getProjectsByType } from "@/lib/data";
import type { Project } from "@/types/project";

interface VivenciasPageProps {
  residencias: Project[];
  oficinas: Project[];
}

export default function VivenciasPage({
  residencias,
  oficinas,
}: VivenciasPageProps) {
  return (
    <Layout
      title="Residências & Oficinas"
      description="Conheça os formatos de participação da Juca Maria: residências artísticas e oficinas criativas abertas a artistas, educadores e pesquisadores."
    >
      {/* Header */}
      <section className="bg-[#EDE9E0] py-20 px-6">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Participar
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#2B2B2B] mb-6"
          >
            Residências & Oficinas
          </h1>
          <p className="text-[#555] text-lg leading-relaxed max-w-2xl">
            Não vendemos cursos. Criamos situações onde pessoas trabalham juntas
            por um período de tempo, com propósito e espaço para errar.
          </p>
        </div>
      </section>

      {/* Formatos */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Residências */}
          <div className="border border-[#D8D3CA] p-8">
            <div className="text-3xl text-[#C65A3A] mb-4">◉</div>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-2xl font-semibold text-[#2B2B2B] mb-4"
            >
              Residências artísticas
            </h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Tempo longo de imersão em um território. Artistas, pesquisadores e
              educadores vivem e trabalham juntos por semanas. O resultado é um
              processo — e às vezes, um produto: uma publicação, uma exposição,
              uma apresentação.
            </p>
            <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-3">
              Quem pode participar
            </h3>
            <ul className="text-sm text-[#555] flex flex-col gap-1.5 mb-6">
              <li>— Artistas em qualquer linguagem</li>
              <li>— Educadores e pesquisadores culturais</li>
              <li>— Tecnólogos com interesse em cultura</li>
              <li>— Projetos em fase de desenvolvimento</li>
            </ul>
            <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-3">
              Como funciona
            </h3>
            <p className="text-sm text-[#555] leading-relaxed">
              Chamadas abertas periódicas com período de inscrição, seleção por
              colegiado e definição coletiva da programação. Não há um currículo
              fixo — há um tema e um espaço.
            </p>
          </div>

          {/* Oficinas */}
          <div className="border border-[#D8D3CA] p-8">
            <div className="text-3xl text-[#2F4E6F] mb-4">◈</div>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-2xl font-semibold text-[#2B2B2B] mb-4"
            >
              Oficinas criativas
            </h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Encontros intensivos de 1 a 4 semanas, com foco em um fazer
              específico: construção de objetos, escrita, música, tecnologia,
              vídeo. As oficinas acontecem em parceria com escolas, centros
              comunitários e outras organizações.
            </p>
            <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-3">
              Quem pode participar
            </h3>
            <ul className="text-sm text-[#555] flex flex-col gap-1.5 mb-6">
              <li>— Jovens a partir de 12 anos</li>
              <li>— Adultos sem experiência prévia</li>
              <li>— Grupos comunitários</li>
              <li>— Turmas escolares (via parceria institucional)</li>
            </ul>
            <h3 className="text-xs uppercase tracking-widest text-[#888] font-medium mb-3">
              Como funciona
            </h3>
            <p className="text-sm text-[#555] leading-relaxed">
              Parcerias com organizações locais que identificam o público e
              cedem o espaço. A Juca Maria traz a proposta metodológica, os
              materiais e os facilitadores.
            </p>
          </div>
        </div>
      </section>

      {/* Arquivo de residências */}
      {residencias.length > 0 && (
        <section className="bg-[#EDE9E0] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-2xl font-semibold text-[#2B2B2B] mb-8"
            >
              Residências realizadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {residencias.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Arquivo de oficinas */}
      {oficinas.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-2xl font-semibold text-[#2B2B2B] mb-8"
            >
              Oficinas realizadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {oficinas.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 text-center bg-[#2B2B2B]">
        <div className="max-w-xl mx-auto px-6">
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl font-semibold text-[#F2EFE8] mb-4"
          >
            Quer participar?
          </h2>
          <p className="text-[#D8D3CA] mb-8">
            Entre em contato para saber das próximas chamadas abertas ou propor
            uma parceria para uma oficina.
          </p>
          <Link
            href="/contato?assunto=participar"
            className="inline-block px-8 py-3 bg-[#C65A3A] text-[#F2EFE8] text-sm font-medium hover:bg-[#a8492e] transition-colors"
          >
            Entrar em contato
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      residencias: getProjectsByType("residencia"),
      oficinas: getProjectsByType("oficina"),
    },
  };
}
