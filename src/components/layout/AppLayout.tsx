import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission } from "@/types/roles";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Calendar,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  LayoutDashboard,
  Heart,
  Play,
  Store,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";

import { createT } from "@/lib/strings";

interface AppLayoutProps {
  children: ReactNode;
}

const navigation = [
  { nameKey: "home", href: "/home", icon: Home },
  { nameKey: "schedule", href: "/schedule", icon: Calendar },
  { nameKey: "onDemand", href: "/on-demand", icon: Play },
  { nameKey: "events", href: "/events", icon: Sparkles },
  { nameKey: "instructors", href: "/instructors", icon: Heart },
  { nameKey: "mySchedule", href: "/my-schedule", icon: CalendarCheck },
  { nameKey: "community", href: "/community", icon: Users },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, permissions, signOut } = useAuth();
  const t = createT("common");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = profile
    ? {
        name: `${profile.first_name} ${profile.last_name}`,
        email: profile.email,
        avatar: profile.avatar_url || "",
      }
    : {
        name: t("guest"),
        email: "",
        avatar: "",
      };

  const showManageLink = hasPermission(permissions, "studio.manage_settings");
  const showStaffLink = hasPermission(permissions, "studio.checkin");
  const showAdminLink = hasPermission(permissions, "platform.admin");

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-[70] rounded-md bg-background px-3 py-2 text-sm font-medium shadow-md focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {t("skipToContent")}
      </a>

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-16 lg:gap-4">
          {/* Studio Brand */}
          <Link
            to="/home"
            className="flex shrink-0 items-center gap-2.5 rounded-xl py-1 pr-2 transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-teal to-accent-sage shadow-sm lg:h-10 lg:w-10">
              <span className="text-base font-bold text-white lg:text-lg">森</span>
            </div>
            <span className="whitespace-nowrap text-base font-semibold tracking-tight text-foreground lg:text-lg">
              森浴光
              <span className="ml-1 font-normal text-muted-foreground">mm941</span>
            </span>
          </Link>

          {/* Desktop Navigation — horizontal scroll when space is tight */}
          <nav
            aria-label={t("nav.main", { defaultValue: "主要導覽" })}
            className="hidden min-w-0 flex-1 lg:flex"
          >
            <div className="flex w-full items-center gap-0.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.nameKey}
                    to={item.href}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden />
                    {t(`nav.${item.nameKey}`)}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="查看通知"
              className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:h-10 lg:w-10"
            >
              <Bell className="h-[18px] w-[18px] lg:h-5 lg:w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-sm lg:h-[18px] lg:w-[18px] lg:text-[10px]">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="開啟使用者選單"
                  className="relative h-9 w-9 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:h-10 lg:w-10"
                >
                  <Avatar className="h-9 w-9 border-2 border-primary/20 lg:h-10 lg:w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-accent-lilac text-foreground font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl p-2" align="end">
                <div className="flex items-center gap-3 p-2 mb-2">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-accent-lilac text-foreground font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link
                    to="/account"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    {t("userMenu.account")}
                  </Link>
                </DropdownMenuItem>
                {(showManageLink || showStaffLink || showAdminLink) && (
                  <>
                    <DropdownMenuSeparator />
                    {showManageLink && (
                      <DropdownMenuItem asChild className="rounded-xl">
                        <Link
                          to="/manage"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Store className="h-4 w-4" />
                          {t("userMenu.studioManager")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {showStaffLink && (
                      <DropdownMenuItem asChild className="rounded-xl">
                        <Link
                          to="/staff/checkin"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                          {t("userMenu.frontDesk")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {showAdminLink && (
                      <DropdownMenuItem asChild className="rounded-xl">
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Settings className="h-4 w-4" />
                          {t("userMenu.platformAdmin")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="rounded-xl cursor-pointer text-destructive"
                  onClick={async () => {
                    await signOut();
                    navigate("/auth/login");
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("userMenu.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                mobileMenuOpen
                  ? "關閉導覽選單"
                  : "開啟導覽選單"
              }
              aria-expanded={mobileMenuOpen}
              className="h-10 w-10 rounded-full lg:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card shadow-sm animate-fade-in lg:hidden">
            <nav className="mx-auto max-w-7xl space-y-0.5 px-4 py-3 sm:px-6">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.nameKey}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                    {t(`nav.${item.nameKey}`)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6 mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>
            &copy; {new Date().getFullYear()} 森浴光mm941。{" "}
            {t("footer.allRightsReserved")}
          </span>
          <span>
            {t("footer.poweredBy")}{" "}
            <Link
              to="/"
              className="font-medium text-accent-teal transition-colors hover:text-accent-teal/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Tandava
            </Link>{" "}
            &mdash; {t("footer.openSourceStudio")}
          </span>
        </div>
      </footer>
    </div>
  );
}
