import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/project/ProjectCard";
import { getCategories, getCategoryBySlug, getProjectsByCategorySlug } from "@/lib/data";
import type { CategoryData, Project } from "@/types/project";
import type { GetStaticPaths, GetStaticProps } from "next";

interface CategoryPageProps {
  category: CategoryData;
  projects: Project[];
}

const RESERVED_SLUGS = new Set([
  "projetos",
  "territorios",
  "sobre",
  "contato",
  "vivencias",
  "api",
  "favicon.ico",
]);

export default function CategoryPage({ category, projects }: CategoryPageProps) {
  return (
    <Layout title={category.name} description={`Conheça os projetos da categoria ${category.name}.`}>
      <section className="bg-[#FAFAF7] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Categoria
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#2B2B2B] mb-6"
          >
            {category.name}
          </h1>
          {category.longDescription && (
            <div
              className="prose prose-lg max-w-none text-[#555]"
              dangerouslySetInnerHTML={{ __html: category.longDescription }}
            />
          )}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        {projects.length === 0 ? (
          <p className="text-[#888] text-sm py-12 text-center">Nenhum projeto nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories
    .filter((cat) => !RESERVED_SLUGS.has(cat.slug))
    .map((cat) => ({ params: { slug: cat.slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug || RESERVED_SLUGS.has(slug)) {
    return { notFound: true };
  }

  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { notFound: true };
  }

  const projects = await getProjectsByCategorySlug(slug);
  return { props: { category, projects } };
};
