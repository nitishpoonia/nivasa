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
          className="border-border grid grid-cols-[40px_1fr_20px] items-center gap-5 border-b py-6.5 no-underline transition-[box-shadow,padding] duration-[240ms] hover:pl-[18px] hover:shadow-[inset_3px_0_0_var(--accent)] sm:grid-cols-[64px_1fr_minmax(0,34ch)_28px]"
        >
          <span className="text-accent font-mono text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-foreground font-serif text-2xl leading-none sm:text-[38px]">
            {service.name}
          </span>
          <span className="text-subtle hidden text-right text-sm leading-normal sm:block">
            {service.description}
          </span>
          <span className="text-accent text-right text-sm">→</span>
        </Link>
      ))}
    </section>
  );
}
