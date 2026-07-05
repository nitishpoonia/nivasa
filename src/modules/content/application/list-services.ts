import type { CmsPort } from "@/lib/cms";
import type { Service } from "@/modules/content/domain/service";

export async function listServices(cms: CmsPort): Promise<Service[]> {
  return cms.listServices();
}
