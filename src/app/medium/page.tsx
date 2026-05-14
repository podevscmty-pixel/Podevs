"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

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
  const [articles, setArticles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchArticles() {
      try {
        const { data } = await supabase
          .from('medium_articles')
          .select('*')
          .order('published_at', { ascending: false });
        if (data) setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

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
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse" style={{ height: 120, background: "var(--bg2)", borderRadius: 12 }} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No articles found.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {articles.map((article, i) => (
                <Reveal key={article.id} delay={i * 0.1}>
                  <Link 
                    href={article.external_link || `/medium/${article.id}`} 
                    target={article.external_link?.startsWith('http') ? "_blank" : undefined}
                    className="group" 
                    style={{ 
                      display: "block", 
                      textDecoration: "none", 
                      color: "inherit",
                      borderBottom: i !== articles.length - 1 ? "1px solid var(--border)" : "none", 
                      paddingBottom: i !== articles.length - 1 ? 40 : 0,
                      marginBottom: 40
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--subtle)" }}>
                        {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
                      </span>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--subtle)" }} />
                      <span style={{ fontSize: "0.85rem", color: "var(--subtle)" }}>{article.read_time}</span>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--subtle)" }} />
                      <span className="tag" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>{article.tag}</span>
                    </div>
                    
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.3, marginBottom: 12, fontFamily: "serif" }} className="group-hover:text-[var(--orange)] transition-colors">
                      {article.title}
                    </h2>
                    
                    <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 20 }}>
                      {article.excerpt}
                    </p>
                    
                    <div style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }} className="group-hover:text-[var(--orange)] transition-colors">
                      Read on Medium <ArrowRight size={14} />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
