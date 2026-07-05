import type { CmsPort } from "@/lib/cms";
import type { HomePageContent } from "@/modules/content/domain/home-page-content";

export async function getHomePageContent(
  cms: CmsPort,
): Promise<HomePageContent | null> {
  return cms.getHomePageContent();
}
