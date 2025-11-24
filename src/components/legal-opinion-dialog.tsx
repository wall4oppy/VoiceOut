"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Scale, Save, Download } from "lucide-react"

interface LegalOpinionDialogProps {
    isOpen: boolean
    onClose: () => void
    caseId: string
    studentName: string
    caseType: 'civil' | 'criminal' | 'administrative'
    onSave: (opinionData: any) => void
}

export function LegalOpinionDialog({
    isOpen,
    onClose,
    caseId,
    studentName,
    caseType,
    onSave
}: LegalOpinionDialogProps) {
    const [opinionData, setOpinionData] = useState({
        opinionDate: new Date().toISOString().split('T')[0],
        factsSummary: "",
        legalIssues: "",
        applicableLaws: "",
        legalAnalysis: "",
        caseReferences: "",
        legalOpinion: "",
        recommendations: "",
        nextSteps: ""
    })

    const handleSave = () => {
        onSave({
            caseId,
            caseType,
            ...opinionData,
            createdAt: new Date().toISOString()
        })
        onClose()
    }

    const caseTypeLabels = {
        civil: "民事",
        criminal: "刑事",
        administrative: "行政"
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Scale className="h-6 w-6 text-amber-600" />
                        法律意見書
                    </DialogTitle>
                    <DialogDescription>
                        案件編號: {caseId} | 學生: {studentName} | 類型: {caseTypeLabels[caseType]}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* 意見書日期 */}
                    <div className="space-y-2">
                        <Label htmlFor="opinionDate">意見書日期</Label>
                        <Input
                            id="opinionDate"
                            type="date"
                            value={opinionData.opinionDate}
                            onChange={(e) => setOpinionData({ ...opinionData, opinionDate: e.target.value })}
                        />
                    </div>

                    <Separator />

                    {/* 事實摘要 */}
                    <div className="space-y-2">
                        <Label htmlFor="factsSummary">事實摘要</Label>
                        <Textarea
                            id="factsSummary"
                            placeholder="簡要陳述案件相關事實、時間、地點、涉及人員等..."
                            value={opinionData.factsSummary}
                            onChange={(e) => setOpinionData({ ...opinionData, factsSummary: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* 法律爭點 */}
                    <div className="space-y-2">
                        <Label htmlFor="legalIssues">法律爭點</Label>
                        <Textarea
                            id="legalIssues"
                            placeholder="列出本案涉及的主要法律問題和爭議點..."
                            value={opinionData.legalIssues}
                            onChange={(e) => setOpinionData({ ...opinionData, legalIssues: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <Separator />

                    {/* 適用法律 */}
                    <div className="space-y-2">
                        <Label htmlFor="applicableLaws">適用法律條文</Label>
                        <Textarea
                            id="applicableLaws"
                            placeholder="列出相關法律條文（如：民法第184條、刑法第305條等）..."
                            value={opinionData.applicableLaws}
                            onChange={(e) => setOpinionData({ ...opinionData, applicableLaws: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* 法律分析 */}
                    <div className="space-y-2">
                        <Label htmlFor="legalAnalysis">法律分析</Label>
                        <Textarea
                            id="legalAnalysis"
                            placeholder="針對法律爭點進行詳細分析，說明法律適用情形..."
                            value={opinionData.legalAnalysis}
                            onChange={(e) => setOpinionData({ ...opinionData, legalAnalysis: e.target.value })}
                            rows={5}
                        />
                    </div>

                    {/* 相關判例 */}
                    <div className="space-y-2">
                        <Label htmlFor="caseReferences">相關判例/案例</Label>
                        <Textarea
                            id="caseReferences"
                            placeholder="引用相關判例或類似案例作為參考..."
                            value={opinionData.caseReferences}
                            onChange={(e) => setOpinionData({ ...opinionData, caseReferences: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <Separator />

                    {/* 法律意見 */}
                    <div className="space-y-2">
                        <Label htmlFor="legalOpinion">法律意見</Label>
                        <Textarea
                            id="legalOpinion"
                            placeholder="提供專業法律意見，說明可能的法律後果和權利救濟途徑..."
                            value={opinionData.legalOpinion}
                            onChange={(e) => setOpinionData({ ...opinionData, legalOpinion: e.target.value })}
                            rows={4}
                            className="border-amber-200 focus:border-amber-400"
                        />
                    </div>

                    {/* 建議措施 */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendations">建議措施</Label>
                        <Textarea
                            id="recommendations"
                            placeholder="提供具體的法律行動建議、證據蒐集方向、和解可能性等..."
                            value={opinionData.recommendations}
                            onChange={(e) => setOpinionData({ ...opinionData, recommendations: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* 後續步驟 */}
                    <div className="space-y-2">
                        <Label htmlFor="nextSteps">後續步驟</Label>
                        <Textarea
                            id="nextSteps"
                            placeholder="規劃後續法律程序、時程安排、需要準備的文件等..."
                            value={opinionData.nextSteps}
                            onChange={(e) => setOpinionData({ ...opinionData, nextSteps: e.target.value })}
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
                                儲存意見書
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
