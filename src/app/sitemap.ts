import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vesperasystems.com";
  return ["", "/about", "/research", "/careers", "/contact"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path ? 0.7 : 1 }));
}
