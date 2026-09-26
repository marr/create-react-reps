import { expect, test } from "@playwright/test";

test("practice room loads and accepts a rep", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Make room for a little progress." }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Add a rep" })).toBeVisible();

  await page.getByRole("button", { name: "Add a rep" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
});

test("navigates to palette and back", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Palette" }).click();
  await expect(page.getByRole("heading", { name: "The Flexoki palette" })).toBeVisible();

  await page.getByRole("button", { name: "Back to practice" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Make room for a little progress." }),
  ).toBeVisible();
});
