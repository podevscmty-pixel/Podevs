import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest news, tutorials, and stories from the PODEVS community.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
