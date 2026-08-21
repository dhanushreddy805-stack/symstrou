import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...a) => twMerge(clsx(a));

export function Eyebrow({ children, className }) {
  return (
    <span className={cn("font-mono-ui text-[11px] uppercase tracking-[0.32em] text-[#D4AF37]", className)}>
      {children}
    </span>
  );
}

export function BrandMark({ size = 26, showWord = true, className }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img src="/logo-star.png" alt="SYMSTRUO mark" style={{ width: size, height: size }} className="object-contain" />
      {showWord && (
        <span className="font-ui text-sm font-light uppercase tracking-[0.4em] text-white/90">SYMSTRUO</span>
      )}
    </div>
  );
}

export function GlassCard({ children, className, hover = true, ...rest }) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-5 md:p-6 transition-all duration-300",
        hover && "hover:border-[#D4AF37]/40 hover:-translate-y-0.5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Stat({ value, label, className }) {
  return (
    <div className={cn("", className)}>
      <div className="font-display text-4xl md:text-5xl font-medium gold-text leading-none">{value}</div>
      <div className="mt-2 text-xs md:text-sm text-[#94A3B8]">{label}</div>
    </div>
  );
}

export function SlideLayout({ eyebrow, title, subtitle, children, className, contentClassName }) {
  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <div className="shrink-0">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="mt-3 font-display text-[34px] leading-[1.02] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
            {title}
          </h2>
        )}
        {subtitle && <p className="mt-3 max-w-3xl text-sm text-[#94A3B8] md:text-base">{subtitle}</p>}
        <div className="hairline mt-5 w-full max-w-[220px]" />
      </div>
      <div className={cn("slide-area deck-scroll mt-6 min-h-0 flex-1 overflow-y-auto pr-1 md:mt-8", contentClassName)}>
        {children}
      </div>
    </div>
  );
}

export function Check({ ok }) {
  if (ok === true)
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (ok === "partial")
    return <span className="inline-block h-1.5 w-3 rounded-full bg-[#64748B]" />;
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 text-[#3b4657]">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
      </svg>
    </span>
  );
}
