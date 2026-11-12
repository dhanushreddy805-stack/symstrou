import React, { useState } from "react";
import axios from "axios";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { API } from "@/config/api";
import { Reveal } from "@/components/fx/Reveal";
import { Beacon } from "@/components/sections/Beacon";

export const Contact = () => {
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
              <button
                data-testid="contact-submit"
                type="submit"
                disabled={busy}
                className="pill-light group w-full disabled:opacity-50 sm:w-auto"
              >
                <span>{busy ? "Sending…" : "Send securely"}</span>
                <ArrowRight size={15} className="relative z-[1]" />
              </button>
              <p data-testid="contact-nda-note" className="flex items-center gap-3 font-sans text-xs leading-relaxed text-[var(--grey)]">
                <ShieldCheck size={15} className="shrink-0 text-[var(--brass)]" />
                Every idea you share is protected by our built-in NDA — your information stays confidential.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

