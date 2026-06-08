"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, X, GitBranch, Users, Mail, Phone, ExternalLink } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  gradient: string;
  glowColor: string;
  challenge: string;
  architecture: string;
  techStack: string[];
  metrics: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "CryptoTrade",
    category: "Real-Time Trading Platform",
    description:
      "Massively scalable real-time engine streaming live Binance WebSocket market data with sub-100ms updates.",
    gradient: "from-[#00f3ff] to-[#00a2ff]",
    glowColor: "rgba(0,243,255,0.25)",
    challenge:
      "Designing a system that could handle thousands of concurrent market data streams with absolute minimum latency while keeping a React UI smooth and responsive.",
    architecture:
      "Built a Java Spring Boot backend with a persistent WebSocket layer directly connected to Binance's streaming API. Redis Pub/Sub acts as the in-memory message broker, fanning out live price ticks to all connected React clients within milliseconds. A custom order-book reconciliation engine keeps state consistent across reconnects and network drops.",
    techStack: ["Java", "Spring Boot", "WebSocket", "React", "Redis", "Binance API", "TypeScript"],
    metrics: ["< 100ms update latency", "1000+ concurrent streams", "99.9% uptime SLA"],
  },
  {
    id: 2,
    title: "QueryForge AI",
    category: "LLM-Powered SQL Engine",
    description:
      "Fine-tuned CodeLlama-7B via QLoRA/PEFT achieving 79% accuracy on Spider benchmark, deployed with FastAPI.",
    gradient: "from-[#39ff14] to-[#00f3ff]",
    glowColor: "rgba(57,255,20,0.25)",
    challenge:
      "Natural language to SQL translation requires a model that deeply understands both database schema semantics and conversational intent — general-purpose LLMs fall short on complex multi-table queries.",
    architecture:
      "Fine-tuned CodeLlama-7B using QLoRA/PEFT on the Spider benchmark dataset, dramatically reducing GPU memory requirements while maintaining model capacity. The model is served via a FastAPI inference server with async request queuing. Schema context is injected dynamically via prompt engineering, allowing the system to adapt to any database at runtime.",
    techStack: ["Python", "CodeLlama-7B", "QLoRA", "PEFT", "FastAPI", "HuggingFace", "SQL", "PyTorch"],
    metrics: ["79% Spider benchmark accuracy", "500+ queries/day", "7B param model on 16GB VRAM"],
  },
  {
    id: 3,
    title: "MediSense AI",
    category: "Multimodal Disease Prediction",
    description:
      "Multimodal ML pipeline achieving 79%+ accuracy integrating BERT NLP and deep learning stacks for disease prediction.",
    gradient: "from-[#ff007f] via-[#9d00ff] to-[#00f3ff]",
    glowColor: "rgba(157,0,255,0.25)",
    challenge:
      "Medical diagnosis requires synthesizing disparate data types — structured clinical records, free-form doctor's notes, and imaging data — into a single coherent prediction without losing modality-specific nuance.",
    architecture:
      "A multimodal pipeline that independently processes structured tabular patient data through gradient-boosted trees and unstructured clinical notes through a fine-tuned BERT encoder. The final prediction is produced by a late-fusion meta-learner that combines both modality embeddings. Deployed with a REST API and a clinician-facing dashboard for interpretability.",
    techStack: ["Python", "BERT", "PyTorch", "Scikit-learn", "XGBoost", "FastAPI", "React", "Pandas"],
    metrics: ["79%+ prediction accuracy", "Multimodal: text + tabular", "Real-time inference API"],
  },
  {
    id: 4,
    title: "Email Spam Classifier",
    category: "Gmail Integration & Analytics",
    description:
      "Logistic Regression classifier achieving 94% precision, integrated via OAuth 2.0 with a React/Node.js admin dashboard.",
    gradient: "from-[#ff5f00] to-[#ff007f]",
    glowColor: "rgba(255,95,0,0.25)",
    challenge:
      "Building a spam filter that seamlessly plugs into Gmail's existing flow, avoids false positives on legitimate emails, and gives admins real-time visibility into classifier decisions.",
    architecture:
      "TF-IDF feature extraction feeds a Logistic Regression classifier trained on the Enron email dataset. The model is integrated with Gmail via OAuth 2.0 and the Gmail API, automatically labeling or archiving detected spam. An admin dashboard built in React + Node.js shows real-time classification logs, precision/recall trends, and one-click model retraining triggers.",
    techStack: ["Python", "Scikit-learn", "TF-IDF", "Gmail API", "OAuth 2.0", "React", "Node.js", "Express"],
    metrics: ["94% precision", "< 0.5% false positive rate", "OAuth 2.0 Gmail integration"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      {/* ── PROJECT DETAIL MODAL ─────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Dark backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0e0e0e]/95 backdrop-blur-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 30px 80px rgba(0,0,0,0.6), 0 0 50px ${selected.glowColor}`,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category */}
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                {selected.category}
              </p>

              {/* Title */}
              <h2
                className={`text-4xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r ${selected.gradient}`}
              >
                {selected.title}
              </h2>

              {/* Metric pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {selected.metrics.map((m) => (
                  <span
                    key={m}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border border-white/10 bg-white/5 text-white/80`}
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="space-y-8">
                {/* Challenge */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">The Challenge</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{selected.challenge}</p>
                </div>

                {/* Architecture */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Architecture & Approach</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{selected.architecture}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold border border-white/10 bg-gradient-to-r ${selected.gradient} bg-clip-text text-transparent`}
                        style={{ borderColor: selected.glowColor.replace("0.25", "0.4") }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROJECTS SECTION ─────────────────────────────── */}
      <section className="bg-[#121212] py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 text-white relative z-20 overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00f3ff]/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#9d00ff]/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#39ff14]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 mb-4">Selected Works</p>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/30">
              Projects
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-base md:text-lg mb-14 md:mb-20 max-w-xl"
          >
            Click <span className="text-[#00f3ff] font-semibold">Explore</span> on any project to read about the architecture, decisions, and impact.
          </motion.p>

          {/* Project grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-10"
          >
            {projects.map((project) => (
              <motion.div
                variants={itemVariants}
                key={project.id}
                className="group relative rounded-3xl p-6 sm:p-8 overflow-hidden border border-white/8 bg-white/3 backdrop-blur-md cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)" }}
                onClick={() => setSelected(project)}
                whileHover={{ scale: 1.015, borderColor: project.glowColor.replace("0.25", "0.5") }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Dynamic hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.glowColor} 0%, transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col h-full min-h-[220px] sm:min-h-[260px]">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white/30 mb-3 uppercase tracking-[0.25em]">
                      {project.category}
                    </p>
                    <h3
                      className={`text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/50 mb-6 sm:mb-8 max-w-sm leading-relaxed text-sm font-light">
                      {project.description}
                    </p>
                  </div>

                  <button
                    className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white/40 group-hover:text-white transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(project);
                    }}
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RESUME HIGHLIGHTS ───────────────────────────────── */}
      <section className="bg-[#090909] py-24 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 mb-4">Profile Snapshot</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff007f] via-[#00f3ff] to-[#9d00ff]">
              Resume Highlights
            </h2>
            <p className="text-white/40 text-lg max-w-3xl leading-relaxed">
              IT undergraduate at CBIT &apos;27 with production experience across SaaS, fintech, and AI. Skilled in scalable distributed systems, low-latency engineering, and machine learning-driven product delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-10 mb-12">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <h3 className="text-2xl font-bold mb-4 text-white">Professional Summary</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                IT undergraduate (CBIT &apos;27) with a strong foundation in scalable software engineering, machine learning, and low-latency system design. Independently architected and shipped production-grade systems such as a real-time trading platform, an LLM-powered SQL engine, and a secure JWT + 2FA auth pipeline.
              </p>
              <div className="grid gap-3 text-sm text-white/70">
                <div>
                  <span className="font-semibold text-white">Education:</span> B.E. Information Technology, Chaitanya Bharathi Institute of Technology (Aug 2023 – May 2027)
                </div>
                <div>
                  <span className="font-semibold text-white">Location:</span> Hyderabad, India
                </div>
                <div>
                  <span className="font-semibold text-white">Contact:</span> +91 9682686597 · ashishking554@gmail.com
                </div>
                <div>
                  <span className="font-semibold text-white">LinkedIn:</span> linkedin.com/in/ashish-gupta-007620292
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#ff007f]/10 via-[#00f3ff]/10 to-[#9d00ff]/10 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <h3 className="text-2xl font-bold mb-4 text-white">Experience</h3>
                <ul className="space-y-4 text-white/70 text-sm leading-relaxed">
                  <li>
                    <span className="font-semibold text-white">MagnumCorps · Web Development Intern</span><br /> Delivered scalable UI components and integrated frontend views with REST APIs in an Agile remote environment.
                  </li>
                  <li>
                    <span className="font-semibold text-white">Yashika Tour &amp; Travel · Freelance Full-Stack Developer</span><br /> Built an end-to-end booking platform with React, Node.js/Express, and MongoDB for dynamic booking flows and production deployment.
                  </li>
                  <li>
                    <span className="font-semibold text-white">Independent Developer</span><br /> Architected 5+ production-grade systems across ML and full-stack domains, reducing feature build time by ~35% through reusable component design.
                  </li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <h3 className="text-2xl font-bold mb-4 text-white">Key Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Python", color: "hover:text-[#39ff14] hover:border-[#39ff14]/40 hover:bg-[#39ff14]/5", glow: "rgba(57,255,20,0.2)" },
                    { name: "Java", color: "hover:text-[#00f3ff] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5", glow: "rgba(0,243,255,0.2)" },
                    { name: "TypeScript", color: "hover:text-[#ff007f] hover:border-[#ff007f]/40 hover:bg-[#ff007f]/5", glow: "rgba(255,0,127,0.2)" },
                    { name: "Spring Boot", color: "hover:text-[#39ff14] hover:border-[#39ff14]/40 hover:bg-[#39ff14]/5", glow: "rgba(57,255,20,0.2)" },
                    { name: "WebSocket", color: "hover:text-[#00f3ff] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5", glow: "rgba(0,243,255,0.2)" },
                    { name: "Redis", color: "hover:text-[#ff007f] hover:border-[#ff007f]/40 hover:bg-[#ff007f]/5", glow: "rgba(255,0,127,0.2)" },
                    { name: "React", color: "hover:text-[#00f3ff] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5", glow: "rgba(0,243,255,0.2)" },
                    { name: "FastAPI", color: "hover:text-[#39ff14] hover:border-[#39ff14]/40 hover:bg-[#39ff14]/5", glow: "rgba(57,255,20,0.2)" },
                    { name: "LLM Fine-tuning", color: "hover:text-[#9d00ff] hover:border-[#9d00ff]/40 hover:bg-[#9d00ff]/5", glow: "rgba(157,0,255,0.2)" },
                    { name: "MongoDB", color: "hover:text-[#39ff14] hover:border-[#39ff14]/40 hover:bg-[#39ff14]/5", glow: "rgba(57,255,20,0.2)" },
                    { name: "JWT", color: "hover:text-[#ff5f00] hover:border-[#ff5f00]/40 hover:bg-[#ff5f00]/5", glow: "rgba(255,95,0,0.2)" },
                    { name: "OAuth 2.0", color: "hover:text-[#ff007f] hover:border-[#ff007f]/40 hover:bg-[#ff007f]/5", glow: "rgba(255,0,127,0.2)" },
                    { name: "Docker", color: "hover:text-[#9d00ff] hover:border-[#9d00ff]/40 hover:bg-[#9d00ff]/5", glow: "rgba(157,0,255,0.2)" },
                  ].map((skill) => (
                    <motion.span
                      key={skill.name}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${skill.glow}` }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition-all duration-300 cursor-default ${skill.color}`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#00f3ff]/70 mb-3">Certifications</p>
              <p className="text-white/70 leading-relaxed text-sm">
                Salesforce Certified Agentforce Specialist · Microsoft Azure AI Fundamentals (AI-900) · Oracle Cloud Infrastructure AI Foundations · Generative AI & Frontend Web Dev — Code Sprint.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ff007f]/70 mb-3">Achievements</p>
              <p className="text-white/70 leading-relaxed text-sm">
                Solved 150+ LeetCode problems, selected for J&K Under-15 State Football Squad, and represented the district at State-Level Competitive Yoga Championships.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#39ff14]/10 to-[#00f3ff]/10 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[#39ff14]/80 mb-3">Education</p>
              <p className="text-white/70 leading-relaxed text-sm">
                B.E. Information Technology — Chaitanya Bharathi Institute of Technology, Hyderabad. Relevant courses include Data Structures, OOP, DBMS, Big Data Analytics, Networks, and Embedded Systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FOOTER ───────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#ff007f]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#9d00ff]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/20 mb-6">Let&apos;s Connect</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff007f] via-[#00f3ff] to-[#9d00ff]">
              Ashish Gupta
            </h2>
            <p className="text-white/30 text-lg mb-20 max-w-2xl leading-relaxed">
              IT undergrad at CBIT &apos;27 · Building production-grade systems at the intersection of distributed computing and machine learning.
            </p>
          </motion.div>

          {/* Handle grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {[
              {
                icon: <GitBranch className="w-6 h-6" />,
                label: "GitHub",
                value: "github.com/Azziz14",
                url: "https://github.com/Azziz14",
                gradient: "from-[#39ff14] to-[#00f3ff]",
                glow: "rgba(57,255,20,0.15)",
              },
              {
                icon: <Users className="w-6 h-6" />,
                label: "LinkedIn",
                value: "linkedin.com/in/ashish-gupta-007620292",
                url: "https://linkedin.com/in/ashish-gupta-007620292",
                gradient: "from-[#00f3ff] to-[#0066ff]",
                glow: "rgba(0,243,255,0.15)",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                label: "Email",
                value: "ashishking554@gmail.com",
                url: "mailto:ashishking554@gmail.com",
                gradient: "from-[#ff007f] to-[#9d00ff]",
                glow: "rgba(255,0,127,0.15)",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                label: "Phone",
                value: "+91 9682686597",
                url: "tel:+919682686597",
                gradient: "from-[#ff5f00] to-[#ff007f]",
                glow: "rgba(255,95,0,0.15)",
              },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group flex items-center gap-5 p-6 rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Icon circle */}
                <div
                className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br ${item.gradient} text-[#121212] font-bold shadow-[0_0_30px_rgba(0,0,0,0.25)]`}
                style={{ boxShadow: `0 0 25px ${item.glow}` }}
              >
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-2">{item.label}</p>
                <p className={`font-black text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-r ${item.gradient} truncate`}>
                  {item.value}
                </p>
              </div>

                <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-white/60 flex-shrink-0 transition-colors duration-200" />
              </motion.a>
            ))}
          </motion.div>

          {/* Footer bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-white/20 text-sm">
              © 2025 Ashish Gupta · CBIT, Hyderabad · IT &apos;27
            </p>
            <p className="text-white/20 text-sm font-light">
              Built with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00f3ff] font-semibold">
                Next.js · Framer Motion · Tailwind CSS
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
