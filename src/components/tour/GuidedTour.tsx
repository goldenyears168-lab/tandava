/**
 * GuidedTour — Reusable guided tour component
 *
 * Shows a floating modal with step-by-step guidance as users navigate
 * role-specific flows. Uses DemoContext tourStep for state.
 *
 * In demo mode: tour content explains the platform to evaluating studio owners
 * In production: same component can be used for staff training with different copy
 */

import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Lightbulb,
  MapPin,
} from "lucide-react";

// ============================================================================
// TOUR STEP TYPES
// ============================================================================

export interface TourStep {
  /** Route pattern this step applies to (exact match or startsWith) */
  route: string;
  /** Step title */
  title: string;
  /** Descriptive body text */
  body: string;
  /** Optional hint about what to try */
  hint?: string;
  /** Icon component */
  icon?: typeof Lightbulb;
}

export interface TourConfig {
  /** Unique tour ID for localStorage persistence */
  id: string;
  /** Tour name shown in header */
  name: string;
  /** Steps in order */
  steps: TourStep[];
}

// ============================================================================
// ROLE-SPECIFIC TOUR CONFIGS
// ============================================================================

export const OWNER_TOUR: TourConfig = {
  id: "tour-owner",
  name: "場館經營者導覽",
  steps: [
    {
      route: "/manage",
      title: "經營者儀表板",
      body: "這是您的指揮中心。今日課表、關鍵指標、最新動態與提醒 — 一目了然。營收、出席趨勢與待辦事項都彙整在此。",
      hint: "試試點擊圖表上的不同日期區間，或查看提醒面板。",
    },
    {
      route: "/manage/schedule",
      title: "課表管理",
      body: "以循環規則建立與管理課表，支援單次調整與代課。每堂課即時顯示報名人數、容量與候補狀態。",
      hint: "試試新增一堂課或編輯現有課程。",
    },
    {
      route: "/manage/members",
      title: "會員管理",
      body: "每位會員的個人檔案、到課紀錄、會籍狀態與同意書集中管理。可依狀態篩選、搜尋姓名，點擊即可查看完整紀錄。",
      hint: "試試搜尋會員或依會籍類型篩選。",
    },
    {
      route: "/manage/financials",
      title: "財務總覽",
      body: "會籍、課程包、交易與營收追蹤。查看 MRR、流失率與收款健康度，並匯出報表供會計使用。",
      hint: "試試匯出功能，或切換會籍與課程包檢視。",
    },
    {
      route: "/manage/analytics",
      title: "分析與報表",
      body: "出席模式、營收趨勢、老師表現與留存指標。以數據驅動課表與定價決策。",
      hint: "探索不同的分析分頁與圖表檢視。",
    },
    {
      route: "/manage/settings",
      title: "場館設定",
      body: "設定場館資訊：據點、政策、品牌、金流、通知偏好與功能開關。一切皆可自訂。",
      hint: "瀏覽各設定區塊，了解可配置項目。",
    },
  ],
};

export const TEACHER_TOUR: TourConfig = {
  id: "tour-teacher",
  name: "老師導覽",
  steps: [
    {
      route: "/teach",
      title: "老師儀表板",
      body: "您的專屬教學中心。查看即將開課的課程、最新動態與關鍵數據。快速進入課表、代課請求與收入。",
      hint: "查看即將開課的課程與待處理的代課請求。",
    },
    {
      route: "/teach/schedule",
      title: "您的授課課表",
      body: "跨據點的所有排課。查看報名人數、申請代課，並管理您的教學行事曆。",
      hint: "試試為其中一堂課申請代課。",
    },
    {
      route: "/teach/earnings",
      title: "收入與薪資",
      body: "追蹤課程、工作坊與小費收入。依期間查看明細，含每堂課與時薪資訊。",
      hint: "切換不同期間，查看收入趨勢。",
    },
    {
      route: "/teach/availability",
      title: "設定可授課時段",
      body: "告知場館您可授課的時間。設定每週固定時段與代課偏好，讓合適的機會找上門。",
      hint: "切換各日開關並設定偏好時段。",
    },
    {
      route: "/teach/profile",
      title: "您的公開檔案",
      body: "管理學員看到的資訊：簡介、專長、證照與教學風格。完整的檔案有助學員找到並認識您。",
      hint: "更新簡介並新增專長。",
    },
  ],
};

export const FRONTDESK_TOUR: TourConfig = {
  id: "tour-frontdesk",
  name: "櫃台導覽",
  steps: [
    {
      route: "/staff/checkin",
      title: "會員報到",
      body: "每日報到畫面。查看今日課程、搜尋會員並完成報到。會員也可透過自助報到機或 QR 碼自行報到。",
      hint: "試試從名單中為會員完成報到。",
    },
    {
      route: "/staff/waitlist",
      title: "候補管理",
      body: "課程額滿時，會員可加入候補。有名額釋出時可手動或自動遞補，並追蹤回覆期限。",
      hint: "試試遞補一位候補會員，查看確認流程。",
    },
  ],
};

export const MEMBER_TOUR: TourConfig = {
  id: "tour-member",
  name: "會員導覽",
  steps: [
    {
      route: "/home",
      title: "您的主頁",
      body: "歡迎來到您的練習中心。快速預約常上課程、查看即將開課的課程、追蹤練習連續天數，並與社群保持連結。",
      hint: "試試從快速預約區預約一堂課。",
    },
    {
      route: "/schedule",
      title: "瀏覽課程",
      body: "依風格、老師、時間或據點找課。篩選與搜尋，找到最適合的練習。點擊任一課程查看詳情並預約。",
      hint: "試試依課程風格篩選或搜尋老師。",
    },
    {
      route: "/my-schedule",
      title: "我的課表",
      body: "所有即將與過去的預約集中一處。取消或修改預約、查看候補狀態，並回顧上課紀錄。",
      hint: "查看即將開課的預約與過往出席紀錄。",
    },
    {
      route: "/account",
      title: "我的帳戶",
      body: "會籍詳情、課程包餘額、帳單紀錄與通知偏好。帳戶相關資訊盡在此處。",
      hint: "查看會籍狀態與帳單紀錄。",
    },
  ],
};

// Map role → tour config
export const ROLE_TOURS: Record<string, TourConfig> = {
  owner: OWNER_TOUR,
  teacher: TEACHER_TOUR,
  front_desk: FRONTDESK_TOUR,
  student: MEMBER_TOUR,
};

// ============================================================================
// TOUR COMPONENT
// ============================================================================

interface GuidedTourProps {
  tour: TourConfig;
  currentStep: number;
  onStepChange: (step: number) => void;
  onDismiss: () => void;
}

export function GuidedTour({ tour, currentStep, onStepChange, onDismiss }: GuidedTourProps) {
  const location = useLocation();
  const step = tour.steps[currentStep];

  if (!step) return null;

  const isFirst = currentStep === 0;
  const isLast = currentStep === tour.steps.length - 1;
  const isOnCorrectPage = location.pathname === step.route || location.pathname.startsWith(step.route + "/");

  return (
    <div className="fixed bottom-6 left-6 z-[60] w-[380px] max-w-[calc(100vw-3rem)]">
      <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-primary/5 border-b border-border">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">{tour.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} / {tour.steps.length}
            </span>
            <button
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tour.steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold mb-1.5">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.body}</p>

          {step.hint && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-primary">{step.hint}</p>
            </div>
          )}

          {!isOnCorrectPage && (
            <p className="text-xs text-amber-600 mb-3">
              請前往此頁面以探索此功能。
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-4 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStepChange(currentStep - 1)}
            disabled={isFirst}
            className="text-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            上一步
          </Button>

          {isLast ? (
            <Button size="sm" onClick={onDismiss} className="text-xs">
              完成導覽
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => onStepChange(currentStep + 1)}
              className="text-xs"
            >
              下一步
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TOUR LAUNCHER — Shown once per role on first visit
// ============================================================================

interface TourLauncherProps {
  tour: TourConfig;
  onStart: () => void;
  onSkip: () => void;
}

export function TourLauncher({ tour, onStart, onSkip }: TourLauncherProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-[420px] max-w-[calc(100vw-2rem)] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{tour.name}</h2>
            <p className="text-xs text-muted-foreground">{tour.steps.length} 個站點</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          快速導覽此檢視中的主要功能。
          我們會標示重點功能並帶您熟悉各項位置。
        </p>

        <div className="space-y-1.5 mb-6">
          {tour.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {i + 1}
              </div>
              <span className="text-muted-foreground">{step.title}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onSkip}>
            略過導覽
          </Button>
          <Button size="sm" onClick={onStart}>
            開始導覽
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HOOK — Manages tour state with localStorage persistence
// ============================================================================

export function useTour(role: string | null) {
  const tour = role ? ROLE_TOURS[role] : null;
  const [step, setStep] = useState<number | null>(null);
  const [showLauncher, setShowLauncher] = useState(false);

  // Check if this tour has been seen before
  useEffect(() => {
    if (!tour) return;
    const seen = localStorage.getItem(`${tour.id}-seen`);
    if (!seen) {
      // Small delay so the page renders first
      const timer = setTimeout(() => setShowLauncher(true), 800);
      return () => clearTimeout(timer);
    }
  }, [tour]);

  const startTour = useCallback(() => {
    setShowLauncher(false);
    setStep(0);
  }, []);

  const skipTour = useCallback(() => {
    if (tour) localStorage.setItem(`${tour.id}-seen`, "true");
    setShowLauncher(false);
    setStep(null);
  }, [tour]);

  const dismissTour = useCallback(() => {
    if (tour) localStorage.setItem(`${tour.id}-seen`, "true");
    setStep(null);
  }, [tour]);

  const changeStep = useCallback((newStep: number) => {
    setStep(newStep);
  }, []);

  return {
    tour,
    step,
    showLauncher,
    startTour,
    skipTour,
    dismissTour,
    changeStep,
  };
}
