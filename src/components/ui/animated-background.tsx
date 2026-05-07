"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[var(--bg)]">
      {/* Vibrant Mesh Gradients */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[80vw] aspect-square rounded-full blur-[150px] opacity-[0.15] dark:opacity-[0.25]"
        style={{ background: "radial-gradient(circle, var(--orange) 0%, transparent 70%)" }}
      />
      
      <motion.div
        animate={{
          x: ["20%", "-20%", "20%"],
          y: ["20%", "-20%", "20%"],
          scale: [1.5, 1, 1.5],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-20%] w-[70vw] aspect-square rounded-full blur-[120px] opacity-[0.12] dark:opacity-[0.2]"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
      />

      <motion.div
        animate={{
          x: ["-30%", "30%", "-30%"],
          y: ["30%", "-30%", "30%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[40vw] aspect-square rounded-full blur-[100px] opacity-[0.08] dark:opacity-[0.15]"
        style={{ background: "radial-gradient(circle, #ff4d00 0%, transparent 70%)" }}
      />


      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />
    </div>
  );
}
