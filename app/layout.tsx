import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

import { AppProvider } from "@/components/providers/app-provider";

const inter = Inter({
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://dctrades.in";

const ogImage =
  "https://res.cloudinary.com/dniwuwt6j/image/upload/v1783278365/Gemini_Generated_Image_sxqqm9sxqqm9sxqq_yb3qvw.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "DC Trades",
    template: "%s | DC Trades",
  },

  description:
    "DC Trades is a free professional trading journal that helps Forex, Crypto, and Stock traders track trades, analyze performance, manage risk, and improve consistency.",

  applicationName: "DC Trades",

  keywords: [
    "DC Trades",
    "Trading Journal",
    "Trading Log",
    "Trade Tracker",
    "Forex Journal",
    "Crypto Journal",
    "Stock Trading Journal",
    "Trading Analytics",
    "Trading Dashboard",
    "Risk Management",
    "Trading SaaS",
    "Forex Trading",
    "Crypto Trading",
    "Performance Tracker",
    "Journal App",
  ],

  authors: [
    {
      name: "DC Trades",
      url: siteUrl,
    },
  ],

  creator: "DC Trades",

  publisher: "DC Trades",

  category: "Finance",

  classification: "Trading Journal",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    locale: "en_US",
    url: siteUrl,
    siteName: "DC Trades",
    title: "DC Trades | Professional Trading Journal",
    description:
      "Track trades, analyze performance, manage risk, and become a better trader with DC Trades.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "DC Trades",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DC Trades | Professional Trading Journal",
    description:
      "A modern trading journal for Forex, Crypto, and Stock traders.",
    creator: "@dctrades",
    images: [ogImage],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DC Trades",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={inter.className}>
          <NextTopLoader
            color="#3b82f6"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6, 0 0 5px #3b82f6"
            showSpinner={false}
          />

          <AppProvider>
            {children}
          </AppProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}