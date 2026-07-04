import Link from "next/link";
import type { Project } from "@/modules/content/domain/project";
import { ProjectCard } from "@/modules/content/ui/ProjectCard";

type Props = {
  projects: Project[];
};

export function ProjectGrid({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.slug}`}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
}
