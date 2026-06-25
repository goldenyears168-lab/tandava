import { AdminLayout } from "@/components/layout/AdminLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminStudios() {
  const { toast } = useToast();
  return (
    <AdminLayout>
      <SEOHead title="管理工作室" noindex />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">工作室</h1>
            <p className="text-muted-foreground">審核、設定並管理此實例上的工作室。</p>
          </div>
          <Button onClick={() => toast({ title: "新增工作室", description: "工作室 onboarding 需要 Supabase 後端。" })}>
            <Plus className="h-4 w-4 mr-2" />
            新增工作室
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">所有工作室</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>尚無工作室。連接 Supabase 並建立您的第一個工作室。</p>
              <p className="text-sm mt-2">詳見 <code className="text-xs bg-muted px-1.5 py-0.5 rounded">docs/developer/setup.md</code> 的說明。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
