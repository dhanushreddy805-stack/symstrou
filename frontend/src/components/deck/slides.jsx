import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from "recharts";
import {
  Lightbulb, LayoutGrid, Gem, Rocket, Landmark, ArrowRight, Puzzle,
  Layers, Network, Handshake, Target, Users, Megaphone, Radio, Building2,
  ShieldCheck, TrendingUp, Quote, CircleDot, Mail, Phone,
} from "lucide-react";
import {
  BRAND, IMAGES, PROBLEMS, MARKET, MARKET_STATS, ECOSYSTEM, STEPS,
  REVENUE, TRACTION, COMP_COLS, COMP_ROWS, MOATS, GTM, SCENARIOS,
  FIN_ASSUMPTIONS, ALLOCATION, MILESTONES, INVEST_TERMS,
} from "@/data/deck";
import { SlideLayout, Eyebrow, GlassCard, Check, cn } from "./primitives";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};
function Reveal({ i = 0, children, className }) {
  return (
    <motion.div variants={fade} custom={i} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  );
}

/* 1 — COVER */
function Cover() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.cover} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#090C10] via-[#090C10]/85 to-[#090C10]/60" />
      </div>
      <Reveal i={0}>
        <div className="flex items-center gap-3">
          <img src="/logo-star.png" alt="mark" className="h-10 w-10 object-contain" />
          <Eyebrow>Investor Pitch · Confidential</Eyebrow>
        </div>
      </Reveal>

      <div className="max-w-5xl">
        <Reveal i={1}>
          <h1 className="font-ui text-5xl font-extralight uppercase leading-none tracking-[0.24em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            SYMSTRUO
          </h1>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-7 font-display text-2xl leading-tight text-[#F3E5AB] md:text-4xl">
            {BRAND.tagline}
          </p>
        </Reveal>
        <Reveal i={3}>
          <p className="mt-4 max-w-xl text-sm text-[#94A3B8] md:text-base">
            {BRAND.positioning} — an integrated system that takes founders from idea clarity to investment readiness.
          </p>
        </Reveal>
      </div>

      <Reveal i={4}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-2.5">
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#94A3B8]">Raising</span>
            <span className="font-display text-2xl font-medium gold-text">{BRAND.ask}</span>
          </div>
          <div className="h-8 w-px bg-[#222D3D]" />
          <div>
            <div className="text-sm font-medium text-white">{BRAND.founder}</div>
            <div className="text-xs text-[#94A3B8]">{BRAND.founderRole}</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* 2 — PROBLEM */
function Problem() {
  return (
    <SlideLayout
      eyebrow="01 · The Problem"
      title={<>Business-building is <span className="gold-text">fragmented</span>.</>}
      subtitle="Founders are forced to assemble disconnected support — and it costs them speed, capital and scale-readiness."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Reveal i={i} key={p.k}>
            <GlassCard className="flex h-full flex-col">
              <span className="font-mono-ui text-xs tracking-[0.3em] text-[#D4AF37]">{p.k}</span>
              <h3 className="mt-3 font-display text-2xl text-white">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#94A3B8]">{p.body}</p>
              <div className="mt-5 border-t border-[#222D3D] pt-4">
                <div className="font-display text-3xl font-medium text-white">{p.stat}</div>
                <div className="text-xs text-[#64748B]">{p.statLabel}</div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
      <Reveal i={3}>
        <p className="mt-6 text-sm text-[#64748B]">
          Strategy, brand, growth, systems and fundraising are treated as separate purchases — never as one architecture.
        </p>
      </Reveal>
    </SlideLayout>
  );
}

/* 3 — MARKET */
function Market() {
  return (
    <SlideLayout
      eyebrow="02 · Market Opportunity"
      title={<>Demand exists <span className="gold-text">before</span> venture scale.</>}
      subtitle="A large, growing pool of founders and businesses need structured growth support long before they are venture-ready."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="grid gap-4">
            {MARKET.map((m, i) => (
              <Reveal i={i} key={m.tier}>
                <div className="flex items-center justify-between rounded-xl border border-[#222D3D] bg-[#121720] p-5 transition-colors hover:border-[#D4AF37]/40">
                  <div>
                    <div className="font-display text-xl text-white">{m.tier}</div>
                    <div className="mt-1 max-w-md text-sm text-[#94A3B8]">{m.desc}</div>
                  </div>
                  <span className="ml-4 shrink-0 rounded-full border border-[#D4AF37]/30 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                    {m.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-4 lg:col-span-2">
          {MARKET_STATS.map((s, i) => (
            <Reveal i={i + 1} key={s.label}>
              <GlassCard hover={false} className="py-5">
                <div className="font-display text-4xl font-medium gold-text leading-none">{s.value}</div>
                <div className="mt-2 text-xs text-[#94A3B8]">{s.label}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 4 — SOLUTION & ECOSYSTEM */
const ECO_ICONS = { "idea-lab": Lightbulb, blueprint: LayoutGrid, brand: Gem, growth: Rocket, investment: Landmark };
function SolutionEcosystem() {
  const [active, setActive] = useState("idea-lab");
  const cur = ECOSYSTEM.find((e) => e.id === active);
  return (
    <SlideLayout
      eyebrow="03 · Solution & Ecosystem"
      title={<>One connected <span className="gold-text">business architecture</span>.</>}
      subtitle="Not another consulting deliverable — an integrated system of five modules, from idea clarity to investment readiness."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-wrap gap-3 lg:col-span-3 lg:flex-col">
          {ECOSYSTEM.map((e) => {
            const Icon = ECO_ICONS[e.id];
            const on = e.id === active;
            return (
              <button
                key={e.id}
                data-testid={`ecosystem-tab-${e.id}`}
                onClick={() => setActive(e.id)}
                className={cn(
                  "group flex flex-1 items-center gap-4 rounded-xl border p-4 text-left transition-all lg:flex-none",
                  on ? "border-[#D4AF37]/50 bg-[#D4AF37]/10" : "border-[#222D3D] bg-[#121720] hover:border-[#D4AF37]/30"
                )}
              >
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", on ? "bg-[#D4AF37] text-black" : "bg-white/5 text-[#D4AF37]")}>
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-lg text-white">{e.name}</span>
                  <span className="block text-xs text-[#94A3B8]">{e.line}</span>
                </span>
              </button>
            );
          })}
        </div>
        <motion.div key={active} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="lg:col-span-2">
          <div className="glass flex h-full flex-col rounded-xl border border-[#D4AF37]/30 p-6">
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">{cur.line}</span>
            <h3 className="mt-2 font-display text-3xl text-white">{cur.name}</h3>
            <p className="mt-3 text-sm text-[#94A3B8]">{cur.desc}</p>
            <ul className="mt-5 space-y-2.5 border-t border-[#222D3D] pt-5">
              {cur.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm text-white">
                  <CircleDot size={14} className="text-[#D4AF37]" /> {it}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}

/* 5 — HOW IT WORKS */
function HowItWorks() {
  const [active, setActive] = useState(0);
  const cur = STEPS[active];
  return (
    <SlideLayout
      eyebrow="04 · How It Works"
      title={<>A disciplined <span className="gold-text">operating roadmap</span>.</>}
      subtitle="From diagnosis to capital — a repeatable path, not improvisation."
    >
      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.n}
              data-testid={`step-${i}`}
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex-1 rounded-xl border p-4 text-left transition-all",
                on ? "border-[#D4AF37]/50 bg-[#D4AF37]/10" : "border-[#222D3D] bg-[#121720] hover:border-[#D4AF37]/30"
              )}
            >
              <div className={cn("font-mono-ui text-xs tracking-[0.3em]", on ? "text-[#D4AF37]" : "text-[#64748B]")}>{s.n}</div>
              <div className="mt-2 font-display text-lg leading-tight text-white">{s.title}</div>
              <div className="mt-1 text-[11px] text-[#64748B]">{s.when}</div>
            </button>
          );
        })}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <GlassCard hover={false} className="mt-6 flex items-start gap-5 border-[#D4AF37]/30">
          <div className="font-display text-5xl font-medium gold-text leading-none">{cur.n}</div>
          <div>
            <h3 className="font-display text-2xl text-white">{cur.title} <span className="ml-2 font-ui text-xs text-[#94A3B8]">· {cur.when}</span></h3>
            <p className="mt-2 max-w-2xl text-sm text-[#94A3B8]">{cur.desc}</p>
          </div>
        </GlassCard>
      </motion.div>
    </SlideLayout>
  );
}

/* 6 — BUSINESS MODEL */
const REV_ICONS = { packages: Puzzle, commissions: Handshake, retainers: Layers, premium: Gem };
function BusinessModel() {
  return (
    <SlideLayout
      eyebrow="05 · Business Model"
      title={<>A <span className="gold-text">dual-engine</span> revenue model.</>}
      subtitle="We earn through custom-built business packages and through commissions on the capital we help clients raise."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {REVENUE.map((r, i) => {
          const Icon = REV_ICONS[r.id];
          return (
            <Reveal i={i} key={r.id}>
              <GlassCard className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/12 text-[#D4AF37]"><Icon size={18} /></span>
                  <span className="rounded-full border border-[#222D3D] px-3 py-1 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">{r.tag}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-white">{r.name}</h3>
                <p className="mt-2 flex-1 text-sm text-[#94A3B8]">{r.desc}</p>
                <div className="mt-4 border-t border-[#222D3D] pt-3">
                  <span className="font-display text-2xl font-medium gold-text">{r.metric}</span>
                  <span className="ml-2 text-xs text-[#64748B]">{r.metricLabel}</span>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </SlideLayout>
  );
}

/* 7 — TRACTION */
function Traction() {
  return (
    <SlideLayout
      eyebrow="06 · Traction & Proof"
      title={<>Early, and <span className="gold-text">honestly</span> presented.</>}
      subtitle="We are choosing credibility over inflated claims. The demand signals are real and pre-launch."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {TRACTION.map((t, i) => (
            <Reveal i={i} key={t.title}>
              <GlassCard className="h-full">
                <ShieldCheck className="text-[#D4AF37]" size={20} />
                <h3 className="mt-3 font-display text-xl text-white">{t.title}</h3>
                <p className="mt-1.5 text-sm text-[#94A3B8]">{t.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal i={2}>
          <div className="glass flex h-full flex-col justify-between rounded-xl border border-[#D4AF37]/30 p-6">
            <Quote className="text-[#D4AF37]" size={22} />
            <p className="font-display text-xl leading-snug text-white">
              Exact pre-sales figures and client names are shared under NDA during diligence.
            </p>
            <div className="mt-4 border-t border-[#222D3D] pt-4">
              <div className="text-sm font-medium text-white">{BRAND.founder}</div>
              <div className="text-xs text-[#94A3B8]">{BRAND.founderRole}, SYMSTRUO</div>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideLayout>
  );
}

/* 8 — COMPETITION & ADVANTAGE */
const MOAT_ICONS = [Network, Layers, TrendingUp, Handshake];
function CompetitionAdvantage() {
  return (
    <SlideLayout
      eyebrow="07 · Competition & Advantage"
      title={<>Everyone owns a <span className="gold-text">piece</span>. We own the system.</>}
      subtitle="Agencies, consultants, branding firms and studios each solve a fragment — SYMSTRUO integrates and compounds them."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-[36%] p-2.5 text-left font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#64748B]">Capability</th>
                  {COMP_COLS.map((c, i) => (
                    <th key={c} className={cn("p-2.5 text-center font-ui text-[11px]", i === 0 ? "text-[#D4AF37]" : "text-[#94A3B8]")}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row) => (
                  <tr key={row.cap} className="border-t border-[#222D3D]">
                    <td className="p-2.5 text-left text-[13px] text-[#F8FAFC]">{row.cap}</td>
                    {row.v.map((val, ci) => (
                      <td key={ci} className={cn("p-2.5 text-center", ci === 0 && "bg-[#D4AF37]/5")}>
                        <span className="inline-flex justify-center"><Check ok={val} /></span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid content-start gap-3 lg:col-span-2">
          {MOATS.map((m, i) => {
            const Icon = MOAT_ICONS[i];
            return (
              <div key={m.title} className="flex items-start gap-3 rounded-xl border border-[#222D3D] bg-[#121720] p-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/12 text-[#D4AF37]"><Icon size={16} /></span>
                <div>
                  <h3 className="font-display text-base text-white">{m.title}</h3>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 9 — GO TO MARKET */
const GTM_ICONS = [Target, Users, Megaphone, Radio, Building2];
function GoToMarket() {
  return (
    <SlideLayout
      eyebrow="08 · Go-To-Market"
      title={<>Founder-led, <span className="gold-text">relationship-driven</span>.</>}
      subtitle="A disciplined acquisition motion built on trust before spend."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {GTM.map((g, i) => {
          const Icon = GTM_ICONS[i];
          return (
            <Reveal i={i} key={g.title}>
              <GlassCard className="flex h-full flex-col">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#D4AF37]"><Icon size={18} /></span>
                <h3 className="mt-4 font-display text-lg leading-tight text-white">{g.title}</h3>
                <p className="mt-2 flex-1 text-xs text-[#94A3B8]">{g.desc}</p>
                <span className="mt-3 font-mono-ui text-[10px] tracking-[0.3em] text-[#64748B]">0{i + 1}</span>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </SlideLayout>
  );
}

/* 10 — FINANCIAL MODEL */
function Financials() {
  const [sc, setSc] = useState("Base");
  const data = SCENARIOS[sc];
  return (
    <SlideLayout
      eyebrow="09 · Financial Model"
      title={<>Conservative logic, <span className="gold-text">defensible</span> math.</>}
      subtitle="High-ticket, expertise-led delivery with strong gross margins. No aggressive fantasy projections."
    >
      <div className="mb-5 flex gap-2">
        {Object.keys(SCENARIOS).map((k) => (
          <button
            key={k}
            data-testid={`scenario-${k.toLowerCase()}`}
            onClick={() => setSc(k)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs transition-all",
              sc === k ? "border-[#D4AF37] bg-[#D4AF37] text-black" : "border-[#222D3D] text-[#94A3B8] hover:border-[#D4AF37]/40"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="h-[240px] w-full rounded-xl border border-[#222D3D] bg-[#121720] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
                <XAxis dataKey="year" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0C1016", border: "1px solid #222D3D", borderRadius: 12, color: "#fff" }}
                  formatter={(v) => [`₹${v}L`, "Revenue"]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} isAnimationActive={false} dot={{ r: 5, fill: "#D4AF37", stroke: "#090C10", strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {data.map((d) => (
              <div key={d.year} className="rounded-lg border border-[#222D3D] bg-[#121720] p-3 text-center">
                <div className="text-[11px] text-[#64748B]">{d.year}</div>
                <div className="font-display text-2xl font-medium gold-text">₹{d.revenue}L</div>
                <div className="text-[11px] text-[#94A3B8]">{d.margin}% margin</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <GlassCard hover={false} className="h-full">
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">Assumptions</span>
            <ul className="mt-4 space-y-3">
              {FIN_ASSUMPTIONS.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" /> {a}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 11 — INVESTMENT ASK & USE OF CAPITAL */
function AskCapital() {
  const [hover, setHover] = useState(null);
  return (
    <SlideLayout
      eyebrow="10 · Investment Ask & Use of Capital"
      title={<>Raising <span className="gold-text">₹20 Lakhs</span> to build the company.</>}
      subtitle="Growth-enabling capital for company building, hiring and working capital — every rupee allocated."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="glass flex flex-col justify-center rounded-2xl border border-[#D4AF37]/40 p-6 text-center">
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-[#94A3B8]">Total Raise</span>
            <div className="mt-1 font-display text-6xl font-medium gold-text leading-none">₹20L</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {INVEST_TERMS.map((t) => (
              <div key={t.label} className="rounded-xl border border-[#222D3D] bg-[#121720] p-3">
                <div className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-[#64748B]">{t.label}</div>
                <div className="mt-1 font-display text-base text-white">{t.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="relative shrink-0" style={{ width: 190, height: 190 }}>
              <PieChart width={190} height={190}>
                <Pie
                  data={ALLOCATION} dataKey="value" nameKey="name" cx={95} cy={95}
                  innerRadius={54} outerRadius={82} paddingAngle={2} stroke="none" isAnimationActive={false}
                  onMouseEnter={(_, i) => setHover(i)} onMouseLeave={() => setHover(null)}
                >
                  {ALLOCATION.map((a, i) => (
                    <Cell key={a.name} fill={a.color} opacity={hover === null || hover === i ? 1 : 0.4} />
                  ))}
                </Pie>
              </PieChart>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-medium gold-text">₹20L</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#64748B]">Total</span>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-1.5 sm:grid-cols-2">
              {ALLOCATION.map((a, i) => (
                <div
                  key={a.name}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                  className={cn("flex items-center gap-2.5 rounded-lg border p-2 transition-colors", hover === i ? "border-[#D4AF37]/40 bg-[#121720]" : "border-transparent")}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: a.color }} />
                  <span className="min-w-0 flex-1 truncate text-xs text-white">{a.name}</span>
                  <span className="font-display text-base font-medium text-white">₹{a.value}L</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {MILESTONES.map((m, i) => (
          <Reveal i={i} key={m.q}>
            <div className="rounded-xl border border-[#222D3D] bg-[#121720] p-4">
              <span className="font-mono-ui text-xs tracking-[0.3em] text-[#D4AF37]">{m.q}</span>
              <div className="mt-1.5 font-display text-lg text-white">{m.title}</div>
              <p className="mt-1 text-xs text-[#94A3B8]">{m.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideLayout>
  );
}

/* 12 — VISION & CONTACT */
function VisionContact({ onExpress }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.architecture} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#090C10] via-[#090C10]/90 to-[#090C10]/60" />
      </div>
      <div>
        <Eyebrow>11 · Vision</Eyebrow>
        <h2 className="mt-3 max-w-4xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
          The <span className="gold-text">operating layer</span> for founders who need structure before scale.
        </h2>
        <p className="mt-5 max-w-2xl text-sm text-[#94A3B8] md:text-base">
          SYMSTRUO evolves from service delivery into repeatable systems, IP and long-term
          business-building infrastructure — a durable engine, not a project shop.
        </p>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3 font-ui text-3xl font-extralight uppercase tracking-[0.24em] text-white md:text-4xl">SYMSTRUO</div>
          <div className="font-display text-xl text-white">{BRAND.founder}</div>
          <div className="text-sm text-[#94A3B8]">{BRAND.founderRole}</div>
          <div className="mt-3 space-y-1.5">
            <a href={`mailto:${BRAND.contactEmail}`} data-testid="contact-email" className="flex items-center gap-2 text-sm text-[#F3E5AB] transition-colors hover:text-white">
              <Mail size={15} className="text-[#D4AF37]" /> {BRAND.contactEmail}
            </a>
            <a href={`tel:${BRAND.contactPhone.replace(/\s/g, "")}`} data-testid="contact-phone" className="flex items-center gap-2 text-sm text-[#F3E5AB] transition-colors hover:text-white">
              <Phone size={15} className="text-[#D4AF37]" /> {BRAND.contactPhone}
            </a>
          </div>
        </div>
        <button
          data-testid="express-interest-button"
          onClick={onExpress}
          className="group flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-3.5 font-medium text-black transition-all hover:bg-[#E5C158]"
        >
          Express Interest
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export const SLIDES = [
  { id: "cover", label: "Cover", Component: Cover },
  { id: "problem", label: "Problem", Component: Problem },
  { id: "market", label: "Market", Component: Market },
  { id: "solution", label: "Solution & Ecosystem", Component: SolutionEcosystem },
  { id: "how", label: "How It Works", Component: HowItWorks },
  { id: "model", label: "Business Model", Component: BusinessModel },
  { id: "traction", label: "Traction", Component: Traction },
  { id: "competition", label: "Competition & Advantage", Component: CompetitionAdvantage },
  { id: "gtm", label: "Go-To-Market", Component: GoToMarket },
  { id: "financials", label: "Financial Model", Component: Financials },
  { id: "ask", label: "Ask & Use of Capital", Component: AskCapital },
  { id: "vision", label: "Vision & Contact", Component: VisionContact },
];
