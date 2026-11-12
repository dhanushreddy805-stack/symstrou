import React from "react";
import { ArrowRight } from "lucide-react";
import { FAQS, REST_FAQ } from "@/data/faqs";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/fx/Reveal";
import { PageShell } from "@/components/layout/PageShell";
import { FAQItem } from "@/components/sections/FAQ";

export const FaqPage = () => (
  <PageShell>
    <SEO
      title="Frequently Asked Questions"
      description="Frequently asked questions about working with SYMSTRUO: our methodology, deliverables, equity models, timelines, and confidentiality."
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a,
          },
        })),
      }}
    />
    <section className="mx-auto max-w-[1500px] px-6 pt-32 pb-20 md:px-12 md:pt-52 md:pb-32" data-testid="faq-page">
      <Reveal>
        <button onClick={() => window.history.back()} className="link-underline mb-12 inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--grey)]">
          <ArrowRight size={13} className="rotate-180" /> BACK
        </button>
      </Reveal>
      <Reveal delay={0.05}><span className="eyebrow">FAQ</span></Reveal>
      <Reveal delay={0.1}>
        <h1 className="serif-display mt-6 max-w-4xl text-5xl md:text-7xl">Everything else, answered.</h1>
      </Reveal>
      <div className="mt-14 border-b border-[var(--line)]">
        {REST_FAQ.map((qi, i) => <FAQItem key={qi} idx={i} q={FAQS[qi].q} a={FAQS[qi].a} />)}
      </div>
    </section>
  </PageShell>
);

