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
  title: "LinkPure - Remove rastreamento de links | Limpe seus links",
  description: "Ferramenta gratuita para remover parâmetros de rastreamento e afiliados de links da Amazon, AliExpress, Mercado Livre e YouTube. Proteja sua privacidade online.",
  keywords: "remove rastreamento, limpar links, amazon, aliexpress, mercado livre, youtube, privacidade online, remover afiliados",
  authors: [{ name: "Geovane", url: "https://geovanebr.me" }],
  creator: "Geovane",
  publisher: "Geovane",
  robots: "index, follow",
  alternates: {
    canonical: "https://linkpure.geovanebr.me",
  },
  openGraph: {
    type: "website",
    url: "https://linkpure.geovanebr.me",
    title: "LinkPure - Remove rastreamento de links | Limpe seus links",
    description: "Ferramenta gratuita para remover parâmetros de rastreamento e afiliados de links da Amazon, AliExpress, Mercado Livre e YouTube.",
    siteName: "LinkPure",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LinkPure - Remove rastreamento de links",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkPure - Remove rastreamento de links",
    description: "Remova parâmetros de rastreamento e afiliados dos seus links favoritos",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
