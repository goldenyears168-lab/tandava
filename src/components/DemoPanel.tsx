/**
 * DEMO PANEL — For the live demo site only.
 *
 * This floating side panel lets visitors switch between roles and shows
 * contextual information about what they're seeing. It only renders when
 * VITE_DEMO_MODE=true.
 *
 * HOW TO REMOVE:
 * Delete this file and remove the <DemoPanel /> from App.tsx.
 * Or just set VITE_DEMO_MODE=false — the panel won't render.
 */

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Github,
  ExternalLink,
  User,
  Shield,
  GraduationCap,
  Headphones,
  Users,
  Info,
  Code2,
  Rocket,
  X,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useDemo, DEMO_MODE_ENABLED } from "@/contexts/DemoContext";
import type { UserRole } from "@/types/database";
import { cn } from "@/lib/utils";
import { GuidedTour, TourLauncher, useTour } from "@/components/tour/GuidedTour";

const ROLE_ICONS: Record<UserRole, typeof User> = {
  owner: Shield,
  admin: Headphones,
  teacher: GraduationCap,
  front_desk: Users,
  student: User,
  platform_admin: ShieldCheck,
};

const ROLE_COLORS: Record<UserRole, string> = {
  owner: "bg-accent-gold/20 text-accent-gold border-accent-gold/30",
  admin: "bg-primary/20 text-primary border-primary/30",
  teacher: "bg-accent-sage/20 text-accent-sage border-accent-sage/30",
  front_desk: "bg-accent-coral/20 text-accent-coral border-accent-coral/30",
  student: "bg-accent-teal/20 text-[color:var(--accent-teal)] border-[color:var(--accent-teal)]/30",
  platform_admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

// Where each role should land when selected
const ROLE_DESTINATIONS: Record<UserRole, string> = {
  owner: "/manage",
  admin: "/manage",
  teacher: "/teach",
  front_desk: "/staff/checkin",
  student: "/home",
  platform_admin: "/admin",
};

// Contextual descriptions for each page
const PAGE_CONTEXT: Record<string, { title: string; description: string; techNote: string }> = {
  "/": {
    title: "演示入口",
    description: "選擇角色，從不同視角探索平台。",
    techNote: "這是演示模式的進入點。正式環境中，此處會是場館的公開網站。",
  },
  "/home": {
    title: "場館首頁",
    description: "主要登陸頁 — 今日課程、課程類型、老師、方案與據點。",
    techNote: "使用森浴光mm941演示資料。由 OXATL_SCHEDULE、OXATL_CLASS_TYPES、OXATL_TEACHERS 與 OXATL_LOCATIONS 建置。",
  },
  "/schedule": {
    title: "課程表",
    description: "瀏覽、篩選並預約課程。包含一般課程、工作坊、靜修營與私人預約。",
    techNote: "課表資料來自 schedule_rules（循環）與 class_occurrences（單次）。BookingModal 處理付款流程。",
  },
  "/my-schedule": {
    title: "我的課表",
    description: "查看即將與過去的預約。取消預約、為已上課程評分。",
    techNote: "bookings 表狀態：BOOKED、CHECKED_IN、CANCELED、NO_SHOW、WAITLISTED。",
  },
  "/community": {
    title: "社群與數據",
    description: "練習統計、連續天數、排行榜、好友連結。提升留存的遊戲化層。",
    techNote: "由 engagement_profiles 表驅動。連續天數、里程碑與好友動態在伺服器端計算。",
  },
  "/account": {
    title: "帳戶設定",
    description: "個人資料、會籍、付款方式、帳單紀錄、通知偏好。",
    techNote: "個人檔案存於 profiles 表。會籍透過 member_memberships 連結並追蹤權益。",
  },
  "/on-demand": {
    title: "隨選課程庫",
    description: "依風格、時長與難度瀏覽錄影課程。串流播放或離線下載。",
    techNote: "影片存於 Supabase Storage，以簽名 URL 串流。每位使用者追蹤觀看進度。",
  },
  "/studios": {
    title: "場館據點",
    description: "瀏覽各據點詳情、照片與各據點課表。",
    techNote: "studios 與 locations 表含 RLS。各據點的 rooms 有容量限制。",
  },
  "/instructors": {
    title: "師資團隊",
    description: "認識教學團隊 — 簡介、專長、證照與課表。",
    techNote: "老師檔案含 specialties 陣列。課表依 teacher_id 從 class_occurrences 拉取。",
  },
  // ---------- Studio Management ----------
  "/manage": {
    title: "管理儀表板",
    description: "經營者指揮中心 — 今日課表、KPI、提醒與最新動態一目了然。",
    techNote: "KPI 來自 analytics_daily。提醒由 bookings、memberships 與 class_occurrences 計算。",
  },
  "/manage/schedule": {
    title: "課表管理",
    description: "管理每週課表。找代課、取消課程、通知學員。",
    techNote: "schedule_rules 處理循環模式，class_occurrences 為實例。覆寫不會改變原規則。",
  },
  "/manage/students": {
    title: "學員管理",
    description: "搜尋所有學員 — 檔案、會籍、到課紀錄、互動狀態、同意書。",
    techNote: "學員清單依 studio_id 經 RLS 篩選。engagement_profiles 提供流失風險等級。",
  },
  "/manage/teachers": {
    title: "老師管理",
    description: "管理老師檔案、薪資、可授課時段、證照與表現。",
    techNote: "老師檔案含 pay_rate、specialties、證照追蹤。透過 teacher_id 連結課表。",
  },
  "/manage/offerings": {
    title: "課程類型",
    description: "定義課程類型 — 名稱、描述、時長、程度、容量與顏色。",
    techNote: "offerings 表定義範本。class_occurrences 以 offering_id 參照各排課。",
  },
  "/manage/events": {
    title: "活動與工作坊",
    description: "建立工作坊、培訓、靜修營與系列課程，支援分級定價與報名。",
    techNote: "活動與一般課程分開 — 自有場次、定價方案與報名流程。",
  },
  "/manage/financials": {
    title: "財務",
    description: "會籍類型、課程包、交易紀錄。場館的財務骨幹。",
    techNote: "transactions 表追蹤所有付款。Stripe Connect 處理金流。",
  },
  "/manage/analytics": {
    title: "分析中心",
    description: "場館健康分數、基準比較，以及各詳細分析儀表板入口。",
    techNote: "彙整 analytics_daily、engagement_profiles、mrr_snapshots 與 clv_cohorts。",
  },
  "/manage/settings": {
    title: "場館設定",
    description: "設定場館資訊、據點、教室、政策、品牌與整合。",
    techNote: "設定存於 studios 表。主題自訂使用 CSS 自訂屬性。",
  },
  "/manage/import": {
    title: "資料匯入",
    description: "透過 CSV 從其他平台遷移 — 智慧欄位對應與資料品質檢查。",
    techNote: "匯入連接器辨識 MindBody、Momence、Walla 格式。試跑模式先驗證。",
  },
  "/manage/onboarding": {
    title: "場館入門引導",
    description: "引導式設定精靈 — 全新開始、匯入設定或快速上線路徑。",
    techNote: "進度存於 studio_onboarding 表。所有步驟可略過並可再次進入。",
  },
  "/manage/products": {
    title: "商品",
    description: "零售商品 — 瑜珈墊、輔具、周邊。追蹤庫存與銷售。",
    techNote: "products 表含變體、定價與各據點庫存量。",
  },
  "/manage/inventory": {
    title: "庫存",
    description: "跨據點追蹤商品庫存。低庫存提醒與補貨點。",
    techNote: "依據點追蹤庫存。採購單連結供應商補貨。",
  },
  "/manage/reports": {
    title: "報表",
    description: "產生詳細報表 — 出席、營收、老師表現、留存。",
    techNote: "報表查詢 analytics_daily 與 transaction 表，支援日期區間篩選。",
  },
  "/manage/promo-codes": {
    title: "優惠碼",
    description: "建立與管理會籍、課程包的促銷折扣碼。",
    techNote: "優惠碼含使用次數限制、到期日，以及百分比或固定金額折扣。",
  },
  "/manage/campaigns": {
    title: "行銷活動",
    description: "Email 與簡訊行銷，向學員推送公告與促銷。",
    techNote: "活動建立器含受眾分群、排程與送達追蹤。",
  },
  "/manage/tasks": {
    title: "任務",
    description: "場館任務管理 — 為團隊指派並追蹤營運待辦。",
    techNote: "簡易任務系統，含指派、到期日與完成追蹤。",
  },
  "/manage/sms-inbox": {
    title: "簡訊收件匣",
    description: "與學員雙向簡訊。發送提醒、回覆問題。",
    techNote: "透過 Twilio 整合簡訊。訊息以對話串方式儲存。",
  },
  "/manage/landing-pages": {
    title: "登陸頁",
    description: "為促銷、活動與季節性活動建立自訂登陸頁。",
    techNote: "簡易頁面建立器，可設定區塊、圖片與 CTA。",
  },
  "/manage/utm-builder": {
    title: "UTM 連結建立器",
    description: "產生 UTM 標記連結，追蹤行銷活動成效。",
    techNote: "產生 Google Analytics 用的 UTM 參數，並儲存連結紀錄。",
  },
  "/manage/notification-settings": {
    title: "通知設定",
    description: "設定要接收哪些通知，以及透過 Email、簡訊或站內通知。",
    techNote: "每位使用者的通知偏好。提供者無關：Resend、SendGrid、SMTP 或 console。",
  },
  "/teach": {
    title: "老師儀表板",
    description: "您的授課總覽 — 今日課程報到、即將開課、小費、代課請求。",
    techNote: "依老師 profile_id 篩選。僅顯示其課程與收入。",
  },
  "/teach/schedule": {
    title: "授課課表",
    description: "完整課表 — 即將與過去的課程及報名人數。",
    techNote: "class_occurrences 依 teacher_id 篩選。顯示每堂課已預約/容量。",
  },
  "/teach/subs": {
    title: "代課管理",
    description: "為自己的課程申請代課，或承接其他老師的代課機會。",
    techNote: "sub requests 表追蹤狀態。依專長媒合可代課老師。",
  },
  "/teach/earnings": {
    title: "收入",
    description: "追蹤薪資 — 基本時薪、小費、代課。薪資期間摘要與紀錄。",
    techNote: "依 class_occurrences 與老師薪率加小費分配計算收入。",
  },
  "/teach/availability": {
    title: "可授課時段",
    description: "設定每週可授課時段與請假申請。",
    techNote: "可授課時段以循環模式儲存。請假需經場館經營者核准。",
  },
  "/teach/profile": {
    title: "老師檔案",
    description: "編輯公開老師檔案 — 簡介、專長、證照與照片。",
    techNote: "老師檔案資料顯示於公開師資頁面。",
  },
  "/staff/checkin": {
    title: "櫃台報到",
    description: "為今日課程完成會員報到。依姓名搜尋、查看名單、追蹤出席。",
    techNote: "櫃台人員看到以日常營運為主的精簡版面。",
  },
  "/staff/waitlist": {
    title: "候補管理",
    description: "查看並管理課程候補。有名額時遞補會員。",
    techNote: "可在功能設定中啟用候補自動遞補。",
  },
  "/admin": {
    title: "平台管理",
    description: "全平台管理 — 場館、使用者、帳務與系統設定。",
    techNote: "平台管理員繞過場館 RLS 存取所有資料，與場館管理分開。",
  },
};

export function DemoPanel() {
  if (!DEMO_MODE_ENABLED) return null;
  return <DemoPanelInner />;
}

function DemoTourOverlay({ role }: { role: string }) {
  const { tour, step, showLauncher, startTour, skipTour, dismissTour, changeStep } = useTour(role);

  if (!tour) return null;

  return (
    <>
      {showLauncher && (
        <TourLauncher tour={tour} onStart={startTour} onSkip={skipTour} />
      )}
      {step !== null && (
        <GuidedTour
          tour={tour}
          currentStep={step}
          onStepChange={changeStep}
          onDismiss={dismissTour}
        />
      )}
    </>
  );
}

function DemoPanelInner() {
  const { activePersona, personas, switchPersona, panelOpen, setPanelOpen } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const [showTechNotes, setShowTechNotes] = useState(false);

  // Find the best matching page context
  const currentPath = location.pathname;
  const pageContext = PAGE_CONTEXT[currentPath] ??
    Object.entries(PAGE_CONTEXT)
      .filter(([path]) => path !== "/")
      .sort((a, b) => b[0].length - a[0].length) // longest match first
      .find(([path]) => currentPath.startsWith(path))?.[1] ??
    { title: "頁面", description: "探索平台的這個區塊。", techNote: "請查看原始碼了解實作細節。" };

  const RoleIcon = ROLE_ICONS[activePersona.role] ?? User;

  // Handle role switch — update demo context AND navigate to the role's home
  const handleRoleSwitch = (role: UserRole) => {
    switchPersona(role);
    const destination = ROLE_DESTINATIONS[role] ?? "/home";
    navigate(destination);
  };

  // Restart tour for current role
  const handleRestartTour = () => {
    const tourId = `tour-${activePersona.role}`;
    localStorage.removeItem(`${tourId}-seen`);
    // Force re-render by toggling a state
    window.location.reload();
  };

  if (!panelOpen) {
    return (
      <>
        <DemoTourOverlay role={activePersona.role} />
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-primary text-primary-foreground px-2 py-4 rounded-l-xl shadow-lg hover:px-3 transition-all"
          title="開啟演示面板"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-[10px] font-bold tracking-wider" style={{ writingMode: 'vertical-rl' }}>
            演示
          </span>
        </button>
      </>
    );
  }

  return (
    <>
    <DemoTourOverlay role={activePersona.role} />
    <div className="fixed right-0 top-0 bottom-0 w-80 z-[100] bg-card border-l border-border shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">T</span>
            </div>
            <div>
              <p className="text-sm font-bold">森浴光演示</p>
              <Badge variant="outline" className="text-[9px] mt-0.5">互動預覽</Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPanelOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Role Switcher */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            目前檢視身分
          </p>
          <div className="space-y-1.5">
            {personas.map((persona) => {
              const Icon = ROLE_ICONS[persona.role] ?? User;
              const isActive = persona.role === activePersona.role;
              return (
                <button
                  key={persona.role}
                  onClick={() => handleRoleSwitch(persona.role)}
                  className={cn(
                    "flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all text-sm",
                    isActive
                      ? `border ${ROLE_COLORS[persona.role] ?? "border-border"}`
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium text-xs", isActive && "text-foreground")}>{persona.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{persona.name}</p>
                  </div>
                  {isActive && (
                    <Badge variant="outline" className="text-[9px] shrink-0">使用中</Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Current Page Context */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Info className="h-3.5 w-3.5 text-primary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              您正在看什麼
            </p>
          </div>
          <Card>
            <CardContent className="p-3 space-y-2">
              <p className="text-sm font-semibold">{pageContext.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{pageContext.description}</p>

              {/* Role access note */}
              <div className="pt-1">
                <div className="flex items-center gap-1.5">
                  <RoleIcon className="h-3 w-3 text-muted-foreground" />
                  <p className="text-[10px] text-muted-foreground">
                    {activePersona.role === 'student'
                      ? "學員看到的是對外開放的體驗"
                      : `${activePersona.label}可存取此頁面`}
                  </p>
                </div>
              </div>

              {/* Tech notes toggle */}
              <button
                onClick={() => setShowTechNotes(!showTechNotes)}
                className="flex items-center gap-1.5 text-[10px] text-primary hover:underline pt-1"
              >
                <Code2 className="h-3 w-3" />
                {showTechNotes ? "隱藏" : "顯示"}技術細節
              </button>
              {showTechNotes && (
                <div className="p-2 rounded-lg bg-secondary/50 text-[10px] text-muted-foreground leading-relaxed">
                  {pageContext.techNote}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Access for current role */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {activePersona.label}可存取
          </p>
          <div className="flex flex-wrap gap-1">
            {activePersona.canAccess.map((item) => (
              <Badge key={item} variant="secondary" className="text-[10px]">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Getting Started */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Rocket className="h-3.5 w-3.5 text-primary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              自行部署
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              森浴光是開源軟體，可免費自行部署。不到一小時就能讓自己的場館平台上線。
            </p>

            <div className="space-y-1.5">
              <StepItem number={1} text="從 GitHub 複製 repo" />
              <StepItem number={2} text="執行 npm install && npm run dev" />
              <StepItem number={3} text="設定 Supabase（本機或雲端）" />
              <StepItem number={4} text="連接 Stripe 處理付款" />
              <StepItem number={5} text="自訂品牌並正式上線" />
            </div>

            <p className="text-[10px] text-muted-foreground pt-1">
              沒有程式經驗？請參考我們的分步指南，了解如何用 AI 程式工具自訂 森浴光。
            </p>
          </div>
        </div>

        <Separator />

        {/* Tour */}
        <div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={handleRestartTour}
          >
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            重新開始{activePersona.label}導覽
          </Button>
        </div>

        <Separator />

        {/* Links */}
        <div className="space-y-2">
          <a
            href="https://github.com/TaylorONeal/tandava"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
          >
            <Github className="h-4 w-4" />
            <span className="flex-1">在 GitHub 上查看</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>
          <a
            href="https://github.com/TaylorONeal/tandava/tree/main/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
          >
            <Info className="h-4 w-4" />
            <span className="flex-1">文件</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>
        </div>

        {/* Footer */}
        <div className="pt-2 pb-4">
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            AGPL-3.0 授權。您的場館、您的資料、您的自由。
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

function StepItem({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary shrink-0">
        {number}
      </span>
      <span className="text-[11px]">{text}</span>
    </div>
  );
}
