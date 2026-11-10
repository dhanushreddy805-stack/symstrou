import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Linkedin, Instagram, Twitter } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mark, Wordmark } from "./Compass";

const LINKS = [
  { label: "Home", id: "home", href: "/" },
  { label: "About", id: "about", href: "/about" },
  { label: "Services", id: "services", href: "/services" },
  { label: "Insights", id: "insights", href: "/insights" },
  { label: "NDA", id: "nda", href: "/nda" },
  { label: "FAQ", id: "faq", href: "/faq" },
];

export const Nav = () => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    if (href === "#contact") {
      if (pathname !== "/") navigate("/", { state: { scrollTo: "contact" } });
      else setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), open ? 400 : 0);
      return;
    }
    if (href === "/" && pathname === "/") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    navigate(href);
  };

  return (
    <header data-testid="site-nav" className="fixed left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="/" data-testid="nav-logo" onClick={(e) => { e.preventDefault(); go("/"); }}
          className="flex items-center gap-3 transition-transform active:scale-95">
          <Mark size={24} />
          <Wordmark height={13} className="mt-[1px] hidden sm:block" />
        </a>

        <div className={`glass-pill hidden items-center gap-1 p-1.5 transition-shadow duration-500 md:flex ${solid ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.9)]" : ""}`}>
          {LINKS.map((l) => {
            const on = l.href === pathname;
            return (
              <a key={l.id} href={l.href} data-testid={`nav-${l.id}`} onClick={(e) => { e.preventDefault(); go(l.href); }}
                className={`relative rounded-full px-4 py-2 font-sans text-[0.8rem] transition-colors duration-300 lg:px-5 ${on ? "text-[var(--ivory)]" : "text-[var(--grey)] hover:text-[var(--ivory)]"}`}>
                {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[rgba(244,244,245,0.08)] ring-1 ring-[rgba(244,244,245,0.1)]" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <button data-testid="nav-cta" onClick={() => go("#contact")} className="pill-light !px-6 !py-2.5">
            Start Building
          </button>
        </div>

        <button data-testid="nav-toggle" aria-label="Toggle Navigation Menu" onClick={() => setOpen((v) => !v)}
          className="glass-pill flex h-11 w-11 items-center justify-center text-[var(--ivory)] md:hidden">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div data-testid="nav-mobile-drawer"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[76px] z-50 flex h-[calc(100dvh-76px)] flex-col justify-between overflow-y-auto px-6 py-8 md:hidden"
            style={{ backgroundColor: "#070708", backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(205,209,217,0.14), transparent 60%)" }}>
            <div className="flex flex-col pt-2">
              {LINKS.map((l, i) => (
                <motion.a key={l.id} href={l.href} data-testid={`nav-m-${l.id}`}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                  className="flex items-center justify-between border-b border-[var(--line)] py-4 font-sans text-3xl font-light text-[var(--ivory)]">
                  <span>{l.label}</span>
                  <span className="font-mono text-[0.65rem] text-[var(--grey-2)]">0{i + 1}</span>
                </motion.a>
              ))}
            </div>
            <div className="space-y-6 pb-4 pt-8">
              <button data-testid="nav-m-cta" onClick={() => go("#contact")} className="pill-light w-full">
                Start Building <ArrowUpRight size={14} />
              </button>
              <div className="flex items-center justify-between border-t border-[var(--line)] pt-6 text-[var(--ivory-dim)]">
                <div className="flex items-center gap-5">
                  <a href="https://www.linkedin.com/company/symstruo-private-limited/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                  <a href="https://www.instagram.com/symstruo" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                  <a href="https://x.com/symstruo?s=11" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><Twitter className="h-5 w-5" /></a>
                </div>
                <span className="font-sans text-xs text-[var(--grey)]">Bengaluru, India</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
