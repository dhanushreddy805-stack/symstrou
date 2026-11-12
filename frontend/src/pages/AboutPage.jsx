import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IMG } from "@/config/api";
import { Star } from "@/components/Compass";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/fx/Reveal";
import { PageShell } from "@/components/layout/PageShell";
import { Manifesto } from "@/components/sections/Manifesto";

export const AboutPage = () => (
  <PageShell>
    <SEO
      title="About SYMSTRUO"
      description="SYMSTRUO is a Venture Creation Company helping founders turn ambitious ideas into scalable, execution-ready businesses. Direction before execution."
    />
    <section className="mx-auto max-w-[1500px] px-6 pt-32 pb-20 md:px-12 md:pt-52 md:pb-32" data-testid="about-page">
      <Reveal>
        <button data-testid="about-back" onClick={() => window.history.back()} className="link-underline mb-12 inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--grey)]">
          <ArrowRight size={13} className="rotate-180" /> BACK
        </button>
      </Reveal>
      <Reveal><span className="eyebrow">About</span></Reveal>
      <Reveal delay={0.05}>
        <h1 className="serif-display mt-8 border-b border-[var(--line)] pb-10 text-5xl md:text-7xl lg:text-8xl">About SYMSTRUO</h1>
      </Reveal>
      <div className="grid grid-cols-1 gap-16 pt-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <div className="max-w-2xl space-y-8 font-sans text-lg font-light leading-relaxed text-[var(--ivory-dim)]">
            <Reveal delay={0.1}><p>SYMSTRUO is a Venture Creation Company dedicated to helping founders transform ambitious ideas into scalable, execution-ready businesses.</p></Reveal>
            <Reveal delay={0.15}><p>From idea validation and business architecture to brand positioning, growth systems and investment readiness, we partner with founders through every stage of building.</p></Reveal>
            <Reveal delay={0.2}><p className="text-[var(--ivory)]">We believe every great company deserves the right direction before execution.</p></Reveal>
            <Reveal delay={0.25}><p className="font-serif text-3xl italic text-[var(--ivory)]">Our philosophy is simple. <span className="text-[var(--brass)]">Direction before execution.</span></p></Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="mt-16 flex items-center justify-between border-t border-[var(--line)] pt-8">
              <div>
                <p className="eyebrow mb-2">Founder</p>
                <p className="font-serif text-3xl text-[var(--ivory)]">Dhanush B.</p>
                <p className="mt-1 font-sans text-xs tracking-[0.24em] text-[var(--grey)]">FOUNDER &amp; CEO</p>
              </div>
              <a
                href="https://www.linkedin.com/in/dhanush-b-30792222a/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="about-linkedin"
                className="inline-flex items-center gap-2 border border-[var(--line)] px-4 py-2 font-sans text-[0.65rem] tracking-[0.24em] text-[var(--brass)] transition-all hover:border-[var(--brass)] hover:text-[var(--ivory)]"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden">
              <img src={IMG.about} alt="Architectural precision" className="h-[420px] w-full object-cover grayscale md:h-[520px]" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,11,0.1), rgba(10,10,11,0.55))" }} />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <Star size={14} color="var(--brass)" />
                <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--ivory)]">ARCHITECTURE OF INTENT</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
    <Manifesto />
  </PageShell>
);

