"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, School, AlertTriangle, FileText, Clock } from "lucide-react"
import { toast } from "sonner"

interface CaseDetailDialogProps {
    isOpen: boolean
    onClose: () => void
    caseData: {
        id: string
        studentName: string
        grade: string
        reportedBy?: string
        referredBy?: string
        date: string
        status: string
        priority?: string
        severity?: string
        description: string
        notes?: string
        caseType?: string
    }
    caseType: 'school' | 'psychological' | 'legal'
}

const statusConfig: Record<string, { label: string, color: string }> = {
    pending: { label: "待處理", color: "bg-yellow-100 text-yellow-700" },
    in_progress: { label: "處理中", color: "bg-blue-100 text-blue-700" },
    resolved: { label: "已解決", color: "bg-green-100 text-green-700" },
    reviewing: { label: "審查中", color: "bg-blue-100 text-blue-700" },
    completed: { label: "已完成", color: "bg-green-100 text-green-700" }
}

const priorityConfig: Record<string, { label: string, color: string }> = {
    low: { label: "低", color: "bg-blue-100 text-blue-700" },
    medium: { label: "中", color: "bg-orange-100 text-orange-700" },
    high: { label: "高", color: "bg-red-100 text-red-700" }
}

const caseTypeConfig: Record<string, { label: string, color: string }> = {
    civil: { label: "民事", color: "bg-blue-100 text-blue-700" },
    criminal: { label: "刑事", color: "bg-red-100 text-red-700" },
    administrative: { label: "行政", color: "bg-purple-100 text-purple-700" }
}

export function CaseDetailDialog({ isOpen, onClose, caseData, caseType }: CaseDetailDialogProps) {
    const statusInfo = statusConfig[caseData.status] || { label: caseData.status, color: "bg-gray-100 text-gray-700" }
    const priorityInfo = caseData.priority ? priorityConfig[caseData.priority] : null
    const caseTypeInfo = caseData.caseType ? caseTypeConfig[caseData.caseType] : null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <FileText className="h-6 w-6" />
                        案件詳情
                    </DialogTitle>
                    <DialogDescription>
                        案件編號: {caseData.id}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* 狀態標籤 */}
                    <div className="flex flex-wrap gap-2">
                        <Badge className={statusInfo.color}>
                            {statusInfo.label}
                        </Badge>
                        {priorityInfo && (
                            <Badge className={priorityInfo.color}>
                                優先度：{priorityInfo.label}
                            </Badge>
                        )}
                        {caseTypeInfo && (
                            <Badge className={caseTypeInfo.color}>
                                {caseTypeInfo.label}
                            </Badge>
                        )}
                    </div>

                    <Separator />

                    {/* 基本資訊 */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <User className="h-5 w-5" />
                            基本資訊
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">學生姓名</p>
                                <p className="font-medium">{caseData.studentName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">年級班級</p>
                                <p className="font-medium">{caseData.grade}</p>
                            </div>
                            {caseData.reportedBy && (
                                <div>
                                    <p className="text-sm text-muted-foreground">舉報人</p>
                                    <p className="font-medium">{caseData.reportedBy}</p>
                                </div>
                            )}
                            {caseData.referredBy && (
                                <div>
                                    <p className="text-sm text-muted-foreground">轉介人</p>
                                    <p className="font-medium">{caseData.referredBy}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    日期
                                </p>
                                <p className="font-medium">{caseData.date}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* 案件描述 */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            案件描述
                        </h3>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm whitespace-pre-wrap">{caseData.description}</p>
                        </div>
                    </div>

                    {/* 備註 */}
                    {caseData.notes && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    備註
                                </h3>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm whitespace-pre-wrap">{caseData.notes}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 操作按鈕 */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            關閉
                        </Button>
                        <Button onClick={() => {
                            toast.info("編輯功能開發中", {
                                description: `案件 ${caseData.id} 的編輯功能即將推出`
                            })
                        }}>
                            編輯案件
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
