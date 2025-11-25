"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FadeIn } from "@/components/ui/motion"
import { User, Mail, Shield, Bell, Lock, History, Smile, Meh, Frown, CloudRain, Zap, Heart, Brain as BrainIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useUserData } from "@/contexts/user-data-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DayPicker } from "react-day-picker"
import { zhTW } from "date-fns/locale"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MentalHealthDataDisplayProps {
    selectedDate: Date | undefined
    onDayClick: (day: Date) => void
    getMoodForDate: (date: Date) => string | undefined
}

function MentalHealthDataDisplay({ selectedDate, onDayClick, getMoodForDate }: MentalHealthDataDisplayProps) {
    const { userData } = useUserData()

    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case 'happy': return <Smile className="w-full h-full text-[#A7D996]" />
            case 'calm': return <Meh className="w-full h-full text-[#FDE047]" />
            case 'okay': return <CloudRain className="w-full h-full text-[#BFDBFE]" />
            case 'sad': return <Frown className="w-full h-full text-[#FCA5A5]" />
            case 'angry': return <Zap className="w-full h-full text-[#F87171]" />
            default: return null
        }
    }

    const getAssessmentType = (type: string) => {
        return type === 'phq9' ? 'PHQ-9 憂鬱篩檢' : 'GAD-7 焦慮篩檢'
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

            <TabsContent value="journal" className="mt-6">
                <style>{`
                    .rdp {
                        --rdp-accent-color: hsl(var(--primary));
                        --rdp-background-color: hsl(var(--primary) / 0.1);
                        margin: 0;
                        width: 100%;
                    }
                    .rdp-months {
                        width: 100%;
                        justify-content: center;
                    }
                    .rdp-month {
                        width: 100%;
                    }
                    .rdp-table {
                        width: 100%;
                        max-width: none;
                    }
                    .rdp-head_cell {
                        font-size: 1rem;
                        font-weight: 600;
                        color: hsl(var(--muted-foreground));
                        padding-bottom: 1rem;
                    }
                    .rdp-cell {
                        width: 14.28%;
                        padding: 0.5rem 0;
                    }
                    .rdp-day {
                        width: 100%;
                        height: auto;
                        aspect-ratio: 1 / 1.4;
                        font-size: 1rem;
                        border-radius: 0;
                    }
                    .rdp-day_selected {
                        background-color: transparent !important;
                    }
                    .rdp-day_today {
                        font-weight: bold;
                    }
                    .rdp-button:hover:not([disabled]) {
                        background-color: transparent;
                    }
                `}</style>
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onDayClick={onDayClick}
                    locale={zhTW}
                    components={{
                        // @ts-expect-error - DayContent props mismatch in v9
                        DayContent: (props: any) => {
                            const { date } = props
                            const mood = getMoodForDate(date)
                            const isSelected = selectedDate?.toDateString() === date.toDateString()
                            const isToday = new Date().toDateString() === date.toDateString()

                            return (
                                <div className="flex flex-col items-center justify-start h-full gap-1">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                                        {mood ? (
                                            <div className="w-full h-full p-1.5">
                                                {getMoodIcon(mood)}
                                            </div>
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gray-200" />
                                        )}
                                    </div>
                                    <span className={`text-sm px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#A7D996] text-white' : isToday ? 'text-[#A7D996] font-bold' : 'text-gray-600'}`}>
                                        {date.getDate()}
                                    </span>
                                </div>
                            )
                        }
                    }}
                    className="bg-background rounded-xl p-4"
                />
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
    const { user, isLoggedIn, isLoading, updateProfile } = useAuth()
    const { userData, exportData, addActivity, setMoodForDate } = useUserData()
    const router = useRouter()
    const [name, setName] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [isDataSharing, setIsDataSharing] = useState(false)
    const [isEmailNotify, setIsEmailNotify] = useState(true)
    const [isSystemNotify, setIsSystemNotify] = useState(true)

    // Calendar State
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [isMoodDialogOpen, setIsMoodDialogOpen] = useState(false)

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/login")
        }
    }, [isLoggedIn, isLoading, router])

    useEffect(() => {
        if (user?.name) {
            setName(user.name)
        }
    }, [user])

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">載入中...</div>
    }

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

    const handleDayClick = (day: Date) => {
        setSelectedDate(day)
        setIsMoodDialogOpen(true)
    }

    const handleMoodSelect = (mood: 'happy' | 'calm' | 'okay' | 'sad' | 'angry') => {
        if (selectedDate) {
            setMoodForDate(selectedDate, mood)
            setIsMoodDialogOpen(false)
            toast.success("心情已更新", { description: `${format(selectedDate, "MM/dd")} 的心情已記錄為：${getMoodLabel(mood)}` })
        }
    }

    const getMoodLabel = (mood: string) => {
        const labels: Record<string, string> = {
            happy: '開心',
            calm: '平靜',
            okay: '焦慮',
            sad: '難過',
            angry: '生氣'
        }
        return labels[mood] || mood
    }

    const handleSaveProfile = () => {
        updateProfile({ name })
        addActivity("更新個人資料", "完成")
        toast.success("個人資料已儲存", { description: "您的變更已成功更新" })
    }

    const handleUpdatePassword = () => {
        addActivity("更新密碼", "完成")
        toast.success("密碼已更新", { description: "下次登入請使用新密碼" })
    }

    const getMoodForDate = (date: Date) => {
        if (!userData?.emotionJournal) return undefined
        const dateStr = date.toDateString()
        const entry = userData.emotionJournal.find(e => new Date(e.date).toDateString() === dateStr)
        return entry?.mood
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

                    {/* Mood Selection Dialog */}
                    <Dialog open={isMoodDialogOpen} onOpenChange={setIsMoodDialogOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center">
                                    {selectedDate ? format(selectedDate, "yyyy年MM月dd日") : ""} 的心情是？
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-5 gap-4 py-4">
                                <button onClick={() => handleMoodSelect('happy')} className="flex flex-col items-center gap-2 group">
                                    <div className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition-colors">
                                        <Smile className="h-8 w-8 text-green-600" />
                                    </div>
                                    <span className="text-xs font-medium">開心</span>
                                </button>
                                <button onClick={() => handleMoodSelect('calm')} className="flex flex-col items-center gap-2 group">
                                    <div className="p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                                        <Meh className="h-8 w-8 text-yellow-600" />
                                    </div>
                                    <span className="text-xs font-medium">平靜</span>
                                </button>
                                <button onClick={() => handleMoodSelect('okay')} className="flex flex-col items-center gap-2 group">
                                    <div className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                                        <CloudRain className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-medium">焦慮</span>
                                </button>
                                <button onClick={() => handleMoodSelect('sad')} className="flex flex-col items-center gap-2 group">
                                    <div className="p-3 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors">
                                        <Frown className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-medium">難過</span>
                                </button>
                                <button onClick={() => handleMoodSelect('angry')} className="flex flex-col items-center gap-2 group">
                                    <div className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                                        <Zap className="h-8 w-8 text-red-600" />
                                    </div>
                                    <span className="text-xs font-medium">生氣</span>
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>

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
                                    <Input
                                        id="name"
                                        placeholder="輸入您的姓名"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
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
                            <MentalHealthDataDisplay
                                selectedDate={selectedDate}
                                onDayClick={handleDayClick}
                                getMoodForDate={getMoodForDate}
                            />
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
                                {userData.activityHistory && userData.activityHistory.length > 0 ? (
                                    userData.activityHistory.map((activity) => (
                                        <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
                                            <div>
                                                <p className="font-medium">{activity.action}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(activity.date).toLocaleString('zh-TW', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <span className="text-xs bg-muted px-2 py-1 rounded">{activity.status}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        尚無活動記錄
                                    </div>
                                )}
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
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => router.push("/guide")}>
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
