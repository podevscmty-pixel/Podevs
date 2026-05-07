"use client";
import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";
import * as React from "react";

const core = [
  { init: "SR", name: "Sai Rohith", role: "Founder", image: "/images/sai.png", bio: "As CEO of PODEVS Community, I lead a growing student-driven tech ecosystem focused on empowering learners to build real-world skills, leadership, communication, and innovation through hands-on experience and collaborative learning.", grad: "#FF8A00, #FFC247" },
  { init: "S", name: "Saran", role: "Co-Founder", image: "/images/saran.png", bio: "Believes the best learning happens with other people. Runs our events, Discord, and partnerships.", grad: "#6c63ff, #FF8A00" },
  { init: "NS", name: "Nithin Srinivasan", role: "Strategist & Content Creator", image: "/images/nithin.png", bio: "Works at the intersection of ideas, strategy, and creative direction and shaping content that engages and grows the PODEVS Community. Focuses on turning ideas into impactful initiatives that enhance learning, visibility, and innovation.", grad: "#00C9FF, #FFC247" },
  { init: "M", name: "Manoj", role: "Developer", image: "/images/team/manoj.jpg", bio: "Full Stack Developer experienced in React, Node.js, Python, and AWS, with hands-on exposure to building and deploying scalable applications. Completed an AWS Virtual Internship and gained industry experience as a Full Stack Developer at IBM. Passionate about data visualization, Generative AI, and developing impactful web applications through efficient and scalable solutions.", grad: "#FF8A00, #ff6b6b" },
  { init: "RV", name: "Ravi Varma", role: "Engineering Lead", image: "/images/team/ravi.jpg", bio: "Architecture enthusiast focusing on scalable student platforms and open-source contributions.", grad: "#43e97b, #38f9d7" },
  { init: "SN", name: "Sneha Nair", role: "Content Strategy", image: "/images/team/sneha.jpg", bio: "Crafting the educational voice of PODEVS. Expert in simplifying complex technical roadmaps.", grad: "#f093fb, #f5576c" },
  { init: "MK", name: "Mani K", role: "Growth & Ops", image: "/images/team/mani.jpg", bio: "Scaling the PODEVS mission to colleges nationwide. Managing logistics for our major hackathons.", grad: "#4facfe, #00f2fe" },
  { init: "LR", name: "Latha Rao", role: "Events Director", image: "/images/team/latha.jpg", bio: "Ensuring every PODEVS event is a masterclass in student engagement and technical value.", grad: "#fa709a, #fee140" },
];

function TeamCard({ member, showBio = false }: { member: typeof core[0]; showBio?: boolean }) {
  return (
    <div className="card" style={{ padding: "44px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${member.grad})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: "1.8rem",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        border: "4px solid var(--bg2)"
      }}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              (e.target as any).style.display = 'none';
            }}
          />
        ) : member.init}
      </div>
      <div>
        <p style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: 6 }}>{member.name}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--orange)", fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>{member.role}</p>
      </div>
      {showBio && <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>{member.bio}</p>}
      <div style={{ display: "flex", gap: 10, paddingTop: 12, borderTop: "1px solid var(--border)", width: "100%", justifyContent: "center" }}>
        {[Globe, MessageCircle, Mail].map((Icon, i) => (
          <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all var(--trans)" }} className="hover:text-[var(--orange)] hover:border-[var(--orange)] hover:bg-[rgba(255,138,0,0.05)]">
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "80px 0 64px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">The People</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 20 }}>The <span style={{ color: "var(--orange)" }}>Team</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540 }}>The students and builders behind the Smile of Education.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {core.map((m) => <TeamCard key={m.name} member={m} showBio />)}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", textAlign: "center" }}>
          <div className="card-static" style={{ padding: "64px 48px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 14 }}>Join the Mission</h2>
            <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: "1.05rem", maxWidth: 400, margin: "0 auto 28px" }}>Want to help shape the future of student-led tech education?</p>
            <Link href="/contact" className="btn-primary">Get In Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

