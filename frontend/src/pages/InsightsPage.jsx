import React from "react";
import { INSIGHTS } from "@/data/insights";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/fx/Reveal";
import { PageShell } from "@/components/layout/PageShell";
import { InsightCard } from "@/components/sections/Insights";

export const InsightsPage = () => (
  <PageShell>
    <SEO
      title="Insights & Thought Leadership"
      description="Essays, frameworks, and perspective on venture creation, building scalable businesses, and fundraising readiness."
    />
    <section className="mx-auto max-w-[1500px] px-6 pt-32 pb-20 md:px-12 md:pt-52 md:pb-32" data-testid="insights-page">
      <Reveal><span className="eyebrow">Insights</span></Reveal>
      <Reveal delay={0.05}>
        <h1 className="serif-display mt-6 max-w-4xl text-5xl md:text-7xl">Think, before building.</h1>
      </Reveal>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {INSIGHTS.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 0.06}><InsightCard a={a} i={i} className="h-full min-h-[420px]" /></Reveal>
        ))}
      </div>
    </section>
  </PageShell>
);

