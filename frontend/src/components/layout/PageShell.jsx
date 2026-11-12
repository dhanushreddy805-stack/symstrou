import React, { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import { CircleCursor } from "@/components/CircleCursor";
import { ScrollCompass } from "@/components/fx/ScrollCompass";
import { Footer } from "@/components/layout/Footer";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, touchMultiplier: 1.6 });
    let id;
    const raf = (time) => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
};

export const PageShell = ({ children }) => {
  useLenis();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="App grain" style={{ overflowX: "clip" }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80"><Starfield /></div>
      <Toaster position="top-right" offset={96} theme="dark" />
      <CircleCursor />
      <ScrollCompass />
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

