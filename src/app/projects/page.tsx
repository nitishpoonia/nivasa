import { cms } from "@/lib/cms";
import { listProjects, ProjectGrid } from "@/modules/content";
import { Container } from "@/lib/ui/Container";

export default async function ProjectsPage() {
  const projects = await listProjects(cms);

  if (projects.length === 0) {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-4 text-neutral-500">
          No projects have been published yet. Check back soon.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </Container>
  );
}
