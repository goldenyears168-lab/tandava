import { useState } from "react";
import { TeachLayout } from "@/components/teach/TeachLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Repeat2,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const weekDayLabels: Record<string, string> = {
  Mon: "週一",
  Tue: "週二",
  Wed: "週三",
  Thu: "週四",
  Fri: "週五",
  Sat: "週六",
  Sun: "週日",
};

interface SubOpportunity {
  id: string;
  className: string;
  style: string;
  originalTeacher: string;
  date: string;
  dayOfWeek: string;
  time: string;
  endTime: string;
  room: string;
  location: string;
  capacity: number;
  booked: number;
  pay: number;
  postedAt: string;
  matchesQualification: boolean;
}

interface SubRequest {
  id: string;
  className: string;
  style: string;
  date: string;
  dayOfWeek: string;
  time: string;
  endTime: string;
  room: string;
  booked: number;
  status: "pending" | "claimed" | "cancelled";
  requestedAt: string;
  claimedBy?: string;
  reason?: string;
}

const mockOpportunities: SubOpportunity[] = [
  {
    id: "1",
    className: "Gentle Flow",
    style: "Hatha",
    originalTeacher: "James Liu",
    date: "Feb 10",
    dayOfWeek: "Mon",
    time: "9:30 AM",
    endTime: "10:30 AM",
    room: "Main Studio",
    location: "SOMA",
    capacity: 20,
    booked: 14,
    pay: 75,
    postedAt: "2 小時前",
    matchesQualification: true,
  },
  {
    id: "2",
    className: "Yin Restore",
    style: "Yin",
    originalTeacher: "Ava Kim",
    date: "Feb 14",
    dayOfWeek: "Fri",
    time: "4:30 PM",
    endTime: "5:45 PM",
    room: "Main Studio",
    location: "SOMA",
    capacity: 20,
    booked: 8,
    pay: 65,
    postedAt: "1 天前",
    matchesQualification: false,
  },
  {
    id: "3",
    className: "Morning Vinyasa",
    style: "Vinyasa",
    originalTeacher: "Maya Patel",
    date: "Feb 12",
    dayOfWeek: "Wed",
    time: "7:00 AM",
    endTime: "8:15 AM",
    room: "Main Studio",
    location: "SOMA",
    capacity: 25,
    booked: 19,
    pay: 75,
    postedAt: "3 天前",
    matchesQualification: true,
  },
  {
    id: "4",
    className: "Hot Vinyasa",
    style: "Hot",
    originalTeacher: "Sarah Chen",
    date: "Feb 18",
    dayOfWeek: "Tue",
    time: "9:00 AM",
    endTime: "10:15 AM",
    room: "Hot Room",
    location: "SOMA",
    capacity: 30,
    booked: 22,
    pay: 85,
    postedAt: "5 小時前",
    matchesQualification: true,
  },
];

const mockRequests: SubRequest[] = [
  {
    id: "1",
    className: "Morning Vinyasa",
    style: "Vinyasa",
    date: "Feb 12",
    dayOfWeek: "Wed",
    time: "7:00 AM",
    endTime: "8:15 AM",
    room: "Main Studio",
    booked: 19,
    status: "pending",
    requestedAt: "Feb 1",
    reason: "醫生預約",
  },
  {
    id: "2",
    className: "Evening Vinyasa",
    style: "Vinyasa",
    date: "Feb 5",
    dayOfWeek: "Wed",
    time: "6:00 PM",
    endTime: "7:15 PM",
    room: "Main Studio",
    booked: 15,
    status: "claimed",
    requestedAt: "Jan 28",
    claimedBy: "James Liu",
  },
  {
    id: "3",
    className: "Community Flow",
    style: "Vinyasa",
    date: "Jan 25",
    dayOfWeek: "Sat",
    time: "11:00 AM",
    endTime: "12:15 PM",
    room: "Main Studio",
    booked: 20,
    status: "cancelled",
    requestedAt: "Jan 20",
    reason: "個人緊急狀況",
  },
];

export default function TeachSubs() {
  const [claimDialogOpen, setClaimDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<SubOpportunity | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<SubRequest | null>(
    null
  );
  const { toast } = useToast();

  const pendingRequests = mockRequests.filter((r) => r.status === "pending");
  const pastRequests = mockRequests.filter((r) => r.status !== "pending");

  const handleClaimSub = () => {
    if (!selectedOpportunity) return;
    toast({
      title: "已認領代課！",
      description: `您將於 ${selectedOpportunity.date} ${selectedOpportunity.time} 教授 ${selectedOpportunity.className}。`,
    });
    setClaimDialogOpen(false);
    setSelectedOpportunity(null);
  };

  const handleCancelRequest = () => {
    if (!selectedRequest) return;
    toast({
      title: "申請已取消",
      description: `您對 ${selectedRequest.className} 的代課申請已取消。`,
    });
    setCancelDialogOpen(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: SubRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-[10px] border-accent-gold/50 text-accent-gold"
          >
            待處理
          </Badge>
        );
      case "claimed":
        return (
          <Badge className="text-[10px] bg-accent-sage/20 text-accent-sage border-0">
            已安排
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="text-[10px]">
            已取消
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <TeachLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">排班</h1>
          <p className="text-sm text-muted-foreground mt-1">
            尋找代課或認領額外課程
          </p>
        </div>

        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList>
            <TabsTrigger value="opportunities" className="gap-2">
              <Repeat2 className="h-4 w-4" />
              開放機會
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {mockOpportunities.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Clock className="h-4 w-4" />
              我的申請
              {pendingRequests.length > 0 && (
                <Badge className="ml-1 text-[10px] bg-accent-gold/20 text-accent-gold border-0">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Open Opportunities */}
          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                符合您資格的待代課課程
              </p>
            </div>

            {mockOpportunities.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Repeat2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    目前沒有開放的代課機會
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    請稍後再查看新的代課需求
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {mockOpportunities.map((opp) => (
                  <Card
                    key={opp.id}
                    className={`transition-all ${
                      opp.matchesQualification
                        ? "hover:border-accent-sage/50 hover:shadow-md"
                        : "opacity-60"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 min-w-0">
                          {/* Date & Time */}
                          <div className="shrink-0 w-24 text-center p-3 rounded-xl bg-secondary/50">
                            <p className="text-xs text-muted-foreground">
                              {weekDayLabels[opp.dayOfWeek]}
                            </p>
                            <p className="text-sm font-bold">{opp.date}</p>
                            <p className="text-xs font-medium mt-1">{opp.time}</p>
                          </div>

                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold">
                                {opp.className}
                              </h3>
                              <Badge variant="outline" className="text-[10px]">
                                {opp.style}
                              </Badge>
                              {!opp.matchesQualification && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px]"
                                >
                                  超出資格範圍
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              代 <span className="font-medium">{opp.originalTeacher}</span> 的課
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {opp.room}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {opp.time} - {opp.endTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {opp.booked}/{opp.capacity} 已預約
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              發布於 {opp.postedAt}
                            </p>
                          </div>
                        </div>

                        {/* Pay & Action */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-1 text-lg font-bold text-accent-sage">
                            <DollarSign className="h-4 w-4" />
                            {opp.pay}
                          </div>
                          <Button
                            size="sm"
                            disabled={!opp.matchesQualification}
                            onClick={() => {
                              setSelectedOpportunity(opp);
                              setClaimDialogOpen(true);
                            }}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            認領
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Requests */}
          <TabsContent value="requests" className="space-y-6">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  待處理申請
                </h2>
                {pendingRequests.map((req) => (
                  <Card
                    key={req.id}
                    className="border-accent-gold/30 bg-accent-gold/5"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 min-w-0">
                          {/* Date & Time */}
                          <div className="shrink-0 w-24 text-center p-3 rounded-xl bg-accent-gold/10">
                            <p className="text-xs text-muted-foreground">
                              {weekDayLabels[req.dayOfWeek]}
                            </p>
                            <p className="text-sm font-bold">{req.date}</p>
                            <p className="text-xs font-medium mt-1">{req.time}</p>
                          </div>

                          {/* Details */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold">
                                {req.className}
                              </h3>
                              {getStatusBadge(req.status)}
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {req.room}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {req.booked} 已預約
                              </span>
                            </div>
                            {req.reason && (
                              <p className="text-xs text-muted-foreground mt-2">
                                原因：{req.reason}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              申請於 {req.requestedAt}
                            </p>
                          </div>
                        </div>

                        {/* Action */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={() => {
                            setSelectedRequest(req);
                            setCancelDialogOpen(true);
                          }}
                        >
                          <X className="h-3 w-3 mr-1" />
                          取消
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Past Requests */}
            {pastRequests.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  過往申請
                </h2>
                {pastRequests.map((req) => (
                  <Card key={req.id} className="bg-secondary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 min-w-0">
                          {/* Date & Time */}
                          <div className="shrink-0 w-24 text-center p-3 rounded-xl bg-secondary/50">
                            <p className="text-xs text-muted-foreground">
                              {weekDayLabels[req.dayOfWeek]}
                            </p>
                            <p className="text-sm font-bold">{req.date}</p>
                            <p className="text-xs font-medium mt-1">{req.time}</p>
                          </div>

                          {/* Details */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold">
                                {req.className}
                              </h3>
                              {getStatusBadge(req.status)}
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {req.room}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {req.booked} 已預約
                              </span>
                            </div>
                            {req.claimedBy && (
                              <p className="text-xs text-accent-sage mt-2">
                                由 {req.claimedBy} 代課
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              申請於 {req.requestedAt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {mockRequests.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">尚無代課申請</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    需要代課時，可從課程表提交申請
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Claim Sub Dialog */}
      <Dialog open={claimDialogOpen} onOpenChange={setClaimDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>認領此代課</DialogTitle>
            <DialogDescription>
              確認您要教授此堂課程。
            </DialogDescription>
          </DialogHeader>
          {selectedOpportunity && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <h3 className="text-sm font-semibold">
                  {selectedOpportunity.className}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  代 {selectedOpportunity.originalTeacher} 的課
                </p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {weekDayLabels[selectedOpportunity.dayOfWeek]}，{selectedOpportunity.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOpportunity.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOpportunity.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedOpportunity.booked} 已預約
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-accent-sage/10 border border-accent-sage/20">
                <span className="text-sm font-medium">酬勞</span>
                <span className="text-lg font-bold text-accent-sage">
                  ${selectedOpportunity.pay}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setClaimDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleClaimSub}>
              <Check className="h-4 w-4 mr-2" />
              確認認領
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Request Alert Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>取消代課申請？</AlertDialogTitle>
            <AlertDialogDescription>
              確定要取消 {selectedRequest?.className}（{selectedRequest?.date}）的代課申請嗎？您將需自行授課。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>保留申請</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelRequest}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              取消申請
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TeachLayout>
  );
}
