"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronDown } from "lucide-react";

type NavLink = {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Works", href: "/projects" },
  { label: "Events", href: "/events" },
  {
    label: "Resources",
    subItems: [
      { label: "Roadmaps", href: "/roadmaps" },
      { label: "YouTube Media", href: "/media" },
      { label: "Newsletter", href: "/blog" },
      { label: "Podcast", href: "/podcast" },
    ]
  },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = React.useState(false);
  const [desktopResourcesOpen, setDesktopResourcesOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const desktopDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target as Node)) {
        setDesktopResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside as any);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside as any);
    };
  }, []);

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
          <nav className="hidden md:flex items-center gap-2 relative">
            {navLinks.map((l) => {
              if (l.subItems) {
                return (
                  <div key={l.label} ref={desktopDropdownRef} className="relative group">
                    <button
                      onClick={() => setDesktopResourcesOpen(!desktopResourcesOpen)}
                      style={{
                        padding: "8px 12px",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "var(--muted)",
                        transition: "color var(--trans)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      className="hover:text-[var(--text)]"
                    >
                      {l.label}
                    </button>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl transition-all duration-200 p-2 flex flex-col gap-1 ${
                        !desktopResourcesOpen 
                          ? "opacity-0 invisible group-hover:opacity-100 group-hover:visible" 
                          : ""
                      }`}
                      style={{
                        opacity: desktopResourcesOpen ? 1 : undefined,
                        visibility: desktopResourcesOpen ? "visible" : undefined,
                        pointerEvents: desktopResourcesOpen ? "auto" : undefined,
                      }}
                    >
                      {l.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setDesktopResourcesOpen(false)}
                          style={{
                            padding: "10px 12px",
                            fontSize: "0.85rem",
                            color: "var(--muted)",
                            borderRadius: 8,
                            transition: "all var(--trans)",
                          }}
                          className="hover:text-[var(--orange)] hover:bg-[rgba(255,138,0,0.05)]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href!}
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
            {/* <ThemeToggle /> */}

            <a
              href="https://linkedin.com/company/podevs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !hidden md:!inline-flex"
              style={{ borderRadius: 8, padding: "10px 24px", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
            >
              Join Us
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="flex md:hidden items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text)" }}
            >
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
            {navLinks.map((l, i) => {
              if (l.subItems) {
                return (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <button
                      onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                      style={{ padding: "12px 14px", fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", background: "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left", display: "block" }}
                    >
                      {l.label}
                    </button>
                    {mobileResourcesOpen && (
                      <div className="flex flex-col gap-2 pl-4 border-l border-[var(--border)] ml-4">
                        {l.subItems.map(sub => (
                          <Link key={sub.href} href={sub.href} style={{ padding: "8px 12px", borderRadius: 8, fontSize: "0.9rem", color: pathname === sub.href ? "var(--text)" : "var(--muted)", background: pathname === sub.href ? "var(--bg2)" : "transparent", display: "block" }}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link href={l.href!} style={{ padding: "12px 14px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, color: pathname === l.href ? "var(--text)" : "var(--muted)", background: pathname === l.href ? "var(--bg2)" : "transparent", display: "block" }}>{l.label}</Link>
                </motion.div>
              );
            })}
            <div style={{ marginTop: 8, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
              <a
                href="https://linkedin.com/company/podevs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", borderRadius: 8, textDecoration: "none", display: "flex", padding: "12px" }}
              >
                Join Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
