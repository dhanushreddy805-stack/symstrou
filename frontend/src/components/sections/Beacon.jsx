import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

const ist = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
const BARS = Array.from({ length: 28 });

// Live "secure channel" panel: breathing light bars, NDA status and live Bengaluru time.
export const Beacon = () => {
  const [time, setTime] = useState(ist());
  useEffect(() => {
    const t = setInterval(() => setTime(ist()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="lumen-card relative mt-14 overflow-hidden" data-testid="contact-signal">
      <div className="relative z-10 flex items-center justify-between px-6 pt-5 font-sans text-xs text-[var(--ivory-dim)]">
        <span className="inline-flex items-center gap-2"><span className="pulse-dot" /> Secure channel open</span>
        <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[var(--grey)]" data-testid="signal-time">IST {time}</span>
      </div>
      <div className="relative flex h-[150px] items-end gap-[3px] px-6 pb-0 pt-6">
        {BARS.map((_, i) => (
          <span key={i} className="signal-bar flex-1 rounded-t-full"
            style={{ animationDelay: `${(i * 137) % 1000 / -500}s`, animationDuration: `${1.4 + (i % 5) * 0.35}s` }} />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(0deg, rgba(9,9,10,0.95), transparent)" }} />
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-[var(--line)] px-6 py-4">
        <span className="inline-flex items-center gap-2 font-sans text-sm text-[var(--ivory)]"><ShieldCheck size={15} /> NDA active</span>
        <span className="font-sans text-xs text-[var(--grey)]">Reply within 24 hours</span>
      </div>
    </div>
  );
};
