import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { ProcessStep } from "@/modules/content/domain/services-page-content";

type Props = {
  steps: ProcessStep[];
};

export function ProcessSteps({ steps }: Props) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="border-border mt-14 border-t pt-10 sm:mt-24 sm:pt-16">
      <Eyebrow className="mb-7.5">How we work</Eyebrow>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="text-accent font-serif text-4xl leading-none">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 font-serif text-2xl">{step.title}</div>
            <div className="text-subtle mt-2 text-[13.5px]">{step.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
