"use client";

import React, { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Info, ExternalLink, Play } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface RoadmapStep {
  num: number;
  name: string;
  detail: string;
  resources?: { name: string; link: string; type: "video" | "article" }[];
}

export default function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [roadmap, setRoadmap] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [activeNode, setActiveNode] = React.useState<number | null>(null);

  React.useEffect(() => {
    async function fetchRoadmap() {
      try {
        const { data } = await supabase
          .from('roadmaps')
          .select('*')
          .eq('id', id)
          .single();
        if (data) setRoadmap(data);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmap();

    const savedProgress = localStorage.getItem("podevs_roadmap_progress");
    if (savedProgress) {
      try {
        const allProgress = JSON.parse(savedProgress);
        setCompletedSteps(allProgress[id] || []);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, [id]);

  const toggleStep = (stepNum: number) => {
    const newSteps = completedSteps.includes(stepNum)
      ? completedSteps.filter(s => s !== stepNum)
      : [...completedSteps, stepNum];
    
    setCompletedSteps(newSteps);
    
    const savedProgress = localStorage.getItem("podevs_roadmap_progress");
    const allProgress = savedProgress ? JSON.parse(savedProgress) : {};
    allProgress[id] = newSteps;
    localStorage.setItem("podevs_roadmap_progress", JSON.stringify(allProgress));
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="animate-spin" style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTopColor: "var(--orange)", borderRadius: "50%" }} />
    </div>
  );

  if (!roadmap) return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Roadmap Not Found</h1>
      <Link href="/roadmaps" className="btn-primary">Back to Roadmaps</Link>
    </div>
  );

  const steps = (roadmap.steps || []) as RoadmapStep[];
  const progressPercent = steps.length > 0 ? Math.round((completedSteps.length / steps.length) * 100) : 0;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Sticky Header */}
      <header style={{ 
        position: "sticky", top: 0, zIndex: 100, 
        background: "rgba(var(--bg-rgb), 0.8)", 
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "16px 0"
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/roadmaps" style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }} className="hover:text-[var(--text)]">
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
            </Link>
            <div style={{ width: 1, height: 24, background: "var(--border)" }} />
            <h1 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{roadmap.title}</h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }} className="hidden sm:block">
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>PROGRESS</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: progressPercent === 100 ? "#10b981" : "var(--orange)" }}>{progressPercent}%</div>
            </div>
            <div style={{ width: 100, height: 6, background: "var(--border)", borderRadius: 10, overflow: "hidden" }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                style={{ height: "100%", background: progressPercent === 100 ? "#10b981" : (roadmap.accent_color || "var(--orange)") }} 
              />
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 120px" }}>
        {/* Intro */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span className="tag" style={{ marginBottom: 16 }}>The Journey Begins</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: 20 }}>Mastering {roadmap.title}</h2>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>{roadmap.description}</p>
        </div>

        {/* Roadmap Path */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Central Vertical Line */}
          <div style={{ 
            position: "absolute", top: 0, bottom: 0, left: "50%", 
            width: 4, transform: "translateX(-50%)", 
            background: "var(--border)", zIndex: 0 
          }} className="sm:left-[50%] left-6">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              style={{ width: "100%", background: roadmap.accent_color || "var(--orange)", transition: "height 0.5s ease-out" }}
            />
          </div>

          {/* Nodes */}
          <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", gap: 64 }}>
            {steps.map((step, i) => {
              const isDone = completedSteps.includes(step.num);
              const isActive = activeNode === step.num;
              const isLeft = i % 2 === 0;

              return (
                <div key={step.num} className="flex flex-col sm:flex-row items-center sm:justify-center w-full relative">
                  {/* The Node Circle on the Line */}
                  <div 
                    onClick={() => toggleStep(step.num)}
                    style={{ 
                      position: "absolute", top: 20, 
                      width: 24, height: 24, borderRadius: "50%", 
                      background: isDone ? "#10b981" : "var(--bg)", 
                      border: `4px solid ${isDone ? "#10b981" : "var(--border)"}`,
                      zIndex: 10, cursor: "pointer",
                      boxShadow: isDone ? "0 0 15px rgba(16, 185, 129, 0.4)" : "none",
                      transition: "all 0.3s"
                    }}
                    className="sm:left-[50%] left-6 -translate-x-1/2"
                  >
                    {isDone && <CheckCircle2 size={12} color="#fff" style={{ position: "absolute", top: 2, left: 2 }} />}
                  </div>

                  {/* The Content Card */}
                  <div style={{ width: "100%", display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start" }} className="sm:w-full">
                    <motion.div 
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="sm:w-[calc(50%-40px)] w-[calc(100%-64px)] ml-auto sm:ml-0 sm:mr-0"
                      style={{ marginRight: isLeft ? "0" : "auto", marginLeft: isLeft ? "auto" : "0" }}
                    >
                      <SpotlightCard 
                        className={`p-6 md:p-8 ${isDone ? 'opacity-80' : ''}`}
                        style={{ cursor: "pointer", border: isActive ? `1px solid ${roadmap.accent_color || "var(--orange)"}` : "1px solid var(--border)" }}
                        onClick={() => setActiveNode(isActive ? null : step.num)}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: roadmap.accent_color || "var(--orange)" }}>STEP {step.num}</span>
                          {isDone && <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700 }}>COMPLETED</span>}
                        </div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 12 }}>{step.name}</h3>
                        <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: isActive ? 24 : 0 }}>
                          {step.detail}
                        </p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              style={{ overflow: "hidden" }}
                            >
                              <div style={{ paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 12 }}>
                                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>LEARNING RESOURCES</h4>
                                {step.resources && step.resources.length > 0 ? step.resources.map((res, j) => (
                                  <a 
                                    key={j} href={res.link} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--bg2)", borderRadius: 10, fontSize: "0.85rem", textDecoration: "none" }}
                                    className="hover:bg-[rgba(255,138,0,0.05)] transition-colors"
                                  >
                                    {res.type === "video" ? <Play size={14} color="var(--orange)" /> : <Info size={14} color="var(--orange)" />}
                                    <span style={{ flex: 1, fontWeight: 500 }}>{res.name}</span>
                                    <ExternalLink size={12} color="var(--muted)" />
                                  </a>
                                )) : (
                                  <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Resources coming soon!</p>
                                )}
                                
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleStep(step.num); }}
                                  className="btn-primary"
                                  style={{ 
                                    marginTop: 12, width: "100%", justifyContent: "center",
                                    background: isDone ? "var(--border)" : (roadmap.accent_color || "var(--orange)"),
                                    color: isDone ? "var(--muted)" : "#fff"
                                  }}
                                >
                                  {isDone ? "Mark as Incomplete" : "Mark as Completed"}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {!isActive && (
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12, color: "var(--orange)", fontSize: "0.8rem", fontWeight: 600 }}>
                            View Resources <ChevronRight size={14} />
                          </div>
                        )}
                      </SpotlightCard>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Finish */}
        <div style={{ marginTop: 120, textAlign: "center" }}>
          <div className="card-static p-10 md:p-16">
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 14 }}>
              {progressPercent === 100 ? "Congratulations! 🎉" : "Ready to continue?"}
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: "1.05rem", maxWidth: 400, margin: "0 auto 28px" }}>
              {progressPercent === 100 
                ? "You've completed the entire path. Time to build something amazing!" 
                : "Keep going, every step takes you closer to your goal."}
            </p>
            <Link href="/projects" className="btn-primary">View Project Ideas</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
