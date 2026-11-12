import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { scrollToSection } from "@/config/api";
import { SERVICES } from "@/data/services";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import { CircleCursor } from "@/components/CircleCursor";
import { SEO } from "@/components/SEO";
import { ScrollCompass } from "@/components/fx/ScrollCompass";
import { useLenis } from "@/components/layout/PageShell";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/sections/Loader";
import { HeroLumen } from "@/components/sections/HeroLumen";
import { Marquee } from "@/components/sections/Marquee";
import { Journey } from "@/components/sections/Journey";
import { NdaVault } from "@/components/sections/NdaVault";
import { Statement, MANIFESTO } from "@/components/sections/Manifesto";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const { hash, state } = location;
  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [hash, state]);

  return (
    <div className="App grain" style={{ overflowX: "clip" }}>
      <SEO
        title="NDA-Secured Venture Creation Company in Bengaluru"
        description="SYMSTRUO is an NDA-secured Venture Creation Company. We help founders turn ideas into enduring businesses with venture strategy, business blueprints, brand architecture, growth systems and investment readiness."
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <Starfield />
      </div>
      <Toaster position="top-right" offset={96} theme="dark" />
      {loaded && <CircleCursor />}
      <Loader done={loaded} />
      <ScrollCompass />
      <Nav />
      <main className="relative z-10">
        <HeroLumen ready={loaded} onStart={() => scrollToSection("contact")} />
        <Marquee />
        <Journey services={SERVICES} />
        <NdaVault />
        <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36" data-testid="philosophy">
          <Statement m={MANIFESTO[2]} idx={0} />
        </section>
        <InsightsTeaser />
        <FAQ />
        <CTA onStart={() => scrollToSection("contact")} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

