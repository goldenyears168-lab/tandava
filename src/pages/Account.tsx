import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  CreditCard,
  Bell,
  Camera,
  Package,
  ChevronRight,
  Check,
  Instagram,
  GraduationCap,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user data
const userData = {
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah@example.com",
  phone: "(555) 123-4567",
  pronouns: "she/her",
  dateOfBirth: "1990-05-15",
  emergencyContactName: "John Chen",
  emergencyContactPhone: "(555) 987-6543",
  notes: "Lower back sensitivity - please remind me about modifications for forward folds.",
  avatar: "",
  instagramHandle: "",
  // Training data
  workshopsAttended: "",
  trainingsCompleted: "",
  additionalTrainingsNote: "",
  hasYttTraining: false,
  ytt200Completed: false,
  ytt300Completed: false,
  ytt500Completed: false,
  yttSchoolName: "",
  yttTrainingLocation: "",
  yttTrainingYear: "",
};

const membership = {
  type: "月付無限方案",
  status: "ACTIVE",
  renewsAt: "Feb 3, 2026",
  price: 149,
};

const packs = [
  { type: "套票", name: "10 堂套票", remaining: 6, expires: "2026 年 3 月 15 日" },
];

const Account = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(userData);
  const [preferences, setPreferences] = useState({
    emailClassReminders: true,
    smsClassReminders: false,
    newsletterEmail: true,
    marketingEmails: true,
    leaderboardVisibility: "FRIENDS" as "PUBLIC" | "FRIENDS" | "HIDDEN",
  });

  const handleSaveProfile = () => {
    toast({
      title: "個人資料已更新",
      description: "您的個人資料已儲存。",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "偏好設定已更新",
      description: "您的通知偏好已儲存。",
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">帳戶</h1>
          <p className="text-muted-foreground mt-1">
            管理個人資料、會員方案與偏好設定
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-4 sm:inline-grid">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4 hidden sm:block" />
              個人資料
            </TabsTrigger>
            <TabsTrigger value="membership" className="gap-2">
              <Package className="h-4 w-4 hidden sm:block" />
              會員方案
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4 hidden sm:block" />
              帳單
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Bell className="h-4 w-4 hidden sm:block" />
              偏好設定
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            {/* Avatar section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={formData.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {formData.firstName[0]}{formData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      onClick={() => toast({ title: "上傳照片", description: "照片上傳需要後端儲存連線。" })}
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal info */}
            <Card>
              <CardHeader>
                <CardTitle>個人資訊</CardTitle>
                <CardDescription>
                  更新您的個人資料與聯絡資訊
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">名字</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">姓氏</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">電子郵件</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pronouns">稱謂</Label>
                    <Input
                      id="pronouns"
                      value={formData.pronouns}
                      onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                      placeholder="例如：她/她、他/他、他們/他們"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">出生日期</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <Input
                      id="instagram"
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                      placeholder="yourusername"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    與瑜伽社群在 Instagram 上互動
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>緊急聯絡人</Label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="聯絡人姓名"
                      value={formData.emergencyContactName}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyContactName: e.target.value })
                      }
                    />
                    <Input
                      placeholder="聯絡人電話"
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyContactPhone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">給老師的備註</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="受傷、身體狀況或偏好，讓老師了解您的需求"
                    rows={3}
                  />
                </div>

                <Button onClick={handleSaveProfile}>儲存變更</Button>
              </CardContent>
            </Card>

            {/* Practice & Trainings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-lilac flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <CardTitle>練習與培訓</CardTitle>
                    <CardDescription>
                      分享您的瑜伽旅程與認證資格
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Workshops & Trainings Summary */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workshopsAttended">參加工作坊次數</Label>
                    <Input
                      id="workshopsAttended"
                      type="number"
                      min="0"
                      value={formData.workshopsAttended}
                      onChange={(e) => setFormData({ ...formData, workshopsAttended: e.target.value })}
                      placeholder="選填"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trainingsCompleted">完成培訓次數</Label>
                    <Input
                      id="trainingsCompleted"
                      type="number"
                      min="0"
                      value={formData.trainingsCompleted}
                      onChange={(e) => setFormData({ ...formData, trainingsCompleted: e.target.value })}
                      placeholder="選填"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalTrainings">其他培訓或認證</Label>
                  <Textarea
                    id="additionalTrainings"
                    value={formData.additionalTrainingsNote}
                    onChange={(e) => setFormData({ ...formData, additionalTrainingsNote: e.target.value })}
                    placeholder="例如：空中瑜伽師資、修復瑜伽、創傷知情模組、產前瑜伽認證..."
                    rows={2}
                  />
                </div>

                <Separator />

                {/* YTT Section */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="hasYtt"
                      checked={formData.hasYttTraining}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hasYttTraining: checked as boolean })
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor="hasYtt" className="cursor-pointer font-medium">
                        我已完成瑜伽師資培訓（YTT）
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        分享您的 Yoga Alliance 認證等級與培訓詳情
                      </p>
                    </div>
                  </div>

                  {/* Collapsible YTT Panel */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      formData.hasYttTraining ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="mt-4 p-5 rounded-2xl border-2 border-lilac/50 bg-lilac/10 space-y-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-foreground" />
                        <span className="font-semibold">Yoga Alliance 等級</span>
                      </div>

                      {/* YTT Level Checkboxes */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="ytt200"
                            checked={formData.ytt200Completed}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, ytt200Completed: checked as boolean })
                            }
                          />
                          <Label htmlFor="ytt200" className="cursor-pointer">
                            <Badge variant="mint" className="text-sm">200 小時 YTT</Badge>
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="ytt300"
                            checked={formData.ytt300Completed}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, ytt300Completed: checked as boolean })
                            }
                          />
                          <Label htmlFor="ytt300" className="cursor-pointer">
                            <Badge variant="peach" className="text-sm">300 小時 YTT</Badge>
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="ytt500"
                            checked={formData.ytt500Completed}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, ytt500Completed: checked as boolean })
                            }
                          />
                          <Label htmlFor="ytt500" className="cursor-pointer">
                            <Badge variant="lilac" className="text-sm">500 小時 YTT</Badge>
                          </Label>
                        </div>
                      </div>

                      {/* YTT Details */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="yttSchool">主要 YTT 學校／課程</Label>
                          <Input
                            id="yttSchool"
                            value={formData.yttSchoolName}
                            onChange={(e) => setFormData({ ...formData, yttSchoolName: e.target.value })}
                            placeholder="例如：Haute Yoga Queen Anne、The Practice Bali"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="yttLocation">培訓地點</Label>
                            <Input
                              id="yttLocation"
                              value={formData.yttTrainingLocation}
                              onChange={(e) => setFormData({ ...formData, yttTrainingLocation: e.target.value })}
                              placeholder="城市、國家（例如：Seattle, WA, USA）"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="yttYear">完成年份</Label>
                            <Select
                              value={formData.yttTrainingYear}
                              onValueChange={(value) => setFormData({ ...formData, yttTrainingYear: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="選擇年份" />
                              </SelectTrigger>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>儲存培訓資料</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Membership Tab */}
          <TabsContent value="membership" className="mt-6 space-y-6">
            {/* Active membership */}
            <Card>
              <CardHeader>
                <CardTitle>目前會員方案</CardTitle>
                <CardDescription>您目前的會員方案與權益</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-mint/30">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{membership.type}</h3>
                        <Badge variant="mint">使用中</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        續訂日 {membership.renewsAt} · ${membership.price}/月
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => toast({ title: "管理會員方案", description: "會員方案管理需要 Stripe 整合。" })}>管理</Button>
                </div>
              </CardContent>
            </Card>

            {/* Class packs */}
            <Card>
              <CardHeader>
                <CardTitle>套票與通行證</CardTitle>
                <CardDescription>您目前的套票與通行證</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {packs.map((pack, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-lilac/30 flex items-center justify-center">
                        <Package className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{pack.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          剩餘 {pack.remaining} 堂 · 到期日 {pack.expires}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">剩餘 {pack.remaining} 堂</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "瀏覽套票", description: "正在導向可購買的套票與通行證。" })}>
                  購買更多
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>付款方式</CardTitle>
                <CardDescription>管理您的付款方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl border">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">•••• •••• •••• 4242</h4>
                      <p className="text-sm text-muted-foreground">到期日 12/27</p>
                    </div>
                  </div>
                  <Badge variant="secondary">預設</Badge>
                </div>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "新增付款方式", description: "付款方式需要 Stripe 整合。" })}>
                  新增付款方式
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>帳單紀錄</CardTitle>
                <CardDescription>查看過去的發票與付款紀錄</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "2026 年 1 月 3 日", desc: "月付無限方案", amount: 149 },
                    { date: "2025 年 12 月 3 日", desc: "月付無限方案", amount: 149 },
                    { date: "2025 年 11 月 15 日", desc: "10 堂套票", amount: 180 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{item.desc}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <p className="font-medium">${item.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="mt-6 space-y-6">
            {/* Class Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>課程通知</CardTitle>
                <CardDescription>已預約課程的提醒設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">電子郵件提醒</p>
                    <p className="text-sm text-muted-foreground">
                      課程前 24 小時與 1 小時收到電子郵件提醒
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailClassReminders}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, emailClassReminders: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">簡訊提醒</p>
                    <p className="text-sm text-muted-foreground">
                      課程前收到簡訊提醒
                    </p>
                  </div>
                  <Switch
                    checked={preferences.smsClassReminders}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, smsClassReminders: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Newsletter & Marketing */}
            <Card>
              <CardHeader>
                <CardTitle>電子報與最新消息</CardTitle>
                <CardDescription>掌握工作室活動與最新消息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">電子報</p>
                    <p className="text-sm text-muted-foreground">
                      每週精選新工作室、推薦課程與健康小知識
                    </p>
                  </div>
                  <Switch
                    checked={preferences.newsletterEmail}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, newsletterEmail: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">行銷電子郵件</p>
                    <p className="text-sm text-muted-foreground">
                      特別優惠、新工作坊與工作室促銷活動
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, marketingEmails: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>隱私</CardTitle>
                <CardDescription>管理您的隱私設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>排行榜可見度</Label>
                  <Select
                    value={preferences.leaderboardVisibility}
                    onValueChange={(value) =>
                      setPreferences({
                        ...preferences,
                        leaderboardVisibility: value as typeof preferences.leaderboardVisibility,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLIC">公開 — 任何人都可查看我的統計</SelectItem>
                      <SelectItem value="FRIENDS">僅朋友 — 僅朋友可查看</SelectItem>
                      <SelectItem value="HIDDEN">隱藏 — 不在排行榜上顯示</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    控制誰可以在工作室排行榜上看到您的統計資料
                  </p>
                </div>

                <Button onClick={handleSavePreferences}>儲存偏好設定</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Account;
