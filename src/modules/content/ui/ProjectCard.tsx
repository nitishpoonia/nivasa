import Image from "next/image";
import type { Project } from "@/modules/content/domain/project";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-lg font-medium">{project.title}</h3>
      {project.location ? (
        <p className="text-sm text-neutral-500">{project.location}</p>
      ) : null}
    </article>
  );
}
