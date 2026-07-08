# Nivasa

Marketing website for Nivasa, an interior architecture & design studio. Built with Next.js and Sanity CMS so the studio's team can edit content (projects, services, team, awards, page copy) without touching code.

For a full explanation of how the codebase works, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in Sanity project details (see below)
pnpm dev                     # http://localhost:3000
```

To edit content, run the Studio locally too:

```bash
cd studio-nivasa
pnpm install
pnpm dev                     # http://localhost:3333
```

Or just use the deployed Studio: **https://nivasa-studio-cms.sanity.studio/**

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                         | Purpose                                                                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Which Sanity project to read content from                                                                                                                  |
| `NEXT_PUBLIC_SANITY_DATASET`     | Which dataset (`production`)                                                                                                                               |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version pin                                                                                                                                     |
| `SANITY_API_WRITE_TOKEN`         | Only needed to run the seeding/update scripts in `scripts/`, never used by the app itself. Get it from sanity.io/manage → API → Tokens. Never commit this. |

## Scripts

```bash
pnpm dev         # start the Next.js dev server
pnpm build       # production build
pnpm typecheck   # tsc --noEmit
pnpm test        # run unit tests (vitest)
pnpm lint        # eslint
```

One-off content scripts (run with `node --experimental-strip-types --env-file=.env.local scripts/<name>.ts`):

- `scripts/seed-sanity.ts` — seeds placeholder demo content (used only at project setup).
- `scripts/seed-projects-from-pdfs.ts` — imports real project photos/data from client-supplied PDFs.
- `scripts/update-project-content.ts` — one-off patch script used to backfill project descriptions and the homepage hero image.

## Deployment

- **App**: deployed on Vercel. Connect the GitHub repo, set the three `NEXT_PUBLIC_SANITY_*` env vars above, done — no write token needed since the app only reads content.
- **Studio**: deployed for free via `npx sanity deploy` from `studio-nivasa/`, hosted at `*.sanity.studio`.

## Making common content changes

See the **"How to make common changes"** section of [ARCHITECTURE.md](./ARCHITECTURE.md#how-to-make-common-changes) — e.g. how to add a project, edit homepage text, or change the team list, all done through Sanity Studio, not code.
