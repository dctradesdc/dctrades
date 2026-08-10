import type { Metadata } from "next";

export const siteConfig = {
  name: "DC Trades",

  url: (
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://www.dctrades.in"
  ).replace(/\/$/, ""),

  title: "DC Trades – Professional Trading Journal",

  description:
    "DC Trades is a professional trading journal for Forex, Crypto, and Stock traders. Track trades, analyze performance, manage risk, and build consistent trading habits.",

  keywords: [
    "DC Trades",
    "trading journal",
    "trading journal app",
    "free trading journal",
    "trade tracker",
    "trading log",
    "forex trading journal",
    "forex journal",
    "crypto trading journal",
    "stock trading journal",
    "trading performance",
    "trading analytics",
    "trade analysis",
    "risk management",
  ],

  ogImage:
    "https://res.cloudinary.com/dniwuwt6j/image/upload/v1783278365/Gemini_Generated_Image_sxqqm9sxqqm9sxqq_yb3qvw.png",

  twitterHandle: "@dctrades",
};

export function createMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),

    title: pageTitle,

    description:
      description ?? siteConfig.description,

    keywords: siteConfig.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,

          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
          },
        },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: pageTitle,
      description:
        description ?? siteConfig.description,

      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${pageTitle} - DC Trades`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description:
        description ?? siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}