import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Affordable web development and design services for startups and students.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
