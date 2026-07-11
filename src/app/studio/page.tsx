import { cms } from "@/lib/cms";
import {
  getAboutPageContent,
  listTeamMembers,
  StudioIntro,
  PrinciplesList,
  TeamGrid,
} from "@/modules/content";

export default async function StudioPage() {
  const [content, team] = await Promise.all([
    getAboutPageContent(cms),
    listTeamMembers(cms),
  ]);

  return (
    <main className="flex-1">
      <StudioIntro content={content} />
      <PrinciplesList principles={content?.principles ?? []} />
      <TeamGrid team={team} />
    </main>
  );
}
