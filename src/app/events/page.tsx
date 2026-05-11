import EventsClient from "./EventsClient";

// Static placeholder data for a professional look
const STATIC_EVENTS = [
  {
    id: "1",
    title: "Modern Web Development Workshop",
    description: "A comprehensive guide to building high-performance websites with Next.js and Tailwind CSS.",
    start_time: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    end_time: new Date(Date.now() + 86400000 * 2 + 7200000).toISOString(),
    location: "Online / Virtual Hub",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Student Builder Hackathon",
    description: "48 hours of pure building. Form teams, solve real-world problems, and win prizes.",
    start_time: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
    end_time: new Date(Date.now() + 86400000 * 16).toISOString(),
    location: "PODEVS Chennai Campus",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  }
];

export default function EventsPage() {
  return <EventsClient events={STATIC_EVENTS} />;
}
