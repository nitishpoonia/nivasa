import type { Project } from "@/modules/content/domain/project";
import type { SiteSettings } from "@/modules/content/domain/site-settings";
import type { HomePageContent } from "@/modules/content/domain/home-page-content";
import type { AboutPageContent } from "@/modules/content/domain/about-page-content";
import type { ServicesPageContent } from "@/modules/content/domain/services-page-content";
import type { Service } from "@/modules/content/domain/service";
import type { TeamMember } from "@/modules/content/domain/team-member";
import type { Award } from "@/modules/content/domain/award";

export type ListProjectsOptions = {
  category?: string;
};

export interface CmsPort {
  listProjects(options?: ListProjectsOptions): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getSiteSettings(): Promise<SiteSettings | null>;
  getHomePageContent(): Promise<HomePageContent | null>;
  getAboutPageContent(): Promise<AboutPageContent | null>;
  getServicesPageContent(): Promise<ServicesPageContent | null>;
  listServices(): Promise<Service[]>;
  listTeamMembers(): Promise<TeamMember[]>;
  listAwards(): Promise<Award[]>;
}
