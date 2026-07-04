import { createClient } from "@sanity/client";
import { config } from "@/lib/config/env";

export const sanityClient = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  useCdn: config.isProduction,
});
