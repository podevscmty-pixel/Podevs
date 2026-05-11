import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Join our workshops, hackathons, and student meetups.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
