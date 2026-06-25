import { useState } from "react";
import { TeachLayout } from "@/components/teach/TeachLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Save, Award, BookOpen, Star } from "lucide-react";

export default function TeachProfile() {
  const { toast } = useToast();
  const { profile } = useAuth();

  const profileName = profile?.display_name
    || (profile ? `${profile.first_name} ${profile.last_name}` : "老師");
  const initials = profileName.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  const [bio, setBio] = useState(
    "E-RYT 500 認證瑜伽老師，專精動態流瑜伽與修復式練習。擁有 8 年以上跨工作室授課經驗。"
  );
  const [specialties, setSpecialties] = useState(["Vinyasa", "Power Yoga", "Yin"]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [certifications] = useState([
    { name: "RYT-500", issuer: "Yoga Alliance", year: "2020" },
    { name: "Prenatal Yoga", issuer: "Birthlight", year: "2022" },
    { name: "Yin Yoga 100hr", issuer: "Insight Yoga Institute", year: "2023" },
  ]);

  const handleSave = () => {
    toast({
      title: "個人資料已更新",
      description: "您的老師個人資料已儲存。",
    });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (s: string) => {
    setSpecialties(specialties.filter((sp) => sp !== s));
  };

  return (
    <TeachLayout>
      <SEOHead title="我的個人資料" noindex />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">我的個人資料</h1>
            <p className="text-muted-foreground">管理您的公開老師個人檔案</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            儲存個人資料
          </Button>
        </div>

        {/* Avatar & Name */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{profileName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">4.9 評分</span>
                  <span className="text-sm text-muted-foreground">• 已授課 1,240 堂</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              關於我
            </CardTitle>
            <CardDescription>此內容會顯示在您的公開個人檔案</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="向學員介紹自己、教學風格，以及課程中可以期待什麼..."
            />
            <p className="text-xs text-muted-foreground mt-2">{bio.length}/500 字</p>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle>專長領域</CardTitle>
            <CardDescription>您教授的風格與重點方向</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <Badge key={s} variant="secondary" className="gap-1 pr-1">
                  {s}
                  <button
                    onClick={() => removeSpecialty(s)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="新增專長..."
                onKeyDown={(e) => e.key === "Enter" && addSpecialty()}
              />
              <Button variant="outline" onClick={addSpecialty}>新增</Button>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              認證資格
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border">
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                  <Badge variant="outline">已驗證</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeachLayout>
  );
}
