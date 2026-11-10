import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal, EASE } from "../fx/Reveal";
import { useFinePointer } from "../fx/hooks";

export const NDA_PILLARS = [
  { n: "01", title: "NDA before you speak", text: "Our built-in NDA covers everything you share — from your very first message." },
  { n: "02", title: "Private by design", text: "Your submissions stay with the SYMSTRUO team. Never sold, never shared." },
  { n: "03", title: "Your idea stays yours", text: "You keep full ownership of every idea, plan and document you bring to us." },
];

// Glossy rounded tile with a bottom-lit numeral; tilts toward the cursor.
export const GlowTile = ({ n, size = "md", testid }) => {
  const ref = useRef(null);
  const fine = useFinePointer();
  const rx = useSpring(0, { stiffness: 120, damping: 14 });
  const ry = useSpring(0, { stiffness: 120, damping: 14 });
  const move = (e) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <div style={{ perspective: 800 }} className="relative mx-auto w-fit">
      <span className="tile-badge"><ShieldCheck size={13} /></span>
      <motion.div ref={ref} data-testid={testid} onMouseMove={move} onMouseLeave={leave} style={{ rotateX: rx, rotateY: ry }}
        className={`glow-tile ${size === "sm" ? "glow-tile-sm" : ""}`}>
        <span className="glow-num">{n}</span>
      </motion.div>
    </div>
  );
};

export const NdaVault = () => (
  <section id="nda" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36" data-testid="nda-section">
    <div className="lumen-card relative overflow-hidden px-6 py-16 md:px-16 md:py-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(ellipse, rgba(205,209,217,0.16), transparent 65%)" }} />
      <div className="relative flex items-center justify-between font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey-2)]">
        <span>CONFIDENTIAL BY DEFAULT</span><span>SYMSTRUO × FOUNDERS</span>
      </div>
      <div className="relative mx-auto mt-12 max-w-3xl text-center">
        <Reveal><h2 className="display text-4xl md:text-6xl">Your idea is NDA-secured <span className="text-shine">from the first message.</span></h2></Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-[var(--grey)]">
            Founders share their most valuable thinking with us. That is why every conversation
            with SYMSTRUO is protected by our built-in NDA.
          </p>
        </Reveal>
      </div>
      <div className="relative mt-20 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
        {NDA_PILLARS.map((p, i) => (
          <motion.div key={p.n} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: EASE }} className={`text-center ${i === 1 ? "md:mt-20" : ""}`}>
            <GlowTile n={p.n} testid={`nda-tile-${i}`} />
            <h3 className="mt-8 font-sans text-xl font-normal text-[var(--ivory)] md:text-2xl">{p.title}</h3>
            <p className="mx-auto mt-3 max-w-[18rem] font-sans text-sm leading-relaxed text-[var(--grey)]">{p.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="relative mt-16 flex justify-center">
        <Link to="/nda" data-testid="nda-learn-more" data-cursor="READ" className="pill-dark">
          How our NDA works <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  </section>
);
