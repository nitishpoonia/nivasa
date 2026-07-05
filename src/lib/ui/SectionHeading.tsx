import type { ReactNode } from "react";
import { Eyebrow } from "@/lib/ui/Eyebrow";

type Props = {
  eyebrow: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, action, className }: Props) {
  return (
    <div
      className={`border-border flex items-baseline justify-between border-b pb-4 ${className ?? ""}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      {action}
    </div>
  );
}
