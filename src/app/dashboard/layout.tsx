"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, MessageSquare, Activity } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "Messaging", href: "/dashboard/messaging", icon: MessageSquare },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Integrations", href: "/dashboard/integrations", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!session) return <div className="flex h-screen items-center justify-center">Access Denied.</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-xl font-bold text-brand-600">DentFlow AI</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-50"}`}>
                <Icon className="w-5 h-5 mr-3" /> {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            {session.user?.image && <Image src={session.user.image} alt={session.user.name || "User"} width={32} height={32} className="rounded-full mr-2" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{(session.user as any)?.role}</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">{navItems.find(n => pathname.startsWith(n.href))?.name || "Dashboard"}</h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
