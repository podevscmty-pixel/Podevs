import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
  description: "Watch our workshops, tutorials, and event highlights on YouTube.",
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
