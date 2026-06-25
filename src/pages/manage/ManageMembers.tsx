import { ManageLayout } from "@/components/layout/ManageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageMembers() {
  return (
    <ManageLayout>
      <SEOHead title="管理會員" noindex />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">會員</h1>
          <p className="text-muted-foreground">查看會員名錄、尊榮票券與預約紀錄。</p>
        </div>

        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <p>尚無會員。會員完成預約後會顯示於此。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManageLayout>
  );
}
