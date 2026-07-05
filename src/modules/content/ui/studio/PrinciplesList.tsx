import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { Principle } from "@/modules/content/domain/about-page-content";

type Props = {
  principles: Principle[];
};

export function PrinciplesList({ principles }: Props) {
  if (principles.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-8">
      <Eyebrow className="mb-3.5">Principles</Eyebrow>
      {principles.map((principle, index) => (
        <div key={index} className="border-border flex gap-3.5 border-b py-4">
          <span className="text-accent pt-1 font-mono text-[11px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="font-serif text-xl leading-tight">
              {principle.title}
            </div>
            <div className="text-subtle mt-0.5 text-sm">{principle.body}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
