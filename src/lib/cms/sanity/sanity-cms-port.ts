import type { Project } from "@/modules/content/domain/project";
import type { SiteSettings } from "@/modules/content/domain/site-settings";
import type { HomePageContent } from "@/modules/content/domain/home-page-content";
import type { AboutPageContent } from "@/modules/content/domain/about-page-content";
import type { ServicesPageContent } from "@/modules/content/domain/services-page-content";
import type { ContactPageContent } from "@/modules/content/domain/contact-page-content";
import type { Service } from "@/modules/content/domain/service";
import type { TeamMember } from "@/modules/content/domain/team-member";
import type { CmsPort, ListProjectsOptions } from "@/lib/cms/cms-port";
import { CACHE_TAGS } from "@/lib/cms/cache-tags";
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
} from "@/lib/cms/sanity/mappers";

export const sanityCmsPort: CmsPort = {
  async listProjects(options?: ListProjectsOptions): Promise<Project[]> {
    const raw = await sanityClient.fetch(
      listProjectsQuery,
      { category: options?.category ?? null },
      { next: { tags: [CACHE_TAGS.project] } },
    );
    return raw.map(toProject);
  },
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const raw = await sanityClient.fetch(
      projectBySlugQuery,
      { slug },
      { next: { tags: [CACHE_TAGS.project] } },
    );
    return raw ? toProject(raw) : null;
  },
  async getSiteSettings(): Promise<SiteSettings | null> {
    const raw = await sanityClient.fetch(
      siteSettingsQuery,
      {},
      { next: { tags: [CACHE_TAGS.siteSettings] } },
    );
    return raw ? toSiteSettings(raw) : null;
  },
  async getHomePageContent(): Promise<HomePageContent | null> {
    const raw = await sanityClient.fetch(
      homePageQuery,
      {},
      { next: { tags: [CACHE_TAGS.homePage] } },
    );
    return raw ? toHomePageContent(raw) : null;
  },
  async getAboutPageContent(): Promise<AboutPageContent | null> {
    const raw = await sanityClient.fetch(
      aboutPageQuery,
      {},
      { next: { tags: [CACHE_TAGS.aboutPage] } },
    );
    return raw ? toAboutPageContent(raw) : null;
  },
  async getServicesPageContent(): Promise<ServicesPageContent | null> {
    const raw = await sanityClient.fetch(
      servicesPageQuery,
      {},
      { next: { tags: [CACHE_TAGS.servicesPage] } },
    );
    return raw ? toServicesPageContent(raw) : null;
  },
  async getContactPageContent(): Promise<ContactPageContent | null> {
    const raw = await sanityClient.fetch(
      contactPageQuery,
      {},
      { next: { tags: [CACHE_TAGS.contactPage] } },
    );
    return raw ? toContactPageContent(raw) : null;
  },
  async listServices(): Promise<Service[]> {
    const raw = await sanityClient.fetch(
      listServicesQuery,
      {},
      { next: { tags: [CACHE_TAGS.service] } },
    );
    return raw.map(toService);
  },
  async listTeamMembers(): Promise<TeamMember[]> {
    const raw = await sanityClient.fetch(
      listTeamMembersQuery,
      {},
      { next: { tags: [CACHE_TAGS.teamMember] } },
    );
    return raw.map(toTeamMember);
  },
};
