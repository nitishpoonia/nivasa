import type { Media } from "@/modules/content/domain/media";

export type HomePageContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroSubtext: string;
  heroImage?: Media;
  quoteText: string;
};
