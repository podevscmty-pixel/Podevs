"use client";
import Link from "next/link";
import { MapPin, Clock, Users } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Simple fade-up component for lists
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    style={{ height: "100%" }}
  >
    {children}
  </motion.div>
);

type Event = {
  id: string;
  title: string;
  description: string;
  event_type: string;
  location: string;
  price: string;
  start_time: string;
  end_time?: string | null;
  max_seats?: number | null;
  registration_link?: string | null;
};

export default function EventsClient({ events }: { events: Event[] }) {
  // Process events: split into upcoming and past based on start_time
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.start_time) >= now);
  const past = events.filter((e) => new Date(e.start_time) < now);

  const formatDay = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { day: '2-digit' });
  };
  const formatMonth = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  };
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Header Section */}
      <section style={{ padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 800, height: 400, background: "radial-gradient(ellipse at top, rgba(255,138,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label">PODEVS Events</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 20 }}>Events & <span style={{ color: "var(--orange)" }}>Hackathons</span></h1>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540 }}>Show up, build something, and meet people who care about the same things you do. Join our vibrant community of creators.</p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section style={{ padding: "0 0 100px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--orange)", boxShadow: "0 0 10px var(--orange)" }} />
              <span className="section-label" style={{ marginBottom: 0 }}>Upcoming Events</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 40 }}>Don't Miss These</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {upcoming.length === 0 ? (
              <p style={{ color: "var(--muted)" }}>No upcoming events right now. Check back soon!</p>
            ) : upcoming.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.1}>
                <SpotlightCard style={{ padding: "32px", display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* 1. Header: Date & Tag */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: "32px" }}>
                    <div style={{ width: 60, height: 60, borderRadius: 14, background: "rgba(255,138,0,0.08)", border: "1px solid rgba(255,138,0,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--orange)", lineHeight: 1 }}>{formatDay(ev.start_time)}</span>
                      <span style={{ fontSize: 10, color: "var(--orange)", fontFamily: "monospace", letterSpacing: "0.05em", marginTop: 2 }}>{formatMonth(ev.start_time)}</span>
                    </div>
                    <span className="tag" style={{ marginTop: 4 }}>{ev.event_type}</span>
                  </div>
                  
                  {/* 2. Content: Title & Description */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.4, marginBottom: 12 }}>{ev.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{ev.description}</p>
                  </div>

                  {/* 3. Meta Info: Icons */}
                  <div style={{ display: "flex", flexWrap: "wrap", columnGap: 20, rowGap: 12, marginBottom: "32px" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} />{formatTime(ev.start_time)}</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} />{ev.location}</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>🎟 {ev.price}</span>
                    {ev.max_seats && <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}><Users size={14} />Max {ev.max_seats}</span>}
                  </div>

                  {/* 4. Button: Pinned to bottom */}
                  <div style={{ marginTop: "auto" }}>
                    <Link 
                      href={ev.registration_link ? ev.registration_link : `/events/${ev.id}`} 
                      target={ev.registration_link ? "_blank" : undefined} 
                      rel={ev.registration_link ? "noopener noreferrer" : undefined} 
                      className="btn-primary" 
                      style={{ width: "100%", justifyContent: "center", fontSize: "0.9rem", padding: "14px 24px", borderRadius: "12px" }}
                    >
                      Register Now
                    </Link>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section style={{ padding: "0 0 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, var(--border), transparent)", marginBottom: 64 }} />
          
          <Reveal>
            <span className="section-label">Archive</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 32 }}>Past Events</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {past.length === 0 ? (
              <p style={{ color: "var(--muted)" }}>No past events.</p>
            ) : past.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.05}>
                <SpotlightCard style={{ padding: "24px 28px", opacity: 0.85, display: "flex", flexDirection: "column", gap: 16, borderStyle: "dashed" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,138,0,0.05)", border: "1px solid rgba(255,138,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--orange)", lineHeight: 1 }}>{formatDay(ev.start_time)}</span>
                      <span style={{ fontSize: 9, color: "var(--orange)", fontFamily: "monospace" }}>{formatMonth(ev.start_time)}</span>
                    </div>
                    <div>
                      <span className="tag" style={{ fontSize: 10, padding: "2px 8px", marginBottom: 6, display: "inline-block", background: "transparent", border: "1px solid var(--border)" }}>Completed</span>
                      <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>{ev.title}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: "0.85rem", color: "var(--muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} />{ev.location}</span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
