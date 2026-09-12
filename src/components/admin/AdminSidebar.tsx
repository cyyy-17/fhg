"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  Trees,
  Briefcase,
  Users,
  Sprout,
  Truck,
  HelpCircle,
  ClipboardList,
  FileText,
  Mail,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useLenisScrollLock } from "@/hooks/useLenisScrollLock";
import { getClientCsrfToken } from "@/lib/csrf";

interface NavGroup {
  title: string;
  items: {
    label: string;
    href: string;
    icon: typeof LayoutDashboard;
    badge?: string;
    badgeColor?: string;
  }[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useLenisScrollLock(mobileOpen);

  // Fetch unread inquiries count
  useEffect(() => {
    async function checkInquiries() {
      try {
        const res = await fetch("/api/admin/inquiries");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.inquiries)) {
            const unread = json.inquiries.filter((i: { status?: string }) => i.status === "unread").length;
            setUnreadCount(unread);
          }
        }
      } catch {
        // silent fail on network
      }
    }
    checkInquiries();
    const interval = setInterval(checkInquiries, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, [pathname]);

  const navGroups: NavGroup[] = [
    {
      title: "Core Operations",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        {
          label: "Inquiries Inbox",
          href: "/admin/inquiries",
          icon: Mail,
          badge: unreadCount > 0 ? `${unreadCount} New` : undefined,
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        },
      ],
    },
    {
      title: "Services & Portfolio",
      items: [
        { label: "Services & Specs", href: "/admin/services", icon: Trees },
        { label: "Signature Projects", href: "/admin/projects", icon: Briefcase },
        { label: "Equipment Fleet", href: "/admin/equipment", icon: Truck },
        { label: "Nurseries & Species", href: "/admin/nurseries", icon: Sprout },
      ],
    },
    {
      title: "Compliance & Credibility",
      items: [
        { label: "Client Partners", href: "/admin/clients", icon: Users },
        { label: "Document Vault", href: "/admin/documents", icon: FileText },
        { label: "Turnkey Protocol", href: "/admin/protocol", icon: ClipboardList },
        { label: "FAQ Knowledge", href: "/admin/faqs", icon: HelpCircle },
      ],
    },
    {
      title: "Platform Administration",
      items: [
        { label: "Company Profile", href: "/admin/company", icon: Building2 },
        { label: "System Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const csrfToken = getClientCsrfToken();
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        },
      });
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      // Full browser reload ensures all App Router layout state, locks, and cache are purged on logout
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/admin/login?message=logged_out";
    }
  }

  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0a170d] border-b border-white/10 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image
              src="/images/logo.png"
              alt="Forest Hills Garden Admin"
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
          <span className="text-sm font-bold tracking-tight text-[#f6f7f4]">
            FHG <span className="text-[#22c55e]">Console</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/5 text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/10 transition cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        data-lenis-prevent="true"
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#08130a] border-r border-white/10 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-9 h-9 shrink-0 bg-white/5 rounded-lg p-1 border border-white/10">
              <Image
                src="/images/logo.png"
                alt="Forest Hills Garden Official Emblem"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-[#f6f7f4] leading-tight">
                Forest Hills Garden
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[11px] font-mono text-[#22c55e] font-medium tracking-wide uppercase">
                  Admin CMS
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items (Grouped) */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-none">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#9aa89b]/60 font-semibold">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all group ${
                      isActive
                        ? "bg-[#16a34a] text-[#f6f7f4] shadow-md shadow-green-900/30"
                        : "text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition ${
                          isActive ? "text-[#f6f7f4]" : "text-[#22c55e] group-hover:scale-110"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 font-semibold ${
                          item.badgeColor || "bg-white/10 text-white border-white/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10 space-y-1.5 bg-[#050e07]/60">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>Public Live Site</span>
            </div>
            <span className="text-[10px] font-mono text-white/40">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-red-400/90 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
            </div>
            <ShieldCheck className="w-3 h-3 text-red-400/50" />
          </button>
        </div>
      </aside>
    </>
  );
}
