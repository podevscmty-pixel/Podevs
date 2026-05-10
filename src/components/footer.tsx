import Link from "next/link";
import { Logo } from "@/components/logo";

const col1 = [
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];
const col2 = [
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Join Free", href: "/join" },
  { label: "Contact", href: "/contact" },
];
const col3 = [
  { label: "Web Development", href: "/services" },
  { label: "Deployment", href: "/services" },
  { label: "Hosting", href: "/services" },
  { label: "Design (Figma)", href: "/services" },
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
                { name: "Twitter", icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path> },
                { name: "LinkedIn", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
                { name: "YouTube", icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></> },
                { name: "Discord", icon: <path d="M20.31 6.26a16.3 16.3 0 0 0-4-1.23.06.06 0 0 0-.06.03 11.11 11.11 0 0 0-.49 1 15.06 15.06 0 0 0-4.52 0 11.11 11.11 0 0 0-.49-1 .06.06 0 0 0-.06-.03 16.3 16.3 0 0 0-4 1.23.05.05 0 0 0-.02.02c-2.55 3.8-3.25 7.5-2.9 11.13a.06.06 0 0 0 .02.04 16.43 16.43 0 0 0 5 2.51.06.06 0 0 0 .07-.02 11.66 11.66 0 0 0 1-.22.06.06 0 0 0 .04-.05 10.74 10.74 0 0 0-.47-1 .06.06 0 0 0-.1-.06 11 11 0 0 1-1.57-.75.06.06 0 0 1 0-.1 7.63 7.63 0 0 0 .31-.24.05.05 0 0 1 .06 0 11.64 11.64 0 0 0 9.4 0 .05.05 0 0 1 .06 0c.1.08.21.16.31.24a.06.06 0 0 1 0 .1 11 11 0 0 1-1.57.75.06.06 0 0 0-.1.06 10.74 10.74 0 0 0-.47 1 .06.06 0 0 0 .04.05 11.66 11.66 0 0 0 1 .22.06.06 0 0 0 .07.02 16.43 16.43 0 0 0 5-2.51.06.06 0 0 0 .02-.04c.42-4.14-.7-7.81-2.92-11.15a.05.05 0 0 0-.02-.02zM8.67 14.39a2.31 2.31 0 0 1-2.17-2.45 2.31 2.31 0 0 1 2.17-2.45 2.31 2.31 0 0 1 2.17 2.45 2.31 2.31 0 0 1-2.17 2.45zm6.66 0a2.31 2.31 0 0 1-2.17-2.45 2.31 2.31 0 0 1 2.17-2.45 2.31 2.31 0 0 1 2.17 2.45 2.31 2.31 0 0 1-2.17 2.45z"></path> },
                { name: "Instagram", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></> }
              ].map((s) => (
                <a key={s.name} href="#" title={s.name} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid var(--border)", color: "var(--muted)", transition: "all var(--trans)", background: "rgba(255,255,255,0.02)" }}
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
              {col2.map((l) => <li key={l.label}><Link href={l.href} style={{ fontSize: "0.9rem", color: "var(--muted)", transition: "color var(--trans)" }} className="hover:text-[var(--orange)]">{l.label}</Link></li>)}
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
