import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",

    name: "DC Trades",
    short_name: "DC Trades",

    description:
      "DC Trades is a free professional trading journal for Forex, Crypto, and Stock traders. Track trades, analyze performance, and improve your trading consistency.",

    start_url: "/",
    scope: "/",

    display: "standalone",

    orientation: "portrait",

    background_color: "#0f172a",
    theme_color: "#2563eb",

    lang: "en-US",

    categories: [
      "finance",
      "business",
      "productivity",
    ],

    dir: "ltr",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    screenshots: [
      {
        src: "/screenshots/dashboard.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "DC Trades Dashboard",
      },
    ],
  };
}