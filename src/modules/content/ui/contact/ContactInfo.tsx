import { Eyebrow } from "@/lib/ui/Eyebrow";
import type { SiteSettings } from "@/modules/content/domain/site-settings";

type Props = {
  siteSettings: SiteSettings | null;
};

export function ContactInfo({ siteSettings }: Props) {
  if (!siteSettings) {
    return (
      <p className="text-muted">Contact details will be published here soon.</p>
    );
  }

  return (
    <div>
      <Eyebrow className="mb-5">Get in touch</Eyebrow>
      <a
        href={`mailto:${siteSettings.email}`}
        className="border-foreground/30 hover:border-foreground text-foreground border-b pb-0.5 font-serif text-2xl no-underline sm:text-4xl"
      >
        {siteSettings.email}
      </a>
      {siteSettings.phone ? (
        <div className="text-muted mt-2 text-base">{siteSettings.phone}</div>
      ) : null}

      {siteSettings.offices.length > 0 ? (
        <div className="mt-11 grid grid-cols-2 gap-7">
          {siteSettings.offices.map((office) => (
            <div key={office.city}>
              <div className="text-faint mb-2 font-mono text-[10.5px] tracking-[0.14em] uppercase">
                {office.city}
              </div>
              <div className="text-muted text-sm leading-[1.7]">
                {office.addressLines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {siteSettings.socialLinks.length > 0 ? (
        <div className="mt-10 flex gap-5.5">
          {siteSettings.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="text-muted hover:text-foreground text-[13px] no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
