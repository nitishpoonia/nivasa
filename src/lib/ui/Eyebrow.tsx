import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: Props) {
  return (
    <div
      className={`text-accent font-mono text-[11px] tracking-[0.2em] uppercase ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
