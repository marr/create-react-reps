import { readdir, readFile } from "node:fs/promises";

import { createTemplate } from "bingo";
import { z } from "zod";

import pkgJson from "../package.json" with { type: "json" };

type TemplateFiles = { [name: string]: string | TemplateFiles };

const SKIP_TEMPLATE_ENTRIES = new Set(["node_modules", "dist", "pnpm-lock.yaml"]);

async function readTemplateFiles(directory: URL): Promise<TemplateFiles> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: TemplateFiles = {};

  for (const entry of entries) {
    if (SKIP_TEMPLATE_ENTRIES.has(entry.name)) {
      continue;
    }

    const entryUrl = new URL(entry.name, directory);
    files[entry.name] = entry.isDirectory()
      ? await readTemplateFiles(new URL(`${entry.name}/`, directory))
      : await readFile(entryUrl, "utf8");
  }

  return files;
}

export default createTemplate({
  about: {
    name: pkgJson.name,
    description: pkgJson.description,
  },

  options: {
    name: z.string().min(1).default("react-reps").describe("Generated app package name"),
  },

  async produce({ options }) {
    const files = await readTemplateFiles(new URL("../template/", import.meta.url));
    const packageJson = JSON.parse(files["package.json"] as string) as { name: string };
    packageJson.name = options.name;
    files["package.json"] = `${JSON.stringify(packageJson, null, 2)}\n`;
    files["README.md"] = (files["README.md"] as string).replaceAll("react-reps", options.name);

    return {
      files,
      scripts: [],
      suggestions: [
        `Start the app: cd ${options.name} && vp dev`,
        `Run tests: cd ${options.name} && vp test`,
        "In a Vite+ workspace: vp run --filter=<name> dev",
      ],
    };
  },
});
