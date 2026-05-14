"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Play, Mic, Headphones, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { supabase } from "@/lib/supabase";

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
  const [episodes, setEpisodes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchEpisodes() {
      try {
        const { data } = await supabase
          .from('podcasts')
          .select('*')
          .order('published_at', { ascending: false });
        if (data) setEpisodes(data);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEpisodes();
  }, []);

  const latestEpisode = episodes[0];

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
                  <button 
                    className="btn-primary" 
                    style={{ padding: "14px 24px", fontSize: "0.95rem" }}
                    onClick={() => {
                      if (latestEpisode?.audio_url && latestEpisode.audio_url !== '#') {
                        window.open(latestEpisode.audio_url, '_blank');
                      }
                    }}
                  >
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
          
          {loading ? (
            <div className="flex flex-col gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse" style={{ height: 120, background: "var(--bg2)", borderRadius: 16 }} />
              ))}
            </div>
          ) : episodes.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No episodes found.</p>
          ) : (
            <div className="flex flex-col gap-6">
                <Reveal key={ep.id} delay={i * 0.1}>
                  <a 
                    href={ep.audio_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    className="group"
                  >
                    <SpotlightCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                      <div 
                        style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,138,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--orange)" }} 
                        className="group-hover:bg-[rgba(255,138,0,0.15)] transition-colors"
                      >
                        <Play size={24} fill="currentColor" style={{ marginLeft: 4 }} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 8 }}>
                          <span className="tag" style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>Episode #{episodes.length - i}</span>
                          <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                            {new Date(ep.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                          </span>
                          <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}><Headphones size={12} /> {ep.duration}</span>
                        </div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 8 }} className="group-hover:text-[var(--orange)] transition-colors">{ep.title}</h3>
                        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{ep.description}</p>
                      </div>
                      
                      <div style={{ alignSelf: "center" }}>
                        <div 
                          className="btn-outline" 
                          style={{ padding: "10px 20px", borderRadius: 12 }}
                        >
                          Listen Now <ArrowRight size={14} />
                        </div>
                      </div>
                    </SpotlightCard>
                  </a>
                </Reveal>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
