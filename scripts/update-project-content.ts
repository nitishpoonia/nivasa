import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const descriptions: Record<string, string[]> = {
  "tv-unit-jaipur-residence": [
    "The brief was simple on paper and exacting in practice: give a first-floor family room a TV wall that reads as architecture, not furniture. We built the composition around a book-matched UV marble panel, let into a frame of fluted wood that runs floor to cove, and lit the joinery from behind so the veining catches light rather than glare from the screen.",
    "Every material decision was made to keep the room calm after the television is off. The PU-laminate finish on the surrounding cabinetry was matched to the marble's undertone rather than to a standard swatch, and the brass reveals were kept narrow so they read as a detail, not a trim.",
  ],
  "bedroom-in-wood-and-stone": [
    "This Jaipur master bedroom asked for warmth without heaviness. We anchored the headboard wall in a book-matched marble panel, then wrapped the room in a dark walnut-tone veneer that absorbs light rather than reflecting it, so the space stays quiet in the evening and doesn't compete with the marble during the day.",
    "An arched dressing mirror was set into the wardrobe run as a deliberate softening move against all the straight lines in the room, with a single brass sconce positioned to catch the arch rather than wash the whole wall. The wardrobe itself continues the fluted detailing from the TV wall opposite, so the two ends of the room read as one composition rather than two separate briefs.",
  ],
  "dining-and-living-pavilion": [
    "An open dining and living plan lives or dies on how well it manages sightlines, so we treated the round, brass-base dining table as the pivot the rest of the room turns around. Glass-front wine cabinetry was placed to be seen from the entry without blocking the view through to the living side.",
    "On the living side, ladder shelving breaks up a long run of wall without asking for constant styling upkeep, and the TV wall was finished in the same warm tones as the dining joinery so the two zones feel like a single continuous room rather than two spaces stitched together.",
  ],
  "hall-false-ceiling-jatin-residence": [
    "The client wanted a ceiling that did more than hide services. We designed a circular cove-lit false ceiling over the dining zone, sized to sit just inside the room's proportions so it reads as an intentional gesture rather than a leftover shape, with the cove lighting set on a separate circuit from the room's general lighting.",
    "Underneath it, we chose a dining setting in deep plum upholstery, a colour we don't reach for often, precisely because the ceiling above needed a grounded, saturated counterweight rather than another neutral. The result is a hall that photographs well but is built first for entertaining.",
  ],
  "classical-living-room": [
    "This living room called for a classical language without slipping into pastiche, so we kept the ivory boiserie panelling restrained and let a single walnut feature door carry the contrast. The coffee table, in marble and brass, was chosen specifically to sit low and sculptural against the panelling's verticality.",
    "A black accent piece was introduced late in the design process, once the palette had settled, because the room needed one moment that wasn't ivory or walnut to keep it from feeling too uniform. It's a small move, but it's the one guests notice first.",
  ],
  "sihag-residence-exterior": [
    "A two-storey elevation for a family in Fazilka, Punjab, designed and drawn by AV Design Studio, Fazilka, and included here at the client's request alongside our Jaipur portfolio. Cantilevered balconies were used to break up the street-facing mass of the house, and a stone-clad boundary wall was extended to frame the landscaped frontage rather than simply enclose it.",
    "The elevation was developed through both a 3D render and a 2D front elevation drawing so the client could review proportion and material together before construction, a sequence we recommend for any exterior where the street view is as important as the plan.",
  ],
  "ornamental-bedroom-suite": [
    "This bedroom suite was built around a single decorative gesture: a hand-painted mandala motif set inside an arched wood surround above the bed. Everything else in the room, including the wardrobe wall opposite, was kept deliberately quieter so the motif stays the focal point rather than competing with it.",
    "The dressing area extends the room into a floral-wallpapered nook with a five-door wardrobe and a mirrored recess, a transition we designed so the more ornamental language of the bed wall doesn't spread across the whole suite. The wallpaper was chosen to echo the mandala's palette without repeating its pattern.",
  ],
  "wardrobe-interior-sambhav-dua-residence": [
    "A first-floor wardrobe fit-out for the Sambhav Dua residence, designed around how the room is actually used day to day. A hydraulic pull-down clothes rail was specified for the upper sections so nothing above eye level goes unused, and the shutters were finished in fluted MDF-PU to match the tactile, low-glare language used elsewhere in the home.",
    "A mirrored dressing recess with laminate detailing was set into the run to double as a dressing nook without requiring extra floor area, a common request in bedrooms where storage and dressing space are competing for the same wall.",
  ],
};

async function run() {
  for (const [slug, description] of Object.entries(descriptions)) {
    const id = `project-${slug}`;
    await client.patch(id).set({ description }).commit();
    console.log(`Updated description for ${id}`);
  }

  const heroProject = await client.fetch<{
    coverImage?: { asset?: { _ref: string }; alt?: string };
  } | null>(`*[_type == "project" && slug.current == $slug][0]{ coverImage }`, {
    slug: "classical-living-room",
  });

  if (heroProject?.coverImage?.asset?._ref) {
    await client
      .patch("homePage")
      .set({
        heroImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: heroProject.coverImage.asset._ref,
          },
          alt: heroProject.coverImage.alt ?? "",
        },
      })
      .commit();
    console.log("Updated homePage hero image");
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
