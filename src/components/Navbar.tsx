"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight, MessageCircle, ChevronDown } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";

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

const NAV_SECTION_IDS = [
  "hero",
  "about",
  "services",
  "operations-hub",
  "projects",
  "proof",
  "fleet",
  "clients",
  "nurseries",
  "catalog",
  "vault",
  "procurement-hub",
  "contact",
];

const navItems: NavItem[] = [
  {
    label: "About",
    href: "/#about",
    subItems: [
      { label: "Executive Overview", href: "/#about" },
      { label: "Milestones (1998–2026)", href: "/#timeline", badge: "28 Yrs" },
      { label: "Statutory Credentials", href: "/#credentials" },
      { label: "Safety & EHS Shield", href: "/#safety-ehs", badge: "1.24M Hrs" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    subItems: [
      { label: "All Services Overview", href: "/services" },
      { label: "Tree Earthballing", href: "/services#earthballing", badge: "98.7% Survival" },
      { label: "Chainsaw Felling", href: "/services#tree-cutting", badge: "89 Units" },
      { label: "PCA Coconut Felling", href: "/services#pca-cutting" },
      { label: "Tree Census & GPS", href: "/services#tree-inventory" },
      { label: "Commercial Greening", href: "/services#commercial-landscaping" },
    ],
  },
  {
    label: "Operations & Fleet",
    href: "/projects",
    subItems: [
      { label: "Signature Projects", href: "/projects#projects", badge: "Verified" },
      { label: "Before / After Proof", href: "/projects#proof" },
      { label: "Heavy Fleet (89 Chainsaws)", href: "/projects#fleet", badge: "89 Units" },
      { label: "Client Trust Wall", href: "/projects#clients" },
    ],
  },
  {
    label: "Nurseries",
    href: "/nurseries",
    subItems: [
      { label: "Twin Batangas Facilities", href: "/nurseries#nurseries", badge: "150K+" },
      { label: "Live Species Catalog", href: "/nurseries#catalog" },
    ],
  },
  {
    label: "Document Vault",
    href: "/#vault",
  },
  {
    label: "Office & Dispatch",
    href: "/contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const activeSection = useActiveSection(NAV_SECTION_IDS, "hero");

  const isItemActive = (item: NavItem) => {
    if (item.href === "/services" && pathname?.startsWith("/services")) return true;
    if (item.href === "/nurseries" && pathname?.startsWith("/nurseries")) return true;
    if (item.href === "/projects" && pathname?.startsWith("/projects")) return true;
    if (item.href === "/contact" && pathname?.startsWith("/contact")) return true;

    if (pathname === "/") {
      const targetId = item.href.replace("/#", "").replace("#", "");
      if (activeSection === targetId) return true;
      if (
        targetId === "about" &&
        (activeSection === "timeline" ||
          activeSection === "credentials" ||
          activeSection === "safety-ehs" ||
          activeSection === "about")
      )
        return true;
      if (
        targetId === "projects" &&
        (activeSection === "operations-hub" ||
          activeSection === "proof" ||
          activeSection === "fleet" ||
          activeSection === "clients" ||
          activeSection === "projects")
      )
        return true;
      if (
        targetId === "nurseries" &&
        (activeSection === "catalog" || activeSection === "nurseries")
      )
        return true;
      if (
        targetId === "vault" &&
        (activeSection === "vault" || activeSection === "procurement-hub")
      )
        return true;
      if (targetId === "contact" && activeSection === "contact") return true;
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLenisScrollLock(mobileMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#060d07]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark & Typographic Ledger */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group cursor-pointer shrink-0"
          aria-label="Forest Hills Garden Home"
        >
          <div className="h-10 sm:h-11 bg-white px-2.5 py-1 rounded-lg flex items-center justify-center border border-white/20 group-hover:border-[#c5a059]/60 transition-colors shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Forest Hills Garden Official Logo"
              width={95}
              height={40}
              sizes="95px"
              className="h-7 sm:h-8 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#f6f7f4] text-sm sm:text-base tracking-wider font-heading leading-tight group-hover:text-[#dfbe76] transition-colors">
              FOREST HILLS GARDEN
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase">
              EST. 1998 • TALISAY, BATANGAS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <div
                key={item.label}
                className="relative group py-2"
                onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-xs xl:text-sm font-medium transition-colors duration-200 flex items-center gap-1 py-1 ${
                    active ? "text-[#dfbe76]" : "text-[#9aa89b] hover:text-[#f6f7f4]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] ml-0.5" />
                  )}
                  {item.subItems && (
                    <ChevronDown className="w-3 h-3 text-[#9aa89b] group-hover:rotate-180 group-hover:text-[#dfbe76] transition-transform duration-200" />
                  )}
                </Link>

                {/* Sleek Slate Dropdown Flyout */}
                {item.subItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-fadeIn min-w-64">
                    <div className="p-2 rounded-xl bg-[#0a150c]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-2.5 rounded-lg text-xs font-medium text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5 transition-all flex items-center justify-between group/sub"
                        >
                          <span className="group-hover/sub:text-[#dfbe76] transition-colors">
                            {sub.label}
                          </span>
                          {sub.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#c5a059]/15 text-[#dfbe76] border border-[#c5a059]/30">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Executive Action Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/639165667265"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-white/5 text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="WhatsApp Dispatch"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs tracking-wider uppercase bg-[#c5a059] hover:bg-[#dfbe76] text-[#060d07] shadow-md transition-colors"
          >
            <span>Request Tender RFP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#f6f7f4] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden fixed top-16.25 left-0 w-full h-[calc(100vh-65px)] bg-[#060d07]/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t border-white/10 animate-slideDown shadow-2xl"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 pb-3">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#f6f7f4] py-1 flex items-center justify-between hover:text-[#dfbe76] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#c5a059]">→</span>
                </Link>

                {item.subItems && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2 pl-2">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] font-medium text-[#9aa89b] hover:text-[#dfbe76] py-1 transition-colors flex items-center gap-1"
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
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 w-full py-3 rounded-lg text-center font-semibold text-xs uppercase tracking-wider bg-[#c5a059] text-[#060d07]"
            >
              Request Tender RFP
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2.5">
            <a
              href="https://wa.me/639165667265"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[#f6f7f4] border border-white/10 text-xs font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:09165667265"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[#9aa89b] hover:text-[#f6f7f4]"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>0916 566 7265</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
