import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const palette = ["#E7DECF", "#E4DACA", "#DFD3BF", "#E5DBCB", "#E0D5C1"];

function placeholderSvg(label: string, color: string, ratio = 4 / 3) {
  const width = 1200;
  const height = Math.round(width / ratio);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${color}"/>
  <text x="50%" y="50%" font-family="Georgia,serif" font-size="42" fill="#8A7E6B" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`;
}

const assetCache = new Map<string, string>();

async function uploadPlaceholder(label: string, ratio?: number) {
  if (assetCache.has(label)) return assetCache.get(label)!;
  const color = palette[assetCache.size % palette.length];
  const svg = placeholderSvg(label, color, ratio);
  const asset = await client.assets.upload("image", Buffer.from(svg), {
    filename: `${label.toLowerCase().replace(/\s+/g, "-")}.svg`,
    contentType: "image/svg+xml",
  });
  assetCache.set(label, asset._id);
  return asset._id;
}

async function imageField(label: string, alt: string, ratio?: number) {
  const assetId = await uploadPlaceholder(label, ratio);
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
    alt,
  };
}

async function seed() {
  console.log("Seeding site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    studioName: "Nivasa",
    tagline: "Interior architecture & design, between Lisbon and Copenhagen.",
    accentColor: "#A56A45",
    email: "studio@nivasa.design",
    phone: "+351 21 000 0000",
    offices: [
      {
        city: "Lisbon",
        addressLines: ["Rua das Flores 42", "1200-194 Lisboa", "Portugal"],
      },
      {
        city: "Copenhagen",
        addressLines: ["Bredgade 6, 2.", "1260 København", "Denmark"],
      },
    ],
    socialLinks: [
      { label: "Instagram", url: "https://instagram.com" },
      { label: "Pinterest", url: "https://pinterest.com" },
      { label: "LinkedIn", url: "https://linkedin.com" },
    ],
  });

  console.log("Seeding home page...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Interior Architecture & Design — Est. 2011",
    heroHeading: "Quiet architecture for considered living.",
    heroSubtext:
      "We shape residential and cultural spaces where material, light and proportion are given room to breathe. Based between Lisbon and Copenhagen, working worldwide.",
    heroImage: await imageField(
      "Hero",
      "Signature interior with warm natural light",
      21 / 9,
    ),
    quoteText:
      "A room should feel inevitable — as though it could not have been arranged any other way.",
  });

  console.log("Seeding about page...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading:
      "A small practice with a long attention span, designing spaces meant to age gracefully.",
    portraitImage: await imageField("Studio", "Studio team at work", 12 / 5),
    practiceParagraphs: [
      "Founded in 2011, Nivasa operates at the intersection of architecture and interiors. We take on a deliberately small number of projects each year so that each receives the depth of attention it deserves.",
      "Our work spans private homes, hospitality and cultural spaces — unified by a belief in honest materials, generous light, and detailing that rewards a second look.",
    ],
    principles: [
      {
        title: "Material honesty",
        body: "Surfaces that age well and reveal their nature.",
      },
      {
        title: "Room for light",
        body: "Daylight treated as a primary material.",
      },
      {
        title: "Considered restraint",
        body: "Fewer, better decisions in every room.",
      },
      {
        title: "Built to last",
        body: "Detailing meant for decades, not seasons.",
      },
    ],
  });

  console.log("Seeding services page...");
  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    heading: "What we offer",
    intro:
      "An end-to-end practice — from first sketch to the final placed object. We can lead a project entirely or partner with your architect and builder.",
    process: [
      {
        title: "Listen",
        body: "Understanding the site, the brief and the way you live.",
      },
      {
        title: "Shape",
        body: "Concept, spatial studies and material direction.",
      },
      {
        title: "Resolve",
        body: "Detailed design, drawings and specification.",
      },
      { title: "Deliver", body: "Construction, sourcing and final styling." },
    ],
  });

  console.log("Seeding services...");
  const services = [
    {
      name: "Interior Architecture",
      description:
        "We reconsider how a space is organised — walls, thresholds, ceilings and daylight — so the architecture itself does the quiet work before anything is furnished.",
      tags: ["Space planning", "Structural coordination", "Daylight studies"],
    },
    {
      name: "Interior Design",
      description:
        "Material palettes, finishes and a considered atmosphere. We build rooms around how they will actually be lived in, hour by hour.",
      tags: ["Material palette", "Joinery detailing", "Lighting design"],
    },
    {
      name: "Furniture & FF&E",
      description:
        "From bespoke commissions to a carefully sourced object list — every piece specified, procured and placed.",
      tags: ["Bespoke design", "Sourcing", "Procurement"],
    },
    {
      name: "Art Direction",
      description:
        "Styling and the final layer of objects, textiles and art that turn a finished space into a resolved one — through to photography.",
      tags: ["Styling", "Art curation", "Photography"],
    },
    {
      name: "Project Management",
      description:
        "We coordinate contractors, budgets and timelines so the built result matches the drawings — on site and on schedule.",
      tags: ["Budgeting", "Contractor liaison", "On-site delivery"],
    },
  ];
  for (const [index, service] of services.entries()) {
    await client.createOrReplace({
      _id: `service-${index}`,
      _type: "service",
      order: index,
      ...service,
    });
  }

  console.log("Seeding team members...");
  const team = [
    { name: "Elsa Moreau", role: "Founder, Principal" },
    { name: "Tomas Bak", role: "Design Director" },
    { name: "Ines Carvalho", role: "Senior Architect" },
    { name: "Noah Lind", role: "FF&E Lead" },
  ];
  for (const [index, member] of team.entries()) {
    await client.createOrReplace({
      _id: `team-member-${index}`,
      _type: "teamMember",
      order: index,
      name: member.name,
      role: member.role,
      photo: await imageField(member.name, `Portrait of ${member.name}`, 1),
    });
  }

  console.log("Seeding awards...");
  const awards = [
    {
      year: 2025,
      title: "AD100 — Emerging Practice",
      organization: "Architectural Digest",
    },
    {
      year: 2024,
      title: "Dezeen Awards — Interior of the Year",
      organization: "Shortlist",
    },
    {
      year: 2023,
      title: "Wallpaper* Design Award",
      organization: "Best Retreat",
    },
    { year: 2022, title: "Frame Awards — Hospitality", organization: "Winner" },
  ];
  for (const [index, award] of awards.entries()) {
    await client.createOrReplace({
      _id: `award-${index}`,
      _type: "award",
      order: index,
      ...award,
    });
  }

  console.log("Seeding projects...");
  const projects = [
    {
      name: "Casa Lumena",
      location: "Private Residence — Comporta, PT",
      year: 2025,
      categories: ["Residential"],
    },
    {
      name: "The Vessel",
      location: "Boutique Hotel — Copenhagen, DK",
      year: 2024,
      categories: ["Hospitality"],
    },
    {
      name: "Marlow House",
      location: "Renovation — London, UK",
      year: 2024,
      categories: ["Residential"],
    },
    {
      name: "Atelier Nord",
      location: "Studio & Offices — Oslo, NO",
      year: 2023,
      categories: ["Workspace"],
    },
    {
      name: "Duna Pavilion",
      location: "Exhibition Space — Comporta, PT",
      year: 2023,
      categories: ["Cultural"],
    },
    {
      name: "Field Notes",
      location: "Restaurant — Lisbon, PT",
      year: 2022,
      categories: ["Hospitality"],
    },
  ];
  for (const [index, project] of projects.entries()) {
    const slug = project.name.toLowerCase().replace(/\s+/g, "-");
    await client.createOrReplace({
      _id: `project-${slug}`,
      _type: "project",
      title: project.name,
      slug: { _type: "slug", current: slug },
      summary: `${project.name} — a considered interior shaped by light, material and restraint.`,
      coverImage: await imageField(
        project.name,
        `${project.name} interior`,
        5 / 6,
      ),
      gallery: [],
      location: project.location,
      year: project.year,
      categories: project.categories,
    });
  }

  console.log("Done seeding.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
