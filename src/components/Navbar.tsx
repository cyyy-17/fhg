"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ArrowUpRight, MessageCircle, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";

interface NavSubItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: "About",
    href: "#about",
    subItems: [
      { label: "Executive Overview", href: "#about" },
      { label: "Milestones (1998–2026)", href: "#timeline", badge: "28 Yrs" },
      { label: "Statutory Credentials", href: "#credentials" },
      { label: "Safety & EHS Shield", href: "#safety-ehs", badge: "1.24M Hrs" },
    ],
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Operations & Fleet",
    href: "#projects",
    subItems: [
      { label: "Signature Projects", href: "#projects", badge: "Verified" },
      { label: "Before / After Proof", href: "#proof" },
      { label: "Heavy Fleet (89 Chainsaws)", href: "#fleet", badge: "89 Units" },
      { label: "Client Trust Wall", href: "#clients" },
    ],
  },
  {
    label: "Nurseries",
    href: "#nurseries",
    subItems: [
      { label: "Twin Batangas Facilities", href: "#nurseries", badge: "150K+" },
      { label: "Live Species Catalog", href: "#catalog" },
    ],
  },
  {
    label: "Document Vault",
    href: "#vault",
  },
  {
    label: "Office & Dispatch",
    href: "#contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

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
        <Link
          href="#hero"
          className="flex items-center gap-3.5 group cursor-pointer shrink-0"
          aria-label="Forest Hills Garden Home"
        >
          <div className="h-11 sm:h-12 bg-white px-3 py-1 rounded-full flex items-center justify-center shadow-lg border border-[#4caf50]/40 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="Forest Hills Garden Official Logo"
              width={95}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-base sm:text-lg tracking-wider font-heading leading-tight group-hover:text-[#76c442] transition-colors">
              FOREST HILLS
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#ffd600] tracking-widest uppercase">
              GARDEN • EST. 1998
            </span>
          </div>
        </Link>

        {/* Streamlined Desktop Navigation (Visible lg and up) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group py-2"
              onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-xs xl:text-sm font-semibold text-[#a8d5a8] hover:text-white transition-colors duration-200 flex items-center gap-1 py-1"
              >
                <span>{item.label}</span>
                {item.subItems && (
                  <ChevronDown className="w-3 h-3 text-[#76c442] group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>

              {/* Sleek Glass Dropdown Flyout */}
              {item.subItems && activeDropdown === item.label && (
                <div className="absolute top-full left-0 pt-2 z-50 animate-fadeIn min-w-60">
                  <div className="p-2 rounded-2xl bg-[#061409]/95 backdrop-blur-2xl border border-[#4caf50]/30 shadow-2xl space-y-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setActiveDropdown(null)}
                        className="p-2.5 rounded-xl text-xs font-semibold text-[#a8d5a8] hover:text-white hover:bg-white/10 transition-all flex items-center justify-between group/sub"
                      >
                        <span className="group-hover/sub:text-[#ffd600] transition-colors">{sub.label}</span>
                        {sub.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#ffd600]/15 text-[#ffd600] border border-[#ffd600]/25">
                            {sub.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons & Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/639165667265"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-xs bg-[#25d366]/20 text-[#25d366] hover:bg-[#25d366] hover:text-white border border-[#25d366]/40 transition-all"
            aria-label="WhatsApp Dispatch"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="#estimate"
            className="hidden sm:inline-flex items-center gap-2 px-5 xl:px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] hover:brightness-110 shadow-lg shadow-[#ffd600]/20 hover:scale-[1.02] transition-all duration-200"
          >
            <span>Submit Tender / RFP</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Organized by Command Hubs) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16.25 left-0 w-full h-[calc(100vh-65px)] bg-[#061208] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t border-[#2e7d32]/20">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 pb-3">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-white py-1 flex items-center justify-between hover:text-[#76c442] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#ffd600]">→</span>
                </Link>

                {item.subItems && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2 pl-2">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] font-medium text-[#a8d5a8] hover:text-[#ffd600] py-1 transition-colors flex items-center gap-1"
                      >
                        <span>•</span>
                        <span className="truncate">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="#estimate"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 rounded-full text-center font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#ffd600] to-[#f9c923] text-[#061008] shadow-lg shadow-[#ffd600]/20"
            >
              Submit Tender / RFP
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2.5">
            <a
              href="https://wa.me/639165667265"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25d366]/20 text-[#25d366] text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
            <a
              href="viber://chat?number=639165667265"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText("+639165667265");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#7360f2]/20 text-[#a899ff] text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Viber</span>
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
