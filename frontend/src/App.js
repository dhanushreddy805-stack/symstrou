import React, { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Plus, Linkedin, Instagram, Twitter } from "lucide-react";
import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Star, Mark, Wordmark } from "@/components/Compass";
import { Reveal, EASE } from "@/components/fx/Reveal";
import { ScrollCompass } from "@/components/fx/ScrollCompass";
import { Loader } from "@/components/sections/Loader";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { InsightsRail, InsightCard } from "@/components/sections/Insights";
import { CTA } from "@/components/sections/CTA";
import { Beacon } from "@/components/sections/Beacon";
import { Blueprint } from "@/components/sections/Blueprints";
import { Starfield } from "@/components/Starfield";
import { CircleCursor } from "@/components/CircleCursor";
import { SERVICE_DETAILS, SERVICE_ORDER } from "@/data/serviceDetails";
import { INSIGHTS } from "@/data/insights";
import { SEO } from "@/components/SEO";

// Home FAQ shows a curated subset (questions 1, 2, 4, 20, 12, 6).
const HOME_FAQ = [0, 1, 3, 19, 11, 5];

let rawBackendUrl = (process.env.REACT_APP_BACKEND_URL || "").trim();
if (!rawBackendUrl) console.error("REACT_APP_BACKEND_URL is not set; the contact form is disabled.");

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

const API = rawBackendUrl ? `${formattedBackendUrl.replace(/\/$/, "")}/api` : null;

const IMG = {
  about: "https://images.unsplash.com/photo-1565371557106-c2abcc6fb36a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  process: "https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  cta: "https://images.unsplash.com/photo-1615141328086-72a5a01b1b25?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
};

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ------------------------------------------------------------------ About */
const AboutPage = () => (
  <Page>
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
  </Page>
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
  <section id="faq" className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-36" data-testid="faq">
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

/* ----------------------------------------------------------- Page shell */
const Page = ({ children }) => {
  useLenis();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="App grain">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80"><Starfield /></div>
      <Toaster position="bottom-right" theme="dark" />
      <CircleCursor />
      <ScrollCompass />
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
    <section className="mx-auto max-w-[1500px] px-6 pt-32 pb-20 md:px-12 md:pt-52 md:pb-32" data-testid="insights-page">
      <Reveal><span className="eyebrow">Insights</span></Reveal>
      <Reveal delay={0.05}>
        <h1 className="serif-display mt-6 max-w-4xl text-5xl md:text-7xl">Thinking, before building.</h1>
      </Reveal>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {INSIGHTS.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 0.06}><InsightCard a={a} i={i} className="h-full min-h-[420px]" /></Reveal>
        ))}
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
  </Page>
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
    if (!API) {
      toast.error("The contact form isn't connected right now. Please email dhanush@symstruo.com.");
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
    <section id="contact" className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-36" data-testid="contact">
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
          <Reveal delay={0.1}><Beacon /></Reveal>
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
          <p className="eyebrow mb-6">Site</p>
          <ul className="space-y-3 font-sans text-sm text-[var(--ivory-dim)]">
            {[
              ["Home", "/"],
              ["About SYMSTRUO", "/about"],
              ["Services", "/#services"],
              ["Insights", "/insights"],
              ["FAQ", "/faq"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="link-underline inline-block hover:text-[var(--brass)] transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-6">Connect</p>
          <ul className="space-y-3 font-sans text-sm text-[var(--ivory-dim)]">
            <li>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/symstruo-private-limited/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brass)] transition-colors" aria-label="Company LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>

                <a href="https://www.instagram.com/symstruo" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brass)] transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://x.com/symstruo?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brass)] transition-colors" aria-label="X (Twitter)">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </li>
            <li>
              <a href="mailto:dhanush@symstruo.com" className="link-underline inline-block">
                dhanush@symstruo.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div aria-hidden="true" data-testid="footer-mega"
        className="footer-mega mt-24 select-none overflow-hidden whitespace-nowrap text-center font-serif text-[21vw] leading-[0.8] tracking-[-0.02em] lg:text-[17rem]">
        SYMSTRUO
      </div>
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-8 text-[0.7rem] tracking-[0.24em] text-[var(--grey-2)] md:flex-row">
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
      <ScrollCompass />
      <Nav />
      <main className="relative z-10">
        {/* header */}
        <section className="mx-auto max-w-[1500px] px-6 pt-32 pb-14 md:px-12 md:pt-52 md:pb-24" data-testid="service-detail">
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

/* -------------------------------------------------------------------- App */
const Home = () => {
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
        title="SYMSTRUO — Venture Creation Company | Direction · Clarity · Conviction"
        description="SYMSTRUO is a global Venture Creation Company. We partner with founders to turn ideas into enduring businesses through venture strategy, business blueprints, brand architecture, growth systems, and investment readiness."
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <Starfield />
      </div>
      <Toaster position="bottom-right" theme="dark" />
      {loaded && <CircleCursor />}
      <Loader done={loaded} />
      <ScrollCompass />
      <Nav />
      <main className="relative z-10">
        <Hero ready={loaded} onStart={() => scrollTo("contact")} />
        <Marquee />
        <Manifesto />
        <Services services={SERVICES} />
        <InsightsRail />
        <FAQ />
        <CTA onStart={() => scrollTo("contact")} />
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
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
