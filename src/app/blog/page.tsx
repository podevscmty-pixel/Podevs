"use client";
import Link from "next/link";
import { ArrowRight, Mail, Bell, Calendar, Sparkles } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { supabase } from "@/lib/supabase";

const Reveal = ({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function NewsletterPage() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const [issues, setIssues] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIssues() {
      try {
        const { data } = await supabase
          .from('newsletter_issues')
          .select('*')
          .order('published_at', { ascending: false });
        if (data) setIssues(data);
      } catch (err) {
        console.error("Error fetching newsletter issues:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  const latestIssue = issues[0];
  const pastIssues = issues.slice(1);

  return (
    <div style={{ paddingTop: "var(--nav-h)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER SECTION (Minimal) */}
      <section style={{ padding: "60px 0 40px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,138,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
                <Mail size={20} />
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>The <span style={{ color: "var(--orange)" }}>Newsletter</span></h1>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: 600, lineHeight: 1.6 }}>
              Weekly insights, community updates, and curated resources for student developers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED LATEST ISSUE */}
      {latestIssue && (
        <section style={{ padding: "0 0 60px" }}>
          <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
            <Reveal delay={0.1}>
              <div className="card group cursor-pointer" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid var(--orange)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "40px md:padding: 56px", flex: 1 }} className="p-8 md:p-14">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="tag" style={{ background: "var(--orange)", color: "#fff", border: "none" }}>LATEST ISSUE</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={14} /> {new Date(latestIssue.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: "var(--text)" }} className="group-hover:text-[var(--orange)] transition-colors">
                      {latestIssue.title}
                    </h2>
                    <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 800 }}>
                      {latestIssue.excerpt}
                    </p>
                  </div>
                  
                  <div style={{ marginTop: 12 }}>
                    <Link href={latestIssue.read_link} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.95rem", fontWeight: 700, color: "var(--orange)" }} className="hover:gap-3 transition-all">
                      Read the full issue <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* PAST ISSUES GRID */}
      <section style={{ padding: "0 0 80px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>Past Editions</h3>
          </Reveal>
          
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse" style={{ height: 200, background: "var(--bg2)" }} />
              ))}
            </div>
          ) : pastIssues.length === 0 && !latestIssue ? (
            <p style={{ color: "var(--muted)" }}>No issues published yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {pastIssues.map((issue, i) => (
                <Reveal key={issue.id} delay={0.1 + (i * 0.05)}>
                  <a href={issue.read_link} target="_blank" rel="noopener noreferrer" className="card group" style={{ display: "block", padding: "32px", height: "100%", textDecoration: "none", transition: "all 0.3s ease" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", background: "rgba(255,138,0,0.1)", padding: "4px 10px", borderRadius: 6 }}>{issue.tag}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--subtle)", fontWeight: 600 }}>
                        {new Date(issue.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
                      </span>
                    </div>
                    
                    <h4 style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.4, marginBottom: 12, color: "var(--text)" }} className="group-hover:text-[var(--orange)] transition-colors">
                      {issue.title}
                    </h4>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{issue.excerpt}</p>
                    
                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 700, color: "var(--orange)" }}>
                      Read Issue <ArrowRight size={14} />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
          
          {pastIssues.length > 6 && (
            <Reveal delay={0.3}>
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button className="btn-outline" style={{ borderRadius: 100 }}>Load More Issues</button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* MASSIVE CTA / SUBSCRIBE BOX AT BOTTOM */}
      <section style={{ padding: "80px 24px", marginTop: "auto", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Reveal y={30}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: 20, background: "rgba(255,138,0,0.1)", color: "var(--orange)", marginBottom: 24 }}>
              <Sparkles size={32} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>Never Miss an <span style={{ color: "var(--orange)" }}>Update</span></h2>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: 500, margin: "0 auto 40px" }}>
              Join 2,000+ driven students getting actionable advice straight to their inbox every Tuesday. No spam, just value.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 460, margin: "0 auto" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <Mail size={20} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "var(--subtle)" }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best email..." 
                  required
                  style={{ width: "100%", padding: "20px 20px 20px 52px", borderRadius: 16, background: "var(--card)", border: "2px solid var(--border)", color: "var(--text)", fontSize: "1.05rem", outline: "none", transition: "all 0.2s ease" }}
                  className="focus:border-[var(--orange)] shadow-sm"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: "20px", borderRadius: 16, fontSize: "1.05rem", width: "100%", justifyContent: "center" }}>
                {subscribed ? "✓ You're on the list!" : "Subscribe Now"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
