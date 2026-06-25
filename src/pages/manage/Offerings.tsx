import { useState } from "react";
import { ManageLayout } from "@/components/manage/ManageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  MoreHorizontal,
  Clock,
  Users,
  DollarSign,
  Flame,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface OfferingItem {
  id: string;
  name: string;
  style: string;
  level: string;
  duration: number;
  capacity: number;
  dropInPrice: number;
  isHeated: boolean;
  isActive: boolean;
  weeklySlots: number;
  avgAttendance: number;
}

const mockOfferings: OfferingItem[] = [
  { id: "1", name: "活化能量艙", style: "能量", level: "全館", duration: 90, capacity: 4, dropInPrice: 380000, isHeated: true, isActive: true, weeklySlots: 14, avgAttendance: 3.6 },
  { id: "2", name: "專業撥筋", style: "手技", level: "全館", duration: 60, capacity: 6, dropInPrice: 280000, isHeated: false, isActive: true, weeklySlots: 18, avgAttendance: 4.8 },
  { id: "3", name: "溫感能量光療", style: "光療", level: "全館", duration: 60, capacity: 6, dropInPrice: 320000, isHeated: false, isActive: true, weeklySlots: 12, avgAttendance: 4.2 },
  { id: "4", name: "負離子活罐", style: "活罐", level: "全館", duration: 75, capacity: 6, dropInPrice: 300000, isHeated: false, isActive: true, weeklySlots: 10, avgAttendance: 3.9 },
  { id: "5", name: "舒通筋脈", style: "手技", level: "全館", duration: 60, capacity: 6, dropInPrice: 260000, isHeated: false, isActive: true, weeklySlots: 11, avgAttendance: 4.1 },
  { id: "6", name: "能量艙＋撥筋", style: "組合", level: "全館", duration: 120, capacity: 4, dropInPrice: 580000, isHeated: true, isActive: true, weeklySlots: 8, avgAttendance: 3.2 },
  { id: "7", name: "光療＋活罐", style: "組合", level: "全館", duration: 90, capacity: 4, dropInPrice: 520000, isHeated: false, isActive: true, weeklySlots: 6, avgAttendance: 2.8 },
];

export default function OfferingsManage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOfferings = mockOfferings.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.style.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeOfferings = filteredOfferings.filter((o) => o.isActive);
  const inactiveOfferings = filteredOfferings.filter((o) => !o.isActive);

  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">服務項目</h1>
            <p className="text-sm text-muted-foreground mt-1">
              森浴光mm941 療程設定 — {mockOfferings.filter(o => o.isActive).length} 項使用中
            </p>
          </div>
          <Button size="sm" onClick={() => toast({ title: "新增療程", description: "療程設定表單已開啟。" })}>
            <Plus className="h-4 w-4 mr-2" />
            新增療程
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋療程..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Active Offerings */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">使用中療程</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOfferings.map((offering) => (
              <Card key={offering.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">{offering.name}</h3>
                        {offering.isHeated && (
                          <Flame className="h-3.5 w-3.5 text-destructive" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{offering.style}</Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{offering.level}</Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl">
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => toast({ title: "編輯模式", description: "Editing offering details." })}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => toast({ title: "Duplicated", description: "Offering duplicated as draft." })}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive" onClick={() => toast({ title: "Deactivated", description: "Offering has been deactivated." })}>Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{offering.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{offering.capacity} spots</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <span>${(offering.dropInPrice / 100).toFixed(0)} drop-in</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>{offering.weeklySlots}x/week</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Avg attendance</span>
                      <span className="text-xs font-semibold">
                        {offering.avgAttendance}/{offering.capacity}
                        <span className="text-muted-foreground ml-1">
                          ({Math.round((offering.avgAttendance / offering.capacity) * 100)}%)
                        </span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.round((offering.avgAttendance / offering.capacity) * 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Inactive Offerings */}
        {inactiveOfferings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">未啟用</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveOfferings.map((offering) => (
                <Card key={offering.id} className="opacity-60">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{offering.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">{offering.style}</Badge>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">未啟用</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => toast({ title: "Reactivated", description: "Offering has been reactivated." })}>Reactivate</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ManageLayout>
  );
}
