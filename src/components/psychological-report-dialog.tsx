"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { FileText, Save, Download } from "lucide-react"

interface PsychologicalReportDialogProps {
    isOpen: boolean
    onClose: () => void
    caseId: string
    studentName: string
    onSave: (reportData: any) => void
}

export function PsychologicalReportDialog({
    isOpen,
    onClose,
    caseId,
    studentName,
    onSave
}: PsychologicalReportDialogProps) {
    const [reportData, setReportData] = useState({
        assessmentDate: new Date().toISOString().split('T')[0],
        mentalState: "",
        emotionalState: "",
        behavioralObservations: "",
        riskAssessment: "",
        diagnosis: "",
        recommendations: "",
        followUpPlan: ""
    })

    const handleSave = () => {
        onSave({
            caseId,
            ...reportData,
            createdAt: new Date().toISOString()
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <FileText className="h-6 w-6 text-pink-600" />
                        心理評估報告
                    </DialogTitle>
                    <DialogDescription>
                        案件編號: {caseId} | 學生: {studentName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* 評估日期 */}
                    <div className="space-y-2">
                        <Label htmlFor="assessmentDate">評估日期</Label>
                        <Input
                            id="assessmentDate"
                            type="date"
                            value={reportData.assessmentDate}
                            onChange={(e) => setReportData({ ...reportData, assessmentDate: e.target.value })}
                        />
                    </div>

                    <Separator />

                    {/* 心理狀態評估 */}
                    <div className="space-y-2">
                        <Label htmlFor="mentalState">心理狀態評估</Label>
                        <Textarea
                            id="mentalState"
                            placeholder="描述學生當前的心理狀態、認知功能、思考模式等..."
                            value={reportData.mentalState}
                            onChange={(e) => setReportData({ ...reportData, mentalState: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* 情緒狀態評估 */}
                    <div className="space-y-2">
                        <Label htmlFor="emotionalState">情緒狀態評估</Label>
                        <Textarea
                            id="emotionalState"
                            placeholder="描述學生的情緒反應、情感表達、情緒調節能力等..."
                            value={reportData.emotionalState}
                            onChange={(e) => setReportData({ ...reportData, emotionalState: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* 行為觀察 */}
                    <div className="space-y-2">
                        <Label htmlFor="behavioralObservations">行為觀察</Label>
                        <Textarea
                            id="behavioralObservations"
                            placeholder="記錄觀察到的行為模式、社交互動、應對機制等..."
                            value={reportData.behavioralObservations}
                            onChange={(e) => setReportData({ ...reportData, behavioralObservations: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <Separator />

                    {/* 風險評估 */}
                    <div className="space-y-2">
                        <Label htmlFor="riskAssessment">風險評估</Label>
                        <Textarea
                            id="riskAssessment"
                            placeholder="評估自傷、自殺風險、攻擊性行為等潛在風險..."
                            value={reportData.riskAssessment}
                            onChange={(e) => setReportData({ ...reportData, riskAssessment: e.target.value })}
                            rows={3}
                            className="border-orange-200 focus:border-orange-400"
                        />
                    </div>

                    {/* 初步診斷 */}
                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">初步診斷/評估結論</Label>
                        <Textarea
                            id="diagnosis"
                            placeholder="根據評估結果提供初步診斷或評估結論..."
                            value={reportData.diagnosis}
                            onChange={(e) => setReportData({ ...reportData, diagnosis: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <Separator />

                    {/* 建議與介入措施 */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendations">建議與介入措施</Label>
                        <Textarea
                            id="recommendations"
                            placeholder="提供具體的輔導建議、治療方向、家長配合事項等..."
                            value={reportData.recommendations}
                            onChange={(e) => setReportData({ ...reportData, recommendations: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* 後續追蹤計劃 */}
                    <div className="space-y-2">
                        <Label htmlFor="followUpPlan">後續追蹤計劃</Label>
                        <Textarea
                            id="followUpPlan"
                            placeholder="規劃後續追蹤時間、頻率、評估重點等..."
                            value={reportData.followUpPlan}
                            onChange={(e) => setReportData({ ...reportData, followUpPlan: e.target.value })}
                            rows={3}
                        />
                    </div>

                    {/* 操作按鈕 */}
                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={onClose}>
                            取消
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                匯出 PDF
                            </Button>
                            <Button onClick={handleSave} className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                儲存報告
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
