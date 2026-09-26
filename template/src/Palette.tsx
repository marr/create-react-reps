import { Reveal, Rise } from "cube-motion/react";
import { ArrowLeft, Check, Palette as PaletteIcon, Sparkles } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Link } from "react-router";

import AccentPicker from "@/components/AccentPicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FLEXOKI_SHADES = [
  "50",
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "850",
  "900",
  "950",
];

const FLEXOKI_NEUTRALS = [
  { label: "Paper", token: "paper" },
  { label: "50", token: "base-50" },
  { label: "100", token: "base-100" },
  { label: "150", token: "base-150" },
  { label: "200", token: "base-200" },
  { label: "300", token: "base-300" },
  { label: "400", token: "base-400" },
  { label: "500", token: "base-500" },
  { label: "600", token: "base-600" },
  { label: "700", token: "base-700" },
  { label: "800", token: "base-800" },
  { label: "850", token: "base-850" },
  { label: "900", token: "base-900" },
  { label: "950", token: "base-950" },
  { label: "Black", token: "black" },
];

const FLEXOKI_ACCENTS = [
  { label: "Red", token: "red" },
  { label: "Orange", token: "orange" },
  { label: "Yellow", token: "yellow" },
  { label: "Green", token: "green" },
  { label: "Cyan", token: "cyan" },
  { label: "Blue", token: "blue" },
  { label: "Purple", token: "purple" },
  { label: "Magenta", token: "magenta" },
];

function Palette() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  async function copyColor(token: string) {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-flexoki-${token}`)
      .trim();

    if (!color) return;

    try {
      await navigator.clipboard.writeText(color);
      setCopiedToken(token);
    } catch {
      setCopiedToken(null);
    }
  }

  return (
    <Rise as="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-9">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
          <Link className="flex items-center gap-3 text-foreground no-underline" to="/">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">Practice Room</span>
              <span className="block text-xs text-muted-foreground">
                A little progress, every day
              </span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <AccentPicker />
            <Button render={<Link to="/" />} variant="outline" size="lg">
              <ArrowLeft aria-hidden="true" data-icon="inline-start" />
              Back to practice
            </Button>
          </div>
        </header>

        <div className="flex-1 py-9 sm:py-12">
          <section className="mb-9 max-w-3xl" aria-labelledby="palette-title">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              <PaletteIcon aria-hidden="true" className="text-accent-strong size-4" />
              Color reference
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1
                  className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                  id="palette-title"
                >
                  The Flexoki palette
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                  Warm paper-like neutrals, plus eight ink-inspired accent ramps. Select any bubble
                  to copy its color value.
                </p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground">
                119 COLORS
              </span>
            </div>
          </section>

          <section className="flex flex-col gap-8" aria-label="Flexoki color swatches">
            <section aria-labelledby="neutrals-title">
              <Card className="shadow-sm [--card-spacing:--spacing(5)]">
                <CardHeader>
                  <CardTitle id="neutrals-title">Base neutrals</CardTitle>
                  <CardDescription>Paper to black</CardDescription>
                  <CardAction className="font-mono text-xs text-muted-foreground">
                    15 SHADES
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto pb-2">
                    <Reveal
                      as="div"
                      targets="children"
                      className="grid min-w-232 grid-cols-15 gap-2"
                    >
                      {FLEXOKI_NEUTRALS.map((swatch) => (
                        <button
                          aria-label={`Copy Flexoki ${swatch.token}`}
                          className="group flex flex-col items-center gap-2 rounded-lg px-1 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          key={swatch.token}
                          onClick={() => void copyColor(swatch.token)}
                          title={`Copy ${swatch.token}`}
                          type="button"
                        >
                          <span
                            aria-hidden="true"
                            className="palette-bubble block size-12 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                            style={
                              {
                                "--bubble-color": `var(--color-flexoki-${swatch.token})`,
                              } as CSSProperties
                            }
                          >
                            {copiedToken === swatch.token && (
                              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-card text-foreground shadow-sm">
                                <Check className="size-3" />
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">{swatch.label}</span>
                        </button>
                      ))}
                    </Reveal>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section aria-labelledby="accents-title">
              <Card className="shadow-sm [--card-spacing:--spacing(5)]">
                <CardHeader>
                  <CardTitle id="accents-title">Extended accent colors</CardTitle>
                  <CardDescription>13 shades per family · 50 through 950</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Reveal as="div" targets="children" className="min-w-5xl">
                    <div className="grid grid-cols-[7rem_repeat(13,minmax(3rem,1fr))] items-center gap-1 border-b border-border/60 py-3">
                      <span className="text-xs font-medium text-muted-foreground">Family</span>
                      {FLEXOKI_SHADES.map((shade) => (
                        <span
                          className="text-center font-mono text-[0.65rem] text-muted-foreground"
                          key={shade}
                        >
                          {shade}
                        </span>
                      ))}
                    </div>
                    {FLEXOKI_ACCENTS.map((family) => (
                      <article
                        className="grid grid-cols-[7rem_repeat(13,minmax(3rem,1fr))] items-center gap-1 border-b border-border/60 py-3 last:border-b-0"
                        key={family.token}
                      >
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold">{family.label}</h3>
                          <code className="text-xs text-muted-foreground">{family.token}</code>
                        </div>
                        {FLEXOKI_SHADES.map((shade) => {
                          const token = `${family.token}-${shade}`;

                          return (
                            <button
                              aria-label={`Copy Flexoki ${family.label} ${shade}`}
                              className="group flex justify-center rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                              key={token}
                              onClick={() => void copyColor(token)}
                              title={`Copy ${family.label} ${shade}`}
                              type="button"
                            >
                              <span
                                aria-hidden="true"
                                className="palette-bubble block size-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:size-12"
                                style={
                                  {
                                    "--bubble-color": `var(--color-flexoki-${token})`,
                                  } as CSSProperties
                                }
                              >
                                {copiedToken === token && (
                                  <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-card text-foreground shadow-sm">
                                    <Check className="size-3" />
                                  </span>
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </article>
                    ))}
                  </Reveal>
                </CardContent>
              </Card>
            </section>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span>Flexoki · MIT licensed</span>
          <a
            className="transition-colors hover:text-foreground"
            href="https://stephango.com/flexoki"
            rel="noreferrer"
            target="_blank"
          >
            Official palette
          </a>
        </footer>
      </div>
    </Rise>
  );
}

export default Palette;
