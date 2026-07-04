import type { Media } from "@/modules/content/domain/media";

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: Media;
  gallery: Media[];
  location?: string;
  year?: number;
  categories: string[];
};
