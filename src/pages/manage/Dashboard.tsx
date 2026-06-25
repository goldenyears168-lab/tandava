import { ManageLayout } from "@/components/manage/ManageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  UserPlus,
  CalendarPlus,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { EngagementNudge } from "@/components/EngagementNudge";

// 今日療程（示範資料，對應森浴光mm941 服務項目）
const todayClasses: {
  id: string;
  name: string;
  time: string;
  teacher: string;
  branch: string;
  spotsLeft: number;
  capacity: number;
  checkedIn: number;
}[] = [
  { id: "1", name: "活化能量艙", time: "09:30", teacher: "林美容師", branch: "台中北屯館", spotsLeft: 1, capacity: 4, checkedIn: 2 },
  { id: "2", name: "專業撥筋", time: "11:00", teacher: "陳美容師", branch: "台北復興館", spotsLeft: 2, capacity: 6, checkedIn: 0 },
  { id: "3", name: "溫感能量光療", time: "13:30", teacher: "王美容師", branch: "台中東區館", spotsLeft: 0, capacity: 6, checkedIn: 0 },
  { id: "4", name: "負離子活罐", time: "15:00", teacher: "張美容師", branch: "汐止館", spotsLeft: 3, capacity: 6, checkedIn: 0 },
  { id: "5", name: "能量艙＋撥筋", time: "17:00", teacher: "林美容師", branch: "台中北屯館", spotsLeft: 1, capacity: 4, checkedIn: 0 },
  { id: "6", name: "舒通筋脈", time: "19:30", teacher: "李美容師", branch: "台南健康館", spotsLeft: 4, capacity: 6, checkedIn: 0 },
];

const alerts = [
  { type: "booking", message: "台中北屯館 17:00 能量艙＋撥筋 僅剩 1 個名額", urgent: true },
  { type: "waitlist", message: "台中東區館 13:30 溫感能量光療 已額滿——2 人候補", urgent: false },
  { type: "membership", message: "本週有 8 張尊榮會員票券即將到期", urgent: false },
  { type: "followup", message: "3 則官網預約詢問待回覆（復興館地址確認）", urgent: true },
];

const recentActivity = [
  { action: "新會員預約", detail: "活化能量艙 — 王小姐（北屯館）", time: "15 分鐘前" },
  { action: "預約已確認", detail: "專業撥筋 — 陳先生（復興館）", time: "32 分鐘前" },
  { action: "臨時取消", detail: "負離子活罐 — 林小姐（東區館）", time: "1 小時前" },
  { action: "已購買票券", detail: "尊榮會員票券 — 張小姐", time: "2 小時前" },
  { action: "療程完成", detail: "舒通筋脈 — 李小姐（台南健康館）", time: "3 小時前" },
];

export default function ManageDashboard() {
  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* Contextual Nudges */}
        <div className="space-y-2">
          <EngagementNudge
            type="pack_running_low"
            title="本週有 8 張尊榮會員票券即將到期"
            message="可寄送提醒，邀請會員在到期前預約活化能量艙或撥筋療程。"
            actionLabel="查看票券狀態"
            actionUrl="/manage/financials"
            context="潛在回訪收入 NT$ 48,000"
          />
          <EngagementNudge
            type="milestone_approaching"
            title="北屯館傍晚時段預約率上升"
            message="能量艙＋撥筋組合療程詢問增加，可考慮加開 19:00 時段。"
            actionLabel="查看服務排程"
            actionUrl="/manage/schedule"
          />
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">森浴光mm941 · 館主儀表板</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date().toLocaleDateString("zh-TW", { weekday: "long", month: "long", day: "numeric" })}
              {" · "}預約制 09:30–22:00
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/manage/students">
                <UserPlus className="h-4 w-4 mr-2" />
                新增會員
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/manage/schedule">
                <CalendarPlus className="h-4 w-4 mr-2" />
                新增排程
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Quick Actions - Touch-friendly grid */}
        <div className="grid grid-cols-4 gap-2 sm:hidden">
          <Link
            to="/manage/schedule"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-medium text-center">排程</span>
          </Link>
          <Link
            to="/manage/students"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent-sage/10 hover:bg-accent-sage/20 transition-colors"
          >
            <Users className="h-5 w-5 text-accent-sage" />
            <span className="text-[10px] font-medium text-center">會員</span>
          </Link>
          <Link
            to="/manage/financials"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent-gold/10 hover:bg-accent-gold/20 transition-colors"
          >
            <DollarSign className="h-5 w-5 text-accent-gold" />
            <span className="text-[10px] font-medium text-center">帳務</span>
          </Link>
          <Link
            to="/manage/teachers"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent-lilac/10 hover:bg-accent-lilac/20 transition-colors"
          >
            <UserCheck className="h-5 w-5 text-accent-lilac" />
            <span className="text-[10px] font-medium text-center">團隊</span>
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">今日療程</p>
                  <p className="text-2xl font-bold mt-1">{todayClasses.length}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {todayClasses.reduce((acc, c) => acc + (c.capacity - c.spotsLeft), 0)} 筆預約
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">活躍會員</p>
                  <p className="text-2xl font-bold mt-1">286</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-accent-sage/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent-sage" />
                </div>
              </div>
              <p className="text-xs text-accent-sage mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> 本週 +9 位
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">本月營收</p>
                  <p className="text-2xl font-bold mt-1">NT$ 582,400</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-accent-gold/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-accent-gold" />
                </div>
              </div>
              <p className="text-xs text-accent-sage mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> 較上月 +12%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">到店率</p>
                  <p className="text-2xl font-bold mt-1">91%</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">預約未到率 2%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">今日服務排程</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/manage/schedule" className="text-xs">
                      查看完整排程 <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {todayClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="text-center shrink-0 w-16">
                        <p className="text-sm font-semibold">{cls.time}</p>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{cls.name}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{cls.teacher}</span>
                          <span>·</span>
                          <span>{cls.branch}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {cls.checkedIn > 0 && (
                        <Badge variant="outline" className="text-xs bg-accent-sage/10 text-accent-sage border-accent-sage/30 hidden sm:flex">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {cls.checkedIn}
                        </Badge>
                      )}
                      {cls.spotsLeft === 0 ? (
                        <Badge className="text-xs bg-accent-coral/20 text-accent-coral">額滿</Badge>
                      ) : cls.spotsLeft <= 2 ? (
                        <Badge variant="outline" className="text-xs text-accent-gold border-accent-gold/30">
                          剩 {cls.spotsLeft} 位
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {cls.capacity - cls.spotsLeft}/{cls.capacity}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">近期動態</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-muted-foreground"> — {activity.detail}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Action Items */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-accent-gold" />
                  待處理事項
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-sm ${
                      alert.urgent
                        ? "border-destructive/30 bg-destructive/5"
                        : "border-border bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.urgent && (
                        <span className="h-2 w-2 rounded-full bg-destructive mt-1.5 shrink-0" />
                      )}
                      <p className="text-sm leading-snug">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">本週</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">完成療程數</span>
                  </div>
                  <span className="text-sm font-semibold">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">總預約數</span>
                  </div>
                  <span className="text-sm font-semibold">436</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">新會員</span>
                  </div>
                  <span className="text-sm font-semibold">9</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">營收</span>
                  </div>
                  <span className="text-sm font-semibold">NT$ 148,600</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ManageLayout>
  );
}
