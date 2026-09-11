import AdminHeader from "@/components/admin/AdminHeader";

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="System Administration & Diagnostics"
        subtitle="Loading system metrics and settings..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
        <div className="h-64 rounded-2xl bg-white/5 animate-pulse" />
      </div>
      <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
    </div>
  );
}
