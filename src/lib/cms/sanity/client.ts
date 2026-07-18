import { createClient } from "@sanity/client";
import { config } from "@/lib/config/env";

export const sanityClient = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  // CDN reads are fronted by their own cache with an independent TTL, which
  // fights the tag-based revalidation in sanity-cms-port.ts. Reading from
  // the live API keeps published content and Next's cache tags in sync.
  useCdn: false,
});
