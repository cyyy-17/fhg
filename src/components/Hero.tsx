"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, CheckCircle2, Award, ArrowRight, FileText, ChevronDown, Clock } from "lucide-react";
import { companyData } from "@/data/company";

function StatCounter({ target, duration = 1.8 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (!isInView) return;
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
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-16 overflow-hidden bg-[#060d07]"
    >
      {/* Background Architectural Canvas & Depth Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/hero_canopy.jpg"
          alt="Philippine native forest canopy - Forest Hills Garden field operations"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 filter saturate-[0.8] brightness-75 scale-100"
          priority
        />
        <div className="absolute inset-0 bg-radial-gradient-hero" />
        <div className="absolute inset-0 bg-linear-to-b from-[#060d07]/60 via-transparent to-[#060d07]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start text-left">
        {/* Institutional Accreditation Ledger Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-[#0a150c] border border-white/10 text-[11px] font-mono tracking-widest text-[#9aa89b] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          <span className="text-[#f6f7f4] font-semibold">EST. 1998</span>
          <span className="text-white/20">|</span>
          <span>TALISAY, BATANGAS</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-[#dfbe76] font-medium hidden sm:inline">PHILGEPS BLUE MEMBER</span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="hidden md:inline">DTI 1729753</span>
        </motion.div>

        {/* H1 Main Capability Statement with Editorial Serif Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading text-[#f6f7f4] tracking-tight leading-[1.05] max-w-5xl mb-6"
        >
          Philippines’ Industrial{" "}
          <br className="hidden sm:inline" />
          Tree Services{" "}
          <span className="font-editorial italic font-normal text-[#dfbe76]">
            Authority
          </span>
        </motion.h1>

        {/* Executive Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#9aa89b] max-w-3xl font-normal leading-relaxed mb-8"
        >
          Large-scale tree earthballing, precision right-of-way felling, certified chainsaw operations, and twin Batangas nursery reserves. Official infrastructure contractor trusted by San Miguel, Ayala Land, SM Prime, and EEI since 1998.
        </motion.p>

        {/* Key Operational Credentials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl mb-10"
        >
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0b160e] border border-white/5 text-xs text-[#f6f7f4]">
            <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span className="leading-tight text-[11px] text-[#9aa89b]">
              <strong className="text-[#f6f7f4] block">DENR &amp; PCA</strong>
              Registered Contractor
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0b160e] border border-white/5 text-xs text-[#f6f7f4]">
            <Award className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span className="leading-tight text-[11px] text-[#9aa89b]">
              <strong className="text-[#f6f7f4] block">90-Unit Fleet</strong>
              Heavy Chainsaw Docket
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0b160e] border border-white/5 text-xs text-[#f6f7f4]">
            <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span className="leading-tight text-[11px] text-[#9aa89b]">
              <strong className="text-[#f6f7f4] block">48–72h SLA</strong>
              Rapid Luzon Mobilization
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0b160e] border border-white/5 text-xs text-[#f6f7f4]">
            <CheckCircle2 className="w-4 h-4 text-[#dfbe76] shrink-0" />
            <span className="leading-tight text-[11px] text-[#9aa89b]">
              <strong className="text-[#f6f7f4] block">Zero Infractions</strong>
              28-Year Statutory Record
            </span>
          </div>
        </motion.div>

        {/* Action Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-14"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm tracking-wide bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-lg shadow-black/40 transition-colors"
          >
            <span>Request Tender RFP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-medium text-sm text-[#f6f7f4] bg-[#0b160e] hover:bg-[#122014] border border-white/10 hover:border-[#c5a059]/40 transition-colors"
          >
            <span>Review Signature Projects</span>
          </Link>

          <Link
            href="/#vault"
            className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono tracking-wider text-[#9aa89b] hover:text-[#dfbe76] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#c5a059]" />
            <span>DOWNLOAD CREDENTIALS PDF</span>
          </Link>
        </motion.div>

        {/* Architectural Monolith Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full rounded-xl bg-[#0a150c]/95 border border-white/10 p-6 sm:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {companyData.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx > 0 ? "pt-4 lg:pt-0 lg:pl-8" : ""}`}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#f6f7f4] tracking-tight mb-1 flex items-baseline">
                  <StatCounter target={stat.value} />
                  <span className="text-[#dfbe76] font-editorial italic ml-1 font-normal text-2xl sm:text-3xl md:text-4xl">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#f6f7f4] mb-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#9aa89b]">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Cue */}
      <div className="relative z-20 mt-10 flex justify-center">
        <Link
          href="#why-choose"
          className="text-[#9aa89b] hover:text-[#dfbe76] transition-colors p-2"
          aria-label="Scroll Down to Value Pillars"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
