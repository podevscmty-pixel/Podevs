"use client";
import Link from "next/link";
import { ExternalLink, Code, Layout, Globe, Smartphone } from "lucide-react";
import * as React from "react";

const projects = [
  {
    title: "PODEVS Platform",
    desc: "The very platform you are browsing. Built with Next.js, Framer Motion, and Tailwind CSS for a premium student experience.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://podevs.org",
    type: "Platform",
    icon: <Globe size={18} />
  },
  {
    title: "Student Dashboard",
    desc: "A centralized dashboard for students to track their course progress, event registrations, and certificates.",
    tags: ["React", "Supabase", "UI/UX"],
    link: "#",
    type: "Dashboard",
    icon: <Layout size={18} />
  },
  {
    title: "Community Discord Bot",
    desc: "Automation bot for managing thousands of students, roles, and automated event notifications.",
    tags: ["Node.js", "Discord.js", "APIs"],
    link: "#",
    type: "Tool",
    icon: <Code size={18} />
  },
  {
    title: "Local Business Showcase",
    desc: "A high-performance landing page built for a local startup to showcase their services and team.",
    tags: ["Next.js", "Framer Motion"],
    link: "#",
    type: "Client Work",
    icon: <Smartphone size={18} />
  }
];

export default function ProjectsPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "80px 0 64px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">Showcase</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 20 }}>Our <span style={{ color: "var(--orange)" }}>Projects</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540 }}>Websites we've built, demo projects, and high-impact student work.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {projects.map((p) => (
              <div key={p.title} className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,138,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
                    {p.icon}
                  </div>
                  <span className="tag">{p.type}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: 6, background: "var(--border)", color: "var(--muted)" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
                  <a href={p.link} className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}>View Project <ExternalLink size={14} /></a>
                  <a href="#" className="btn-outline" style={{ padding: "10px" }}><Code size={18} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", textAlign: "center" }}>
          <div className="card-static" style={{ padding: "64px 48px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 14 }}>Have a Project in Mind?</h2>
            <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: "1.05rem", maxWidth: 400, margin: "0 auto 28px" }}>We help students and startups bring their digital ideas to life.</p>
            <Link href="/services" className="btn-primary">View Our Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
