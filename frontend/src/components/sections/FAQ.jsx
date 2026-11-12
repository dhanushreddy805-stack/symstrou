import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal, EASE } from "@/components/fx/Reveal";
import { FAQS, HOME_FAQ } from "@/data/faqs";

export const FAQItem = ({ q, a, idx }) => {
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
          <span className="pt-1.5 font-mono text-xs text-[var(--brass)] opacity-80">{String(idx + 1).padStart(2, "0")}</span>
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

export const FAQ = () => (
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

