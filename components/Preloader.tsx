"use client";

import React, { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const controls = animate(displayProgress, progress, {
      duration: 0.35,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayProgress(Math.round(latest)),
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 bg-[#0d0d0d] z-[200] flex flex-col items-center justify-center text-white select-none overflow-hidden"
    >
      {/* Background ambient neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00f3ff]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ff007f]/5 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Abstract Spinning Ring */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#00f3ff]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(0, 243, 255, 0.6))" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-b-transparent border-[#ff007f]"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(255, 0, 127, 0.6))" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-white/90">
            {displayProgress}%
          </div>
        </div>

        {/* Brand/User Name */}
        <h2 className="text-2xl font-black uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 mb-2">
          Ashish Gupta
        </h2>
        <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-bold mb-6">
          Initializing Portfolio Sequence
        </p>

        {/* Outer progress bar */}
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
          {/* Inner animated progress bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#ff007f] via-[#00f3ff] to-[#9d00ff]"
            style={{ width: `${displayProgress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          />
        </div>

        {/* Loading details */}
        <div className="w-full mt-3 flex justify-between text-[9px] font-bold text-white/30 uppercase tracking-widest">
          <span>Loading assets</span>
          <span>{displayProgress} / 100</span>
        </div>
      </div>
    </motion.div>
  );
}
