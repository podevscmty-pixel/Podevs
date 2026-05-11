import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the students and builders behind PODEVS.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
