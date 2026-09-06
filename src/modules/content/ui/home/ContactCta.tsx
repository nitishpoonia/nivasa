import { Eyebrow } from "@/lib/ui/Eyebrow";
import { PillLink } from "@/lib/ui/PillLink";

export function ContactCta() {
  return (
    <section className="border-border bg-surface mt-24 border-t">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-10 px-5 py-28 sm:px-8">
        <div>
          <Eyebrow>Next</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight font-medium sm:text-[76px] sm:leading-[1.02]">
            Have a project
            <br />
            in mind?
          </h2>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-muted max-w-[34ch] text-[15px]">
            Tell us about the site, the rooms and how you want to live in them.
            We reply within two working days.
          </p>
          <PillLink href="/contact" variant="node">
            Start a conversation
          </PillLink>
        </div>
      </div>
    </section>
  );
}
