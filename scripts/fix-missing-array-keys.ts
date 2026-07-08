import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function withKeys<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ _key: randomUUID(), ...item }));
}

async function run() {
  const settings = await client.fetch<{
    _id: string;
    offices?: object[];
    socialLinks?: object[];
  } | null>(`*[_type == "siteSettings"][0]{ _id, offices, socialLinks }`);

  if (settings) {
    await client
      .patch(settings._id)
      .set({
        offices: withKeys(settings.offices ?? []),
        socialLinks: withKeys(settings.socialLinks ?? []),
      })
      .commit();
    console.log(`Added _key to siteSettings.offices and .socialLinks`);
  }

  const about = await client.fetch<{
    _id: string;
    principles?: object[];
  } | null>(`*[_type == "aboutPage"][0]{ _id, principles }`);

  if (about) {
    await client
      .patch(about._id)
      .set({ principles: withKeys(about.principles ?? []) })
      .commit();
    console.log(`Added _key to aboutPage.principles`);
  }

  const services = await client.fetch<{
    _id: string;
    process?: object[];
  } | null>(`*[_type == "servicesPage"][0]{ _id, process }`);

  if (services) {
    await client
      .patch(services._id)
      .set({ process: withKeys(services.process ?? []) })
      .commit();
    console.log(`Added _key to servicesPage.process`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
