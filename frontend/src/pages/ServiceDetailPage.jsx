import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Toaster } from "sonner";
import { SERVICE_DETAILS, SERVICE_ORDER } from "@/data/serviceDetails";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import { CircleCursor } from "@/components/CircleCursor";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/fx/Reveal";
import { ScrollCompass } from "@/components/fx/ScrollCompass";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/components/layout/PageShell";
import { Blueprint } from "@/components/sections/Blueprints";

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = SERVICE_DETAILS[slug];
  useLenis();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!data) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--ink)]">
        <div className="text-center">
          <p className="font-serif text-4xl">Service not found.</p>
          <Link to="/" className="link-underline mt-6 inline-block font-sans text-xs tracking-[0.24em] text-[var(--brass)]">RETURN HOME</Link>
        </div>
      </div>
    );
  }

  const idx = SERVICE_ORDER.indexOf(slug);
  const next = SERVICE_ORDER[(idx + 1) % SERVICE_ORDER.length];
  const nextData = SERVICE_DETAILS[next];

  return (
    <div className="App grain" style={{ overflowX: "clip" }}>
      <SEO
        title={`${data.name} — Venture Services`}
        description={data.headline + " " + data.intro}
        keywords={data.keywords?.join(", ")}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.intro,
          "provider": {
            "@type": "Organization",
            "name": "SYMSTRUO",
            "url": "https://symstruo.com"
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80"><Starfield /></div>
      <Toaster position="top-right" offset={96} theme="dark" />
      <CircleCursor />
      <ScrollCompass />
      <Nav />
      <main className="relative z-10">
        {/* header */}
        <section className="mx-auto max-w-[1500px] px-6 pt-32 pb-14 md:px-12 md:pt-52 md:pb-24" data-testid="service-detail">
          <Reveal>
            <button onClick={() => navigate("/services")} className="link-underline mb-12 inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--grey)]">
              <ArrowRight size={13} className="rotate-180" /> ALL SERVICES
            </button>
          </Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <div className="mb-6 flex items-center gap-5">
                  <span className="font-serif text-2xl text-[var(--brass)]">{data.no}</span>
                  {data.flag && <span className="border border-[var(--brass)] px-3 py-1 font-sans text-[0.6rem] tracking-[0.24em] text-[var(--brass)]">{data.flag.toUpperCase()}</span>}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="serif-display text-5xl md:text-7xl">{data.name}</h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-2xl font-serif text-3xl italic leading-snug text-[var(--ivory-dim)] md:text-4xl">{data.headline}</p>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:pt-10">
              <Reveal delay={0.18}>
                <div className="mb-8 border border-[var(--line)] bg-[rgba(16,16,17,0.6)] p-4">
                  <Blueprint slug={slug} label={`FIG. ${data.no}`} className="h-[200px]" />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-sans text-base leading-relaxed text-[var(--grey)]">{data.intro}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* deliverable blocks */}
        <section className="mx-auto max-w-[1500px] px-6 md:px-12">
          <div className="border-b border-[var(--line)]">
            {data.blocks.map((b, i) => (
              <Reveal key={b.t}>
                <div className="grid grid-cols-1 gap-8 border-t border-[var(--line)] py-14 md:grid-cols-12 md:py-20">
                  <div className="flex items-start gap-5 md:col-span-4">
                    <span className="font-serif text-sm text-[var(--grey-2)]">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-serif text-3xl leading-tight text-[var(--ivory)] md:text-4xl">{b.t}</h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="max-w-2xl font-sans text-base leading-relaxed text-[var(--ivory-dim)]">{b.d}</p>
                    {b.r && (
                      <div className="mt-8">
                        <p className="eyebrow mb-5">You receive</p>
                        <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                          {b.r.map((item) => (
                            <span key={item} className="flex items-center gap-3 font-sans text-sm text-[var(--ivory-dim)]">
                              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--brass)] opacity-60" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-8 flex items-baseline gap-3 border-l border-[var(--brass)] pl-5">
                      <span className="eyebrow shrink-0">Outcome</span>
                      <span className="font-serif text-xl italic text-[var(--brass)]">{b.o}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* footer nav: next service + CTA */}
        <section className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-36">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Reveal>
              <Link to={`/services/${next}`} className="group block border border-[var(--line)] p-10 transition-colors duration-500 hover:border-[var(--brass)]" data-testid="next-service">
                <p className="eyebrow mb-4">Next Service · {nextData.no}</p>
                <p className="font-serif text-4xl text-[var(--ivory)] transition-colors group-hover:text-[var(--brass)] md:text-5xl">{nextData.name}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--grey)]">CONTINUE <ArrowUpRight size={13} /></span>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between border border-[var(--line)] p-10">
                <div>
                  <p className="eyebrow mb-4">Ready when you are</p>
                  <p className="font-serif text-3xl leading-tight text-[var(--ivory)] [text-wrap:balance] md:text-4xl">Let's find your direction.</p>
                </div>
                <button onClick={() => navigate("/#contact")} className="btn-ghost btn-fill mt-8 inline-flex w-fit items-center gap-3 border border-[var(--ivory)] px-8 py-4 font-sans text-xs tracking-[0.24em]">
                  <span>START BUILDING</span><ArrowUpRight size={15} className="relative z-[1]" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

