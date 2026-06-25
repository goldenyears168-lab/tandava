import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "@/components/stats/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Calendar,
  Clock,
  Flame,
  Trophy,
  Users,
  UserPlus,
  Search,
  Share2,
  ChevronRight,
  Sun,
  Moon,
  Sunrise,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MilestoneCelebration, EngagementNudge } from "@/components/EngagementNudge";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// Mock stats data
const stats = {
  week: {
    classes: 4,
    workshops: 1,
    minutes: 315,
    streak: 8,
    longestStreak: 21,
    topStyles: ["Vinyasa", "Yin", "Power"],
    topTeachers: ["Maya Johnson", "David Park", "Sarah Lee"],
    peakTime: "早上",
  },
  month: {
    classes: 12,
    workshops: 2,
    minutes: 945,
    streak: 8,
    longestStreak: 21,
    topStyles: ["Vinyasa", "Yin", "Hatha"],
    topTeachers: ["Maya Johnson", "David Park", "Emma Thompson"],
    peakTime: "早上",
  },
  year: {
    classes: 156,
    workshops: 8,
    minutes: 11700,
    streak: 8,
    longestStreak: 21,
    topStyles: ["Vinyasa", "Yin", "Power"],
    topTeachers: ["Maya Johnson", "David Park", "Alex Rivera"],
    peakTime: "晚上",
  },
  allTime: {
    classes: 312,
    workshops: 15,
    minutes: 23400,
    streak: 8,
    longestStreak: 21,
    topStyles: ["Vinyasa", "Yin", "Power"],
    topTeachers: ["Maya Johnson", "David Park", "Sarah Lee"],
    peakTime: "晚上",
  },
};

const friends = [
  { id: "1", name: "Emma T.", avatar: "", classesThisMonth: 18, status: "ACCEPTED" },
  { id: "2", name: "Alex R.", avatar: "", classesThisMonth: 14, status: "ACCEPTED" },
  { id: "3", name: "Jordan M.", avatar: "", classesThisMonth: 9, status: "ACCEPTED" },
  { id: "4", name: "Taylor S.", avatar: "", classesThisMonth: 22, status: "ACCEPTED" },
];

const leaderboard = [
  { rank: 1, name: "Taylor S.", avatar: "", classes: 22, minutes: 1650 },
  { rank: 2, name: "Chris K.", avatar: "", classes: 20, minutes: 1500 },
  { rank: 3, name: "Emma T.", avatar: "", classes: 18, minutes: 1350 },
  { rank: 4, name: "您", avatar: "", classes: 12, minutes: 945, isCurrentUser: true },
  { rank: 5, name: "Alex R.", avatar: "", classes: 14, minutes: 1050 },
  { rank: 6, name: "Jordan M.", avatar: "", classes: 9, minutes: 675 },
  { rank: 7, name: "Sam P.", avatar: "", classes: 8, minutes: 600 },
  { rank: 8, name: "Riley B.", avatar: "", classes: 7, minutes: 525 },
];

const timeOfDayIcon = {
  早上: Sunrise,
  下午: Sun,
  晚上: Moon,
};

const Community = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState<"week" | "month" | "year" | "allTime">("month");
  const [searchQuery, setSearchQuery] = useState("");

  const currentStats = stats[period];
  const TimeIcon = timeOfDayIcon[currentStats.peakTime as keyof typeof timeOfDayIcon] || Sun;

  const formatMinutes = (mins: number) => {
    if (mins >= 60) {
      const hours = Math.floor(mins / 60);
      const remaining = mins % 60;
      return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">社群</h1>
          <p className="text-muted-foreground mt-1">
            追蹤練習進度、與朋友互動、查看排名
          </p>
        </div>

        {/* Milestone celebration — shown when user hits a milestone */}
        <MilestoneCelebration
          milestoneName="300 堂課！"
          icon="🧘"
          message="您已參加超過 300 堂課，展現了對練習的堅持。"
          reward="解鎖您的年度回顧"
        />

        {/* Tabs */}
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:inline-grid">
            <TabsTrigger value="stats" className="px-6">統計</TabsTrigger>
            <TabsTrigger value="friends" className="px-6">朋友</TabsTrigger>
            <TabsTrigger value="leaderboard" className="px-6">排行榜</TabsTrigger>
          </TabsList>

          {/* Stats Tab */}
          <TabsContent value="stats" className="mt-6 space-y-6">
            {/* Period selector */}
            <div className="flex items-center justify-between">
              <Select value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">本週</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="year">今年</SelectItem>
                  <SelectItem value="allTime">全部</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={() => toast({ title: "年度回顧", description: "正在產生您的練習年度回顧..." })}>
                <Share2 className="h-4 w-4 mr-2" />
                查看我的年度回顧
              </Button>
            </div>

            {/* Main stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="課程"
                value={currentStats.classes}
                icon={Calendar}
                variant="primary"
              />
              <StatCard
                label="工作坊"
                value={currentStats.workshops}
                icon={Activity}
              />
              <StatCard
                label="練習時間"
                value={formatMinutes(currentStats.minutes)}
                icon={Clock}
              />
              <StatCard
                label="連續天數"
                value={currentStats.streak}
                icon={Flame}
                trend={{ value: 0, label: `最佳：${currentStats.longestStreak}` }}
              />
            </div>

            {/* Breakdown cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Top Styles */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    熱門風格
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentStats.topStyles.map((style, i) => (
                    <div key={style} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                          i === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          {i + 1}
                        </span>
                        <span className="font-medium">{style}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Teachers */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    熱門老師
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentStats.topTeachers.map((teacher, i) => (
                    <div key={teacher} className="flex items-center gap-3">
                      <span className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                        i === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        {i + 1}
                      </span>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                          {teacher.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{teacher}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Peak Time */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TimeIcon className="h-4 w-4 text-primary" />
                    最常練習時段
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent mb-3">
                      <TimeIcon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <p className="text-2xl font-bold">{currentStats.peakTime}</p>
                    <p className="text-sm text-muted-foreground">最常練習時段</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends" className="mt-6 space-y-6">
            {/* Search and add */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="以姓名或電子郵件搜尋..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => toast({ title: "邀請已送出", description: "好友邀請已送出！對方接受後將顯示於此。" })}>
                <UserPlus className="h-4 w-4 mr-2" />
                新增朋友
              </Button>
            </div>

            {/* Friends list */}
            <div className="space-y-3">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-4 rounded-xl border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        {friend.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {friend.classesThisMonth} 堂課（本月）
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toast({ title: friend.name, description: `正在查看 ${friend.name} 的個人頁面。` })}>
                    查看個人頁面
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                依過去 30 天參加課程數排名
              </p>
              <Badge variant="secondary">過去 30 天</Badge>
            </div>

            {/* Leaderboard list */}
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border",
                    entry.isCurrentUser
                      ? "bg-accent border-primary/20"
                      : "bg-card"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      entry.rank === 1 && "bg-yellow-500 text-yellow-950",
                      entry.rank === 2 && "bg-gray-300 text-gray-800",
                      entry.rank === 3 && "bg-amber-600 text-amber-950",
                      entry.rank > 3 && "bg-muted text-muted-foreground"
                    )}>
                      {entry.rank <= 3 ? (
                        <Trophy className="h-4 w-4" />
                      ) : (
                        entry.rank
                      )}
                    </div>

                    {/* User */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback className={cn(
                        entry.isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      )}>
                        {entry.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={cn("font-medium", entry.isCurrentUser && "text-primary")}>
                        {entry.name}
                        {entry.isCurrentUser && (
                          <Badge variant="default" className="ml-2 text-xs">您</Badge>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="font-semibold">{entry.classes}</p>
                      <p className="text-muted-foreground text-xs">堂課</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatMinutes(entry.minutes)}</p>
                      <p className="text-muted-foreground text-xs">練習</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contextual nudge — friend activity */}
        <EngagementNudge
          type="friend_activity"
          title="朋友們正在練習"
          message="本週有 3 位朋友參加了課程，一起上墊吧！"
          actionLabel="瀏覽課程"
          actionUrl="/schedule"
          className="mt-6"
        />

        {/* Newsletter — community context */}
        <NewsletterSignup
          variant="inline"
          source="community_page"
          heading="取得社群最新消息"
          subheading="活動、挑戰與工作室最新動態。"
          className="mt-6"
        />
      </div>
    </AppLayout>
  );
};

export default Community;