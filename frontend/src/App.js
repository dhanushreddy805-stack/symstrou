import React, { useEffect, useRef, useState } from "react";
import "@/App.css";
import axios from "axios";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Compass, Star, Mark, Wordmark } from "@/components/Compass";
import { Starfield } from "@/components/Starfield";
import { CircleCursor } from "@/components/CircleCursor";
import { SERVICE_DETAILS, SERVICE_ORDER } from "@/data/serviceDetails";
import { INSIGHTS } from "@/data/insights";
import { SEO } from "@/components/SEO";

// Home FAQ shows a curated subset (questions 1, 2, 4, 20, 12, 6).
const HOME_FAQ = [0, 1, 3, 19, 11, 5];

let rawBackendUrl = process.env.REACT_APP_BACKEND_URL || "https://symstruo-backend.onrender.com";

// Fix Render internal host reference if provided without .onrender.com
if (
  rawBackendUrl === "symstruo-backend" ||
  rawBackendUrl === "http://symstruo-backend" ||
  rawBackendUrl === "https://symstruo-backend"
) {
  rawBackendUrl = "https://symstruo-backend.onrender.com";
}

const formattedBackendUrl = rawBackendUrl.startsWith("http")
  ? rawBackendUrl
  : `https://${rawBackendUrl}`;

const API = `${formattedBackendUrl.replace(/\/$/, "")}/api`;

const IMG = {
  about: "https://images.unsplash.com/photo-1565371557106-c2abcc6fb36a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  process: "https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  cta: "https://images.unsplash.com/photo-1615141328086-72a5a01b1b25?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
};

const EASE = [0.16, 1, 0.3, 1];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Reveal = ({ children, delay = 0, y = 30, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 1.05, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ Loader */
const Loader = ({ done }) => (
  <AnimatePresence>
    {!done && (
      <motion.div
        data-testid="loader"
        className="fixed inset-0 z-[100] grid place-items-center bg-[var(--ink)]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Mark size={62} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
              <Wordmark height={13} />
            </motion.div>
          </div>
          <div className="h-px w-40 overflow-hidden bg-[var(--line)]">
            <motion.div
              className="h-full bg-[var(--brass)]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: EASE }}
            />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* -------------------------------------------------------------------- Hero */
const MaskLine = ({ children, delay }) => (
  <span className="reveal-mask">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const needleRotate = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const labels = ["Direction", "Validation", "Blueprint", "Growth", "Legacy"];
  return (
    <section id="home" ref={heroRef} className="relative min-h-screen w-full overflow-hidden pt-28" data-testid="hero">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(184,148,95,0.08) 0%, rgba(10,10,11,0) 60%)" }} />
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-16 px-6 pb-24 md:px-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
            className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--brass)]" />
            <span className="eyebrow">Venture Creation Company</span>
          </motion.div>

          <h1 className="serif-display text-[15vw] leading-[0.9] sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
            <MaskLine delay={0.35}>Direction</MaskLine>{" "}
            <MaskLine delay={0.48}>
              <span className="italic text-[var(--grey)]">Before</span>
            </MaskLine>
            <br />
            <MaskLine delay={0.6}>Execution.</MaskLine>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 1, ease: EASE }}
            className="mt-10 max-w-xl font-sans text-base leading-relaxed text-[var(--ivory-dim)] md:text-lg">
            We help founders transform ideas into enduring businesses through strategic
            direction, execution-ready blueprints, growth systems and investment readiness.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 1, ease: EASE }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button data-testid="hero-start" onClick={() => scrollTo("contact")}
              className="btn-ghost btn-fill group flex items-center justify-center gap-3 border border-[var(--ivory)] px-9 py-4 font-sans text-xs tracking-[0.24em]">
              <span>START BUILDING</span>
              <ArrowUpRight size={15} className="relative z-[1]" />
            </button>
            <button data-testid="hero-book" onClick={() => scrollTo("contact")}
              className="link-underline flex items-center gap-3 px-2 py-4 font-sans text-xs tracking-[0.24em] text-[var(--ivory-dim)]">
              BOOK STRATEGY CALL
            </button>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center lg:col-span-5">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.6, ease: EASE }}>
            <Compass size={430} needleRotate={needleRotate} />
          </motion.div>
          <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 flex-col gap-5 lg:flex lg:-right-4 xl:-right-14">
            {labels.map((l, i) => (
              <motion.div key={l} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.9, ease: EASE }}
                className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--line)]" />
                <span className="font-sans text-[0.7rem] tracking-[0.3em] text-[var(--grey)]">{l.toUpperCase()}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-0 flex w-full items-center justify-between px-6 font-sans text-[0.65rem] tracking-[0.35em] text-[var(--grey-2)] md:px-12">
        <span className="text-[var(--brass)]">+89° 15′</span>
        <span>DIRECTION · CLARITY</span>
        <span className="hidden sm:block">TRUE NORTH</span>
      </motion.div>
    </section>
  );
};

/* ---------------------------------------------------------------- Marquee */
const Marquee = () => {
  const words = ["Direction", "Validation", "Blueprint", "Execution", "Growth", "Investment"];
  const set = [...words, ...words];
  return (
    <div className="border-y border-[var(--line)] py-8" data-testid="marquee">
      <div className="marquee-track">
        {set.map((w, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-serif text-4xl italic text-[var(--ivory-dim)] md:text-6xl">
            {w} <Star size={16} color="var(--brass)" />
          </span>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ About */
const About = () => (
  <section id="about" className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-44" data-testid="about">
    <Reveal><span className="eyebrow">About</span></Reveal>
    <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
      <div className="lg:col-span-7">
        <Reveal delay={0.05}>
          <h2 className="serif-display text-5xl md:text-6xl lg:text-7xl">About SYMSTRUO</h2>
        </Reveal>
        <div className="mt-12 max-w-2xl space-y-8 font-sans text-lg font-light leading-relaxed text-[var(--ivory-dim)]">
          <Reveal delay={0.1}><p>SYMSTRUO is a Venture Creation Company dedicated to helping founders transform ambitious ideas into scalable, execution-ready businesses.</p></Reveal>
          <Reveal delay={0.15}><p>From idea validation and business architecture to brand positioning, growth systems and investment readiness, we partner with founders through every stage of building.</p></Reveal>
          <Reveal delay={0.2}><p className="text-[var(--ivory)]">We believe every great company deserves the right direction before execution.</p></Reveal>
          <Reveal delay={0.25}>
            <p className="font-serif text-3xl italic text-[var(--ivory)]">Our philosophy is simple. <span className="text-[var(--brass)]">Direction before execution.</span></p>
          </Reveal>
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
            <motion.img
              src={IMG.about} alt="Architectural precision" loading="lazy"
              className="h-[520px] w-full object-cover grayscale"
              initial={{ scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE }}
            />
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
);

/* -------------------------------------------------------------- Manifesto */
const MANIFESTO = [
  { n: "01", text: ["Every successful company", "begins with the", "right direction."] },
  { n: "02", text: ["Execution without", "direction is", "expensive."] },
  { n: "03", text: ["We don't sell consulting.", "We create", "businesses."] },
];
const VALUES = ["Direction", "Clarity", "Conviction", "Precision", "Purpose", "Long-term Thinking"];

const lineVariant = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

const Manifesto = () => (
  <section id="manifesto" className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-48" data-testid="manifesto">
    <Reveal>
      <div className="mb-20 flex items-center gap-4">
        <Star size={14} color="var(--brass)" />
        <span className="eyebrow">The Manifesto</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="eyebrow">The Philosophy</span>
      </div>
    </Reveal>

    <div className="space-y-24 md:space-y-36">
      {MANIFESTO.map((m, idx) => (
        <div key={m.n} className={`flex flex-col gap-6 md:flex-row md:items-start md:gap-16 ${idx % 2 ? "md:justify-end" : ""}`}>
          <Reveal>
            <span className="font-serif text-xl text-[var(--brass)]">{m.n}</span>
          </Reveal>
          <motion.h2
            className="serif-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl xl:text-[4rem]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.09 }}
          >
            {m.text.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={lineVariant}>
                  {i === m.text.length - 1
                    ? <span className="italic text-[var(--grey)]">{line}</span>
                    : line}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </div>
      ))}
    </div>

    <div className="mt-32 border-t border-[var(--line)] pt-16">
      <Reveal>
        <p className="eyebrow mb-10">The compass points to six things</p>
      </Reveal>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {VALUES.map((v, i) => (
          <Reveal key={v} delay={i * 0.05}>
            <span className="flex items-center gap-4 font-serif text-2xl text-[var(--ivory)] md:text-3xl">
              {v}
              {i < VALUES.length - 1 && <Star size={11} color="var(--brass)" className="opacity-70" />}
            </span>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-20 max-w-2xl font-serif text-2xl italic leading-snug text-[var(--ivory-dim)] md:text-3xl">
          We don't build for applause.
          <span className="text-[var(--brass)]"> We build for endurance.</span>
        </p>
      </Reveal>
    </div>
  </section>
);

/* --------------------------------------------------------------- Services */
const SERVICES = [
  { slug: "idea-lab", no: "01", name: "IDEA LAB", flag: "", desc: "For founders with ideas but no clear direction.",
    items: ["Idea Validation", "Market Research", "Competitor Analysis", "Customer Persona", "Opportunity Score", "Risk Analysis", "Revenue Possibilities"],
    outcome: "Should I build this business?" },
  { slug: "business-blueprint", no: "02", name: "BUSINESS BLUEPRINT", flag: "Flagship", desc: "Complete business architecture designed for execution.",
    items: ["Business Model", "Revenue Streams", "Pricing Strategy", "Brand Positioning", "Operations Blueprint", "Hiring Plan", "Financial Projection", "Go-To-Market Strategy", "90 Day Execution Roadmap", "Investor Readiness"],
    outcome: "Complete roadmap to build the business." },
  { slug: "brand-architecture", no: "03", name: "BRAND ARCHITECTURE", flag: "", desc: "Positioning and identity engineered for permanence.",
    items: ["Brand Name", "Brand Story", "Mission", "Vision", "Identity", "Tone of Voice", "Product Positioning", "Customer Experience", "Brand Guidelines"],
    outcome: "A premium brand — not just a logo." },
  { slug: "growth-engine", no: "04", name: "GROWTH ENGINE", flag: "", desc: "Systems that turn traction into scale.",
    items: ["Sales Process", "CRM", "SOP Creation", "Lead Generation Strategy", "LinkedIn Positioning", "Founder Personal Branding", "Partnerships", "Expansion Strategy"],
    outcome: "A scalable company." },
  { slug: "investment-preparation", no: "05", name: "INVESTMENT PREPARATION", flag: "", desc: "Everything required to stand before capital with conviction.",
    items: ["Pitch Deck", "Financial Model", "Valuation Guidance", "Investor Strategy", "Data Room", "Due Diligence", "Fundraising Narrative"],
    outcome: "Investor-ready startup." },
];

const ServiceRow = ({ s }) => {
  const [open, setOpen] = useState(false);
  return (
    <Reveal>
      <div
        data-testid={`service-${s.no}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="group grid cursor-default grid-cols-1 gap-8 border-t border-[var(--line)] py-12 transition-colors duration-500 hover:bg-[rgba(184,148,95,0.03)] md:grid-cols-12 md:py-16"
      >
        <div className="flex items-start gap-6 pr-4 md:col-span-4">
          <span className="font-serif text-2xl text-[var(--grey-2)]">{s.no}</span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="font-serif text-3xl leading-[0.96] text-[var(--ivory)] md:text-4xl lg:text-[2.6rem]">{s.name}</h3>
              {s.flag && (
                <span className="border border-[var(--brass)] px-3 py-1 font-sans text-[0.6rem] tracking-[0.24em] text-[var(--brass)]">
                  {s.flag.toUpperCase()}
                </span>
              )}
            </div>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-[var(--grey)]">{s.desc}</p>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {s.items.map((it) => (
              <span key={it} className="flex items-center gap-3 whitespace-nowrap font-sans text-sm leading-relaxed text-[var(--ivory-dim)] transition-colors duration-500 group-hover:text-[var(--ivory)]">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--brass)] opacity-60" />
                {it}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 md:col-span-2 md:items-end">
          <div className="text-left md:text-right">
            <p className="eyebrow mb-2">Outcome</p>
            <p className="font-serif text-lg italic text-[var(--brass)]">{s.outcome}</p>
          </div>
          <Link
            to={`/services/${s.slug}`}
            data-testid={`service-more-${s.no}`}
            className="link-underline inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--ivory)]"
          >
            KNOW MORE <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

const Services = () => (
  <section id="services" className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-44" data-testid="services">
    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <Reveal><span className="eyebrow">Services</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="serif-display mt-6 text-5xl md:text-7xl">The Service Ecosystem</h2>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm font-sans text-sm leading-relaxed text-[var(--grey)]">
          Five deliberate stages. One continuous journey — from the first question to
          the moment capital says yes.
        </p>
      </Reveal>
    </div>
    <div className="border-b border-[var(--line)]">
      {SERVICES.map((s) => <ServiceRow key={s.no} s={s} />)}
    </div>
  </section>
);

/* -------------------------------------------------------------------- FAQ */
const FAQS = [
  { q: "What is SYMSTRUO?", a: "SYMSTRUO is a business-building and advisory firm that helps founders and businesses move from idea to structured business, brand, growth, and capital readiness. We work across the critical stages of building a business — from defining the business model and positioning to building the brand, developing growth strategies, and preparing for fundraising." },
  { q: "Who does SYMSTRUO work with?", a: "SYMSTRUO works with founders, entrepreneurs, startups, emerging businesses, and established companies looking to build, restructure, launch, or scale. Our approach is tailored to the stage and specific requirements of each business." },
  { q: "I only have a business idea. Can SYMSTRUO help me?", a: "Yes. An idea is only the starting point. We help evaluate the opportunity, define the business model, identify the target market, establish positioning, and create a structured path toward launching the business." },
  { q: "Can SYMSTRUO help me start a business from scratch?", a: "Yes. We can support the process from concept → business model → strategy → brand → launch → growth. The objective is not simply to create a business plan, but to build the foundations required to turn the idea into an operating business." },
  { q: "Do you provide business ideas?", a: "Yes, where appropriate. We can help identify and evaluate business opportunities based on market demand, customer problems, industry trends, business economics, and the founder's objectives. However, our focus is not on giving random business ideas. It is on identifying opportunities that can become viable businesses." },
  { q: "What is Business Architecture?", a: "Business Architecture is the process of defining how a business is designed to work. This can include the business model, customer segments, value proposition, revenue streams, operations, positioning, competitive advantage, and growth structure. It creates the foundation before significant time and capital are invested." },
  { q: "Can SYMSTRUO help with branding?", a: "Yes. Our branding work goes beyond logos and visual design. We focus on positioning, brand strategy, identity, messaging, customer perception, and creating a consistent brand system that supports the business strategy." },
  { q: "Do you provide logo and graphic design?", a: "Design can be part of the branding engagement, depending on the project. However, we believe design should follow strategy. A strong visual identity should communicate what the business stands for rather than simply make it look attractive." },
  { q: "Can you help an existing business that is already operating?", a: "Absolutely. SYMSTRUO is not only for new businesses. We can work with existing companies that need to reposition their brand, restructure their business model, improve growth, prepare for fundraising, or build systems for the next stage of expansion." },
  { q: "Can SYMSTRUO help with fundraising?", a: "Yes. We help businesses become fundraising-ready. This can include business model refinement, financial and growth narratives, investor positioning, pitch materials, fundraising strategy, and preparation for investor conversations." },
  { q: "Do you guarantee funding?", a: "No. No legitimate advisory firm can guarantee that an investor will fund a business. What we can do is improve the quality of the business, its positioning, its fundraising preparation, and the way its opportunity is presented to potential investors." },
  { q: "When should a startup raise funding?", a: "Funding should be raised when capital can meaningfully accelerate a validated opportunity. Raising too early can create unnecessary dilution and pressure. Raising too late can limit growth. The right timing depends on the business model, traction, capital requirements, market opportunity, and growth strategy." },
  { q: "Does SYMSTRUO invest in businesses?", a: "SYMSTRUO's advisory engagement should not automatically be interpreted as an investment. Where investment or capital introductions are relevant, the structure depends on the specific business, opportunity, and engagement." },
  { q: "How long does a SYMSTRUO engagement take?", a: "There is no universal timeline. A focused strategy engagement may take a few weeks, while building a complete business, brand, and growth architecture can require several months. The scope is determined based on the business stage and objectives." },
  { q: "How much does SYMSTRUO charge?", a: "Pricing depends on the scope, complexity, stage of the business, and level of involvement required. After understanding the business and objectives, we recommend the appropriate engagement structure." },
  { q: "Do you work with companies outside India?", a: "Yes. Business-building, strategy, branding, and advisory work can be delivered across markets, subject to the requirements of the engagement." },
  { q: "What makes SYMSTRUO different from a typical business consultant?", a: "We don't approach businesses as isolated problems. A business model, brand, growth strategy, operations, and capital strategy are interconnected. SYMSTRUO takes a business-building approach, connecting these elements into one coherent system rather than providing disconnected consulting services." },
  { q: "Can I approach SYMSTRUO if I am not sure what service I need?", a: "Yes. In fact, that is often the right place to start. You don't need to know exactly what service you need before speaking with us. We first understand the business, identify the most important problem or opportunity, and determine where SYMSTRUO can create the most value." },
  { q: "What is the first step?", a: "The first step is a conversation about the business, where it currently stands, what you are trying to build, and what is preventing you from getting there. From there, we determine the appropriate strategy and engagement." },
  { q: "Is SYMSTRUO an agency or a consulting firm?", a: "SYMSTRUO sits between the two. We combine strategic advisory with execution-oriented business building. The goal is not simply to provide recommendations and leave the founder to figure out the rest. Where appropriate, we work alongside the business to turn strategy into an operating system." },
];

const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[var(--line)]">
      <button
        data-testid={`faq-${idx}`}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start justify-between gap-8 py-7 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-5 md:gap-8">
          <span className="pt-1.5 font-serif text-sm text-[var(--grey-2)]">{String(idx + 1).padStart(2, "0")}</span>
          <span className={`font-serif text-xl leading-tight transition-colors duration-300 md:text-2xl ${open ? "text-[var(--ivory)]" : "text-[var(--ivory-dim)] group-hover:text-[var(--ivory)]"}`}>
            {q}
          </span>
        </div>
        <Plus size={20} className={`mt-1.5 shrink-0 text-[var(--brass)] transition-transform duration-500 ${open ? "rotate-[135deg]" : "group-hover:rotate-90"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-9 pl-10 font-sans text-sm leading-relaxed text-[var(--ivory-dim)] md:pl-[4.25rem]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => (
  <section id="faq" className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-44" data-testid="faq">
    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <Reveal><span className="eyebrow">FAQ</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="serif-display mt-6 text-5xl md:text-7xl">Questions, answered.</h2>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm font-sans text-sm leading-relaxed text-[var(--grey)]">
          Everything founders ask before we begin. If your question isn't here,
          a conversation is the best place to start.
        </p>
      </Reveal>
    </div>
    <div className="border-b border-[var(--line)]">
      {HOME_FAQ.map((qi, i) => <FAQItem key={qi} idx={i} q={FAQS[qi].q} a={FAQS[qi].a} />)}
    </div>
    <Reveal delay={0.1}>
      <div className="mt-14">
        <Link to="/faq" data-testid="more-questions" className="btn-ghost btn-fill inline-flex items-center gap-3 border border-[var(--ivory)] px-9 py-4 font-sans text-xs tracking-[0.24em]">
          <span>MORE QUESTIONS</span><ArrowUpRight size={15} className="relative z-[1]" />
        </Link>
      </div>
    </Reveal>
  </section>
);

/* --------------------------------------------------------------- Insights */
const InsightRow = ({ a, i }) => (
  <Reveal>
    <Link
      to={`/insights/${a.slug}`}
      data-testid={`insight-${i}`}
      className="group grid grid-cols-1 gap-3 border-t border-[var(--line)] py-9 transition-colors duration-500 hover:bg-[rgba(184,148,95,0.03)] md:grid-cols-12 md:items-center md:gap-6 md:py-11"
    >
      <span className="font-serif text-sm text-[var(--grey-2)] md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
      <span className="eyebrow md:col-span-2">{a.kicker}</span>
      <h3 className="font-serif text-2xl leading-tight text-[var(--ivory-dim)] transition-colors group-hover:text-[var(--ivory)] md:col-span-8 md:text-3xl">{a.title}</h3>
      <div className="flex md:col-span-1 md:justify-end">
        <ArrowUpRight size={20} className="text-[var(--brass)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </Link>
  </Reveal>
);

const Insights = () => (
  <section id="insights" className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-44" data-testid="insights">
    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <Reveal><span className="eyebrow">Insights</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="serif-display mt-6 text-5xl md:text-7xl">Thinking, before building.</h2>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm font-sans text-sm leading-relaxed text-[var(--grey)]">
          Perspectives on how enduring businesses are designed, positioned, funded and scaled.
        </p>
      </Reveal>
    </div>
    <div className="border-b border-[var(--line)]">
      {INSIGHTS.map((a, i) => <InsightRow key={a.slug} a={a} i={i} />)}
    </div>
  </section>
);

/* ----------------------------------------------------------- Page shell */
const Page = ({ children }) => {
  useLenis();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="App grain">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80"><Starfield /></div>
      <Toaster position="bottom-right" theme="dark" />
      <CircleCursor />
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

const InsightsIndex = () => (
  <Page>
    <SEO
      title="Insights & Thought Leadership"
      description="Essays, frameworks, and perspective on venture creation, building scalable businesses, and fundraising readiness."
    />
    <section className="mx-auto max-w-[1500px] px-6 pt-40 pb-32 md:px-12 md:pt-52" data-testid="insights-page">
      <Reveal><span className="eyebrow">Insights</span></Reveal>
      <Reveal delay={0.05}>
        <h1 className="serif-display mt-6 max-w-4xl text-5xl md:text-7xl">Thinking, before building.</h1>
      </Reveal>
      <div className="mt-16 border-b border-[var(--line)]">
        {INSIGHTS.map((a, i) => <InsightRow key={a.slug} a={a} i={i} />)}
      </div>
    </section>
  </Page>
);

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const idx = INSIGHTS.findIndex((a) => a.slug === slug);
  const a = INSIGHTS[idx];
  if (!a) {
    return (
      <Page>
        <section className="mx-auto max-w-3xl px-6 pt-52 pb-40 md:px-12">
          <p className="font-serif text-4xl">Article not found.</p>
          <Link to="/insights" className="link-underline mt-6 inline-block font-sans text-xs tracking-[0.24em] text-[var(--brass)]">ALL INSIGHTS</Link>
        </section>
      </Page>
    );
  }
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];
  return (
    <Page>
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
              "url": "https://symstruo.com/symstruo-mark.png"
            }
          }
        }}
      />
      <article className="mx-auto max-w-3xl px-6 pt-40 pb-20 md:pt-52" data-testid="article-page">
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
    </Page>
  );
};

const REST_FAQ = FAQS.map((_, i) => i).filter((i) => !HOME_FAQ.includes(i));
const FAQPage = () => (
  <Page>
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
    <section className="mx-auto max-w-[1500px] px-6 pt-40 pb-32 md:px-12 md:pt-52" data-testid="faq-page">
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
  </Page>
);

/* ---------------------------------------------------------------- Process */
const STEPS = ["Direction", "Validation", "Blueprint", "Execution", "Growth", "Investment"];
const STEP_DESC = [
  "We find true north before a single resource is spent.",
  "Every assumption is stress-tested against the market.",
  "The complete architecture of the business, drawn to build.",
  "Direction becomes motion — sequenced and deliberate.",
  "Traction is engineered into a repeatable system.",
  "The company is prepared to stand before capital.",
];

const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" ref={ref} className="relative mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-44" data-testid="process">
      <Reveal><span className="eyebrow">Process</span></Reveal>
      <Reveal delay={0.05}>
        <h2 className="serif-display mt-6 max-w-3xl text-5xl md:text-7xl">The journey from idea to investment.</h2>
      </Reveal>
      <div className="relative mt-24">
        <div className="absolute left-[7px] top-0 h-full w-px bg-[var(--line)] md:left-1/2" />
        <motion.div style={{ height }} className="absolute left-[7px] top-0 w-px bg-[var(--brass)] md:left-1/2" />
        <div className="space-y-20 md:space-y-0">
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={0.03 * i}>
              <div className={`relative flex items-center gap-8 md:min-h-[180px] md:gap-0 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-0 h-4 w-4 -translate-x-[3.5px] rounded-full border border-[var(--brass)] bg-[var(--ink)] md:left-1/2 md:-translate-x-1/2" />
                <div className={`w-full pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}>
                  <div className={`flex items-baseline gap-4 ${i % 2 ? "" : "md:justify-end"}`}>
                    <span className="font-serif text-lg text-[var(--grey-2)]">0{i + 1}</span>
                    <h3 className="font-serif text-4xl text-[var(--ivory)] md:text-5xl">{step}</h3>
                  </div>
                  <p className={`mt-3 max-w-xs font-sans text-sm leading-relaxed text-[var(--grey)] ${i % 2 ? "" : "md:ml-auto"}`}>
                    {STEP_DESC[i]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------- CTA */
const CTA = () => (
  <section className="relative overflow-hidden" data-testid="cta">
    <img src={IMG.cta} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale" />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--ink), rgba(10,10,11,0.75))" }} />
    <div className="relative mx-auto max-w-[1300px] px-6 py-40 text-center md:px-12 md:py-56">
      <Reveal><Star size={30} color="var(--brass)" className="mx-auto mb-10" /></Reveal>
      <Reveal delay={0.05}>
        <h2 className="serif-display mx-auto max-w-4xl text-5xl md:text-7xl lg:text-[5.5rem]">
          Every great company begins with the right direction.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-10 font-serif text-3xl italic text-[var(--brass)]">Direction · Clarity · Conviction · Precision</p>
      </Reveal>
      <Reveal delay={0.15}>
        <button data-testid="cta-start" onClick={() => scrollTo("contact")}
          className="btn-ghost btn-fill mt-12 inline-flex items-center gap-3 border border-[var(--ivory)] px-10 py-4 font-sans text-xs tracking-[0.24em]">
          <span>START BUILDING</span>
          <ArrowUpRight size={15} className="relative z-[1]" />
        </button>
      </Reveal>
    </div>
  </section>
);

/* ---------------------------------------------------------------- Contact */
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", stage: "", message: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please share your name, email and a note.");
      return;
    }
    setBusy(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Received. We'll respond within 24 hours.");
      setForm({ name: "", email: "", company: "", stage: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 md:py-44" data-testid="contact">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif-display mt-6 text-5xl md:text-6xl lg:text-7xl">Let's find your direction.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-sm font-sans text-base leading-relaxed text-[var(--ivory-dim)]">
              Every enduring company begins with a single, well-directed conversation.
              Tell us where you are — we'll show you where to build.
            </p>
          </Reveal>
          <div className="mt-14 space-y-8">
            {[["Location", "Bengaluru, India"], ["Email", "dhanush@symstruo.com"], ["Response", "Within 24 hours"]].map(([k, v]) => (
              <Reveal key={k} delay={0.05}>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <span className="font-sans text-xs tracking-[0.24em] text-[var(--grey)]">{k.toUpperCase()}</span>
                  <span className="font-serif text-xl text-[var(--ivory)]">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <form onSubmit={submit} data-testid="contact-form" className="space-y-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <input data-testid="contact-name" className="field-input" placeholder="Full Name *" value={form.name} onChange={set("name")} />
                <input data-testid="contact-email" type="email" className="field-input" placeholder="Email Address *" value={form.email} onChange={set("email")} />
                <input data-testid="contact-company" className="field-input" placeholder="Company / Project" value={form.company} onChange={set("company")} />
                <input data-testid="contact-stage" className="field-input" placeholder="Stage (Idea, Building, Raising…)" value={form.stage} onChange={set("stage")} />
              </div>
              <textarea data-testid="contact-message" rows={4} className="field-input" placeholder="Tell us about your idea *" value={form.message} onChange={set("message")} />
              <button data-testid="contact-submit" type="submit" disabled={busy}
                className="btn-ghost btn-fill group flex w-full items-center justify-center gap-3 border border-[var(--ivory)] px-10 py-5 font-sans text-xs tracking-[0.24em] disabled:opacity-50 sm:w-auto">
                <span>{busy ? "SENDING…" : "SEND MESSAGE"}</span>
                <ArrowRight size={15} className="relative z-[1]" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------------------------------------------- Footer */
const Footer = () => (
  <footer className="relative z-10 border-t border-[var(--line)]" data-testid="footer">
    <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-4">
            <Mark size={30} />
            <Wordmark height={22} />
          </div>
          <p className="mt-6 font-serif text-2xl italic text-[var(--brass)]">Direction · Clarity · Conviction · Precision</p>
          <p className="mt-4 font-sans text-xs tracking-[0.24em] text-[var(--grey-2)]">SYMSTRUO PRIVATE LIMITED · BENGALURU, INDIA</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-6">The Journey</p>
          <ul className="space-y-3 font-sans text-sm text-[var(--ivory-dim)]">
            {["Ideas", "Direction", "Execution", "Legacy"].map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-6">Connect</p>
          <ul className="space-y-3 font-sans text-sm text-[var(--ivory-dim)]">
            <li>
              <a href="https://www.linkedin.com/company/symstruo-private-limited/" target="_blank" rel="noopener noreferrer" className="link-underline inline-block">
                Company LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/symstruo" target="_blank" rel="noopener noreferrer" className="link-underline inline-block">
                Instagram (@symstruo)
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/dhanush-b-30792222a/" target="_blank" rel="noopener noreferrer" className="link-underline inline-block">
                Founder LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:dhanush@symstruo.com" className="link-underline inline-block">
                dhanush@symstruo.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-8 text-[0.7rem] tracking-[0.24em] text-[var(--grey-2)] md:flex-row">
        <span>© {new Date().getFullYear()} SYMSTRUO PRIVATE LIMITED</span>
        <span className="text-[var(--brass)]">+89° 15′ · TRUE NORTH</span>
        <span>DIRECTION · CLARITY · CONVICTION · PRECISION</span>
      </div>
    </div>
  </footer>
);

/* ---------------------------------------------------------- Service Page */
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, touchMultiplier: 1.6 });
    let id;
    const raf = (time) => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
};

const ServiceDetail = () => {
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
    <div className="App grain">
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
      <Toaster position="bottom-right" theme="dark" />
      <CircleCursor />
      <Nav />
      <main className="relative z-10">
        {/* header */}
        <section className="mx-auto max-w-[1500px] px-6 pt-40 pb-16 md:px-12 md:pt-52 md:pb-24" data-testid="service-detail">
          <Reveal>
            <button onClick={() => navigate("/#services")} className="link-underline mb-12 inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.24em] text-[var(--grey)]">
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
                  <p className="font-serif text-3xl leading-tight text-[var(--ivory)] md:text-4xl">Let's find your direction.</p>
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

/* -------------------------------------------------------------------- App */
const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const { hash } = useLocation();
  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, [hash]);

  return (
    <div className="App grain">
      <SEO
        title="SYMSTRUO — Venture Creation Company | Direction · Clarity · Conviction"
        description="SYMSTRUO is a global Venture Creation Company. We partner with founders to turn ideas into enduring businesses through venture strategy, business blueprints, brand architecture, growth systems, and investment readiness."
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <Starfield />
      </div>
      <Toaster position="bottom-right" theme="dark" />
      {loaded && <CircleCursor />}
      <Loader done={loaded} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Manifesto />
        <Services />
        <Insights />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/insights" element={<InsightsIndex />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
