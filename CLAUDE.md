# CLAUDE.md — Code Rules

Rules for keeping this codebase clean and consistently structured. This is not a feature spec — it governs _how_ code is written, named, and organized, not _what_ to build. Follow every rule. When a request conflicts with a rule, flag it rather than silently breaking convention.

Stack context (fixed): Next.js latest, App Router + React Server Components, TypeScript strict, Sanity CMS. Media-heavy (interior design / architecture studio). Portfolio now; must accept a commerce module later with minimal change.

---

## 1. Folder structure & boundaries

```
src/
  app/                 # routing + composition ONLY. No business logic, no direct CMS calls.
  modules/             # feature modules. One folder per domain.
    content/           # the only domain today
      domain/          # framework-free types + pure logic. NO react, NO next, NO sanity imports.
      application/     # use-cases/queries in domain terms. Depends on domain + ports only.
      ui/              # react components for this module
  lib/
    cms/               # the CMS seam
      cms-port.ts      # interface the app depends on
      sanity/          # sanity adapter — the ONLY place @sanity/client is imported
    ui/                # shared presentational primitives
    config/            # env, constants
  styles/
```

### Hard boundary rules (enforced by review; add ESLint `no-restricted-imports` where possible)

- `app/` and any `ui/` folder **must not** import `@sanity/client` or GROQ directly. They go through `lib/cms`.
- `modules/*/domain/` **must not** import from `react`, `next`, `@sanity/*`, or any other module. Pure TS only.
- `modules/*/application/` may import its own `domain/` and ports from `lib/`, nothing framework-specific.
- No module imports another module's internals. If two modules must share, extract to `lib/`.
- New domain later (e.g. commerce) = new folder under `modules/`, beside `content/`. Never edit `content/` to make room for it.

---

## 2. File & folder naming

- **Folders:** `kebab-case` (`project-grid/`, `cms-port.ts`).
- **React component files:** `PascalCase.tsx`, one component per file, filename = component name (`ProjectHero.tsx`).
- **Non-component TS files:** `kebab-case.ts` (`get-projects.ts`, `image-url.ts`).
- **Types/interfaces:** `PascalCase`, no `I` prefix (`Project`, not `IProject`). Interface for the port is `CmsPort`.
- **Domain type files:** singular noun (`project.ts`, `media.ts`).
- **Use-case files:** verb-led (`get-project-by-slug.ts`, `list-projects.ts`).
- **Test files:** `*.test.ts` / `*.test.tsx`, colocated next to the file under test.
- **Barrel files:** `index.ts` only at module public edges (`modules/content/index.ts`, `lib/cms/index.ts`). Do not barrel deep internals.
- **Constants:** `UPPER_SNAKE_CASE`. **Functions/vars:** `camelCase`.
- **GROQ query consts:** `camelCase` ending in `Query` (`projectBySlugQuery`).
- **Env vars:** `UPPER_SNAKE_CASE`, public ones prefixed `NEXT_PUBLIC_`.

---

## 3. Import rules

- Absolute imports via `@/` alias (`@/lib/cms`, `@/modules/content/domain/project`). No `../../../` deep relatives across module boundaries; relative only within the same folder.
- Import order (enforced by ESLint): built-in → external → `@/lib` → `@/modules` → relative. Blank line between groups.
- Type-only imports use `import type`.
- No default exports except React components and Next.js special files (`page`, `layout`, etc.). Everything else is a named export.

---

## 4. Component rules

- Server Component by default. Add `"use client"` only when interactivity requires it, and keep client components as small as possible (push state to leaves).
- Data fetching happens in Server Components at the route/segment level via `CmsPort`. Client components receive plain domain objects as props — never a Sanity raw shape, never a `_ref`/`_type`.
- One component per file. Extract sub-components once a file passes ~150 lines.
- Props typed with an explicit `type Props = {...}`; no inline anonymous prop objects for exported components.
- Every image requires an `alt`. Enforce at the type level (make `alt` non-optional on the media domain type).

---

## 5. TypeScript rules

- `strict: true`. No `any` — use `unknown` + narrowing. If `any` is truly unavoidable, add `// eslint-disable-next-line` with a one-line reason.
- No non-null assertions (`!`) on external/CMS data; narrow instead.
- Domain types are the source of truth. The Sanity adapter maps raw GROQ results → domain types; raw shapes never escape `lib/cms/sanity/`.
- Prefer `type` for shapes; `interface` only for the extensible ports (`CmsPort`).

---

## 6. Git & commits

- **Conventional Commits:** `type(scope): subject`.
  - types: `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`, `perf`, `build`, `ci`.
  - scope = module or area: `feat(content): add project gallery`, `chore(cms): add mux port stub`.
  - subject: imperative, lowercase, no trailing period, ≤ 72 chars.
- One logical change per commit. No "wip" or "fixes" on shared branches.
- **Branches:** `type/short-description` kebab (`feat/project-detail-page`, `fix/gallery-focus-trap`).
- No commits directly to `main`; PRs only. PR title follows the same commit convention.
- Never commit `.env`; `.env.example` is committed and kept in sync.

---

## 7. Hooks & tooling (enforcement)

- **Husky + lint-staged** `pre-commit`: ESLint + Prettier + `tsc --noEmit` on staged files.
- **Husky** `pre-push`: run unit tests. (e2e runs in CI, not on push.)
- **commitlint** on `commit-msg` to enforce section 6.
- Prettier owns formatting; ESLint owns correctness + boundaries. Don't fight them — no manual formatting overrides.
- CI must pass typecheck + lint + unit + build before merge.

---

## 8. Testing conventions

- Test logic and seams, not static markup. Domain logic and Sanity→domain mappers are the priority.
- Components are tested against a **fake `CmsPort`** — tests never hit real Sanity.
- Test files colocated, named `*.test.ts(x)`. One `describe` per unit.

---

## 9. When adding the future commerce module

Do it additively: create `src/modules/commerce/` with its own `domain/ application/ ui/`, plus its own port under `lib/`. Do not modify `modules/content/` or the CMS seam to accommodate it. If you can't add commerce without editing content code, the boundary was violated — fix the boundary, not the workaround.

---

## 10. Additional boundary & handling rules

- **Missing `alt` text:** if a Sanity image lacks alt text, the adapter (`lib/cms/sanity/`) falls back to an empty string at the mapping layer, not a made-up description. Never let a missing field crash the build; log a warning during `next build` (a script checking Sanity content for missing `alt` before deploy is acceptable) so it gets caught before it ships.
- **Error & empty states:** every Server Component that fetches via `CmsPort` must handle three cases explicitly: not found (e.g. bad slug → Next.js `notFound()`), empty result (e.g. no projects yet → an explicit empty-state UI, not a blank page), and fetch failure (CMS unreachable → an error boundary / `error.tsx`, not an unhandled throw to the user). Don't let any route silently render nothing.
- **Env access:** only `lib/config/` reads `process.env` directly. Every other file imports typed config values from `lib/config`, never `process.env` inline. This keeps env validation and defaults in one place and makes it obvious what the app depends on.
- **Solo-dev git flow:** PRs are still required (feature branch → PR → merge to `main`) even solo — it's what keeps CI (typecheck/lint/test/build) as a gate before `main` moves, and keeps commit history reviewable later if/when someone else joins. Self-merge after CI passes is fine; skipping the PR and pushing straight to `main` is not.
