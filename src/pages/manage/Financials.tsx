import { useState } from "react";
import { ManageLayout } from "@/components/manage/ManageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  CreditCard,
  Package,
  Users,
  Plus,
  TrendingUp,
  Download,
  MoreHorizontal,
  FileSpreadsheet,
  FileText,
  Calculator,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EngagementNudge } from "@/components/EngagementNudge";

const mockMembershipTypes = [
  { id: "1", name: "尊榮會員票券", price: 4560000, billing: "monthly", activeCount: 89, isActive: true },
  { id: "2", name: "每月 8 次療程", price: 1280000, billing: "monthly", activeCount: 34, isActive: true },
  { id: "3", name: "每月 4 次療程", price: 880000, billing: "monthly", activeCount: 28, isActive: true },
  { id: "4", name: "年度尊榮方案", price: 45600000, billing: "annual", activeCount: 12, isActive: true },
];

const mockClassPacks = [
  { id: "1", name: "10 次票券", classes: 10, price: 1500000, validity: 90, sold: 45, isActive: true },
  { id: "2", name: "20 次票券", classes: 20, price: 2800000, validity: 180, sold: 18, isActive: true },
  { id: "3", name: "5 次體驗券", classes: 5, price: 880000, validity: 30, sold: 67, isActive: true },
  { id: "4", name: "單次體驗", classes: 1, price: 180000, validity: 1, sold: 156, isActive: true },
];

const mockRecentTransactions = [
  { id: "1", student: "林小姐", type: "尊榮會員續約", amount: 4560000, date: "今天 08:12", status: "completed" },
  { id: "2", student: "陳先生", type: "10 次票券", amount: 1500000, date: "今天 07:45", status: "completed" },
  { id: "3", student: "王小姐", type: "單次體驗", amount: 180000, date: "昨天 18:30", status: "completed" },
  { id: "4", student: "張先生", type: "逾期取消費", amount: 50000, date: "昨天 14:15", status: "completed" },
  { id: "5", student: "李小姐", type: "尊榮會員續約", amount: 1280000, date: "昨天 00:00", status: "failed" },
  { id: "6", student: "黃小姐", type: "5 次體驗券", amount: 880000, date: "1 月 28 日 09:20", status: "completed" },
  { id: "7", student: "吳先生", type: "單次體驗", amount: 180000, date: "1 月 27 日 17:45", status: "refunded" },
];

// ============================================================================
// CSV EXPORT — Generate and download transaction data
// ============================================================================

type ExportFormat = "csv" | "quickbooks" | "xero";

function generateCSV(transactions: typeof mockRecentTransactions, format: ExportFormat): string {
  if (format === "quickbooks") {
    // QuickBooks IIF format (simplified)
    const lines = [
      "!TRNS\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO",
      "!SPL\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO",
      "!ENDTRNS",
    ];
    transactions.forEach((tx) => {
      lines.push(`TRNS\tDEPOSIT\t${tx.date}\tUndeposited Funds\t${tx.student}\t${(tx.amount / 100).toFixed(2)}\t${tx.type}`);
      lines.push(`SPL\tDEPOSIT\t${tx.date}\tClass Revenue\t${tx.student}\t-${(tx.amount / 100).toFixed(2)}\t${tx.type}`);
      lines.push("ENDTRNS");
    });
    return lines.join("\n");
  }

  if (format === "xero") {
    // Xero CSV format
    const headers = ["*ContactName", "*InvoiceNumber", "*InvoiceDate", "*DueDate", "描述", "*Quantity", "*UnitAmount", "*AccountCode", "TaxType"];
    const rows = transactions.map((tx, i) => [
      tx.student,
      `TDV-${String(i + 1).padStart(4, "0")}`,
      tx.date,
      tx.date,
      tx.type,
      "1",
      (tx.amount / 100).toFixed(2),
      "200",
      "Tax Exempt",
    ]);
    return [headers, ...rows].map((r) => r.join(",")).join("\n");
  }

  // Standard CSV
  const headers = ["日期", "會員", "類型", "金額", "狀態", "付款方式"];
  const rows = transactions.map((tx) => [
    tx.date,
    tx.student,
    tx.type,
    `NT$${(tx.amount / 100).toLocaleString()}`,
    tx.status === "completed" ? "完成" : tx.status === "failed" ? "失敗" : tx.status === "refunded" ? "已退款" : tx.status,
    "信用卡",
  ]);
  return [headers, ...rows].map((r) => r.join(",")).join("\n");
}

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function FinancialsManage() {
  const { toast } = useToast();
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");

  const handleExport = () => {
    const csv = generateCSV(mockRecentTransactions, exportFormat);
    const extensions: Record<ExportFormat, string> = { csv: "csv", quickbooks: "iif", xero: "csv" };
    const prefixes: Record<ExportFormat, string> = { csv: "transactions", quickbooks: "quickbooks-export", xero: "xero-import" };
    downloadFile(csv, `${prefixes[exportFormat]}-${new Date().toISOString().split("T")[0]}.${extensions[exportFormat]}`);
    setExportOpen(false);
    toast({
      title: "匯出完成",
      description: `已匯出 ${mockRecentTransactions.length} 筆交易（${exportFormat === "quickbooks" ? "QuickBooks IIF" : exportFormat === "xero" ? "Xero CSV" : "CSV"}）。`,
    });
  };

  return (
    <ManageLayout>
      <div className="space-y-6">
        {/* Nudge */}
        <EngagementNudge
          type="pack_running_low"
          title="2 筆會員續約失敗"
          message="李小姐等 2 位會員付款未成功，請儘快聯繫以免流失。"
          actionLabel="查看失敗付款"
          context="約 NT$12,800 待挽回"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">財務管理</h1>
            <p className="text-sm text-muted-foreground mt-1">尊榮票券、次數方案與交易紀錄</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setExportOpen(true)}>
            <Download className="h-4 w-4 mr-2" />
            匯出
          </Button>
        </div>

        {/* Export Dialog */}
        <Dialog open={exportOpen} onOpenChange={setExportOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>匯出交易資料</DialogTitle>
              <DialogDescription>
                下載交易資料供會計或分析使用
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>匯出格式</Label>
                <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as ExportFormat)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        CSV (Excel, Google Sheets)
                      </div>
                    </SelectItem>
                    <SelectItem value="quickbooks">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        QuickBooks IIF
                      </div>
                    </SelectItem>
                    <SelectItem value="xero">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Xero CSV
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>起始日期</Label>
                  <Input type="date" value={exportDateFrom} onChange={(e) => setExportDateFrom(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>結束日期</Label>
                  <Input type="date" value={exportDateTo} onChange={(e) => setExportDateTo(e.target.value)} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {exportFormat === "quickbooks"
                  ? "匯出 QuickBooks 相容的 IIF 格式。"
                  : exportFormat === "xero"
                  ? "匯出 Xero 相容的 CSV 格式。"
                  : "標準 CSV，包含所有交易欄位。"}
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setExportOpen(false)}>取消</Button>
                <Button size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-1.5" />
                  下載 {mockRecentTransactions.length} 筆交易
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="memberships">會員方案</TabsTrigger>
            <TabsTrigger value="packs">次數票券</TabsTrigger>
            <TabsTrigger value="transactions">交易紀錄</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-5 pb-4 px-4">
                  <DollarSign className="h-5 w-5 text-accent-gold" />
                  <p className="text-2xl font-bold mt-2">NT$582,400</p>
                  <p className="text-xs text-muted-foreground">本月營收</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5 pb-4 px-4">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold mt-2">163</p>
                  <p className="text-xs text-muted-foreground">活躍會員</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5 pb-4 px-4">
                  <Package className="h-5 w-5 text-accent-coral" />
                  <p className="text-2xl font-bold mt-2">286</p>
                  <p className="text-xs text-muted-foreground">使用中票券</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5 pb-4 px-4">
                  <TrendingUp className="h-5 w-5 text-accent-sage" />
                  <p className="text-2xl font-bold mt-2">NT$3,570</p>
                  <p className="text-xs text-muted-foreground">平均會員貢獻</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">近期交易</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockRecentTransactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                    <div>
                      <p className="text-sm font-medium">{tx.student}</p>
                      <p className="text-xs text-muted-foreground">{tx.type} — {tx.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">NT${(tx.amount / 100).toLocaleString()}</span>
                      <Badge
                        className={`text-[10px] ${
                          tx.status === "completed" ? "bg-accent-sage/20 text-accent-sage" :
                          tx.status === "failed" ? "bg-destructive/10 text-destructive" :
                          "bg-accent-gold/20 text-accent-gold"
                        }`}
                      >
                        {tx.status === "completed" ? "完成" : tx.status === "failed" ? "失敗" : tx.status === "refunded" ? "已退款" : tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Memberships */}
          <TabsContent value="memberships" className="space-y-6">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => toast({ title: "即將推出", description: "會員方案建立功能將於後端串接後開放。" })}>
                <Plus className="h-4 w-4 mr-2" />
                新增會員方案
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mockMembershipTypes.map((membership) => (
                <Card key={membership.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{membership.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold">NT${(membership.price / 100).toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">/{membership.billing === "monthly" ? "月" : "年"}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuItem className="rounded-lg cursor-pointer">編輯</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer">查看會員</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive">停用</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{membership.activeCount} 位有效</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">
                          NT${((membership.price * membership.activeCount) / 100).toLocaleString()}/月
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Class Packs */}
          <TabsContent value="packs" className="space-y-6">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => toast({ title: "即將推出", description: "票券方案建立功能將於後端串接後開放。" })}>
                <Plus className="h-4 w-4 mr-2" />
                新增票券方案
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mockClassPacks.map((pack) => (
                <Card key={pack.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{pack.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold">${(pack.price / 100).toFixed(0)}</span>
                          <span className="text-xs text-muted-foreground">
                            {pack.classes} class{pack.classes > 1 ? "es" : ""} — {pack.validity} day{pack.validity > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuItem className="rounded-lg cursor-pointer">Edit</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">{pack.sold} sold (all time)</span>
                      <span className="text-sm text-muted-foreground">
                        ${((pack.price / pack.classes) / 100).toFixed(0)}/class
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 px-4 py-3 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span>Student</span>
                  <span>Type</span>
                  <span>Amount</span>
                  <span>Date</span>
                  <span>Status</span>
                </div>
                {mockRecentTransactions.map((tx) => (
                  <div key={tx.id} className="grid md:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 px-4 py-3 border-b border-border last:border-0 items-center">
                    <p className="text-sm font-medium">{tx.student}</p>
                    <p className="text-sm text-muted-foreground">{tx.type}</p>
                    <p className="text-sm font-semibold">${(tx.amount / 100).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                    <Badge
                      className={`text-[10px] ${
                        tx.status === "completed" ? "bg-accent-sage/20 text-accent-sage" :
                        tx.status === "failed" ? "bg-destructive/10 text-destructive" :
                        "bg-accent-gold/20 text-accent-gold"
                      }`}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ManageLayout>
  );
}
