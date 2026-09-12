"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Pre-fetch CSRF token on admin mount so mutation actions are primed immediately
  useEffect(() => {
    if (!isLoginPage) {
      fetch("/api/admin/csrf").catch(() => {});
    }
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050d07] text-[#f6f7f4] flex flex-col lg:flex-row antialiased">
      <AdminSidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
