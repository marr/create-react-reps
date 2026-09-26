import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";

import App from "./App.tsx";
import Practice from "./Practice.tsx";

vi.mock("cube-motion/react", async () => {
  const { createElement } = await import("react");
  const StaticMotion = ({
    as: Tag = "div",
    children,
    className,
  }: {
    as?: "div" | "main";
    children?: ReactNode;
    className?: string;
  }) => createElement(Tag, { className }, children);
  const StaticMorph = ({ active, off, on }: { active: boolean; off: ReactNode; on: ReactNode }) =>
    active ? on : off;

  return { Morph: StaticMorph, Reveal: StaticMotion, Rise: StaticMotion };
});

afterEach(cleanup);

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  window.localStorage.clear();
  delete document.documentElement.dataset.accent;
});

describe("practice session", () => {
  it("tracks reps, progress, and recent activity", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Practice />
      </MemoryRouter>,
    );

    const focusSession = screen.getByRole("region", { name: "Focus session" });
    expect(focusSession.getAttribute("data-active")).toBe("false");
    expect(screen.getByRole("status").textContent).toContain("Ready");

    await user.click(screen.getByRole("button", { name: "Add a rep" }));

    expect(focusSession.getAttribute("data-active")).toBe("true");
    expect(screen.getByRole("status").getAttribute("data-active")).toBe("true");
    expect(screen.getByRole("status").textContent).toContain("In progress");
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("1");
    expect(screen.getByText("#01")).toBeTruthy();
    expect(screen.getByText("9 reps to reach your goal")).toBeTruthy();
    expect(screen.getByText("Momentum is building")).toBeTruthy();
  });

  it("keeps progress capped at the goal and limits activity to five reps", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Practice />
      </MemoryRouter>,
    );

    for (let rep = 0; rep < 11; rep += 1) {
      await user.click(screen.getByRole("button", { name: rep < 10 ? "Add a rep" : "Keep going" }));
    }

    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("10");
    expect(
      screen.getByRole("region", { name: "Focus session" }).getAttribute("data-complete"),
    ).toBe("true");
    expect(screen.getByRole("status").getAttribute("data-complete")).toBe("true");
    expect(screen.getByText("Goal reached")).toBeTruthy();
    expect(
      within(screen.getByRole("region", { name: "Recent activity" })).getByText("#11"),
    ).toBeTruthy();
    expect(screen.getAllByText("Rep completed")).toHaveLength(5);
  });

  it("resets the count and clears recent activity", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Practice />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Add a rep" }));
    await user.click(screen.getByRole("button", { name: /Reset session/ }));

    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
    expect(screen.queryByText("Rep completed")).toBeNull();
    expect(screen.getByText("Your first rep is waiting")).toBeTruthy();
  });
});

describe("app routing", () => {
  it("navigates between the practice page and palette", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("combobox", { name: "Accent color" }));
    await user.click(screen.getByRole("option", { name: "Green" }));
    expect(document.documentElement.dataset.accent).toBe("green");
    expect(window.localStorage.getItem("practice-room-accent")).toBe("green");
    expect(
      screen
        .getByRole("combobox", { name: "Accent color" })
        .querySelector("[data-accent-swatch='selected']")
        ?.getAttribute("style"),
    ).toContain("var(--flexoki-gr)");

    await user.click(screen.getByRole("button", { name: "Palette" }));
    expect(screen.getByRole("heading", { name: "The Flexoki palette" })).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Accent color" }).textContent).toContain("Green");

    await user.click(screen.getByRole("button", { name: "Back to practice" }));
    expect(screen.getByRole("heading", { name: "Make room for a little progress." })).toBeTruthy();
  });
});
