import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { TeamMember } from "@/modules/content/domain/team-member";
import { TeamMemberCard } from "@/modules/content/ui/studio/TeamMemberCard";

type Props = {
  team: TeamMember[];
};

export function TeamGrid({ team }: Props) {
  if (team.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-8">
      <Eyebrow className="mb-6.5">People</Eyebrow>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {team.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
