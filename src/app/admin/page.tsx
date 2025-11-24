"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, XCircle, Eye, MessageSquare, Plus } from "lucide-react"

export default function AdminPage() {
    // Mock Data
    const pendingCases = [
        {
            id: "RPT-2025-042",
            platform: "Instagram",
            reporter: "匿名使用者",
            time: "10 分鐘前",
            riskLevel: "High",
            riskScore: 0.92,
            summary: "使用者回報遭到多個假帳號洗版辱罵，並收到威脅私訊。",
            detectedKeywords: ["去死", "醜八怪", "廢物"],
            evidenceCount: 3,
        },
        {
            id: "RPT-2025-041",
            platform: "Line",
            reporter: "User_123",
            time: "1 小時前",
            riskLevel: "Medium",
            riskScore: 0.65,
            summary: "群組內被排擠，有人散布不實謠言。",
            detectedKeywords: ["綠茶", "心機"],
            evidenceCount: 1,
        },
    ]

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">案件審核後台</h1>
                <div className="flex gap-2">
                    <Button variant="outline">匯出報表</Button>
                </div>
            </div>

            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-[500px]">
                    <TabsTrigger value="pending">待審核 (2)</TabsTrigger>
                    <TabsTrigger value="processing">處理中 (5)</TabsTrigger>
                    <TabsTrigger value="closed">已結案 (128)</TabsTrigger>
                    <TabsTrigger value="vocabulary">詞彙庫</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6 space-y-6">
                    {pendingCases.map((c) => (
                        <Card key={c.id} className="border-l-4 border-l-red-500">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            {c.id}
                                            <Badge variant={c.riskLevel === "High" ? "destructive" : "secondary"}>
                                                {c.riskLevel} Risk
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription>
                                            {c.platform} • {c.time} • 來自 {c.reporter}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-muted-foreground">AI 毒性分數</p>
                                        <p className="text-2xl font-bold text-red-600">{(c.riskScore * 100).toFixed(0)}%</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-muted p-4 rounded-md">
                                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" />
                                            AI 摘要
                                        </h4>
                                        <p className="text-sm">{c.summary}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4" />
                                            偵測到的敏感詞
                                        </h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {c.detectedKeywords.map((k) => (
                                                <Badge key={k} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                    {k}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between bg-muted/20 p-4">
                                <Button variant="ghost" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    查看原始對話與證據 ({c.evidenceCount})
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <XCircle className="mr-2 h-4 w-4" />
                                        駁回 / 誤判
                                    </Button>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        確認並立案
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="processing">
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                        尚無處理中案件
                    </div>
                </TabsContent>
                <TabsContent value="closed">
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                        顯示已結案列表...
                    </div>
                </TabsContent>

                <TabsContent value="vocabulary" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>敏感詞資料庫</CardTitle>
                                    <CardDescription>管理系統自動偵測的關鍵字與諧音詞。</CardDescription>
                                </div>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> 新增詞彙
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-muted/50">
                                    <div>詞彙</div>
                                    <div>類別</div>
                                    <div>嚴重程度</div>
                                    <div>操作</div>
                                </div>
                                {[
                                    { word: "去死", category: "人身攻擊", severity: "High" },
                                    { word: "智障", category: "人身攻擊", severity: "Medium" },
                                    { word: "綠茶", category: "性騷擾/侮辱", severity: "Medium" },
                                    { word: "腦殘", category: "人身攻擊", severity: "Medium" },
                                    { word: "廢物", category: "人身攻擊", severity: "High" },
                                ].map((item, i) => (
                                    <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 items-center">
                                        <div>{item.word}</div>
                                        <div><Badge variant="outline">{item.category}</Badge></div>
                                        <div>
                                            <Badge variant={item.severity === "High" ? "destructive" : "secondary"}>
                                                {item.severity}
                                            </Badge>
                                        </div>
                                        <div>
                                            <Button variant="ghost" size="sm" className="text-red-600">停用</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
