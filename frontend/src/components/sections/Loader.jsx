import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mark, Wordmark } from "../Compass";
import { EASE } from "../fx/Reveal";

const C = 2 * Math.PI * 70;

export const Loader = ({ done }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 1750, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div data-testid="loader" className="fixed inset-0 z-[100]" exit={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-[var(--ink)]" exit={{ y: "-100%" }} transition={{ duration: 1.1, ease: EASE, delay: 0.15 }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--ink)]" exit={{ y: "100%" }} transition={{ duration: 1.1, ease: EASE, delay: 0.15 }} />
          <motion.div className="absolute left-0 top-1/2 h-px w-full origin-left bg-[var(--brass)]"
            initial={{ scaleX: 0 }} animate={{ scaleX: n / 100 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
          <motion.div className="absolute inset-0 grid place-items-center" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.45 }}>
            <div className="flex flex-col items-center gap-7">
              <div className="relative grid h-40 w-40 place-items-center rounded-full bg-[var(--ink)]">
                <svg viewBox="-80 -80 160 160" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle r="70" fill="none" stroke="var(--line)" strokeWidth="1" />
                  <circle r="70" fill="none" stroke="var(--brass)" strokeWidth="1" strokeDasharray={C} strokeDashoffset={C * (1 - n / 100)} />
                </svg>
                <motion.div initial={{ rotate: -120, scale: 0.6, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: EASE }}>
                  <Mark size={52} />
                </motion.div>
              </div>
              <Wordmark height={12} />
              <div className="flex items-baseline gap-4 bg-[var(--ink)] px-4">
                <span className="font-serif text-5xl italic tabular-nums text-[var(--ivory)]">{String(n).padStart(3, "0")}</span>
                <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey)]">CALIBRATING TRUE NORTH</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
