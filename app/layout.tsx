import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

import { AppProvider } from "@/components/providers/app-provider";
import { siteConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  keywords: siteConfig.keywords,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,

  category: "Finance",
  classification: "Trading Journal",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Trading Journal`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",

  name: siteConfig.name,

  url: siteConfig.url,

  description: siteConfig.description,

  applicationCategory: "FinanceApplication",

  operatingSystem: "Web",

  browserRequirements: "Requires JavaScript",

  image: siteConfig.ogImage,

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },

  creator: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className={inter.className}>
        <ViewTransitions>
          <NextTopLoader />

          <AppProvider>
            {children}
          </AppProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}