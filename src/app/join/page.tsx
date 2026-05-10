"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!supabase) {
      setMessage("Database not connected. Please check your settings.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Check your email for the magic link!");
    }
    setIsLoading(false);
  };

  const handleGithubLogin = async () => {
    if (!supabase) {
      setMessage("Database not connected.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", position: "relative", overflow: "hidden" }}>
      {/* Background Effects */}
      
      <div style={{ width: "100%", display: "flex", flexDirection: "column", paddingTop: "calc(var(--nav-h) + 40px)" }}>
        {/* Main Content */}
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px", position: "relative", zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ width: "100%", maxWidth: 420, padding: "40px", background: "var(--bg)", borderRadius: 24, border: "1px solid var(--border)", boxShadow: "0 24px 60px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}
          >
            {/* Top Glow inside card */}
            <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: "150%", height: 100, background: "radial-gradient(ellipse at top, rgba(255,138,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>Join PODEVS</h1>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Start building your tech career today.</p>
            </div>

            <button 
              onClick={handleGithubLogin}
              className="btn-secondary" 
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px", marginBottom: 24, background: "var(--bg2)", border: "1px solid var(--border)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
              Continue with GitHub
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>OR</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, marginBottom: 8 }}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", fontSize: "0.95rem", outline: "none", transition: "border-color 0.2s" }}
                  className="focus:border-[var(--orange)]"
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: "100%", padding: "12px", justifyContent: "center", marginTop: 8, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
                disabled={isLoading}
              >
                {isLoading ? "Sending Magic Link..." : "Continue with Email"}
              </button>
            </form>

            {message && (
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: message.includes("Error") ? "red" : "var(--orange)", marginTop: 16 }}>
                {message}
              </p>
            )}

            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--muted)", marginTop: 32 }}>
              By joining, you agree to our <Link href="#" style={{ color: "var(--text)", textDecoration: "underline" }}>Terms of Service</Link> and <Link href="#" style={{ color: "var(--text)", textDecoration: "underline" }}>Privacy Policy</Link>.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
