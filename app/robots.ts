import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://dctrades.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/login",
          "/signup",
          "/forgot-password",
          "/privacy-policy",
          "/terms",
        ],
        disallow: [
          "/dashboard",
          "/admin",
          "/analysis",
          "/accounts",
          "/trades",
          "/calendar",
          "/settings",
          "/profile",
          "/api/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}