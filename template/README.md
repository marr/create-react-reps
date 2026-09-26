# React Reps

A ready-to-customize React starter with a Flexoki theme, persistent accent picker, shadcn/ui components on Base UI, Cube Motion animations, and Vite+ lint/test/build commands.

## Run it

From the monorepo root, use the generated package name:

```sh
vp run --filter=react-reps dev
vp run --filter=react-reps test
vp run --filter=react-reps build
```

Or run the scripts from this package directory:

```sh
vp dev
vp test
vp run build
```

## Included

- React and TypeScript
- Tailwind CSS v4 with the Flexoki palette and eight selectable accents
- shadcn/ui components using Base UI primitives
- Cube Motion React animations
- Oxlint with `@shadcn/lint`
- Vitest tests using Testing Library and happy-dom

Replace the practice page and palette page with your own app. The selected accent is saved in local storage and follows the current light/dark Flexoki color mappings.
