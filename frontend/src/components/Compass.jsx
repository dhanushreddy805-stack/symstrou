import React, { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useFinePointer } from "./fx/hooks";

// SYMSTRUO compass mark.
export const Mark = ({ size = 40, className = "", style = {}, ...rest }) => (
  <img src="/symstruo-mark.png" alt="SYMSTRUO" className={className}
    style={{ width: size, height: "auto", objectFit: "contain", ...style }} {...rest} />
);

// SYMSTRUO wordmark.
export const Wordmark = ({ height = 18, className = "", ...rest }) => (
  <img src="/symstruo-wordmark.png" alt="SYMSTRUO" className={className}
    style={{ height, width: "auto", objectFit: "contain" }} {...rest} />
);

// Decorative four-point star accent.
export const Star = ({ size = 28, color = "var(--ivory)", className = "", style = {}, ...rest }) => (
  <svg width={size} height={size} viewBox="-130 -130 260 260" className={className} style={style} aria-hidden="true" {...rest}>
    <path d="M0 -122 C 2.4 -26, 15 -3.4, 108 0 C 15 3.4, 2.4 26, 0 122 C -2.4 26, -15 3.4, -108 0 C -15 -3.4, -2.4 -26, 0 -122 Z" fill={color} />
  </svg>
);

const rad = (d) => (d * Math.PI) / 180;
const pt = (deg, r) => [Math.sin(rad(deg)) * r, -Math.cos(rad(deg)) * r];
const ORBIT = 186;

const DegreeRing = () => (
  <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full spin-slower">
    <circle r="250" fill="none" stroke="var(--brass)" strokeWidth="0.6" opacity="0.45" />
    <circle r="226" fill="none" stroke="rgba(244,244,245,0.12)" strokeWidth="0.6" />
    {Array.from({ length: 12 }).map((_, i) => {
      const [x, y] = pt(i * 30, 238);
      return (
        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="var(--grey)"
          fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1"
          transform={`rotate(${i * 30} ${x} ${y})`}>
          {String(i * 30).padStart(3, "0")}
        </text>
      );
    })}
  </svg>
);

const TickRing = ({ rotate }) => (
  <motion.svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full" style={rotate ? { rotate } : undefined}>
    {Array.from({ length: 120 }).map((_, i) => {
      const long = i % 10 === 0, mid = i % 5 === 0;
      const [x1, y1] = pt(i * 3, long ? 200 : mid ? 207 : 211);
      const [x2, y2] = pt(i * 3, 216);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--brass)" strokeWidth={long ? 1 : 0.6} opacity={long ? 0.85 : 0.35} />;
    })}
  </motion.svg>
);

const Orbit = ({ labels, bearings, active, onSelect }) => {
  const [ax, ay] = pt(bearings[active], ORBIT);
  const [arx, ary] = pt(bearings[active], 118);
  const large = bearings[active] > 180 ? 1 : 0;
  return (
    <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full">
      <circle r={ORBIT} fill="none" stroke="rgba(244,244,245,0.18)" strokeWidth="0.7" strokeDasharray="2 6" />
      <circle r="140" fill="none" stroke="rgba(244,244,245,0.08)" strokeWidth="0.7" />
      <circle r="96" fill="none" stroke="rgba(205,209,217,0.25)" strokeWidth="0.6" strokeDasharray="1 4" />
      <line x1="-226" y1="0" x2="226" y2="0" stroke="rgba(244,244,245,0.06)" />
      <line x1="0" y1="-226" x2="0" y2="226" stroke="rgba(244,244,245,0.06)" />
      {["N", "E", "S", "W"].map((d, i) => {
        const [x, y] = pt(i * 90, 162);
        return <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={d === "N" ? "var(--brass)" : "var(--grey)"}
          fontFamily="Outfit, sans-serif" fontSize="12" letterSpacing="2">{d}</text>;
      })}
      <motion.path key={`arc-${active}`} d={`M0 -118 A118 118 0 ${large} 1 ${arx} ${ary}`} fill="none" stroke="var(--brass)" strokeWidth="1.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
      <motion.line key={`ray-${active}`} x1="0" y1="0" x2={ax} y2={ay} stroke="var(--brass)" strokeWidth="0.9"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
      {labels.map((l, i) => {
        const [x, y] = pt(bearings[i], ORBIT);
        const on = i === active;
        return (
          <g key={l} role="button" tabIndex={0} aria-label={l} data-testid={`compass-node-${i}`} data-cursor={l.toUpperCase()}
            onMouseEnter={() => onSelect?.(i)} onClick={() => onSelect?.(i)} onFocus={() => onSelect?.(i)} style={{ cursor: "pointer" }}>
            <circle cx={x} cy={y} r="18" fill="transparent" />
            {on && (
              <motion.circle cx={x} cy={y} fill="none" stroke="var(--brass)" strokeWidth="0.8"
                initial={{ r: 6, opacity: 0.9 }} animate={{ r: 22, opacity: 0 }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
            )}
            <circle cx={x} cy={y} r={on ? 6 : 4} fill={on ? "var(--brass)" : "var(--ink)"} stroke="var(--brass)" strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  );
};

// Hero centrepiece — a tilting astrolabe: degree ring, scroll-linked ticks, sweeping beam,
// orbit of five interactive bearings and the brand mark at its heart.
export const Compass = ({ size = 460, needleRotate, labels = [], bearings = [], active = 0, onSelect, show = true }) => {
  const ref = useRef(null);
  const fine = useFinePointer();
  const rx = useSpring(0, { stiffness: 50, damping: 14 });
  const ry = useSpring(0, { stiffness: 50, damping: 14 });

  useEffect(() => {
    if (!fine) return;
    const onMove = (e) => {
      ry.set(((e.clientX / window.innerWidth) - 0.5) * 22);
      rx.set(-((e.clientY / window.innerHeight) - 0.5) * 22);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [fine, rx, ry]);

  return (
    <div ref={ref} data-testid="hero-compass" className="relative mx-auto aspect-square select-none"
      style={{ width: size, maxWidth: "min(100%, calc(100vw - 48px))", perspective: 1200 }}>
      <motion.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.82 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}>
        <div className="compass-beam absolute inset-[9%] rounded-full" />
        <DegreeRing />
        <TickRing rotate={needleRotate} />
        {labels.length > 0 && <Orbit labels={labels} bearings={bearings} active={active} onSelect={onSelect} />}
        <div className="absolute inset-0 grid place-items-center" style={{ transform: "translateZ(60px)" }}>
          <motion.div className="w-[28%]" initial={{ rotate: -150, scale: 0.4, opacity: 0 }} animate={show ? { rotate: 0, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            <div className="float-slow">
              <Mark style={{ width: "100%", filter: "drop-shadow(0 0 46px rgba(205,209,217,0.35))" }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
