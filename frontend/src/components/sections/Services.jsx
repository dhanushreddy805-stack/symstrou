import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, EASE } from "../fx/Reveal";
import { useIsDesktop } from "../fx/hooks";
import { Blueprint } from "./Blueprints";

const Flag = ({ s }) => s.flag ? (
  <span className="border border-[var(--brass)] px-3 py-1 font-sans text-[0.6rem] tracking-[0.24em] text-[var(--brass)]">{s.flag.toUpperCase()}</span>
) : null;

const Items = ({ s }) => (
  <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
    {s.items.map((it) => (
      <span key={it} className="flex items-center gap-3 font-sans text-sm leading-relaxed text-[var(--ivory-dim)]">
        <span className="h-px w-3 shrink-0 bg-[var(--brass)]" />{it}
      </span>
    ))}
  </div>
);

const MoreLink = ({ s }) => (
  <Link to={`/services/${s.slug}`} data-testid={`service-more-${s.no}`} data-cursor="EXPLORE"
    className="link-underline inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-sans text-[0.7rem] tracking-[0.24em] text-[var(--ivory)]">
    KNOW MORE <ArrowUpRight size={13} />
  </Link>
);

const Panel = ({ s }) => (
  <motion.div key={s.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.6, ease: EASE }} className="flex h-full flex-col" data-testid="service-panel">
    <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey)]">
      <span>FIG. {s.no} — {s.name}</span><span className="text-[var(--brass)]">STAGE {s.no} / 05</span>
    </div>
    <Blueprint slug={s.slug} className="my-6 h-[190px] xl:h-[220px]" />
    <p className="font-serif text-2xl italic leading-snug text-[var(--ivory)] xl:text-3xl">{s.desc}</p>
    <div className="mt-6"><Items s={s} /></div>
    <div className="mt-8 flex items-end justify-between gap-6 border-t border-[var(--line)] pt-6">
      <div>
        <p className="eyebrow mb-2">Outcome</p>
        <p className="font-serif text-xl italic text-[var(--brass)]">{s.outcome}</p>
      </div>
      <MoreLink s={s} />
    </div>
  </motion.div>
);

const ServiceIndex = ({ services }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="grid grid-cols-12 gap-16">
      <div className="col-span-5 border-b border-[var(--line)]">
        {services.map((s, i) => {
          const on = active === i;
          return (
            <div key={s.no} data-testid={`service-${s.no}`} role="button" tabIndex={0} data-cursor="VIEW"
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
              className="relative cursor-pointer border-t border-[var(--line)] py-8">
              {on && <motion.span layoutId="svc-bar" className="absolute left-0 top-[-1px] h-px w-full bg-[var(--brass)]" transition={{ duration: 0.6, ease: EASE }} />}
              <div className={`flex items-baseline gap-6 transition-transform duration-700 ${on ? "translate-x-4" : ""}`}>
                <span className={`font-mono text-xs transition-colors duration-500 ${on ? "text-[var(--brass)]" : "text-[var(--grey-2)]"}`}>{s.no}</span>
                <h3 className={`font-serif text-4xl leading-none transition-colors duration-500 xl:text-5xl ${on ? "text-[var(--ivory)]" : "text-[var(--grey-2)]"}`}>{s.name}</h3>
                <Flag s={s} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-7">
        <div className="sticky top-24 border border-[var(--line)] bg-[rgba(16,16,17,0.72)] p-8 backdrop-blur-sm">
          <span className="corner corner-tl" /><span className="corner corner-tr" /><span className="corner corner-bl" /><span className="corner corner-br" />
          <AnimatePresence mode="wait"><Panel s={services[active]} /></AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ServiceStack = ({ services }) => (
  <div className="space-y-6">
    {services.map((s) => (
      <Reveal key={s.no}>
        <div data-testid={`service-${s.no}`} className="relative border border-[var(--line)] bg-[rgba(16,16,17,0.72)] p-6">
          <div className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.3em] text-[var(--grey)]">
            <span className="text-[var(--brass)]">{s.no} / 05</span><Flag s={s} />
          </div>
          <h3 className="mt-5 font-serif text-4xl leading-none text-[var(--ivory)]">{s.name}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--grey)]">{s.desc}</p>
          <Blueprint slug={s.slug} className="my-6 h-[180px]" />
          <Items s={s} />
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-[var(--line)] pt-5">
            <div>
              <p className="eyebrow mb-2">Outcome</p>
              <p className="font-serif text-lg italic text-[var(--brass)]">{s.outcome}</p>
            </div>
            <MoreLink s={s} />
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

export const Services = ({ services }) => {
  const desktop = useIsDesktop();
  return (
    <section id="services" className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-40" data-testid="services">
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Reveal><span className="eyebrow">Services</span></Reveal>
          <Reveal delay={0.05}><h2 className="serif-display mt-6 text-5xl md:text-7xl lg:text-8xl">The Service Ecosystem</h2></Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-[var(--grey)]">
            Five deliberate stages. One continuous journey — from the first question to
            the moment capital says yes.
          </p>
        </Reveal>
      </div>
      {desktop ? <ServiceIndex services={services} /> : <ServiceStack services={services} />}
    </section>
  );
};
