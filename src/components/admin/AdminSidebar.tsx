"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  badgeColor?: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      label: "Inquiries Inbox",
      href: "/admin/inquiries",
      icon: Mail,
      badge: unreadCount > 0 ? `${unreadCount} New` : undefined,
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    { label: "Company Profile", href: "/admin/company", icon: Building2 },
    { label: "Services & Specs", href: "/admin/services", icon: Trees },
    { label: "Signature Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Client Partners", href: "/admin/clients", icon: Users },
    { label: "Nurseries & Species", href: "/admin/nurseries", icon: Sprout },
    { label: "Equipment Fleet", href: "/admin/equipment", icon: Truck },
    { label: "Turnkey Protocol", href: "/admin/protocol", icon: ClipboardList },
    { label: "FAQ Knowledge", href: "/admin/faqs", icon: HelpCircle },
    { label: "Document Vault", href: "/admin/documents", icon: FileText },
    { label: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
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
          className="p-2 rounded-lg bg-white/5 text-[#9aa89b] hover:text-[#f6f7f4] hover:bg-white/10 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#08130a] border-r border-white/10 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10">
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

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#9aa89b]/70 font-semibold">
            Operational Modules
          </div>

          {navItems.map((item) => {
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all group ${
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
