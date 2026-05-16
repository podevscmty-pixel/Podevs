"use client";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import * as React from "react";

const plans = [
  {
    tag: "Website", name: "Starter (for students)", price: "₹999", sub: "Starting from",
    features: ["Custom responsive design", "Up to 5 pages", "Mobile optimized", "SEO basics included", "Free deployment"],
    popular: false,
  },
  {
    tag: "Full Website", name: "Business (for startups)", price: "₹2,499", sub: "Starting from",
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
  { icon: <Palette size={20} />, title: "UI/UX Design", body: "Get a professional design for your site or app. You implement, we design. Starting from ₹1,499." },
  { icon: <Zap size={20} />, title: "Deployment Setup", body: "We set up CI/CD, configure your domain, and deploy your existing project. One-time fee starting at ₹499." },
];

function EstimatorRow({ label, price, value, active, onClick }: { label: string; price: string; value: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        borderRadius: 14,
        background: active ? "rgba(255,138,0,0.08)" : "rgba(255,255,255,0.02)",
        border: active ? "1px solid var(--orange)" : "1px solid var(--border)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease"
      }}
      className="hover:bg-white/5"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, border: "2px solid var(--orange)", background: active ? "var(--orange)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {active && <CheckCircle size={14} color="#fff" strokeWidth={3} />}
        </div>
        <span style={{ fontSize: "0.95rem", fontWeight: 600, color: active ? "#fff" : "var(--muted)" }}>{label}</span>
      </div>
      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--orange)" }}>{price}</span>
    </button>
  );
}

export default function ServicesPage() {
  const [selectedAddons, setSelectedAddons] = React.useState<number[]>([]);
  const basePrice = 2499;

  const estimatorItems = [
    { id: 1, label: "Additional Pages", price: "₹699", value: 699 },
    { id: 2, label: "Custom Animations", price: "₹499", value: 499 },
    { id: 3, label: "Contact Form Integration", price: "₹199", value: 199 },
    { id: 4, label: "CMS / Admin Dashboard", price: "₹1,499", value: 1499 },
  ];

  const toggleAddon = (value: number) => {
    if (selectedAddons.includes(value)) {
      setSelectedAddons(selectedAddons.filter(v => v !== value));
    } else {
      setSelectedAddons([...selectedAddons, value]);
    }
  };

  const totalPrice = basePrice + selectedAddons.reduce((a, b) => a + b, 0);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section className="py-12 md:py-20">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">We Build For You</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>Affordable <span style={{ color: "var(--orange)" }}>Services</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 520 }}>Professional web services priced for students. No compromise on quality, just on cost.</p>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span className="tag">Student-Friendly Pricing</span>
            <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: 10 }}>All prices in INR. We work with students, clubs, and early-stage startups.</p>
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {plans.map((p, i) => (
              <div key={p.name} className={`${p.popular ? "card-static" : "card"} p-8 md:p-10 flex flex-col gap-4 border ${p.popular ? "border-[var(--orange)]/40" : "border-[var(--border)]"} rounded-[14px] relative ${p.popular ? "mt-0 lg:-mt-2" : "mt-0"}`}>
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

      <section className="pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div className="card-static p-8 md:p-16 relative overflow-hidden">
            <div style={{ position: "absolute", top: 0, right: 0, width: "30%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,138,0,0.03))", pointerEvents: "none" }} />

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div style={{ flex: 1 }}>
                <span className="tag" style={{ marginBottom: 16 }}>Calculator</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 850, letterSpacing: "-0.02em", marginBottom: 16 }}>Estimate Your <span style={{ color: "var(--orange)" }}>Project</span></h2>
                <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 28, maxWidth: 460 }}>Choose the features you need and get a transparent estimate for your vision instantly.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {estimatorItems.map((item) => (
                    <EstimatorRow
                      key={item.id}
                      label={item.label}
                      price={item.price}
                      value={item.value}
                      active={selectedAddons.includes(item.value)}
                      onClick={() => toggleAddon(item.value)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ flex: "0 0 320px", width: "100%" }}>
                <div style={{ background: "var(--bg2)", borderRadius: 24, padding: 32, border: "1px solid var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 8 }}>Estimated Total</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                    <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff" }}>₹{totalPrice.toLocaleString()}</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>*</span>
                  </div>
                  <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 32 }}>* Final pricing depends on project complexity. Contact us for a precise quote.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Book a Free Call</Link>
                    <a 
                      href="https://wa.me/919444889354?text=Hi%20PODEVS%2C%20I've%20estimated%20my%20project%20on%20your%20website%20and%20would%20like%20to%20discuss%20it!" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-outline" 
                      style={{ width: "100%", justifyContent: "center", border: "1px solid #25D366", color: "#25D366" }}
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-32">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 56 }} />
          <span className="section-label">Add-Ons</span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 28 }}>Additional Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {addons.map((a) => (
              <div key={a.title} className="card p-6 md:p-8 flex gap-5 items-start">
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
