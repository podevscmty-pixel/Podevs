import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about PODEVS, our mission, and our story.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
