"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FadeIn } from "@/components/ui/motion"
import { User, Mail, Shield, Bell, Lock, History, Smile, Meh, Frown, CloudRain, Zap, Heart, Download, Calendar, Brain as BrainIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useUserData } from "@/contexts/user-data-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mental Health Data Display Component
function MentalHealthDataDisplay() {
    const { userData } = useUserData()

    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case 'happy': return <Smile className="w-5 h-5 text-green-500" />
            case 'calm': return <Heart className="w-5 h-5 text-blue-500" />
            case 'okay': return <Meh className="w-5 h-5 text-yellow-500" />
            case 'sad': return <Frown className="w-5 h-5 text-orange-500" />
            case 'angry': return <Zap className="w-5 h-5 text-red-500" />
            default: return <Meh className="w-5 h-5" />
        }
    }

    const getMoodLabel = (mood: string) => {
        const labels: Record<string, string> = {
            happy: '開心',
            calm: '平靜',
            okay: '還好',
            sad: '難過',
            angry: '憤怒'
        }
        return labels[mood] || mood
    }

    const getAssessmentType = (type: string) => {
        return type === 'phq9' ? 'PHQ-9 憂鬱篩檢' : 'GAD-7 焦慮篩檢'
    }

    if (!userData.emotionJournal.length && !userData.assessmentResults.length && !userData.safetyPlan) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">您還沒有任何心理健康數據</p>
                <p className="text-sm">前往心理支持頁面開始使用工具</p>
            </div>
        )
    }

    return (
        <Tabs defaultValue="journal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="journal">
                    情緒日記 ({userData.emotionJournal.length})
                </TabsTrigger>
                <TabsTrigger value="assessments">
                    評估結果 ({userData.assessmentResults.length})
                </TabsTrigger>
                <TabsTrigger value="safety">
                    安全計畫
                </TabsTrigger>
            </TabsList>

            <TabsContent value="journal" className="space-y-4 mt-6">
                {userData.emotionJournal.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">尚無日記記錄</p>
                ) : (
                    userData.emotionJournal.slice(0, 10).map((entry) => (
                        <div key={entry.id} className="border rounded-lg p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {getMoodIcon(entry.mood)}
                                    <span className="font-medium">{getMoodLabel(entry.mood)}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(entry.date).toLocaleDateString('zh-TW')}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{entry.content}</p>
                        </div>
                    ))
                )}
            </TabsContent>

            <TabsContent value="assessments" className="space-y-4 mt-6">
                {userData.assessmentResults.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">尚無評估記錄</p>
                ) : (
                    userData.assessmentResults.map((result) => (
                        <div key={result.id} className="border rounded-lg p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BrainIcon className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{getAssessmentType(result.type)}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(result.date).toLocaleDateString('zh-TW')}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-primary">{result.score}</span>
                                <span className="text-sm text-muted-foreground">分</span>
                            </div>
                        </div>
                    ))
                )}
            </TabsContent>

            <TabsContent value="safety" className="mt-6">
                {!userData.safetyPlan ? (
                    <p className="text-center text-muted-foreground py-8">尚未建立安全計畫</p>
                ) : (
                    <div className="space-y-6">
                        {userData.safetyPlan.warningSigns.length > 0 && (
                            <div>
                                <h4 className="font-medium mb-2">警告訊號</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {userData.safetyPlan.warningSigns.map((sign, i) => (
                                        <li key={i}>{sign}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {userData.safetyPlan.copingStrategies.length > 0 && (
                            <div>
                                <h4 className="font-medium mb-2">應對策略</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {userData.safetyPlan.copingStrategies.map((strategy, i) => (
                                        <li key={i}>{strategy}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {userData.safetyPlan.contacts.length > 0 && (
                            <div>
                                <h4 className="font-medium mb-2">緊急聯絡人</h4>
                                <div className="space-y-2">
                                    {userData.safetyPlan.contacts.map((contact, i) => (
                                        <div key={i} className="text-sm">
                                            <span className="font-medium">{contact.name}</span>: {contact.phone}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    )
}

export default function ProfilePage() {
    const { user, isLoggedIn } = useAuth()
    const { exportData, addEmotionEntry } = useUserData()
    const router = useRouter()
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [isDataSharing, setIsDataSharing] = useState(false)
    const [isEmailNotify, setIsEmailNotify] = useState(true)
    const [isSystemNotify, setIsSystemNotify] = useState(true)

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login")
        }
    }, [isLoggedIn, router])

    if (!isLoggedIn || !user) {
        return null
    }

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase()
    }

    const handleExportData = () => {
        const data = exportData()
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `mental-health-data-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
        toast.success("數據匯出成功", { description: "您的心理健康數據已下載" })
    }

    const handleMoodSelect = (mood: 'happy' | 'calm' | 'okay' | 'sad' | 'angry') => {
        addEmotionEntry({
            mood,
            content: "快速心情記錄"
        })
        toast.success("心情已記錄", { description: `已記錄您今天的心情：${getMoodLabel(mood)}` })
    }

    const getMoodLabel = (mood: string) => {
        const labels: Record<string, string> = {
            happy: '開心',
            calm: '平靜',
            okay: '還好',
            sad: '難過',
            angry: '憤怒'
        }
        return labels[mood] || mood
    }

    const handleSaveProfile = () => {
        toast.success("個人資料已儲存", { description: "您的變更已成功更新" })
    }

    const handleUpdatePassword = () => {
        toast.success("密碼已更新", { description: "下次登入請使用新密碼" })
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <FadeIn>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">個人資料</h1>
                        <p className="text-muted-foreground">管理您的帳戶設定和偏好</p>
                    </div>

                    {/* Profile Overview */}
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                        {getUserInitials(user.email)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-2xl">{user.name || "使用者"}</CardTitle>
                                    <CardDescription className="text-base">{user.email}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Mood Tracker */}
                    <Card className="mb-6 border-primary/20 bg-primary/5">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Smile className="h-5 w-5 text-primary" />
                                <CardTitle>每日心情追蹤</CardTitle>
                            </div>
                            <CardDescription>記錄您今天的心情，讓我們更了解您的狀態</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center max-w-md mx-auto py-4">
                                <button onClick={() => handleMoodSelect('happy')} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-background transition-colors group">
                                    <div className="p-3 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <Smile className="h-8 w-8 text-green-500" />
                                    </div>
                                    <span className="text-xs font-medium">開心</span>
                                </button>
                                <button onClick={() => handleMoodSelect('calm')} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-background transition-colors group">
                                    <div className="p-3 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <Meh className="h-8 w-8 text-yellow-500" />
                                    </div>
                                    <span className="text-xs font-medium">平靜</span>
                                </button>
                                <button onClick={() => handleMoodSelect('sad')} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-background transition-colors group">
                                    <div className="p-3 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <Frown className="h-8 w-8 text-orange-500" />
                                    </div>
                                    <span className="text-xs font-medium">低落</span>
                                </button>
                                <button onClick={() => handleMoodSelect('okay')} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-background transition-colors group">
                                    <div className="p-3 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <CloudRain className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <span className="text-xs font-medium">焦慮</span>
                                </button>
                                <button onClick={() => handleMoodSelect('angry')} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-background transition-colors group">
                                    <div className="p-3 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <Zap className="h-8 w-8 text-red-500" />
                                    </div>
                                    <span className="text-xs font-medium">生氣</span>
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    <CardTitle>個人資訊</CardTitle>
                                </div>
                                <CardDescription>更新您的個人資料</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">姓名</Label>
                                    <Input id="name" placeholder="輸入您的姓名" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">電子郵件</Label>
                                    <Input id="email" type="email" value={user.email} disabled />
                                </div>
                                <Button className="w-full" onClick={handleSaveProfile}>儲存變更</Button>
                            </CardContent>
                        </Card>

                        {/* Account Security */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Lock className="h-5 w-5 text-primary" />
                                    <CardTitle>帳戶安全</CardTitle>
                                </div>
                                <CardDescription>管理您的密碼和安全設定</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">目前密碼</Label>
                                    <Input id="current-password" type="password" placeholder="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">新密碼</Label>
                                    <Input id="new-password" type="password" placeholder="••••••••" />
                                </div>
                                <Button className="w-full" variant="outline" onClick={handleUpdatePassword}>更新密碼</Button>
                            </CardContent>
                        </Card>

                        {/* Privacy Settings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <CardTitle>隱私設定</CardTitle>
                                </div>
                                <CardDescription>控制您的資料和隱私</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>匿名舉報</Label>
                                        <p className="text-sm text-muted-foreground">預設使用匿名模式舉報</p>
                                    </div>
                                    <Button
                                        variant={isAnonymous ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                            setIsAnonymous(!isAnonymous)
                                            toast.success(isAnonymous ? "已關閉匿名模式" : "已啟用匿名模式")
                                        }}
                                    >
                                        {isAnonymous ? "已啟用" : "啟用"}
                                    </Button>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>資料分享</Label>
                                        <p className="text-sm text-muted-foreground">允許用於統計分析</p>
                                    </div>
                                    <Button
                                        variant={isDataSharing ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                            setIsDataSharing(!isDataSharing)
                                            toast.success(isDataSharing ? "已關閉資料分享" : "已啟用資料分享")
                                        }}
                                    >
                                        {isDataSharing ? "已啟用" : "啟用"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-primary" />
                                    <CardTitle>通知設定</CardTitle>
                                </div>
                                <CardDescription>管理您的通知偏好</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>電子郵件通知</Label>
                                        <p className="text-sm text-muted-foreground">接收案件更新通知</p>
                                    </div>
                                    <Button
                                        variant={isEmailNotify ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                            setIsEmailNotify(!isEmailNotify)
                                            toast.success(isEmailNotify ? "已關閉電子郵件通知" : "已啟用電子郵件通知")
                                        }}
                                    >
                                        {isEmailNotify ? "已啟用" : "啟用"}
                                    </Button>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>系統公告</Label>
                                        <p className="text-sm text-muted-foreground">接收平台重要訊息</p>
                                    </div>
                                    <Button
                                        variant={isSystemNotify ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => {
                                            setIsSystemNotify(!isSystemNotify)
                                            toast.success(isSystemNotify ? "已關閉系統公告" : "已啟用系統公告")
                                        }}
                                    >
                                        {isSystemNotify ? "已啟用" : "啟用"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Mental Health Data Section */}
                    <Card className="mt-6 border-pink-200/50 dark:border-pink-800/50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-pink-600" />
                                    <CardTitle>我的心理健康數據</CardTitle>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleExportData}
                                >
                                    匯出數據
                                </Button>
                            </div>
                            <CardDescription>查看您的情緒日記、評估結果和安全計畫</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MentalHealthDataDisplay />
                        </CardContent>
                    </Card>

                    {/* Activity History */}
                    <Card className="mt-6">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <History className="h-5 w-5 text-primary" />
                                <CardTitle>活動歷史</CardTitle>
                            </div>
                            <CardDescription>查看您最近的活動記錄</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b">
                                    <div>
                                        <p className="font-medium">登入帳戶</p>
                                        <p className="text-sm text-muted-foreground">2024-11-24 04:30</p>
                                    </div>
                                    <span className="text-xs bg-muted px-2 py-1 rounded">成功</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b">
                                    <div>
                                        <p className="font-medium">提交舉報案件</p>
                                        <p className="text-sm text-muted-foreground">2024-11-23 15:20</p>
                                    </div>
                                    <span className="text-xs bg-muted px-2 py-1 rounded">已處理</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="font-medium">更新個人資料</p>
                                        <p className="text-sm text-muted-foreground">2024-11-22 10:15</p>
                                    </div>
                                    <span className="text-xs bg-muted px-2 py-1 rounded">完成</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Resources */}
                    <Card className="mt-6 bg-card/50">
                        <CardHeader>
                            <CardTitle>需要協助？</CardTitle>
                            <CardDescription>我們隨時為您提供支援</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-3">
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => toast.info("客服系統維護中", { description: "請改用緊急求助或發送郵件至 support@voiceout.tw" })}>
                                <Mail className="h-5 w-5" />
                                <span>聯絡客服</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => router.push("/support")}>
                                <Shield className="h-5 w-5" />
                                <span>安全中心</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => router.push("/education")}>
                                <User className="h-5 w-5" />
                                <span>使用指南</span>
                            </Button>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </div>
    )
}
