import EventsClient from "./EventsClient";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function EventsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: any[] = [];

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

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
