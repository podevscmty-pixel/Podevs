import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | PODEVS",
  description: "Subscribe to the PODEVS newsletter for the latest tech updates, resources, and community news.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
