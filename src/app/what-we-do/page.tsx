"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Layout, Database, Server, Terminal, PenTool, BookOpen, MessageCircle, Users, Smartphone, Heart, Target, Eye, Book } from "lucide-react";
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

const resources = [
  { icon: <Code size={20} />, title: "YouTube Tutorials", desc: "Hands-on project builds and tech deep-dives.", link: "#", color: "#FF0000" },
  { icon: <BookOpen size={20} />, title: "Medium Blogs", desc: "Technical articles and community success stories.", link: "#", color: "#00ab6c" },
  { icon: <MessageCircle size={20} />, title: "PODEVS Podcast", desc: "Interviews with builders and industry experts.", link: "#", color: "var(--orange)" },
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

export default function WhatWeDoPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* WHO WE ARE & MISSION SECTION */}
      <section style={{ padding: "80px 0 100px", position: "relative" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Reveal>
              <span className="section-label" style={{ margin: "0 auto 20px" }}>Who We Are</span>
              <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>About <span style={{ color: "var(--orange)" }}>PODEVS</span></h1>
              <p style={{ color: "var(--muted)", fontSize: "1.2rem", lineHeight: 1.6, maxWidth: 700, margin: "0 auto" }}>
                A student-first EdTech community built on the belief that education should be accessible, joyful, and empowering.
              </p>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            <Reveal delay={0.1}>
              <div className="card" style={{ padding: "40px", height: "100%" }}>
                <Target className="text-orange-500 mb-6" size={32} style={{ color: "var(--orange)", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Our Mission</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  To democratize tech education for students — offering free workshops, community events, and affordable services so every learner can build and launch their ideas regardless of background or budget.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card" style={{ padding: "40px", height: "100%" }}>
                <Eye className="text-orange-500 mb-6" size={32} style={{ color: "var(--orange)", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Our Vision</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  A world where every student is a creator — where the next generation of builders, designers, and founders get their start through community, not just classrooms.
                </p>
              </div>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 24 }}>
            <Reveal delay={0.3}>
              <div className="card-static" style={{ padding: "40px", height: "100%" }}>
                <Book className="text-white mb-6" size={32} style={{ color: "#fff", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16, color: "#fff" }}>Our Story</h3>
                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                  PODEVS started from a simple frustration: great tech education was either too expensive or too boring. We built the community we wished existed — student-run, community-powered, free to join.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="card" style={{ padding: "40px", height: "100%" }}>
                <Heart className="text-orange-500 mb-6" size={32} style={{ color: "var(--orange)", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Our Values</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  Openness. Warmth. Ambition. We believe learning is a community sport. Every member matters. Every idea deserves a chance. The Smile of Education is not just a tagline — it's our promise.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "var(--border)" }} />
      </div>

      {/* ROADMAPS SECTION */}
      <section style={{ padding: "100px 0 80px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Reveal>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: 16 }}>Choose Your Path</h2>
              <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto" }}>Technical roadmaps designed to take you from beginner to professional.</p>
            </Reveal>
          </div>
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

      {/* RESOURCES SECTION */}
      <section style={{ padding: "0 0 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 64 }} />
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>Explore More Content</h2>
            <p style={{ color: "var(--muted)" }}>Beyond roadmaps, we produce content across all major platforms.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: r.color }}>{r.icon}</div>
                  <h3 style={{ fontWeight: 700 }}>{r.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>{r.desc}</p>
                  <a href={r.link} className="btn-outline" style={{ fontSize: "0.8rem", padding: "8px 20px" }}>Explore Now</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
