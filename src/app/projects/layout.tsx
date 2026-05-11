import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Works",
  description: "Explore the websites, apps, and platforms built by the PODEVS community.",
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
