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
      { label: "Safety & EHS Shield", href: "/#safety-ehs", badge: "3.0M Hrs" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    subItems: [
      { label: "All Services Overview", href: "/services" },
      { label: "Tree Earthballing", href: "/services#earthballing", badge: "98.7% Survival" },
      { label: "Chainsaw Felling", href: "/services#tree-cutting", badge: "90 Units" },
      { label: "PCA Coconut Felling", href: "/services#pca-cutting" },
      { label: "Tree Census & GPS", href: "/services#tree-inventory" },
      { label: "Commercial Greening", href: "/services#commercial-landscaping" },
    ],
  },
  {
    label: "Operations",
    href: "/projects",
    subItems: [
      { label: "Signature Projects", href: "/projects#projects", badge: "Verified" },
      { label: "Heavy Fleet (90 Chainsaws)", href: "/projects#fleet", badge: "90 Units" },
      { label: "Client Trust Wall", href: "/projects#clients" },
    ],
  },
  {
    label: "Nurseries",
    href: "/nurseries",
    subItems: [
      { label: "Batangas Nursery Facilities", href: "/nurseries#nurseries", badge: "230K+" },
      { label: "Live Species Catalog", href: "/nurseries#catalog" },
    ],
  },
  {
    label: "Vault",
    href: "/#vault",
  },
  {
    label: "Contact",
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
          ? "py-3 bg-[#050d07]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Mark & Typographic Ledger */}
        <Link
          href="/"
          className="flex items-center gap-3 group cursor-pointer shrink-0 mr-2 lg:mr-6"
          aria-label="Forest Hills Garden Home"
        >
          <div className="h-9 sm:h-10 px-2 rounded-lg bg-white flex items-center justify-center border border-white/25 group-hover:border-[#22c55e]/60 transition-all shadow-sm shrink-0">
            <Image
              src="/images/logo.png"
              alt="Forest Hills Garden Official Logo"
              width={75}
              height={36}
              sizes="75px"
              className="h-6.5 sm:h-7.5 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#f6f7f4] text-sm sm:text-[15px] tracking-wide font-heading leading-tight group-hover:text-[#4ade80] transition-colors whitespace-nowrap">
              FOREST HILLS GARDEN
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#9aa89b] uppercase whitespace-nowrap flex items-center gap-1.5 leading-tight mt-0.5">
              <span className="text-[#f59e0b] font-semibold">EST. 1998</span>
              <span className="text-white/20">•</span>
              <span>COMMERCIAL LANDSCAPE</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
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
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
                    active
                      ? "text-[#4ade80] bg-[#16a34a]/10"
                      : "text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] ml-0.5 shadow-[0_0_8px_#22c55e]" />
                  )}
                  {item.subItems && (
                    <ChevronDown className="w-3 h-3 text-[#9aa89b] group-hover:rotate-180 group-hover:text-[#4ade80] transition-transform duration-200" />
                  )}
                </Link>

                {/* Sleek Slate Dropdown Flyout */}
                {item.subItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-fadeIn min-w-64">
                    <div className="p-2 rounded-xl bg-[#0a170d]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-2.5 rounded-lg text-xs font-medium text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5 transition-all flex items-center justify-between group/sub"
                        >
                          <span className="group-hover/sub:text-[#4ade80] transition-colors">
                            {sub.label}
                          </span>
                          {sub.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#16a34a]/15 text-[#4ade80] border border-[#16a34a]/30">
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
        <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
          <a
            href="https://wa.me/639165667265"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 border border-[#25d366]/30 transition-colors whitespace-nowrap"
            aria-label="WhatsApp Dispatch"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 rounded-lg font-bold text-xs tracking-wider uppercase bg-linear-to-r from-[#f59e0b] to-[#d97706] hover:from-[#fbbf24] hover:to-[#f59e0b] text-[#050d07] shadow-md hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all whitespace-nowrap"
          >
            <span>Request RFP</span>
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
          className="lg:hidden fixed top-16.25 left-0 w-full h-[calc(100vh-65px)] bg-[#050d07]/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t border-white/10 animate-slideDown shadow-2xl"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 pb-3">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#f6f7f4] py-1 flex items-center justify-between hover:text-[#4ade80] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#f59e0b]">→</span>
                </Link>

                {item.subItems && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2 pl-2">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] font-medium text-[#9aa89b] hover:text-[#4ade80] py-1 transition-colors flex items-center gap-1"
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
              className="mt-3 w-full py-3 rounded-lg text-center font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#f59e0b] to-[#d97706] text-[#050d07] shadow-md"
            >
              Request RFP
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
              <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>0916 566 7265</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
