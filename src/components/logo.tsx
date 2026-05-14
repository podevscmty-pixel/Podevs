import Image from "next/image";

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Image
        src="/logo.svg"
        alt="PODEVS Logo"
        width={44}
        height={44}
        priority
        className="logo-glow"
        style={{ objectFit: "contain", height: 38, width: 38 }}
      />
      <span
        style={{
          fontFamily: "var(--font-bruno), sans-serif",
          fontSize: "1.1rem",
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: "var(--text)",
          lineHeight: 1,
          textTransform: "uppercase",
          textShadow: "0 0 15px rgba(var(--bg-rgb), 0.5)",
        }}
      >
        <span style={{
          color: "var(--orange)",
          textShadow: "0 0 12px rgba(255, 138, 0, 0.5), 0 0 25px rgba(255, 138, 0, 0.2)"
        }}>P</span>ODEVS
      </span>
    </div>
  );
}
