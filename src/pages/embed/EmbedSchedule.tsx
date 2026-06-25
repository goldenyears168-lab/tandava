import { useParams } from "react-router-dom";
import { EmbedLayout, openHosted } from "./EmbedLayout";
import { usePublicSchedule } from "@/hooks/useBooking";
import { isBackendConfigured } from "@/lib/backend";
import { Clock, MapPin } from "lucide-react";

interface Row {
  id: string;
  name: string;
  when: string;
  location?: string;
  spotsLeft: number;
}

// Shown only in demo mode (no backend) so the widget renders for previews.
const DEMO_ROWS: Row[] = [
  { id: "d1", name: "能量流瑜珈", when: "今天 · 下午 6:00", location: "主教室", spotsLeft: 4 },
  { id: "d2", name: "溫和修復瑜珈", when: "明天 · 上午 9:00", location: "冥想室", spotsLeft: 12 },
  { id: "d3", name: "熱哈達瑜珈", when: "明天 · 下午 5:30", location: "熱瑜珈教室", spotsLeft: 0 },
  { id: "d4", name: "日出流瑜珈", when: "週三 · 上午 6:30", location: "主教室", spotsLeft: 8 },
];

// Render class times in the STUDIO's timezone, not the visitor's browser zone.
function formatWhen(iso: string, timeZone: string): string {
  try {
    return new Date(iso).toLocaleString("zh-TW", {
      timeZone,
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return new Date(iso).toLocaleString("zh-TW", { weekday: "short", hour: "numeric", minute: "2-digit" });
  }
}

export default function EmbedSchedule() {
  const { slug } = useParams();
  const live = isBackendConfigured();
  const { data: schedule, isLoading } = usePublicSchedule(slug);

  // Live deployment: use real data (and a real empty state). Demo: sample rows.
  const studioName = schedule?.[0]?.studio_name;
  const rows: Row[] = live
    ? (schedule ?? []).map((r) => ({
        id: r.occurrence_id,
        name: r.offering_name,
        when: formatWhen(r.starts_at, r.studio_timezone),
        location: r.location_name ?? r.room ?? undefined,
        spotsLeft: Math.max(0, (r.capacity ?? 0) - (r.booked_count ?? 0)),
      }))
    : DEMO_ROWS;

  const title = studioName ?? "課程表";

  return (
    <EmbedLayout>
      <div className="space-y-2">
        <h2 className="text-base font-semibold mb-1">{title}</h2>

        {live && isLoading && (
          <p className="py-6 text-center text-sm text-muted-foreground">載入課程中…</p>
        )}

        {live && !isLoading && rows.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            目前沒有即將開課的課程 — 請稍後再來。
          </p>
        )}

        {rows.map((r) => {
          const full = r.spotsLeft <= 0;
          return (
            <div
              key={r.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card/60 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{r.name}</p>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {r.when}
                  {r.location && (
                    <>
                      <MapPin className="h-3 w-3" /> <span className="truncate">{r.location}</span>
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() => openHosted("/schedule")}
                className="shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: full ? "#9ca3af" : "var(--embed-primary, #4fd1c5)" }}
              >
                {full ? "候補" : "預約"}
              </button>
            </div>
          );
        })}

        <p className="pt-1 text-center text-[10px] text-muted-foreground">由 Tandava 提供</p>
      </div>
    </EmbedLayout>
  );
}
