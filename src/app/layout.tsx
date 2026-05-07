import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageLoader } from "@/components/page-loader";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import * as React from "react";
import { Suspense } from "react";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "PODEVS — The Smile of Education",
  description: "A student-first EdTech community. Learn, build, and launch through workshops, hackathons, and affordable web services.",
  keywords: "EdTech, students, workshops, hackathons, web development, community, Chennai",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
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
