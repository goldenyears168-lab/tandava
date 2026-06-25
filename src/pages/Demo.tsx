/**
 * Demo Landing Page — Tandava 專案介紹
 *
 * 首頁僅展示平台能力概覽、角色體驗入口、功能清單與開源說明。
 */

import { useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import type { UserRole } from "@/types/database";
import {
  Calendar,
  Users,
  LayoutDashboard,
  GraduationCap,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  Shield,
  CreditCard,
  BarChart3,
  Lock,
  Server,
  Zap,
  ListChecks,
  Bell,
  Receipt,
  QrCode,
  UserCheck,
  RotateCcw,
  Video,
  FileBarChart,
  Megaphone,
  Upload,
  CheckCircle2,
} from "lucide-react";

interface RoleConfig {
  role: UserRole;
  title: string;
  description: string;
  icon: typeof LayoutDashboard;
  destination: string;
  accent: string;
  bg: string;
  features: string[];
}

const ROLES: RoleConfig[] = [
  {
    role: "owner",
    title: "工作室館主",
    description: "在一個儀表板管理整個工作室",
    icon: LayoutDashboard,
    destination: "/manage",
    accent: "text-amber-400",
    bg: "from-amber-500/20 to-amber-600/5 hover:from-amber-500/30 hover:to-amber-600/10 border-amber-500/20 hover:border-amber-400/40",
    features: ["服務排程管理", "營收與分析", "會員 CRM", "美容師管理"],
  },
  {
    role: "teacher",
    title: "美容師",
    description: "專注服務會員，減少行政負擔",
    icon: GraduationCap,
    destination: "/teach",
    accent: "text-blue-400",
    bg: "from-blue-500/20 to-blue-600/5 hover:from-blue-500/30 hover:to-blue-600/10 border-blue-500/20 hover:border-blue-400/40",
    features: ["會員報到", "收入追蹤", "代班申請", "可服務時段"],
  },
  {
    role: "front_desk",
    title: "櫃檯",
    description: "流暢的日常營運",
    icon: ClipboardCheck,
    destination: "/staff/checkin",
    accent: "text-violet-400",
    bg: "from-violet-500/20 to-violet-600/5 hover:from-violet-500/30 hover:to-violet-600/10 border-violet-500/20 hover:border-violet-400/40",
    features: ["快速報到", "候補管理", "會員查詢", "療程名單"],
  },
  {
    role: "student",
    title: "會員",
    description: "預約療程、追蹤保養進度",
    icon: Sparkles,
    destination: "/home",
    accent: "text-teal-400",
    bg: "from-teal-500/20 to-teal-600/5 hover:from-teal-500/30 hover:to-teal-600/10 border-teal-500/20 hover:border-teal-400/40",
    features: ["瀏覽與篩選療程", "尊榮票券與套票", "造訪連續紀錄", "社群"],
  },
];

const FEATURE_HIGHLIGHTS = [
  {
    icon: Calendar,
    label: "智慧服務表",
    description: "循環療程、單次調整、代班與多館別",
  },
  {
    icon: Users,
    label: "會員管理",
    description: "個人資料、到課紀錄、參與度評分、生命週期追蹤",
  },
  {
    icon: CreditCard,
    label: "付款",
    description: "Stripe Connect — 會員方案、套票、單堂體驗、工作坊",
  },
  {
    icon: BarChart3,
    label: "分析",
    description: "營收、出席率、留存率、美容師表現、流失預測",
  },
  {
    icon: QrCode,
    label: "報到",
    description: "自助報到模式、QR 碼、櫃檯手動、美容師帶領",
  },
  {
    icon: Upload,
    label: "資料遷移",
    description: "從 MindBody、Momence、Walla、Arketa、WellnessLiving 匯入",
  },
  {
    icon: Shield,
    label: "多租戶",
    description: "行級安全 — 各工作室資料完全隔離",
  },
  {
    icon: Database,
    label: "資料可攜性",
    description: "隨時匯出一切。QuickBooks、Xero、CSV",
  },
];

const FEATURE_CATEGORIES = [
  {
    title: "服務表與療程",
    features: [
      {
        icon: Calendar,
        name: "療程排程",
        description: "循環規則、單次調整、多館別",
        demoRoute: "/manage/schedule",
        demoRole: "owner" as UserRole,
      },
      {
        icon: RotateCcw,
        name: "代班管理",
        description: "美容師申請代班，符合資格者收到通知",
        demoRoute: "/teach/subs",
        demoRole: "teacher" as UserRole,
      },
      {
        icon: ListChecks,
        name: "候補自動化",
        description: "名額釋出時自動遞補",
        demoRoute: "/staff/waitlist",
        demoRole: "front_desk" as UserRole,
      },
      {
        icon: Video,
        name: "隨選影片庫",
        description: "居家保養指引串流與進度追蹤",
        demoRoute: "/on-demand",
        demoRole: "student" as UserRole,
      },
    ],
  },
  {
    title: "會員與報到",
    features: [
      {
        icon: UserCheck,
        name: "會員資料",
        description: "到館紀錄、同意書、參與度",
        demoRoute: "/manage/students",
        demoRole: "owner" as UserRole,
      },
      {
        icon: QrCode,
        name: "自助報到",
        description: "自助報到模式、QR 碼、櫃檯手動",
        demoRoute: "/staff/checkin",
        demoRole: "front_desk" as UserRole,
      },
      {
        icon: Users,
        name: "社群與連續紀錄",
        description: "造訪追蹤、排行榜、里程碑",
        demoRoute: "/community",
        demoRole: "student" as UserRole,
      },
      {
        icon: Bell,
        name: "通知",
        description: "電子郵件、簡訊、推播 — 提醒與行銷",
        demoRoute: "/manage/notification-settings",
        demoRole: "owner" as UserRole,
      },
    ],
  },
  {
    title: "付款與營收",
    features: [
      {
        icon: CreditCard,
        name: "Stripe Connect",
        description: "會員方案、套票、單堂體驗、工作坊",
        demoRoute: "/manage/financials",
        demoRole: "owner" as UserRole,
      },
      {
        icon: Receipt,
        name: "會員方案與套票",
        description: "月付/年付、套票、家庭方案、促銷",
        demoRoute: "/manage/financials",
        demoRole: "owner" as UserRole,
      },
      {
        icon: BarChart3,
        name: "營收分析",
        description: "MRR、流失率、LTV、美容師表現",
        demoRoute: "/manage/analytics",
        demoRole: "owner" as UserRole,
      },
      {
        icon: FileBarChart,
        name: "自訂報表",
        description: "日期範圍、篩選、CSV 匯出",
        demoRoute: "/manage/reports",
        demoRole: "owner" as UserRole,
      },
    ],
  },
  {
    title: "資料與行銷",
    features: [
      {
        icon: Upload,
        name: "平台遷移",
        description: "從 6 個平台匯入，自動偵測格式",
        demoRoute: "/manage/import",
        demoRole: "owner" as UserRole,
      },
      {
        icon: FileBarChart,
        name: "會計匯出",
        description: "QuickBooks IIF、Xero CSV、標準 CSV",
        demoRoute: "/manage/financials",
        demoRole: "owner" as UserRole,
      },
      {
        icon: Megaphone,
        name: "行銷活動中心",
        description: "電子郵件／簡訊活動與分眾",
        demoRoute: "/manage/campaigns",
        demoRole: "owner" as UserRole,
      },
      {
        icon: Lock,
        name: "資料可攜性",
        description: "資料永遠屬於您。隨時匯出一切。",
        demoRoute: "/manage/connectors",
        demoRole: "owner" as UserRole,
      },
      {
        icon: Code2,
        name: "網站嵌入",
        description: "一行腳本將預約功能嵌入自有網站",
        demoRoute: "/manage/embed",
        demoRole: "owner" as UserRole,
      },
    ],
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const { switchPersona } = useDemo();

  const handleRoleSelect = (config: RoleConfig) => {
    switchPersona(config.role);
    navigate(config.destination);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 您將獲得 */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-display font-semibold mb-2">您將獲得</h2>
          <p className="text-muted-foreground mb-8">
            工作室所需的一切 — 服務表、付款、分析等
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_HIGHLIGHTS.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.label}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{feat.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 探索平台 */}
      <section
        id="explore"
        className="border-b border-border bg-gradient-to-b from-card/50 to-background"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-semibold mb-3">探索平台</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              此示範載入虛構工作室{" "}
              <strong className="text-foreground">森浴光mm941</strong>， 擁有 5
              個場館、18 位美容師與 7 種療程項目。選擇角色體驗平台如何服務各方。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((config) => {
              const Icon = config.icon;
              return (
                <button
                  key={config.role}
                  type="button"
                  onClick={() => handleRoleSelect(config)}
                  className={`group relative min-h-[320px] text-left rounded-2xl border bg-gradient-to-br ${config.bg} p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-card/50 flex items-center justify-center ${config.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{config.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {config.description}
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {config.features.map((f) => (
                      <li
                        key={f}
                        className="text-xs text-muted-foreground flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-primary/60" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`flex items-center gap-2 text-sm font-medium ${config.accent} transition-all group-hover:gap-3`}
                  >
                    以{config.title}身份進入
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 所有功能 */}
      <section id="features" className="border-b border-border bg-card/20">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-display font-semibold mb-2">所有功能</h2>
          <p className="text-muted-foreground mb-8">點擊任一功能親自體驗</p>

          <div className="space-y-10">
            {FEATURE_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-border/80 bg-background/70 p-5 sm:p-6"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.title}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {category.features.map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <button
                        key={feat.name}
                        type="button"
                        onClick={() => {
                          switchPersona(feat.demoRole);
                          navigate(feat.demoRoute);
                        }}
                        className="group rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {feat.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {feat.description}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-primary/90 transition-colors group-hover:text-primary">
                          試試看 <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 為何開源 */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-display font-semibold mb-8">為何開源</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border bg-card">
              <Lock className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold mb-2">資料屬於您</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                在自有基礎設施上運行。隨時匯出一切。從設計上避免供應商鎖定。
              </p>
            </div>
            <div className="p-5 rounded-xl border bg-card">
              <Server className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold mb-2">自行託管</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                部署於 Vercel、Netlify 或自有伺服器。無按會員計費、無功能付費牆。
              </p>
            </div>
            <div className="p-5 rounded-xl border bg-card">
              <Zap className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold mb-2">現代技術棧</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                React 18、TypeScript、Vite、shadcn/ui、Supabase、Stripe Connect。生產級架構搭配 RLS。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
