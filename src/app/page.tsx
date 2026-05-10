"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Code, Calendar, BookOpen, TrendingUp, Zap, Target, Award, Star, Rocket, Briefcase } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Marquee } from "@/components/marquee";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = "", ...props }: React.ComponentProps<typeof motion.section>) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className={className} {...props}>
      {children}
    </motion.section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div variants={fadeUp} transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }} style={{ height: "100%" }}>{children}</motion.div>;
}

/* ── Data ──────────────────────────────────────── */
const stats = [
  { icon: <Users size={20} />, value: "2,000+", label: "Students" },
  { icon: <Code size={20} />, value: "150+", label: "Projects" },
  { icon: <Calendar size={20} />, value: "12+", label: "Events/Month" },
];

const pillars = [
  { icon: <BookOpen size={24} />, title: "Learn", body: "Free workshops, structured YouTube content, and curated roadmaps so every student can upskill — zero cost, zero barriers.", href: "/what-we-do", color: "rgba(255,138,0,0.1)" },
  { icon: <Users size={24} />, title: "Community", body: "Join hackathons, meetups, and events that connect you with peers, mentors, and real-world opportunities.", href: "/events", color: "rgba(255,194,71,0.1)" },
  { icon: <TrendingUp size={24} />, title: "Growth", body: "Affordable web services, deployment & hosting so you can launch your ideas and build a real portfolio.", href: "/services", color: "rgba(255,138,0,0.08)" },
];

const benefits = [
  { icon: <Zap size={20} />, title: "100% Free to Start", desc: "No paywalls. No hidden costs. Just pure learning." },
  { icon: <Target size={20} />, title: "Project-Based Learning", desc: "Build real projects, not just watch tutorials." },
  { icon: <Users size={20} />, title: "Peer Community", desc: "Collaborate with 2,000+ driven students." },
  { icon: <Award size={20} />, title: "Industry-Ready Skills", desc: "Learn what companies actually hire for." },
];

const testimonials = [
  { name: "Arjun R.", role: "CS Student, VIT", text: "PODEVS changed my perspective on learning. The workshops are practical and the community is incredibly supportive.", avatar: "AR" },
  { name: "Sneha M.", role: "Full-Stack Dev", text: "I went from zero coding experience to deploying my first app in 3 weeks. The roadmaps here are gold.", avatar: "SM" },
  { name: "Karthik S.", role: "Open Source Contributor", text: "The hackathons pushed me out of my comfort zone. I landed my first internship thanks to the portfolio I built here.", avatar: "KS" },
];

const events = [
  { day: "15", mo: "JUN", type: "Workshop", title: "Full-Stack Bootcamp: Next.js + Supabase", time: "2:00 PM IST", location: "Online", price: "Free" },
  { day: "22", mo: "JUN", type: "Hackathon", title: "BuildFast Hackathon — 24hr Sprint", time: "All Day", location: "Chennai", price: "₹99" },
  { day: "01", mo: "JUL", type: "Talk", title: "DevTalks: Open Source & Your Career Path", time: "6:00 PM IST", location: "Online", price: "Free" },
];

const videos = [
  { id: "v1", title: "Introduction to Web Development", views: "12K views · 2 weeks ago" },
  { id: "v2", title: "React Hooks Explained Simply", views: "8.4K views · 1 month ago" },
  { id: "v3", title: "Deploy Your First App on Vercel", views: "5.2K views · 2 months ago" },
];

/* ── Page ──────────────────────────────────────── */
export default function HomePage() {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const moveX = useTransform(springX, [-1000, 1000], [-40, 40]);
  const moveY = useTransform(springY, [-1000, 1000], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* HERO SECTION */}
      <section style={{ paddingTop: "calc(var(--nav-h) + 32px)", paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div className="hero-gradient" />
        
        {/* Animated Network Background - Dual Layer for Wave + Parallax */}
        <motion.div 
          style={{ 
            position: "absolute", 
            inset: -60, 
            zIndex: 0,
            pointerEvents: "none",
            mixBlendMode: theme === "dark" ? "screen" : "multiply",
          }}
          animate={{ 
            x: [0, 20, -20, 15, -15, 0],
            y: [0, -15, 15, -10, 10, 0],
            rotate: [0, 0.5, -0.5, 0.3, -0.3, 0],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <motion.img 
            key={theme}
            src={theme === "dark" ? "/images/hero-network.png" : "/images/white.png"}
            style={{ 
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 1,
              x: moveX,
              y: moveY,
              filter: theme === "dark" ? "brightness(1.5) contrast(1.2)" : "contrast(1.05)",
              mixBlendMode: theme === "dark" ? "color-dodge" : "multiply",
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: theme === "dark" ? [0.8, 1, 0.9, 1, 0.8] : [0.6, 0.8, 0.7, 0.8, 0.6]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", textAlign: "left", position: "relative", zIndex: 1 }}>
          <div className="max-w-[720px] lg:max-w-[800px]">
            <motion.div 
              style={{ 
                marginBottom: 28, 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8, 
                padding: "6px 14px", 
                borderRadius: 100, 
                background: "rgba(255, 138, 0, 0.08)", 
                border: "1px solid rgba(255, 138, 0, 0.2)",
                backdropFilter: "blur(10px)"
              }}
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", boxShadow: "0 0 8px var(--orange)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--orange)" }}>
                Student-First EdTech Platform
              </span>
            </motion.div>
            
            <motion.h1
              style={{ 
                fontSize: "clamp(3rem, 7vw, 5rem)", 
                fontWeight: 900, 
                lineHeight: 0.95, 
                letterSpacing: "-0.05em", 
                marginBottom: 32,
                color: theme === "dark" ? "#fff" : "#000"
              }}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Learn Skills.<br />Build Projects.<br />
              <span style={{ background: "linear-gradient(135deg, var(--orange), #FFC247)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 15px rgba(255, 138, 0, 0.15))" }}>
                Earn Confidence.
              </span>
            </motion.h1>
            <motion.p
              style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            >
              PODEVS is the community where students learn in-demand skills, build real projects, and grow into confident developers — completely free to start.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3.5 justify-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
              <Link href="/join" className="btn-primary">🎓 Join Community</Link>
              <Link href="/services" className="btn-outline">💼 Get a Website Built</Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6 md:gap-10 mt-8 pt-6 border-t border-[var(--border)]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            >
              {stats.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ color: "var(--orange)" }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{s.value}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* WHAT WE DO SECTION */}
      <Section style={{ padding: "var(--section-gap) 0" }} className="section-glow">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Reveal>
              <div 
                style={{ 
                  marginBottom: 20, 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 8, 
                  padding: "4px 12px", 
                  borderRadius: 100, 
                  background: "rgba(255, 138, 0, 0.05)", 
                  border: "1px solid rgba(255, 138, 0, 0.15)",
                  margin: "0 auto"
                }}
              >
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)" }} />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--orange)" }}>
                  What We Do
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 850, letterSpacing: "-0.03em", marginBottom: 16 }}>Everything You Need to Grow</h2></Reveal>
            <Reveal delay={0.1}><p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>Three core pillars designed to take you from a curious beginner to a confident technical builder.</p></Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <SpotlightCard style={{ padding: "36px 28px", height: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>{p.icon}</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, flex: 1 }}>{p.body}</p>
                  <Link href={p.href} style={{ color: "var(--orange)", fontSize: "0.85rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Explore <ArrowRight size={13} />
                  </Link>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── WHY CHOOSE PODEVS ────────────────────── */}
      <Section style={{ padding: "var(--section-gap) 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <Reveal><span className="section-label">Why PODEVS</span></Reveal>
              <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14 }}>Built Different.<br />Built for Students.</h2></Reveal>
              <Reveal delay={0.1}><p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>Unlike traditional courses, PODEVS focuses on real outcomes — projects you can show, skills you can use, and a network that supports you.</p></Reveal>
              <Reveal delay={0.15}>
                <Link href="/about" className="btn-primary" style={{ fontSize: "0.85rem" }}>Learn More <ArrowRight size={14} /></Link>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.07}>
                  <SpotlightCard style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,138,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>{b.icon}</div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700 }}>{b.title}</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6 }}>{b.desc}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── TESTIMONIALS / SOCIAL PROOF ──────────── */}
      <Section style={{ padding: "var(--section-gap) 0" }} className="section-glow">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Reveal><span className="section-label" style={{ justifyContent: "center" }}>Social Proof</span></Reveal>
            <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14 }}>Loved by Students Everywhere</h2></Reveal>
            <Reveal delay={0.1}><p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>Hear from real members who've transformed their skills with PODEVS.</p></Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <SpotlightCard style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", gap: 4 }}>{[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--orange)" stroke="var(--orange)" />)}</div>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, flex: 1, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--orange), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{t.avatar}</div>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>{t.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{t.role}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── FEATURE HIGHLIGHT (Skill Roadmap) ───────── */}
      <Section style={{ padding: "var(--section-gap) 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div style={{ order: 2 }} className="lg:order-1">
              <Reveal>
                <div style={{ position: "relative", padding: "40px", background: "var(--bg2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: "radial-gradient(circle, rgba(255,138,0,0.15) 0%, transparent 70%)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { step: 1, title: "Fundamentals", desc: "HTML, CSS, JavaScript basics." },
                      { step: 2, title: "Modern Frameworks", desc: "React.js & Next.js mastery." },
                      { step: 3, title: "Backend & DBs", desc: "Node, Express, and Supabase." },
                      { step: 4, title: "Launch", desc: "Deploy on Vercel, share with the world." }
                    ].map((item, i) => (
                      <div key={item.step} style={{ display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", zIndex: 1, flexShrink: 0 }}>{item.step}</div>
                          {i !== 3 && <div style={{ width: 2, height: "100%", minHeight: 24, background: "var(--border)" }} />}
                        </div>
                        <div style={{ paddingTop: 4, paddingBottom: i !== 3 ? 16 : 0 }}>
                          <h4 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{item.title}</h4>
                          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            <div style={{ order: 1 }} className="lg:order-2">
              <Reveal><span className="section-label">Skill Roadmaps</span></Reveal>
              <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14 }}>A Clear Path to Proficiency</h2></Reveal>
              <Reveal delay={0.1}><p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>Stop wondering what to learn next. Our curated roadmaps guide you step-by-step from beginner to full-stack developer.</p></Reveal>
              <Reveal delay={0.15}>
                <Link href="/what-we-do" className="btn-primary" style={{ fontSize: "0.85rem" }}>Explore Roadmaps <ArrowRight size={14} /></Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── EVENTS PREVIEW ───────────────────────── */}
      <Section style={{ padding: "var(--section-gap) 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
            <div>
              <Reveal><span className="section-label">Upcoming</span></Reveal>
              <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Events & Hackathons</h2></Reveal>
            </div>
            <Reveal><Link href="/events" className="btn-outline" style={{ fontSize: "0.8rem", padding: "8px 18px" }}>View All →</Link></Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev, i) => (
              <Reveal key={ev.title} delay={i * 0.07}>
                <SpotlightCard style={{ padding: "28px", display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* 1. Header: Date & Tag */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(255,138,0,0.08)", border: "1px solid rgba(255,138,0,0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--orange)", lineHeight: 1 }}>{ev.day}</span>
                      <span style={{ fontSize: 9, color: "var(--orange)", fontFamily: "monospace", letterSpacing: "0.05em", marginTop: 2 }}>{ev.mo}</span>
                    </div>
                    <span className="tag" style={{ marginTop: 2 }}>{ev.type}</span>
                  </div>
                  
                  {/* 2. Content: Title */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: 600, fontSize: "1rem", lineHeight: 1.4 }}>{ev.title}</h3>
                  </div>

                  {/* 3. Meta Info: Icons */}
                  <div style={{ display: "flex", columnGap: 16, rowGap: 8, flexWrap: "wrap", marginBottom: "28px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} />{ev.time}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>📍 {ev.location}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>🎟 {ev.price}</span>
                  </div>

                  {/* 4. Button: Pinned to bottom */}
                  <div style={{ marginTop: "auto" }}>
                    <Link href="/events" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "12px 18px", borderRadius: "10px" }}>Register</Link>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── YOUTUBE PREVIEW ──────────────────────── */}
      <Section style={{ padding: "var(--section-gap) 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
            <div>
              <Reveal><span className="section-label">On YouTube</span></Reveal>
              <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Latest Videos</h2></Reveal>
            </div>
            <Reveal><Link href="/media" className="btn-outline" style={{ fontSize: "0.8rem", padding: "8px 18px" }}>View All →</Link></Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.07}>
                <SpotlightCard style={{ overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--bg2)", overflow: "hidden" }}>
                    <Image src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", transition: "transform 0.4s ease" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(255,138,0,0.3)" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5l10 5.5-10 5.5V2.5z" fill="#fff" /></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>{v.title}</p>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{v.views}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <Section style={{ padding: "0 24px var(--section-gap)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <Reveal>
            <motion.div
              className="card-static p-10 md:p-20 text-center relative overflow-hidden"
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(255,138,0,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="tag" style={{ marginBottom: 20 }}>The Smile of Education</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16, marginTop: 16 }}>
                  Ready to Start Your Builder Journey?
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "1rem", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7 }}>
                  Join 2,000+ students already learning, building, and launching with PODEVS — completely free to start.
                </p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/join" className="btn-primary">Join Free Today <ArrowRight size={15} /></Link>
                  <Link href="/about" className="btn-outline">Learn About Us</Link>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
