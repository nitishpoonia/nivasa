import Link from "next/link";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import type { Project } from "@/modules/content/domain/project";
import { ProjectGrid } from "@/modules/content/ui/ProjectGrid";

type Props = {
  projects: Project[];
  totalCount: number;
};

export function FeaturedProjects({ projects, totalCount }: Props) {
  return (
    <section className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-8 sm:pt-24">
      <SectionHeading
        eyebrow="Selected Works"
        action={
          <Link
            href="/projects"
            className="text-muted hover:text-foreground text-[13px] no-underline"
          >
            All projects ({String(totalCount).padStart(2, "0")})
          </Link>
        }
        className="mb-11"
      />
      {projects.length > 0 ? (
        <ProjectGrid projects={projects} />
      ) : (
        <p className="text-muted">No projects have been published yet.</p>
      )}
    </section>
  );
}
