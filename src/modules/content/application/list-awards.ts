import type { CmsPort } from "@/lib/cms";
import type { Award } from "@/modules/content/domain/award";

export async function listAwards(cms: CmsPort): Promise<Award[]> {
  return cms.listAwards();
}
