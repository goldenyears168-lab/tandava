import { ManageLayout } from "@/components/layout/ManageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageInbox() {
  return (
    <ManageLayout>
      <SEOHead title="工作室收件匣" noindex />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">收件匣</h1>
          <p className="text-muted-foreground">會員訊息與官網預約詢問。</p>
        </div>

        <Tabs defaultValue="inquiries">
          <TabsList>
            <TabsTrigger value="inquiries">詢問</TabsTrigger>
            <TabsTrigger value="member-messages">會員訊息</TabsTrigger>
            <TabsTrigger value="class-feedback">服務回饋</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <p>尚無詢問。訪客可從工作室公開頁面提交問題。</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="member-messages">
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <p>尚無會員訊息。</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="class-feedback">
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <p>會員完成療程後，服務回饋會顯示於此。</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ManageLayout>
  );
}
