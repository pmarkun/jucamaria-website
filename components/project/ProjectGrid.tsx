import { useState, useMemo } from "react";
import type { Project, ProjectType } from "@/types/project";
import { PROJECT_TYPE_LABELS } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  showFilters?: boolean;
  showSearch?: boolean;
}

export default function ProjectGrid({
  projects,
  showFilters = true,
  showSearch = false,
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectType>("all");
  const [query, setQuery] = useState("");

  // Derive available types from the projects list
  const availableTypes = useMemo(() => {
    const types = new Set(projects.map((p) => p.type));
    return Array.from(types) as ProjectType[];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesType = activeFilter === "all" || p.type === activeFilter;
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [projects, activeFilter, query]);

  return (
    <div>
      {/* Filters */}
      {(showFilters || showSearch) && (
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {showSearch && (
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-[#D8D3CA] bg-[#EDE9E0] px-4 py-2 text-sm text-[#2B2B2B] placeholder-[#aaa] focus:outline-none focus:border-[#C65A3A] w-full md:w-72"
            />
          )}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`text-xs px-3 py-1.5 border transition-colors rounded-sm font-medium ${
                  activeFilter === "all"
                    ? "bg-[#2B2B2B] text-[#F2EFE8] border-[#2B2B2B]"
                    : "bg-transparent text-[#2B2B2B] border-[#D8D3CA] hover:border-[#2B2B2B]"
                }`}
              >
                Todos
              </button>
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`text-xs px-3 py-1.5 border transition-colors rounded-sm font-medium ${
                    activeFilter === type
                      ? "bg-[#2B2B2B] text-[#F2EFE8] border-[#2B2B2B]"
                      : "bg-transparent text-[#2B2B2B] border-[#D8D3CA] hover:border-[#2B2B2B]"
                  }`}
                >
                  {PROJECT_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-[#888] text-sm py-12 text-center">
          Nenhum projeto encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
