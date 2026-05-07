"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import * as React from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 rounded-md flex items-center justify-center transition-colors hover:bg-[var(--bg2)]"
      style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
