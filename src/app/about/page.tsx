"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="fade-up" ref={(el) => { if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); }} style={{ transitionDelay: `${delay}s`, height: "100%" }}>
      {children}
    </div>
  );
}

import * as React from "react";

import { Target, Eye, BookText, Heart } from "lucide-react";

const cards = [
  { icon: <Target size={24} />, title: "Our Mission", body: "To democratize tech education for students — offering free workshops, community events, and affordable services so every learner can build and launch their ideas regardless of background or budget." },
  { icon: <Eye size={24} />, title: "Our Vision", body: "A world where every student is a creator — where the next generation of builders, designers, and founders get their start through community, not just classrooms." },
  { icon: <BookText size={24} />, title: "Our Story", body: "PODEVS started from a simple frustration: great tech education was either too expensive or too boring. We built the community we wished existed — student-run, community-powered, free to join." },
  { icon: <Heart size={24} />, title: "Our Values", body: "Openness. Warmth. Ambition. We believe learning is a community sport. Every member matters. Every idea deserves a chance. The Smile of Education is not just a tagline — it's our promise." },
];

const stats = [
  { num: "2K+", label: "Community Members" },
  { num: "50+", label: "Free Workshops" },
  { num: "20+", label: "Events Organized" },
  { num: "5+", label: "Hackathons Hosted" },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Hero */}
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">Who We Are</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>About <span style={{ color: "var(--orange)" }}>PODEVS</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 540 }}>A student-first EdTech community built on the belief that education should be accessible, joyful, and empowering.</p>
        </div>
      </section>

      {/* 2×2 grid */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {cards.map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.08}>
                <SpotlightCard style={{ padding: "44px 36px", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: "rgba(255, 138, 0, 0.08)", 
                    border: "1px solid rgba(255, 138, 0, 0.2)",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: "var(--orange)",
                    marginBottom: 24,
                    boxShadow: "0 0 15px rgba(255, 138, 0, 0.1)"
                  }}>
                    {c.icon}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 14, color: "#fff" }}>{c.title}</h3>
                  <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "1rem" }}>{c.body}</p>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)", padding: "0 0 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 2 }}>
            {stats.map((s) => (
              <div key={s.num} style={{ padding: "40px 24px", textAlign: "center", borderRight: "1px solid var(--border)" }}>
                <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--orange)" }}>{s.num}</p>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 6 }}>{s.label}</p>
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
            <Link href="/join" className="btn-primary">Join PODEVS <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
