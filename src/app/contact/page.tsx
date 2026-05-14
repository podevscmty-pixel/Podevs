"use client";
import * as React from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  { icon: <Mail size={18} />, label: "Email", value: "podevs.cmty@gmail.com", href: "mailto:podevs.cmty@gmail.com" },
  { icon: <MapPin size={18} />, label: "Location", value: "Chennai, Tamil Nadu", href: "#" },
  { icon: <Clock size={18} />, label: "Response Time", value: "Within 24–48 hours", href: "#" },
];

const socials = [
  { name: "LinkedIn", href: "https://linkedin.com/company/podevs" },
  { name: "YouTube", href: "https://youtube.com/@podevs" },
  { name: "Instagram", href: "https://instagram.com/podevs.cmty" },
];

const inputStyle: React.CSSProperties = { height: 42, padding: "0 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg2)", color: "var(--text)", fontSize: "0.875rem", outline: "none", width: "100%", transition: "border-color 0.2s ease" };

export default function ContactPage() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">Get In Touch</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>Say <span style={{ color: "var(--orange)" }}>Hello</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 500 }}>Questions, collabs, or just want to say hi — we're always happy to hear from students and partners.</p>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]" style={{ gap: 48, alignItems: "start" }}>
            {/* Left */}
            <div>
              <span className="section-label">Contact Info</span>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 28 }}>Reach Out</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {contactInfo.map((c) => (
                  <a key={c.label} href={c.href} className="card-static group" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
                    <div style={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: 8, 
                      background: "rgba(255, 138, 0, 0.08)", 
                      border: "1px solid rgba(255, 138, 0, 0.15)",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: "var(--orange)",
                      flexShrink: 0
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 2 }}>{c.label}</p>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <span className="section-label">Follow Us</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", borderRadius: 99, border: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--muted)", transition: "color var(--trans), border-color var(--trans)", textDecoration: "none" }} className="hover:text-[var(--orange)] hover:border-[var(--orange)]">{s.name}</a>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="card-static" style={{ padding: "36px 32px" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 24 }}>Send a Message</h3>
              <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--muted)" }}>Name</label>
                    <input name="name" required type="text" placeholder="Your name" style={inputStyle} onFocus={(e) => e.target.style.borderColor = "var(--orange)"} onBlur={(e) => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--muted)" }}>Email</label>
                    <input name="email" required type="email" placeholder="your@email.com" style={inputStyle} onFocus={(e) => e.target.style.borderColor = "var(--orange)"} onBlur={(e) => e.target.style.borderColor = "var(--border)"} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--muted)" }}>Subject</label>
                  <select name="subject" style={{ ...inputStyle, appearance: "none" }}>
                    {["General Inquiry", "Services / Pricing", "Workshop / Event", "Collaboration / Partnership", "Join the Team", "Other"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--muted)" }}>Message</label>
                  <textarea name="message" required placeholder="Tell us what's on your mind..." rows={5} style={{ ...inputStyle, height: "auto", padding: "12px 14px", resize: "vertical" }} onFocus={(e) => e.target.style.borderColor = "var(--orange)"} onBlur={(e) => e.target.style.borderColor = "var(--border)"} />
                </div>

                <button 
                  type="submit" 
                  disabled={status === "sending"}
                  className="btn-primary" 
                  style={{ 
                    width: "100%", 
                    justifyContent: "center", 
                    height: 44, 
                    background: status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "var(--orange)",
                    opacity: status === "sending" ? 0.7 : 1
                  }}
                >
                  {status === "sending" ? "Sending..." : status === "success" ? "✓ Message Sent!" : status === "error" ? "✕ Error, try again" : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
