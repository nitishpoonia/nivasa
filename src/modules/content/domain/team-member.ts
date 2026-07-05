import type { Media } from "@/modules/content/domain/media";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: Media;
};
