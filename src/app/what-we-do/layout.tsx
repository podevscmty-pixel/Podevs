import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Learn about the PODEVS mission and how we empower students through tech.",
};

export default function WhatWeDoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
