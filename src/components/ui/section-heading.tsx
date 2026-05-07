"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col gap-3",
        isCenter && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted text-lg leading-relaxed",
            isCenter && "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
