import React, { useEffect, useRef } from "react";

// Brass instrument cursor: lerp ring with crosshair ticks + dot; shows a label from [data-cursor].
export const CircleCursor = () => {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    document.body.classList.add("has-cursor");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, raf;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const over = (e) => {
      const tagged = e.target.closest("[data-cursor]");
      const t = tagged || e.target.closest("a, button, input, textarea, [role='button']");
      document.body.classList.toggle("cursor-active", !!t);
      document.body.classList.toggle("cursor-label", !!tagged);
      if (label.current) label.current.textContent = tagged ? tagged.getAttribute("data-cursor") : "";
    };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor", "cursor-active", "cursor-label");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span className="cursor-tick cursor-tick-n" /><span className="cursor-tick cursor-tick-e" />
        <span className="cursor-tick cursor-tick-s" /><span className="cursor-tick cursor-tick-w" />
        <span ref={label} className="cursor-text" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
};
