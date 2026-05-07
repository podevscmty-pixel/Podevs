"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as React from "react";

const featured = {
  tags: ["Featured", "Announcement"],
  date: "MAY 01, 2025",
  title: "PODEVS Launches BuildFast Hackathon — Registrations Open!",
  body: "We're thrilled to announce our biggest community event yet. BuildFast is a 24-hour hackathon open to all students — solo or in teams of up to 4. Win prizes, get mentorship, and most importantly: ship something real.",
};

const posts = [
  { date: "APR 22, 2025", tag: "Resource", title: "The 30-Day Web Dev Challenge — Week by Week Plan", excerpt: "A structured 30-day roadmap to go from zero to deployed portfolio. Includes daily tasks, tools, and links to our YouTube videos." },
  { date: "APR 10, 2025", tag: "Opportunity", title: "5 Open Source Projects Hiring Student Contributors", excerpt: "Great news for freshers — these beginner-friendly open source projects are actively looking for contributors and offering mentorship." },
  { date: "MAR 30, 2025", tag: "Workshop Recap", title: "Git Masterclass Recap — What 85 Students Learned", excerpt: "Summary of our biggest workshop yet — key takeaways, resources shared, and what participants said about the session." },
  { date: "MAR 15, 2025", tag: "Community", title: "Introducing PODEVS Services — Websites Starting ₹999", excerpt: "We now offer affordable web development services for students and small teams. Portfolio sites, club pages, project showcases — we've got you." },
  { date: "FEB 28, 2025", tag: "Tech", title: "Why Every CS Student Should Learn Deployment in 2025", excerpt: "Writing code is half the battle. Here's why deploying your work matters more than ever — and how to start today for free." },
  { date: "FEB 10, 2025", tag: "Internship", title: "Top 10 Internship Platforms for Tech Students in India", excerpt: "A curated list of the best platforms to find internships — with tips on standing out as a first-year student with no prior experience." },
];

export default function BlogPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">Updates & Blog</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>Community <span style={{ color: "var(--orange)" }}>Updates</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 520 }}>Announcements, learning resources, opportunities, and stories from the PODEVS community.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          {/* Featured */}
          <div className="card" style={{ padding: "36px 32px", marginBottom: 32, borderColor: "rgba(255,138,0,0.2)" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {featured.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--subtle)", fontFamily: "monospace", marginBottom: 10 }}>{featured.date}</p>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.25, marginBottom: 14 }}>{featured.title}</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 22, maxWidth: 640, fontSize: "0.9rem" }}>{featured.body}</p>
            <Link href="/events" className="btn-primary" style={{ fontSize: "0.85rem", padding: "9px 20px" }}>View Event Details <ArrowRight size={14} /></Link>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {posts.map((p) => (
              <div key={p.title} className="card" style={{ padding: "24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--subtle)", fontFamily: "monospace", letterSpacing: "0.06em" }}>{p.date}</p>
                  <span className="tag" style={{ fontSize: 10 }}>{p.tag}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.35, flex: 1 }}>{p.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.65 }}>{p.excerpt}</p>
                <Link href="#" style={{ color: "var(--orange)", fontSize: "0.82rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  Read More <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
