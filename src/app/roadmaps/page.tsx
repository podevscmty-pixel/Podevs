"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, PenTool, Code, Smartphone, Database, Terminal, CheckCircle2 } from "lucide-react";
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
  const [progress, setProgress] = React.useState<Record<string, number[]>>({});

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

    // Load progress from localStorage
    const savedProgress = localStorage.getItem("podevs_roadmap_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const toggleStep = (roadmapId: string, stepNum: number) => {
    const currentSteps = progress[roadmapId] || [];
    let newSteps;
    if (currentSteps.includes(stepNum)) {
      newSteps = currentSteps.filter(s => s !== stepNum);
    } else {
      newSteps = [...currentSteps, stepNum];
    }
    
    const newProgress = { ...progress, [roadmapId]: newSteps };
    setProgress(newProgress);
    localStorage.setItem("podevs_roadmap_progress", JSON.stringify(newProgress));
  };

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
              {roadmaps.map((map, i) => {
                const completedSteps = progress[map.id] || [];
                const totalSteps = Array.isArray(map.steps) ? map.steps.length : 0;
                const percent = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;
                
                return (
                  <Reveal key={map.id} delay={i * 0.1}>
                    <SpotlightCard className="p-8 md:p-10 h-full flex flex-col relative overflow-hidden">
                      {/* Background Progress Glow */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, width: `${percent}%`, height: "4px", background: map.accent_color || "var(--orange)", transition: "width 0.5s ease-out", boxShadow: `0 0 10px ${map.accent_color || "var(--orange)"}` }} />
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ width: 56, height: 56, borderRadius: 16, background: map.bg_color_rgba || "rgba(255,138,0,0.1)", color: map.accent_color || "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {iconMap[map.icon_name] || <Code size={24} />}
                          </div>
                          <div>
                            <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>{map.title}</h2>
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: percent === 100 ? "#10b981" : "var(--muted)" }}>
                              {percent === 100 ? "Completed ✓" : `${completedSteps.length} of ${totalSteps} steps`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 32 }}>{map.description}</p>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                        {map.steps && Array.isArray(map.steps) && (map.steps as any[]).map((step: any, j: number) => {
                          const isDone = completedSteps.includes(step.num);
                          return (
                            <div 
                              key={j} 
                              onClick={() => toggleStep(map.id, step.num)}
                              style={{ display: "flex", gap: 16, cursor: "pointer", opacity: isDone ? 0.7 : 1, transition: "opacity 0.2s" }}
                              className="group"
                            >
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                <div style={{ 
                                  width: 28, height: 28, borderRadius: "50%", 
                                  border: `1px solid ${isDone ? "#10b981" : (map.accent_color || "var(--orange)")}`, 
                                  color: isDone ? "#fff" : (map.accent_color || "var(--orange)"), 
                                  display: "flex", alignItems: "center", justifyContent: "center", 
                                  fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, 
                                  background: isDone ? "#10b981" : "var(--bg)",
                                  transition: "all 0.2s"
                                }}>
                                  {isDone ? <CheckCircle2 size={14} /> : step.num}
                                </div>
                                {j !== (map.steps as any[]).length - 1 && <div style={{ width: 1, flex: 1, background: isDone ? "#10b981" : "var(--border)", opacity: isDone ? 0.4 : 1, minHeight: 20 }} />}
                              </div>
                              <div style={{ paddingBottom: j !== (map.steps as any[]).length - 1 ? 16 : 0, paddingTop: 2 }}>
                                <h4 style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 4, textDecoration: isDone ? "line-through" : "none", color: isDone ? "var(--muted)" : "var(--text)" }}>{step.name}</h4>
                                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{step.detail}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                        <Link 
                          href={map.link || `/roadmaps/${map.id}`} 
                          target={map.link?.startsWith('http') ? "_blank" : undefined}
                          className="btn-primary" 
                          style={{ 
                            width: "100%", justifyContent: "center", 
                            background: percent === 100 ? "#10b981" : (map.accent_color || "var(--orange)"),
                            boxShadow: percent === 100 ? "0 0 20px rgba(16, 185, 129, 0.2)" : "none"
                          }}
                        >
                          {percent === 100 ? "Review Journey" : "Start this Path"}
                        </Link>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

