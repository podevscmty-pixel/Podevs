"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Layout, Database, Server, Terminal, PenTool, BookOpen, MessageCircle, Users, Smartphone, Heart, Target, Eye, Book, Zap, Map } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Link from "next/link";

const resources = [
  { icon: <Map size={20} />, title: "Tech Roadmaps", desc: "Structured paths from beginner to pro.", link: "/roadmaps", color: "#3b82f6" },
  { icon: <Code size={20} />, title: "YouTube Tutorials", desc: "Hands-on project builds and tech deep-dives.", link: "/media", color: "#FF0000" },
  { icon: <BookOpen size={20} />, title: "Medium Blogs", desc: "Technical articles and community success stories.", link: "/medium", color: "#00ab6c" },
  { icon: <MessageCircle size={20} />, title: "PODEVS Podcast", desc: "Interviews with builders and industry experts.", link: "/podcast", color: "var(--orange)" },
];

const stats = [
  { num: "2K+", label: "Community Members" },
  { num: "50+", label: "Free Workshops" },
  { num: "20+", label: "Events Organized" },
  { num: "5+", label: "Hackathons Hosted" },
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

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* WHO WE ARE & MISSION SECTION */}
      <section className="py-16 md:py-24 relative">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0.1}>
              <div className="card p-8 md:p-10 h-full">
                <Target className="text-orange-500 mb-6" size={32} style={{ color: "var(--orange)", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Our Mission</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  To democratize tech education for students — offering free workshops, community events, and affordable services so every learner can build and launch their ideas regardless of background or budget.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card p-8 md:p-10 h-full">
                <Eye className="text-orange-500 mb-6" size={32} style={{ color: "var(--orange)", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Our Vision</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  A world where every student is a creator — where the next generation of builders, designers, and founders get their start through community, not just classrooms.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Reveal delay={0.3}>
              <div className="card p-8 md:p-10 h-full">
                <Book className="mb-6" size={32} style={{ color: "var(--orange)", marginBottom: 24 }} />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Our Story</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  PODEVS started from a simple frustration: great tech education was either too expensive or too boring. We built the community we wished existed — student-run, community-powered, free to join.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="card p-8 md:p-10 h-full">
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

      {/* CORE VALUES SECTION */}
      <section className="py-20 md:py-32 section-glow">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Reveal>
              <span className="section-label" style={{ margin: "0 auto 16px" }}>Our DNA</span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16 }}>The Core <span style={{ color: "var(--orange)" }}>Values</span></h2>
              <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto", fontSize: "1.1rem" }}>The principles that drive every workshop, every line of code, and every community event we host.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={24} />, title: "Accessibility", desc: "High-quality tech education should be a right, not a luxury. We keep our core learning 100% free." },
              { icon: <Users size={24} />, title: "Community", desc: "We are stronger together. Our platform is built on peer-to-peer support and collaborative growth." },
              { icon: <Target size={24} />, title: "Ambition", desc: "We don't just teach tutorials; we build real-world works. We push students to launch their ideas." },
              { icon: <Eye size={24} />, title: "Openness", desc: "Transparency and open-source thinking are at our heart. We share our knowledge and our process." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <SpotlightCard className="p-8 h-full flex flex-col gap-5 border border-[var(--border)] rounded-[20px]">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,138,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{v.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>{v.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 2 }}>
            {stats.map((s) => (
              <div key={s.num} style={{ padding: "60px 24px", textAlign: "center", borderRight: "1px solid var(--border)" }}>
                <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--orange)" }}>{s.num}</p>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginTop: 8, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="card-static" style={{ padding: "64px 48px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>Be Part of the Story</h2>
            <p style={{ color: "var(--muted)", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>Every great community is built by people who show up. Join PODEVS and help shape the future of student-led tech.</p>
            <Link href="https://linkedin.com/company/podevs" target="_blank" className="btn-primary" style={{ justifyContent: "center" }}>Join PODEVS <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section className="pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>Explore More Content</h2>
            <p style={{ color: "var(--muted)" }}>Beyond roadmaps, we produce content across all major platforms.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <Link href={r.link} className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center", textDecoration: "none", height: "100%" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: r.color }}>{r.icon}</div>
                  <h3 style={{ fontWeight: 700, color: "var(--text)" }}>{r.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>{r.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
