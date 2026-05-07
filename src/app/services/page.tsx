"use client";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import * as React from "react";

const plans = [
  {
    tag: "Website", name: "Portfolio / Blog", price: "₹999", sub: "Starting from",
    features: ["Custom responsive design", "Up to 5 pages", "Mobile optimized", "SEO basics included", "Free deployment"],
    popular: false,
  },
  {
    tag: "Full Website", name: "Club / Business Site", price: "₹2,499", sub: "Starting from",
    features: ["Everything in Portfolio", "Up to 10 pages", "Contact form integration", "Admin dashboard", "1 month free support", "Custom domain setup"],
    popular: true,
  },
  {
    tag: "Advanced", name: "Full-Stack App", price: "₹7,999", sub: "Starting from",
    features: ["React + Next.js frontend", "Backend API + database", "User auth system", "Cloud deployment", "3 months support"],
    popular: false,
  },
];

import { Cloud, Wrench, Palette, Zap } from "lucide-react";

const addons = [
  { icon: <Cloud size={20} />, title: "Hosting Plans", body: "Reliable cloud hosting with 99.9% uptime. Starting from ₹199/month for static sites, ₹499/month for dynamic apps." },
  { icon: <Wrench size={20} />, title: "Maintenance & Updates", body: "Monthly maintenance packages including content updates, bug fixes, and performance optimization." },
  { icon: <Palette size={20} />, title: "Design Only (Figma)", body: "Get a professional Figma design for your site or app. You implement, we design. Starting from ₹1,499." },
  { icon: <Zap size={20} />, title: "Deployment Setup", body: "We set up CI/CD, configure your domain, and deploy your existing project. One-time fee starting at ₹499." },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">We Build For You</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>Affordable <span style={{ color: "var(--orange)" }}>Services</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 520 }}>Professional web services priced for students. No compromise on quality, just on cost.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 80px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span className="tag">Student-Friendly Pricing</span>
            <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: 10 }}>All prices in INR. We work with students, clubs, and early-stage startups.</p>
          </div>
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, alignItems: "start" }}>
            {plans.map((p, i) => (
              <div key={p.name} className={p.popular ? "card-static" : "card"} style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 16, border: `1px solid ${p.popular ? "rgba(255,138,0,0.4)" : "var(--border)"}`, borderRadius: 14, position: "relative", marginTop: p.popular ? -8 : 0 }}>
                {p.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--orange)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 99, letterSpacing: "0.07em", whiteSpace: "nowrap" }}>MOST POPULAR</div>
                )}
                <span className="tag" style={{ alignSelf: "flex-start" }}>{p.tag}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>{p.name}</h3>
                  <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--orange)", lineHeight: 1 }}>{p.price}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: 4 }}>{p.sub}</p>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.875rem", color: "var(--muted)" }}>
                      <CheckCircle size={14} style={{ color: "var(--orange)", flexShrink: 0, marginTop: 2 }} />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={p.popular ? "btn-primary" : "btn-outline"} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 56 }} />
          <span className="section-label">Add-Ons</span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 28 }}>Additional Services</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {addons.map((a) => (
              <div key={a.title} className="card" style={{ padding: "26px 22px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 10, 
                  background: "rgba(255, 138, 0, 0.08)", 
                  border: "1px solid rgba(255, 138, 0, 0.15)",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "var(--orange)",
                  flexShrink: 0
                }}>
                  {a.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "0.975rem", marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: 14 }}>{a.body}</p>
                  <Link href="/contact" className="btn-outline" style={{ fontSize: "0.78rem", padding: "6px 14px" }}>Inquire</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
