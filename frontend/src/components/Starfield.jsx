import React, { useEffect, useRef } from "react";

// "Atlas" background: drifting topographic contours that bend around the cursor,
// a faint graticule and sparse stars. Canvas, throttled, respects reduced motion.
export const Starfield = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, W, H, stars, lines, step, mobile, last = 0, t = 0, running = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      mobile = window.innerWidth < 768;
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = mobile ? 14 : 26;
      step = mobile ? 14 : 10;
      stars = Array.from({ length: mobile ? 28 : 70 }).map(() => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1 + 0.2,
        a: Math.random() * 0.45 + 0.1, tw: Math.random() * 6.28, ts: Math.random() * 0.02 + 0.004,
      }));
    };

    const draw = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      if (document.hidden || now - last < (mobile ? 50 : 30)) return;
      last = now;
      if (!reduce) t += 0.0035;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      ctx.clearRect(0, 0, W, H);

      // graticule
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(244,244,245,0.025)";
      const g = mobile ? 90 : 140;
      const sy = (window.scrollY * 0.15) % g;
      ctx.beginPath();
      for (let x = g / 2; x < W; x += g) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = -sy; y < H; y += g) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();

      // contours
      const gap = H / lines;
      const drift = (window.scrollY * 0.06) % gap;
      for (let k = -1; k <= lines + 1; k++) {
        const base = k * gap - drift;
        const major = ((k % 5) + 5) % 5 === 0;
        ctx.strokeStyle = major ? "rgba(205,209,217,0.11)" : "rgba(244,244,245,0.045)";
        ctx.lineWidth = major ? 1 : 0.8;
        ctx.beginPath();
        for (let x = -step; x <= W + step; x += step) {
          let y = base
            + Math.sin(x * 0.0042 + t * 2 + k * 0.55) * 22
            + Math.sin(x * 0.0019 - t * 1.3 + k * 0.31) * 38
            + Math.cos(x * 0.009 + t + k) * 6;
          const dx = x - mouse.x, dy = y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 52000) y += (dy >= 0 ? 1 : -1) * 34 * Math.exp(-d2 / 14000);
          x === -step ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // stars
      for (const s of stars) {
        s.tw += s.ts;
        ctx.fillStyle = s.r > 0.9 ? `rgba(205,209,217,${s.a * (0.6 + 0.4 * Math.sin(s.tw))})` : `rgba(244,244,245,${s.a * (0.6 + 0.4 * Math.sin(s.tw))})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
    };

    const onMove = (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} data-testid="starfield" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
};
