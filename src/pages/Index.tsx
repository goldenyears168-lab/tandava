import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OXATL_STUDIO,
  OXATL_LOCATIONS,
  OXATL_TEACHERS,
  OXATL_CLASS_TYPES,
  OXATL_SCHEDULE,
} from "@/data/demo";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
  Flame,
  Monitor,
  MapPinned,
  Filter,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

// Build today's schedule from demo data
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
const today = DAYS[new Date().getDay()];

function formatTime(time: string) {
  const [h, m] = time.split(":");
  return `${h}:${m}`;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Get unique styles from class types
const allStyles = OXATL_CLASS_TYPES.map((ct) => ct.name);

const Index = () => {
  const { profile } = useAuth();
  const isLoggedIn = !!profile;

  // Filter state
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [classMode, setClassMode] = useState<"all" | "in-person" | "virtual">("all");

  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  // Build & filter today's classes
  const todaysClasses = useMemo(() => {
    return OXATL_SCHEDULE
      .filter((slot) => slot.day === today)
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((slot) => {
        const classType = OXATL_CLASS_TYPES.find((c) => c.id === slot.class_type_id);
        const teacher = OXATL_TEACHERS.find((t) => t.profile.id === slot.teacher_id);
        const location = OXATL_LOCATIONS.find((l) => l.id === slot.location_id);
        return { ...slot, classType, teacher, location };
      })
      .filter((cls) => {
        // Only show upcoming classes (haven't ended yet)
        const classEndMinutes = timeToMinutes(cls.time) + (cls.classType?.duration_minutes ?? 60);
        if (classEndMinutes < nowMinutes) return false;

        // Location filter
        if (selectedLocations.length > 0 && cls.location) {
          if (!selectedLocations.includes(cls.location.id)) return false;
        }

        // Style filter
        if (selectedStyle !== "all" && cls.classType) {
          if (cls.classType.name !== selectedStyle) return false;
        }

        // Mode filter (demo doesn't have delivery_mode on schedule, simulate based on location)
        if (classMode === "virtual" && cls.location?.name !== "Online") return false;
        if (classMode === "in-person" && cls.location?.name === "Online") return false;

        return true;
      });
  }, [selectedLocations, selectedStyle, classMode, nowMinutes]);

  const toggleLocation = (locId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locId) ? prev.filter((id) => id !== locId) : [...prev, locId]
    );
  };

  const featuredTeachers = OXATL_TEACHERS.slice(0, 6);

  return (
    <AppLayout>
      <SEOHead
        title={`${OXATL_STUDIO.name} | 活化能量艙・專業撥筋・溫感光療`}
        description={OXATL_STUDIO.description}
        canonical="/"
        structuredData={[organizationSchema(), websiteSchema()]}
      />
      <div className="space-y-10">
        {/* ---- Compact Hero ---- */}
        <section className="relative rounded-2xl overflow-hidden p-6 md:p-10">
          <img
            src="https://readdy.ai/api/search-image?query=Warm%20zen%20spa%20interior%20with%20soft%20amber%20lighting%2C%20wooden%20elements%2C%20diffused%20natural%20light%2C%20minimalist%20Japanese%20inspired%20wellness%20space%2C%20steam%20atmosphere%2C%20bamboo%20accents%2C%20peaceful%20healing%20sanctuary%2C%20luxurious%20yet%20earthy%20design%2C%20editorial%20interior%20photography%2C%20warm%20brown%20and%20cream%20tones&width=1600&height=900&seq=hero-spa-zen-interior&orientation=landscape"
            alt="森浴光mm941 療癒空間"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/60" />
          <div className="max-w-2xl relative z-10">
            <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-2 text-white">
              {OXATL_STUDIO.name}
            </h1>
            <p className="text-white/80 mb-5 leading-relaxed">
              {OXATL_STUDIO.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/schedule">
                  <Calendar className="h-5 w-5 mr-2" />
                  預約服務
                </Link>
              </Button>
              {!isLoggedIn && (
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth/register">
                    立即開始
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              )}
              {isLoggedIn && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-sage/15 text-accent-sage text-sm font-medium">
                  <Flame className="h-4 w-4" />
                  <span>連續 8 次造訪</span>
                  <span className="text-muted-foreground">·</span>
                  <Link to="/community" className="hover:underline">
                    本月第 4 名
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---- Today's Schedule with Filters ---- */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">今日服務</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {new Date().toLocaleDateString("zh-TW", { weekday: "long", month: "long", day: "numeric" })}
                {" · "}
                {todaysClasses.length} 項即將開始
              </p>
            </div>
            <Link
              to="/schedule"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              完整服務表
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* Location multi-select toggles */}
            <div className="flex items-center gap-1.5">
              <MapPinned className="h-3.5 w-3.5 text-muted-foreground" />
              {OXATL_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => toggleLocation(loc.id)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-full border transition-colors",
                    selectedLocations.includes(loc.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/50 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            {/* Style filter */}
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <Filter className="h-3 w-3 mr-1" />
                <SelectValue placeholder="風格" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部風格</SelectItem>
                {allStyles.map((style) => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* In-person / Virtual toggle */}
            <div className="flex rounded-full border border-border overflow-hidden text-xs">
              {(["all", "in-person", "virtual"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setClassMode(mode)}
                  className={cn(
                    "px-3 py-1 font-medium transition-colors capitalize",
                    classMode === mode
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {mode === "virtual" && <Monitor className="h-3 w-3 inline mr-1" />}
                  {mode === "all" ? "全部" : mode === "in-person" ? "實體課程" : "線上課程"}
                </button>
              ))}
            </div>
          </div>

          {/* Class list */}
          {todaysClasses.length > 0 ? (
            <div className="grid gap-2">
              {todaysClasses.map((cls, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="text-center min-w-[52px] sm:min-w-[60px]">
                        <p className="text-sm font-semibold">{formatTime(cls.time)}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {cls.classType?.duration_minutes} 分鐘
                        </p>
                      </div>
                      <div
                        className="w-1 h-9 rounded-full shrink-0"
                        style={{ backgroundColor: cls.classType?.color || "#888" }}
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/schedule?style=${encodeURIComponent(cls.classType?.name ?? "")}`}
                          className="font-medium hover:text-primary transition-colors text-sm"
                        >
                          {cls.classType?.name}
                        </Link>
                        <p className="text-xs text-muted-foreground truncate">
                          <Link
                            to={`/instructors`}
                            className="hover:text-foreground transition-colors"
                          >
                            {cls.teacher?.profile.display_name}
                          </Link>
                          {" · "}
                          {cls.location?.name}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="shrink-0 ml-2">
                      <Link to="/schedule">預約</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                {selectedLocations.length > 0 || selectedStyle !== "all" || classMode !== "all"
                  ? "沒有符合篩選條件的服務，請調整篩選項目。"
                  : "今日已無更多可預約時段，請查看完整服務表。"}
              </CardContent>
            </Card>
          )}
        </section>

        {/* ---- What We Offer ---- */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">服務項目</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {OXATL_CLASS_TYPES.map((ct) => (
              <Link
                key={ct.id}
                to={`/schedule?style=${encodeURIComponent(ct.name)}`}
                className="group"
              >
                <Card className="hover:border-primary/30 transition-colors h-full">
                  <CardContent className="p-4">
                    <div
                      className="w-3 h-3 rounded-full mb-2"
                      style={{ backgroundColor: ct.color }}
                    />
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{ct.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{ct.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ct.duration_minutes} 分鐘
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ---- Our Teachers ---- */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">專業團隊</h2>
            <Link
              to="/instructors"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              認識團隊
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featuredTeachers.map((teacher) => {
              const teacherImages: Record<string, string> = {
                'teacher-beyonce-pangolin': 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20wellness%20practitioner%20portrait%2C%20warm%20earthy%20studio%20lighting%2C%20calm%20confident%20expression%2C%20natural%20makeup%2C%20spa%20setting%20background%2C%20soft%20focus%2C%20professional%20headshot%20style&width=200&height=200&seq=avatar-teacher-01&orientation=squarish',
                'teacher-adele-capybara': 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20spa%20therapist%20portrait%2C%20serene%20peaceful%20expression%2C%20gentle%20smile%2C%20soft%20natural%20lighting%2C%20minimalist%20wellness%20studio%20background%2C%20warm%20beige%20tones%2C%20professional%20headshot&width=200&height=200&seq=avatar-teacher-02&orientation=squarish',
                'teacher-rihanna-quokka': 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20bodywork%20specialist%20portrait%2C%20bright%20confident%20smile%2C%20warm%20studio%20lighting%2C%20clean%20minimalist%20backdrop%2C%20professional%20headshot%20style%2C%20cream%20and%20wood%20tones&width=200&height=200&seq=avatar-teacher-03&orientation=squarish',
                'teacher-taylor-otter': 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20wellness%20expert%20portrait%2C%20gentle%20warm%20expression%2C%20soft%20diffused%20lighting%2C%20zen%20studio%20background%2C%20natural%20minimalist%20aesthetic%2C%20professional%20headshot&width=200&height=200&seq=avatar-teacher-04&orientation=squarish',
                'teacher-ariana-hedgehog': 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20spa%20practitioner%20portrait%2C%20focused%20calm%20expression%2C%20warm%20golden%20lighting%2C%20modern%20wellness%20center%20background%2C%20clean%20professional%20look%2C%20headshot%20style&width=200&height=200&seq=avatar-teacher-05&orientation=squarish',
                'teacher-dua-axolotl': 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20bodywork%20therapist%20portrait%2C%20warm%20friendly%20smile%2C%20natural%20soft%20lighting%2C%20spa%20treatment%20room%20background%2C%20earthy%20tones%2C%20professional%20headshot%20style&width=200&height=200&seq=avatar-teacher-06&orientation=squarish',
              };
              return (
              <Link
                key={teacher.profile.id}
                to={`/instructors`}
                className="group"
              >
                <Card className="hover:border-primary/30 transition-colors h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={teacherImages[teacher.profile.id]} alt={teacher.profile.display_name} />
                      <AvatarFallback className="text-xs font-medium">
                        {teacher.profile.first_name?.[0]}
                        {teacher.profile.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">
                        {teacher.profile.display_name}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {teacher.specialties.slice(0, 2).map((s) => (
                          <Badge key={s} variant="secondary" className="text-[10px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{teacher.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
            })}
          </div>
        </section>

        {/* ---- Pricing ---- */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">價目與方案</h2>
          <p className="text-sm text-muted-foreground mb-4">預約制 · 每日 09:30–22:00 · 詳細價目請參考<a href="https://www.1314mm941.com.tw/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">官網價目表</a></p>
          <div className="grid sm:grid-cols-3 gap-3">
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">單次療程</p>
                <p className="text-3xl font-bold">預約諮詢</p>
                <p className="text-xs text-muted-foreground mt-1">依項目計價</p>
                <Button variant="outline" className="mt-3 w-full" size="sm" asChild>
                  <Link to="/schedule">預約服務</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-primary/50 hover:border-primary transition-colors relative">
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">最受歡迎</Badge>
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">尊榮會員票券</p>
                <p className="text-3xl font-bold">熱銷中</p>
                <p className="text-xs text-muted-foreground mt-1">多館通用</p>
                <Button className="mt-3 w-full" size="sm" asChild>
                  <Link to={isLoggedIn ? "/account" : "/auth/register"}>
                    {isLoggedIn ? "管理會員方案" : "開始會員方案"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">療程組合</p>
                <p className="text-3xl font-bold">能量加乘</p>
                <p className="text-xs text-muted-foreground mt-1">艙＋撥筋 / 光療＋活罐</p>
                <Button variant="outline" className="mt-3 w-full" size="sm" asChild>
                  <Link to={isLoggedIn ? "/account" : "/auth/register"}>
                    {isLoggedIn ? "購買套票" : "立即開始"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ---- Locations with Image Placeholders ---- */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">分店資訊</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OXATL_LOCATIONS.map((loc, idx) => {
              const locationImages: Record<string, string> = {
                'loc-xizhi': 'https://readdy.ai/api/search-image?query=Modern%20spa%20treatment%20room%20near%20mountains%2C%20large%20windows%20with%20forest%20view%2C%20warm%20wooden%20interior%2C%20soft%20natural%20lighting%2C%20minimalist%20wellness%20space%2C%20healing%20atmosphere%2C%20cozy%20and%20inviting%2C%20earthy%20brown%20and%20cream%20tones%2C%20editorial%20interior%20photography&width=800&height=400&seq=location-xizhi-spa&orientation=landscape',
                'loc-fuxing': 'https://readdy.ai/api/search-image?query=Luxury%20urban%20spa%20treatment%20room%20in%20Taipei%2C%20elegant%20minimalist%20design%2C%20soft%20warm%20lighting%2C%20marble%20and%20wood%20accents%2C%20professional%20wellness%20setting%2C%20peaceful%20city%20retreat%2C%20cream%20and%20beige%20tones%2C%20editorial%20interior%20photography&width=800&height=400&seq=location-fuxing-spa&orientation=landscape',
                'loc-east': 'https://readdy.ai/api/search-image?query=Contemporary%20wellness%20spa%20room%20with%20infrared%20therapy%20equipment%2C%20clean%20modern%20design%2C%20warm%20indirect%20lighting%2C%20wooden%20floor%2C%20minimalist%20aesthetic%2C%20healing%20and%20relaxing%20atmosphere%2C%20cream%20and%20warm%20beige%20tones%2C%20editorial%20interior%20photography&width=800&height=400&seq=location-east-spa&orientation=landscape',
                'loc-central': 'https://readdy.ai/api/search-image?query=Zen%20inspired%20spa%20room%20with%20indoor%20garden%20elements%2C%20bamboo%20and%20stone%20accents%2C%20soft%20diffused%20lighting%2C%20peaceful%20wellness%20sanctuary%2C%20warm%20wood%20interior%2C%20Japanese%20minimalist%20design%2C%20cream%20and%20muted%20green%20tones%2C%20editorial%20interior%20photography&width=800&height=400&seq=location-central-spa&orientation=landscape',
                'loc-tainan': 'https://readdy.ai/api/search-image?query=Warm%20tropical%20spa%20treatment%20room%20with%20natural%20textures%2C%20rattan%20and%20wood%20elements%2C%20soft%20golden%20lighting%2C%20relaxing%20wellness%20atmosphere%2C%20airy%20and%20spacious%2C%20Southern%20Taiwan%20vibe%2C%20cream%20and%20terracotta%20tones%2C%20editorial%20interior%20photography&width=800&height=400&seq=location-tainan-spa&orientation=landscape',
              };
              return (
                <Card key={loc.id} className="hover:border-primary/30 transition-colors overflow-hidden">
                  <div className="h-40 relative overflow-hidden">
                    <img
                      src={locationImages[loc.id]}
                      alt={`${loc.name} 空間環境`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2">{loc.name}</h3>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <p className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>
                          {loc.address_line1}
                          {loc.address_line2 ? (
                            <>
                              <br />
                              <span className="text-muted-foreground/80">{loc.address_line2}</span>
                            </>
                          ) : null}
                          <br />
                          預約專線 {loc.phone}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {loc.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        {loc.rooms.map((r) => r.name).join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ---- CTA (only if not logged in) ---- */}
        {!isLoggedIn && (
          <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">準備預約您的療程了嗎？</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto">
              讓身體重新定義舒爽，讓靈魂再次發光。預約制，每日 09:30–22:00 為您服務。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/schedule">
                  <Calendar className="h-5 w-5 mr-2" />
                  瀏覽服務
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`mailto:${OXATL_STUDIO.email}`}>
                  <Mail className="h-5 w-5 mr-2" />
                  聯絡我們
                </a>
              </Button>
            </div>
          </section>
        )}

        {/* Logged-in footer CTA */}
        {isLoggedIn && (
          <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center">
            <p className="text-muted-foreground mb-3">
              有任何問題？我們期待您的來信。
            </p>
            <Button asChild variant="outline">
              <a href={`mailto:${OXATL_STUDIO.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                聯絡 {OXATL_STUDIO.name}
              </a>
            </Button>
          </section>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
