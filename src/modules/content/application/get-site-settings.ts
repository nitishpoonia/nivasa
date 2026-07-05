import type { CmsPort } from "@/lib/cms";
import type { SiteSettings } from "@/modules/content/domain/site-settings";

export async function getSiteSettings(
  cms: CmsPort,
): Promise<SiteSettings | null> {
  return cms.getSiteSettings();
}
