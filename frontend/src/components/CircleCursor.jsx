import React, { useEffect, useRef } from "react";

const TRAIL = 22;

// Plain round cursor with a faint silver glow trail.
export const CircleCursor = () => {
  const ring = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("has-cursor");
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    const size = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    size();
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, raf;
    const pts = [];

    const move = (e) => { mx = e.clientX; my = e.clientY; };
    const over = (e) => {
      const t = e.target.closest("a, button, input, textarea, [role='button'], [data-cursor]");
      document.body.classList.toggle("cursor-active", !!t);
    };
    const loop = () => {
      rx += (mx - rx) * 0.22; ry += (my - ry) * 0.22;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (!reduce) {
        pts.push([rx, ry]);
        if (pts.length > TRAIL) pts.shift();
        ctx.clearRect(0, 0, cv.width, cv.height);
        pts.forEach(([x, y], i) => {
          const k = (i + 1) / pts.length;
          const r = 6 + k * 18;
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, `rgba(225,228,235,${0.11 * k})`);
          g.addColorStop(1, "rgba(225,228,235,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
        });
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("resize", size);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("resize", size);
      document.body.classList.remove("has-cursor", "cursor-active");
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="cursor-trail" aria-hidden="true" data-testid="cursor-trail" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
};
