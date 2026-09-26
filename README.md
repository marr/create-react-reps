# @dmarr/create-react-reps

Generate a [Vite+](https://viteplus.dev) React app with the Flexoki starter theme, shadcn/ui (Base UI), Cube Motion, and tests. This repo is the **npm package** [`@dmarr/create-react-reps`](https://www.npmjs.com/package/@dmarr/create-react-reps); the CLI binary is `create-react-reps`.

## Create a project

From any directory (no monorepo required):

```sh
npx @dmarr/create-react-reps
```

Or install globally:

```sh
npm install -g @dmarr/create-react-reps
create-react-reps
```

Common options (Bingo):

```sh
npx @dmarr/create-react-reps --directory ./my-app --name my-app
```

- **`--directory`** — folder for the generated app (created if needed)
- **`--name`** — `package.json` name for the new app (default: `react-reps`)

Then in the new app:

```sh
cd my-app
pnpm install   # or npm install
pnpm dev       # Vite+ dev server
pnpm test
pnpm build
```

The generator scaffolds a standalone app. Use your own package manager and Node ≥ 24 as listed in the generated `package.json`.

## What you get

- React 19 + TypeScript + Vite+
- Tailwind CSS v4 with Flexoki palette and accent picker
- shadcn/ui components on Base UI
- Example routes, tests, and lint/test/build scripts

## Maintainers
