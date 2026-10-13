import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

// https://vite.dev/config/
const pagesBase = process.env.VITE_BASE;
const base =
  pagesBase === undefined || pagesBase === ""
    ? "/"
    : pagesBase.endsWith("/")
      ? pagesBase
      : `${pagesBase}/`;

export default defineConfig({
  base,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "no-console": "error",
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["buttonVariants"],
        },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
      {
        name: "shadcn",
        specifier: "@shadcn/lint",
      },
    ],
  },
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
    disableConsoleIntercept: true,
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
});
