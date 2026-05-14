import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medium Articles | PODEVS",
  description: "Read our latest technical articles, tutorials, and success stories on Medium.",
};

export default function MediumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
