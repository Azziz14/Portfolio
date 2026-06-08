"use client";

import { motion } from "framer-motion";
import { GitBranch, Users, Mail, Phone } from "lucide-react";

export default function SocialDock() {
  const handles = [
    {
      name: "GitHub",
      icon: <GitBranch className="w-5 h-5" />,
      url: "https://github.com/Azziz14",
      color: "hover:text-[#39ff14] hover:border-[#39ff14]/50 hover:bg-[#39ff14]/10",
      glowColor: "rgba(57, 255, 20, 0.4)",
    },
    {
      name: "LinkedIn",
      icon: <Users className="w-5 h-5" />,
      url: "https://linkedin.com/in/ashish-gupta-007620292",
      color: "hover:text-[#00f3ff] hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/10",
      glowColor: "rgba(0, 243, 255, 0.4)",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:ashishking554@gmail.com",
      color: "hover:text-[#ff007f] hover:border-[#ff007f]/50 hover:bg-[#ff007f]/10",
      glowColor: "rgba(255, 0, 127, 0.4)",
    },
    {
      name: "Call Me",
      icon: <Phone className="w-5 h-5" />,
      url: "tel:+919682686597",
      color: "hover:text-[#ff5f00] hover:border-[#ff5f00]/50 hover:bg-[#ff5f00]/10",
      glowColor: "rgba(255, 95, 0, 0.4)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
    >
      <div className="flex flex-row md:flex-col gap-3 md:gap-4 p-2.5 md:p-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {handles.map((handle, idx) => (
          <motion.a
            key={handle.name}
            href={handle.url}
            target="_blank"
            rel="noopener noreferrer"
            title={handle.name}
            className={`relative group flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/5 bg-white/5 text-white/70 transition-all duration-300 ${handle.color}`}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 15px ${handle.glowColor}`,
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
          >
            {handle.icon}
            
            {/* Tooltip */}
            <span className="absolute hidden md:group-hover:block right-16 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold tracking-wider text-black bg-[#00f3ff] rounded-md shadow-lg whitespace-nowrap pointer-events-none uppercase filter drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
              {handle.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
