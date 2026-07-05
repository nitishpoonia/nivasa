import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "accent";
  className?: string;
};

const variantClasses = {
  solid: "bg-foreground text-background hover:bg-muted",
  accent: "bg-accent text-background hover:opacity-90",
};

export function PillLink({
  href,
  children,
  variant = "solid",
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-full px-6 py-3 text-sm tracking-wide transition-colors ${variantClasses[variant]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
