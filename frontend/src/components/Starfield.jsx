import React, { useEffect, useRef } from "react";

// Very subtle drifting universe / starfield — canvas, lightweight, respects motion.
export const Starfield = ({ density = 90 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, W, H, stars, running = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((W * H) / 16000) + density;
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.1 + 0.2,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -(Math.random() * 0.06 + 0.015),
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
        ts: Math.random() * 0.015 + 0.004,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.tw += s.ts;
        const alpha = s.a * (0.55 + 0.45 * Math.sin(s.tw));
        const gold = s.r > 1;
        ctx.beginPath();
        ctx.fillStyle = gold
          ? `rgba(184,148,95,${alpha})`
          : `rgba(242,238,228,${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          s.x += s.vx; s.y += s.vy;
          if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
          if (s.x < -2) s.x = W + 2;
          if (s.x > W + 2) s.x = -2;
        }
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [density]);

  return (
    <canvas
      ref={ref}
      data-testid="starfield"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};
