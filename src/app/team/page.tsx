"use client";
import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";
import * as React from "react";

const core = [
  { init: "AK", name: "Arun Kumar", role: "Founder & Lead", bio: "CS undergrad by day, builder by night. Started PODEVS to fix what was broken in student tech education.", grad: "#FF8A00, #FFC247" },
  { init: "PR", name: "Priya Raj", role: "Community Lead", bio: "Believes the best learning happens with other people. Runs our events, Discord, and partnerships.", grad: "#6c63ff, #FF8A00" },
  { init: "KS", name: "Karthik S", role: "Tech & Content", bio: "Full-stack developer and educator. Builds our platform, records tutorials, and leads workshops.", grad: "#00C9FF, #FFC247" },
  { init: "DM", name: "Divya M", role: "Design & Brand", bio: "UI/UX designer who makes sure everything at PODEVS looks and feels premium — even when it's free.", grad: "#FF8A00, #ff6b6b" },
];

const volunteers = [
  { init: "RV", name: "Ravi V", role: "Workshop Host", grad: "#43e97b, #38f9d7" },
  { init: "SN", name: "Sneha N", role: "Content Creator", grad: "#f093fb, #f5576c" },
  { init: "MK", name: "Mani K", role: "Social Media", grad: "#4facfe, #00f2fe" },
  { init: "LR", name: "Latha R", role: "Event Coordinator", grad: "#fa709a, #fee140" },
];

function TeamCard({ member, showBio = false }: { member: typeof core[0]; showBio?: boolean }) {
  return (
    <div className="card" style={{ padding: "28px 22px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${member.grad})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
        {member.init}
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>{member.name}</p>
        <p style={{ fontSize: "0.78rem", color: "var(--orange)", fontFamily: "monospace", letterSpacing: "0.04em" }}>{member.role}</p>
      </div>
      {showBio && "bio" in member && <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.6 }}>{(member as any).bio}</p>}
      <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: "1px solid var(--border)", width: "100%", justifyContent: "center" }}>
        {[Globe, MessageCircle, Mail].map((Icon, i) => (
          <a key={i} href="#" style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "color var(--trans), border-color var(--trans)" }} className="hover:text-[var(--orange)] hover:border-[var(--orange)]">
            <Icon size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">The People</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>Meet the <span style={{ color: "var(--orange)" }}>Team</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 500 }}>Students and builders who believe education should be open, joyful, and empowering for everyone.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 64px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">Leadership</span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 28 }}>Core Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {core.map((m) => <TeamCard key={m.name} member={m} showBio />)}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 64px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 48 }} />
          <span className="section-label">Contributors</span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 28 }}>Volunteers & Contributors</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {volunteers.map((m) => <TeamCard key={m.name} member={m as any} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.95rem" }}>Want to join the team and help shape student education?</p>
          <Link href="/contact" className="btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
}
