import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../fx/Reveal";
import { useIsDesktop } from "../fx/hooks";

const TAGS = ["(validate)", "(architect)", "(position)", "(scale)", "(raise)"];
const XS = [120, 360, 600, 840, 1080];
const CY = 230, RX = 108, RY = 192;

const Arc = ({ i, progress }) => {
  const len = useTransform(progress, [0.05 + i * 0.1, 0.35 + i * 0.1], [0, 1]);
  const x = XS[i];
  const top = i % 2 === 0;
  return (
    <>
      <ellipse cx={x} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(244,244,245,0.22)" strokeDasharray="1.5 6" />
      <motion.path d={`M${x - RX} ${CY} A${RX} ${RY} 0 0 ${top ? 1 : 0} ${x + RX} ${CY}`} fill="none" stroke="url(#arc-grad)"
        strokeWidth="5" strokeLinecap="round" style={{ pathLength: len }} filter="url(#arc-glow)" />
      <circle cx={x - RX} cy={CY} r="5" fill="#f4f4f5" />
      <circle cx={x + RX} cy={CY} r="5" fill="#f4f4f5" />
    </>
  );
};

const DesktopJourney = ({ services }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const dot = useTransform(scrollYProgress, [0, 1], [12, 1188]);
  return (
    <div ref={ref} className="relative aspect-[1200/460] w-full">
      <span className="pointer-events-none absolute inset-0 grid place-items-center font-sans text-[12rem] font-light tracking-tight text-[rgba(244,244,245,0.035)]">Journey</span>
      <svg viewBox="0 0 1200 460" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a5c63" /><stop offset="0.5" stopColor="#d4d6dc" /><stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <line x1="0" y1={CY} x2="1200" y2={CY} stroke="rgba(244,244,245,0.3)" strokeDasharray="2 6" />
        {XS.map((_, i) => <Arc key={i} i={i} progress={scrollYProgress} />)}
        <motion.circle cy={CY} r="7" fill="#fff" cx={dot} filter="url(#arc-glow)" />
      </svg>
      {services.map((s, i) => (
        <Link key={s.slug} to={`/services/${s.slug}`} data-testid={`journey-step-${s.no}`} data-cursor="OPEN"
          className="journey-step group absolute top-0 flex h-full -translate-x-1/2 flex-col items-center justify-between py-[3%]"
          style={{ left: `${(XS[i] / 1200) * 100}%`, width: `${((RX * 2) / 1200) * 100}%` }}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgba(244,244,245,0.2)] bg-[rgba(7,7,8,0.8)] font-mono text-[0.7rem] text-[var(--ivory-dim)] transition-colors group-hover:border-white group-hover:text-white">{i + 1}</span>
          <span className="vertical-label font-sans text-[1.45vw] font-medium leading-none text-[var(--ivory-dim)] transition-colors duration-500 group-hover:text-white 2xl:text-[1.6rem]">
            {s.name.charAt(0) + s.name.slice(1).toLowerCase()}
          </span>
          <span className="flex flex-col items-center gap-2">
            <span className="font-sans text-[0.7rem] text-[var(--grey)]">{TAGS[i]}</span>
            <ArrowUpRight size={14} className="text-[var(--grey-2)] transition-colors group-hover:text-white" />
          </span>
        </Link>
      ))}
    </div>
  );
};

const MobileJourney = ({ services }) => (
  <div className="relative pl-10">
    <span className="absolute bottom-6 left-[15px] top-6 w-px bg-gradient-to-b from-transparent via-[rgba(244,244,245,0.5)] to-transparent" />
    {services.map((s, i) => (
      <Reveal key={s.slug} delay={i * 0.05}>
        <Link to={`/services/${s.slug}`} data-testid={`journey-step-${s.no}`} className="relative mb-4 block rounded-[22px] border border-[var(--line)] bg-[rgba(14,14,16,0.8)] p-5">
          <span className="absolute -left-[33px] top-6 grid h-7 w-7 place-items-center rounded-full border border-[rgba(244,244,245,0.3)] bg-[var(--ink)] font-mono text-[0.6rem]">{i + 1}</span>
          <div className="flex items-center justify-between">
            <span className="font-sans text-2xl text-[var(--ivory)]">{s.name.charAt(0) + s.name.slice(1).toLowerCase()}</span>
            <ArrowUpRight size={16} className="text-[var(--grey)]" />
          </div>
          <p className="mt-2 font-sans text-sm text-[var(--grey)]">{s.desc}</p>
        </Link>
      </Reveal>
    ))}
  </div>
);

export const Journey = ({ services, id = "services" }) => {
  const desktop = useIsDesktop();
  return (
    <section id={id} className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32" data-testid="journey">
      <div className="lumen-card relative overflow-hidden px-6 py-12 md:px-12 md:py-14">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(205,209,217,0.12), transparent 60%)" }} />
        <div className="relative mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><span className="eyebrow">Services</span></Reveal>
            <Reveal delay={0.05}><h2 className="display mt-5 text-4xl md:text-6xl">Five stages. <span className="text-shine">One journey.</span></h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-[var(--grey)]">
              From the first question to the moment capital says yes — every stage NDA-secured.
            </p>
          </Reveal>
        </div>
        <div className="relative">{desktop ? <DesktopJourney services={services} /> : <MobileJourney services={services} />}</div>
        <div className="relative mt-10 flex flex-col items-start justify-between gap-6 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey-2)] md:flex-row md:items-center">
          <span>IDEA → CAPITAL</span>
          <Link to="/services" data-testid="journey-all-services" className="pill-dark font-sans text-xs tracking-normal">Explore all services <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
};
