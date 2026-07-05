import Image from "next/image";
import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { AboutPageContent } from "@/modules/content/domain/about-page-content";

type Props = {
  content: AboutPageContent | null;
};

export function StudioIntro({ content }: Props) {
  const heading =
    content?.heading ||
    "A small practice with a long attention span, designing spaces meant to age gracefully.";

  return (
    <>
      <section className="mx-auto max-w-[1320px] px-5 pt-12 sm:px-8 sm:pt-20">
        <Eyebrow>The Studio</Eyebrow>
        <h1 className="mt-6 max-w-[20ch] font-serif text-4xl leading-tight font-normal sm:text-6xl">
          {heading}
        </h1>
      </section>

      {content?.portraitImage ? (
        <section className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="border-border relative aspect-[12/5] overflow-hidden border">
            <Image
              src={content.portraitImage.url}
              alt={content.portraitImage.alt}
              fill
              className="object-cover"
            />
          </div>
        </section>
      ) : null}

      {content && content.practiceParagraphs.length > 0 ? (
        <section className="mx-auto max-w-[1320px] px-5 pb-12 sm:px-8">
          <Eyebrow className="mb-3.5">Practice</Eyebrow>
          <div className="grid gap-4">
            {content.practiceParagraphs.map((paragraph, index) => (
              <p key={index} className="text-muted max-w-[70ch] text-[15.5px]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
