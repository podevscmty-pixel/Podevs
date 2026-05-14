"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Play, Mic, Headphones, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const episodes = [
  { id: "1", title: "Building PODEVS: The Origin Story", duration: "45:20", date: "May 10, 2026", guest: "Founder", desc: "We sit down to discuss why PODEVS was started and the vision for the future of student-led ed-tech." },
  { id: "2", title: "From Bootcamp to Senior Engineer", duration: "52:10", date: "April 28, 2026", guest: "Sneha M.", desc: "Sneha shares her journey transitioning from a non-CS background into a senior engineering role." },
  { id: "3", title: "Mastering the Tech Interview", duration: "38:45", date: "April 15, 2026", guest: "Karthik S.", desc: "Actionable tips and strategies for passing technical interviews at top tech companies." },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function PodcastPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* HERO SECTION */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 800, height: 400, background: "radial-gradient(ellipse at top, rgba(255,138,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div style={{ flex: 1 }}>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 14px", borderRadius: 100, background: "rgba(255, 138, 0, 0.08)", border: "1px solid rgba(255, 138, 0, 0.2)" }}>
                  <Mic size={14} color="var(--orange)" />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--orange)" }}>Official Podcast</span>
                </div>
                <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>The Builders' <span style={{ color: "var(--orange)" }}>Voice</span></h1>
                <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540, marginBottom: 32 }}>
                  Real conversations with developers, designers, and founders. Learn the untold stories behind great careers and products.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button className="btn-primary" style={{ padding: "14px 24px", fontSize: "0.95rem" }}>
                    <Play size={18} fill="currentColor" /> Listen to Latest
                  </button>
                  <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "14px 24px", fontSize: "0.95rem" }}>
                    <Headphones size={18} /> Follow on Spotify
                  </a>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.2}>
              <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] mx-auto md:mx-0" style={{ aspectRatio: "1/1", borderRadius: 32, background: "linear-gradient(135deg, var(--card), var(--bg2))", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(255,138,0,0.1) 0%, transparent 60%)" }} />
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <Mic size={80} style={{ color: "var(--orange)", marginBottom: 24, margin: "0 auto", opacity: 0.8 }} />
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em" }}>PODEVS</h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--orange)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Podcast</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EPISODES LIST */}
      <section className="pb-24">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <span className="section-label">Episodes</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 40 }}>All Episodes</h2>
          </Reveal>
          
          <div className="flex flex-col gap-6">
            {episodes.map((ep, i) => (
              <Reveal key={ep.id} delay={i * 0.1}>
                <SpotlightCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,138,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--orange)", cursor: "pointer" }} className="hover:bg-[rgba(255,138,0,0.15)] transition-colors">
                    <Play size={24} fill="currentColor" style={{ marginLeft: 4 }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 8 }}>
                      <span className="tag" style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>Episode {ep.id}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{ep.date}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}><Headphones size={12} /> {ep.duration}</span>
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8 }}>{ep.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{ep.desc}</p>
                  </div>
                  
                  <div style={{ alignSelf: "center" }}>
                    <button className="btn-outline" style={{ padding: "10px 20px", borderRadius: 12 }}>
                      Listen Now <ArrowRight size={14} />
                    </button>
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
