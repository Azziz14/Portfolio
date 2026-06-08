"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff007f] via-[#00f3ff] to-[#9d00ff] origin-left z-50 pointer-events-none"
      style={{
        scaleX,
        boxShadow: "0 0 10px rgba(0, 243, 255, 0.5), 0 0 20px rgba(255, 0, 127, 0.3)"
      }}
    />
  );
}
