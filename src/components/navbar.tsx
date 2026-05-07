"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [user, setUser] = React.useState<SupabaseUser | null>(null);

  const supabase = createClient();

  React.useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? winScroll / height : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: scrolled ? "var(--nav-h-scrolled)" : "var(--nav-h)",
          background: scrolled ? "rgba(var(--bg-rgb), 0.8)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: "8px 12px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: isActive ? "var(--text)" : "var(--muted)",
                    position: "relative",
                    transition: "color var(--trans)",
                  }}
                  className="hover:text-[var(--text)]"
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: "10%",
                        right: "10%",
                        height: "2px",
                        background: "var(--orange)",
                        borderRadius: "2px",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ThemeToggle />
            
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--bg2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <User size={16} color="var(--muted)" />
                  )}
                </div>
                <button onClick={handleLogout} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", padding: 8 }} title="Sign out">
                  <LogOut size={16} className="hover:text-[var(--text)] transition-colors" />
                </button>
              </div>
            ) : pathname !== "/join" ? (
              <Link href="/join" className="btn-primary hidden md:inline-flex" style={{ borderRadius: 8, padding: "10px 24px", fontSize: "0.85rem", fontWeight: 600 }}>Get Started</Link>
            ) : null}

            <button onClick={() => setOpen(!open)} className="flex md:hidden" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text)" }}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ position: "fixed", top: "var(--nav-h)", left: 0, right: 0, zIndex: 40, background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4, backdropFilter: "blur(16px)" }}
            className="md:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
              >
                <Link href={l.href} style={{ padding: "12px 14px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, color: pathname === l.href ? "var(--text)" : "var(--muted)", background: pathname === l.href ? "var(--bg2)" : "transparent", display: "block" }}>{l.label}</Link>
              </motion.div>
            ))}
            <div style={{ marginTop: 8, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
              {user ? (
                <button onClick={handleLogout} className="btn-secondary" style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}>Sign Out</button>
              ) : (
                <Link href="/join" className="btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}>Join Free</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
