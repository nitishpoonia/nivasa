import type { CmsPort } from "@/lib/cms";
import type { Project } from "@/modules/content/domain/project";

export async function getProjectBySlug(
  cms: CmsPort,
  slug: string,
): Promise<Project | null> {
  return cms.getProjectBySlug(slug);
}
