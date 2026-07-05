import { Eyebrow } from "@/lib/ui/Eyebrow";

type Props = {
  quoteText: string;
};

export function QuoteSection({ quoteText }: Props) {
  if (!quoteText) {
    return null;
  }

  return (
    <section className="border-border bg-surface mt-16 border-y sm:mt-24">
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-24">
        <Eyebrow className="mb-7">Our Approach</Eyebrow>
        <p className="max-w-[24ch] font-serif text-3xl leading-tight font-normal sm:text-5xl">
          &ldquo;{quoteText}&rdquo;
        </p>
      </div>
    </section>
  );
}
