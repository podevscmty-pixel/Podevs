"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";

const articles = [
  { date: "APR 22, 2025", readTime: "5 min read", tag: "Resource", title: "The 30-Day Web Dev Challenge — Week by Week Plan", excerpt: "A structured 30-day roadmap to go from zero to deployed portfolio. Includes daily tasks, tools, and links to our YouTube videos." },
  { date: "APR 10, 2025", readTime: "4 min read", tag: "Opportunity", title: "5 Open Source Projects Hiring Student Contributors", excerpt: "Great news for freshers — these beginner-friendly open source projects are actively looking for contributors and offering mentorship." },
  { date: "MAR 30, 2025", readTime: "7 min read", tag: "Workshop Recap", title: "Git Masterclass Recap — What 85 Students Learned", excerpt: "Summary of our biggest workshop yet — key takeaways, resources shared, and what participants said about the session." },
  { date: "MAR 15, 2025", readTime: "3 min read", tag: "Community", title: "Introducing PODEVS Services — Websites Starting ₹999", excerpt: "We now offer affordable web development services for students and small teams. Portfolio sites, club pages, project showcases — we've got you." },
  { date: "FEB 28, 2025", readTime: "6 min read", tag: "Tech", title: "Why Every CS Student Should Learn Deployment in 2025", excerpt: "Writing code is half the battle. Here's why deploying your work matters more than ever — and how to start today for free." },
  { date: "FEB 10, 2025", readTime: "8 min read", tag: "Internship", title: "Top 10 Internship Platforms for Tech Students in India", excerpt: "A curated list of the best platforms to find internships — with tips on standing out as a first-year student with no prior experience." },
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

export default function MediumPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 14px", borderRadius: 100, background: "rgba(0, 171, 108, 0.08)", border: "1px solid rgba(0, 171, 108, 0.2)" }}>
              <BookOpen size={14} color="#00ab6c" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00ab6c" }}>Medium Publications</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20, fontFamily: "serif" }}>
              Stories from the <span style={{ color: "var(--orange)", fontFamily: "var(--font-outfit), sans-serif" }}>PODEVS</span> Community
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 32 }}>
              Dive deep into technical tutorials, community success stories, and our vision for the future of student education. Read our official publications on Medium.
            </p>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ backgroundColor: "#00ab6c", color: "#fff" }}>
              Follow us on Medium <ExternalLink size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {articles.map((article, i) => (
              <Reveal key={article.title} delay={i * 0.1}>
                <div style={{ borderBottom: i !== articles.length - 1 ? "1px solid var(--border)" : "none", paddingBottom: i !== articles.length - 1 ? 40 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--subtle)" }}>{article.date}</span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--subtle)" }} />
                    <span style={{ fontSize: "0.85rem", color: "var(--subtle)" }}>{article.readTime}</span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--subtle)" }} />
                    <span className="tag" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>{article.tag}</span>
                  </div>
                  
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.3, marginBottom: 12, fontFamily: "serif" }}>
                    <a href="https://medium.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", textDecoration: "none" }} className="hover:text-[var(--orange)] transition-colors">
                      {article.title}
                    </a>
                  </h2>
                  
                  <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 20 }}>
                    {article.excerpt}
                  </p>
                  
                  <a href="https://medium.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }} className="hover:text-[var(--orange)] transition-colors">
                    Read on Medium <ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
