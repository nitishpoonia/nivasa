import type { Media } from "@/modules/content/domain/media";
import type { Project } from "@/modules/content/domain/project";
import type { SiteSettings } from "@/modules/content/domain/site-settings";
import type { HomePageContent } from "@/modules/content/domain/home-page-content";
import type { AboutPageContent } from "@/modules/content/domain/about-page-content";
import type { ServicesPageContent } from "@/modules/content/domain/services-page-content";
import type { ContactPageContent } from "@/modules/content/domain/contact-page-content";
import type { Service } from "@/modules/content/domain/service";
import type { TeamMember } from "@/modules/content/domain/team-member";
import type { Award } from "@/modules/content/domain/award";

type RawImage = {
  alt?: string;
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: { width?: number; height?: number };
      lqip?: string;
    };
  };
};

type RawProject = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string[];
  coverImage?: RawImage;
  gallery?: RawImage[];
  location?: string;
  year?: number;
  categories?: string[];
};

type RawOffice = {
  city?: string;
  addressLines?: string[];
};

type RawSocialLink = {
  label?: string;
  url?: string;
};

type RawSiteSettings = {
  studioName?: string;
  tagline?: string;
  accentColor?: string;
  email?: string;
  phone?: string;
  offices?: RawOffice[];
  socialLinks?: RawSocialLink[];
};

type RawHomePage = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubtext?: string;
  heroImage?: RawImage;
  quoteText?: string;
};

type RawPrinciple = {
  title?: string;
  body?: string;
};

type RawAboutPage = {
  heading?: string;
  portraitImage?: RawImage;
  practiceParagraphs?: string[];
  principles?: RawPrinciple[];
};

type RawProcessStep = {
  title?: string;
  body?: string;
};

type RawServicesPage = {
  heading?: string;
  intro?: string;
  process?: RawProcessStep[];
};

type RawContactPage = {
  heading?: string;
  intro?: string;
};

type RawService = {
  _id: string;
  name?: string;
  description?: string;
  tags?: string[];
};

type RawTeamMember = {
  _id: string;
  name?: string;
  role?: string;
  photo?: RawImage;
};

type RawAward = {
  _id: string;
  year?: number;
  title?: string;
  organization?: string;
};

function toMedia(image: RawImage | undefined): Media {
  return {
    url: image?.asset?.url ?? "",
    width: image?.asset?.metadata?.dimensions?.width ?? 0,
    height: image?.asset?.metadata?.dimensions?.height ?? 0,
    alt: image?.alt ?? "",
    blurDataUrl: image?.asset?.metadata?.lqip,
  };
}

export function toProject(raw: RawProject): Project {
  return {
    id: raw._id,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary ?? "",
    description: raw.description ?? [],
    coverImage: toMedia(raw.coverImage),
    gallery: (raw.gallery ?? []).map(toMedia),
    location: raw.location,
    year: raw.year,
    categories: raw.categories ?? [],
  };
}

export function toSiteSettings(raw: RawSiteSettings): SiteSettings {
  return {
    studioName: raw.studioName ?? "",
    tagline: raw.tagline ?? "",
    accentColor: raw.accentColor ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    offices: (raw.offices ?? []).map((office) => ({
      city: office.city ?? "",
      addressLines: office.addressLines ?? [],
    })),
    socialLinks: (raw.socialLinks ?? []).map((link) => ({
      label: link.label ?? "",
      url: link.url ?? "",
    })),
  };
}

export function toHomePageContent(raw: RawHomePage): HomePageContent {
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroHeading: raw.heroHeading ?? "",
    heroSubtext: raw.heroSubtext ?? "",
    heroImage: raw.heroImage ? toMedia(raw.heroImage) : undefined,
    quoteText: raw.quoteText ?? "",
  };
}

export function toAboutPageContent(raw: RawAboutPage): AboutPageContent {
  return {
    heading: raw.heading ?? "",
    portraitImage: raw.portraitImage ? toMedia(raw.portraitImage) : undefined,
    practiceParagraphs: raw.practiceParagraphs ?? [],
    principles: (raw.principles ?? []).map((principle) => ({
      title: principle.title ?? "",
      body: principle.body ?? "",
    })),
  };
}

export function toServicesPageContent(
  raw: RawServicesPage,
): ServicesPageContent {
  return {
    heading: raw.heading ?? "",
    intro: raw.intro ?? "",
    process: (raw.process ?? []).map((step) => ({
      title: step.title ?? "",
      body: step.body ?? "",
    })),
  };
}

export function toContactPageContent(raw: RawContactPage): ContactPageContent {
  return {
    heading: raw.heading ?? "",
    intro: raw.intro ?? "",
  };
}

export function toService(raw: RawService): Service {
  return {
    id: raw._id,
    name: raw.name ?? "",
    description: raw.description ?? "",
    tags: raw.tags ?? [],
  };
}

export function toTeamMember(raw: RawTeamMember): TeamMember {
  return {
    id: raw._id,
    name: raw.name ?? "",
    role: raw.role ?? "",
    photo: toMedia(raw.photo),
  };
}

export function toAward(raw: RawAward): Award {
  return {
    id: raw._id,
    year: raw.year ?? 0,
    title: raw.title ?? "",
    organization: raw.organization ?? "",
  };
}
