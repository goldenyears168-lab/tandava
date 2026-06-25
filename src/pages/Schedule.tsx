import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ClassCard } from "@/components/schedule/ClassCard";
import { WorkshopCard } from "@/components/schedule/WorkshopCard";
import { AppointmentCard } from "@/components/schedule/AppointmentCard";
import { RetreatCard } from "@/components/schedule/RetreatCard";
import { ClassDetailModal } from "@/components/schedule/ClassDetailModal";
import { BookingModal } from "@/components/booking/BookingModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Calendar,
  List,
  Search,
  SlidersHorizontal,
  X,
  Plane,
  Play,
} from "lucide-react";
import { EngagementNudge } from "@/components/EngagementNudge";
import {
  mockSpaClasses,
  mockSpaWorkshops,
  mockSpaAppointments,
  mockSpaRetreats,
  mockSpaOnDemand,
  spaScheduleFilters,
} from "@/data/demo/spa-ui-mocks";

const mockClasses = mockSpaClasses;
const mockWorkshops = mockSpaWorkshops;
const mockAppointments = mockSpaAppointments;
const mockRetreats = mockSpaRetreats;
const mockOnDemandClasses = mockSpaOnDemand;
const filters = spaScheduleFilters;

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<typeof mockClasses[0] | null>(null);
  const [classDetailOpen, setClassDetailOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [showOnDemand, setShowOnDemand] = useState(false);
  const [studioFilter, setStudioFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredClasses = mockClasses.filter((c) => {
    if (searchQuery && !c.title.includes(searchQuery) && !c.teacher.name.includes(searchQuery)) return false;
    if (studioFilter !== "all" && !c.location.includes(studioFilter)) return false;
    if (styleFilter !== "all" && c.style !== styleFilter) return false;
    if (levelFilter !== "all" && c.level !== levelFilter) return false;
    return true;
  });

  const handleBook = (id: string) => {
    const classItem = mockClasses.find(c => c.id === id);
    if (classItem) {
      setSelectedClass(classItem);
      setClassDetailOpen(true);
    }
  };

  const handleOpenBookingModal = () => {
    setClassDetailOpen(false);
    setBookingModalOpen(true);
  };

  const clearFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">服務表</h1>
          <p className="text-muted-foreground mt-1">
            瀏覽各館療程、工作坊、專人預約與靜修活動
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList className="grid w-full sm:w-auto grid-cols-4">
              <TabsTrigger value="classes" className="px-4">療程</TabsTrigger>
              <TabsTrigger value="workshops" className="px-4">工作坊</TabsTrigger>
              <TabsTrigger value="appointments" className="px-4">專人預約</TabsTrigger>
              <TabsTrigger value="retreats" className="px-4 gap-1">
                <Plane className="h-3.5 w-3.5" />
                靜修
              </TabsTrigger>
            </TabsList>

            {/* View toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "calendar" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setViewMode("calendar")}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋療程、美容師、館別..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select value={studioFilter} onValueChange={setStudioFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="館別" />
                </SelectTrigger>
                <SelectContent>
                  {filters.studios.map((studio) => (
                    <SelectItem key={studio.value} value={studio.value}>
                      {studio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={styleFilter} onValueChange={setStyleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="項目" />
                </SelectTrigger>
                <SelectContent>
                  {filters.styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="程度" />
                </SelectTrigger>
                <SelectContent>
                  {filters.levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={() => { setStudioFilter("all"); setStyleFilter("all"); setLevelFilter("all"); setSearchQuery(""); }}>
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* On-Demand Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-lilac/20 border border-lilac/30 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-lilac flex items-center justify-center">
                <Play className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <Label htmlFor="ondemand-toggle" className="font-semibold cursor-pointer">
                  包含隨選療程
                </Label>
                <p className="text-sm text-muted-foreground">
                  顯示可隨時觀看的居家保養指引影片
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="ondemand-toggle"
                checked={showOnDemand}
                onCheckedChange={setShowOnDemand}
              />
              <Link to="/on-demand">
                <Button variant="outline" size="sm">
                  瀏覽影片庫
                </Button>
              </Link>
            </div>
          </div>

          {/* Contextual nudge — pack running low */}
          <EngagementNudge
            type="pack_running_low"
            title="套票剩餘 2 次"
            message="續購或升級尊榮方案，不錯過任何一次療程。"
            actionLabel="查看方案"
            actionUrl="/account"
            context="10 次尊榮套票"
            className="mb-4"
          />

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="gap-1 pr-1">
                  {filter}
                  <button
                    onClick={() => clearFilter(filter)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => setActiveFilters([])}
              >
                清除全部
              </Button>
            </div>
          )}

          {/* Classes Tab */}
          <TabsContent value="classes" className="mt-0">
            {viewMode === "list" ? (
              <div className="space-y-4">
                {filteredClasses.map((classItem) => (
                  <ClassCard key={classItem.id} {...classItem} onBook={handleBook} />
                ))}
                {filteredClasses.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>沒有符合篩選條件的療程，請調整搜尋條件。</p>
                  </div>
                )}
                
                {/* On-Demand Classes Section */}
                {showOnDemand && (
                  <>
                    <div className="flex items-center gap-2 pt-4 pb-2">
                      <Badge variant="lilac" className="gap-1">
                        <Play className="h-3 w-3" />
                        隨選療程
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        隨時觀看，進度同步於所有裝置
                      </span>
                    </div>
                    {mockOnDemandClasses.map((classItem) => (
                      <Link
                        key={classItem.id}
                        to="/on-demand"
                        className="block rounded-2xl border bg-card p-4 shadow-card transition-all hover:shadow-card-hover"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={classItem.thumbnailUrl}
                              alt={classItem.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                              <Play className="h-6 w-6 text-background" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="lilac">隨選</Badge>
                              <Badge variant="mint">{classItem.style}</Badge>
                            </div>
                            <h3 className="font-semibold truncate">{classItem.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {classItem.teacher.name} · {classItem.duration} 分鐘
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>日曆檢視即將推出</p>
              </div>
            )}
          </TabsContent>

          {/* Workshops Tab */}
          <TabsContent value="workshops" className="mt-0">
            <div className="space-y-4">
              {mockWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} {...workshop} onBook={handleBook} />
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="mt-0">
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} {...appointment} onBook={handleBook} />
              ))}
            </div>
          </TabsContent>

          {/* Retreats Tab */}
          <TabsContent value="retreats" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              {mockRetreats.map((retreat) => (
                <RetreatCard key={retreat.id} {...retreat} onBook={handleBook} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Class Detail Modal */}
      <ClassDetailModal
        open={classDetailOpen}
        onOpenChange={setClassDetailOpen}
        classData={selectedClass}
        onBook={handleOpenBookingModal}
      />

      {/* Booking Modal */}
      {selectedClass && (
        <BookingModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
          booking={{
            id: selectedClass.id,
            type: "class",
            title: selectedClass.title,
            style: selectedClass.style,
            teacher: selectedClass.teacher.name,
            studio: selectedClass.studio.name,
            location: selectedClass.studio.location,
            dateTime: selectedClass.startTime,
            duration: selectedClass.duration,
            spotsLeft: selectedClass.spotsLeft,
            dropInPriceCents: 2500, // $25 drop-in
            cancellationMinutes: 120,
          }}
        />
      )}
    </AppLayout>
  );
};

export default Schedule;
