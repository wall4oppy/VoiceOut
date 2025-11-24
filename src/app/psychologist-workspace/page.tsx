"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/roles"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Brain, FileText, Clock, CheckCircle } from "lucide-react"
import { FadeIn } from "@/components/ui/motion"
import { CaseDetailDialog } from "@/components/case-detail-dialog"
import { PsychologicalReportDialog } from "@/components/psychological-report-dialog"

interface AssessmentCase {
    id: string
    studentName: string
    grade: string
    referredBy: string
    referralDate: string
    status: "pending" | "in_progress" | "completed"
    priority: "low" | "medium" | "high"
    notes?: string
}

const mockCases: AssessmentCase[] = [
    {
        id: "PSY-001",
        studentName: "王小明",
        grade: "3年2班",
        referredBy: "張老師",
        referralDate: "2024-11-22",
        status: "pending",
        priority: "high",
        notes: "學生出現明顯的焦慮症狀，需要專業心理評估與輔導。"
    },
    {
        id: "PSY-002",
        studentName: "李小華",
        grade: "2年1班",
        referredBy: "陳老師",
        referralDate: "2024-11-20",
        status: "in_progress",
        priority: "medium",
        notes: "長期遭受排擠，需要評估是否有憂鬱傾向。"
    }
]

const statusConfig = {
    pending: { label: "待評估", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    in_progress: { label: "評估中", color: "bg-blue-100 text-blue-700", icon: FileText },
    completed: { label: "已完成", color: "bg-green-100 text-green-700", icon: CheckCircle }
}

const priorityConfig = {
    low: { label: "低", color: "bg-blue-100 text-blue-700" },
    medium: { label: "中", color: "bg-orange-100 text-orange-700" },
    high: { label: "高", color: "bg-red-100 text-red-700" }
}

export default function PsychologistWorkspace() {
    const { user } = useAuth()
    const [cases, setCases] = useState<AssessmentCase[]>(mockCases)
    const [activeTab, setActiveTab] = useState<"pending" | "in_progress" | "completed" | "all">("all")
    const [selectedCase, setSelectedCase] = useState<AssessmentCase | null>(null)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

    const filteredCases = activeTab === "all"
        ? cases
        : cases.filter(c => c.status === activeTab)

    const updateStatus = (caseId: string, newStatus: "pending" | "in_progress" | "completed") => {
        setCases(cases.map(c => c.id === caseId ? { ...c, status: newStatus } : c))
    }

    const pendingCount = cases.filter(c => c.status === "pending").length
    const inProgressCount = cases.filter(c => c.status === "in_progress").length
    const completedCount = cases.filter(c => c.status === "completed").length

    const handleViewDetails = (caseItem: AssessmentCase) => {
        setSelectedCase(caseItem)
        setIsDetailDialogOpen(true)
    }

    const handleWriteReport = (caseItem: AssessmentCase) => {
        setSelectedCase(caseItem)
        setIsReportDialogOpen(true)
    }

    const handleSaveReport = (reportData: any) => {
        console.log("Saving report:", reportData)
        // TODO: Save to backend
        alert("報告已儲存！")
    }

    return (
        <ProtectedRoute requiredRole={UserRole.PSYCHOLOGIST}>
            <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8 space-y-8">
                <FadeIn>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Brain className="h-8 w-8 text-pink-600" />
                            心理師工作台
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            歡迎，{user?.name || "心理師"}。管理您的評估案件與心理輔導記錄。
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>待評估案件</CardTitle>
                            <CardDescription>查看並處理轉介的心理評估案件</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="all">全部 ({cases.length})</TabsTrigger>
                                    <TabsTrigger value="pending">待評估 ({pendingCount})</TabsTrigger>
                                    <TabsTrigger value="in_progress">評估中 ({inProgressCount})</TabsTrigger>
                                    <TabsTrigger value="completed">已完成 ({completedCount})</TabsTrigger>
                                </TabsList>

                                <TabsContent value={activeTab} className="space-y-4 mt-4">
                                    {filteredCases.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            目前沒有案件
                                        </div>
                                    ) : (
                                        filteredCases.map((caseItem) => {
                                            const StatusIcon = statusConfig[caseItem.status].icon
                                            return (
                                                <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                                                    <CardContent className="p-4 space-y-4">
                                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold">{caseItem.id}</span>
                                                                <Badge className={priorityConfig[caseItem.priority].color}>
                                                                    優先度：{priorityConfig[caseItem.priority].label}
                                                                </Badge>
                                                                <Badge className={statusConfig[caseItem.status].color}>
                                                                    <StatusIcon className="h-3 w-3 mr-1" />
                                                                    {statusConfig[caseItem.status].label}
                                                                </Badge>
                                                            </div>
                                                            <span className="text-sm text-muted-foreground">
                                                                轉介日期：{caseItem.referralDate}
                                                            </span>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <div className="text-sm">
                                                                <span className="font-medium">{caseItem.studentName}</span>
                                                                <span className="text-muted-foreground"> · {caseItem.grade}</span>
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                轉介人：{caseItem.referredBy}
                                                            </div>
                                                        </div>

                                                        {caseItem.notes && (
                                                            <div className="p-3 bg-muted rounded-lg">
                                                                <p className="text-sm">{caseItem.notes}</p>
                                                            </div>
                                                        )}

                                                        <div className="flex gap-2 flex-wrap">
                                                            {caseItem.status === "pending" && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => updateStatus(caseItem.id, "in_progress")}
                                                                >
                                                                    開始評估
                                                                </Button>
                                                            )}
                                                            {caseItem.status === "in_progress" && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => updateStatus(caseItem.id, "completed")}
                                                                    >
                                                                        完成評估
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={() => handleWriteReport(caseItem)}>
                                                                        撰寫報告
                                                                    </Button>
                                                                </>
                                                            )}
                                                            <Button size="sm" variant="ghost" onClick={() => handleViewDetails(caseItem)}>
                                                                查看詳情
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* Dialogs */}
                {selectedCase && (
                    <>
                        <CaseDetailDialog
                            isOpen={isDetailDialogOpen}
                            onClose={() => setIsDetailDialogOpen(false)}
                            caseData={{
                                id: selectedCase.id,
                                studentName: selectedCase.studentName,
                                grade: selectedCase.grade,
                                referredBy: selectedCase.referredBy,
                                date: selectedCase.referralDate,
                                status: selectedCase.status,
                                priority: selectedCase.priority,
                                description: selectedCase.notes || "無詳細描述",
                                notes: selectedCase.notes
                            }}
                            caseType="psychological"
                        />
                        <PsychologicalReportDialog
                            isOpen={isReportDialogOpen}
                            onClose={() => setIsReportDialogOpen(false)}
                            caseId={selectedCase.id}
                            studentName={selectedCase.studentName}
                            onSave={handleSaveReport}
                        />
                    </>
                )}
            </div>
        </ProtectedRoute>
    )
}
