import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { NDA_COVERS, NDA_STEPS, NDA_PROMISES } from "@/data/nda";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/fx/Reveal";
import { PageShell } from "@/components/layout/PageShell";
import { GlowTile } from "@/components/sections/NdaVault";

export const NdaPage = () => (
  <PageShell>
    <SEO
      title="NDA & Confidentiality"
      description="Every idea you share with SYMSTRUO is protected by our built-in NDA from the first message. See what is covered and how it works."
    />
    <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-36 text-center md:px-12 md:pt-48" data-testid="nda-page">
      <Reveal><span className="glass-pill inline-flex items-center gap-2 px-4 py-2 font-sans text-xs text-[var(--ivory-dim)]"><ShieldCheck size={14} /> Built-in NDA</span></Reveal>
      <Reveal delay={0.05}><h1 className="display mx-auto mt-10 max-w-4xl text-5xl md:text-8xl">Confidential, <span className="text-shine">by design.</span></h1></Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-[var(--grey)] md:text-lg">
          Founders trust us with their most valuable thinking. Every idea, document and conversation you
          share with SYMSTRUO is protected by our built-in NDA — before you share a single detail.
        </p>
      </Reveal>
    </section>

    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <div className="lumen-card p-8 md:p-14">
        <Reveal><span className="eyebrow">What's protected</span></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {NDA_COVERS.map((c, i) => (
            <Reveal key={c} delay={i * 0.04}>
              <div className="flex h-full items-center gap-4 bg-[var(--ink-2)] p-6" data-testid={`nda-cover-${i}`}>
                <ShieldCheck size={18} className="shrink-0 text-[var(--ivory-dim)]" />
                <span className="font-sans text-base text-[var(--ivory)]">{c}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12">
      <Reveal><h2 className="display text-center text-4xl md:text-6xl">How it works</h2></Reveal>
      <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {NDA_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className={`text-center ${i % 2 ? "lg:mt-16" : ""}`}>
            <GlowTile n={s.n} size="sm" testid={`nda-step-${i}`} />
            <h3 className="mt-8 font-sans text-xl text-[var(--ivory)]">{s.t}</h3>
            <p className="mx-auto mt-3 max-w-[16rem] font-sans text-sm leading-relaxed text-[var(--grey)]">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-[1000px] px-6 py-20 md:px-12">
      <Reveal><span className="eyebrow">Our promise</span></Reveal>
      <ul className="mt-8 border-t border-[var(--line)]">
        {NDA_PROMISES.map((p, i) => (
          <Reveal key={p} delay={i * 0.05}>
            <li className="flex items-start gap-6 border-b border-[var(--line)] py-6">
              <span className="pt-1 font-mono text-xs text-[var(--grey-2)]">0{i + 1}</span>
              <span className="font-sans text-xl font-light text-[var(--ivory)] md:text-2xl">{p}</span>
            </li>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.1}>
        <div className="mt-14 flex justify-center">
          <Link to="/#contact" data-testid="nda-start" className="pill-light">Share your idea securely <ArrowUpRight size={15} /></Link>
        </div>
      </Reveal>
    </section>
  </PageShell>
);

