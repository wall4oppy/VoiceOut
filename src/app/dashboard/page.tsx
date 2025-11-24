import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    // Mock data
    const cases = [
        {
            id: "CASE-2025-001",
            date: "2025-11-23",
            status: "處理中",
            statusColor: "bg-yellow-500",
            summary: "Instagram 冒名頂替與騷擾",
            updates: [
                { date: "2025-11-24 10:00", content: "案件已指派給專案管理員。" },
                { date: "2025-11-23 15:30", content: "系統自動偵測到高風險關鍵字，已提升優先級。" },
                { date: "2025-11-23 15:00", content: "案件已提交。" },
            ]
        },
        {
            id: "CASE-2024-089",
            date: "2024-12-10",
            status: "已結案",
            statusColor: "bg-green-500",
            summary: "線上遊戲言語霸凌",
            updates: [
                { date: "2024-12-15 09:00", content: "已提供相關法律諮詢資源，案件結案。" },
                { date: "2024-12-11 14:00", content: "審核人員已初步檢視證據。" },
            ]
        }
    ]

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">我的儀表板</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content: Case List */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold">案件進度</h2>
                    {cases.map((c) => (
                        <Card key={c.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle>{c.id}</CardTitle>
                                        <CardDescription>{c.date} • {c.summary}</CardDescription>
                                    </div>
                                    <Badge className={`${c.statusColor} hover:${c.statusColor}`}>
                                        {c.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">最新動態</h4>
                                    <div className="space-y-4">
                                        {c.updates.map((update, i) => (
                                            <div key={i} className="flex gap-4 text-sm">
                                                <div className="flex flex-col items-center">
                                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                                    {i !== c.updates.length - 1 && (
                                                        <div className="h-full w-[1px] bg-border my-1" />
                                                    )}
                                                </div>
                                                <div className="space-y-1 pb-4">
                                                    <p className="text-xs text-muted-foreground">{update.date}</p>
                                                    <p>{update.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Sidebar: Resources & Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>心理狀態檢測</CardTitle>
                            <CardDescription>最近一次檢測：7 天前</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-amber-600">
                                <AlertCircle className="h-5 w-5" />
                                <span className="font-medium">中度焦慮風險</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                建議您嘗試進行深呼吸練習，或預約線上諮詢。
                            </p>
                            <Link href="/support" className="block">
                                <Button className="w-full" variant="outline">
                                    重新檢測
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>推薦資源</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Link href="/support" className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                                <span className="text-sm font-medium">情緒急救包</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                            <Link href="/legal" className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                                <span className="text-sm font-medium">法律扶助基金會</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                            <Link href="/legal" className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                                <span className="text-sm font-medium">iWIN 網路內容防護</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
