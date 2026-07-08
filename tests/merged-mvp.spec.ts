import { expect, test } from "@playwright/test";

test("landing advertises product stack", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("internal desk tool")).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI analyst" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Legal checker" })).toBeVisible();
});

test("client workspace exposes product modules", async ({ page }) => {
  await page.goto("/ubs", { waitUntil: "networkidle" });
  await expect(page.getByText("UBS workspace")).toBeVisible();
  await expect(page.getByRole("link", { name: /AI analyst Junior analyst/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Python strategy engine Quant bench/ })).toBeVisible();
});

test("company host sends client routes to product endpoint", async ({ request }) => {
  const response = await request.get("/ubs", { headers: { host: "vesperasystems.com" }, maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe("https://vespera.systems/ubs");
});

test("legal checker route is present", async ({ page }) => {
  const response = await page.goto("/ubs/legal", { waitUntil: "networkidle" });
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.getByText("Legal contract checker")).toBeVisible();
  await expect(page.getByText("DOCX/TXT")).toBeVisible();
});
