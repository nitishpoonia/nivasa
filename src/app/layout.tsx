import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import { cms } from "@/lib/cms";
import { getSiteSettings, SiteHeader, SiteFooter } from "@/modules/content";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nivasa",
  description: "Interior design & architecture studio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings(cms);

  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${instrumentSans.variable} h-full antialiased`}
      style={
        siteSettings?.accentColor
          ? ({ "--accent": siteSettings.accentColor } as React.CSSProperties)
          : undefined
      }
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-body)]">
        <SiteHeader siteSettings={siteSettings} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter siteSettings={siteSettings} />
      </body>
    </html>
  );
}
