import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@sanity/client";
import sharp from "sharp";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const PDF_DIR = path.join(process.env.HOME ?? "", "Downloads/nivasa-pdfs");

const OLD_PLACEHOLDER_PROJECT_IDS = [
  "project-casa-lumena",
  "project-the-vessel",
  "project-marlow-house",
  "project-atelier-nord",
  "project-duna-pavilion",
  "project-field-notes",
];

type CropFraction = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ImageSpec = {
  pdf: string;
  page: number;
  crop?: CropFraction;
  alt: string;
};

type ProjectSpec = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  year?: number;
  categories: string[];
  cover: ImageSpec;
  gallery: ImageSpec[];
};

const projects: ProjectSpec[] = [
  {
    slug: "tv-unit-jaipur-residence",
    title: "TV Unit — Jaipur Residence",
    summary:
      "A first-floor TV wall in a Jaipur home built around UV marble sheeting and fluted wood panelling, with warm brass-lit joinery framing the screen and a PU-laminate finish that keeps the room feeling calm rather than showy.",
    location: "Jaipur, Rajasthan",
    year: 2026,
    categories: ["Residential", "Living"],
    cover: {
      pdf: "1ST FLOOR M.R TV UNIT-1.pdf",
      page: 1,
      crop: { left: 0.491, top: 0.278, width: 0.436, height: 0.375 },
      alt: "TV wall in fluted wood panelling with brass-lit marble surround, Jaipur residence",
    },
    gallery: [],
  },
  {
    slug: "bedroom-in-wood-and-stone",
    title: "Bedroom in Wood and Stone",
    summary:
      "A Jaipur bedroom pairing a book-matched marble accent wall with dark walnut-tone panelling, an arched mirror dressing nook, and brass sconce lighting for a warm, material-led take on a master suite.",
    location: "Jaipur, Rajasthan",
    categories: ["Residential", "Bedroom"],
    cover: {
      pdf: "2b97e1aa-417e-427f-9df2-0834ae2d6f12.pdf",
      page: 1,
      alt: "Bedroom with marble accent wall, walnut panelling and arched dressing mirror",
    },
    gallery: [
      {
        pdf: "2b97e1aa-417e-427f-9df2-0834ae2d6f12.pdf",
        page: 3,
        alt: "Bedroom TV wall in walnut panelling with fluted wardrobe detailing",
      },
      {
        pdf: "2b97e1aa-417e-427f-9df2-0834ae2d6f12.pdf",
        page: 8,
        alt: "Close view of bed against walnut TV wall with brass sconce lighting",
      },
    ],
  },
  {
    slug: "dining-and-living-pavilion",
    title: "Dining & Living Pavilion",
    summary:
      "An open dining and living layout centred on a round brass-base dining table and glass-front wine cabinetry, opening into a sectional living room with ladder shelving and a warm-toned TV wall.",
    location: "Jaipur, Rajasthan",
    categories: ["Residential", "Living"],
    cover: {
      pdf: "4f704f14-fa01-407e-a850-8a6339bc1764.pdf",
      page: 1,
      alt: "Round dining table with brass base and glass-front wine cabinetry",
    },
    gallery: [
      {
        pdf: "4f704f14-fa01-407e-a850-8a6339bc1764.pdf",
        page: 5,
        alt: "Sectional living room with ladder shelving and warm-lit TV wall",
      },
    ],
  },
  {
    slug: "hall-false-ceiling-jatin-residence",
    title: "Hall False Ceiling — Jatin Residence",
    summary:
      "A ground-floor hall built around a circular cove-lit false ceiling, layered over a dining setting in deep plum upholstery for a warm, sculptural entertaining space.",
    location: "Jaipur, Rajasthan",
    categories: ["Residential", "Living"],
    cover: {
      pdf: "b753d6bb-97ec-47c5-8174-786f544e4b15.pdf",
      page: 1,
      crop: { left: 0.574, top: 0.16, width: 0.306, height: 0.338 },
      alt: "Circular cove-lit false ceiling above a dining setting in plum upholstery",
    },
    gallery: [],
  },
  {
    slug: "classical-living-room",
    title: "Classical Living Room",
    summary:
      "A living room finished in ivory boiserie panelling with a walnut feature door, a sculptural marble-and-brass coffee table, and a black accent piece to ground the palette.",
    location: "Jaipur, Rajasthan",
    categories: ["Residential", "Living"],
    cover: {
      pdf: "cfdc30a3-25c5-4cdf-8938-784ac04659e8.pdf",
      page: 1,
      alt: "Living room with ivory boiserie panelling, walnut door and marble coffee table",
    },
    gallery: [
      {
        pdf: "cfdc30a3-25c5-4cdf-8938-784ac04659e8.pdf",
        page: 6,
        alt: "Sofa seating beneath an arched black accent niche with sculptural figure",
      },
    ],
  },
  {
    slug: "sihag-residence-exterior",
    title: "Sihag Residence — Exterior",
    summary:
      "A two-storey exterior elevation for the Sihag residence in Fazilka, Punjab, with cantilevered balconies, a stone-clad boundary wall and landscaped frontage. Designed and drawn by AV Design Studio, Fazilka — included here at the client's request alongside the Jaipur portfolio above.",
    location: "Fazilka, Punjab",
    categories: ["Residential", "Exterior"],
    cover: {
      pdf: "fbfd0f04-6cba-486e-8db1-a1253da8761f.pdf",
      page: 1,
      crop: { left: 0.051, top: 0.079, width: 0.893, height: 0.713 },
      alt: "3D exterior render of a two-storey house with cantilevered balconies and landscaped frontage",
    },
    gallery: [
      {
        pdf: "db9da7e1-23b2-4740-9a7e-009a9c424c96.pdf",
        page: 1,
        crop: { left: 0.209, top: 0.079, width: 0.564, height: 0.616 },
        alt: "2D front elevation drawing of the Sihag residence",
      },
    ],
  },
  {
    slug: "ornamental-bedroom-suite",
    title: "Ornamental Bedroom Suite",
    summary:
      "A Jaipur bedroom suite framed by an arched wood surround with a hand-painted mandala motif above the bed, extending into a floral-wallpapered dressing area with a five-door wardrobe and mirrored nook.",
    location: "Jaipur, Rajasthan",
    categories: ["Residential", "Bedroom"],
    cover: {
      pdf: "master bedroom.pdf",
      page: 1,
      alt: "Bed beneath an arched wood surround with hand-painted mandala wall motif",
    },
    gallery: [
      {
        pdf: "master bedroom.pdf",
        page: 6,
        alt: "TV wall in wood panelling opposite the bed, wardrobe suite",
      },
      {
        pdf: "master bedroom.pdf",
        page: 8,
        alt: "Dressing mirror nook beside the wardrobe wall",
      },
      {
        pdf: "master bedroom.pdf",
        page: 9,
        alt: "Floral-wallpapered wall with door and curtained window",
      },
    ],
  },
  {
    slug: "wardrobe-interior-sambhav-dua-residence",
    title: "Wardrobe Interior — Sambhav Dua Residence",
    summary:
      "A first-floor wardrobe interior for the Sambhav Dua residence, fitted with a hydraulic pull-down clothes rail, fluted MDF-PU shutters and a mirrored dressing recess with laminate detailing.",
    location: "Jaipur, Rajasthan",
    year: 2026,
    categories: ["Residential", "Bedroom"],
    cover: {
      pdf: "ROOM 1 Sambhav dua.pdf",
      page: 1,
      crop: { left: 0.372, top: 0.351, width: 0.243, height: 0.193 },
      alt: "Bedroom dressing nook with arched mirror beside wardrobe, Sambhav Dua residence",
    },
    gallery: [],
  },
];

function rasterizePage(pdfPath: string, page: number, workDir: string): string {
  const prefix = path.join(
    workDir,
    `p${page}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  execFileSync("pdftoppm", [
    "-r",
    "300",
    "-png",
    "-f",
    String(page),
    "-l",
    String(page),
    pdfPath,
    prefix,
  ]);
  const dir = path.dirname(prefix);
  const base = path.basename(prefix);
  const match = readdirSync(dir).find((name) => name.startsWith(base));
  if (!match) {
    throw new Error(
      `pdftoppm did not produce output for ${pdfPath} page ${page}`,
    );
  }
  return path.join(dir, match);
}

async function buildImageBuffer(
  spec: ImageSpec,
  workDir: string,
): Promise<Buffer> {
  const pdfPath = path.join(PDF_DIR, spec.pdf);
  const pngPath = rasterizePage(pdfPath, spec.page, workDir);
  let image = sharp(pngPath);

  if (spec.crop) {
    const metadata = await image.metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    image = image.extract({
      left: Math.round(spec.crop.left * width),
      top: Math.round(spec.crop.top * height),
      width: Math.round(spec.crop.width * width),
      height: Math.round(spec.crop.height * height),
    });
  }

  return image
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
}

const assetCache = new Map<string, string>();

async function uploadImage(spec: ImageSpec, workDir: string) {
  const cacheKey = `${spec.pdf}#${spec.page}#${JSON.stringify(spec.crop)}`;
  let assetId = assetCache.get(cacheKey);
  if (!assetId) {
    const buffer = await buildImageBuffer(spec, workDir);
    const filename = `${spec.pdf.replace(/\.pdf$/i, "")}-p${spec.page}.webp`;
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: "image/webp",
    });
    assetId = asset._id;
    assetCache.set(cacheKey, assetId);
    console.log(`Uploaded ${filename}`);
  }
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
    alt: spec.alt,
  };
}

async function seed() {
  const workDir = mkdtempSync(path.join(tmpdir(), "nivasa-pdf-"));
  try {
    console.log("Deleting placeholder projects...");
    for (const id of OLD_PLACEHOLDER_PROJECT_IDS) {
      await client.delete(id);
    }

    console.log("Seeding real projects from client PDFs...");
    for (const project of projects) {
      console.log(`- ${project.title}`);
      const coverImage = await uploadImage(project.cover, workDir);
      const gallery = [];
      for (const spec of project.gallery) {
        gallery.push(await uploadImage(spec, workDir));
      }

      await client.createOrReplace({
        _id: `project-${project.slug}`,
        _type: "project",
        title: project.title,
        slug: { _type: "slug", current: project.slug },
        summary: project.summary,
        coverImage,
        gallery,
        location: project.location,
        ...(project.year ? { year: project.year } : {}),
        categories: project.categories,
      });
    }

    console.log("Done seeding real projects.");
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
