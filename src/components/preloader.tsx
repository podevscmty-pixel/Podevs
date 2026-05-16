"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase(1), 400);   // start ring trace
    const t2 = setTimeout(() => setPhase(2), 1800);  // reveal logo
    const t3 = setTimeout(() => setPhase(3), 2600);  // show text
    const t4 = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 4200);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          style={{
            position: "fixed", inset: 0, zIndex: 10000, background: "#0a0a0a",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", overflow: "hidden",
          }}
        >
          {/* Logo area - scales down in landscape */}
          <div style={{
            position: "relative",
            width: "min(130px, 25vh)",
            height: "min(130px, 25vh)",
            marginBottom: "min(36px, 4vh)",
            flexShrink: 0,
          }}>

            {/* Tracing ring */}
            <svg viewBox="0 0 130 130" width="100%" height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}>
              <motion.circle
                cx={65} cy={65} r={58}
                fill="none"
                stroke="rgba(251,147,76,0.5)"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase >= 1 ? 1 : 0,
                  opacity: phase >= 1 ? (phase >= 2 ? 0 : 0.8) : 0,
                }}
                transition={{
                  pathLength: { duration: 1.2, ease: "easeInOut" },
                  opacity: { duration: phase >= 2 ? 0.4 : 0.2 },
                }}
              />
            </svg>

            {/* The actual logo - revealed with expanding clip-path circle */}
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
              animate={{
                clipPath: phase >= 2 ? "circle(75% at 50% 50%)" : "circle(0% at 50% 50%)",
                opacity: phase >= 2 ? 1 : 0,
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
              <img
                src="/logo.svg"
                alt="PODEVS Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </motion.div>

            {/* Pulse ring on logo reveal */}
            {phase >= 2 && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0.6 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  position: "absolute", inset: -10,
                  border: "1.5px solid rgba(251,147,76,0.3)",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>

          {/* PODEVS text */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: phase >= 3 ? 0 : 50, opacity: phase >= 3 ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(1.2rem, min(6vw, 5vh), 2.8rem)", fontWeight: 900,
                color: "#fff", letterSpacing: "-0.04em", margin: 0,
                fontFamily: "var(--font-bruno), sans-serif",
              }}
            >
              <span style={{ color: "#FF8A00" }}>P</span>ODEVS
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 16 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            style={{
              marginTop: "min(10px, 1.5vh)", color: "rgba(255,255,255,0.3)",
              fontSize: "clamp(0.5rem, min(1.5vw, 1.5vh), 0.65rem)", letterSpacing: "0.4em",
              textTransform: "uppercase", fontWeight: 500,
            }}
          >
            {"The Smile of Education".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 6 }}
                transition={{ delay: 0.35 + i * 0.025, duration: 0.25 }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
