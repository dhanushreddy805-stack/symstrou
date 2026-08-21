import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  ChevronLeft, ChevronRight, LayoutGrid, Download, X, Keyboard, Loader2,
} from "lucide-react";
import { SLIDES } from "./slides";
import { BRAND } from "@/data/deck";
import { BrandMark, cn } from "./primitives";

function ExpressInterestModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  if (!open) return null;
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please add your name and email.");
      return;
    }
    toast.success("Thank you — your interest has been noted. We'll be in touch.");
    setForm({ name: "", email: "", note: "" });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} data-testid="modal-overlay" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass relative z-10 w-full max-w-md rounded-2xl border border-[#D4AF37]/40 p-7"
      >
        <button onClick={onClose} data-testid="modal-close" className="absolute right-4 top-4 text-[#64748B] hover:text-white">
          <X size={18} />
        </button>
        <BrandMark size={24} />
        <h3 className="mt-5 font-display text-2xl text-white">Express Interest</h3>
        <p className="mt-1 text-sm text-[#94A3B8]">Explore the ₹20L opportunity with {BRAND.founder}.</p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            data-testid="interest-name" placeholder="Your name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[#222D3D] bg-[#0C1016] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#D4AF37] focus:outline-none"
          />
          <input
            data-testid="interest-email" type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[#222D3D] bg-[#0C1016] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#D4AF37] focus:outline-none"
          />
          <textarea
            data-testid="interest-note" placeholder="Anything you'd like to know? (optional)" rows={3} value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full resize-none rounded-lg border border-[#222D3D] bg-[#0C1016] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:border-[#D4AF37] focus:outline-none"
          />
          <button data-testid="interest-submit" type="submit" className="w-full rounded-lg bg-[#D4AF37] py-3 font-medium text-black transition-colors hover:bg-[#E5C158]">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function Overview({ open, onClose, onJump, current }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-5xl">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">All Slides</span>
          <button onClick={onClose} data-testid="overview-close" className="text-[#64748B] hover:text-white"><X size={20} /></button>
        </div>
        <div className="deck-scroll grid max-h-[70vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
          {SLIDES.map((s, i) => (
            <button
              key={s.id} data-testid={`overview-slide-${i}`}
              onClick={() => { onJump(i); onClose(); }}
              className={cn(
                "flex aspect-video flex-col justify-between rounded-lg border p-3 text-left transition-all",
                current === i ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-[#222D3D] bg-[#121720] hover:border-[#D4AF37]/40"
              )}
            >
              <span className="font-mono-ui text-[10px] tracking-[0.2em] text-[#64748B]">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-sm leading-tight text-white">{s.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function initialSlide() {
  try {
    const p = new URLSearchParams(window.location.search).get("slide");
    const n = parseInt(p, 10);
    if (!isNaN(n)) return Math.max(0, Math.min(SLIDES.length - 1, n - 1));
  } catch (e) {}
  return 0;
}

export default function Deck() {
  const [idx, setIdx] = useState(initialSlide);
  const [dir, setDir] = useState(1);
  const [overview, setOverview] = useState(false);
  const [interest, setInterest] = useState(false);
  const [hint, setHint] = useState(true);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef(null);

  const go = useCallback((n) => {
    setIdx((p) => {
      const next = Math.max(0, Math.min(SLIDES.length - 1, n));
      setDir(next >= p ? 1 : -1);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (overview || interest || exporting) return;
      const t = e.target;
      if (t && ["INPUT", "TEXTAREA", "BUTTON", "SELECT"].includes(t.tagName)) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(idx + 1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(idx - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDES.length - 1);
      else if (e.key.toLowerCase() === "g") setOverview(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, go, overview, interest, exporting]);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 4500);
    return () => clearTimeout(t);
  }, []);

  const exportPDF = async () => {
    if (exporting) return;
    setExporting(true);
    const tId = toast.loading("Generating PDF… this takes a few seconds");
    await new Promise((r) => setTimeout(r, 900));
    try {
      const pages = exportRef.current.querySelectorAll(".export-page");
      const W = 1280, H = 720;
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [W, H] });
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2, backgroundColor: "#090C10", useCORS: true, logging: false, width: W, height: H,
          windowWidth: W, windowHeight: H,
        });
        const img = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage([W, H], "landscape");
        pdf.addImage(img, "JPEG", 0, 0, W, H);
      }
      pdf.save("SYMSTRUO-Pitch-Deck.pdf");
      console.log("PDF_EXPORT_SUCCESS pages=" + pages.length);
      toast.success("PDF downloaded", { id: tId });
    } catch (e) {
      console.error("PDF_EXPORT_FAIL", e);
      toast.error("PDF export failed — please try again", { id: tId });
    }
    setExporting(false);
  };

  const Current = SLIDES[idx].Component;
  const progress = ((idx + 1) / SLIDES.length) * 100;

  return (
    <>
      <div className="grain relative h-screen w-screen overflow-hidden bg-[#090C10]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#5C7A99]/10 blur-[120px]" />

        <div className="absolute left-0 top-0 z-30 h-[3px] w-full bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37]" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>

        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
          <button onClick={() => go(0)} data-testid="brand-home" className="opacity-90 transition-opacity hover:opacity-100">
            <BrandMark size={30} />
          </button>
          <div className="flex items-center gap-2">
            <span className="mr-1 hidden font-mono-ui text-xs tracking-[0.25em] text-[#94A3B8] sm:inline">
              {String(idx + 1).padStart(2, "0")} <span className="text-[#3b4657]">/ {SLIDES.length}</span>
            </span>
            <button onClick={() => setOverview(true)} data-testid="open-overview" title="All slides (G)"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#222D3D] text-[#94A3B8] transition-colors hover:border-[#D4AF37]/40 hover:text-white">
              <LayoutGrid size={16} />
            </button>
            <button onClick={exportPDF} disabled={exporting} data-testid="export-pdf-button" title="Download PDF"
              className="flex h-9 items-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 text-[#F3E5AB] transition-colors hover:bg-[#D4AF37]/20 disabled:opacity-60">
              {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
              <span className="hidden text-xs md:inline">{exporting ? "Preparing…" : "Download PDF"}</span>
            </button>
          </div>
        </header>

        <main className="absolute inset-0 flex items-center px-6 pb-24 pt-20 md:px-12 md:pb-24 md:pt-24">
          <div className="relative h-full max-h-[calc(100vh-160px)] w-full">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={SLIDES[idx].id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Current onExpress={() => setInterest(true)} />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.25em] text-[#64748B]">{SLIDES[idx].label}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => go(idx - 1)} disabled={idx === 0} data-testid="prev-slide-button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222D3D] text-white transition-all hover:border-[#D4AF37]/50 disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => go(idx + 1)} disabled={idx === SLIDES.length - 1} data-testid="next-slide-button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-black transition-all hover:bg-[#E5C158] disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>

        <AnimatePresence>
          {hint && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#222D3D] bg-[#0C1016]/90 px-4 py-2">
              <span className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
                <Keyboard size={13} /> Use ← → to navigate · G for overview
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <Overview open={overview} onClose={() => setOverview(false)} onJump={go} current={idx} />
        <ExpressInterestModal open={interest} onClose={() => setInterest(false)} />
      </div>

      {/* OFFSCREEN EXPORT DECK (for real PDF generation) */}
      {exporting && (
        <div ref={exportRef} className="exporting" style={{ position: "fixed", left: "-10000px", top: 0, zIndex: -1 }}>
          {SLIDES.map((s, i) => {
            const C = s.Component;
            return (
              <div
                key={s.id}
                className="export-page grain"
                style={{ width: 1280, height: 720, background: "#090C10", color: "#F8FAFC", padding: "46px 56px", position: "relative", overflow: "hidden" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src="/logo-star.png" alt="" style={{ width: 22, height: 22 }} />
                    <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 300, letterSpacing: "0.4em", fontSize: 12, color: "#fff" }}>SYMSTRUO</span>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: "0.2em", color: "#64748B" }}>
                    {String(i + 1).padStart(2, "0")} / {SLIDES.length}
                  </span>
                </div>
                <div style={{ height: "calc(100% - 42px)" }}>
                  <C onExpress={() => {}} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Toaster theme="dark" position="bottom-center" richColors />
    </>
  );
}
