import { useState } from "react";
import { TeachLayout } from "@/components/teach/TeachLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Clock, Save, Calendar } from "lucide-react";

const DAYS = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

interface TimeSlot {
  start: string;
  end: string;
  enabled: boolean;
}

const defaultAvailability: Record<string, TimeSlot> = {
  星期一: { start: "06:00", end: "12:00", enabled: true },
  星期二: { start: "06:00", end: "14:00", enabled: true },
  星期三: { start: "06:00", end: "12:00", enabled: true },
  星期四: { start: "06:00", end: "14:00", enabled: true },
  星期五: { start: "07:00", end: "11:00", enabled: true },
  星期六: { start: "08:00", end: "13:00", enabled: true },
  星期日: { start: "00:00", end: "00:00", enabled: false },
};

export default function TeachAvailability() {
  const { toast } = useToast();
  const [availability, setAvailability] = useState(defaultAvailability);
  const [subAvailable, setSubAvailable] = useState(true);
  const [subRadius, setSubRadius] = useState("any");

  const toggleDay = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateTime = (day: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSave = () => {
    toast({
      title: "已儲存可授課時段",
      description: "您的每週可授課時段已更新。",
    });
  };

  return (
    <TeachLayout>
      <SEOHead title="可授課時段" noindex />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">可授課時段</h1>
            <p className="text-muted-foreground">設定您的每週授課可用時段</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            儲存變更
          </Button>
        </div>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              每週課表
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {DAYS.map((day) => {
              const slot = availability[day];
              return (
                <div key={day} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <Switch checked={slot.enabled} onCheckedChange={() => toggleDay(day)} />
                  <span className="w-28 font-medium">{day}</span>
                  {slot.enabled ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTime(day, "start", e.target.value)}
                        className="px-3 py-1.5 rounded-md border bg-background text-sm"
                      />
                      <span className="text-muted-foreground">至</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTime(day, "end", e.target.value)}
                        className="px-3 py-1.5 rounded-md border bg-background text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">不可授課</span>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Sub Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              代課偏好
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">可接受代課</p>
                <p className="text-sm text-muted-foreground">
                  其他老師可看到您有代課意願
                </p>
              </div>
              <Switch checked={subAvailable} onCheckedChange={setSubAvailable} />
            </div>

            {subAvailable && (
              <div className="space-y-2">
                <p className="text-sm font-medium">代課範圍</p>
                <div className="flex gap-2">
                  {["any", "same-studio", "same-style"].map((option) => (
                    <Badge
                      key={option}
                      variant={subRadius === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSubRadius(option)}
                    >
                      {option === "any" ? "任何課程" : option === "same-studio" ? "僅限同工作室" : "僅限同風格"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TeachLayout>
  );
}
