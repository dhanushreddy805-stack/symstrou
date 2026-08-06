import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Star } from "./Compass";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Nav = () => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setOpen(false); scrollTo(id); };

  return (
    <header
      data-testid="site-nav"
      className="fixed top-0 left-0 z-50 w-full transition-colors duration-500"
      style={{
        background: solid ? "rgba(10,10,11,0.82)" : "transparent",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-12">
        <button data-testid="nav-logo" onClick={() => go("home")} className="flex items-center gap-3">
          <Star size={20} />
          <span className="font-sans text-sm tracking-[0.42em]">AEDIVOR</span>
        </button>

        <div className="hidden items-center gap-11 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              onClick={() => go(l.id)}
              className="link-underline font-sans text-xs tracking-[0.22em] text-[var(--ivory-dim)] transition-colors hover:text-[var(--ivory)]"
            >
              {l.label.toUpperCase()}
            </button>
          ))}
          <button
            data-testid="nav-cta"
            onClick={() => go("contact")}
            className="btn-ghost btn-fill border border-[var(--line)] px-6 py-2.5 font-sans text-xs tracking-[0.22em] text-[var(--ivory)]"
          >
            <span>START BUILDING</span>
          </button>
        </div>

        <button data-testid="nav-toggle" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--line)] bg-[var(--ink)] md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  data-testid={`nav-m-${l.id}`}
                  onClick={() => go(l.id)}
                  className="text-left font-serif text-3xl text-[var(--ivory)]"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
