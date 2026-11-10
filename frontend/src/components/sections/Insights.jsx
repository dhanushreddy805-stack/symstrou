import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { INSIGHTS } from "../../data/insights";
import { Reveal } from "../fx/Reveal";
import { useIsDesktop } from "../fx/hooks";

const seeded = (str) => {
  let h = [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; };
};

// Unique constellation per article, drawn from its slug.
const Constellation = ({ seed }) => {
  const rnd = seeded(seed);
  const pts = Array.from({ length: 7 }).map(() => [20 + rnd() * 260, 16 + rnd() * 108]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [sx, sy] = pts[Math.floor(rnd() * pts.length)];
  return (
    <svg viewBox="0 0 300 140" className="h-full w-full" aria-hidden="true">
      <circle cx={sx} cy={sy} r="26" fill="none" stroke="rgba(205,209,217,0.25)" strokeDasharray="1 4" />
      <path d={d} fill="none" stroke="rgba(244,244,245,0.28)" strokeWidth="0.8" className="constellation-line" pathLength="1" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" fill="rgba(244,244,245,0.7)" />)}
      <path transform={`translate(${sx} ${sy}) scale(0.07)`} d="M0 -122 C 2.4 -26, 15 -3.4, 108 0 C 15 3.4, 2.4 26, 0 122 C -2.4 26, -15 3.4, -108 0 C -15 -3.4, -2.4 -26, 0 -122 Z" fill="var(--brass)" />
    </svg>
  );
};

export const InsightCard = ({ a, i, className = "" }) => (
  <Link to={`/insights/${a.slug}`} data-testid={`insight-${i}`} data-cursor="READ"
    className={`insight-card group relative flex flex-col rounded-[24px] justify-between overflow-hidden border border-[var(--line)] bg-[rgba(16,16,17,0.72)] p-7 transition-colors duration-500 hover:border-[var(--brass)] md:p-9 ${className}`}>
    <span className="insight-glow pointer-events-none absolute inset-0" />
    <div className="relative flex items-center justify-between font-mono text-[0.6rem] tracking-[0.3em]">
      <span className="text-[var(--brass)]">№ {String(i + 1).padStart(2, "0")}</span>
      <span className="text-[var(--grey)]">{a.kicker.toUpperCase()}</span>
    </div>
    <div className="relative my-6 h-28 md:h-32"><Constellation seed={a.slug} /></div>
    <div className="relative">
      <h3 className="font-serif text-2xl leading-tight text-[var(--ivory-dim)] transition-colors duration-500 group-hover:text-[var(--ivory)] md:text-[1.9rem]">{a.title}</h3>
      <span className="mt-6 inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.28em] text-[var(--grey)] transition-colors group-hover:text-[var(--brass)]">
        READ INSIGHT <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </div>
  </Link>
);

const Header = () => (
  <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
    <div>
      <Reveal><span className="eyebrow">Insights</span></Reveal>
      <Reveal delay={0.05}><h2 className="serif-display mt-6 text-5xl md:text-7xl">Think, before building.</h2></Reveal>
    </div>
    <Reveal delay={0.1}>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-[var(--grey)]">
        Perspectives on how enduring businesses are designed, positioned, funded and scaled.
      </p>
    </Reveal>
  </div>
);

// Desktop: the section pins and the cards travel horizontally with scroll.
const PinnedRail = () => {
  const ref = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(track.current.scrollWidth - window.innerWidth + 96, 0));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -dist]), { stiffness: 90, damping: 24, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section id="insights" ref={ref} data-testid="insights" style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] px-12"><Header /></div>
        <motion.div ref={track} style={{ x }} className="flex gap-8 pl-12 will-change-transform xl:pl-[max(3rem,calc((100vw-1500px)/2+3rem))]">
          {INSIGHTS.map((a, i) => <InsightCard key={a.slug} a={a} i={i} className="h-[52vh] min-h-[400px] w-[30vw] min-w-[360px] shrink-0" />)}
        </motion.div>
        <div className="mx-auto mt-12 w-full max-w-[1500px] px-12">
          <div className="relative h-px w-full bg-[var(--line)]">
            <motion.div style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-[var(--brass)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

const SwipeRail = () => (
  <section id="insights" data-testid="insights" className="py-24">
    <div className="px-6"><Header /></div>
    <div className="no-scrollbar flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-4">
      {INSIGHTS.map((a, i) => <InsightCard key={a.slug} a={a} i={i} className="h-[440px] w-[82vw] max-w-[380px] shrink-0 snap-start" />)}
    </div>
    <p className="mt-4 px-6 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey-2)]">SWIPE → {INSIGHTS.length} INSIGHTS</p>
  </section>
);

export const InsightsRail = () => (useIsDesktop() ? <PinnedRail /> : <SwipeRail />);
