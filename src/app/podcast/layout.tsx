import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | PODEVS",
  description: "Listen to the PODEVS podcast. Interviews with builders, engineers, and industry experts.",
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
