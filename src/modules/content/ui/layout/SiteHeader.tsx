"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/modules/content/domain/site-settings";

type Props = {
  siteSettings: SiteSettings | null;
};

const navItems = [
  { href: "/projects", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ siteSettings }: Props) {
  const pathname = usePathname();
  const studioName = siteSettings?.studioName || "Nivasa";

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="text-foreground flex flex-col no-underline">
          <span className="font-serif text-2xl font-semibold tracking-[0.16em]">
            {studioName}
          </span>
          <span className="text-faint mt-0.5 font-mono text-[9.5px] tracking-[0.22em] uppercase">
            Architecture · Interiors
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-5 sm:gap-8">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-foreground text-[13.5px] tracking-wide no-underline transition-colors ${
                  isActive ? "text-foreground font-medium" : "text-subtle"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="bg-foreground text-background hover:bg-muted rounded-full px-4.5 py-2 text-[12.5px] tracking-wide no-underline transition-colors"
          >
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
