import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FretScout - Find Used Guitar Deals Across All Marketplaces",
  description: "Search all guitar marketplaces at once. Get deal alerts for vintage gems. Never miss your dream guitar again. Join 500+ guitarists already waiting.",
  keywords: "used guitars, vintage guitars, guitar deals, guitar marketplace, reverb, guitar center, fender, gibson, martin, guitar search",
  authors: [{ name: "FretScout Team" }],
  creator: "FretScout",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fretscout.com",
    siteName: "FretScout",
    title: "FretScout - Find Used Guitar Deals Across All Marketplaces",
    description: "Search all guitar marketplaces at once. Get deal alerts for vintage gems. Never miss your dream guitar again.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FretScout - Guitar Deal Discovery Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FretScout - Find Used Guitar Deals Across All Marketplaces",
    description: "Search all guitar marketplaces at once. Get deal alerts for vintage gems. Never miss your dream guitar again.",
    images: ["/og-image.png"],
    creator: "@fretscout",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
