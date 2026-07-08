import Link from "next/link";
import type { SiteSettings } from "@/modules/content/domain/site-settings";
import { NewsletterForm } from "@/modules/content/ui/layout/NewsletterForm";

type Props = {
  siteSettings: SiteSettings | null;
};

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({ siteSettings }: Props) {
  const studioName = siteSettings?.studioName || "Nivasa";

  return (
    <footer className="bg-footer-bg text-footer-fg mt-16">
      <div className="mx-auto max-w-[1320px] px-5 pt-14 pb-8 sm:px-8 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="text-background font-serif text-2xl font-semibold tracking-[0.16em]">
              {studioName}
            </div>
            <p className="text-faint mt-2.5 max-w-64 text-sm">
              {siteSettings?.tagline ||
                "Interior architecture & design studio."}
            </p>
          </div>

          <div>
            <div className="text-faint mb-4 font-mono text-[10.5px] tracking-[0.16em] uppercase">
              Menu
            </div>
            <div className="grid gap-2.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-footer-fg hover:text-background text-sm no-underline transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-faint mb-4 font-mono text-[10.5px] tracking-[0.16em] uppercase">
              Newsletter
            </div>
            <p className="text-faint mb-3.5 text-sm">
              Occasional notes on new work.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-footer-fg/15 text-faint mt-12 flex flex-wrap justify-between gap-3 border-t pt-5 font-mono text-xs">
          <span>
            © {new Date().getFullYear()} {studioName} Studio. All rights
            reserved.
          </span>
          <a
            href="https://nitishpoonia.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-footer-fg hover:text-background no-underline transition-colors"
          >
            Site by Nitish Poonia
          </a>
        </div>
      </div>
    </footer>
  );
}
