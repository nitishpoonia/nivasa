import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "accent" | "node" | "node-inverted";
  size?: "default" | "sm";
  className?: string;
};

const baseClasses = {
  solid:
    "inline-block rounded-full px-6 py-3 text-sm tracking-wide transition-colors bg-foreground text-background hover:bg-muted",
  accent:
    "inline-block rounded-full px-6 py-3 text-sm tracking-wide transition-colors bg-accent text-background hover:opacity-90",
  node: "group inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6.5 text-[15px] tracking-wide bg-accent text-background hover:gap-6 active:scale-[0.98] transition-[gap,transform] duration-200",
  "node-inverted":
    "group inline-flex items-center gap-1.25 rounded-full py-1.25 pr-1.25 pl-4 text-[12.5px] tracking-wide bg-foreground text-background hover:gap-3 active:scale-[0.98] transition-[gap,transform] duration-200",
};

const nodeClasses = {
  default:
    "bg-background text-accent flex size-[34px] items-center justify-center rounded-full text-sm",
  sm: "bg-accent text-background flex size-6 items-center justify-center rounded-full text-xs",
};

export function PillLink({
  href,
  children,
  variant = "solid",
  size = "default",
  className,
}: Props) {
  const isNode = variant === "node" || variant === "node-inverted";

  return (
    <Link href={href} className={`${baseClasses[variant]} ${className ?? ""}`}>
      {isNode ? (
        <>
          <span className="whitespace-nowrap">{children}</span>
          <span className={nodeClasses[size]}>→</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}
