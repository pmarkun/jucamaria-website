import Link from "next/link";
import type { Project } from "@/types/project";
import { PROJECT_TYPE_LABELS } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

const TYPE_COLORS: Record<string, string> = {
  arte: "bg-[#C65A3A]/10 text-[#C65A3A]",
  tecnologia: "bg-[#2F4E6F]/10 text-[#2F4E6F]",
  educacao: "bg-[#E7B53E]/20 text-[#8a6a1a]",
  residencia: "bg-[#C65A3A]/10 text-[#C65A3A]",
  oficina: "bg-[#2F4E6F]/10 text-[#2F4E6F]",
  pesquisa: "bg-[#888]/10 text-[#555]",
  outro: "bg-[#888]/10 text-[#555]",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.gallery[0];
  const fallbackImage = "/images/placeholders/project-placeholder.svg";

  return (
    <Link href={`/projetos/${project.slug}`} className="group block">
      <article className="overflow-hidden bg-[#EDE9E0] hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage?.src ?? fallbackImage}
            alt={coverImage?.alt ?? project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ width: "100%", height: "100%" }}
          />
          {/* Type badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-sm ${TYPE_COLORS[project.type] || TYPE_COLORS.outro}`}
          >
            {PROJECT_TYPE_LABELS[project.type]}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[#888] uppercase tracking-wider">
              {project.territory}
            </span>
          </div>
          <h3
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-lg font-semibold text-[#2B2B2B] mb-2 group-hover:text-[#C65A3A] transition-colors"
          >
            {project.title}
          </h3>
          <p className="text-sm text-[#555] leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
