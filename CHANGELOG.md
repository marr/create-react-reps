# Changelog

## 0.1.5 — 2026-09-26

### Docs

- README and changelog: no product-specific or internal CI references; link only public Vite+ docs.

## 0.1.4 — 2026-09-26

### Docs

- README: development instructions for this repo (`template/`, `pnpm` scripts at repo root).

## 0.1.3 — 2026-09-26

### Docs

- README: remove internal mirror and release automation instructions.

## 0.1.2 — 2026-09-26

### Changed

- Dropped maintainer-only Playwright e2e from the generator package. Demo quality is covered by Vitest in `template/` (`pnpm test:template`) and GitHub Pages deploy.

## 0.1.1 — 2026-09-26

### Fixed

- **Standalone `vp create` / `npm create` installs** — Vite+ rewrites exact dependency versions to `catalog:` and adds a minimal `pnpm-workspace.yaml`. The template ships a full catalog plus semver ranges in `package.json`, so `vp install` succeeds in new projects.
- **Generator copy** — Skip `template/node_modules`, `dist`, and `pnpm-lock.yaml` when bundling the template (avoids EISDIR errors during scaffold).
- **CI lockfiles** — Pin devDependencies that used `catalog:` so standalone `pnpm install --lockfile-only` succeeds when generating lockfiles.

### Docs

- Document `npm create @dmarr/react-reps` and `vp create @dmarr/react-reps` alongside `npx @dmarr/create-react-reps`.

## 0.1.0 — 2026-09-26

Initial publish: Flexoki React Reps starter (Vite+, shadcn/Base UI, Cube Motion, tests).
