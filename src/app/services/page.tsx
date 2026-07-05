import { cms } from "@/lib/cms";
import {
  getServicesPageContent,
  listServices,
  ServicesList,
  ProcessSteps,
} from "@/modules/content";
import { Eyebrow } from "@/lib/ui/Eyebrow";
import { Container } from "@/lib/ui/Container";

export default async function ServicesPage() {
  const [content, services] = await Promise.all([
    getServicesPageContent(cms),
    listServices(cms),
  ]);

  return (
    <Container className="max-w-[1320px] py-16">
      <Eyebrow>Services</Eyebrow>
      <h1 className="mt-5 font-serif text-6xl font-medium sm:text-8xl">
        {content?.heading || "What we offer"}
      </h1>
      <p className="text-muted mt-6 max-w-[52ch] text-base sm:text-lg">
        {content?.intro ||
          "An end-to-end practice — from first sketch to the final placed object."}
      </p>

      <ServicesList services={services} />
      <ProcessSteps steps={content?.process ?? []} />
    </Container>
  );
}
