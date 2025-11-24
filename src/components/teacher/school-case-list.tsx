"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { CaseDetailDialog } from "@/components/case-detail-dialog"
import { CaseActionDialog, ActionType } from "@/components/case-action-dialog"

type CaseStatus = "pending" | "in_progress" | "resolved"

interface BullyingCase {
    id: string
    studentName: string
    grade: string
    reportDate: string
    description: string
    status: CaseStatus
    severity: "low" | "medium" | "high"
}

const mockCases: BullyingCase[] = [
    {
        id: "CASE-001",
        studentName: "王小明",
        grade: "3年2班",
        reportDate: "2024-11-20",
        description: "在社群媒體上遭受言語霸凌",
        status: "pending",
        severity: "high"
    },
    {
        id: "CASE-002",
        studentName: "李小華",
        grade: "2年1班",
        reportDate: "2024-11-18",
        description: "被同學排擠，午餐時間無人願意同坐",
        status: "in_progress",
        severity: "medium"
    },
    {
        id: "CASE-003",
        studentName: "陳小美",
        grade: "3年2班",
        reportDate: "2024-11-15",
        description: "個人物品遭到破壞",
        status: "resolved",
        severity: "medium"
    }
]

const statusConfig = {
    pending: { label: "待處理", color: "bg-red-100 text-red-700", icon: AlertCircle },
    in_progress: { label: "處理中", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    resolved: { label: "已解決", color: "bg-green-100 text-green-700", icon: CheckCircle }
}

const severityConfig = {
    low: { label: "低", color: "bg-blue-100 text-blue-700" },
    medium: { label: "中", color: "bg-orange-100 text-orange-700" },
    high: { label: "高", color: "bg-red-100 text-red-700" }
}

export function SchoolCaseList() {
    const [cases, setCases] = useState<BullyingCase[]>(mockCases)
    const [activeTab, setActiveTab] = useState<CaseStatus | "all">("all")
    const [selectedCase, setSelectedCase] = useState<BullyingCase | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isActionOpen, setIsActionOpen] = useState(false)
    const [currentAction, setCurrentAction] = useState<ActionType>("add_note")

    const filteredCases = activeTab === "all"
        ? cases
        : cases.filter(c => c.status === activeTab)

    const handleAction = (caseItem: BullyingCase, action: ActionType) => {
        setSelectedCase(caseItem)
        setCurrentAction(action)
        setIsActionOpen(true)
    }

    const handleViewDetails = (caseItem: BullyingCase) => {
        setSelectedCase(caseItem)
        setIsDetailOpen(true)
    }

    const handleConfirmAction = (data: any) => {
        console.log("Action confirmed:", data)

        // Update case status based on action
        if (data.actionType === "start_processing") {
            setCases(cases.map(c => c.id === data.caseId ? { ...c, status: "in_progress" } : c))
        } else if (data.actionType === "resolve") {
            setCases(cases.map(c => c.id === data.caseId ? { ...c, status: "resolved" } : c))
        }

        // In a real app, we would also save the action log here
        alert("操作已完成！")
    }

    const pendingCount = cases.filter(c => c.status === "pending").length
    const inProgressCount = cases.filter(c => c.status === "in_progress").length
    const resolvedCount = cases.filter(c => c.status === "resolved").length

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    學校案件管理
                </CardTitle>
                <CardDescription>
                    查看並處理學生通報的霸凌案件
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CaseStatus | "all")}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">
                            全部 ({cases.length})
                        </TabsTrigger>
                        <TabsTrigger value="pending">
                            待處理 ({pendingCount})
                        </TabsTrigger>
                        <TabsTrigger value="in_progress">
                            處理中 ({inProgressCount})
                        </TabsTrigger>
                        <TabsTrigger value="resolved">
                            已解決 ({resolvedCount})
                        </TabsTrigger>
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
                                        <CardContent className="p-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-semibold">{caseItem.id}</span>
                                                        <Badge className={severityConfig[caseItem.severity].color}>
                                                            {severityConfig[caseItem.severity].label}
                                                        </Badge>
                                                        <Badge className={statusConfig[caseItem.status].color}>
                                                            <StatusIcon className="h-3 w-3 mr-1" />
                                                            {statusConfig[caseItem.status].label}
                                                        </Badge>
                                                    </div>
                                                    <div className="text-sm">
                                                        <span className="font-medium">{caseItem.studentName}</span>
                                                        <span className="text-muted-foreground"> · {caseItem.grade}</span>
                                                        <span className="text-muted-foreground"> · {caseItem.reportDate}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {caseItem.description}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 flex-wrap">
                                                    {caseItem.status === "pending" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleAction(caseItem, "start_processing")}
                                                        >
                                                            開始處理
                                                        </Button>
                                                    )}
                                                    {caseItem.status === "in_progress" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleAction(caseItem, "resolve")}
                                                        >
                                                            標記為已解決
                                                        </Button>
                                                    )}
                                                    <Button size="sm" variant="ghost" onClick={() => handleViewDetails(caseItem)}>
                                                        查看詳情
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>

            {selectedCase && (
                <>
                    <CaseDetailDialog
                        isOpen={isDetailOpen}
                        onClose={() => setIsDetailOpen(false)}
                        caseData={{
                            id: selectedCase.id,
                            studentName: selectedCase.studentName,
                            grade: selectedCase.grade,
                            date: selectedCase.reportDate,
                            status: selectedCase.status,
                            severity: selectedCase.severity,
                            description: selectedCase.description,
                            notes: selectedCase.description
                        }}
                        caseType="school"
                    />
                    <CaseActionDialog
                        isOpen={isActionOpen}
                        onClose={() => setIsActionOpen(false)}
                        caseId={selectedCase.id}
                        studentName={selectedCase.studentName}
                        actionType={currentAction}
                        onConfirm={handleConfirmAction}
                    />
                </>
            )}
        </Card>
    )
}
