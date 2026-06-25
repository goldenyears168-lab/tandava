import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { ClassTypeCard } from "@/components/ondemand/ClassTypeCard";
import { SubscriptionCard } from "@/components/ondemand/SubscriptionCard";
import { OnDemandClassCard } from "@/components/ondemand/OnDemandClassCard";
import type { VideoAccessType } from "@/components/ondemand/OnDemandClassCard";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Flame,
  Leaf,
  Moon,
  Zap,
  Heart,
  Wind,
  Search,
  X,
  Play,
  Clock,
  Star,
  Lock,
  Ticket,
  CreditCard,
  CheckCircle,
  Eye,
  ChevronRight,
} from "lucide-react";

// ── Demo data ──────────────────────────────────────────────────────────

type VideoStatus = "published" | "draft" | "processing" | "archived";

interface OnDemandClass {
  id: string;
  title: string;
  description: string;
  style: string;
  level: "BEGINNER" | "ALL" | "INTERMEDIATE" | "ADVANCED";
  teacher: { name: string; avatar?: string };
  duration: number;
  thumbnailUrl: string;
  progress: number;
  isCompleted?: boolean;
  accessType: VideoAccessType;
  price?: number;
  status: VideoStatus;
  viewCount: number;
  rating?: number;
}

const classTypes = [
  {
    id: "vinyasa",
    title: "Vinyasa 流動",
    description: "動態呼吸連結動作，建立熱量與力量",
    icon: Flame,
    color: "primary" as const,
    classCount: 48,
  },
  {
    id: "yin",
    title: "陰瑜伽與修復",
    description: "深度伸展與放鬆，提升柔軟度與平靜",
    icon: Moon,
    color: "lilac" as const,
    classCount: 32,
  },
  {
    id: "power",
    title: "力量瑜伽",
    description: "挑戰性序列，建立肌力與耐力",
    icon: Zap,
    color: "peach" as const,
    classCount: 24,
  },
  {
    id: "meditation",
    title: "冥想",
    description: "引導練習，培養正念與內在平靜",
    icon: Leaf,
    color: "mint" as const,
    classCount: 56,
  },
  {
    id: "breathwork",
    title: "呼吸法",
    description: "調息技巧，提升能量與減壓",
    icon: Wind,
    color: "lilac" as const,
    classCount: 18,
  },
  {
    id: "selfcare",
    title: "自我照護",
    description: "溫和練習，促進恢復與自我關懷",
    icon: Heart,
    color: "peach" as const,
    classCount: 28,
  },
];

const subscriptionOptions = [
  {
    type: "individual" as const,
    title: "單堂課程",
    price: 12,
    priceUnit: "堂",
    description: "單堂購買隨選課程",
    features: [
      "永久觀看單堂課程",
      "下載離線觀看",
      "追蹤學習進度",
    ],
  },
  {
    type: "studio" as const,
    title: "工作室通行證",
    price: 19,
    priceUnit: "月",
    description: "無限觀看單一工作室影片庫",
    features: [
      "單一工作室全部課程",
      "每週新增課程",
      "工作室獨家內容",
      "隨時取消",
    ],
  },
  {
    type: "series" as const,
    title: "系列套組",
    price: 49,
    priceUnit: "系列",
    description: "完整多堂課程計畫",
    features: [
      "完整計畫觀看權",
      "結構化學習路徑",
      "進度追蹤",
      "完成證書",
    ],
  },
  {
    type: "unlimited" as const,
    title: "無限方案",
    price: 29,
    priceUnit: "月",
    description: "所有內容、隨處觀看",
    features: [
      "所有工作室與老師",
      "完整隨選影片庫",
      "每日新增內容",
      "離線下載",
      "優先支援",
    ],
    isPopular: true,
  },
];

const onDemandClasses: OnDemandClass[] = [
  {
    id: "od1",
    title: "Morning Energy Flow",
    description:
      "Wake up your body and mind with this energizing vinyasa sequence. Flowing sun salutations build heat while standing balances sharpen focus. Perfect for starting your day with intention and strength.",
    style: "Vinyasa",
    level: "ALL",
    teacher: { name: "Maya Johnson" },
    duration: 30,
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    progress: 65,
    accessType: "members_only",
    status: "published",
    viewCount: 1247,
    rating: 4.8,
  },
  {
    id: "od2",
    title: "Deep Hip Opening",
    description:
      "A slow, deep yin practice focusing on the hips and lower back. Hold each pose for 3–5 minutes to release fascia and stored tension. Ideal for runners, desk workers, or anyone carrying stress in their hips.",
    style: "Yin",
    level: "BEGINNER",
    teacher: { name: "David Park" },
    duration: 45,
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    progress: 100,
    isCompleted: true,
    accessType: "free",
    status: "published",
    viewCount: 3892,
    rating: 4.9,
  },
  {
    id: "od3",
    title: "Power Hour Challenge",
    description:
      "An intense full-body power yoga class that will push your limits. Expect arm balances, deep backbends, and creative transitions. Bring a towel — you'll need it.",
    style: "Power",
    level: "ADVANCED",
    teacher: { name: "Alex Rivera" },
    duration: 60,
    thumbnailUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400",
    progress: 0,
    accessType: "purchase",
    price: 12,
    status: "published",
    viewCount: 2104,
    rating: 4.7,
  },
  {
    id: "od4",
    title: "Stress Relief Meditation",
    description:
      "A guided meditation using body scan and breathwork to melt away tension. No experience needed — just find a comfortable seat and let go. Great for anxiety, insomnia, or simply resetting your day.",
    style: "Meditation",
    level: "ALL",
    teacher: { name: "Emma Thompson" },
    duration: 15,
    thumbnailUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400",
    progress: 30,
    accessType: "free",
    status: "published",
    viewCount: 5621,
    rating: 4.9,
  },
  {
    id: "od5",
    title: "Evening Wind Down",
    description:
      "Gentle restorative poses supported by bolsters and blankets to calm the nervous system. This class is designed for the end of your day — dim the lights, slow down, and prepare for deep rest.",
    style: "Restorative",
    level: "ALL",
    teacher: { name: "Sarah Lee" },
    duration: 40,
    thumbnailUrl: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=400",
    progress: 0,
    accessType: "class_pack",
    status: "published",
    viewCount: 984,
    rating: 4.6,
  },
  {
    id: "od6",
    title: "Core Strength Flow",
    description:
      "Target your core with this focused vinyasa practice. Plank variations, boat pose progressions, and controlled transitions build deep abdominal and back strength. A strong core supports every other pose.",
    style: "Vinyasa",
    level: "INTERMEDIATE",
    teacher: { name: "Maya Johnson" },
    duration: 35,
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    progress: 0,
    accessType: "members_only",
    status: "published",
    viewCount: 756,
    rating: 4.5,
  },
];

// Demo user state – simulates what a logged-in member would have
const demoUserEntitlements = {
  hasMembership: true,
  classPackRemaining: 7,
  classPackTotal: 10,
  purchasedVideoIds: [] as string[],
};

// ── Helpers ────────────────────────────────────────────────────────────

function canPlayImmediately(
  video: OnDemandClass,
  entitlements: typeof demoUserEntitlements,
): boolean {
  if (video.accessType === "free") return true;
  if (video.accessType === "members_only" && entitlements.hasMembership) return true;
  if (entitlements.purchasedVideoIds.includes(video.id)) return true;
  if (video.progress > 0) return true; // already started = already entitled
  return false;
}

function getAccessCta(
  video: OnDemandClass,
  entitlements: typeof demoUserEntitlements,
): { label: string; variant: "default" | "outline" | "secondary"; action: "play" | "confirm_pack" | "confirm_purchase" | "subscribe" } {
  if (video.progress > 0) {
    return { label: "繼續觀看", variant: "default", action: "play" };
  }
  if (video.accessType === "free") {
    return { label: "播放 — 免費", variant: "default", action: "play" };
  }
  if (video.accessType === "members_only" && entitlements.hasMembership) {
    return { label: "播放 — 會員方案包含", variant: "default", action: "play" };
  }
  if (video.accessType === "members_only" && !entitlements.hasMembership) {
    return { label: "訂閱以取得觀看權限", variant: "outline", action: "subscribe" };
  }
  if (video.accessType === "class_pack") {
    if (entitlements.classPackRemaining > 0) {
      return { label: `使用 1 堂套票（剩餘 ${entitlements.classPackRemaining} 堂）`, variant: "outline", action: "confirm_pack" };
    }
    return { label: "購買套票", variant: "outline", action: "subscribe" };
  }
  if (video.accessType === "purchase") {
    return { label: `購買 $${video.price ?? 12}`, variant: "default", action: "confirm_purchase" };
  }
  if (video.accessType === "rental") {
    return { label: `租借 $${video.price ?? 5}`, variant: "default", action: "confirm_purchase" };
  }
  if (video.accessType === "subscription") {
    return { label: "訂閱以取得觀看權限", variant: "outline", action: "subscribe" };
  }
  return { label: "立即觀看", variant: "default", action: "play" };
}

// ── Component ──────────────────────────────────────────────────────────

const OnDemand = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<OnDemandClass | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"confirm_pack" | "confirm_purchase" | null>(null);
  const [entitlements, setEntitlements] = useState(demoUserEntitlements);

  // Only show published videos to students
  const publishedClasses = onDemandClasses.filter((c) => c.status === "published");

  const filteredClasses = publishedClasses.filter((c) => {
    const matchesType = !selectedType || c.style.toLowerCase() === selectedType;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.teacher.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Click a card → open detail/preview (not the player)
  const handleClassClick = (classItem: OnDemandClass) => {
    setSelectedClass(classItem);
    setIsDetailOpen(true);
  };

  // From the detail dialog, decide what to do with the CTA
  const handleCtaClick = () => {
    if (!selectedClass) return;
    const cta = getAccessCta(selectedClass, entitlements);

    switch (cta.action) {
      case "play":
        setIsDetailOpen(false);
        setIsPlayerOpen(true);
        break;
      case "confirm_pack":
        setConfirmAction("confirm_pack");
        setIsConfirmOpen(true);
        break;
      case "confirm_purchase":
        setConfirmAction("confirm_purchase");
        setIsConfirmOpen(true);
        break;
      case "subscribe":
        setIsDetailOpen(false);
        // Scroll to pricing section
        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
        toast({
          title: "選擇方案",
          description: "選擇會員方案或套票以觀看此課程。",
        });
        break;
    }
  };

  // Confirm purchase or pack usage
  const handleConfirm = () => {
    if (!selectedClass) return;

    if (confirmAction === "confirm_pack") {
      setEntitlements((prev) => ({
        ...prev,
        classPackRemaining: prev.classPackRemaining - 1,
      }));
      toast({
        title: "套票已使用",
        description: `已折抵 1 堂套票。剩餘 ${entitlements.classPackRemaining - 1} 堂。`,
      });
    } else if (confirmAction === "confirm_purchase") {
      setEntitlements((prev) => ({
        ...prev,
        purchasedVideoIds: [...prev.purchasedVideoIds, selectedClass.id],
      }));
      toast({
        title: "購買完成",
        description: `「${selectedClass.title}」已加入您的影片庫。`,
      });
    }

    setIsConfirmOpen(false);
    setIsDetailOpen(false);
    setIsPlayerOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="lilac" className="mb-4">隨選課程</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            隨時隨地練習
          </h1>
          <p className="text-lg text-muted-foreground">
            數百堂世界級老師的課程，進度同步於所有裝置。
          </p>
        </div>

        {/* Class Types Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">依風格探索</h2>
            {selectedType && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedType(null)}
                className="text-muted-foreground"
              >
                清除篩選
                <X className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {classTypes.map((type) => (
              <ClassTypeCard
                key={type.id}
                {...type}
                onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                isSelected={type.id === selectedType}
              />
            ))}
          </div>
        </section>

        {/* Tabs: Browse / My Library */}
        <Tabs defaultValue="browse" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="browse">瀏覽全部</TabsTrigger>
              <TabsTrigger value="continue">繼續觀看</TabsTrigger>
              <TabsTrigger value="saved">我的影片庫</TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋課程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <TabsContent value="browse" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredClasses.map((classItem) => (
                <OnDemandClassCard
                  key={classItem.id}
                  {...classItem}
                  onClick={() => handleClassClick(classItem)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="continue" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {publishedClasses
                .filter((c) => c.progress > 0 && !c.isCompleted)
                .map((classItem) => (
                  <OnDemandClassCard
                    key={classItem.id}
                    {...classItem}
                    onClick={() => handleClassClick(classItem)}
                  />
                ))}
            </div>
            {publishedClasses.filter((c) => c.progress > 0 && !c.isCompleted).length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">尚無進行中的課程</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {publishedClasses
                .filter((c) => c.isCompleted || entitlements.purchasedVideoIds.includes(c.id))
                .map((classItem) => (
                  <OnDemandClassCard
                    key={classItem.id}
                    {...classItem}
                    onClick={() => handleClassClick(classItem)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Subscription Options */}
        <section id="pricing-section" className="py-10 border-t">
          <div className="text-center mb-8">
            <Badge variant="mint" className="mb-4">價格方案</Badge>
            <h2 className="text-3xl font-bold mb-3">選擇觀看方式</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              從單堂購買到無限觀看 — 找到最適合您練習的方案。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {subscriptionOptions.map((option) => (
              <SubscriptionCard
                key={option.type}
                {...option}
                onSelect={() => toast({ title: "已選擇", description: `已選擇「${option.title}」，正在導向結帳...` })}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ── Video Detail / Preview Dialog ─────────────────────────────── */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedClass && (() => {
            const cta = getAccessCta(selectedClass, entitlements);
            return (
              <div className="space-y-6">
                {/* Thumbnail preview */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                  <img
                    src={selectedClass.thumbnailUrl}
                    alt={selectedClass.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                  {/* Duration overlay */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-foreground/80 text-background text-sm font-medium flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {selectedClass.duration} 分鐘
                  </div>

                  {/* Play teaser overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                      <Play className="h-8 w-8 text-foreground ml-1" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="lilac">{selectedClass.style}</Badge>
                    <Badge variant={
                      selectedClass.level === "BEGINNER" ? "mint" :
                      selectedClass.level === "INTERMEDIATE" ? "peach" :
                      selectedClass.level === "ADVANCED" ? "destructive" : "lilac"
                    }>
                      {selectedClass.level === "ALL" ? "各程度適合" : selectedClass.level === "BEGINNER" ? "初階" : selectedClass.level === "INTERMEDIATE" ? "中階" : selectedClass.level === "ADVANCED" ? "進階" : selectedClass.level.charAt(0) + selectedClass.level.slice(1).toLowerCase()}
                    </Badge>
                    {selectedClass.rating && (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {selectedClass.rating}
                      </span>
                    )}
                  </div>

                  <DialogHeader className="text-left p-0">
                    <DialogTitle className="text-2xl">{selectedClass.title}</DialogTitle>
                  </DialogHeader>

                  {/* Teacher */}
                  <div className="flex items-center gap-3 mt-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedClass.teacher.avatar} alt={selectedClass.teacher.name} />
                      <AvatarFallback className="text-xs bg-lilac text-foreground">
                        {selectedClass.teacher.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{selectedClass.teacher.name}</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1 ml-auto">
                      <Eye className="h-3.5 w-3.5" />
                      {selectedClass.viewCount.toLocaleString()} 次觀看
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {selectedClass.description}
                </p>

                {/* Access info bar */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border">
                  {selectedClass.accessType === "free" && (
                    <>
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">免費觀看</p>
                        <p className="text-xs text-muted-foreground">無需會員方案或購買。</p>
                      </div>
                    </>
                  )}
                  {selectedClass.accessType === "members_only" && entitlements.hasMembership && (
                    <>
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">會員方案包含</p>
                        <p className="text-xs text-muted-foreground">可無限次觀看。</p>
                      </div>
                    </>
                  )}
                  {selectedClass.accessType === "members_only" && !entitlements.hasMembership && (
                    <>
                      <Lock className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">僅限會員</p>
                        <p className="text-xs text-muted-foreground">訂閱工作室通行證或無限方案以觀看。</p>
                      </div>
                    </>
                  )}
                  {selectedClass.accessType === "class_pack" && entitlements.classPackRemaining > 0 && (
                    <>
                      <Ticket className="h-5 w-5 text-violet-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">使用套票中的 1 堂</p>
                        <p className="text-xs text-muted-foreground">
                          您還有 {entitlements.classPackRemaining} / {entitlements.classPackTotal} 堂可用。
                        </p>
                      </div>
                    </>
                  )}
                  {selectedClass.accessType === "class_pack" && entitlements.classPackRemaining <= 0 && (
                    <>
                      <Ticket className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">需要套票</p>
                        <p className="text-xs text-muted-foreground">購買套票以觀看此影片。</p>
                      </div>
                    </>
                  )}
                  {selectedClass.accessType === "purchase" && (
                    <>
                      <CreditCard className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">單次購買 — ${selectedClass.price ?? 12}</p>
                        <p className="text-xs text-muted-foreground">一次購買，永久觀看。可下載離線觀看。</p>
                      </div>
                    </>
                  )}
                  {selectedClass.accessType === "rental" && (
                    <>
                      <CreditCard className="h-5 w-5 text-rose-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">租借 ${selectedClass.price ?? 5}</p>
                        <p className="text-xs text-muted-foreground">購買後 48 小時內可觀看。</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Progress indicator if resuming */}
                {selectedClass.progress > 0 && !selectedClass.isCompleted && (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${selectedClass.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {selectedClass.progress}% 已完成
                    </span>
                  </div>
                )}

                {/* CTA */}
                <DialogFooter className="sm:justify-stretch">
                  <Button
                    onClick={handleCtaClick}
                    variant={cta.variant}
                    className="w-full text-base py-6"
                    size="lg"
                  >
                    {cta.action === "play" && <Play className="h-5 w-5 mr-2" />}
                    {cta.label}
                    {cta.action !== "play" && <ChevronRight className="h-5 w-5 ml-2" />}
                  </Button>
                </DialogFooter>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ── Purchase / Pack Confirmation Dialog ───────────────────────── */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-md">
          {selectedClass && confirmAction === "confirm_pack" && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle>使用套票？</DialogTitle>
              </DialogHeader>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-violet-50 border border-violet-200">
                <Ticket className="h-6 w-6 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{selectedClass.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    將從您的 {entitlements.classPackTotal} 堂套票中折抵 <span className="font-semibold">1 堂</span>。
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    折抵後剩餘：<span className="font-semibold">{entitlements.classPackRemaining - 1} 堂</span>
                  </p>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleConfirm}>
                  <Ticket className="h-4 w-4 mr-2" />
                  使用套票
                </Button>
              </DialogFooter>
            </div>
          )}
          {selectedClass && confirmAction === "confirm_purchase" && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle>
                  {selectedClass.accessType === "rental" ? "租借此課程？" : "購買此課程？"}
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <CreditCard className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">{selectedClass.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedClass.teacher.name} &middot; {selectedClass.duration} 分鐘
                  </p>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-2xl font-bold">${selectedClass.price ?? 12}</span>
                    {selectedClass.accessType === "rental" && (
                      <span className="text-sm text-muted-foreground">/ 48 小時租借</span>
                    )}
                    {selectedClass.accessType === "purchase" && (
                      <span className="text-sm text-muted-foreground">/ 永久擁有</span>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleConfirm}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  {selectedClass.accessType === "rental" ? "立即租借" : "立即購買"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Video Player Modal ────────────────────────────────────────── */}
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedClass && (
            <div>
              <VideoPlayer
                videoId={selectedClass.id}
                title={selectedClass.title}
                thumbnailUrl={selectedClass.thumbnailUrl}
                videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                duration={selectedClass.duration * 60}
                initialProgress={selectedClass.progress}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="lilac">{selectedClass.style}</Badge>
                  <Badge variant="mint">{selectedClass.level === "ALL" ? "各程度適合" : selectedClass.level === "BEGINNER" ? "初階" : selectedClass.level === "INTERMEDIATE" ? "中階" : selectedClass.level === "ADVANCED" ? "進階" : selectedClass.level.charAt(0) + selectedClass.level.slice(1).toLowerCase()}</Badge>
                </div>
                <h3 className="text-xl font-bold">{selectedClass.title}</h3>
                <p className="text-muted-foreground">
                  與 {selectedClass.teacher.name} · {selectedClass.duration} 分鐘
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default OnDemand;
