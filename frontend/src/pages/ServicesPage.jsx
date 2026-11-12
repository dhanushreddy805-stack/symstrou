import React from "react";
import { SERVICES } from "@/data/services";
import { SEO } from "@/components/SEO";
import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";
import { Journey } from "@/components/sections/Journey";

export const ServicesPage = () => (
  <PageShell>
    <SEO
      title="Services — Idea Lab to Investment Preparation"
      description="SYMSTRUO's five NDA-secured venture services: Idea Lab, Business Blueprint, Brand Architecture, Growth Engine and Investment Preparation."
    />
    <div className="pt-24 md:pt-28" data-testid="services-page">
      <Services services={SERVICES} pageTop />
      <Journey services={SERVICES} id="journey" />
    </div>
  </PageShell>
);

