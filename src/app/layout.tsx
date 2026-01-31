import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnalyticsInit } from "../components/AnalyticsInit";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Scrapebit - Extract Data from Any Website in 2 Clicks",
  description: "The next generation AI-powered web scraper. Extract structured data from any website using natural language. No coding required.",
  keywords: "web scraper, ai scraper, data extraction, web scraping, automation, scrapebit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
