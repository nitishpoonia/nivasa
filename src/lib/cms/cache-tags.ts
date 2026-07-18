export const CACHE_TAGS = {
  project: "project",
  siteSettings: "siteSettings",
  homePage: "homePage",
  aboutPage: "aboutPage",
  servicesPage: "servicesPage",
  contactPage: "contactPage",
  service: "service",
  teamMember: "teamMember",
} as const;

export type CmsDocumentType = keyof typeof CACHE_TAGS;
