import type { Media } from "@/modules/content/domain/media";

export type Principle = {
  title: string;
  body: string;
};

export type AboutPageContent = {
  heading: string;
  portraitImage?: Media;
  practiceParagraphs: string[];
  principles: Principle[];
};
