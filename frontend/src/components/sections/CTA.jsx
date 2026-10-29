import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Star } from "../Compass";
import { Reveal } from "../fx/Reveal";
import { Magnetic } from "../fx/Magnetic";

const RINGS = Array.from({ length: 10 }).map((_, i) => 70 + i * 52);

// Horizon of concentric rings that expand and turn as the section passes.
export const CTA = ({ onStart }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.25]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  return (
    <section ref={ref} className="relative overflow-hidden border-y border-[var(--line)]" data-testid="cta">
      <motion.div style={{ scale, rotate }} className="pointer-events-none absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="-560 -560 1120 1120" className="h-full w-full">
          {RINGS.map((r, i) => (
            <circle key={r} r={r} fill="none" stroke={i % 3 === 2 ? "rgba(184,148,95,0.42)" : "rgba(242,238,228,0.1)"} strokeDasharray={i % 2 ? "2 8" : undefined} />
          ))}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * Math.PI) / 18;
            return <line key={i} x1={Math.sin(a) * 120} y1={-Math.cos(a) * 120} x2={Math.sin(a) * 540} y2={-Math.cos(a) * 540} stroke="rgba(242,238,228,0.035)" />;
          })}
        </svg>
      </motion.div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(10,10,11,0.2) 0%, var(--ink) 72%)" }} />
      <div className="relative mx-auto max-w-[1300px] px-6 py-32 text-center md:px-12 md:py-56">
        <Reveal><div className="spin-slow mx-auto mb-12 w-fit"><Star size={34} color="var(--brass)" /></div></Reveal>
        <Reveal delay={0.05}>
          <h2 className="serif-display mx-auto max-w-5xl text-5xl md:text-7xl lg:text-[6rem]">
            Every great company begins with the right direction.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 font-serif text-2xl italic text-[var(--brass)] md:text-3xl">Direction · Clarity · Conviction · Precision</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Magnetic className="mt-14">
            <button data-testid="cta-start" data-cursor="BEGIN" onClick={onStart}
              className="btn-ghost btn-fill inline-flex items-center gap-3 border border-[var(--ivory)] px-12 py-5 font-sans text-xs tracking-[0.24em]">
              <span>START BUILDING</span>
              <ArrowUpRight size={15} className="relative z-[1]" />
            </button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
};
