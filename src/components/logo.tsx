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
          fontSize: "1.3rem",
          fontWeight: 800,
          letterSpacing: "0.03em",
          color: "var(--text)",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "var(--orange)" }}>P</span>ODEVS
      </span>
    </div>
  );
}
