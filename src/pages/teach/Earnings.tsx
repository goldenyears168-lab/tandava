import { useState } from "react";
import { TeachLayout } from "@/components/teach/TeachLayout";
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
  Download,
  Calendar,
  TrendingUp,
  Heart,
  Repeat2,
  Users,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EarningsEntry {
  id: string;
  className: string;
  date: string;
  time: string;
  type: "regular" | "sub";
  basePay: number;
  tips: number;
  attendance: number;
  capacity: number;
}

interface PayPeriod {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  totalEarnings: number;
  basePay: number;
  tips: number;
  subs: number;
  classCount: number;
  status: "current" | "past" | "paid";
}

const mockPayPeriods: PayPeriod[] = [
  {
    id: "current",
    label: "本期",
    startDate: "2026年1月16日",
    endDate: "2026年1月31日",
    totalEarnings: 1850,
    basePay: 1650,
    tips: 145,
    subs: 55,
    classCount: 22,
    status: "current",
  },
  {
    id: "jan1-15",
    label: "2026年1月1日 - 1月15日",
    startDate: "2026年1月1日",
    endDate: "2026年1月15日",
    totalEarnings: 1720,
    basePay: 1500,
    tips: 120,
    subs: 100,
    classCount: 20,
    status: "paid",
  },
  {
    id: "dec16-31",
    label: "2025年12月16日 - 12月31日",
    startDate: "2025年12月16日",
    endDate: "2025年12月31日",
    totalEarnings: 1580,
    basePay: 1350,
    tips: 155,
    subs: 75,
    classCount: 18,
    status: "paid",
  },
];

const mockEarnings: EarningsEntry[] = [
  {
    id: "1",
    className: "Morning Vinyasa",
    date: "Jan 27",
    time: "7:00 AM",
    type: "regular",
    basePay: 75,
    tips: 15,
    attendance: 22,
    capacity: 25,
  },
  {
    id: "2",
    className: "Evening Vinyasa",
    date: "Jan 27",
    time: "6:00 PM",
    type: "regular",
    basePay: 75,
    tips: 10,
    attendance: 18,
    capacity: 25,
  },
  {
    id: "3",
    className: "Power Yoga",
    date: "Jan 26",
    time: "12:00 PM",
    type: "sub",
    basePay: 55,
    tips: 5,
    attendance: 28,
    capacity: 30,
  },
  {
    id: "4",
    className: "Morning Vinyasa",
    date: "Jan 25",
    time: "7:00 AM",
    type: "regular",
    basePay: 75,
    tips: 20,
    attendance: 24,
    capacity: 25,
  },
  {
    id: "5",
    className: "Community Flow",
    date: "Jan 25",
    time: "11:00 AM",
    type: "regular",
    basePay: 75,
    tips: 25,
    attendance: 23,
    capacity: 25,
  },
  {
    id: "6",
    className: "Evening Vinyasa",
    date: "Jan 24",
    time: "6:00 PM",
    type: "regular",
    basePay: 75,
    tips: 0,
    attendance: 16,
    capacity: 25,
  },
  {
    id: "7",
    className: "Morning Vinyasa",
    date: "Jan 22",
    time: "7:00 AM",
    type: "regular",
    basePay: 75,
    tips: 10,
    attendance: 20,
    capacity: 25,
  },
  {
    id: "8",
    className: "Evening Vinyasa",
    date: "Jan 22",
    time: "6:00 PM",
    type: "regular",
    basePay: 75,
    tips: 15,
    attendance: 19,
    capacity: 25,
  },
  {
    id: "9",
    className: "Morning Vinyasa",
    date: "Jan 20",
    time: "7:00 AM",
    type: "regular",
    basePay: 75,
    tips: 5,
    attendance: 21,
    capacity: 25,
  },
  {
    id: "10",
    className: "Evening Vinyasa",
    date: "Jan 20",
    time: "6:00 PM",
    type: "regular",
    basePay: 75,
    tips: 20,
    attendance: 17,
    capacity: 25,
  },
];

export default function TeachEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const { toast } = useToast();

  const currentPeriod =
    mockPayPeriods.find((p) => p.id === selectedPeriod) || mockPayPeriods[0];

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = ["日期", "時間", "課程", "類型", "基本薪資", "小費", "合計", "出席"];
    const rows = mockEarnings.map((e) => [
      e.date,
      e.time,
      e.className,
      e.type === "sub" ? "代課" : "固定",
      `$${e.basePay}`,
      `$${e.tips}`,
      `$${e.basePay + e.tips}`,
      `${e.attendance}/${e.capacity}`,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `earnings-${currentPeriod.id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "匯出完成",
      description: "收入報表已下載。",
    });
  };

  const getStatusBadge = (status: PayPeriod["status"]) => {
    switch (status) {
      case "current":
        return (
          <Badge className="text-[10px] bg-accent-gold/20 text-accent-gold border-0">
            進行中
          </Badge>
        );
      case "paid":
        return (
          <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage border-0">
            已付款
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px]">
            待處理
          </Badge>
        );
    }
  };

  return (
    <TeachLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">收入</h1>
            <p className="text-sm text-muted-foreground mt-1">
              追蹤授課收入與小費
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            匯出 CSV
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="選擇期間" />
            </SelectTrigger>
            <SelectContent>
              {mockPayPeriods.map((period) => (
                <SelectItem key={period.id} value={period.id}>
                  <div className="flex items-center gap-2">
                    <span>{period.label}</span>
                    {period.status === "current" && (
                      <span className="text-[10px] text-accent-gold">
                        （本期）
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Period Summary */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{currentPeriod.label}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentPeriod.startDate} - {currentPeriod.endDate}
                </p>
              </div>
              {getStatusBadge(currentPeriod.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Total Earnings */}
              <div className="col-span-2 lg:col-span-1 p-4 rounded-xl bg-accent-sage/10 border border-accent-sage/20">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent-sage" />
                  <span className="text-sm font-medium text-muted-foreground">
                    合計
                  </span>
                </div>
                <p className="text-3xl font-bold mt-2 text-accent-sage">
                  ${currentPeriod.totalEarnings.toLocaleString()}
                </p>
              </div>

              {/* Base Pay */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    基本薪資
                  </span>
                </div>
                <p className="text-xl font-bold mt-1">
                  ${currentPeriod.basePay.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentPeriod.classCount -
                    Math.round(currentPeriod.subs / 55)}{" "}
                  堂課
                </p>
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-accent-coral" />
                  <span className="text-xs font-medium text-muted-foreground">
                    小費
                  </span>
                </div>
                <p className="text-xl font-bold mt-1">
                  ${currentPeriod.tips.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  平均每堂 ${Math.round(currentPeriod.tips / currentPeriod.classCount)}
                </p>
              </div>

              {/* Subs */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Repeat2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    代課收入
                  </span>
                </div>
                <p className="text-xl font-bold mt-1">
                  ${currentPeriod.subs.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round(currentPeriod.subs / 55)} 堂
                </p>
              </div>

              {/* Classes Taught */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    課程數
                  </span>
                </div>
                <p className="text-xl font-bold mt-1">
                  {currentPeriod.classCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  平均每堂 ${Math.round(
                    currentPeriod.totalEarnings / currentPeriod.classCount
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Classes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">課程明細</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-[1fr,100px,80px,80px,80px,100px] gap-4 px-4 py-3 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>課程</span>
              <span>日期/時間</span>
              <span>類型</span>
              <span>基本薪資</span>
              <span>小費</span>
              <span className="text-right">出席</span>
            </div>

            {/* Class Rows */}
            {mockEarnings.map((entry) => (
              <div
                key={entry.id}
                className="grid md:grid-cols-[1fr,100px,80px,80px,80px,100px] gap-4 px-4 py-3 border-b border-border last:border-0 items-center"
              >
                {/* Class Name */}
                <div>
                  <p className="text-sm font-medium">{entry.className}</p>
                  <p className="text-xs text-muted-foreground md:hidden">
                    {entry.date} {entry.time}
                  </p>
                </div>

                {/* Date/Time - Desktop */}
                <div className="hidden md:block">
                  <p className="text-sm">{entry.date}</p>
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                </div>

                {/* Type */}
                <div>
                  {entry.type === "sub" ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-primary/50 text-primary"
                    >
                      代課
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">
                      固定
                    </Badge>
                  )}
                </div>

                {/* Base Pay */}
                <div className="text-sm font-medium">${entry.basePay}</div>

                {/* Tips */}
                <div
                  className={`text-sm ${
                    entry.tips > 0 ? "text-accent-coral font-medium" : "text-muted-foreground"
                  }`}
                >
                  {entry.tips > 0 ? `+$${entry.tips}` : "$0"}
                </div>

                {/* Attendance */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>
                      {entry.attendance}/{entry.capacity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((entry.attendance / entry.capacity) * 100)}% 滿額
                  </p>
                </div>

                {/* Mobile Total */}
                <div className="md:hidden col-span-full flex items-center justify-between pt-2 border-t border-border mt-2">
                  <span className="text-xs text-muted-foreground">合計</span>
                  <span className="text-sm font-semibold">
                    ${entry.basePay + entry.tips}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Earnings Trend */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent-sage" />
              <CardTitle className="text-lg">收入趨勢</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPayPeriods.map((period) => (
                <div
                  key={period.id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    period.id === selectedPeriod
                      ? "bg-accent-sage/10 border border-accent-sage/20"
                      : "bg-secondary/30 hover:bg-secondary/50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{period.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {period.classCount} 堂課
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ${period.totalEarnings.toLocaleString()}
                    </p>
                    {getStatusBadge(period.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeachLayout>
  );
}
