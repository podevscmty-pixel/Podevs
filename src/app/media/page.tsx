"use client";
import * as React from "react";

const videos = [
  { id: "dQw4w9WgXcQ", title: "Build a Portfolio Website in 60 Minutes", views: "12K views · 3 weeks ago" },
  { id: "9bZkp7q19f0", title: "React Hooks Explained Simply", views: "8.4K views · 1 month ago" },
  { id: "FTQbiNvZqaY", title: "Deploy Your First App on Vercel", views: "5.2K views · 2 months ago" },
  { id: "rfscVS0vtbw", title: "CSS Grid & Flexbox in 20 Minutes", views: "7.1K views · 2 months ago" },
  { id: "SqcY0GlETPk", title: "Git Crash Course for Students", views: "9.8K views · 3 months ago" },
  { id: "w7ejDZ8SWv8", title: "JavaScript Async/Await Explained", views: "6.3K views · 4 months ago" },
];

const featured = videos[0];

export default function MediaPage() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{ padding: "60px 0 48px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          <span className="section-label">YouTube & Media</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16 }}>Learn on <span style={{ color: "var(--orange)" }}>YouTube</span></h1>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 520, marginBottom: 24 }}>Practical, no-fluff tutorials made by students, for students. Subscribe and level up your skills.</p>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.875rem" }}>Subscribe on YouTube →</a>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>
          {/* Featured */}
          <div style={{ marginBottom: 48 }}>
            <span className="section-label">Most Watched</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 20 }}>Featured Video</h2>
            <div className="card-static" style={{ overflow: "hidden", borderRadius: 14 }}>
              {loaded ? (
                <div style={{ position: "relative", aspectRatio: "16/9" }}>
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${featured.id}?autoplay=1`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0 }}
                  />
                </div>
              ) : (
                <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--bg2)", cursor: "pointer", overflow: "hidden" }} onClick={() => setLoaded(true)}>
                  <img src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 4l14 8-14 8V4z" fill="#fff" /></svg>
                    </div>
                    <p style={{ color: "#fff", fontSize: "0.875rem", textAlign: "center" }}>{featured.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          <span className="section-label">All Videos</span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 24 }}>Video Library</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {videos.map((v) => (
              <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "block", overflow: "hidden", textDecoration: "none" }}>
                <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--bg2)", overflow: "hidden" }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2l9 5-9 5V2z" fill="#fff" /></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <p style={{ fontWeight: 500, fontSize: "0.875rem", marginBottom: 4, lineHeight: 1.35 }}>{v.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{v.views}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
