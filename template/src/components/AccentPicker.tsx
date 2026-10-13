import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ACCENT_STORAGE_KEY = "practice-room-accent";

const ACCENTS = [
  { label: "Red", token: "re", value: "red" },
  { label: "Orange", token: "or", value: "orange" },
  { label: "Yellow", token: "ye", value: "yellow" },
  { label: "Green", token: "gr", value: "green" },
  { label: "Cyan", token: "cy", value: "cyan" },
  { label: "Blue", token: "bl", value: "blue" },
  { label: "Purple", token: "pu", value: "purple" },
  { label: "Magenta", token: "ma", value: "magenta" },
] as const;

type AccentValue = (typeof ACCENTS)[number]["value"];

function isAccentValue(value: string | null): value is AccentValue {
  return ACCENTS.some((accent) => accent.value === value);
}

function getInitialAccent(): AccentValue {
  const savedAccent = window.localStorage.getItem(ACCENT_STORAGE_KEY);
  return isAccentValue(savedAccent) ? savedAccent : "red";
}

function AccentPicker() {
  const [accent, setAccent] = useState<AccentValue>(getInitialAccent);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  function handleAccentChange(value: string | null) {
    if (!isAccentValue(value)) return;

    window.localStorage.setItem(ACCENT_STORAGE_KEY, value);
    setAccent(value);
  }

  const items = ACCENTS.map(({ label, value }) => ({ label, value }));
  const selectedAccent = ACCENTS.find((option) => option.value === accent) ?? ACCENTS[0];

  return (
    <Select items={items} onValueChange={handleAccentChange} value={accent}>
      <SelectTrigger aria-label="Accent color" className="w-32 justify-start sm:w-36">
        <span
          aria-hidden="true"
          className="size-3 shrink-0 rounded-full border border-foreground/15"
          data-accent-swatch="selected"
          style={{ backgroundColor: `var(--flexoki-${selectedAccent.token})` }}
        />
        <SelectValue placeholder="Accent" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {ACCENTS.map((option) => (
            <SelectItem className="pl-2.5" key={option.value} value={option.value}>
              <span className="grid w-full grid-cols-[0.75rem_1fr] items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full border border-foreground/15"
                  style={{ backgroundColor: `var(--flexoki-${option.token})` }}
                />
                <span>{option.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default AccentPicker;
