import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { INSIGHTS } from "../../data/insights";
import { Reveal } from "../fx/Reveal";
import { InsightCard } from "./Insights";

export const InsightsTeaser = () => (
  <section id="insights" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32" data-testid="insights">
    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <Reveal><span className="eyebrow">Insights</span></Reveal>
        <Reveal delay={0.05}><h2 className="display mt-5 text-4xl md:text-6xl">Thinking, <span className="text-shine">before building.</span></h2></Reveal>
      </div>
      <Reveal delay={0.1}>
        <Link to="/insights" data-testid="insights-all" className="pill-dark">All {INSIGHTS.length} insights <ArrowUpRight size={14} /></Link>
      </Reveal>
    </div>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {INSIGHTS.slice(0, 3).map((a, i) => (
        <Reveal key={a.slug} delay={i * 0.08}><InsightCard a={a} i={i} className="h-full min-h-[400px]" /></Reveal>
      ))}
    </div>
  </section>
);
