import React, { useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";

// Top progress hairline + bottom-right bearing instrument tied to page scroll.
export const ScrollCompass = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), { stiffness: 70, damping: 18 });
  const [deg, setDeg] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setDeg(Math.round(v * 360)));

  return (
    <>
      <motion.div data-testid="scroll-progress" style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-[var(--brass)]" />
      <div data-testid="scroll-compass" className="pointer-events-none fixed bottom-8 right-8 z-40 hidden items-center gap-4 lg:flex">
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey)]">
          BRG <span className="text-[var(--brass)]">{String(deg).padStart(3, "0")}°</span>
        </span>
        <div className="relative h-14 w-14 rounded-full border border-[var(--line)] bg-[rgba(10,10,11,0.7)] backdrop-blur-md">
          <svg viewBox="-30 -30 60 60" className="absolute inset-0 h-full w-full">
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * Math.PI) / 12;
              const r1 = i % 6 === 0 ? 21 : 24;
              return <line key={i} x1={Math.sin(a) * r1} y1={-Math.cos(a) * r1} x2={Math.sin(a) * 27} y2={-Math.cos(a) * 27}
                stroke={i === 0 ? "var(--brass)" : "rgba(242,238,228,0.25)"} strokeWidth="0.8" />;
            })}
          </svg>
          <motion.svg style={{ rotate }} viewBox="-30 -30 60 60" className="absolute inset-0 h-full w-full">
            <path d="M0 -17 L3 0 L0 17 L-3 0 Z" fill="var(--ivory)" opacity="0.9" />
            <path d="M0 -17 L3 0 L-3 0 Z" fill="var(--brass)" />
          </motion.svg>
        </div>
      </div>
    </>
  );
};
