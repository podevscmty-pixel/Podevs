"use client";
import * as React from "react";

const items = ["Workshops", "Hackathons", "YouTube Learning", "Web Dev Services", "Community Events", "Hosting", "Student Support", "Deployment"];
const doubled = [...items, ...items];

export function Marquee() {
  return (
    <div style={{ 
      overflow: "hidden", 
      borderTop: "1px solid var(--border)", 
      borderBottom: "1px solid var(--border)", 
      padding: "20px 0", 
      background: "var(--bg2)",
      position: "relative",
      maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
    }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; gap: 32px; width: max-content; animation: marquee 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 10, 
            padding: "8px 20px", 
            borderRadius: 100, 
            border: "1px solid var(--border)", 
            background: "rgba(255,255,255,0.02)", 
            fontSize: "0.8rem", 
            fontWeight: 600, 
            color: "var(--text)", 
            whiteSpace: "nowrap",
            letterSpacing: "0.02em"
          }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)", boxShadow: "0 0 6px var(--orange)" }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
