"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/roles"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { FadeIn } from "@/components/ui/motion"
import { CaseDetailDialog } from "@/components/case-detail-dialog"
import { LegalOpinionDialog } from "@/components/legal-opinion-dialog"

interface LegalCase {
    id: string
    studentName: string
    grade: string
    referredBy: string
    referralDate: string
    status: "pending" | "reviewing" | "completed"
    caseType: "civil" | "criminal" | "administrative"
    severity: "low" | "medium" | "high"
    description: string
}

const mockCases: LegalCase[] = [
    {
        id: "LAW-001",
        studentName: "王小明",
        grade: "3年2班",
        referredBy: "張老師",
        referralDate: "2024-11-22",
        status: "pending",
        caseType: "criminal",
        severity: "high",
        description: "涉及網路霸凌與恐嚇，需要評估是否構成刑事責任。"
    },
    {
        id: "LAW-002",
        studentName: "陳小美",
        grade: "2年3班",
        referredBy: "李老師",
        referralDate: "2024-11-20",
        status: "reviewing",
        caseType: "civil",
        severity: "medium",
        description: "個人物品遭到破壞，家長希望了解民事求償途徑。"
    }
]

const statusConfig = {
    pending: { label: "待審查", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    reviewing: { label: "審查中", color: "bg-blue-100 text-blue-700", icon: FileText },
    completed: { label: "已完成", color: "bg-green-100 text-green-700", icon: CheckCircle }
}

const caseTypeConfig = {
    civil: { label: "民事", color: "bg-blue-100 text-blue-700" },
    criminal: { label: "刑事", color: "bg-red-100 text-red-700" },
    administrative: { label: "行政", color: "bg-purple-100 text-purple-700" }
}

const severityConfig = {
    low: { label: "低", color: "bg-green-100 text-green-700" },
    medium: { label: "中", color: "bg-orange-100 text-orange-700" },
    high: { label: "高", color: "bg-red-100 text-red-700" }
}

export default function LawyerWorkspace() {
    const { user } = useAuth()
    const [cases, setCases] = useState<LegalCase[]>(mockCases)
    const [activeTab, setActiveTab] = useState<"pending" | "reviewing" | "completed" | "all">("all")
    const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isOpinionDialogOpen, setIsOpinionDialogOpen] = useState(false)

    const filteredCases = activeTab === "all"
        ? cases
        : cases.filter(c => c.status === activeTab)

    const updateStatus = (caseId: string, newStatus: "pending" | "reviewing" | "completed") => {
        setCases(cases.map(c => c.id === caseId ? { ...c, status: newStatus } : c))
    }

    const pendingCount = cases.filter(c => c.status === "pending").length
    const reviewingCount = cases.filter(c => c.status === "reviewing").length
    const completedCount = cases.filter(c => c.status === "completed").length

    const handleViewDetails = (caseItem: LegalCase) => {
        setSelectedCase(caseItem)
        setIsDetailDialogOpen(true)
    }

    const handleWriteOpinion = (caseItem: LegalCase) => {
        setSelectedCase(caseItem)
        setIsOpinionDialogOpen(true)
    }

    const handleSaveOpinion = (opinionData: any) => {
        console.log("Saving legal opinion:", opinionData)
        // TODO: Save to backend
        alert("意見書已儲存！")
    }

    return (
        <ProtectedRoute requiredRole={UserRole.LAWYER}>
            <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8 space-y-8">
                <FadeIn>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Scale className="h-8 w-8 text-amber-600" />
                            律師工作台
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            歡迎，{user?.name || "律師"}。管理您的法律諮詢案件與意見書撰寫。
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>法律諮詢案件</CardTitle>
                            <CardDescription>查看並處理轉介的法律評估案件</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="all">全部 ({cases.length})</TabsTrigger>
                                    <TabsTrigger value="pending">待審查 ({pendingCount})</TabsTrigger>
                                    <TabsTrigger value="reviewing">審查中 ({reviewingCount})</TabsTrigger>
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
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="font-semibold">{caseItem.id}</span>
                                                                <Badge className={caseTypeConfig[caseItem.caseType].color}>
                                                                    {caseTypeConfig[caseItem.caseType].label}
                                                                </Badge>
                                                                <Badge className={severityConfig[caseItem.severity].color}>
                                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                                    嚴重度：{severityConfig[caseItem.severity].label}
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

                                                        <div className="p-3 bg-muted rounded-lg">
                                                            <p className="text-sm">{caseItem.description}</p>
                                                        </div>

                                                        <div className="flex gap-2 flex-wrap">
                                                            {caseItem.status === "pending" && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => updateStatus(caseItem.id, "reviewing")}
                                                                >
                                                                    開始審查
                                                                </Button>
                                                            )}
                                                            {caseItem.status === "reviewing" && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => updateStatus(caseItem.id, "completed")}
                                                                    >
                                                                        完成審查
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={() => handleWriteOpinion(caseItem)}>
                                                                        撰寫意見書
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
                                severity: selectedCase.severity,
                                caseType: selectedCase.caseType,
                                description: selectedCase.description,
                                notes: selectedCase.description
                            }}
                            caseType="legal"
                        />
                        <LegalOpinionDialog
                            isOpen={isOpinionDialogOpen}
                            onClose={() => setIsOpinionDialogOpen(false)}
                            caseId={selectedCase.id}
                            studentName={selectedCase.studentName}
                            caseType={selectedCase.caseType}
                            onSave={handleSaveOpinion}
                        />
                    </>
                )}
            </div>
        </ProtectedRoute>
    )
}
