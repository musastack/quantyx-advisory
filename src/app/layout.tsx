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
  title: "Quantyx Advisory — Data Consultancy for Growing Businesses",
  description:
    "Quantyx Advisory helps growing businesses centralise data, automate reporting, and build dashboards that support better decisions. Specialist data consultancy based in the UK.",
  keywords: [
    "data consultancy", "business reporting", "dashboard build", "data automation",
    "SME data", "management reporting", "Supabase", "Postgres", "UK consultancy",
  ],
  openGraph: {
    title: "Quantyx Advisory — Data Consultancy for Growing Businesses",
    description:
      "We turn messy business data into clear reporting and insight. Specialists in dashboards, automation, and data centralisation for founder-led businesses and SMEs.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantyx Advisory",
    description: "We turn messy business data into clear reporting and insight.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05050f] text-white">{children}</body>
    </html>
  );
}
