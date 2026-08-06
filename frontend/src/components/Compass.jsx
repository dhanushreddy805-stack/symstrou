import React from "react";
import { motion } from "framer-motion";

// AEDIFICA mark — the actual uploaded compass-star logo.
export const Star = ({ size = 28, color = "var(--ivory)", className = "", style = {}, ...rest }) => (
  <img
    src="/aedifica-logo.png"
    width={size}
    height={size}
    alt="AEDIVOR"
    className={className}
    style={{ width: size, height: size, objectFit: "contain", ...style }}
    {...rest}
  />
);

// Hero centrepiece — the star framed by a slowly rotating brass compass ring.
// needleRotate: optional MotionValue for scroll-linked drift after the north-lock.
export const Compass = ({ size = 460, needleRotate }) => (
  <div
    className="relative select-none"
    style={{ width: size, height: size }}
    data-testid="hero-compass"
  >
    <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full spin-slower">
      <g fill="none" stroke="var(--brass)" strokeWidth="0.75" opacity="0.55">
        <circle r="238" />
        <circle r="196" strokeDasharray="1 7" opacity="0.6" />
      </g>
    </svg>
    <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full spin-slow">
      <g stroke="var(--brass)" strokeWidth="0.75" opacity="0.7">
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * Math.PI) / 30;
          const r1 = i % 15 === 0 ? 196 : i % 5 === 0 ? 210 : 216;
          return (
            <line
              key={i}
              x1={Math.cos(a) * r1}
              y1={Math.sin(a) * r1}
              x2={Math.cos(a) * 222}
              y2={Math.sin(a) * 222}
              opacity={i % 5 === 0 ? 0.9 : 0.35}
            />
          );
        })}
      </g>
    </svg>
    <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full">
      {["N", "E", "S", "W"].map((d, i) => {
        const a = (i * Math.PI) / 2 - Math.PI / 2;
        return (
          <text
            key={d}
            x={Math.cos(a) * 150}
            y={Math.sin(a) * 150 + 5}
            textAnchor="middle"
            fill="var(--grey)"
            fontFamily="Outfit, sans-serif"
            fontSize="13"
            letterSpacing="2"
          >
            {d}
          </text>
        );
      })}
    </svg>
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        initial={{ rotate: -150, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        <motion.div style={needleRotate ? { rotate: needleRotate } : undefined}>
          <Star size={size * 0.5} color="var(--ivory)" style={{ filter: "drop-shadow(0 0 40px rgba(184,148,95,0.25))" }} />
        </motion.div>
      </motion.div>
    </div>
    <svg viewBox="-260 -260 520 520" className="absolute inset-0 h-full w-full">
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 1.2 }}
      >
        <line x1="0" y1="-236" x2="0" y2="-208" stroke="var(--brass)" strokeWidth="1.5" />
      </motion.g>
    </svg>
  </div>
);
