import Link from "next/link";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import type { Service } from "@/modules/content/domain/service";

type Props = {
  services: Service[];
};

export function ServicesTeaser({ services }: Props) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-8 sm:pt-24">
      <SectionHeading
        eyebrow="What We Do"
        action={
          <Link
            href="/services"
            className="text-muted hover:text-foreground text-[13px] no-underline"
          >
            Services →
          </Link>
        }
        className="mb-2.5"
      />
      {services.map((service, index) => (
        <Link
          key={service.id}
          href="/services"
          className="border-border hover:bg-surface/40 grid grid-cols-[64px_1fr_auto] items-center gap-5 border-b py-6 no-underline"
        >
          <span className="text-accent font-mono text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-foreground font-serif text-2xl leading-none sm:text-4xl">
            {service.name}
          </span>
          <span className="text-subtle max-w-[34ch] text-right text-sm">
            {service.description}
          </span>
        </Link>
      ))}
    </section>
  );
}
