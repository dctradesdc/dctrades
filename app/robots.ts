import type { MetadataRoute } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://www.dctrades.in"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",

      allow: [
        "/",
        "/pricing",
        "/privacy",
        "/terms",
        "/refund-policy",
        "/cookie-policy",
        "/disclaimer",
        "/calculator",
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
        "/login",
        "/signup",
        "/forgot-password",
        "/api/",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,

    host: siteUrl,
  };
}