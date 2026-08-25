import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mark, Wordmark } from "./Compass";

const LINKS = [
  { label: "Home", id: "home", path: "/" },
  { label: "About", id: "about", path: "/about" },
  { label: "Services", id: "services", path: "/services" },
  { label: "Insights", id: "insights", path: "/insights" },
  { label: "FAQ", id: "faq", path: "/faq" },
  { label: "Contact", id: "contact", path: "/contact" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const go = (link) => {
    setOpen(false);
    const targetId = typeof link === "string" ? link : link.id || link.path?.replace("/", "");

    if (targetId === "insights") {
      navigate("/insights");
      return;
    }

    if (targetId === "faq") {
      navigate("/faq");
      return;
    }

    // For Home and on-page sections (home, about, services, contact)
    if (pathname !== "/") {
      navigate("/", { state: { scrollTo: targetId === "home" ? null : targetId } });
    } else {
      if (targetId === "home" || !targetId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollTo(targetId);
      }
    }
  };

  return (
    <header
      data-testid="site-nav"
      className="fixed top-0 left-0 z-50 w-full transition-colors duration-500"
      style={{
        background: solid || open ? "rgba(10,10,11,0.92)" : "transparent",
        backdropFilter: solid || open ? "blur(20px)" : "none",
        borderBottom: solid || open ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <button
          data-testid="nav-logo"
          onClick={() => go({ path: "/" })}
          className="flex items-center gap-3 active:scale-95 transition-transform"
        >
          <Mark size={24} />
          <Wordmark height={14} className="mt-[1px]" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-9 lg:gap-11 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              onClick={() => go(l)}
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

        {/* Mobile Hamburger Toggle */}
        <button
          data-testid="nav-toggle"
          aria-label="Toggle Navigation Menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ivory)] active:bg-[var(--line)] md:hidden transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Luxury Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[65px] h-[calc(100dvh-65px)] flex flex-col justify-between overflow-y-auto bg-[var(--ink)] px-6 py-8 md:hidden"
            style={{
              background: "radial-gradient(circle at top right, rgba(184,148,95,0.06), var(--ink) 70%)",
            }}
          >
            {/* Nav Links */}
            <div className="flex flex-col space-y-4 pt-2">
              <span className="eyebrow mb-2">Navigation</span>
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  data-testid={`nav-m-${l.id}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  onClick={() => go(l)}
                  className="flex items-center justify-between py-2 text-left font-serif text-3xl text-[var(--ivory)] active:text-[var(--brass)] transition-colors border-b border-[rgba(242,238,228,0.04)] pb-3"
                >
                  <span>{l.label}</span>
                  <span className="font-sans text-xs tracking-[0.2em] text-[var(--brass)] opacity-70">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Mobile CTA & Quick Contacts */}
            <div className="space-y-6 pt-8 pb-4">
              <button
                onClick={() => go("contact")}
                className="btn-ghost btn-fill flex w-full items-center justify-center gap-3 border border-[var(--ivory)] py-4 font-sans text-xs tracking-[0.24em] text-[var(--ivory)]"
              >
                <span>START BUILDING</span>
                <ArrowUpRight size={14} className="relative z-[1]" />
              </button>

              <div className="border-t border-[var(--line)] pt-6">
                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <p className="eyebrow mb-2">Connect</p>
                    <div className="flex flex-col space-y-2 text-[var(--ivory-dim)]">
                      <a
                        href="https://www.linkedin.com/company/symstruo-private-limited/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--brass)] transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://www.instagram.com/symstruo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--brass)] transition-colors"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Location</p>
                    <p className="text-[var(--ivory-dim)]">Bengaluru, India</p>
                    <p className="mt-2 text-[0.7rem] text-[var(--grey)]">dhanush@symstruo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
