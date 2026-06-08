"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
  isMobile?: boolean;
}

export default function Overlay({ scrollYProgress, isMobile = false }: OverlayProps) {
  // Section 1: 0% to 20% visible
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, isMobile ? -30 : -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);

  // Section 2: 25% to 50% visible (Left aligned)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [isMobile ? 30 : 80, 0, 0, isMobile ? -30 : -80]);

  // Section 3: 55% to 80% visible (Right aligned)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [isMobile ? 30 : 80, 0, 0, isMobile ? -30 : -80]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 text-white flex flex-col justify-center">
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center px-4"
      >
        <h1
          className="text-4xl sm:text-5xl md:text-9xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ff007f] via-[#00f3ff] to-[#9d00ff] select-none leading-none"
          style={{
            textShadow:
              "0 0 30px rgba(255,0,127,0.55), 0 0 40px rgba(0,243,255,0.3), 0 0 70px rgba(157,0,255,0.25)",
          }}
        >
          Ashish Gupta
        </h1>
        <p
          className="text-sm sm:text-lg md:text-4xl text-white font-semibold tracking-[0.18em] md:tracking-[0.22em] mt-4 uppercase select-none"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.25)" }}
        >
          Software Engineer
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-start px-5 sm:px-8 md:px-32"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-8xl font-black tracking-tight max-w-4xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-[#00f3ff] select-none"
          style={{ textShadow: "0 0 35px rgba(57,255,20,0.25), 0 0 50px rgba(0,243,255,0.18)" }}
        >
          Building <br />
          <span className="font-extrabold text-white">scalable</span> <br />
          distributed systems.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-end text-right px-5 sm:px-8 md:px-32"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-8xl font-black tracking-tight max-w-4xl text-right leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#9d00ff] to-[#ff5f00] select-none"
          style={{ textShadow: "0 0 35px rgba(157,0,255,0.22), 0 0 60px rgba(255,95,0,0.18)" }}
        >
          Bridging <br />
          <span className="font-extrabold text-white">machine learning</span> <br />
          and engineering.
        </h2>
      </motion.div>
    </div>
  );
}
