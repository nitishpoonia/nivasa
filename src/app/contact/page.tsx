import { cms } from "@/lib/cms";
import { getSiteSettings, ContactInfo, ContactForm } from "@/modules/content";
import { Eyebrow } from "@/lib/ui/Eyebrow";
import { Container } from "@/lib/ui/Container";

export default async function ContactPage() {
  const siteSettings = await getSiteSettings(cms);

  return (
    <Container className="max-w-[1320px] py-16">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-5 max-w-[14ch] font-serif text-6xl leading-[0.98] font-medium sm:text-8xl">
        Let&apos;s make something lasting.
      </h1>

      <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-20">
        <ContactInfo siteSettings={siteSettings} />
        <ContactForm />
      </div>
    </Container>
  );
}
