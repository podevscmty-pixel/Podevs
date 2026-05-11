"use client";
import React, { useEffect, useState, useCallback } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
}

export const ScrambleText = ({ text, delay = 0, duration = 0.8 }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    let frame = 0;
    const totalFrames = duration * 60;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "." || char === "<" || char === ">" || char === "/" || char === "\n") return char;
          if (index / text.length < progress) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScrambling(true);
      scramble();
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay, scramble]);

  return <span>{displayText || (isScrambling ? "" : "")}</span>;
};
