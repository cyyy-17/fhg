"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, Award, ArrowRight, FileText, ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import { companyData } from "@/data/company";

function StatCounter({ target, duration = 1.8 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden bg-[#050e07]">
      {/* Background Photo with Depth Filter */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_canopy.jpg"
          alt="Lush Philippine Forest Canopy"
          fill
          className="object-cover object-center opacity-25 filter saturate-[1.2] brightness-90 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-radial-gradient-hero" />
      </div>

      {/* Floating Organic Leaf & Light Particle Canvas */}
      <ParticleCanvas />

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Authority Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-[#102414]/90 border border-[#ffd600]/40 backdrop-blur-md mb-8 shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffd600] shadow-[0_0_10px_#ffd600] animate-pulse" />
          <span className="text-xs font-bold text-[#fff176] tracking-widest uppercase">
            DENR & PCA Certified • PhilGEPS Blue Member • 28+ Years Experience
          </span>
        </motion.div>

        {/* H1 Main Capability Statement */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display text-white tracking-tight leading-[1.08] max-w-6xl mb-6"
        >
          Philippines' Industrial{" "}
          <span className="text-gradient-gold">Tree Services</span>{" "}
          <span className="text-gradient-emerald">Authority</span>
        </motion.h1>

        {/* Subtitle with Official Motto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-[#a8d5a8] max-w-4xl font-normal leading-relaxed mb-10"
        >
          Earthballing & Relocation &nbsp;·&nbsp; Right-of-Way Felling &nbsp;·&nbsp; Watershed Reforestation &nbsp;·&nbsp; Plant Nurseries —{" "}
          <em className="text-white font-medium">"We Do It Right and Fast."</em> Trusted by San Miguel, Ayala, SM, EEI & DMCI since 1998.
        </motion.p>

        {/* Quick Enterprise Assurance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 max-w-5xl"
        >
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#102414]/80 border border-[#4caf50]/30 text-xs sm:text-sm font-medium text-[#f0fbf0] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#ffd600]" />
            <span>Pre-Qualified Subcontractor for Major Infrastructure</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#102414]/80 border border-[#4caf50]/30 text-xs sm:text-sm font-medium text-[#f0fbf0] backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#76c442]" />
            <span>100% Zero Environmental Infraction Record</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#102414]/80 border border-[#4caf50]/30 text-xs sm:text-sm font-medium text-[#f0fbf0] backdrop-blur-md">
            <Award className="w-4 h-4 text-[#ffd600]" />
            <span>89 DENR Registered Chainsaw Fleet</span>
          </div>
        </motion.div>

        {/* Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8"
        >
          <Link
            href="/projects"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-linear-to-r from-[#2e7d32] to-[#1a5c1a] text-white hover:brightness-110 shadow-xl border border-[#4caf50]/40 hover:scale-105 transition-all duration-200"
          >
            <span>Explore Signature Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#estimate"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-xl shadow-[#ffd600]/20 hover:scale-105 transition-all duration-200"
          >
            <span>Configure Project RFP</span>
          </Link>
          <Link
            href="/#vault"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md hover:border-[#ffd600] hover:scale-105 transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-[#ffd600]" />
            <span>Document Vault</span>
          </Link>
        </motion.div>

        {/* Quick Discovery Navigation Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 text-xs font-semibold text-[#a8d5a8]"
        >
          <Link href="/projects#proof" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
            Interactive Before/After Proof →
          </Link>
          <Link href="/projects#fleet" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
            89-Chainsaw Fleet Specs →
          </Link>
          <Link href="/nurseries#catalog" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
            Nursery Species Catalog →
          </Link>
          <Link href="/#timeline" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
            28-Year Timeline →
          </Link>
        </motion.div>

        {/* Expansive Stats Bar with Perfectly Centered Dividers & Locked Baselines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl glass-panel rounded-3xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#4caf50]/20 shadow-2xl"
        >
          {companyData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-4 py-3 md:py-1"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight mb-1.5 flex items-baseline justify-center">
                <StatCounter target={stat.value} />
                <span className="text-[#ffd600] ml-0.5">{stat.suffix}</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#f0fbf0] tracking-wide mb-1 min-h-6 flex items-center justify-center text-center">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#a8d5a8] uppercase tracking-wider text-center">
                {stat.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Down Arrow Scroll Cue */}
      <div className="relative z-20 mt-12 flex justify-center">
        <Link href="#why-choose" className="text-[#ffd600] hover:text-white transition-colors animate-bounce p-2" aria-label="Scroll Down">
          <ChevronDown className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
}
