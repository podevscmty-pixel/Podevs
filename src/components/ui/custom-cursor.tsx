"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: -12,
        left: -12,
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "var(--orange)",
        zIndex: 10000,
        pointerEvents: "none",
        mixBlendMode: "difference",
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
        scale: isPointer ? 2.5 : 1,
      }}
      transition={{ scale: { type: "spring", damping: 15, stiffness: 200 } }}
    />
  );
};
