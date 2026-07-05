import type { CmsPort, ListProjectsOptions } from "@/lib/cms";
import type { Project } from "@/modules/content/domain/project";

export async function listProjects(
  cms: CmsPort,
  options?: ListProjectsOptions,
): Promise<Project[]> {
  return cms.listProjects(options);
}
