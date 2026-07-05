import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { Award } from "@/modules/content/domain/award";

type Props = {
  awards: Award[];
};

export function AwardsList({ awards }: Props) {
  if (awards.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface border-border border-t">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8">
        <Eyebrow className="mb-6">Recognition</Eyebrow>
        {awards.map((award) => (
          <div
            key={award.id}
            className="border-border grid grid-cols-[60px_1fr_auto] items-baseline gap-5 border-b py-4"
          >
            <span className="text-subtle font-mono text-xs">{award.year}</span>
            <span className="font-serif text-lg sm:text-2xl">
              {award.title}
            </span>
            <span className="text-subtle text-[12.5px]">
              {award.organization}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
