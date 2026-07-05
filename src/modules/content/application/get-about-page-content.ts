import type { CmsPort } from "@/lib/cms";
import type { AboutPageContent } from "@/modules/content/domain/about-page-content";

export async function getAboutPageContent(
  cms: CmsPort,
): Promise<AboutPageContent | null> {
  return cms.getAboutPageContent();
}
