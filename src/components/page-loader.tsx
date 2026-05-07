"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && 
          anchor.href && 
          anchor.href.startsWith(window.location.origin) && 
          !anchor.href.includes("#") &&
          anchor.target !== "_blank") {
        setLoading(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.7 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ 
            scaleX: { duration: 1, ease: "easeOut" },
            opacity: { duration: 0.3, delay: 0.2 }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "1.5px", // Razor-thin and professional
            background: "var(--orange)",
            zIndex: 9999,
            transformOrigin: "0%",
            boxShadow: "0 0 8px rgba(255,138,0,0.3)"
          }}
        />
      )}
    </AnimatePresence>
  );
}
