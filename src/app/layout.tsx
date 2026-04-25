import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quantyx Advisory — Financial Data Systems for Growing Businesses",
  description:
    "We connect your systems, centralise your data, and build the operating layer that gives management full visibility — without spreadsheets or manual effort. Specialist data consultancy for founder-led businesses and SMEs.",
  keywords: [
    "data consultancy", "financial operating system", "business dashboard", "data automation",
    "SME data", "management reporting", "Xero integration", "Cin7 integration", "UK data consultancy",
  ],
  openGraph: {
    title: "Quantyx Advisory — Financial Data Systems for Growing Businesses",
    description:
      "We build bespoke financial operating systems that connect your data, automate your reporting, and give your team real-time visibility.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantyx Advisory",
    description: "Your data exists. You just can't see it yet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('qx-theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#05050f] dark:text-white">
        {children}
      </body>
    </html>
  );
}
