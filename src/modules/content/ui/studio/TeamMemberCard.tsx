import Image from "next/image";
import type { TeamMember } from "@/modules/content/domain/team-member";

type Props = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: Props) {
  return (
    <div>
      <div className="border-border bg-surface relative aspect-square overflow-hidden border">
        <Image
          src={member.photo.url}
          alt={member.photo.alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3 font-serif text-xl">{member.name}</div>
      <div className="text-subtle text-[12.5px]">{member.role}</div>
    </div>
  );
}
