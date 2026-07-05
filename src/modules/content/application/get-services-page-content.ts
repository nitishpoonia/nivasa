import type { CmsPort } from "@/lib/cms";
import type { ServicesPageContent } from "@/modules/content/domain/services-page-content";

export async function getServicesPageContent(
  cms: CmsPort,
): Promise<ServicesPageContent | null> {
  return cms.getServicesPageContent();
}
