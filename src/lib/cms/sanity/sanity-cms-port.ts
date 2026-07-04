import type { Project } from "@/modules/content/domain/project";
import type { CmsPort } from "@/lib/cms/cms-port";
import { sanityClient } from "@/lib/cms/sanity/client";
import {
  listProjectsQuery,
  projectBySlugQuery,
} from "@/lib/cms/sanity/queries";
import { toProject } from "@/lib/cms/sanity/mappers";

export const sanityCmsPort: CmsPort = {
  async listProjects(): Promise<Project[]> {
    const raw = await sanityClient.fetch(listProjectsQuery);
    return raw.map(toProject);
  },
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const raw = await sanityClient.fetch(projectBySlugQuery, { slug });
    return raw ? toProject(raw) : null;
  },
};
