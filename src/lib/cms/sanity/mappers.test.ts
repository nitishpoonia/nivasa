import { describe, expect, it } from "vitest";
import { toProject } from "@/lib/cms/sanity/mappers";

describe("toProject", () => {
  it("maps a raw Sanity document to the Project domain type", () => {
    const project = toProject({
      _id: "abc123",
      title: "Lakeview House",
      slug: "lakeview-house",
      summary: "A quiet retreat.",
      coverImage: {
        alt: "Living room with lake view",
        asset: {
          url: "https://cdn.sanity.io/cover.jpg",
          metadata: { dimensions: { width: 1600, height: 900 } },
        },
      },
      gallery: [],
      location: "Udaipur",
      year: 2024,
      categories: ["residential"],
    });

    expect(project).toEqual({
      id: "abc123",
      slug: "lakeview-house",
      title: "Lakeview House",
      summary: "A quiet retreat.",
      coverImage: {
        url: "https://cdn.sanity.io/cover.jpg",
        width: 1600,
        height: 900,
        alt: "Living room with lake view",
        blurDataUrl: undefined,
      },
      gallery: [],
      location: "Udaipur",
      year: 2024,
      categories: ["residential"],
    });
  });

  it("falls back to an empty alt string when the image has none", () => {
    const project = toProject({
      _id: "xyz",
      title: "Untitled",
      slug: "untitled",
      coverImage: { asset: { url: "https://cdn.sanity.io/x.jpg" } },
    });

    expect(project.coverImage.alt).toBe("");
  });
});
