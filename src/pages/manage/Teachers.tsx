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
  Star,
  Calendar,
  DollarSign,
  Clock,
  Mail,
  Phone,
  Users,
  TrendingUp,
  Repeat2,
} from "lucide-react";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialties: string[];
  certifications: string[];
  payType: "per_class" | "revenue_share";
  payRate: number;
  classesThisMonth: number;
  earningsThisMonth: number;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  canSub: boolean;
  upcomingClasses: { name: string; day: string; time: string }[];
  // Analytics
  avgStudentsPerClass: number;
  returnRate: number; // percentage of students who return to this teacher
  totalStudentsTaught: number;
}

const mockTeachers: Teacher[] = [
  {
    id: "1", firstName: "林", lastName: "美容師", email: "lin@1314mm941.com.tw", phone: "0910 257 767",
    specialties: ["活化能量艙", "能量艙＋撥筋"], certifications: ["能量艙操作認證"],
    payType: "per_class", payRate: 450000, classesThisMonth: 48, earningsThisMonth: 2160000,
    rating: 4.9, reviewCount: 186, isActive: true, canSub: true,
    avgStudentsPerClass: 3.8, returnRate: 82, totalStudentsTaught: 920,
    upcomingClasses: [
      { name: "活化能量艙", day: "每日", time: "09:30" },
      { name: "能量艙＋撥筋", day: "每日", time: "17:00" },
    ],
  },
  {
    id: "2", firstName: "陳", lastName: "美容師", email: "chen@1314mm941.com.tw", phone: "02 2750 5419",
    specialties: ["專業撥筋", "舒通筋脈"], certifications: ["撥筋專業認證"],
    payType: "per_class", payRate: 380000, classesThisMonth: 42, earningsThisMonth: 1596000,
    rating: 4.8, reviewCount: 142, isActive: true, canSub: true,
    avgStudentsPerClass: 4.5, returnRate: 76, totalStudentsTaught: 1104,
    upcomingClasses: [
      { name: "專業撥筋", day: "週一至週六", time: "11:00" },
      { name: "舒通筋脈", day: "週二/四/六", time: "15:00" },
    ],
  },
  {
    id: "3", firstName: "王", lastName: "美容師", email: "wang@1314mm941.com.tw", phone: "0930 866 070",
    specialties: ["溫感能量光療", "光療＋活罐"], certifications: ["光療師認證"],
    payType: "per_class", payRate: 400000, classesThisMonth: 36, earningsThisMonth: 1440000,
    rating: 4.8, reviewCount: 128, isActive: true, canSub: false,
    avgStudentsPerClass: 4.2, returnRate: 79, totalStudentsTaught: 856,
    upcomingClasses: [
      { name: "溫感能量光療", day: "週一至週五", time: "13:30" },
      { name: "光療＋活罐", day: "週三/五", time: "16:00" },
    ],
  },
  {
    id: "4", firstName: "張", lastName: "美容師", email: "zhang@1314mm941.com.tw", phone: "02 8646 1868",
    specialties: ["負離子活罐", "舒通筋脈"], certifications: ["活罐療法認證"],
    payType: "per_class", payRate: 360000, classesThisMonth: 30, earningsThisMonth: 1080000,
    rating: 4.7, reviewCount: 96, isActive: true, canSub: true,
    avgStudentsPerClass: 4.0, returnRate: 74, totalStudentsTaught: 640,
    upcomingClasses: [
      { name: "負離子活罐", day: "每日", time: "15:00" },
    ],
  },
  {
    id: "5", firstName: "李", lastName: "美容師", email: "li@1314mm941.com.tw", phone: "0919 133 068",
    specialties: ["舒通筋脈", "專業撥筋"], certifications: ["撥筋專業認證"],
    payType: "per_class", payRate: 350000, classesThisMonth: 24, earningsThisMonth: 840000,
    rating: 4.8, reviewCount: 72, isActive: true, canSub: true,
    avgStudentsPerClass: 3.8, returnRate: 80, totalStudentsTaught: 480,
    upcomingClasses: [
      { name: "舒通筋脈", day: "週二/四/六", time: "19:30" },
    ],
  },
];

export default function TeachersManage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredTeachers = mockTeachers.filter(
    (t) =>
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatPay = (teacher: Teacher) => {
    if (teacher.payType === "per_class") {
      return `NT$${(teacher.payRate / 100).toLocaleString()}/次`;
    }
    return `${teacher.payRate}% 分潤`;
  };

  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">專業團隊</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mockTeachers.filter((t) => t.isActive).length} 位服務中的美容師
            </p>
          </div>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            新增美容師
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋美容師或專長..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Teacher Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => {
                setSelectedTeacher(teacher);
                setDetailOpen(true);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-foreground font-semibold">
                      {teacher.firstName[0]}{teacher.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">
                          {teacher.firstName} {teacher.lastName}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 fill-accent-gold text-accent-gold" />
                          <span className="text-xs">{teacher.rating}</span>
                          <span className="text-xs text-muted-foreground">({teacher.reviewCount})</span>
                        </div>
                      </div>
                      {!teacher.isActive && (
                        <Badge variant="secondary" className="text-xs">未啟用</Badge>
                      )}
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {teacher.specialties.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-[10px] px-1.5 py-0">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">平均服務人次</p>
                        <p className="text-sm font-semibold">{teacher.avgStudentsPerClass}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">回訪率</p>
                        <p className="text-sm font-semibold text-accent-sage">{teacher.returnRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">次/月</p>
                        <p className="text-sm font-semibold">{teacher.classesThisMonth}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Teacher Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>美容師資料</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-foreground text-lg font-semibold">
                    {selectedTeacher.firstName[0]}{selectedTeacher.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedTeacher.firstName} {selectedTeacher.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
                    <span className="text-sm">{selectedTeacher.rating}（{selectedTeacher.reviewCount} 則評價）</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate">{selectedTeacher.email}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedTeacher.phone}</span>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">專業認證</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.certifications.map((cert) => (
                    <Badge key={cert} className="bg-primary/10 text-primary text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pay & Earnings */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <DollarSign className="h-4 w-4 text-muted-foreground mx-auto" />
                  <p className="text-lg font-bold mt-1">
                    NT${(selectedTeacher.earningsThisMonth / 100).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">本月收入</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <Calendar className="h-4 w-4 text-muted-foreground mx-auto" />
                  <p className="text-lg font-bold mt-1">{selectedTeacher.classesThisMonth}</p>
                  <p className="text-xs text-muted-foreground">本月服務次數</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <Clock className="h-4 w-4 text-muted-foreground mx-auto" />
                  <p className="text-lg font-bold mt-1">{formatPay(selectedTeacher)}</p>
                  <p className="text-xs text-muted-foreground">計酬方式</p>
                </div>
              </div>

              {/* Teacher Analytics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent-sage" />
                    服務表現分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <Repeat2 className="h-4 w-4 text-accent-sage" />
                      <span className="text-sm">會員回訪率</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-accent-sage">{selectedTeacher.returnRate}%</span>
                      <p className="text-[10px] text-muted-foreground">的會員會再次預約</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm">平均每次服務人次</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">{selectedTeacher.avgStudentsPerClass}</span>
                      <p className="text-[10px] text-muted-foreground">每次</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">累計服務會員</span>
                    </div>
                    <span className="text-sm font-bold">{selectedTeacher.totalStudentsTaught.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">每週服務排程</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedTeacher.upcomingClasses.length > 0 ? (
                    selectedTeacher.upcomingClasses.map((cls, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                        <div>
                          <p className="text-sm font-medium">{cls.name}</p>
                          <p className="text-xs text-muted-foreground">{cls.day}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{cls.time}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">尚無排程療程</p>
                  )}
                </CardContent>
              </Card>

              {/* Sub availability */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <span className="text-sm">可代班</span>
                <Badge
                  variant={selectedTeacher.canSub ? "default" : "secondary"}
                  className={selectedTeacher.canSub ? "bg-accent-sage/20 text-accent-sage" : ""}
                >
                  {selectedTeacher.canSub ? "是" : "否"}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ManageLayout>
  );
}
