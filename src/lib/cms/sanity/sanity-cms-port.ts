import type { Project } from "@/modules/content/domain/project";
import type { SiteSettings } from "@/modules/content/domain/site-settings";
import type { HomePageContent } from "@/modules/content/domain/home-page-content";
import type { AboutPageContent } from "@/modules/content/domain/about-page-content";
import type { ServicesPageContent } from "@/modules/content/domain/services-page-content";
import type { ContactPageContent } from "@/modules/content/domain/contact-page-content";
import type { Service } from "@/modules/content/domain/service";
import type { TeamMember } from "@/modules/content/domain/team-member";
import type { Award } from "@/modules/content/domain/award";
import type { CmsPort, ListProjectsOptions } from "@/lib/cms/cms-port";
import { sanityClient } from "@/lib/cms/sanity/client";
import {
  listProjectsQuery,
  projectBySlugQuery,
  siteSettingsQuery,
  homePageQuery,
  aboutPageQuery,
  servicesPageQuery,
  contactPageQuery,
  listServicesQuery,
  listTeamMembersQuery,
  listAwardsQuery,
} from "@/lib/cms/sanity/queries";
import {
  toProject,
  toSiteSettings,
  toHomePageContent,
  toAboutPageContent,
  toServicesPageContent,
  toContactPageContent,
  toService,
  toTeamMember,
  toAward,
} from "@/lib/cms/sanity/mappers";

export const sanityCmsPort: CmsPort = {
  async listProjects(options?: ListProjectsOptions): Promise<Project[]> {
    const raw = await sanityClient.fetch(listProjectsQuery, {
      category: options?.category ?? null,
    });
    return raw.map(toProject);
  },
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const raw = await sanityClient.fetch(projectBySlugQuery, { slug });
    return raw ? toProject(raw) : null;
  },
  async getSiteSettings(): Promise<SiteSettings | null> {
    const raw = await sanityClient.fetch(siteSettingsQuery);
    return raw ? toSiteSettings(raw) : null;
  },
  async getHomePageContent(): Promise<HomePageContent | null> {
    const raw = await sanityClient.fetch(homePageQuery);
    return raw ? toHomePageContent(raw) : null;
  },
  async getAboutPageContent(): Promise<AboutPageContent | null> {
    const raw = await sanityClient.fetch(aboutPageQuery);
    return raw ? toAboutPageContent(raw) : null;
  },
  async getServicesPageContent(): Promise<ServicesPageContent | null> {
    const raw = await sanityClient.fetch(servicesPageQuery);
    return raw ? toServicesPageContent(raw) : null;
  },
  async getContactPageContent(): Promise<ContactPageContent | null> {
    const raw = await sanityClient.fetch(contactPageQuery);
    return raw ? toContactPageContent(raw) : null;
  },
  async listServices(): Promise<Service[]> {
    const raw = await sanityClient.fetch(listServicesQuery);
    return raw.map(toService);
  },
  async listTeamMembers(): Promise<TeamMember[]> {
    const raw = await sanityClient.fetch(listTeamMembersQuery);
    return raw.map(toTeamMember);
  },
  async listAwards(): Promise<Award[]> {
    const raw = await sanityClient.fetch(listAwardsQuery);
    return raw.map(toAward);
  },
};
