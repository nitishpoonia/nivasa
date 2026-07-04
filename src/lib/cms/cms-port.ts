import type { Project } from "@/modules/content/domain/project";

export interface CmsPort {
  listProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
}
