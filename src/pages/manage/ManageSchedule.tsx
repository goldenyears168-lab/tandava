import { ManageLayout } from "@/components/layout/ManageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ManageSchedule() {
  return (
    <ManageLayout>
      <SEOHead title="管理服務排程" noindex />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-2xl font-bold tracking-tight">服務排程</h1>
            <p className="text-muted-foreground">建立與管理各館療程時段（預約制 09:30–22:00）。</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新增療程
          </Button>
        </div>

        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <p>尚無排程療程。建立第一個時段即可開始接受預約。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManageLayout>
  );
}
