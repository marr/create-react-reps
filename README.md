# @dmarr/create-react-reps

Generate a [Vite+](https://viteplus.dev) React app with the Flexoki starter theme, shadcn/ui (Base UI), Cube Motion, and tests. This repo is the **npm package** [`@dmarr/create-react-reps`](https://www.npmjs.com/package/@dmarr/create-react-reps); the CLI binary is `create-react-reps`.

**Live demo:** [https://marr.github.io/create-react-reps/](https://marr.github.io/create-react-reps/) — the built Flexoki starter.

## Create a project

From any directory **Node ≥ 24** recommended.

### Recommended (create shorthand)

Same package (`@dmarr/create-react-reps`), shorter command:

```sh
npm create @dmarr/react-reps@latest
```

With [Vite+](https://viteplus.dev) installed globally, scaffold plus install/format hooks:

```sh
vp create @dmarr/react-reps
```

Pass generator options after `--` (Bingo CLI):

```sh
vp create @dmarr/react-reps --no-interactive --no-hooks -- --directory ./my-app --name my-app
npm create @dmarr/react-reps@latest -- --directory ./my-app --name my-app
```

### Direct package name

```sh
npx @dmarr/create-react-reps
npx @dmarr/create-react-reps --directory ./my-app --name my-app
```

Or install globally:

```sh
npm install -g @dmarr/create-react-reps
create-react-reps
```

Options:

- **`--directory`** — folder for the generated app (created if needed)
- **`--name`** — `package.json` name for the new app (default: `react-reps`)

Then in the new app (if your tool did not run install already):

```sh
cd my-app
vp install   # or pnpm install
vp dev
vp test
vp build
```

The generated app includes `pnpm-workspace.yaml` with a **catalog** so Vite+’s post-create `catalog:` rewrites resolve correctly in standalone projects.

After install, opt into editor config the Vite+ way:

```sh
vp migrate --interactive --editor vscode   # or zed, jetbrains
```

[Vite+ IDE integration](https://viteplus.dev/guide/ide-integration).

## What you get

- React 19 + TypeScript + Vite+
- Tailwind CSS v4 with Flexoki palette and accent picker
- shadcn/ui components on Base UI
- Example routes, tests, and lint/test/build scripts

## Maintainers


### Local development (monorepo)

The **generated app is `template/`**. Edit UI and routes there; that folder is what Bingo copies on `create-react-reps` and what GitHub Pages builds.

From this repo root:

```sh
pnpm run dev:template          # http://127.0.0.1:5183
pnpm run dev:template          # http://127.0.0.1:5183
pnpm test:template
```



CLI dry run after `pnpm build`:

```sh
node bin/index.ts --directory .sandbox/my-app --name my-app --skip-requests
```

Standalone template check:

```sh
pnpm run verify:template-standalone
```
