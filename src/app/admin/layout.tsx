import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Console | Forest Hills Garden",
  description: "Enterprise content and operations management system for Forest Hills Garden.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
