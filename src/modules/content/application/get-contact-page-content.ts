import type { CmsPort } from "@/lib/cms";
import type { ContactPageContent } from "@/modules/content/domain/contact-page-content";

export async function getContactPageContent(
  cms: CmsPort,
): Promise<ContactPageContent | null> {
  return cms.getContactPageContent();
}
