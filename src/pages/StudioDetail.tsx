import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  EventRegistrationPanel,
  type EventPricingTierLite,
  type EventSessionLite,
} from "@/components/events/EventRegistrationPanel";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  Share2,
  Heart,
  Sparkles,
  GraduationCap,
  Tent,
  Layers,
  Star,
  CheckCircle2,
  User,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────
interface EventDetail {
  id: string;
  title: string;
  type: "workshop" | "training" | "event" | "retreat" | "series";
  description: string;
  longDescription: string;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  isMultiSession: boolean;
  sessionCount: number;
  sessions?: { date: string; time: string; topic: string }[];
  teacher: { name: string; bio: string; avatar: string };
  location: string;
  locationDetail: string;
  priceCents: number;
  memberPriceCents: number | null;
  earlyBirdCents: number | null;
  earlyBirdEndsAt: string | null;
  capacity: number;
  spotsLeft: number;
  tags: string[];
  whatToBring: string[];
  requirements: string[];
  status?: string;
  waitlistEnabled?: boolean;
  registrationOpensAt?: string | null;
  registrationClosesAt?: string | null;
  pricingTiers?: EventPricingTierLite[];
  depositCents?: number | null;
}

const typeConfig: Record<string, { icon: typeof Calendar; label: string; color: string }> = {
  workshop: { icon: Sparkles, label: "工作坊", color: "bg-accent-teal/15 text-accent-teal border-accent-teal/30" },
  training: { icon: GraduationCap, label: "培訓", color: "bg-accent-gold/15 text-accent-gold border-accent-gold/30" },
  event: { icon: Star, label: "特別活動", color: "bg-accent-coral/15 text-accent-coral border-accent-coral/30" },
  retreat: { icon: Tent, label: "靜修營", color: "bg-accent-lilac/15 text-accent-lilac border-accent-lilac/30" },
  series: { icon: Layers, label: "系列課程", color: "bg-accent-sage/15 text-accent-sage border-accent-sage/30" },
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

// ── Mock event detail data ─────────────────────────────────────────
const eventsData: Record<string, EventDetail> = {
  ev1: {
    id: "ev1",
    title: "倒立與手臂平衡工作坊",
    type: "workshop",
    description: "透過漸進式練習、夥伴輔助與牆面訓練，建立倒立與手臂平衡的信心。",
    longDescription: "這堂三小時的工作坊專為想深化倒立與手臂平衡練習的學員設計。無論您正在練習第一個烏鴉式，還是想精進手倒立，Maya 都會帶領您進行建立力量、本體感覺與信心的漸進式訓練。\n\n工作坊包含夥伴輔助練習（會妥善分組）、牆面對位訓練，以及烏鴉式、側烏鴉、前臂倒立與頭倒立變化的詳細拆解。結束時您將帶回個人化的回家練習計畫。",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    startsAt: "2026-02-21T10:00:00",
    endsAt: "2026-02-21T13:00:00",
    isMultiSession: false,
    sessionCount: 1,
    teacher: {
      name: "Maya Rodriguez",
      bio: "E-RYT 500，擁有 15 年以上教學經驗。以讓各種身形的學員都能安全練習手臂平衡與倒立而聞名。",
      avatar: "",
    },
    location: "主教室",
    locationDetail: "94103 舊金山 Valencia St 142 號 2 樓",
    priceCents: 7500,
    memberPriceCents: 6500,
    earlyBirdCents: 6000,
    earlyBirdEndsAt: "2026-02-14",
    capacity: 25,
    spotsLeft: 6,
    tags: ["倒立", "手臂平衡", "所有程度"],
    whatToBring: ["自備瑜珈墊", "水壺", "小毛巾", "倒立時不易滑動的舒適服裝"],
    requirements: ["建議有 6 個月以上規律瑜珈練習", "無需倒立經驗"],
  },
  ev2: {
    id: "ev2",
    title: "200 小時瑜珈師資培訓",
    type: "training",
    description: "獲 Yoga Alliance 認證的完整師資培訓。",
    longDescription: "我們的 200 小時師資培訓是深入探索瑜珈教學藝術與科學的沉浸式課程。在 12 個週末中，您將建立體位、解剖、哲學、排課與教學方法的紮實基礎。\n\n由 Sarah Chen（E-RYT 500、YACEP）與 James Park（E-RYT 200、C-IAYT）帶領，本計畫已註冊 Yoga Alliance，畢業生可登記為 RYT-200。小班制確保個人化指導。",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    startsAt: "2026-03-07T08:00:00",
    endsAt: "2026-06-13T17:00:00",
    isMultiSession: true,
    sessionCount: 12,
    sessions: [
      { date: "3/7-8", time: "上午 8 點 — 下午 5 點", topic: "基礎與體位 I" },
      { date: "3/21-22", time: "上午 8 點 — 下午 5 點", topic: "解剖與生理" },
      { date: "4/4-5", time: "上午 8 點 — 下午 5 點", topic: "體位 II 與對位" },
      { date: "4/18-19", time: "上午 8 點 — 下午 5 點", topic: "瑜珈哲學" },
      { date: "5/2-3", time: "上午 8 點 — 下午 5 點", topic: "排課與口令" },
      { date: "5/16-17", time: "上午 8 點 — 下午 5 點", topic: "教學實習" },
    ],
    teacher: {
      name: "Sarah Chen & James Park",
      bio: "Sarah 為 E-RYT 500 與 YACEP，擁有 20 年以上練習經驗。James 為 E-RYT 200、C-IAYT，專精瑜珈療癒與解剖。",
      avatar: "",
    },
    location: "主教室",
    locationDetail: "94103 舊金山 Valencia St 142 號 2 樓",
    priceCents: 350000,
    memberPriceCents: 320000,
    earlyBirdCents: 299900,
    earlyBirdEndsAt: "2026-02-21",
    capacity: 15,
    spotsLeft: 4,
    tags: ["師資培訓", "認證", "Yoga Alliance"],
    whatToBring: ["瑜珈墊", "筆記本與筆", "解剖著色本（由主辦方提供）", "開放的心"],
    requirements: ["1 年以上規律瑜珈練習", "需簡短申請與面談", "提供分期付款方案"],
    waitlistEnabled: true,
    depositCents: 50000,
    pricingTiers: [
      {
        id: "full",
        name: "完整培訓（含認證）",
        description: "全部 12 個週末 · 符合 RYT-200 資格",
        priceCents: 350000,
        memberPriceCents: 320000,
        includesSessions: [],
      },
      {
        id: "audit",
        name: "基礎旁聽",
        description: "前 3 個週末 · 不含認證",
        priceCents: 95000,
        memberPriceCents: 85000,
        includesSessions: [1, 2, 3],
      },
    ],
  },
  ev3: {
    id: "ev3",
    title: "音療與冥想之夜",
    type: "event",
    description: "沉浸在水晶缽、鑼與風鈴的聲音中。",
    longDescription: "在輔具支撐的修復式姿勢中安頓下來，讓聲音環繞全身。Luna Patel 以對應脈輪調音的水晶缽、西藏鑼、風鈴與雨聲棒，帶領這個深度放鬆的夜晚。\n\n活動以 15 分鐘引導冥想開場，幫助您抵達並安定，接著 45 分鐘純粹的音聲沉浸。提供抱枕、毛毯與眼枕。許多參與者回報深度放鬆與睡眠品質提升。",
    imageUrl: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&q=80",
    startsAt: "2026-02-28T19:00:00",
    endsAt: "2026-02-28T21:00:00",
    isMultiSession: false,
    sessionCount: 1,
    teacher: {
      name: "Luna Patel",
      bio: "認證音療師與冥想老師。Luna 曾於印度、尼泊爾與峇里島向大師學習。",
      avatar: "",
    },
    location: "冥想室",
    locationDetail: "94103 舊金山 Valencia St 142 號 1 樓",
    priceCents: 4500,
    memberPriceCents: 3500,
    earlyBirdCents: null,
    earlyBirdEndsAt: null,
    capacity: 40,
    spotsLeft: 6,
    tags: ["音療", "冥想", "放鬆"],
    whatToBring: ["舒適服裝", "選配：自備毛毯或枕頭"],
    requirements: ["無需任何經驗", "請提前 10 分鐘到場安頓"],
  },
};

// Fallback for IDs not in eventsData
const fallbackEvent: EventDetail = eventsData.ev1;

// ── Component ──────────────────────────────────────────────────────
const EventDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const event = (id && eventsData[id]) || fallbackEvent;
  const cfg = typeConfig[event.type] ?? typeConfig.event;
  const TypeIcon = cfg.icon;
  const startDate = new Date(event.startsAt);
  const endDate = new Date(event.endsAt);
  const spotsLow = event.spotsLeft <= 5;

  // Map the event's sessions into the panel's shape (numbered, for partial series).
  const panelSessions: EventSessionLite[] = (event.sessions ?? []).map((s, i) => ({
    session_number: i + 1,
    title: s.topic,
    dateLabel: s.date,
    timeLabel: s.time,
  }));

  const handleRegister = (sel: {
    dueNowCents: number;
    paymentOption: "full" | "deposit";
    isWaitlist: boolean;
    sessionNumbers: number[];
  }) => {
    if (sel.isWaitlist) {
      toast({ title: "已加入候補", description: "有名額釋出時我們會通知您。" });
      return;
    }
    const sessionNote = sel.sessionNumbers.length && sel.sessionNumbers.length < panelSessions.length
      ? ` · ${sel.sessionNumbers.length} 堂`
      : "";
    const depositNote = sel.paymentOption === "deposit" ? " 訂金" : "";
    toast({
      title: "開始報名",
      description: `正在開啟 ${formatPrice(sel.dueNowCents)}${depositNote}${sessionNote} 的結帳流程…`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          to="/events"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          返回活動列表
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-xl overflow-hidden aspect-[3/1]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Actions overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => toast({ title: "已複製連結", description: "活動連結已複製到剪貼簿。" })}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Event info overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${cfg.color} border`}>
                <TypeIcon className="h-3 w-3 mr-1" />
                {cfg.label}
              </Badge>
              {spotsLow && (
                <Badge className="bg-accent-coral/90 text-white border-none">
                  僅剩 {event.spotsLeft} 名額
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">{event.title}</h1>
            <p className="text-sm opacity-80 mt-1">{event.description}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div>
              <h2 className="text-lg font-semibold mb-3">關於此{cfg.label}</h2>
              {event.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted-foreground mb-3">{para}</p>
              ))}
            </div>

            <Separator />

            {/* Sessions (multi-session events) */}
            {event.isMultiSession && event.sessions && (
              <>
                <div>
                  <h2 className="text-lg font-semibold mb-3">課程表（{event.sessionCount} 堂）</h2>
                  <div className="space-y-2">
                    {event.sessions.map((session, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{session.topic}</p>
                          <p className="text-xs text-muted-foreground">{session.date} &middot; {session.time}</p>
                        </div>
                      </div>
                    ))}
                    {event.sessions.length < event.sessionCount && (
                      <p className="text-xs text-muted-foreground pl-12">
                        另有 {event.sessionCount - event.sessions.length} 堂
                      </p>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Teacher */}
            <div>
              <h2 className="text-lg font-semibold mb-3">講師</h2>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-lilac/20 text-accent-lilac shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{event.teacher.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{event.teacher.bio}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* What to bring */}
            {event.whatToBring.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">攜帶物品</h2>
                <ul className="space-y-2">
                  {event.whatToBring.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent-sage shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {event.requirements.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">報名條件</h2>
                <ul className="space-y-2">
                  {event.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-accent-gold shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column — Registration */}
          <div className="space-y-4">
            <EventRegistrationPanel
              regularCents={event.priceCents}
              memberCents={event.memberPriceCents}
              earlyBirdCents={event.earlyBirdCents}
              earlyBirdEndsAt={event.earlyBirdEndsAt}
              status={event.status}
              registrationOpensAt={event.registrationOpensAt}
              registrationClosesAt={event.registrationClosesAt}
              capacity={event.capacity}
              spotsLeft={event.spotsLeft}
              waitlistEnabled={event.waitlistEnabled}
              sessions={panelSessions}
              tiers={event.pricingTiers}
              depositCents={event.depositCents}
              showMemberToggle
              onRegister={handleRegister}
            />

            <Card>
              <CardContent className="p-5 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">
                      {startDate.toLocaleDateString("zh-TW", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    {event.isMultiSession && (
                      <p className="text-muted-foreground">
                        至 {endDate.toLocaleDateString("zh-TW", { month: "long", day: "numeric" })} · {event.sessionCount} 堂
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p>
                    {startDate.toLocaleTimeString("zh-TW", { hour: "numeric", minute: "2-digit" })}
                    {" — "}
                    {endDate.toLocaleTimeString("zh-TW", { hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-muted-foreground">{event.locationDetail}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EventDetailPage;
