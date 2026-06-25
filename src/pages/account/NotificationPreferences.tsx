import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  Moon,
  CalendarCheck,
  CalendarX,
  Users,
  Tag,
  Megaphone,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock notification preferences
const defaultPreferences = {
  // Channels
  channels: {
    email: true,
    sms: true,
    push: true,
  },
  // Notification types
  types: {
    bookingConfirmation: { email: true, sms: true, push: true },
    classReminder: { email: true, sms: true, push: true },
    waitlistUpdate: { email: true, sms: false, push: true },
    classCancellation: { email: true, sms: true, push: true },
    teacherChange: { email: true, sms: false, push: true },
    membershipExpiring: { email: true, sms: false, push: false },
    packRunningLow: { email: true, sms: false, push: true },
    newWorkshops: { email: true, sms: false, push: false },
  },
  // Timing
  reminderTiming: "2",
  // Quiet hours
  quietHoursEnabled: false,
  quietHoursStart: "22:00",
  quietHoursEnd: "07:00",
  // Marketing
  marketingOptIn: true,
  newsletterOptIn: true,
};

const notificationTypes = [
  {
    id: "bookingConfirmation",
    label: "預約確認",
    description: "當您預約或取消課程時",
    icon: CalendarCheck,
    category: "classes",
  },
  {
    id: "classReminder",
    label: "課程提醒",
    description: "您已預約課程開始前的提醒",
    icon: Bell,
    category: "classes",
  },
  {
    id: "waitlistUpdate",
    label: "候補更新",
    description: "已額滿課程釋出名額時",
    icon: Users,
    category: "classes",
  },
  {
    id: "classCancellation",
    label: "課程取消",
    description: "您已預約的課程被取消時",
    icon: CalendarX,
    category: "classes",
  },
  {
    id: "teacherChange",
    label: "老師異動",
    description: "代課老師安排時",
    icon: Users,
    category: "classes",
  },
  {
    id: "membershipExpiring",
    label: "會籍即將到期",
    description: "會籍到期前的提醒",
    icon: Tag,
    category: "account",
  },
  {
    id: "packRunningLow",
    label: "課程包提醒",
    description: "課程包餘額不足時",
    icon: Tag,
    category: "account",
  },
  {
    id: "newWorkshops",
    label: "新工作坊與活動",
    description: "特別工作坊與活動的公告",
    icon: Megaphone,
    category: "promotions",
  },
];

export default function NotificationPreferences() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState(defaultPreferences);

  const updateChannel = (channel: keyof typeof preferences.channels, enabled: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      channels: { ...prev.channels, [channel]: enabled },
    }));
  };

  const updateTypeChannel = (
    typeId: string,
    channel: "email" | "sms" | "push",
    enabled: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      types: {
        ...prev.types,
        [typeId]: { ...prev.types[typeId as keyof typeof prev.types], [channel]: enabled },
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "偏好設定已儲存",
      description: "您的通知偏好已更新。",
    });
  };

  const classNotifications = notificationTypes.filter((t) => t.category === "classes");
  const accountNotifications = notificationTypes.filter((t) => t.category === "account");
  const promotionNotifications = notificationTypes.filter((t) => t.category === "promotions");

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">通知偏好</h1>
            <p className="text-sm text-muted-foreground mt-1">
              選擇您希望如何、何時收到通知
            </p>
          </div>
        </div>

        {/* Channel Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">通知管道</CardTitle>
            <CardDescription>
              啟用或停用通知管道。您可在下方針對各類通知進行細部設定。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">電子郵件</p>
                  <p className="text-sm text-muted-foreground">透過電子郵件接收通知</p>
                </div>
              </div>
              <Switch
                checked={preferences.channels.email}
                onCheckedChange={(v) => updateChannel("email", v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-sage/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-accent-sage" />
                </div>
                <div>
                  <p className="font-medium">簡訊</p>
                  <p className="text-sm text-muted-foreground">接收簡訊通知</p>
                </div>
              </div>
              <Switch
                checked={preferences.channels.sms}
                onCheckedChange={(v) => updateChannel("sms", v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-lilac/30 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium">推播通知</p>
                  <p className="text-sm text-muted-foreground">瀏覽器與行動裝置推播提醒</p>
                </div>
              </div>
              <Switch
                checked={preferences.channels.push}
                onCheckedChange={(v) => updateChannel("push", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Type Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">課程通知</CardTitle>
            <CardDescription>
              與課程預約及行程相關的通知
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {classNotifications.map((type) => (
              <NotificationTypeRow
                key={type.id}
                type={type}
                settings={preferences.types[type.id as keyof typeof preferences.types]}
                channels={preferences.channels}
                onUpdate={(channel, enabled) => updateTypeChannel(type.id, channel, enabled)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">帳戶通知</CardTitle>
            <CardDescription>
              會籍與帳戶狀態的更新
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {accountNotifications.map((type) => (
              <NotificationTypeRow
                key={type.id}
                type={type}
                settings={preferences.types[type.id as keyof typeof preferences.types]}
                channels={preferences.channels}
                onUpdate={(channel, enabled) => updateTypeChannel(type.id, channel, enabled)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">促銷與活動</CardTitle>
            <CardDescription>
              掌握新工作坊、活動與優惠資訊
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {promotionNotifications.map((type) => (
              <NotificationTypeRow
                key={type.id}
                type={type}
                settings={preferences.types[type.id as keyof typeof preferences.types]}
                channels={preferences.channels}
                onUpdate={(channel, enabled) => updateTypeChannel(type.id, channel, enabled)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Reminder Timing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              提醒時間
            </CardTitle>
            <CardDescription>
              選擇課程開始前多久收到提醒
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>課程開始前提醒</Label>
              <Select
                value={preferences.reminderTiming}
                onValueChange={(v) => setPreferences((p) => ({ ...p, reminderTiming: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">30 分鐘前</SelectItem>
                  <SelectItem value="1">1 小時前</SelectItem>
                  <SelectItem value="2">2 小時前</SelectItem>
                  <SelectItem value="3">3 小時前</SelectItem>
                  <SelectItem value="4">4 小時前</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  勿擾時段
                </CardTitle>
                <CardDescription>
                  在特定時段暫停通知
                </CardDescription>
              </div>
              <Switch
                checked={preferences.quietHoursEnabled}
                onCheckedChange={(v) => setPreferences((p) => ({ ...p, quietHoursEnabled: v }))}
              />
            </div>
          </CardHeader>
          {preferences.quietHoursEnabled && (
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>開始時間</Label>
                  <Select
                    value={preferences.quietHoursStart}
                    onValueChange={(v) => setPreferences((p) => ({ ...p, quietHoursStart: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {i === 0 ? "凌晨 12:00" : i < 12 ? `上午 ${i}:00` : i === 12 ? "下午 12:00" : `下午 ${i - 12}:00`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>結束時間</Label>
                  <Select
                    value={preferences.quietHoursEnd}
                    onValueChange={(v) => setPreferences((p) => ({ ...p, quietHoursEnd: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0");
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {i === 0 ? "凌晨 12:00" : i < 12 ? `上午 ${i}:00` : i === 12 ? "下午 12:00" : `下午 ${i - 12}:00`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                勿擾時段內將暫停推播與簡訊通知。緊急通知（如課程取消）仍會送達。
              </p>
            </CardContent>
          )}
        </Card>

        {/* Marketing Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              行銷偏好
            </CardTitle>
            <CardDescription>
              管理行銷與促銷訊息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">電子報</p>
                <p className="text-sm text-muted-foreground">
                  每週精選：場館消息與身心健康小知識
                </p>
              </div>
              <Switch
                checked={preferences.newsletterOptIn}
                onCheckedChange={(v) => setPreferences((p) => ({ ...p, newsletterOptIn: v }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">促銷優惠</p>
                <p className="text-sm text-muted-foreground">
                  特別折扣與促銷活動
                </p>
              </div>
              <Switch
                checked={preferences.marketingOptIn}
                onCheckedChange={(v) => setPreferences((p) => ({ ...p, marketingOptIn: v }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pb-6">
          <Button onClick={handleSave} size="lg">
            <Save className="h-4 w-4 mr-2" />
            儲存偏好
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

// Component for individual notification type rows
function NotificationTypeRow({
  type,
  settings,
  channels,
  onUpdate,
}: {
  type: (typeof notificationTypes)[0];
  settings: { email: boolean; sms: boolean; push: boolean };
  channels: { email: boolean; sms: boolean; push: boolean };
  onUpdate: (channel: "email" | "sms" | "push", enabled: boolean) => void;
}) {
  const Icon = type.icon;

  return (
    <div className="p-3 rounded-xl border">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{type.label}</p>
          <p className="text-xs text-muted-foreground">{type.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onUpdate("email", !settings.email)}
              disabled={!channels.email}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors",
                settings.email && channels.email
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground",
                !channels.email && "opacity-50 cursor-not-allowed"
              )}
            >
              <Mail className="h-3 w-3" />
              電子郵件
            </button>
            <button
              onClick={() => onUpdate("sms", !settings.sms)}
              disabled={!channels.sms}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors",
                settings.sms && channels.sms
                  ? "bg-accent-sage/20 text-accent-sage"
                  : "bg-secondary text-muted-foreground",
                !channels.sms && "opacity-50 cursor-not-allowed"
              )}
            >
              <MessageSquare className="h-3 w-3" />
              簡訊
            </button>
            <button
              onClick={() => onUpdate("push", !settings.push)}
              disabled={!channels.push}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors",
                settings.push && channels.push
                  ? "bg-accent-lilac/30 text-foreground"
                  : "bg-secondary text-muted-foreground",
                !channels.push && "opacity-50 cursor-not-allowed"
              )}
            >
              <Smartphone className="h-3 w-3" />
              推播
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
