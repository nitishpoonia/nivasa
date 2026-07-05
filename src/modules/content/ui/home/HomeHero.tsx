import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { HomePageContent } from "@/modules/content/domain/home-page-content";

type Props = {
  content: HomePageContent | null;
};

export function HomeHero({ content }: Props) {
  const heroEyebrow = content?.heroEyebrow || "Interior Architecture & Design";
  const heroHeading =
    content?.heroHeading || "Quiet architecture for considered living.";
  const heroSubtext =
    content?.heroSubtext ||
    "We shape residential and cultural spaces where material, light and proportion are given room to breathe.";

  return (
    <section className="mx-auto max-w-[1320px] px-5 pt-12 pb-8 sm:px-8 sm:pt-20 sm:pb-12">
      <Eyebrow>{heroEyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-[15ch] font-serif text-5xl leading-[0.98] font-medium tracking-tight sm:text-7xl lg:text-8xl">
        {heroHeading}
      </h1>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <p className="text-muted max-w-[46ch] text-base sm:text-lg">
          {heroSubtext}
        </p>
        <Link
          href="/projects"
          className="border-foreground text-foreground border-b pb-0.5 text-sm whitespace-nowrap no-underline hover:opacity-60"
        >
          View selected work →
        </Link>
      </div>

      {content?.heroImage ? (
        <div className="border-border relative mt-10 aspect-[16/9] overflow-hidden border sm:aspect-[21/9]">
          <Image
            src={content.heroImage.url}
            alt={content.heroImage.alt}
            fill
            priority
            className="object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}
