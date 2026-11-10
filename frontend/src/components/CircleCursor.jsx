import React, { useEffect, useRef } from "react";

// Plain round cursor: a soft circle that follows and grows over interactive elements.
export const CircleCursor = () => {
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    document.body.classList.add("has-cursor");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, raf;

    const move = (e) => { mx = e.clientX; my = e.clientY; };
    const over = (e) => {
      const t = e.target.closest("a, button, input, textarea, [role='button'], [data-cursor]");
      document.body.classList.toggle("cursor-active", !!t);
    };
    const loop = () => {
      rx += (mx - rx) * 0.22; ry += (my - ry) * 0.22;
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
      document.body.classList.remove("has-cursor", "cursor-active");
    };
  }, []);

  return <div ref={ring} className="cursor-ring" aria-hidden="true" />;
};
