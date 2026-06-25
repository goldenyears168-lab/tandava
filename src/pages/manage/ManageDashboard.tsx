import { ManageLayout } from "@/components/layout/ManageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp, Sparkles } from "lucide-react";
import { OXATL_STUDIO } from "@/data/demo";

export default function ManageDashboard() {
  return (
    <ManageLayout>
      <SEOHead title="森浴光mm941 · 館主儀表板" noindex />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">森浴光mm941 · 館主儀表板</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            {OXATL_STUDIO.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            預約制 · 每日 09:30–22:00 ·{" "}
            <a
              href={OXATL_STUDIO.website ?? "https://www.1314mm941.com.tw/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              官網
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">今日預約</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">活躍會員</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">收入（本月）</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">回訪率</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              為何選擇森浴光
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-medium">深度解鎖</p>
              <p className="text-muted-foreground">專業撥筋工法，讓身體恢復輕盈靈活。</p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-medium">能量共振</p>
              <p className="text-muted-foreground">高階活化艙結合光熱，啟動深層代謝與沈靜。</p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-medium">加乘效果</p>
              <p className="text-muted-foreground">先鬆開緊繃、後導引能量，放鬆更透徹持久。</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>管理功能</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              在森浴光，讓身體重新定義舒爽，讓靈魂再次發光。您可以在後台：
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <strong className="text-foreground">服務排程</strong> — 管理活化能量艙、撥筋、光療等療程時段
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <strong className="text-foreground">會員</strong> — 尊榮票券、預約紀錄與回訪追蹤
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <strong className="text-foreground">帳務</strong> — 各館營收與票券銷售
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <strong className="text-foreground">收件匣</strong> — 官網預約與會員詢問
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                <strong className="text-foreground">設定</strong> — 五館資訊、營業時間與品牌文案
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ManageLayout>
  );
}
