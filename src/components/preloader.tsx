"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Minimalist Logo Text */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ 
                fontSize: "clamp(2rem, 8vw, 4rem)", 
                fontWeight: 900, 
                color: "#fff", 
                letterSpacing: "-0.05em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              PODEVS<span style={{ color: "var(--orange)" }}>.</span>
            </motion.h1>
          </div>
          {/* Elegant Loading Subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ 
              marginTop: 12, 
              display: "flex", 
              alignItems: "center", 
              gap: 12 
            }}
          >
            <p style={{ 
              color: "rgba(255,255,255,0.4)", 
              fontSize: "0.75rem", 
              letterSpacing: "0.3em", 
              textTransform: "uppercase",
              fontWeight: 500
            }}>
              The Smile of Education
            </p>
          </motion.div>

          {/* Ambient Glow */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "40vw",
              height: "40vw",
              background: "radial-gradient(circle, rgba(255,138,0,0.1) 0%, transparent 70%)",
              zIndex: -1
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
