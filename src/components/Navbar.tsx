"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Protocol", href: "#protocol" },
  { label: "Clients", href: "#clients" },
  { label: "Accreditations", href: "#credentials" },
  { label: "Nurseries", href: "#nurseries" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#061008]/95 backdrop-blur-xl border-b border-[#2e7d32]/20 shadow-2xl"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="#hero" className="flex items-center gap-4 group cursor-pointer" aria-label="Forest Hills Garden Home">
          <div className="h-12 bg-white px-3 py-1 rounded-full flex items-center justify-center shadow-lg border border-[#4caf50]/40 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="Forest Hills Garden Official Logo"
              width={95}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-lg tracking-wider font-heading leading-tight group-hover:text-[#76c442] transition-colors">
              FOREST HILLS
            </span>
            <span className="text-[11px] font-bold text-[#ffd600] tracking-widest uppercase">
              GARDEN • EST. 1998
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[#a8d5a8] hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#ffd600] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <Link
            href="#estimate"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 hover:scale-[1.02] transition-all duration-200"
          >
            <span>Submit Tender / RFP</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-16.25 left-0 w-full h-[calc(100vh-65px)] bg-[#061208] p-8 flex flex-col justify-between overflow-y-auto border-t border-[#2e7d32]/20">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-white py-3 border-b border-white/10 hover:text-[#76c442] hover:pl-2 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[#ffd600]">→</span>
              </Link>
            ))}
            <Link
              href="#estimate"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 w-full py-3.5 rounded-full text-center font-bold text-sm uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] shadow-lg shadow-[#ffd600]/20"
            >
              Submit Tender / RFP
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap gap-3">
            <a
              href="tel:0437410603"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#a8d5a8] hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#ffd600]" />
              <span>(043) 741 0603</span>
            </a>
            <a
              href="tel:09165667265"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#a8d5a8] hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#76c442]" />
              <span>0916 566 7265</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
