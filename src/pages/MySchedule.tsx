import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Star,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { mockMemberBookings } from "@/data/demo/spa-ui-mocks";

interface BookingItem {
  id: string;
  type: "CLASS" | "WORKSHOP" | "APPOINTMENT";
  title: string;
  teacher: {
    name: string;
    avatar?: string;
  };
  startTime: string;
  duration: number;
  location: string;
  status: "BOOKED" | "CHECKED_IN" | "CANCELED" | "NO_SHOW" | "WAITLISTED";
  canCancel: boolean;
  cancelDeadline?: string;
}

const upcomingBookings: BookingItem[] = mockMemberBookings.filter(
  (b) => b.status === "BOOKED" || b.status === "WAITLISTED"
);

const pastBookings: BookingItem[] = mockMemberBookings.filter(
  (b) => b.status === "CHECKED_IN" || b.status === "CANCELED" || b.status === "NO_SHOW"
);

const statusConfig = {
  BOOKED: { label: "已預約", variant: "booked" as const, icon: Check },
  CHECKED_IN: { label: "已報到", variant: "checkedIn" as const, icon: Check },
  CANCELED: { label: "已取消", variant: "canceled" as const, icon: X },
  NO_SHOW: { label: "未到館", variant: "noShow" as const, icon: X },
  WAITLISTED: { label: "候補中", variant: "waitlisted" as const, icon: Clock },
};

const typeConfig = {
  CLASS: { label: "療程", variant: "class" as const },
  WORKSHOP: { label: "工作坊", variant: "workshop" as const },
  APPOINTMENT: { label: "專人預約", variant: "appointment" as const },
};

function BookingCard({
  booking,
  onCancel,
  onRate,
  isPast = false,
}: {
  booking: BookingItem;
  onCancel: (id: string) => void;
  onRate: (id: string) => void;
  isPast?: boolean;
}) {
  const status = statusConfig[booking.status];
  const type = typeConfig[booking.type];
  const StatusIcon = status.icon;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant={type.variant}>{type.label}</Badge>
            <Badge variant={status.variant} className="gap-1">
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground">{booking.title}</h3>

          {/* Teacher */}
          <div className="flex items-center gap-2 mt-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.teacher.avatar} alt={booking.teacher.name} />
              <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                {booking.teacher.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{booking.teacher.name}</span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{booking.startTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{booking.duration} 分鐘</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{booking.location}</span>
            </div>
          </div>

          {/* Cancel deadline warning */}
          {!isPast && booking.canCancel && booking.cancelDeadline && (
            <div className="flex items-center gap-1.5 mt-3 text-xs text-warning">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{booking.cancelDeadline}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2">
          {isPast && booking.status === "CHECKED_IN" ? (
            <Button variant="outline" size="sm" onClick={() => onRate(booking.id)}>
              <Star className="h-4 w-4 mr-1" />
              評分
            </Button>
          ) : booking.canCancel ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking.id)}
              className="text-destructive hover:text-destructive"
            >
              取消預約
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const MySchedule = () => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [canceledIds, setCanceledIds] = useState<Set<string>>(new Set());
  const [ratedIds, setRatedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const activeUpcoming = upcomingBookings.filter((b) => !canceledIds.has(b.id));

  const handleCancelClick = (id: string) => {
    const booking = [...upcomingBookings, ...pastBookings].find((b) => b.id === id);
    if (booking) {
      setSelectedBooking(booking);
      setCancelDialogOpen(true);
    }
  };

  const handleConfirmCancel = () => {
    if (!selectedBooking) return;
    setCanceledIds((prev) => new Set(prev).add(selectedBooking.id));
    toast({
      title: "預約已取消",
      description: `您的「${selectedBooking.title}」預約已取消，未收取費用。`,
    });
    setCancelDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleRate = (id: string) => {
    setRatedIds((prev) => new Set(prev).add(id));
    const booking = pastBookings.find((b) => b.id === id);
    toast({
      title: "感謝您的回饋！",
      description: `您已為「${booking?.title ?? "此課程"}」評分，老師感謝您的支持。`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">我的課程</h1>
          <p className="text-muted-foreground mt-1">
            管理您的即將開課、工作坊與預約
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:inline-grid">
            <TabsTrigger value="upcoming" className="px-8">
              即將開課 ({activeUpcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="px-8">
              過去
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {activeUpcoming.length > 0 ? (
              <div className="space-y-4">
                {activeUpcoming.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancelClick}
                    onRate={handleRate}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold mb-2">尚無即將開課的預約</h3>
                <p className="text-muted-foreground mb-4">
                  您目前沒有已排定的課程、工作坊或預約。
                </p>
                <Button asChild>
                  <a href="/schedule">瀏覽課程表</a>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancelClick}
                    onRate={handleRate}
                    isPast
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold mb-2">尚無過去預約</h3>
                <p className="text-muted-foreground">
                  您的預約紀錄將顯示於此。
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>取消預約？</DialogTitle>
            <DialogDescription>
              確定要取消「
              <span className="font-medium text-foreground">
                {selectedBooking?.title}
              </span>
              」的預約嗎？
            </DialogDescription>
          </DialogHeader>
          {selectedBooking?.cancelDeadline && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 text-warning text-sm">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span>
                {selectedBooking.cancelDeadline}。逾時取消可能產生費用。
              </span>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              保留預約
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              確認取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default MySchedule;