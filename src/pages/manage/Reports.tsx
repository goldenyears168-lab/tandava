import { useState } from "react";
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
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  ArrowRight,
  Clock,
  UserCheck,
  UserMinus,
  CreditCard,
  Repeat,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReportsManage() {
  const { toast } = useToast();
  const [period, setPeriod] = useState("this_month");

  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">營運報表</h1>
            <p className="text-sm text-muted-foreground mt-1">森浴光mm941 營收、出席與團隊表現</p>
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
            <Button variant="outline" size="sm" onClick={() => toast({ title: "已匯出", description: "報表資料已匯出為 CSV。" })}>
              <Download className="h-4 w-4 mr-2" />
              匯出
            </Button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <DollarSign className="h-5 w-5 text-accent-gold" />
                <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8%
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-2">NT$582,400</p>
              <p className="text-xs text-muted-foreground">總營收</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <Repeat className="h-5 w-5 text-primary" />
                <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage">
                  <TrendingUp className="h-3 w-3 mr-1" /> +3%
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-2">NT$456,000</p>
              <p className="text-xs text-muted-foreground">定期收入</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <CreditCard className="h-5 w-5 text-accent-coral" />
                <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12%
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-2">NT$86,400</p>
              <p className="text-xs text-muted-foreground">票券銷售</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <Badge className="text-[10px] bg-destructive/10 text-destructive">
                  <TrendingDown className="h-3 w-3 mr-1" /> -2%
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-2">NT$40,000</p>
              <p className="text-xs text-muted-foreground">單次體驗</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Attendance Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">出席概況</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <Calendar className="h-5 w-5 text-primary mx-auto" />
                  <p className="text-2xl font-bold mt-2">142</p>
                  <p className="text-xs text-muted-foreground">服務時段</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <Users className="h-5 w-5 text-primary mx-auto" />
                  <p className="text-2xl font-bold mt-2">486</p>
                  <p className="text-xs text-muted-foreground">總預約數</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <UserCheck className="h-5 w-5 text-accent-sage mx-auto" />
                  <p className="text-2xl font-bold mt-2">87%</p>
                  <p className="text-xs text-muted-foreground">報到率</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <UserMinus className="h-5 w-5 text-destructive mx-auto" />
                  <p className="text-2xl font-bold mt-2">3.2%</p>
                  <p className="text-xs text-muted-foreground">未到率</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">熱門療程（依預約數）</p>
                <div className="space-y-2">
                  {[
                    { name: "活化能量艙", teacher: "林美容師", avg: 3, capacity: 4 },
                    { name: "專業撥筋", teacher: "陳美容師", avg: 4, capacity: 4 },
                    { name: "能量艙＋撥筋", teacher: "林美容師", avg: 3, capacity: 3 },
                    { name: "溫感能量光療", teacher: "王美容師", avg: 2, capacity: 3 },
                    { name: "負離子活罐", teacher: "張美容師", avg: 3, capacity: 4 },
                  ].map((cls, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/30">
                      <div>
                        <p className="text-sm font-medium">{cls.name}</p>
                        <p className="text-xs text-muted-foreground">{cls.teacher}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{cls.avg}/{cls.capacity}</p>
                        <p className="text-xs text-muted-foreground">{Math.round((cls.avg / cls.capacity) * 100)}% 滿位</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teacher Performance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">美容師表現</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "林美容師", classes: 48, revenue: 216000, avgAttendees: 3.8, rating: 4.9 },
                  { name: "陳美容師", classes: 42, revenue: 159600, avgAttendees: 4.5, rating: 4.8 },
                  { name: "王美容師", classes: 36, revenue: 144000, avgAttendees: 4.2, rating: 4.8 },
                  { name: "張美容師", classes: 30, revenue: 108000, avgAttendees: 4.0, rating: 4.7 },
                ].map((teacher, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">{teacher.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {teacher.rating} 分
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-sm font-bold">{teacher.classes}</p>
                        <p className="text-[10px] text-muted-foreground">服務次數</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold">NT${teacher.revenue.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">營收</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{teacher.avgAttendees}</p>
                        <p className="text-[10px] text-muted-foreground">平均人次</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Membership Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">會員方案分布</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: "尊榮會員票券", count: 89, revenue: 405840, trend: "+5" },
                { type: "每月 8 次療程", count: 34, revenue: 43520, trend: "+2" },
                { type: "每月 4 次療程", count: 28, revenue: 24640, trend: "-1" },
                { type: "次數票券", count: 156, revenue: 86400, trend: "+18" },
              ].map((membership, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">{membership.type}</p>
                    <p className="text-xs text-muted-foreground">{membership.count} 位有效</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">NT${membership.revenue.toLocaleString()}</p>
                    <p className={`text-xs ${membership.trend.startsWith('+') ? 'text-accent-sage' : 'text-destructive'}`}>
                      {membership.trend} 本月
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payroll Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">美容師薪資摘要</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  查看明細 <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-secondary/50 text-center mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">本月薪資總額</p>
                <p className="text-3xl font-bold mt-1">NT$628,800</p>
                <p className="text-xs text-muted-foreground mt-1">156 次服務 · 5 位美容師</p>
              </div>

              {[
                { name: "林美容師", hours: 48, amount: 216000, type: "NT$4,500/次" },
                { name: "陳美容師", hours: 42, amount: 159600, type: "NT$3,800/次" },
                { name: "王美容師", hours: 36, amount: 144000, type: "NT$4,000/次" },
                { name: "張美容師", hours: 30, amount: 108000, type: "NT$3,600/次" },
              ].map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">{entry.hours} 次 — {entry.type}</p>
                  </div>
                  <p className="text-sm font-semibold">NT${entry.amount.toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ManageLayout>
  );
}
