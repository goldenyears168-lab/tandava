import { AdminLayout } from "@/components/layout/AdminLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBilling() {
  return (
    <AdminLayout>
      <SEOHead title="平台帳單" noindex />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">平台帳單</h1>
          <p className="text-muted-foreground">Stripe 設定、方案管理與收入總覽。</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stripe 設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>請在環境變數中設定 Stripe 金鑰。</p>
              <p className="text-sm mt-2">詳見 <code className="text-xs bg-muted px-1.5 py-0.5 rounded">docs/developer/stripe-setup.md</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
