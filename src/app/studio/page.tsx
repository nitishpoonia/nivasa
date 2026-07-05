import { cms } from "@/lib/cms";
import {
  getAboutPageContent,
  listTeamMembers,
  listAwards,
  StudioIntro,
  PrinciplesList,
  TeamGrid,
  AwardsList,
} from "@/modules/content";

export default async function StudioPage() {
  const [content, team, awards] = await Promise.all([
    getAboutPageContent(cms),
    listTeamMembers(cms),
    listAwards(cms),
  ]);

  return (
    <main className="flex-1">
      <StudioIntro content={content} />
      <PrinciplesList principles={content?.principles ?? []} />
      <TeamGrid team={team} />
      <AwardsList awards={awards} />
    </main>
  );
}
