"use client";

import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "@/lib/supabase";

const coreFallback: any[] = [];

function TeamCard({ member, onClick }: { member: any; onClick: () => void }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card flex flex-col cursor-pointer overflow-hidden group"
      style={{ 
        borderRadius: 20, 
        background: "var(--card)", 
        border: "1px solid var(--border)",
        transition: "box-shadow 0.4s ease"
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", background: "var(--bg2)" }}>
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          style={{ width: "100%", height: "100%" }}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { (e.target as any).style.display = 'none'; }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, color: "var(--muted)", background: "rgba(var(--bg-rgb), 0.3)" }}>
              {member.init || member.name?.substring(0, 2).toUpperCase() || "?"}
            </div>
          )}
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease" }} />
      </div>

      <div style={{ padding: "16px", textAlign: "center" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text)", marginBottom: 2 }}>{member.name}</h3>
        <p style={{ fontSize: "0.65rem", color: "var(--orange)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>{member.role}</p>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = React.useState<any | null>(null);
  const [teamList, setTeamList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTeam() {
      try {
        const { data, error } = await supabase.from('team').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        
        if (data && data.length > 0) {
          const getPriority = (role: string = "") => {
            const r = role.toLowerCase();
            if (r.includes('ceo') || r.includes('founder')) return 1;
            if (r.includes('cto')) return 2;
            if (r.includes('manage')) return 3; // catches manager, management
            if (r.includes('strategist') || r.includes('stratergist')) return 4;
            if (r.includes('developer')) return 5;
            if (r.includes('content') || r.includes('creator')) return 6;
            if (r.includes('editor')) return 7;
            return 8; // Default for others
          };
          
          const sortedData = [...data].sort((a, b) => {
            const pA = getPriority(a.role);
            const pB = getPriority(b.role);
            if (pA !== pB) return pA - pB;
            // Alphabetical tie-breaker
            return (a.name || "").localeCompare(b.name || "");
          });
          
          setTeamList(sortedData);
        } else {
          setTeamList(coreFallback);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setTeamList(coreFallback);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  React.useEffect(() => {
    if (selectedMember) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "10px"; // Prevent layout shift
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    return () => { 
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [selectedMember]);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section className="py-12 md:py-16">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 600 }}>
            <span className="section-label">The People</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>The <span style={{ color: "var(--orange)" }}>Team</span></h1>
            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6 }}>The builders and creators behind PODEVS. Click on any member to learn more about them.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
              <div className="animate-spin" style={{ width: 30, height: 30, border: "3px solid var(--border)", borderTopColor: "var(--orange)", borderRadius: "50%" }} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {teamList.map((m) => <TeamCard key={m.name} member={m} onClick={() => setSelectedMember(m)} />)}
            </div>
          )}
        </div>
      </section>

      {/* Modal - The "Pop" using Portal */}
      {selectedMember && typeof document !== 'undefined' && (
        require('react-dom').createPortal(
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(15px)" }}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ 
                position: "relative",
                width: "100%",
                maxWidth: 1000,
                maxHeight: "min(800px, 90vh)",
                background: "var(--card)",
                borderRadius: 32,
                overflow: "hidden",
                border: "1px solid var(--border)",
                display: "flex",
                boxShadow: "0 50px 100px rgba(0,0,0,0.8)",
                pointerEvents: "auto",
              }}
              className="flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                style={{ position: "absolute", top: 20, right: 20, zIndex: 10, width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                className="hover:bg-white/10 transition-colors"
              >
                ✕
              </button>

              {/* Left: Image */}
              <div style={{ flex: "1 1 45%", position: "relative", minHeight: 300, background: "var(--bg2)" }}>
                {selectedMember.image ? (
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg2)", fontSize: "4rem", fontWeight: 900, color: "var(--muted)" }}>{selectedMember.init}</div>
                )}
              </div>

              {/* Right: Info */}
              <div style={{ 
                flex: "1 1 55%", 
                padding: "48px 40px", 
                display: "flex", 
                flexDirection: "column", 
                gap: 24, 
                overflowY: "auto",
                background: "var(--card)",
                minHeight: 0
              }}>
                <div>
                  <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>{selectedMember.name}</h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--orange)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em" }}>{selectedMember.role}</p>
                </div>

                <div style={{ height: 1, background: "var(--border)", width: 40 }} />

                <div style={{ flex: 1 }}>
                  <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                    {selectedMember.bio}
                  </p>
                </div>

                <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 20 }}>
                  <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderRadius: 14, padding: "10px 20px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    LinkedIn
                  </a>
                  {(selectedMember as any).insta && (
                    <a href={(selectedMember as any).insta} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderRadius: 14, padding: "10px 20px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      Instagram
                    </a>
                  )}
                  <a href={`mailto:${selectedMember.mail}`} className="btn-outline" style={{ borderRadius: 14, padding: "10px 20px" }}>
                    <Mail size={18} />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )
      )}

      <section className="px-6 pb-24">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="card p-12 md:p-20 text-center relative overflow-hidden" style={{ borderRadius: 32, background: "var(--bg2)", border: "1px solid var(--border)" }}>
             <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "radial-gradient(circle at 50% 0%, rgba(255,138,0,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
             <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16, position: "relative" }}>Join the Mission</h2>
             <p style={{ color: "var(--muted)", marginBottom: 12, fontSize: "1.05rem", maxWidth: 440, margin: "0 auto 12px", position: "relative" }}>Want to help shape the future of student-led tech education?</p>
             <p style={{ color: "var(--orange)", marginBottom: 32, fontSize: "0.9rem", fontWeight: 700, position: "relative" }}>podevs.cmty@gmail.com</p>
             <Link href="/contact" className="btn-primary" style={{ position: "relative" }}>Get In Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

