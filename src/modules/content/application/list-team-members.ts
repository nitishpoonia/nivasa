import type { CmsPort } from "@/lib/cms";
import type { TeamMember } from "@/modules/content/domain/team-member";

export async function listTeamMembers(cms: CmsPort): Promise<TeamMember[]> {
  return cms.listTeamMembers();
}
