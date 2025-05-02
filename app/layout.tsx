import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

config.autoAddCss = false;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#64ffda',
};

export const metadata: Metadata = {
  title: "LinkPure - Clean tracking from your links | Privacy first",
  description: "Free tool to remove tracking and affiliate parameters from Amazon, AliExpress, Mercado Livre, Shopee, and YouTube links. Protect your online privacy.",
  keywords: "link cleaner, remove tracking, amazon, aliexpress, mercado livre, youtube, privacy, remove affiliate links",
  authors: [{ name: "Geovane", url: "https://g2dev.me" }],
  creator: "Geovane",
  publisher: "Geovane",
  robots: "index, follow",
  alternates: {
    canonical: "https://linkpure.g2dev.me",
  },
  openGraph: {
    type: "website",
    url: "https://linkpure.g2dev.me",
    title: "LinkPure - Clean tracking from your links | Privacy first",
    description: "Free tool to remove tracking and affiliate parameters from Amazon, AliExpress, Mercado Livre, and YouTube links.",
    siteName: "LinkPure",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LinkPure - Clean tracking from your links",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkPure - Clean tracking from your links",
    description: "Remove tracking and affiliate parameters from your favorite links easily.",
    images: ["/og-image.png"],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
