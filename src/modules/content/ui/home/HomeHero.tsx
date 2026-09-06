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
    <section>
      {content?.heroImage ? (
        <div className="relative h-[420px] overflow-hidden sm:h-[620px]">
          <Image
            src={content.heroImage.url}
            alt={content.heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div
        className={`relative mx-auto max-w-[1320px] px-5 sm:px-8 ${
          content?.heroImage ? "sm:-mt-[132px]" : "pt-12 sm:pt-20"
        }`}
      >
        <div className="bg-background max-w-[900px] py-9 pr-6 sm:-ml-16 sm:pt-11 sm:pr-12 sm:pb-10 sm:pl-16">
          <div className="flex items-center gap-3.5">
            <span className="bg-accent block h-px w-11" />
            <Eyebrow>{heroEyebrow}</Eyebrow>
          </div>
          <h1 className="mt-5 max-w-[15ch] font-serif text-5xl leading-[0.96] font-medium tracking-[-0.025em] sm:text-[92px]">
            {heroHeading}
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1320px] flex-wrap items-end justify-between gap-8 px-5 sm:px-8">
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
    </section>
  );
}
