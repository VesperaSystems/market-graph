import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: ["/", "/about", "/research", "/careers", "/contact"], disallow: ["/admin", "/api", "/ubs", "/rbs", "/sjp", "/demo"] }], sitemap: "https://vesperasystems.com/sitemap.xml" };
}
