import type { Metadata } from "next";
import { Inter, Outfit, Bebas_Neue, Syne, Unbounded, Syncopate, Bruno_Ace_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageLoader } from "@/components/page-loader";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import * as React from "react";
import { Suspense } from "react";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-syncopate", display: "swap" });
const bruno = Bruno_Ace_SC({ weight: "400", subsets: ["latin"], variable: "--font-bruno", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "PODEVS | Smile of Education",
    template: "%s | PODEVS"
  },
  description: "A student-first EdTech community. Learn, build, and launch through workshops, hackathons, and affordable web services.",
  keywords: "EdTech, students, workshops, hackathons, web development, community, Chennai",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${bebas.variable} ${syne.variable} ${unbounded.variable} ${syncopate.variable} ${bruno.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
