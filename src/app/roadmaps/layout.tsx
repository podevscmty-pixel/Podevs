import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmaps | PODEVS",
  description: "Structured technical roadmaps to take you from beginner to professional.",
};

export default function RoadmapsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
