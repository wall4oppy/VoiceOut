"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Download, Save } from "lucide-react"

interface PsychologicalReport {
    caseId: string
    studentName: string
    reportDate: string
    assessmentSummary: string
    findings: string
    diagnosis: string
    treatmentPlan: string
    prognosis: string
    recommendations: string
}

interface ReportWritingToolProps {
    caseId: string
    studentName: string
    isOpen: boolean
    onClose: () => void
    onSubmit: (report: PsychologicalReport) => void
}

export function ReportWritingTool({
    caseId,
    studentName,
    isOpen,
    onClose,
    onSubmit
}: ReportWritingToolProps) {
    const [reportData, setReportData] = useState<PsychologicalReport>({
        caseId,
        studentName,
        reportDate: new Date().toISOString().split('T')[0],
        assessmentSummary: "",
        findings: "",
        diagnosis: "",
        treatmentPlan: "",
        prognosis: "",
        recommendations: ""
    })

    const handleSubmit = () => {
        onSubmit(reportData)
        onClose()
    }

    const handleExport = () => {
        const reportContent = `
心理評估報告
================

案件編號：${reportData.caseId}
學生姓名：${reportData.studentName}
報告日期：${reportData.reportDate}

一、評估摘要
${reportData.assessmentSummary}

二、評估發現
${reportData.findings}

三、診斷與分析
${reportData.diagnosis}

四、治療計畫
${reportData.treatmentPlan}

五、預後評估
${reportData.prognosis}

六、專業建議
${reportData.recommendations}
        `.trim()

        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `心理評估報告_${studentName}_${reportData.reportDate}.txt`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-pink-600" />
                        心理評估報告撰寫
                    </DialogTitle>
                    <DialogDescription>
                        為 {studentName} 撰寫完整的心理評估報告
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* 基本資訊 */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">報告資訊</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">案件編號</Label>
                                    <p className="font-medium">{caseId}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">學生姓名</Label>
                                    <p className="font-medium">{studentName}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">報告日期</Label>
                                    <p className="font-medium">{reportData.reportDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 評估摘要 */}
                    <div className="space-y-2">
                        <Label htmlFor="assessmentSummary">一、評估摘要 *</Label>
                        <Textarea
                            id="assessmentSummary"
                            value={reportData.assessmentSummary}
                            onChange={(e) => setReportData({ ...reportData, assessmentSummary: e.target.value })}
                            placeholder="簡要說明評估的目的、時間、方式及學生的基本狀況..."
                            rows={4}
                        />
                    </div>

                    {/* 評估發現 */}
                    <div className="space-y-2">
                        <Label htmlFor="findings">二、評估發現 *</Label>
                        <Textarea
                            id="findings"
                            value={reportData.findings}
                            onChange={(e) => setReportData({ ...reportData, findings: e.target.value })}
                            placeholder="詳細記錄評估過程中的觀察、測驗結果、訪談內容等..."
                            rows={6}
                        />
                    </div>

                    {/* 診斷與分析 */}
                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">三、診斷與分析 *</Label>
                        <Textarea
                            id="diagnosis"
                            value={reportData.diagnosis}
                            onChange={(e) => setReportData({ ...reportData, diagnosis: e.target.value })}
                            placeholder="根據評估結果進行專業診斷與分析，說明可能的心理狀態或問題..."
                            rows={5}
                        />
                    </div>

                    {/* 治療計畫 */}
                    <div className="space-y-2">
                        <Label htmlFor="treatmentPlan">四、治療計畫 *</Label>
                        <Textarea
                            id="treatmentPlan"
                            value={reportData.treatmentPlan}
                            onChange={(e) => setReportData({ ...reportData, treatmentPlan: e.target.value })}
                            placeholder="提出具體的治療或輔導計畫，包括頻率、方式、目標等..."
                            rows={5}
                        />
                    </div>

                    {/* 預後評估 */}
                    <div className="space-y-2">
                        <Label htmlFor="prognosis">五、預後評估</Label>
                        <Textarea
                            id="prognosis"
                            value={reportData.prognosis}
                            onChange={(e) => setReportData({ ...reportData, prognosis: e.target.value })}
                            placeholder="評估學生的恢復可能性、預期改善程度等..."
                            rows={4}
                        />
                    </div>

                    {/* 專業建議 */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendations">六、專業建議 *</Label>
                        <Textarea
                            id="recommendations"
                            value={reportData.recommendations}
                            onChange={(e) => setReportData({ ...reportData, recommendations: e.target.value })}
                            placeholder="給予學校、家長、學生的具體建議與配合事項..."
                            rows={5}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        匯出報告
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>
                            取消
                        </Button>
                        <Button onClick={handleSubmit}>
                            <Save className="h-4 w-4 mr-2" />
                            儲存報告
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
