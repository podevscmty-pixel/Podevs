"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Layout, Database, Server, Terminal, PenTool } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Link from "next/link";

const roadmaps = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: <Layout size={24} />,
    color: "rgba(59, 130, 246, 0.1)",
    accent: "#3b82f6",
    desc: "Master the art of building beautiful, interactive user interfaces.",
    steps: [
      { num: 1, name: "HTML & CSS", detail: "Semantics, Flexbox, Grid, Responsiveness." },
      { num: 2, name: "JavaScript Fundamentals", detail: "ES6+, DOM Manipulation, Async/Await." },
      { num: 3, name: "React.js", detail: "Hooks, Context, State Management." },
      { num: 4, name: "Next.js & Tailwind", detail: "App Router, SSR, Utility-first CSS." },
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: <Server size={24} />,
    color: "rgba(16, 185, 129, 0.1)",
    accent: "#10b981",
    desc: "Build scalable APIs, manage databases, and handle server logic.",
    steps: [
      { num: 1, name: "Node.js & Express", detail: "REST APIs, Middleware, Routing." },
      { num: 2, name: "Databases (SQL & NoSQL)", detail: "PostgreSQL, MongoDB, ORMs (Prisma)." },
      { num: 3, name: "Authentication", detail: "JWT, OAuth, Sessions." },
      { num: 4, name: "Deployment & DevOps", detail: "Docker, AWS, CI/CD pipelines." },
    ]
  },
  {
    id: "design",
    title: "UI/UX Designer",
    icon: <PenTool size={24} />,
    color: "rgba(236, 72, 153, 0.1)",
    accent: "#ec4899",
    desc: "Design user-centric experiences that look great and convert.",
    steps: [
      { num: 1, name: "Design Fundamentals", detail: "Color theory, Typography, Spacing." },
      { num: 2, name: "Figma Mastery", detail: "Components, Auto Layout, Variables." },
      { num: 3, name: "UX Research", detail: "User personas, wireframing, testing." },
      { num: 4, name: "Prototyping", detail: "Micro-interactions, high-fidelity mockups." },
    ]
  }
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

export default function RoadmapsPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Header Section */}
      <section style={{ padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label" style={{ margin: "0 auto 20px" }}>Curated Paths</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 20 }}>
              Stop guessing. <br /> <span style={{ color: "var(--orange)" }}>Start building.</span>
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
              Our step-by-step roadmaps take you from absolute beginner to job-ready developer. Follow the path that fits your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roadmaps Grid */}
      <section style={{ padding: "0 0 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {roadmaps.map((map, i) => (
              <Reveal key={map.id} delay={i * 0.1}>
                <SpotlightCard style={{ padding: 40, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: map.color, color: map.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {map.icon}
                    </div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>{map.title}</h2>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 32 }}>{map.desc}</p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                    {map.steps.map((step, j) => (
                      <div key={step.num} style={{ display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${map.accent}`, color: map.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, background: "var(--bg)" }}>
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
                    <Link href="/join" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      Start this Path
                    </Link>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or Next Steps CTA */}
      <section style={{ padding: "0 0 120px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <Reveal>
            <div style={{ padding: "60px 40px", background: "var(--bg2)", borderRadius: 24, border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>Ready to level up?</h2>
              <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
                Join 2,000+ students who are actively learning and building projects every day.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                <Link href="/join" className="btn-primary" style={{ padding: "12px 32px" }}>Join Community Free</Link>
                <Link href="/events" className="btn-secondary" style={{ padding: "12px 32px" }}>View Events</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
