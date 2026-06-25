import { useState } from "react";
import { StaffLayout } from "@/components/layout/StaffLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Search, CheckCircle2, Clock, Users } from "lucide-react";
import { staffTodaySessions } from "@/data/demo/spa-ui-mocks";

const todaysClasses = staffTodaySessions.map((s, i) => ({
  id: s.id,
  name: s.name,
  time: s.time,
  teacher: s.teacher,
  capacity: s.capacity,
  checkedIn: s.checkedIn,
  status: (i === 0 ? "in_progress" : "upcoming") as const,
}));

const waitingMembers = [
  { id: "m1", name: "王小美", membership: "尊榮無限方案", classId: "1" },
  { id: "m2", name: "陳先生", membership: "10 次套票（剩 6 次）", classId: "1" },
  { id: "m3", name: "林雅文", membership: "尊榮無限方案", classId: "1" },
  { id: "m4", name: "張小姐", membership: "單次體驗", classId: "1" },
];

export default function StaffCheckin() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedInIds, setCheckedInIds] = useState<Set<string>>(new Set());
  const [selectedClass, setSelectedClass] = useState(todaysClasses[0]);

  const filteredMembers = waitingMembers.filter(
    (m) => m.classId === selectedClass.id && (
      !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCheckIn = (memberId: string, memberName: string) => {
    setCheckedInIds((prev) => new Set(prev).add(memberId));
    toast({ title: "已報到", description: `${memberName} 已完成報到。` });
  };

  return (
    <StaffLayout>
      <SEOHead title="報到" noindex />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">課程報到</h1>
          <p className="text-muted-foreground">搜尋學員姓名或掃描條碼完成報到。</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="依姓名或電子郵件搜尋..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Today's classes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              今日課程
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {todaysClasses.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    selectedClass.id === cls.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{cls.name}</span>
                    {cls.status === "in_progress" && (
                      <Badge variant="default" className="text-xs">進行中</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{cls.time} • {cls.teacher}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {cls.checkedIn + (selectedClass.id === cls.id ? checkedInIds.size : 0)}/{cls.capacity}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Roster */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {selectedClass.name} — {selectedClass.time}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredMembers.map((member) => {
                const isCheckedIn = checkedInIds.has(member.id);
                return (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-xl border">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs bg-primary/10">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.membership}</p>
                      </div>
                    </div>
                    {isCheckedIn ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        已報到
                      </Badge>
                    ) : (
                      <Button size="sm" onClick={() => handleCheckIn(member.id, member.name)}>
                        報到
                      </Button>
                    )}
                  </div>
                );
              })}
              {filteredMembers.length === 0 && (
                <p className="text-center py-6 text-muted-foreground text-sm">
                  {searchQuery ? "找不到符合搜尋條件的學員。" : "此課程尚無預約學員。"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  );
}
