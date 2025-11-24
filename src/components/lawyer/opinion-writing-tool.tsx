"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Download, Save } from "lucide-react"

interface LegalOpinion {
    caseId: string
    studentName: string
    opinionDate: string
    caseBackground: string
    legalIssues: string
    legalAnalysis: string
    conclusion: string
    recommendations: string
    disclaimer: string
}

interface OpinionWritingToolProps {
    caseId: string
    studentName: string
    isOpen: boolean
    onClose: () => void
    onSubmit: (opinion: LegalOpinion) => void
}

export function OpinionWritingTool({
    caseId,
    studentName,
    isOpen,
    onClose,
    onSubmit
}: OpinionWritingToolProps) {
    const [opinionData, setOpinionData] = useState<LegalOpinion>({
        caseId,
        studentName,
        opinionDate: new Date().toISOString().split('T')[0],
        caseBackground: "",
        legalIssues: "",
        legalAnalysis: "",
        conclusion: "",
        recommendations: "",
        disclaimer: "本法律意見書僅供參考，不構成正式法律諮詢。具體法律行動應諮詢執業律師。"
    })

    const handleSubmit = () => {
        onSubmit(opinionData)
        onClose()
    }

    const handleExport = () => {
        const opinionContent = `
法律意見書
================

案件編號：${opinionData.caseId}
當事人：${opinionData.studentName}
意見書日期：${opinionData.opinionDate}

一、案件背景
${opinionData.caseBackground}

二、法律問題
${opinionData.legalIssues}

三、法律分析
${opinionData.legalAnalysis}

四、結論
${opinionData.conclusion}

五、建議
${opinionData.recommendations}

---
免責聲明：
${opinionData.disclaimer}
        `.trim()

        const blob = new Blob([opinionContent], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `法律意見書_${studentName}_${opinionData.opinionDate}.txt`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-amber-600" />
                        法律意見書撰寫
                    </DialogTitle>
                    <DialogDescription>
                        為 {studentName} 撰寫正式的法律意見書
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* 基本資訊 */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">意見書資訊</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">案件編號</Label>
                                    <p className="font-medium">{caseId}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">當事人</Label>
                                    <p className="font-medium">{studentName}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">意見書日期</Label>
                                    <p className="font-medium">{opinionData.opinionDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 案件背景 */}
                    <div className="space-y-2">
                        <Label htmlFor="caseBackground">一、案件背景 *</Label>
                        <Textarea
                            id="caseBackground"
                            value={opinionData.caseBackground}
                            onChange={(e) => setOpinionData({ ...opinionData, caseBackground: e.target.value })}
                            placeholder="簡述案件的基本事實、發生經過、相關人員等背景資訊..."
                            rows={5}
                        />
                    </div>

                    {/* 法律問題 */}
                    <div className="space-y-2">
                        <Label htmlFor="legalIssues">二、法律問題 *</Label>
                        <Textarea
                            id="legalIssues"
                            value={opinionData.legalIssues}
                            onChange={(e) => setOpinionData({ ...opinionData, legalIssues: e.target.value })}
                            placeholder="明確列出本案涉及的法律問題，如：1. 是否構成誹謗？ 2. 損害賠償範圍為何？..."
                            rows={4}
                        />
                    </div>

                    {/* 法律分析 */}
                    <div className="space-y-2">
                        <Label htmlFor="legalAnalysis">三、法律分析 *</Label>
                        <Textarea
                            id="legalAnalysis"
                            value={opinionData.legalAnalysis}
                            onChange={(e) => setOpinionData({ ...opinionData, legalAnalysis: e.target.value })}
                            placeholder="詳細分析相關法律條文、判例、學說見解，並說明如何適用於本案..."
                            rows={8}
                        />
                    </div>

                    {/* 結論 */}
                    <div className="space-y-2">
                        <Label htmlFor="conclusion">四、結論 *</Label>
                        <Textarea
                            id="conclusion"
                            value={opinionData.conclusion}
                            onChange={(e) => setOpinionData({ ...opinionData, conclusion: e.target.value })}
                            placeholder="根據前述分析，提出明確的法律結論..."
                            rows={4}
                        />
                    </div>

                    {/* 建議 */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendations">五、建議 *</Label>
                        <Textarea
                            id="recommendations"
                            value={opinionData.recommendations}
                            onChange={(e) => setOpinionData({ ...opinionData, recommendations: e.target.value })}
                            placeholder="提供具體的行動建議，如：1. 建議先行和解 2. 蒐集相關證據 3. 必要時提起訴訟..."
                            rows={5}
                        />
                    </div>

                    {/* 免責聲明 */}
                    <div className="space-y-2">
                        <Label htmlFor="disclaimer">免責聲明</Label>
                        <Textarea
                            id="disclaimer"
                            value={opinionData.disclaimer}
                            onChange={(e) => setOpinionData({ ...opinionData, disclaimer: e.target.value })}
                            rows={3}
                            className="text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        匯出意見書
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>
                            取消
                        </Button>
                        <Button onClick={handleSubmit}>
                            <Save className="h-4 w-4 mr-2" />
                            儲存意見書
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
