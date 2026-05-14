import Link from "next/link";
import { Logo } from "@/components/logo";

const col1 = [
  { label: "About", href: "/about" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Team", href: "/team" },
  { label: "Newsletter", href: "/blog" },
];
const col2 = [
  { label: "Events", href: "/events" },
  { label: "Podcast", href: "/podcast" },
  { label: "Media", href: "/media" },
  { label: "Medium", href: "/medium" },
  { label: "Join Us", href: "https://linkedin.com/company/podevs" },
];
const col3 = [
  { label: "Web Development", href: "/services" },
  { label: "Deployment", href: "/services" },
  { label: "Hosting", href: "/services" },
  { label: "Design (Figma)", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-gradient-to-t from-[rgba(255,138,0,0.03)] to-transparent py-16 md:py-20 relative">
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "block", marginBottom: 20 }}><Logo /></Link>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 320, marginBottom: 32 }}>
              Empowering the next generation of builders. Master tech, ship projects, and join a global community — for free.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { name: "LinkedIn", href: "https://linkedin.com/company/podevs", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
                { name: "YouTube", href: "https://youtube.com/@podevs", icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></> },
                { name: "Instagram", href: "https://instagram.com/podevs", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></> }
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid var(--border)", color: "var(--muted)", transition: "all var(--trans)", background: "rgba(255,255,255,0.02)" }}
                  className="hover:text-[var(--orange)] hover:border-[var(--orange)] hover:bg-[rgba(255,138,0,0.05)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text)", marginBottom: 24 }}>Platform</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {col1.map((l) => <li key={l.label}><Link href={l.href} style={{ fontSize: "0.9rem", color: "var(--muted)", transition: "color var(--trans)" }} className="hover:text-[var(--orange)]">{l.label}</Link></li>)}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text)", marginBottom: 24 }}>Community</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {col2.map((l) => {
                const isExternal = l.href.startsWith('http');
                return (
                  <li key={l.label}>
                    {isExternal ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "var(--muted)", transition: "color var(--trans)" }} className="hover:text-[var(--orange)]">{l.label}</a>
                    ) : (
                      <Link href={l.href} style={{ fontSize: "0.9rem", color: "var(--muted)", transition: "color var(--trans)" }} className="hover:text-[var(--orange)]">{l.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text)", marginBottom: 24 }}>Services</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {col3.map((l) => <li key={l.label}><Link href={l.href} style={{ fontSize: "0.9rem", color: "var(--muted)", transition: "color var(--trans)" }} className="hover:text-[var(--orange)]">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>© {new Date().getFullYear()} PODEVS. Built for the builders.</p>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="/privacy" style={{ fontSize: "0.85rem", color: "var(--subtle)" }} className="hover:text-[var(--text)] transition-colors">Privacy</Link>
            <Link href="/terms" style={{ fontSize: "0.85rem", color: "var(--subtle)" }} className="hover:text-[var(--text)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
