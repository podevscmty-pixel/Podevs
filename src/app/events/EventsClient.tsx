"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
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
  id: number;
  title: string;
  description: string;
  event_type: string;
  location: string;
  price: string;
  date: string;
  time: string;
  status: "ongoing" | "upcoming" | "past";
  image_url?: string | null;
  registration_link?: string | null;
};

export default function EventsClient({ events }: { events: Event[] }) {
  // Filter by status field from DB
  const ongoing = events.filter((e) => e.status === "ongoing");
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Header Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 800, height: 400, background: "radial-gradient(ellipse at top, rgba(255,138,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label">PODEVS Events</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 20 }}>Events & <span style={{ color: "var(--orange)" }}>Hackathons</span></h1>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540 }}>Show up, build something, and meet people who care about the same things you do. Join our vibrant community of creators.</p>
          </motion.div>
        </div>
      </section>

      {/* Ongoing Events */}
      {ongoing.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="section-label" style={{ marginBottom: 0, color: "var(--orange)" }}>Happening Now</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 32 }}>Ongoing Event</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ongoing.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 0.1}>
                  <SpotlightCard className="flex flex-col h-full border border-[var(--orange)] overflow-hidden" style={{ background: "rgba(255, 138, 0, 0.03)", padding: 0 }}>
                    {/* Poster image */}
                    {ev.image_url && (
                      <div style={{ position: "relative", width: "100%", height: 400, flexShrink: 0 }}>
                        <Image src={ev.image_url} alt={ev.title} fill style={{ objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)" }} />
                        <span className="tag" style={{ position: "absolute", top: 16, right: 16, background: "var(--orange)", color: "#fff", padding: "6px 14px" }}>{ev.event_type}</span>
                      </div>
                    )}
                    <div style={{ padding: "32px 40px 40px" }}>
                      {!ev.image_url && (
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
                          <span className="tag" style={{ background: "var(--orange)", color: "#fff" }}>{ev.event_type}</span>
                        </div>
                      )}
                      <Link 
                        href={ev.registration_link ?? `/events/${ev.id}`}
                        target={ev.registration_link ? "_blank" : undefined}
                        rel={ev.registration_link ? "noopener noreferrer" : undefined}
                        className="hover:text-[var(--orange)] transition-colors inline-block"
                      >
                        <h3 style={{ fontWeight: 800, fontSize: "1.75rem", lineHeight: 1.3, marginBottom: 12 }}>{ev.title}</h3>
                      </Link>
                      <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 24, whiteSpace: "pre-line" }}>{ev.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", columnGap: 20, rowGap: 10, marginBottom: 24 }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--text)", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}><Clock size={14} color="var(--orange)" />{ev.time}</span>
                        <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} />{ev.location}</span>
                        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>🎟 {ev.price}</span>
                      </div>
                      <Link
                        href={ev.registration_link ?? `/events/${ev.id}`}
                        target={ev.registration_link ? "_blank" : undefined}
                        rel={ev.registration_link ? "noopener noreferrer" : undefined}
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "16px 24px", borderRadius: "12px", boxShadow: "0 0 20px rgba(255,138,0,0.4)" }}
                      >
                        Join Now →
                      </Link>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="pb-16 md:pb-24">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--orange)", boxShadow: "0 0 10px var(--orange)" }} />
              <span className="section-label" style={{ marginBottom: 0 }}>Upcoming Events</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 40 }}>Don't Miss These</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.length === 0 ? (
              <p style={{ color: "var(--muted)" }}>No upcoming events right now. Check back soon!</p>
            ) : upcoming.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.1}>
                <SpotlightCard className="flex flex-col h-full overflow-hidden" style={{ padding: 0 }}>
                  {ev.image_url && (
                    <div style={{ position: "relative", width: "100%", height: 280, flexShrink: 0 }}>
                      <Image src={ev.image_url} alt={ev.title} fill style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
                    </div>
                  )}
                  <div style={{ padding: "28px 32px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span className="tag">{ev.event_type}</span>
                    </div>
                    <Link 
                      href={ev.registration_link ?? `/events/${ev.id}`}
                      target={ev.registration_link ? "_blank" : undefined}
                      rel={ev.registration_link ? "noopener noreferrer" : undefined}
                      className="hover:text-[var(--orange)] transition-colors"
                    >
                      <h3 style={{ fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.4, marginBottom: 12 }}>{ev.title}</h3>
                    </Link>
                    <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 20 }}>{ev.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", columnGap: 16, rowGap: 8, marginBottom: 20 }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} />{ev.date}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}><MapPin size={12} />{ev.location}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>🎟 {ev.price}</span>
                    </div>
                    <div style={{ marginTop: "auto" }}>
                      <Link
                        href={ev.registration_link ?? `/events/${ev.id}`}
                        target={ev.registration_link ? "_blank" : undefined}
                        rel={ev.registration_link ? "noopener noreferrer" : undefined}
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center", fontSize: "0.9rem", padding: "14px 24px", borderRadius: "12px" }}
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, var(--border), transparent)", marginBottom: 64 }} />
          
          <Reveal>
            <span className="section-label">Archive</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 32 }}>Past Events</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {past.length === 0 ? (
              <p style={{ color: "var(--muted)" }}>No past events.</p>
            ) : past.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.05}>
                <SpotlightCard className="p-6 md:p-8 opacity-70 flex flex-col gap-4 border-dashed">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div>
                      <span className="tag" style={{ fontSize: 10, padding: "2px 8px", marginBottom: 6, display: "inline-block", background: "transparent", border: "1px solid var(--border)" }}>Completed</span>
                      <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>{ev.title}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: "0.8rem", color: "var(--muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} />{ev.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MapPin size={12} />{ev.location}</span>
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
