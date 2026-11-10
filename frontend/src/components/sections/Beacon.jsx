import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ist = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });

// Coordinate beacon for the Bengaluru studio, with live local time.
export const Beacon = () => {
  const [time, setTime] = useState(ist());
  useEffect(() => {
    const t = setInterval(() => setTime(ist()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mt-14 border border-[var(--line)] bg-[rgba(16,16,17,0.6)]" data-testid="contact-beacon">
      <svg viewBox="0 0 400 180" className="h-[180px] w-full">
        <defs>
          <pattern id="beacon-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M25 0 H0 V25" fill="none" stroke="rgba(244,244,245,0.05)" />
          </pattern>
        </defs>
        <rect width="400" height="180" fill="url(#beacon-grid)" />
        <path d="M0 120 C 60 110, 90 70, 150 80 S 260 130, 300 95 S 370 60, 400 70" fill="none" stroke="rgba(244,244,245,0.1)" />
        <path d="M0 140 C 70 132, 110 96, 160 104 S 250 150, 310 120 S 370 92, 400 98" fill="none" stroke="rgba(244,244,245,0.06)" />
        <line x1="200" y1="0" x2="200" y2="180" stroke="rgba(205,209,217,0.25)" strokeDasharray="2 5" />
        <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(205,209,217,0.25)" strokeDasharray="2 5" />
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx="200" cy="90" fill="none" stroke="var(--brass)" strokeWidth="0.8"
            initial={{ r: 4, opacity: 0.8 }} animate={{ r: 70, opacity: 0 }}
            transition={{ duration: 3.6, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }} />
        ))}
        <circle cx="200" cy="90" r="3.5" fill="var(--brass)" />
      </svg>
      <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-3 font-mono text-[0.58rem] tracking-[0.24em] text-[var(--grey)]">
        <span>12.9716° N · 77.5946° E</span>
        <span className="text-[var(--brass)]" data-testid="beacon-time">IST {time}</span>
      </div>
    </div>
  );
};
