import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const ist = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
const BARS = Array.from({ length: 28 });
const STAGES = ["Idea", "Blueprint", "Structure", "Brand", "Company"];
const FLOORS = 6;
const E = [0.16, 1, 0.3, 1];

// Looping scratch-to-company build: idea spark → blueprint → floors → lit windows → flag.
const BuildScene = ({ s }) => (
  <svg viewBox="0 0 400 150" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <line x1="20" y1="140" x2="380" y2="140" stroke="rgba(244,244,245,0.25)" />
    <motion.circle cx="200" cy="132" r="4" fill="#fff"
      animate={{ opacity: s === 0 ? [0.4, 1, 0.4] : 0.9, scale: s === 0 ? [1, 1.8, 1] : 1 }}
      transition={{ duration: 1.2, repeat: s === 0 ? Infinity : 0 }} style={{ filter: "drop-shadow(0 0 6px #fff)" }} />
    <motion.path d="M160 140 V32 H240 V140 M150 32 H250 M200 32 V20" fill="none" stroke="rgba(244,244,245,0.55)" strokeDasharray="3 4"
      initial={false} animate={{ pathLength: s >= 1 ? 1 : 0, opacity: s >= 1 ? 1 : 0 }} transition={{ duration: 1.1, ease: E }} />
    {Array.from({ length: FLOORS }).map((_, i) => (
      <motion.rect key={i} x="162" width="76" height="16" rx="1.5" y={124 - i * 18} fill="url(#floor-grad)" stroke="rgba(244,244,245,0.25)"
        initial={false} animate={{ scaleY: s >= 2 ? 1 : 0, opacity: s >= 2 ? 1 : 0 }} style={{ originY: 1, transformBox: "fill-box" }}
        transition={{ duration: 0.5, delay: s >= 2 ? i * 0.12 : 0, ease: E }} />
    ))}
    {Array.from({ length: FLOORS * 4 }).map((_, k) => {
      const f = Math.floor(k / 4), c = k % 4;
      return (
        <motion.rect key={k} x={170 + c * 17} y={129 - f * 18} width="9" height="6" rx="1" fill="#f4f4f5"
          initial={false} animate={{ opacity: s >= 3 ? [0, 1, (k * 7) % 3 ? 0.9 : 0.35] : 0 }}
          transition={{ duration: 0.6, delay: s >= 3 ? (k % 7) * 0.06 : 0 }} />
      );
    })}
    <motion.g initial={false} animate={{ opacity: s >= 4 ? 1 : 0, y: s >= 4 ? 0 : 8 }} transition={{ duration: 0.7, ease: E }}>
      <line x1="200" y1="20" x2="200" y2="4" stroke="#fff" />
      <path d="M200 4 L222 10 L200 16 Z" fill="#fff" />
      <circle cx="200" cy="70" r="70" fill="url(#glow)" />
    </motion.g>
    <defs>
      <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a3b40" /><stop offset="1" stopColor="#1a1b1e" />
      </linearGradient>
      <radialGradient id="glow"><stop offset="0" stopColor="rgba(255,255,255,0.14)" /><stop offset="1" stopColor="rgba(255,255,255,0)" /></radialGradient>
    </defs>
  </svg>
);

// Live "secure channel" panel with the build animation over breathing light bars.
export const Beacon = () => {
  const [time, setTime] = useState(ist());
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTime(ist()), 1000);
    const b = setInterval(() => setS((v) => (v + 1) % (STAGES.length + 1)), 1600);
    return () => { clearInterval(t); clearInterval(b); };
  }, []);
  const stage = Math.min(s, STAGES.length - 1);
  return (
    <div className="lumen-card relative mt-14 overflow-hidden" data-testid="contact-signal">
      <div className="relative z-10 flex items-center justify-between px-6 pt-5 font-sans text-xs text-[var(--ivory-dim)]">
        <span className="inline-flex items-center gap-2"><span className="pulse-dot" /> Secure channel open</span>
        <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[var(--grey)]" data-testid="signal-time">IST {time}</span>
      </div>
      <div className="relative h-[190px] px-6 pt-4">
        <div className="absolute inset-x-6 bottom-0 top-10 flex items-end gap-[3px] opacity-40">
          {BARS.map((_, i) => (
            <span key={i} className="signal-bar flex-1 rounded-t-full"
              style={{ animationDelay: `${((i * 137) % 1000) / -500}s`, animationDuration: `${1.4 + (i % 5) * 0.35}s` }} />
          ))}
        </div>
        <div className="absolute inset-x-6 bottom-2 top-8" data-testid="build-scene"><BuildScene s={s} /></div>
        <div className="absolute left-6 top-4 z-10 font-mono text-[0.6rem] tracking-[0.2em] text-[var(--grey)]">
          <motion.span key={stage} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-block">
            0{stage + 1} · <span className="text-[var(--ivory)]">{STAGES[stage].toUpperCase()}</span>
          </motion.span>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-[var(--line)] px-6 py-4">
        <span className="inline-flex items-center gap-2 font-sans text-sm text-[var(--ivory)]"><ShieldCheck size={15} /> NDA active</span>
        <span className="font-sans text-xs text-[var(--grey)]" data-testid="build-stage">From scratch to {STAGES[stage].toLowerCase()}</span>
      </div>
    </div>
  );
};
