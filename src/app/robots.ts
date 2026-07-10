import type { MetadataRoute } from "next";

const siteUrl = "https://mrs-agro-pesticides.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/products", "/knowledge-center", "/franchise", "/contact"],
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
