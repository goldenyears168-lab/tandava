import { useState } from "react";
import { ManageLayout } from "@/components/manage/ManageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Tag,
  MoreHorizontal,
  Filter,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: string | null;
  membershipStatus: "active" | "expired" | "none";
  classPackRemaining: number | null;
  totalClasses: number;
  lastVisit: string;
  lifetimeRevenue: number;
  tags: string[];
  joinedAt: string;
}

const mockStudents: Student[] = [
  { id: "1", firstName: "王", lastName: "小姐", email: "wang@example.com", phone: "0912 345 678", membershipType: "尊榮會員票券", membershipStatus: "active", classPackRemaining: null, totalClasses: 28, lastVisit: "今天", lifetimeRevenue: 45600, tags: ["VIP", "汐止館"], joinedAt: "2023-03-15" },
  { id: "2", firstName: "陳", lastName: "先生", email: "chen@example.com", phone: "0922 111 222", membershipType: null, membershipStatus: "none", classPackRemaining: 5, totalClasses: 12, lastVisit: "昨天", lifetimeRevenue: 12800, tags: [], joinedAt: "2024-01-20" },
  { id: "3", firstName: "林", lastName: "小姐", email: "lin@example.com", phone: "0933 444 555", membershipType: "尊榮會員票券", membershipStatus: "active", classPackRemaining: null, totalClasses: 19, lastVisit: "2 天前", lifetimeRevenue: 32400, tags: ["復興館"], joinedAt: "2023-08-10" },
  { id: "4", firstName: "張", lastName: "先生", email: "zhang@example.com", phone: "0910 666 777", membershipType: "單次體驗", membershipStatus: "active", classPackRemaining: null, totalClasses: 8, lastVisit: "3 天前", lifetimeRevenue: 9600, tags: [], joinedAt: "2023-11-05" },
  { id: "5", firstName: "李", lastName: "小姐", email: "li@example.com", phone: "0988 999 000", membershipType: null, membershipStatus: "none", classPackRemaining: 2, totalClasses: 6, lastVisit: "1 週前", lifetimeRevenue: 4800, tags: ["新會員"], joinedAt: "2024-10-01" },
  { id: "6", firstName: "黃", lastName: "小姐", email: "huang@example.com", phone: "0955 123 456", membershipType: "尊榮會員票券", membershipStatus: "expired", classPackRemaining: null, totalClasses: 35, lastVisit: "3 週前", lifetimeRevenue: 58200, tags: ["流失風險"], joinedAt: "2022-06-12" },
  { id: "7", firstName: "吳", lastName: "先生", email: "wu@example.com", phone: "0966 789 012", membershipType: null, membershipStatus: "none", classPackRemaining: null, totalClasses: 2, lastVisit: "2 個月前", lifetimeRevenue: 2400, tags: ["體驗優惠"], joinedAt: "2024-09-15" },
  { id: "8", firstName: "周", lastName: "小姐", email: "zhou@example.com", phone: "0977 345 678", membershipType: "尊榮會員票券", membershipStatus: "active", classPackRemaining: null, totalClasses: 14, lastVisit: "今天", lifetimeRevenue: 21600, tags: ["台南館"], joinedAt: "2024-05-20" },
];

function membershipStatusLabel(status: Student["membershipStatus"]) {
  const labels: Record<Student["membershipStatus"], string> = {
    active: "有效",
    expired: "已過期",
    none: "無",
  };
  return labels[status];
}

export default function StudentsManage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredStudents = mockStudents.filter(
    (s) =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setDetailOpen(true);
  };

  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">會員</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mockStudents.length} 位會員 — {mockStudents.filter((s) => s.membershipStatus === "active").length} 位活躍會員
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              匯出
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              新增會員
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="依姓名或電子郵件搜尋..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Student List */}
        <Card>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-4 py-3 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>會員</span>
              <span>會籍</span>
              <span>服務次數</span>
              <span>上次到訪</span>
              <span>收入</span>
              <span></span>
            </div>

            {/* Student Rows */}
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="grid md:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] gap-4 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-secondary/30 transition-colors cursor-pointer"
                onClick={() => handleViewStudent(student)}
              >
                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-foreground text-xs font-semibold">
                      {student.firstName[0]}{student.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                  </div>
                  {student.tags.length > 0 && (
                    <div className="hidden lg:flex gap-1">
                      {student.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Membership */}
                <div className="hidden md:block">
                  {student.membershipType ? (
                    <div>
                      <p className="text-sm">{student.membershipType}</p>
                      <Badge
                        variant={student.membershipStatus === "active" ? "default" : "secondary"}
                        className={`text-[10px] mt-0.5 ${
                          student.membershipStatus === "active"
                            ? "bg-accent-sage/20 text-accent-sage"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {membershipStatusLabel(student.membershipStatus)}
                      </Badge>
                    </div>
                  ) : student.classPackRemaining ? (
                    <p className="text-sm">{student.classPackRemaining} 次剩餘</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">無有效方案</p>
                  )}
                </div>

                {/* Classes */}
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{student.totalClasses}</p>
                  <p className="text-xs text-muted-foreground">總計</p>
                </div>

                {/* Last Visit */}
                <div className="hidden md:block">
                  <p className="text-sm">{student.lastVisit}</p>
                </div>

                {/* Revenue */}
                <div className="hidden md:block">
                  <p className="text-sm font-medium">${student.lifetimeRevenue.toLocaleString()}</p>
                </div>

                {/* Actions */}
                <div className="hidden md:block" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl">
                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                        <Mail className="h-4 w-4 mr-2" />
                        寄送電子郵件
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                        <CreditCard className="h-4 w-4 mr-2" />
                        新增購買
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                        <Tag className="h-4 w-4 mr-2" />
                        新增標籤
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Student Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>會員資料</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-foreground text-lg font-semibold">
                    {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedStudent.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedStudent.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <p className="text-xl font-bold">{selectedStudent.totalClasses}</p>
                  <p className="text-xs text-muted-foreground">服務次數</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <p className="text-xl font-bold">NT${selectedStudent.lifetimeRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">累計收入</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <p className="text-xl font-bold">{selectedStudent.lastVisit}</p>
                  <p className="text-xs text-muted-foreground">上次到訪</p>
                </div>
              </div>

              {/* Membership/Pack */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">有效方案</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedStudent.membershipType ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{selectedStudent.membershipType}</p>
                        <Badge
                          className={`text-xs mt-1 ${
                            selectedStudent.membershipStatus === "active"
                              ? "bg-accent-sage/20 text-accent-sage"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {membershipStatusLabel(selectedStudent.membershipStatus)}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">管理</Button>
                    </div>
                  ) : selectedStudent.classPackRemaining ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{selectedStudent.classPackRemaining} 次剩餘</p>
                        <p className="text-xs text-muted-foreground">10 次票券</p>
                      </div>
                      <Button variant="outline" size="sm">管理</Button>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-sm text-muted-foreground mb-2">無有效會籍或方案</p>
                      <Button size="sm">新增會籍</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Member Since */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>加入日期 {new Date(selectedStudent.joinedAt).toLocaleDateString("zh-TW", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ManageLayout>
  );
}
