import { createClient } from "@/utils/supabase/server";
import EventsClient from "./EventsClient";

// Revalidate page occasionally or keep dynamic
export const revalidate = 60; // revalidate every minute

export default async function EventsPage() {
  const supabase = await createClient();
  
  // Fetch events ordered by start time
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    // Fallback to empty array if there's an error so the page doesn't crash
    return <EventsClient events={[]} />;
  }

  return <EventsClient events={events || []} />;
}
