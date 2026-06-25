import { useState } from "react";
import { TeachLayout } from "@/components/teach/TeachLayout";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  DollarSign,
  Repeat2,
  Clock,
  ArrowRight,
  Users,
  Heart,
  ChevronRight,
  ClipboardCheck,
  Video,
  Wifi,
  Search,
  UserCheck,
} from "lucide-react";
import type { DeliveryMode } from "@/types/database";
import { Link } from "react-router-dom";
import { teachUpcomingSessions, teachMockMembers } from "@/data/demo/spa-ui-mocks";

// Mock data for instructor dashboard
interface UpcomingClass {
  id: string;
  name: string;
  date: string;
  time: string;
  room: string;
  booked: number;
  capacity: number;
  isToday: boolean;
  deliveryMode?: DeliveryMode;
  isStartingSoon?: boolean;
  checkedIn?: number;
}

interface BookedStudent {
  id: string;
  name: string;
  avatar?: string;
  membershipType: string;
  checkedIn: boolean;
}

const upcomingClasses: UpcomingClass[] = teachUpcomingSessions;

// Mock members for check-in
const mockStudents = teachMockMembers;

const pendingSubRequests = [
  {
    id: "1",
    className: "活化能量艙",
    date: "2/12",
    time: "09:30",
    status: "pending",
    requestedAt: "2 天前",
  },
];

const openSubOpportunities = [
  {
    id: "1",
    className: "專業撥筋",
    teacher: "陳雅婷",
    date: "2/10",
    time: "09:30",
    pay: 750,
  },
  {
    id: "2",
    className: "溫感能量光療",
    teacher: "王美玲",
    date: "2/14",
    time: "16:30",
    pay: 650,
  },
];

const earningsSummary = {
  total: 1850,
  basePay: 1650,
  tips: 145,
  subs: 55,
  classesThisPeriod: 22,
  periodStart: "Jan 16",
  periodEnd: "Jan 31",
};

// Studio setting: tips enabled (in production this would come from studio settings)
const TIPS_ENABLED = false;

export default function TeachDashboard() {
  const { toast } = useToast();
  const [checkInClassId, setCheckInClassId] = useState<string | null>(null);
  const [students, setStudents] = useState<Record<string, BookedStudent[]>>(mockStudents);
  const [searchQuery, setSearchQuery] = useState("");

  const checkInClass = upcomingClasses.find((c) => c.id === checkInClassId);
  const classStudents = checkInClassId ? (students[checkInClassId] ?? []) : [];
  const filteredStudents = classStudents.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const checkedInCount = classStudents.filter((s) => s.checkedIn).length;

  const toggleStudentCheckIn = (studentId: string) => {
    if (!checkInClassId) return;
    setStudents((prev) => ({
      ...prev,
      [checkInClassId]: (prev[checkInClassId] ?? []).map((s) =>
        s.id === studentId ? { ...s, checkedIn: !s.checkedIn } : s
      ),
    }));
  };

  const checkInAll = () => {
    if (!checkInClassId) return;
    setStudents((prev) => ({
      ...prev,
      [checkInClassId]: (prev[checkInClassId] ?? []).map((s) => ({ ...s, checkedIn: true })),
    }));
    toast({ title: "全部學員已報到" });
  };

  return (
    <TeachLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">儀表板</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date().toLocaleDateString("zh-TW", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Today's Classes - Prominent on mobile for check-in */}
        {upcomingClasses.filter(c => c.isToday).length > 0 && (
          <Card className="border-accent-sage/30 bg-accent-sage/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-accent-sage" />
                今日課程
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingClasses.filter(c => c.isToday).map((cls) => {
                const clsStudents = students[cls.id] ?? [];
                const clsCheckedIn = clsStudents.filter((s) => s.checkedIn).length;
                return (
                  <div
                    key={cls.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      cls.isStartingSoon
                        ? 'bg-accent-sage/10 border-accent-sage/30 shadow-sm'
                        : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{cls.time}</span>
                        {cls.isStartingSoon && (
                          <Badge className="bg-accent-sage text-white text-[10px] animate-pulse">
                            即將開始
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{clsCheckedIn}/{cls.booked} 已報到</span>
                      </div>
                    </div>
                    <p className="font-medium">{cls.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{cls.room}</span>
                      {cls.deliveryMode === 'hybrid' && (
                        <span className="flex items-center gap-1 text-violet-400">
                          <Wifi className="h-3 w-3" /> + 線上
                        </span>
                      )}
                      {cls.deliveryMode === 'virtual' && (
                        <span className="flex items-center gap-1 text-blue-400">
                          <Video className="h-3 w-3" /> 線上諮詢
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setCheckInClassId(cls.id);
                          setSearchQuery("");
                        }}
                      >
                        <ClipboardCheck className="h-4 w-4 mr-2" />
                        學員報到 ({clsCheckedIn}/{cls.booked})
                      </Button>
                      {(cls.deliveryMode === 'virtual' || cls.deliveryMode === 'hybrid') && (
                        <Button size="sm" variant="outline" onClick={() => toast({ title: "正在啟動直播", description: "線上課程直播正在準備中..." })}>
                          <Video className="h-4 w-4 mr-2" />
                          開始直播
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Check-in Dialog */}
        <Dialog open={!!checkInClassId} onOpenChange={(open) => { if (!open) setCheckInClassId(null); }}>
          <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-accent-sage" />
                報到：{checkInClass?.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {checkInClass?.time} · {checkInClass?.room} · {checkedInCount}/{classStudents.length} 已報到
              </p>
            </DialogHeader>

            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋學員..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Button variant="outline" size="sm" onClick={checkInAll}>
                <UserCheck className="h-4 w-4 mr-1" />
                全部
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 space-y-1 min-h-0">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => toggleStudentCheckIn(student.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left ${
                    student.checkedIn
                      ? "bg-accent-sage/10 border border-accent-sage/20"
                      : "bg-secondary/30 hover:bg-secondary/60 border border-transparent"
                  }`}
                >
                  <Checkbox
                    checked={student.checkedIn}
                    className="pointer-events-none"
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-[10px] font-medium">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <p className="text-[10px] text-muted-foreground">{student.membershipType}</p>
                  </div>
                  {student.checkedIn && (
                    <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage border-0 shrink-0">
                      已報到
                    </Badge>
                  )}
                </button>
              ))}
              {filteredStudents.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  找不到符合搜尋條件的學員。
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Quick Actions - Desktop */}
        <div className="hidden sm:flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/teach/schedule">
              <Calendar className="h-4 w-4 mr-2" />
              查看課程表
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teach/subs">
              <Repeat2 className="h-4 w-4 mr-2" />
              申請代課
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teach/earnings">
              <DollarSign className="h-4 w-4 mr-2" />
              查看收入
            </Link>
          </Button>
        </div>

        {/* Mobile Quick Actions */}
        <div className="grid grid-cols-3 gap-2 sm:hidden">
          <Link
            to="/teach/schedule"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-medium">課程表</span>
          </Link>
          <Link
            to="/teach/subs"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent-gold/10 hover:bg-accent-gold/20 transition-colors"
          >
            <Repeat2 className="h-5 w-5 text-accent-gold" />
            <span className="text-[10px] font-medium">排班</span>
          </Link>
          <Link
            to="/teach/earnings"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-accent-sage/10 hover:bg-accent-sage/20 transition-colors"
          >
            <DollarSign className="h-5 w-5 text-accent-sage" />
            <span className="text-[10px] font-medium">收入</span>
          </Link>
        </div>

        {/* Key Metrics */}
        <div className={`grid grid-cols-2 ${TIPS_ENABLED ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    本週課程
                  </p>
                  <p className="text-2xl font-bold mt-1">5</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {upcomingClasses.filter((c) => c.isToday).length} 堂今日
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    本期收入
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    ${earningsSummary.total.toLocaleString()}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-accent-sage/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-accent-sage" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {earningsSummary.classesThisPeriod} 堂課
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    代課機會
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {openSubOpportunities.length}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-accent-gold/20 flex items-center justify-center">
                  <Repeat2 className="h-5 w-5 text-accent-gold" />
                </div>
              </div>
              <p className="text-xs text-accent-gold mt-2">可認領</p>
            </CardContent>
          </Card>

          {TIPS_ENABLED && (
            <Card>
              <CardContent className="pt-5 pb-4 px-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      本期小費
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      ${earningsSummary.tips}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-accent-coral/20 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-accent-coral" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  收到 3 筆小費
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">即將開課</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/teach/schedule" className="text-xs">
                      查看完整課程表 <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                      cls.isToday
                        ? "bg-accent-sage/10 border border-accent-sage/20"
                        : "bg-secondary/50 hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="text-center shrink-0 w-20">
                        <p className="text-xs text-muted-foreground">{cls.date}</p>
                        <p className="text-sm font-semibold">{cls.time}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{cls.name}</p>
                        <p className="text-xs text-muted-foreground">{cls.room}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>
                          {cls.booked}/{cls.capacity}
                        </span>
                      </div>
                      {cls.isToday && (
                        <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage border-0">
                          今天
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Tips - only show if tips enabled */}
            {TIPS_ENABLED && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-4 w-4 text-accent-coral" />
                    近期小費
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { id: "1", from: "匿名", amount: 20, className: "Morning Vinyasa", date: "今天" },
                    { id: "2", from: "Emma W.", amount: 15, className: "Evening Vinyasa", date: "昨天" },
                    { id: "3", from: "Alex R.", amount: 10, className: "Community Flow", date: "Jan 28" },
                  ].map((tip) => (
                    <div
                      key={tip.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                    >
                      <div>
                        <p className="text-sm font-medium">{tip.from}</p>
                        <p className="text-xs text-muted-foreground">
                          {tip.className} - {tip.date}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-accent-sage">
                        +${tip.amount}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Pending Sub Requests */}
            {pendingSubRequests.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent-gold" />
                    待處理代課申請
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {pendingSubRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-xl border border-accent-gold/30 bg-accent-gold/5"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{req.className}</p>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-accent-gold/50 text-accent-gold"
                        >
                          待處理
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {req.date} {req.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        申請於 {req.requestedAt}
                      </p>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    asChild
                  >
                    <Link to="/teach/subs">
                      管理申請 <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Open Sub Opportunities */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Repeat2 className="h-4 w-4 text-primary" />
                  代課機會
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {openSubOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{opp.className}</p>
                      <span className="text-xs font-semibold text-accent-sage">
                        ${opp.pay}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      代 {opp.teacher} 的課
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {opp.date} {opp.time}
                    </p>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  asChild
                >
                  <Link to="/teach/subs">
                    查看全部 <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">本期</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {earningsSummary.periodStart} - {earningsSummary.periodEnd}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">基本薪資</span>
                  <span className="text-sm font-medium">
                    ${earningsSummary.basePay.toLocaleString()}
                  </span>
                </div>
                {TIPS_ENABLED && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">小費</span>
                    <span className="text-sm font-medium">
                      ${earningsSummary.tips}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">代課收入</span>
                  <span className="text-sm font-medium">
                    ${earningsSummary.subs}
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">合計</span>
                    <span className="text-lg font-bold">
                      ${(TIPS_ENABLED ? earningsSummary.total : earningsSummary.total - earningsSummary.tips).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  asChild
                >
                  <Link to="/teach/earnings">
                    查看詳情 <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeachLayout>
  );
}
