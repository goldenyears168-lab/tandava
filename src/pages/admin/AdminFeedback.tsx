import { AdminLayout } from "@/components/layout/AdminLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminFeedback() {
  return (
    <AdminLayout>
      <SEOHead title="意見回饋與支援" noindex />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">意見回饋與支援</h1>
          <p className="text-muted-foreground">來自使用者的平台意見回饋，以及工作室業主的支援工單。</p>
        </div>

        <Tabs defaultValue="feedback">
          <TabsList>
            <TabsTrigger value="feedback">使用者意見</TabsTrigger>
            <TabsTrigger value="support">支援工單</TabsTrigger>
          </TabsList>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">平台意見回饋</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <p>尚無意見回饋。使用者可從「帳戶 → 說明與支援」提交意見。</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">工作室業主支援</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <p>尚無支援工單。工作室業主可從「管理 → 設定 → 支援」提出協助請求。</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
