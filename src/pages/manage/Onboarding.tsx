import { useState } from "react";
import { ManageLayout } from "@/components/manage/ManageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { api, isBackendConfigured } from "@/lib/backend";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  Building2, MapPin, Palette, Tag, CalendarClock, DollarSign, Users,
  ShieldCheck, Upload, CreditCard, Rocket, Check, ChevronRight,
  SkipForward, ExternalLink, CheckCircle2, Circle,
} from "lucide-react";

const STEPS = [
  { key: "studio", label: "場館資訊", icon: Building2 },
  { key: "location", label: "分店地址", icon: MapPin },
  { key: "branding", label: "品牌設定", icon: Palette },
  { key: "offerings", label: "服務項目", icon: Tag },
  { key: "schedule", label: "服務排程", icon: CalendarClock },
  { key: "pricing", label: "定價方案", icon: DollarSign },
  { key: "staff", label: "專業團隊 · 美容師", icon: Users },
  { key: "waivers", label: "同意書", icon: ShieldCheck },
  { key: "import", label: "匯入", icon: Upload },
  { key: "stripe", label: "金流串接", icon: CreditCard },
  { key: "launch", label: "正式上線", icon: Rocket },
] as const;

const DAYS = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

export default function Onboarding() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [f, setF] = useState<Record<string, string>>({
    studioName: "森浴光mm941",
    studioDesc: "讓身體重新定義舒爽，讓靈魂再次發光。森之息、浴暖陽、光之甦——在城市森林中找回內在平衡與通透。",
    timezone: "Asia/Taipei", currency: "TWD", rooms: "能量艙室、撥筋室、光療室、活罐室",
    address: "新北市汐止區水源路一段115號",
    classStyle: "energy-cabin", classLevel: "all", classDuration: "60", classCapacity: "4",
    classPrice: "1800", schedDay: "monday", schedTime: "09:30", memberCycle: "monthly",
    packClasses: "10", teacherRole: "teacher", payType: "per_class",
    waiverName: "服務同意書", primaryColor: "#4a7c59", secondaryColor: "#d4a574",
    memberName: "尊榮會員票券",
  });
  const [memberUnlimited, setMemberUnlimited] = useState(true);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [key]: e.target.value }));
  const sel = (key: string) => (val: string) => setF((p) => ({ ...p, [key]: val }));

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    // Persist the step server-side when a backend is configured; demo just advances.
    if (isBackendConfigured()) {
      setSaving(true);
      const { error } = await api.invoke("onboarding", {
        step: STEPS[step].key,
        data: { ...f, memberUnlimited },
      });
      setSaving(false);
      if (error) {
        toast({ title: "無法儲存", description: error.message, variant: "destructive" });
        return;
      }
    }
    setDone((prev) => new Set([...prev, step]));
    toast({ title: `${STEPS[step].label} 已儲存`, description: "您的進度已儲存。" });
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleSkip = () => { if (step < STEPS.length - 1) setStep(step + 1); };

  const Field = ({ label, id, ...props }: { label: string; id: string; placeholder?: string; type?: string }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={f[id] ?? ""} onChange={set(id)} {...props} />
    </div>
  );

  const Sel = ({ label, id, options, placeholder }: { label: string; id: string; options: [string, string][]; placeholder?: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={f[id] ?? ""} onValueChange={sel(id)}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>
          {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <StepCard title="場館資訊" desc="設定森浴光mm941 的基本資料">
          <Field label="工作室名稱" id="studioName" placeholder="森浴光mm941" />
          <div className="space-y-2">
            <Label htmlFor="studioDesc">品牌介紹</Label>
            <Textarea id="studioDesc" placeholder="讓身體重新定義舒爽，讓靈魂再次發光..." value={f.studioDesc ?? ""} onChange={set("studioDesc")} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Sel label="時區" id="timezone" options={[["Asia/Taipei","台北 (GMT+8)"]]} />
            <Sel label="幣別" id="currency" options={[["TWD","新台幣 (TWD)"]]} />
          </div>
        </StepCard>
      );
      case 1: return (
        <StepCard title="分店地址" desc="設定各館地址與設施">
          <Field label="地址" id="address" placeholder="新北市汐止區水源路一段115號" />
          <Field label="療程空間（以逗號分隔）" id="rooms" placeholder="能量艙室、撥筋室、光療室、活罐室" />
          <Field label="設施" id="amenities" placeholder="預約制、專人服務、尊榮會員票券" />
        </StepCard>
      );
      case 2: return (
        <StepCard title="品牌設定" desc="設定森浴光mm941 對外的視覺風格">
          <div className="grid grid-cols-2 gap-4">
            {(["primaryColor", "secondaryColor"] as const).map((key) => (
              <div key={key} className="space-y-2">
                <Label>{key === "primaryColor" ? "主色" : "輔色"}</Label>
                <div className="flex items-center gap-2">
                  <Input type="color" value={f[key]} onChange={set(key)} className="w-12 h-10 p-1" />
                  <Input value={f[key]} onChange={set(key)} />
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <p className="text-sm text-muted-foreground">拖曳或點擊上傳 Logo</p>
              <p className="text-xs text-muted-foreground mt-1">建議 PNG、SVG 或 JPG（512×512px）</p>
              <Button variant="outline" size="sm" className="mt-3">上傳 Logo</Button>
            </div>
          </div>
        </StepCard>
      );
      case 3: return (
        <StepCard title="服務項目" desc="設定官網療程類型">
          <Field label="療程名稱" id="className" placeholder="例如 活化能量艙" />
          <div className="grid grid-cols-2 gap-4">
            <Sel label="類型" id="classStyle" options={[["energy-cabin","活化能量艙"],["tuina","專業撥筋"],["light-therapy","溫感能量光療"],["cupping","負離子活罐"],["meridian","舒通筋脈"]]} />
            <Sel label="適合對象" id="classLevel" options={[["all","全齡適用"],["beginner","初次體驗"],["member","尊榮會員"]]} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="時長（分鐘）" id="classDuration" type="number" />
            <Field label="每時段名額" id="classCapacity" type="number" />
            <Field label="單次價格（NT$）" id="classPrice" type="number" />
          </div>
        </StepCard>
      );
      case 4: return (
        <StepCard title="設定重複療程" desc="新增第一個每週服務時段">
          <div className="grid grid-cols-2 gap-4">
            <Sel label="療程" id="schedOffering" placeholder="選擇療程" options={[["energy-cabin","活化能量艙"],["tuina","專業撥筋"],["combo","能量艙＋撥筋"]]} />
            <Sel label="美容師" id="schedTeacher" placeholder="選擇美容師" options={[["lin","林美容師"],["chen","陳美容師"],["wang","王美容師"]]} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Sel label="星期" id="schedDay" options={[["monday","星期一"],["tuesday","星期二"],["wednesday","星期三"],["thursday","星期四"],["friday","星期五"],["saturday","星期六"],["sunday","星期日"]]} />
            <Field label="時間" id="schedTime" type="time" />
            <Sel label="療程空間" id="schedRoom" placeholder="選擇空間" options={[["cabin","能量艙室"],["tuina","撥筋室"],["light","光療室"]]} />
          </div>
        </StepCard>
      );
      case 5: return (
        <StepCard title="定價方案" desc="設定尊榮會員票券與次數方案">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">會員方案</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="方案名稱" id="memberName" placeholder="例如 尊榮會員票券" />
            <Sel label="計費週期" id="memberCycle" options={[["monthly","每月"],["quarterly","每季"],["annual","每年"]]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="價格（NT$）" id="memberPrice" type="number" placeholder="45600" />
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={memberUnlimited} onCheckedChange={setMemberUnlimited} />
              <Label>不限次數</Label>
            </div>
          </div>
          <Separator />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">次數票券</p>
          <div className="grid grid-cols-3 gap-4">
            <Field label="方案名稱" id="packName" placeholder="例如 10 次票券" />
            <Field label="次數" id="packClasses" type="number" />
            <Field label="價格（NT$）" id="packPrice" type="number" placeholder="15000" />
          </div>
        </StepCard>
      );
      case 6: return (
        <StepCard title="邀請美容師" desc="新增第一位專業團隊成員">
          <div className="grid grid-cols-2 gap-4">
            <Field label="姓名" id="teacherName" placeholder="林美容師" />
            <Field label="電子郵件" id="teacherEmail" placeholder="lin@1314mm941.com.tw" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Sel label="角色" id="teacherRole" options={[["teacher","美容師"],["sub","代班"],["admin","管理員"]]} />
            <Sel label="計酬方式" id="payType" options={[["per_class","按次"],["hourly","時薪"],["salary","月薪"]]} />
            <Field label="計酬（NT$）" id="payRate" type="number" placeholder="4500" />
          </div>
        </StepCard>
      );
      case 7: return (
        <StepCard title="服務同意書" desc="會員首次預約前需同意的條款">
          <Field label="同意書名稱" id="waiverName" />
          <div className="space-y-2">
            <Label htmlFor="waiverContent">同意書內容</Label>
            <Textarea id="waiverContent" rows={8} placeholder="本人了解養身療程涉及身體調理，並自願承擔參與風險..." value={f.waiverContent ?? ""} onChange={set("waiverContent")} />
            <p className="text-xs text-muted-foreground">會員預約前必須同意此條款。</p>
          </div>
        </StepCard>
      );
      case 8: return (
        <StepCard title="匯入既有資料" desc="從其他平台遷移會員、排程與方案">
          <p className="text-sm text-muted-foreground">若您有 Mindbody、Momence 或其他平台的資料，可立即匯入或稍後再處理。</p>
          <Button variant="outline" asChild>
            <Link to="/manage/import"><ExternalLink className="h-4 w-4 mr-2" />前往匯入工具</Link>
          </Button>
        </StepCard>
      );
      case 9: return (
        <StepCard title="串接 Stripe" desc="啟用線上收款功能">
          <div className="p-6 rounded-xl border-2 border-dashed border-border text-center">
            <CreditCard className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="text-sm font-semibold mt-3">連接 Stripe 帳戶</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">安全處理尊榮票券、次數方案與單次體驗付款。</p>
            <Button className="mt-4">連接 Stripe</Button>
          </div>
        </StepCard>
      );
      case 10: {
        const checklist = STEPS.slice(0, -1).map((s, i) => ({ label: s.label, ok: done.has(i) }));
        return (
          <StepCard title="準備上線" desc="確認設定完成後即可正式開放預約">
            <div className="space-y-2">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
                  {item.ok ? <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />}
                  <span className={`text-sm ${item.ok ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                  {item.ok && <Badge variant="outline" className="ml-auto text-xs">完成</Badge>}
                </div>
              ))}
            </div>
            <Separator />
            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground mb-4">已完成 {done.size} / {STEPS.length - 1} 個步驟</p>
              <Button size="lg" className="px-8" onClick={() => toast({ title: "工作室已上線！", description: "森浴光mm941 已準備好接受預約。" })}>
                <Rocket className="h-4 w-4 mr-2" />正式上線
              </Button>
            </div>
          </StepCard>
        );
      }
      default: return null;
    }
  };

  return (
    <ManageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">森浴光mm941 · 初始設定</h1>
          <p className="text-sm text-muted-foreground mt-1">完成以下步驟，開始接受預約</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Step indicator */}
          <div className="lg:w-64 shrink-0">
            <Card>
              <CardContent className="p-3">
                <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
                  {STEPS.map((s, i) => {
                    const isCurrent = i === step;
                    const isDone = done.has(i);
                    const Icon = s.icon;
                    return (
                      <button key={s.key} onClick={() => setStep(i)} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 lg:shrink lg:whitespace-normal w-full ${isCurrent ? "bg-primary text-primary-foreground shadow-sm" : isDone ? "text-foreground hover:bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                        <span className="shrink-0">{isDone && !isCurrent ? <Check className="h-4 w-4 text-primary" /> : <Icon className="h-4 w-4" />}</span>
                        <span className="hidden sm:inline text-xs lg:text-sm">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <div className="mt-3 px-1">
              <p className="text-xs text-muted-foreground">已完成 {done.size} / {STEPS.length - 1}</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(done.size / (STEPS.length - 1)) * 100}%` }} />
              </div>
            </div>
          </div>
          {/* Step content */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">步驟 {step + 1} / {STEPS.length}</Badge>
              {done.has(step) && <Badge className="text-xs bg-primary/10 text-primary border-primary/20">已完成</Badge>}
            </div>
            {renderStep()}
            {step < STEPS.length - 1 && (
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
                  <SkipForward className="h-4 w-4 mr-1.5" />稍後再說
                </Button>
                <Button onClick={handleSave} disabled={saving}>{saving ? "儲存中…" : "儲存並繼續"}<ChevronRight className="h-4 w-4 ml-1.5" /></Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ManageLayout>
  );
}

function StepCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
