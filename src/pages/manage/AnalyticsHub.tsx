import { useState } from "react";
import { Link } from "react-router-dom";
import { ManageLayout } from "@/components/manage/ManageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  Download,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Percent,
  Calendar,
  Mail,
  Plus,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const kpiCards = [
  {
    label: "每月定期收入",
    value: "NT$456,000",
    change: "+3%",
    changeLabel: "較上月",
    positive: true,
    icon: DollarSign,
    iconColor: "text-accent-gold",
    helpText: "來自尊榮會員等定期方案的穩定月收入，不含單次票券與體驗價。",
  },
  {
    label: "活躍會員",
    value: "163",
    change: "+8 淨增",
    changeLabel: "本月",
    positive: true,
    icon: Users,
    iconColor: "text-primary",
    helpText: "本期有到館或持有有效會員方案／票券的會員。",
  },
  {
    label: "平均滿位率",
    value: "72%",
    change: "+4%",
    changeLabel: "較上月",
    positive: true,
    icon: Percent,
    iconColor: "text-accent-coral",
    helpText: "各療程時段平均預約比例，反映排程與需求的匹配度。",
  },
  {
    label: "會員平均貢獻",
    value: "NT$3,570",
    change: "+NT$280",
    changeLabel: "較上月",
    positive: true,
    icon: DollarSign,
    iconColor: "text-accent-sage",
    helpText: "總營收除以活躍會員數，數值上升代表高價方案或回訪率提升。",
  },
];

const navCards = [
  {
    title: "會員分析",
    description: "了解會員組成與留存",
    icon: Users,
    href: "/manage/analytics/members",
    highlights: [
      { label: "本月新增", value: "12" },
      { label: "流失風險", value: "3" },
      { label: "30 日留存", value: "87%" },
    ],
  },
  {
    title: "銷售與轉換",
    description: "追蹤獲客與成長",
    icon: TrendingUp,
    href: "/manage/analytics/sales",
    highlights: [
      { label: "轉換率", value: "8.2%" },
      { label: "優惠 ROI", value: "NT$9,600" },
      { label: "轉介紹", value: "5" },
    ],
  },
  {
    title: "財務表現",
    description: "營收、成本與預測",
    icon: DollarSign,
    href: "/manage/analytics/financials",
    highlights: [
      { label: "收入", value: "NT$58.2 萬" },
      { label: "毛利率", value: "68%" },
      { label: "預估成長", value: "NT$6.7 萬" },
    ],
  },
  {
    title: "網站與 App 指標",
    description: "流量、來源與互動",
    icon: BarChart3,
    href: "/manage/analytics/site",
    highlights: [
      { label: "工作階段", value: "1,240" },
      { label: "來自 Google", value: "34%" },
      { label: "註冊率", value: "3.2%" },
    ],
  },
];

const healthScore = {
  overall: 78,
  label: "整體營運狀況良好",
  subscores: [
    {
      name: "營收健康度",
      score: 82,
      explanation: "定期收入穩定成長，流失影響有限。",
    },
    {
      name: "會員留存",
      score: 75,
      explanation: "多數會員 30 日內會再次預約，少數長期會員需關心。",
    },
    {
      name: "療程滿位率",
      score: 71,
      explanation: "整體滿位率不錯，部分離峰時段仍可優化。",
    },
    {
      name: "成長動能",
      score: 84,
      explanation: "新會員多於取消，轉介紹呈上升趨勢。",
    },
  ],
};

const benchmarks = [
  { metric: "會員平均貢獻", yours: 3570, median: 3200, unit: "NT$", max: 5000 },
  { metric: "滿位率", yours: 72, median: 60, unit: "%", max: 100 },
  { metric: "流失率", yours: 5, median: 5, unit: "%", max: 15, lowerIsBetter: true },
  { metric: "每月人均次數", yours: 4.2, median: 4.0, unit: "次", max: 8 },
];

const scheduledReports = [
  {
    name: "每週摘要",
    schedule: "每週一 08:00",
    recipients: "service@1314mm941.com.tw",
  },
  {
    name: "每月財務報表",
    schedule: "每月 1 日",
    recipients: "service@1314mm941.com.tw, manager@1314mm941.com.tw",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function scoreColor(score: number) {
  if (score >= 75) return "text-accent-sage";
  if (score >= 50) return "text-accent-gold";
  return "text-destructive";
}

function scoreBgColor(score: number) {
  if (score >= 75) return "bg-accent-sage";
  if (score >= 50) return "bg-accent-gold";
  return "bg-destructive";
}

// ---------------------------------------------------------------------------
// Inline tooltip helper -- togglable explanation text
// ---------------------------------------------------------------------------

function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="More info"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span className="absolute left-0 top-full mt-1 z-20 w-64 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AnalyticsHub() {
  const [period, setPeriod] = useState("this_month");

  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* ---- Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">數據分析</h1>
            <p className="text-sm text-muted-foreground mt-1">
              掌握森浴光mm941 營運表現
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_week">本週</SelectItem>
                <SelectItem value="this_month">本月</SelectItem>
                <SelectItem value="last_month">上月</SelectItem>
                <SelectItem value="this_quarter">本季</SelectItem>
                <SelectItem value="this_year">今年</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              匯出
            </Button>
          </div>
        </div>

        {/* ---- Quick Pulse KPI Cards ---- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="pt-5 pb-4 px-4">
                <div className="flex items-center justify-between">
                  <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                  <Badge
                    className={`text-[10px] ${
                      kpi.positive
                        ? "bg-accent-sage/20 text-accent-sage"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                <p className="text-xs text-muted-foreground flex items-center">
                  {kpi.label}
                  <InfoTip text={kpi.helpText} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ---- Navigation Cards (2x2) ---- */}
        <div className="grid sm:grid-cols-2 gap-4">
          {navCards.map((nav) => (
            <Link key={nav.title} to={nav.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <nav.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {nav.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{nav.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {nav.highlights.map((h) => (
                      <div key={h.label} className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold">{h.value}</span>
                        <span className="text-xs text-muted-foreground">{h.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ---- Studio Health Score ---- */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">營運健康分數</CardTitle>
              <InfoTip text="綜合營收穩定度、會員留存、療程滿位率與成長動能的 0–100 分，每日更新。" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Overall score */}
            <div className="flex items-center gap-4">
              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white ${scoreBgColor(healthScore.overall)}`}
              >
                {healthScore.overall}
              </div>
              <div>
                <p className={`text-lg font-semibold ${scoreColor(healthScore.overall)}`}>
                  {healthScore.overall} / 100
                </p>
                <p className="text-sm text-muted-foreground">{healthScore.label}</p>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="grid sm:grid-cols-2 gap-3">
              {healthScore.subscores.map((sub) => (
                <div key={sub.name} className="p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium">{sub.name}</p>
                    <span className={`text-sm font-bold ${scoreColor(sub.score)}`}>
                      {sub.score}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${scoreBgColor(sub.score)}`}
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{sub.explanation}</p>
                </div>
              ))}
            </div>

            {/* Methodology collapsible */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
                  分數如何計算？
                  <ChevronDown className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-4 rounded-xl bg-secondary/30 text-sm text-muted-foreground space-y-2">
                  <p>
                    營運健康分數由四項指標加權平均，反映工作室可持續經營程度：
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>
                      <span className="font-medium text-foreground">營收健康度（30%）</span> — 定期收入成長、流失影響與收入結構。
                    </li>
                    <li>
                      <span className="font-medium text-foreground">會員留存（30%）</span> — 30 日回訪率、流失率與參與度分布。
                    </li>
                    <li>
                      <span className="font-medium text-foreground">療程滿位率（20%）</span> — 各時段平均預約比例。
                    </li>
                    <li>
                      <span className="font-medium text-foreground">成長動能（20%）</span> — 淨增會員、轉介紹與體驗轉換率。
                    </li>
                  </ul>
                  <p className="text-xs">
                    75 分以上代表營運健康；50–75 分有改善空間；50 分以下建議儘快調整。
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* ---- Benchmark Comparison ---- */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">同業基準比較</CardTitle>
              <InfoTip text="與同規模養身／美容工作室（約 100–300 位活躍會員）的中位數比較。" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {benchmarks.map((b) => {
              const yoursPercent = Math.min((b.yours / b.max) * 100, 100);
              const medianPercent = Math.min((b.median / b.max) * 100, 100);
              const isBetter = b.lowerIsBetter ? b.yours <= b.median : b.yours >= b.median;

              return (
                <div key={b.metric}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{b.metric}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={isBetter ? "text-accent-sage font-semibold" : "text-foreground font-semibold"}>
                        本館：{b.unit}{b.yours}
                      </span>
                      <span className="text-muted-foreground">
                        中位數：{b.unit}{b.median}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
                    {/* Median marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/40 z-10"
                      style={{ left: `${medianPercent}%` }}
                    />
                    {/* Your value */}
                    <div
                      className={`h-full rounded-full ${isBetter ? "bg-accent-sage" : "bg-accent-coral"}`}
                      style={{ width: `${yoursPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground pt-1">
              基準資料來自同規模養身／美容工作室。垂直線為中位數。
            </p>
          </CardContent>
        </Card>

        {/* ---- Scheduled Reports ---- */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                定期報表
              </CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1.5" />
                排程報表
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {scheduledReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.schedule}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground hidden sm:block">{report.recipients}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ManageLayout>
  );
}
