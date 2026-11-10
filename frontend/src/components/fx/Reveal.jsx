import React from "react";
import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 30, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 1.05, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

// Letter-by-letter mask reveal (words never break mid-way), triggered by `show`.
export const Letters = ({ text, show = true, delay = 0, stagger = 0.035, className = "" }) => {
  let idx = -1;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wi, arr) => (
        <React.Fragment key={wi}>
          <span className="reveal-mask whitespace-nowrap" aria-hidden="true">
            {word.split("").map((ch) => {
              idx += 1;
              return (
                <motion.span key={idx} className="inline-block"
                  initial={{ y: "115%", rotate: 6 }}
                  animate={show ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 6 }}
                  transition={{ duration: 1.1, delay: delay + idx * stagger, ease: EASE }}>
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < arr.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
};
