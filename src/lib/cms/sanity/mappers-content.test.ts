import { describe, expect, it } from "vitest";
import {
  toSiteSettings,
  toHomePageContent,
  toAboutPageContent,
  toServicesPageContent,
  toContactPageContent,
  toService,
  toTeamMember,
  toAward,
} from "@/lib/cms/sanity/mappers";

describe("toSiteSettings", () => {
  it("maps a raw siteSettings document to the domain type", () => {
    const settings = toSiteSettings({
      studioName: "Nivasa",
      tagline: "Interior architecture & design.",
      accentColor: "#A56A45",
      email: "studio@nivasa.design",
      phone: "+91 00000 00000",
      offices: [{ city: "Udaipur", addressLines: ["123 Lake Rd"] }],
      socialLinks: [{ label: "Instagram", url: "https://instagram.com" }],
    });

    expect(settings).toEqual({
      studioName: "Nivasa",
      tagline: "Interior architecture & design.",
      accentColor: "#A56A45",
      email: "studio@nivasa.design",
      phone: "+91 00000 00000",
      offices: [{ city: "Udaipur", addressLines: ["123 Lake Rd"] }],
      socialLinks: [{ label: "Instagram", url: "https://instagram.com" }],
    });
  });

  it("falls back to empty strings and arrays when fields are missing", () => {
    const settings = toSiteSettings({});

    expect(settings).toEqual({
      studioName: "",
      tagline: "",
      accentColor: "",
      email: "",
      phone: "",
      offices: [],
      socialLinks: [],
    });
  });
});

describe("toHomePageContent", () => {
  it("maps a raw homePage document to the domain type", () => {
    const content = toHomePageContent({
      heroEyebrow: "Est. 2011",
      heroHeading: "Quiet architecture.",
      heroSubtext: "We shape residential spaces.",
      quoteText: "A room should feel inevitable.",
    });

    expect(content).toEqual({
      heroEyebrow: "Est. 2011",
      heroHeading: "Quiet architecture.",
      heroSubtext: "We shape residential spaces.",
      heroImage: undefined,
      quoteText: "A room should feel inevitable.",
    });
  });
});

describe("toAboutPageContent", () => {
  it("maps a raw aboutPage document to the domain type", () => {
    const content = toAboutPageContent({
      heading: "A small practice.",
      practiceParagraphs: ["Founded in 2011."],
      principles: [
        { title: "Material honesty", body: "Surfaces that age well." },
      ],
    });

    expect(content).toEqual({
      heading: "A small practice.",
      portraitImage: undefined,
      practiceParagraphs: ["Founded in 2011."],
      principles: [
        { title: "Material honesty", body: "Surfaces that age well." },
      ],
    });
  });
});

describe("toServicesPageContent", () => {
  it("maps a raw servicesPage document to the domain type", () => {
    const content = toServicesPageContent({
      heading: "What we offer",
      intro: "An end-to-end practice.",
      process: [{ title: "Listen", body: "Understanding the brief." }],
    });

    expect(content).toEqual({
      heading: "What we offer",
      intro: "An end-to-end practice.",
      process: [{ title: "Listen", body: "Understanding the brief." }],
    });
  });
});

describe("toContactPageContent", () => {
  it("maps a raw contactPage document to the domain type", () => {
    const content = toContactPageContent({
      heading: "Let's make something lasting.",
      intro: "Tell us about your project.",
    });

    expect(content).toEqual({
      heading: "Let's make something lasting.",
      intro: "Tell us about your project.",
    });
  });

  it("falls back to empty strings when fields are missing", () => {
    const content = toContactPageContent({});

    expect(content).toEqual({
      heading: "",
      intro: "",
    });
  });
});

describe("toService", () => {
  it("maps a raw service document to the domain type", () => {
    const service = toService({
      _id: "svc1",
      name: "Interior Architecture",
      description: "Spatial planning.",
      tags: ["Space planning"],
    });

    expect(service).toEqual({
      id: "svc1",
      name: "Interior Architecture",
      description: "Spatial planning.",
      tags: ["Space planning"],
    });
  });
});

describe("toTeamMember", () => {
  it("maps a raw teamMember document to the domain type, falling back to an empty alt", () => {
    const member = toTeamMember({
      _id: "person1",
      name: "Elsa Moreau",
      role: "Founder",
      photo: { asset: { url: "https://cdn.sanity.io/elsa.jpg" } },
    });

    expect(member.photo.alt).toBe("");
    expect(member).toEqual({
      id: "person1",
      name: "Elsa Moreau",
      role: "Founder",
      photo: {
        url: "https://cdn.sanity.io/elsa.jpg",
        width: 0,
        height: 0,
        alt: "",
        blurDataUrl: undefined,
      },
    });
  });
});

describe("toAward", () => {
  it("maps a raw award document to the domain type", () => {
    const award = toAward({
      _id: "award1",
      year: 2025,
      title: "AD100 — Emerging Practice",
      organization: "Architectural Digest",
    });

    expect(award).toEqual({
      id: "award1",
      year: 2025,
      title: "AD100 — Emerging Practice",
      organization: "Architectural Digest",
    });
  });
});
