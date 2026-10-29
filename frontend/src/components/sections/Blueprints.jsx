import React from "react";
import { motion } from "framer-motion";

const S = { fill: "none", stroke: "var(--brass)", strokeWidth: 1, vectorEffect: "non-scaling-stroke" };
const F = { fill: "none", stroke: "rgba(242,238,228,0.35)", strokeWidth: 0.8, strokeDasharray: "3 4" };
const T = { fill: "var(--grey)", fontFamily: "JetBrains Mono, monospace", fontSize: 8, letterSpacing: 1.5 };

const Draw = ({ d, i = 0, style = S }) => (
  <motion.path d={d} {...style} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.6, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }} />
);

const DOTS = [[60, 70], [92, 180], [130, 120], [170, 60], [205, 200], [238, 150], [320, 200], [350, 80], [110, 220], [190, 100], [330, 140], [70, 140]];

const DRAWINGS = {
  "idea-lab": () => (
    <>
      {DOTS.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2" fill="rgba(242,238,228,0.5)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }} />
      ))}
      <Draw d="M280 110 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" i={1} />
      <Draw d="M280 110 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0" i={2} style={F} />
      <Draw d="M280 110 m-50 0 a50 50 0 1 0 100 0 a50 50 0 1 0 -100 0" i={3} style={F} />
      <Draw d="M220 110 H340 M280 50 V170" i={4} style={F} />
      <Draw d="M30 235 C 120 230, 200 170, 280 110" i={5} />
      <circle cx="280" cy="110" r="3.5" fill="var(--brass)" />
      <text x="292" y="98" {...T}>SIGNAL</text>
      <text x="30" y="250" {...T}>NOISE → OPPORTUNITY</text>
    </>
  ),
  "business-blueprint": () => (
    <>
      <Draw d="M40 34 H360 V222 H40 Z" i={0} />
      <Draw d="M40 128 H180 M180 34 V222 M180 150 H360 M262 34 V150" i={1} />
      <Draw d="M180 92 A28 28 0 0 1 208 120 M262 120 A22 22 0 0 0 284 142" i={2} style={F} />
      <Draw d="M40 18 H360 M40 13 V23 M360 13 V23 M372 34 V222 M367 34 H377 M367 222 H377" i={3} style={F} />
      <text x="72" y="84" {...T}>MODEL</text>
      <text x="72" y="180" {...T}>OPERATIONS</text>
      <text x="200" y="96" {...T}>REVENUE</text>
      <text x="284" y="96" {...T}>PRICING</text>
      <text x="240" y="190" {...T}>GO-TO-MARKET</text>
      <text x="186" y="12" {...T}>90 DAYS</text>
    </>
  ),
  "brand-architecture": () => (
    <>
      <Draw d="M22 20 H378 V240 H22 Z" i={0} style={F} />
      <Draw d="M242 20 V240 M242 156 H378 M294 156 V240 M242 188 H294 M274 156 V188" i={1} style={F} />
      <Draw d="M22 240 A220 220 0 0 1 242 20 A136 136 0 0 1 378 156 A84 84 0 0 1 294 240 A52 52 0 0 1 242 188 A32 32 0 0 1 274 156" i={2} />
      <circle cx="262" cy="176" r="3" fill="var(--brass)" />
      <text x="30" y="34" {...T}>φ 1.618</text>
      <text x="300" y="34" {...T}>IDENTITY</text>
    </>
  ),
  "growth-engine": () => (
    <>
      <Draw d="M40 226 H372 M40 226 V26" i={0} style={F} />
      <Draw d="M110 120 m-48 0 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0" i={1} style={F} />
      <Draw d="M110 72 V168 M62 120 H158 M76 86 L144 154 M144 86 L76 154" i={2} style={F} />
      <Draw d="M40 220 C 170 214, 260 170, 360 38" i={3} />
      <Draw d="M346 40 L360 38 L356 52" i={4} />
      {[[120, 211], [210, 188], [290, 128]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="var(--brass)" />)}
      <text x="48" y="244" {...T}>TRACTION</text>
      <text x="318" y="244" {...T}>SCALE</text>
    </>
  ),
  "investment-preparation": () => (
    <>
      <Draw d="M20 232 L118 142 L168 172 L250 62 L300 112 L382 232" i={0} />
      <Draw d="M60 232 L118 178 L168 200 L250 104 L290 140 L340 232" i={1} style={F} />
      <Draw d="M110 232 L168 214 L250 150 L300 232" i={2} style={F} />
      <Draw d="M250 62 V24 L278 33 L250 42" i={3} />
      {[0, 1, 2, 3, 4].map((i) => <Draw key={i} d={`M${40 + i * 26} 232 V${214 - i * 14}`} i={4 + i} style={F} />)}
      <text x="262" y="20" {...T}>CAPITAL</text>
      <text x="30" y="250" {...T}>READINESS ↑</text>
    </>
  ),
};

// Technical line drawing per service, drawn in on mount.
export const Blueprint = ({ slug, label, className = "" }) => {
  const Drawing = DRAWINGS[slug] || DRAWINGS["business-blueprint"];
  const id = `grid-${slug}`;
  return (
    <div className={`relative ${className}`} data-testid={`blueprint-${slug}`}>
      <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 H0 V20" fill="none" stroke="rgba(242,238,228,0.05)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="260" fill={`url(#${id})`} />
        <Drawing />
      </svg>
      {label && <span className="absolute bottom-1 right-1 font-mono text-[0.55rem] tracking-[0.3em] text-[var(--grey-2)]">{label}</span>}
    </div>
  );
};
