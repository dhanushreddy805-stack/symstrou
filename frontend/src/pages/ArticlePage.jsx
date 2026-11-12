import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { INSIGHTS } from "@/data/insights";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/fx/Reveal";
import { PageShell } from "@/components/layout/PageShell";

export const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const idx = INSIGHTS.findIndex((a) => a.slug === slug);
  const a = INSIGHTS[idx];
  if (!a) {
    return (
      <PageShell>
        <section className="mx-auto max-w-3xl px-6 pt-52 pb-40 md:px-12">
          <p className="font-serif text-4xl">Article not found.</p>
          <Link to="/insights" className="link-underline mt-6 inline-block font-sans text-xs tracking-[0.24em] text-[var(--brass)]">ALL INSIGHTS</Link>
        </section>
      </PageShell>
    );
  }
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];
  return (
    <PageShell>
      <SEO
        title={a.title}
        description={a.deck}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": a.title,
          "description": a.deck,
          "mainEntityOfPage": `https://symstruo.com/insights/${a.slug}`,
          "author": {
            "@type": "Organization",
            "name": "SYMSTRUO",
            "url": "https://symstruo.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SYMSTRUO",
            "logo": {
              "@type": "ImageObject",
              "url": "https://symstruo.com/symstruo-brand-mark.png"
            }
          }
        }}
      />
      <article className="mx-auto max-w-3xl px-6 pt-32 pb-16 md:pt-52 md:pb-20" data-testid="article-page">
        <Reveal>
          <button onClick={() => navigate("/insights")} className="link-underline mb-12 inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--grey)]">
            <ArrowRight size={13} className="rotate-180" /> ALL INSIGHTS
          </button>
        </Reveal>
        <Reveal delay={0.05}><span className="eyebrow">{a.kicker}</span></Reveal>
        <Reveal delay={0.1}><h1 className="serif-display mt-6 text-4xl md:text-6xl">{a.title}</h1></Reveal>
        <Reveal delay={0.15}><p className="mt-8 font-serif text-2xl italic leading-snug text-[var(--ivory-dim)] md:text-3xl">{a.deck}</p></Reveal>
        <div className="mt-16 space-y-14">
          {a.sections.map((s, i) => (
            <Reveal key={i}>
              <div>
                {s.h && <h2 className="font-serif text-2xl text-[var(--ivory)] md:text-3xl">{s.h}</h2>}
                {s.p && <p className="mt-4 font-sans text-base leading-relaxed text-[var(--ivory-dim)]">{s.p}</p>}
                {s.bullets && (
                  <ul className="mt-6 space-y-3">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 font-sans text-base leading-relaxed text-[var(--ivory-dim)]">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--brass)]" />{b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </article>
      <section className="mx-auto max-w-3xl px-6 pb-32 md:pb-40">
        <Reveal>
          <Link to={`/insights/${next.slug}`} data-testid="next-insight" className="group block border border-[var(--line)] p-8 transition-colors duration-500 hover:border-[var(--brass)]">
            <p className="eyebrow mb-3">Next Insight</p>
            <p className="font-serif text-2xl text-[var(--ivory)] transition-colors group-hover:text-[var(--brass)] md:text-3xl">{next.title}</p>
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
};

