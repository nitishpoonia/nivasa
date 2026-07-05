import { cms } from "@/lib/cms";
import { listProjects, ProjectGrid, ProjectFilters } from "@/modules/content";
import { Eyebrow } from "@/lib/ui/Eyebrow";
import { Container } from "@/lib/ui/Container";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [projects, allProjects] = await Promise.all([
    listProjects(cms, { category }),
    listProjects(cms),
  ]);
  const categories = Array.from(
    new Set(allProjects.flatMap((project) => project.categories)),
  ).sort();

  return (
    <Container className="max-w-[1320px] py-16">
      <Eyebrow>Projects — 2011 → 2026</Eyebrow>
      <h1 className="mt-5 font-serif text-6xl font-medium sm:text-8xl">
        Selected Work
      </h1>
      <ProjectFilters categories={categories} activeCategory={category} />

      {allProjects.length === 0 ? (
        <p className="text-muted mt-14">
          No projects have been published yet. Check back soon.
        </p>
      ) : projects.length === 0 ? (
        <p className="text-muted mt-14">No projects match this filter yet.</p>
      ) : (
        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      )}
    </Container>
  );
}
