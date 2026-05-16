"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function MediumPage() {
  return (
    <div style={{ paddingTop: "var(--nav-h)", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <section style={{ padding: "60px 0", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "8px 16px", borderRadius: 100, background: "rgba(255, 138, 0, 0.08)", border: "1px solid rgba(255, 138, 0, 0.2)" }}>
              <BookOpen size={16} color="var(--orange)" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--orange)" }}>Under Maintenance</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: 24 }}>Medium Articles are <span style={{ color: "var(--orange)" }}>Temporarily Offline</span></h1>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 40 }}>
              We're currently restructuring our publication strategy to bring you even better technical content. Our Medium articles will be back shortly.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <Link href="/" className="btn-primary">Back to Home</Link>
              <Link href="/media" className="btn-outline">Watch on YouTube</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
