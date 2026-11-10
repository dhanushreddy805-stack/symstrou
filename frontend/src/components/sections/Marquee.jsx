import React from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

const WORDS = ["Direction", "Validation", "Built-in NDA", "Execution", "Growth", "Investment"];

// Two counter-moving ribbons that skew with scroll velocity.
export const Marquee = () => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 2500], [-7, 7]), { stiffness: 220, damping: 40 });
  const set = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] py-10" data-testid="marquee">
      <motion.div style={{ skewX: skew }}>
        <div className="marquee-track">
          {set.map((w, i) => (
            <span key={i} className="outline-text mx-8 inline-flex items-center gap-8 font-sans text-4xl font-light uppercase tracking-[0.18em] md:text-6xl">
              {w} <span className="font-mono text-xs tracking-[0.3em] text-[var(--brass)]" style={{ WebkitTextStroke: 0 }}>{String((i % 6) * 60).padStart(3, "0")}°</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
