import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Mark } from "../Compass";
import { Letters, EASE } from "../fx/Reveal";
import { Magnetic } from "../fx/Magnetic";
import { useFinePointer } from "../fx/hooks";

// Heights (%) form a valley so the headline sits in darkness.
const COLS = [94, 82, 70, 56, 44, 34, 27, 24, 28, 37, 49, 62, 76, 90];
const CHIPS = [
  { label: "NDA Secured", x: "6%", y: "74%", d: 0 },
  { label: "Confidential", x: "30%", y: "60%", d: 1.2, md: true },
  { label: "Validated", x: "72%", y: "46%", d: 0.6, md: true },
  { label: "Execution-ready", x: "62%", y: "80%", d: 1.8 },
  { label: "Investor-ready", x: "84%", y: "66%", d: 2.4, md: true },
  { label: "Private by design", x: "16%", y: "88%", d: 0.9, md: true },
];
const NODES = [[12, 52], [24, 70], [41, 58], [57, 66], [79, 54], [90, 82], [47, 86], [69, 92]];

const Chip = ({ c, ready }) => (
  <motion.div initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4 + c.d * 0.25, duration: 1, ease: EASE }}
    className={`absolute ${c.md ? "hidden md:block" : ""}`} style={{ left: c.x, top: c.y }}>
    <div className="chip-float" style={{ animationDelay: `${c.d}s` }}>
      <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 font-sans text-[0.68rem] text-[var(--ivory-dim)]">
        <span className="pulse-dot" />{c.label}
      </span>
    </div>
  </motion.div>
);

const Orb = ({ ready }) => (
  <motion.div initial={{ opacity: 0, scale: 0.6, y: 40 }} animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
    transition={{ delay: 0.9, duration: 1.8, ease: EASE }}
    className="relative mt-14 md:mt-16" data-testid="hero-orb">
    <div className="orb">
      <span className="orb-ring" />
      <span className="orb-core grid place-items-center"><Mark size={46} /></span>
    </div>
  </motion.div>
);

export const HeroLumen = ({ ready = true, onStart }) => {
  const fine = useFinePointer();
  const mx = useSpring(0, { stiffness: 40, damping: 16 });
  const { scrollY } = useScroll();
  const colY = useTransform(scrollY, [0, 900], [0, 260]);
  const textY = useTransform(scrollY, [0, 900], [0, -160]);
  const fade = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    if (!fine) return;
    const on = (e) => mx.set(((e.clientX / window.innerWidth) - 0.5) * -40);
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [fine, mx]);

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden pb-16" data-testid="hero">
      <motion.div style={{ x: mx, y: colY }} className="absolute inset-x-[-40px] bottom-0 top-0 flex">
        {COLS.map((h, i) => (
          <div key={i} className={`relative flex-1 border-l border-[rgba(244,244,245,0.035)] ${i % 2 ? "hidden md:block" : ""}`}>
            <motion.div initial={{ scaleY: 0 }} animate={ready ? { scaleY: 1 } : {}} transition={{ delay: 0.15 + Math.abs(i - 6.5) * 0.06, duration: 1.8, ease: EASE }}
              className="absolute inset-x-0 bottom-0 origin-bottom" style={{ height: `${h}%` }}>
              <div className="lumen-col h-full w-full" style={{ animationDelay: `${(i % 5) * -1.3}s`, animationDuration: `${6 + (i % 4)}s` }} />
            </motion.div>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, var(--ink) 0%, rgba(7,7,8,0.85) 22%, rgba(7,7,8,0) 55%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(0deg, var(--ink), transparent)" }} />
      <div className="scan-line pointer-events-none absolute inset-x-0 h-px" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {NODES.map(([x, y], i) => (
          <g key={i} className="twinkle" style={{ animationDelay: `${i * 0.7}s` }}>
            <circle cx={`${x}%`} cy={`${y}%`} r="5" fill="none" stroke="rgba(244,244,245,0.35)" />
            <circle cx={`${x}%`} cy={`${y}%`} r="1.6" fill="rgba(244,244,245,0.9)" />
          </g>
        ))}
      </svg>

      {CHIPS.map((c) => <Chip key={c.label} c={c} ready={ready} />)}

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-32 text-center md:pt-36">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="glass-pill mb-10 inline-flex items-center gap-1 p-1 pr-4" data-testid="hero-nda-chip">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ivory)] px-3 py-1 font-sans text-[0.65rem] font-medium text-[var(--ink)]">
            <ShieldCheck size={12} /> NDA-secured
          </span>
          <span className="ml-2 font-sans text-[0.7rem] text-[var(--ivory-dim)]">Venture Creation Company</span>
        </motion.div>

        <h1 className="display text-[13vw] leading-[0.98] sm:text-7xl lg:text-[6.6rem]">
          <span className="block"><Letters text="Direction Before" show={ready} delay={0.35} stagger={0.025} /></span>
          <span className="block text-shine"><Letters text="Execution." show={ready} delay={0.75} stagger={0.03} /></span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 1, ease: EASE }}
          className="mt-8 max-w-xl font-sans text-base leading-relaxed text-[var(--grey)] md:text-lg">
          We help founders transform ideas into enduring businesses through strategic
          direction, execution-ready blueprints, growth systems and investment readiness.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3, duration: 1, ease: EASE }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Magnetic className="w-full sm:w-auto">
            <button data-testid="hero-start" data-cursor="BEGIN" onClick={onStart} className="pill-light group w-full sm:w-auto">
              Start Building <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
            </button>
          </Magnetic>
          <button data-testid="hero-book" onClick={onStart} className="pill-dark w-full sm:w-auto">Book Strategy Call</button>
        </motion.div>
        <Orb ready={ready} />
      </motion.div>
    </section>
  );
};
