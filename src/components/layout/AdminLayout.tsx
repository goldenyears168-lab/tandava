import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  BarChart3,
  Megaphone,
  MessageSquare,
  Settings,
  ArrowLeft,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "儀表板", href: "/admin", icon: LayoutDashboard },
  { name: "工作室", href: "/admin/studios", icon: Building2 },
  { name: "使用者", href: "/admin/users", icon: Users },
  { name: "帳單", href: "/admin/billing", icon: CreditCard },
  { name: "分析", href: "/admin/analytics", icon: BarChart3 },
  { name: "意見回饋", href: "/admin/feedback", icon: MessageSquare },
  { name: "公告", href: "/admin/announcements", icon: Megaphone },
  { name: "設定", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 p-4 flex flex-col">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            返回應用程式
          </Link>
          <h2 className="text-lg font-bold tracking-tight">平台管理</h2>
          <p className="text-xs text-muted-foreground">管理您的 森浴光 實例</p>
        </div>

        <nav className="space-y-1 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            實例：{import.meta.env.VITE_APP_NAME || "森浴光"}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
