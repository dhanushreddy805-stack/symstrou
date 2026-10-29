import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useFinePointer } from "./hooks";

// Pulls its child gently toward the cursor.
export const Magnetic = ({ children, strength = 0.28, className = "" }) => {
  const ref = useRef(null);
  const fine = useFinePointer();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const move = (e) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
};
