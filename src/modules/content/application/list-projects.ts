import type { CmsPort } from "@/lib/cms";
import type { Project } from "@/modules/content/domain/project";

export async function listProjects(cms: CmsPort): Promise<Project[]> {
  return cms.listProjects();
}
