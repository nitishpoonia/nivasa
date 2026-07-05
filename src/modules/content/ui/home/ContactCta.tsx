import { PillLink } from "@/lib/ui/PillLink";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-20 text-center sm:px-8 sm:py-32">
      <h2 className="font-serif text-4xl leading-tight font-medium sm:text-7xl">
        Have a project
        <br />
        in mind?
      </h2>
      <PillLink href="/contact" variant="accent" className="mt-9">
        Start a conversation
      </PillLink>
    </section>
  );
}
