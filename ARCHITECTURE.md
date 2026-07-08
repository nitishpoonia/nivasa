# Architecture

This document explains how the Nivasa website works, in plain English, for anyone (including future-you) picking the project back up after a break.

---

## 1. Overview

Nivasa is a marketing website for an interior architecture & design studio. It has 5 public pages:

- **Home** (`/`) — hero banner, a few featured projects, a quote, a services teaser, a call-to-action.
- **Projects / Work** (`/projects`) — the full portfolio, filterable by category (Residential, Bedroom, etc.), each project has its own detail page.
- **Studio / About** (`/studio`) — studio intro, design principles, team, awards.
- **Services** (`/services`) — list of services offered and the studio's process.
- **Contact** (`/contact`) — office info, email/phone, a contact form (UI only — see caveat below).

Almost none of the text or images on these pages is hardcoded. It all comes from **Sanity**, a headless CMS with its own editor UI ("Sanity Studio"). The studio's team edits content in Studio, and the website reads it and displays it — no code changes, no redeploy needed for content edits.

**Important caveat:** the Contact page's form is UI-only. Submitting it does nothing (no email is sent, nothing is saved) — this was a deliberate scope decision, not a bug. Wiring up real submission (e.g. to an email service or a Sanity "enquiry" document) would be a future addition.

---

## 2. Tech stack

| Piece                                          | What                                                     | Why                                                                                                                                                                                                      |
| ---------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js** (App Router)                       | React framework, handles routing + server-side rendering | Pages are rendered on the server with fresh content on every request — good for SEO and for a CMS-driven site where content changes without a rebuild                                                    |
| **React Server Components**                    | Most components run only on the server                   | Faster pages, smaller JS bundle sent to the browser, and it's the natural fit for "fetch from CMS, render HTML" — only a few small pieces (like the mobile nav, contact form) need to run in the browser |
| **TypeScript (strict mode)**                   | Typed JavaScript                                         | Catches mistakes (wrong field names, `null` handling) at build time instead of in front of the client                                                                                                    |
| **Sanity**                                     | Headless CMS                                             | Gives the studio's team a real editing UI (Sanity Studio) without them ever touching code or Markdown files                                                                                              |
| **Tailwind CSS v4**                            | Utility-first CSS                                        | Fast styling directly in components, no separate CSS files to keep in sync                                                                                                                               |
| **Vercel**                                     | Hosting for the Next.js app                              | Free tier, deploys automatically from GitHub, zero server maintenance                                                                                                                                    |
| **Sanity's hosted Studio** (`*.sanity.studio`) | Hosting for the CMS editor                               | Free, so the client can log in and edit content from anywhere without you running anything locally                                                                                                       |

---

## 3. Folder structure

```
src/
  app/                  # Routing only — one folder per URL. No business logic lives here.
  modules/
    content/
      domain/           # Plain TypeScript types (Project, Service, TeamMember...). No React, no Sanity.
      application/      # One function per "fetch this content" use-case (e.g. listProjects).
      ui/                # React components, organized by page (home/, projects/, studio/, ...)
      index.ts           # Public entry point — everything else imports from here, not from deep inside.
  lib/
    cms/                # The ONLY place that talks to Sanity.
      cms-port.ts        # The interface (contract) the rest of the app codes against.
      sanity/             # The actual Sanity implementation of that contract.
    ui/                  # Small shared UI pieces used across pages (buttons, headings, labels).
    config/              # Reads environment variables, once, in one place.
  styles/                # Design tokens (colors, fonts) as CSS variables.
studio-nivasa/           # A separate app: Sanity Studio (the CMS editor). Has its own package.json.
  schemaTypes/            # Defines what content types exist (Project, Service, etc.) and their fields.
scripts/                 # One-off Node scripts for seeding/updating Sanity content directly.
```

### Why the split between `domain` / `application` / `ui`?

This is the main thing to understand if the code feels layered more than a typical Next.js tutorial project:

- **`domain/`** — just data shapes. A `Project` is `{ title, summary, coverImage, ... }`. No logic, no imports from React or Sanity. If you ever swapped Sanity for a different CMS, these types wouldn't change.
- **`application/`** — thin functions like `listProjects(cms, { category })`. They don't know _how_ Sanity works — they just call a method on the `cms` object (the "port") and return domain types.
- **`lib/cms/`** — the only code that actually imports the Sanity client and writes GROQ queries (Sanity's query language). If Sanity were ever replaced, this is the only folder that would need to change.
- **`ui/`** — React components. They receive plain domain objects as props (e.g. `<ProjectCard project={project} />`) — they never see raw Sanity data.

The payoff: a page component like `app/page.tsx` reads like a short recipe —

```tsx
const [content, projects, services] = await Promise.all([
  getHomePageContent(cms),
  listProjects(cms),
  listServices(cms),
]);

return (
  <>
    <HomeHero content={content} />
    <FeaturedProjects projects={projects.slice(0, 3)} />
    ...
```

— and none of it needs to know that "content" comes from Sanity specifically.

---

## 4. Data flow: from Sanity to the page

Here's the full path for, say, the Projects page:

1. **You edit content in Sanity Studio.** E.g. add a new Project document, fill in title/summary/images, click **Publish**.
2. **A visitor requests `/projects`.** Because this is a Server Component, the fetch happens on Vercel's server, not in the visitor's browser.
3. **`app/projects/page.tsx`** calls `listProjects(cms, { category })` — an _application_ function.
4. That function calls `cms.listProjects(options)` — `cms` is the object defined in `lib/cms/index.ts`, which is the Sanity implementation of the `CmsPort` interface.
5. **`lib/cms/sanity/sanity-cms-port.ts`** runs a GROQ query (defined in `lib/cms/sanity/queries.ts`) against Sanity's API, using the `@sanity/client` package.
6. Sanity returns raw JSON matching whatever fields the query asked for.
7. **`lib/cms/sanity/mappers.ts`** converts that raw JSON into the clean `Project` domain type — filling in safe fallbacks (e.g. an image with no alt text becomes `alt: ""` instead of crashing the page).
8. The page component gets back typed, safe `Project[]` and hands them to `<ProjectGrid>` / `<ProjectCard>` to render.
9. Every step in between is invisible to the UI components — they only ever see step 8's clean data.

**Why go through an interface (`CmsPort`) instead of calling Sanity directly everywhere?** Two reasons: (a) `app/` and `ui/` files are not allowed to import the Sanity client directly — this keeps "how do we talk to Sanity" in exactly one place, so a query change or a CMS migration never means touching component files; (b) it makes testing easy — tests use a fake `CmsPort` instead of hitting the real Sanity API.

---

## 5. Key components & pages

### Routes (`src/app/`)

| File                                                                       | Renders                                                                                                                                                  |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`                                                           | The shell every page sits inside — fetches `SiteSettings` once, sets the accent color, renders `<SiteHeader>` and `<SiteFooter>` around the page content |
| `app/page.tsx`                                                             | Home page                                                                                                                                                |
| `app/projects/page.tsx`                                                    | Project list, reads `?category=` from the URL to filter                                                                                                  |
| `app/projects/[slug]/page.tsx`                                             | One project's detail page (`[slug]` = the project's URL slug, e.g. `/projects/classical-living-room`)                                                    |
| `app/studio/page.tsx`                                                      | About/Studio page                                                                                                                                        |
| `app/services/page.tsx`                                                    | Services page                                                                                                                                            |
| `app/contact/page.tsx`                                                     | Contact page                                                                                                                                             |
| `app/error.tsx`, `app/projects/error.tsx`, `app/projects/[slug]/error.tsx` | Fallback UI shown if a page's data fetch throws (e.g. Sanity is unreachable) instead of a blank white screen                                             |

### Layout components (`modules/content/ui/layout/`)

- **`SiteHeader`** — top nav bar. This one is a Client Component (`"use client"`) because it needs to know the current URL (`usePathname`) to highlight the active nav link.
- **`SiteFooter`** — footer with studio name, nav links, and the newsletter box. Server Component.
- **`NewsletterForm`** — the little email input in the footer. Pulled into its own Client Component so the rest of the footer can stay a (faster) Server Component.

### Home page sections (`modules/content/ui/home/`)

`HomeHero` (banner + heading), `FeaturedProjects` (top 3 projects), `QuoteSection`, `ServicesTeaser`, `ContactCta` — each is a self-contained section, composed together in `app/page.tsx`.

### Projects (`modules/content/ui/`)

`ProjectGrid` / `ProjectCard` — the reusable grid of project thumbnails (used on both Home and the Projects page). `ProjectFilters` — the category filter chips (see Routing section below for how filtering works).

### Studio/Services/Contact

Each page's section components (`StudioIntro`, `TeamGrid`, `AwardsList`, `ServicesList`, `ProcessSteps`, `ContactInfo`, `ContactForm`) just render whatever content/list they're handed as props — no logic beyond simple rendering and empty-state fallbacks.

---

## 6. Routing

Next.js's **App Router** maps folders under `src/app/` directly to URLs — there's no separate routes config file.

- `app/page.tsx` → `/`
- `app/projects/page.tsx` → `/projects`
- `app/projects/[slug]/page.tsx` → `/projects/anything-here` (the `[slug]` part is a dynamic segment — whatever's in the URL becomes `params.slug` inside the component)
- `app/studio/page.tsx` → `/studio`, and so on.

**Category filtering** on `/projects` is done entirely server-side with no client-side JavaScript: the filter chips are plain `<Link href="/projects?category=Residential">` links. Clicking one navigates to a URL with a `?category=` query string, and `app/projects/page.tsx` reads it via Next's `searchParams` prop, then passes it straight into the Sanity query. No `useState`, no client JS needed for filtering to work.

---

## 7. Styling approach

- **Tailwind CSS v4** is used directly in component `className`s — there are no separate `.module.css` files per component.
- **Design tokens** live in `src/styles/tokens.css` as CSS custom properties (`--background`, `--foreground`, `--accent`, etc.) — the warm off-white/charcoal palette from the original mockup.
- `src/app/globals.css` maps those raw tokens into Tailwind's theme (via `@theme inline`) so you can write `bg-background` or `text-accent` as ordinary Tailwind classes.
- **Fonts**: Cormorant Garamond (serif, used for headings — `font-serif`) and Instrument Sans (body text — the default), both loaded via `next/font/google` in `app/layout.tsx` for automatic optimization.
- **The accent color is not a fixed value** — it's read from Sanity's Site Settings (`accentColor` field) and injected as a CSS variable on the `<html>` tag in `app/layout.tsx`. Changing it in Studio changes the site's accent color everywhere, no code change needed.

---

## 8. Environment variables / config

Only one file reads `process.env` directly: **`src/lib/config/env.ts`**. Everything else imports typed values from there — this keeps env validation in one place and makes missing config fail loudly at startup instead of silently somewhere deep in a component.

Required variables (see `.env.example`):

| Variable                         | Used for                                                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Identifies which Sanity project to read from                                                                                                                                                                |
| `NEXT_PUBLIC_SANITY_DATASET`     | Which dataset within that project (`production`)                                                                                                                                                            |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pins the Sanity API version so queries don't break on a Sanity upgrade                                                                                                                                      |
| `SANITY_API_WRITE_TOKEN`         | Only needed locally to run the one-off scripts in `scripts/` (seeding/updating content). The website itself never writes to Sanity, so this is never needed in Vercel's environment. **Never commit this.** |

To run locally: copy `.env.example` to `.env.local` and fill in the three `NEXT_PUBLIC_*` values (find them at sanity.io/manage → your project → API).

---

## 9. How to make common changes

All of the changes below are done **in Sanity Studio** (`https://nivasa-studio-cms.sanity.studio/`, or `pnpm dev` inside `studio-nivasa/` for a local copy) — no code, no redeploy.

- **Change the homepage hero text/image** → open the singleton **"Home Page"** document, edit `heroHeading` / `heroSubtext` / `heroImage`, click Publish.
- **Add a new project to the portfolio** → open **"Project"**, click **+ Create**, fill in title, summary (short teaser for cards), description (longer write-up, one paragraph per list item), cover image + alt text, gallery images, location, year, categories. Reuse existing category names (e.g. `Residential`, `Bedroom`) so the `/projects` filter keeps working. Click Publish.
- **Edit the About/Studio page text or team** → **"About Page"** singleton for the intro/principles copy; **"Team Member"** documents for individual people (add/edit/delete + photo).
- **Change services offered** → edit/add **"Service"** documents (each has an `order` field controlling display order).
- **Add/remove an award** → **"Award"** documents.
- **Change contact info, studio name, or the site's accent color** → the **"Site Settings"** singleton (`accentColor` is a hex string like `#A56A45`).
- **Change nav links or page layout/structure** → this _does_ require a code change, in the relevant file under `src/app/` or `src/modules/content/ui/`.

If content doesn't show up after publishing, check: (1) you clicked **Publish**, not just saved a draft, (2) for singletons (Home/About/Services/Site Settings) there should only ever be one document of that type — if two exist by accident, the query only reads the first one it finds.

For the actual bootstrapping of the initial project photos, see `scripts/seed-projects-from-pdfs.ts` — this was a one-time import script, not something you need to re-run for normal content edits.
