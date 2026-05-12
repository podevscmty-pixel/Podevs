"use client";
import Link from "next/link";
import { ExternalLink, Layout, Globe, Smartphone } from "lucide-react";
import * as React from "react";

import { supabase } from "@/lib/supabase";

const projectsFallback = [
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
    desc: "A centralized dashboard for students to track their learning progress, build portfolios, and earn certificates.",
    tags: ["React", "UI/UX", "Vercel"],
    link: "https://dashboard.podevs.org",
    type: "Dashboard",
    icon: <Layout size={18} />
  },
  {
    title: "EdTech Roadmap API",
    desc: "A high-performance API serving structured learning paths for thousands of students across multiple languages.",
    tags: ["Node.js", "APIs", "Cloud"],
    link: "https://api.podevs.org",
    type: "Backend",
    icon: <Globe size={18} />
  },
  {
    title: "Local Business Showcase",
    desc: "A high-performance landing page built for a local startup to showcase their services and team.",
    tags: ["Next.js", "Framer Motion"],
    link: "https://showcase-demo.podevs.org",
    type: "Client Work",
    icon: <Smartphone size={18} />
  }
];

export default function ProjectsPage() {
  const [projectList, setProjectList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;

        if (data && data.length > 0) {
          setProjectList(data);
        } else {
          setProjectList(projectsFallback);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjectList(projectsFallback);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section className="py-12 md:py-20">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">Showcase</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 20 }}>Our <span style={{ color: "var(--orange)" }}>Works</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540 }}>Websites we've built, demo projects, and high-impact student work.</p>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
              <div className="animate-spin" style={{ width: 30, height: 30, border: "3px solid var(--border)", borderTopColor: "var(--orange)", borderRadius: "50%" }} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectList.map((p) => (
                <div key={p.title} className="card p-8 md:p-10 flex flex-col gap-5 h-full">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,138,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
                      {p.icon || <Layout size={18} />}
                    </div>
                    <span className="tag">{p.type || p.category}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 12 }}>{p.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 20 }}>{p.desc || p.description}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                      {p.tags?.map((t: string) => (
                        <span key={t} style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: 6, background: "var(--border)", color: "var(--muted)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", textDecoration: "none" }}>View Work <ExternalLink size={14} /></a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", textAlign: "center" }}>
          <div className="card-static p-10 md:p-16">
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 14 }}>Have a Project in Mind?</h2>
            <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: "1.05rem", maxWidth: 400, margin: "0 auto 28px" }}>We help students and startups bring their digital ideas to life.</p>
            <Link href="/services" className="btn-primary">View Our Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
