import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "../Compass";
import { Reveal } from "../fx/Reveal";

const MANIFESTO = [
  { n: "01", text: ["Every successful company", "begins with the", "right direction."] },
  { n: "02", text: ["Execution without", "direction is", "expensive."] },
  { n: "03", text: ["We don't sell consulting.", "We create", "businesses."] },
];
const VALUES = ["Direction", "Clarity", "Conviction", "Precision", "Purpose", "Long-term Thinking"];

const Word = ({ children, progress, range, italic }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.24em] inline-block ${italic ? "italic text-[var(--grey)]" : ""}`}>
      {children}
    </motion.span>
  );
};

const Statement = ({ m, idx }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const numY = useTransform(scrollYProgress, [0, 1], [90, -60]);
  const words = m.text.flatMap((line, li) => line.split(" ").map((w) => ({ w, li })));
  const total = words.length;
  let k = -1;
  return (
    <div ref={ref} data-testid={`manifesto-${m.n}`} className={`relative flex ${idx % 2 ? "md:justify-end" : ""}`}>
      <motion.span style={{ y: numY }} aria-hidden="true"
        className={`outline-numeral pointer-events-none absolute -top-16 select-none font-serif text-[46vw] leading-none md:-top-28 md:text-[22rem] ${idx % 2 ? "right-0 md:right-auto md:left-[8%]" : "right-0 md:right-[6%]"}`}>
        {m.n}
      </motion.span>
      <div className="relative max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-[var(--brass)]">{m.n} / 03</span>
          <span className="h-px w-16 bg-[var(--line)]" />
        </div>
        <h2 className="serif-display text-[11vw] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.4rem]" aria-label={m.text.join(" ")}>
          {m.text.map((line, li) => (
            <span key={li} className="block" aria-hidden="true">
              {line.split(" ").map((w) => {
                k += 1;
                return <Word key={k} progress={scrollYProgress} range={[k / total, (k + 1) / total]} italic={li === m.text.length - 1}>{w}</Word>;
              })}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};

const ValuesRose = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  const counter = useTransform(rotate, (r) => -r);
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px]" data-testid="values-rose">
      <motion.div style={{ rotate }} className="absolute inset-0">
        <svg viewBox="-220 -220 440 440" className="h-full w-full">
          <circle r="196" fill="none" stroke="var(--line)" />
          <circle r="140" fill="none" stroke="rgba(184,148,95,0.3)" strokeDasharray="1 5" />
          <circle r="60" fill="none" stroke="rgba(242,238,228,0.08)" />
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i * Math.PI) / 36;
            const r1 = i % 6 === 0 ? 184 : 190;
            return <line key={`t${i}`} x1={Math.sin(a) * r1} y1={-Math.cos(a) * r1} x2={Math.sin(a) * 196} y2={-Math.cos(a) * 196} stroke="rgba(184,148,95,0.4)" strokeWidth="0.6" />;
          })}
          {VALUES.map((v, i) => {
            const a = (i * Math.PI) / 3;
            return (
              <g key={v}>
                <line x1={Math.sin(a) * 60} y1={-Math.cos(a) * 60} x2={Math.sin(a) * 140} y2={-Math.cos(a) * 140} stroke="rgba(242,238,228,0.14)" />
                <circle cx={Math.sin(a) * 140} cy={-Math.cos(a) * 140} r="3" fill="var(--brass)" />
              </g>
            );
          })}
        </svg>
        {VALUES.map((v, i) => {
          const a = (i * Math.PI) / 3;
          return (
            <span key={v} className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + Math.sin(a) * 37.5}%`, top: `${50 - Math.cos(a) * 37.5}%` }}>
              <motion.span style={{ rotate: counter }}
                className="block whitespace-nowrap bg-[var(--ink)] px-2 font-serif text-base italic text-[var(--ivory)] md:text-xl">
                {v}
              </motion.span>
            </span>
          );
        })}
      </motion.div>
      <motion.div style={{ rotate: counter }} className="absolute inset-0 grid place-items-center">
        <Star size={70} color="var(--brass)" />
      </motion.div>
    </div>
  );
};

export const Manifesto = () => (
  <section id="manifesto" className="relative mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-40" data-testid="manifesto">
    <Reveal>
      <div className="mb-28 flex items-center gap-4">
        <Star size={14} color="var(--brass)" />
        <span className="eyebrow">The Manifesto</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="eyebrow">The Philosophy</span>
      </div>
    </Reveal>

    <div className="space-y-40 md:space-y-56">
      {MANIFESTO.map((m, idx) => <Statement key={m.n} m={m} idx={idx} />)}
    </div>

    <div className="mt-40 grid grid-cols-1 items-center gap-16 border-t border-[var(--line)] pt-20 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Reveal><p className="eyebrow mb-10">The compass points to six things</p></Reveal>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-5">
          {VALUES.map((v, i) => (
            <Reveal key={v} delay={i * 0.05}>
              <li className="flex items-baseline gap-4 border-b border-[var(--line)] pb-4">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--brass)]">{String(i * 60).padStart(3, "0")}°</span>
                <span className="font-serif text-2xl text-[var(--ivory)] md:text-3xl">{v}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="mt-16 max-w-2xl font-serif text-2xl italic leading-snug text-[var(--ivory-dim)] md:text-3xl">
            We don't build for applause.
            <span className="text-[var(--brass)]"> We build for endurance.</span>
          </p>
        </Reveal>
      </div>
      <div className="lg:col-span-6"><ValuesRose /></div>
    </div>
  </section>
);
