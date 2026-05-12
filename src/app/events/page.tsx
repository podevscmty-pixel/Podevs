import EventsClient from "./EventsClient";
import { supabase } from "@/lib/supabase";

// Static placeholder data for a professional look
const STATIC_EVENTS = [
  {
    id: "demo-ongoing",
    title: "Live Student Builder Hackathon",
    description: "48 hours of pure building. Form teams, solve real-world problems, and win prizes. Join the livestream and get started now!",
    start_time: new Date(Date.now() - 3600000).toISOString(), // Started 1 hour ago
    end_time: new Date(Date.now() + 86400000 * 2).toISOString(), // Ends in 2 days
    location: "PODEVS Chennai Campus / Online",
    event_type: "Hackathon",
    price: "Free",
  },
  {
    id: "1",
    title: "Modern Web Development Workshop",
    description: "A comprehensive guide to building high-performance websites with Next.js and Tailwind CSS.",
    start_time: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    end_time: new Date(Date.now() + 86400000 * 5 + 7200000).toISOString(),
    location: "Online / Virtual Hub",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    event_type: "Workshop",
    price: "Free",
  },
  {
    id: "2",
    title: "AI For Builders Meetup",
    description: "Discover how to integrate AI APIs into your Next.js applications and build production-ready tools.",
    start_time: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
    end_time: new Date(Date.now() + 86400000 * 16).toISOString(),
    location: "PODEVS Hub",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    event_type: "Meetup",
    price: "₹99",
  }
];

// Optional: force dynamic rendering if you want it to fetch fresh data every time
export const revalidate = 0;

export default async function EventsPage() {
  let events = STATIC_EVENTS;

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });

    if (error) {
      console.warn("Supabase fetch error:", error.message || error);
    } else if (data && data.length > 0) {
      events = data;
    }
  } catch (err) {
    console.error("Error fetching events:", err);
  }

  return <EventsClient events={events} />;
}
