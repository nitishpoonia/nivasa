import { cms } from "@/lib/cms";
import {
  listProjects,
  listServices,
  getHomePageContent,
  HomeHero,
  FeaturedProjects,
  QuoteSection,
  ServicesTeaser,
  ContactCta,
} from "@/modules/content";

export default async function Home() {
  const [content, projects, services] = await Promise.all([
    getHomePageContent(cms),
    listProjects(cms),
    listServices(cms),
  ]);

  return (
    <main className="flex-1">
      <HomeHero content={content} />
      <FeaturedProjects
        projects={projects.slice(0, 3)}
        totalCount={projects.length}
      />
      <QuoteSection quoteText={content?.quoteText ?? ""} />
      <ServicesTeaser services={services} />
      <ContactCta />
    </main>
  );
}
