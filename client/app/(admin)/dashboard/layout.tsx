
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="min-h-screen p-4 sm:p-6 lg:ml-64 lg:p-8">
        {children} 
      </main>
    </div>
  );
}
