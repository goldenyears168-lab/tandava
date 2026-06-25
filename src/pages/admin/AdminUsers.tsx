import { AdminLayout } from "@/components/layout/AdminLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsers() {
  return (
    <AdminLayout>
      <SEOHead title="管理使用者" noindex />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">使用者</h1>
          <p className="text-muted-foreground">管理所有工作室的使用者帳戶、角色與存取權限。</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">所有使用者</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>連接 Supabase 後即可管理使用者。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
