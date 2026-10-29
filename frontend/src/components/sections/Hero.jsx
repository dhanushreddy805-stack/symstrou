import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Compass } from "../Compass";
import { Letters, EASE } from "../fx/Reveal";
import { Magnetic } from "../fx/Magnetic";

const LABELS = ["Direction", "Validation", "Blueprint", "Growth", "Legacy"];
const BEARINGS = [36, 108, 180, 252, 324];

export const Hero = ({ ready = true, onStart }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const needleRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (held) return;
    const t = setInterval(() => setActive((a) => (a + 1) % LABELS.length), 3200);
    return () => clearInterval(t);
  }, [held]);

  const select = (i) => { setHeld(true); setActive(i); };

  return (
    <section id="home" ref={ref} className="relative min-h-screen w-full overflow-hidden pt-28" data-testid="hero">
      <div className="pointer-events-none absolute right-[-20vw] top-1/2 h-[110vh] w-[110vh] -translate-y-1/2 rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(184,148,95,0.09) 0%, rgba(10,10,11,0) 62%)" }} />
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-6 pb-28 md:px-12 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: textY, opacity: fade }} className="relative lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 1 }}
            className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--brass)]" />
            <span className="eyebrow">Venture Creation Company</span>
          </motion.div>

          <h1 className="serif-display text-[17vw] leading-[0.88] sm:text-8xl lg:text-[7.5rem] xl:text-[9rem]">
            <span className="block"><Letters text="Direction" show={ready} delay={0.25} /></span>
            <span className="flex items-center gap-5">
              <span className="italic text-[var(--grey)]"><Letters text="Before" show={ready} delay={0.5} /></span>
              <motion.span className="hidden h-px flex-1 origin-left bg-[var(--brass)] sm:block" initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : {}} transition={{ duration: 1.4, delay: 0.9, ease: EASE }} />
              <motion.span aria-hidden="true" className="hidden font-mono text-[0.6rem] tracking-[0.3em] text-[var(--brass)] sm:block"
                initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}>
                {String(BEARINGS[active]).padStart(3, "0")}°
              </motion.span>
            </span>
            <span className="block"><Letters text="Execution." show={ready} delay={0.7} /></span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 1, ease: EASE }}
            className="mt-10 max-w-xl font-sans text-base leading-relaxed text-[var(--ivory-dim)] md:text-lg">
            We help founders transform ideas into enduring businesses through strategic
            direction, execution-ready blueprints, growth systems and investment readiness.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3, duration: 1, ease: EASE }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <button data-testid="hero-start" data-cursor="BEGIN" onClick={onStart}
                className="btn-ghost btn-fill group flex w-full items-center justify-center gap-3 border border-[var(--ivory)] px-9 py-4 font-sans text-xs tracking-[0.24em] sm:w-auto">
                <span>START BUILDING</span>
                <ArrowUpRight size={15} className="relative z-[1] transition-transform duration-500 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <button data-testid="hero-book" onClick={onStart}
              className="link-underline flex items-center justify-center gap-3 px-2 py-4 font-sans text-xs tracking-[0.24em] text-[var(--ivory-dim)] sm:justify-start">
              BOOK STRATEGY CALL
            </button>
          </motion.div>
        </motion.div>

        <div className="relative flex flex-col items-center lg:col-span-5">
          <Compass size={480} needleRotate={needleRotate} labels={LABELS} bearings={BEARINGS} active={active} onSelect={select} show={ready} />
          <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.8, duration: 1 }}
            className="mt-6 flex w-full max-w-[420px] items-center justify-between border-t border-[var(--line)] pt-4" data-testid="hero-readout">
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey)]">BEARING</span>
            <motion.span key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
              className="font-serif text-2xl italic text-[var(--ivory)]">
              {LABELS[active]}
            </motion.span>
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--brass)]">0{active + 1} / 05</span>
          </motion.div>
          <div className="absolute top-1/2 hidden -translate-y-[60%] flex-col gap-4 lg:-right-6 lg:flex xl:-right-24">
            {LABELS.map((l, i) => (
              <motion.button key={l} data-testid={`hero-label-${i}`} onMouseEnter={() => select(i)} onClick={() => select(i)}
                initial={{ opacity: 0, x: 20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.3 + i * 0.1, duration: 0.9, ease: EASE }}
                className="group flex items-center gap-3 text-left">
                <span className={`h-px transition-all duration-500 ${active === i ? "w-14 bg-[var(--brass)]" : "w-8 bg-[var(--line)]"}`} />
                <span className={`font-sans text-[0.68rem] tracking-[0.3em] transition-colors duration-500 ${active === i ? "text-[var(--ivory)]" : "text-[var(--grey)]"}`}>
                  {l.toUpperCase()}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 left-0 flex w-full items-center justify-between px-6 font-sans text-[0.65rem] tracking-[0.35em] text-[var(--grey-2)] md:px-12 lg:pr-48">
        <span className="text-[var(--brass)]">+89° 15′</span>
        <span className="flex items-center gap-4">DIRECTION · CLARITY <span className="scroll-cue hidden sm:block" /></span>
        <span className="hidden sm:block">TRUE NORTH</span>
      </motion.div>
    </section>
  );
};
