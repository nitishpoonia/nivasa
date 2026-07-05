import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function PillButton({ className, children, ...rest }: Props) {
  return (
    <button
      className={`bg-accent text-background justify-self-start rounded-full px-8 py-3.5 text-sm tracking-wide transition-opacity hover:opacity-90 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
