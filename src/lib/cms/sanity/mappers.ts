import type { Media } from "@/modules/content/domain/media";
import type { Project } from "@/modules/content/domain/project";

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
  coverImage?: RawImage;
  gallery?: RawImage[];
  location?: string;
  year?: number;
  categories?: string[];
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
    coverImage: toMedia(raw.coverImage),
    gallery: (raw.gallery ?? []).map(toMedia),
    location: raw.location,
    year: raw.year,
    categories: raw.categories ?? [],
  };
}
