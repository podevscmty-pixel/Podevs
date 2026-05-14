"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, PenTool, Code, Smartphone, Database, Terminal } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const iconMap: Record<string, any> = {
  Layout: <Layout size={24} />,
  Server: <Server size={24} />,
  PenTool: <PenTool size={24} />,
  Code: <Code size={24} />,
  Smartphone: <Smartphone size={24} />,
  Database: <Database size={24} />,
  Terminal: <Terminal size={24} />,
};

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

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const { data } = await supabase
          .from('roadmaps')
          .select('*')
          .order('created_at', { ascending: true });
        if (data) setRoadmaps(data);
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmaps();
  }, []);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section className="py-16 md:py-24">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Reveal>
              <span className="section-label">Learning Paths</span>
              <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, marginBottom: 16, letterSpacing: "-0.03em" }}>Choose Your <span style={{ color: "var(--orange)" }}>Path</span></h1>
              <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1.1rem" }}>Technical roadmaps designed to take you from beginner to professional. Follow the steps and start building.</p>
            </Reveal>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse" style={{ height: 400, background: "var(--bg2)" }} />
              ))}
            </div>
          ) : roadmaps.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>No roadmaps available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roadmaps.map((map, i) => (
                <Reveal key={map.id} delay={i * 0.1}>
                  <SpotlightCard className="p-8 md:p-10 h-full flex flex-col">
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: map.bg_color_rgba || "rgba(255,138,0,0.1)", color: map.accent_color || "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {iconMap[map.icon_name] || <Code size={24} />}
                      </div>
                      <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>{map.title}</h2>
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 32 }}>{map.description}</p>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                      {map.steps && Array.isArray(map.steps) && (map.steps as any[]).map((step: any, j: number) => (
                        <div key={j} style={{ display: "flex", gap: 16 }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${map.accent_color || "var(--orange)"}`, color: map.accent_color || "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, background: "var(--bg)" }}>
                              {step.num}
                            </div>
                            {j !== map.steps.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--border)", minHeight: 20 }} />}
                          </div>
                          <div style={{ paddingBottom: j !== map.steps.length - 1 ? 16 : 0, paddingTop: 2 }}>
                            <h4 style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>{step.name}</h4>
                            <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                      <Link 
                        href={map.link || `/roadmaps/${map.id}`} 
                        target={map.link?.startsWith('http') ? "_blank" : undefined}
                        className="btn-primary" 
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        Start this Path
                      </Link>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
