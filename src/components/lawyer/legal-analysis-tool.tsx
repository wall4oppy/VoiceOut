"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Scale, FileText, Save } from "lucide-react"

interface LegalAnalysis {
    caseId: string
    studentName: string
    analysisDate: string
    caseType: "civil" | "criminal" | "administrative"
    legalIssues: string[]
    factualFindings: string
    applicableLaws: string
    legalOpinion: string
    liability: string
    recommendations: string
    urgency: "low" | "medium" | "high"
}

const legalIssueOptions = [
    { id: "defamation", label: "誹謗罪" },
    { id: "harassment", label: "騷擾" },
    { id: "threats", label: "恐嚇" },
    { id: "assault", label: "傷害" },
    { id: "privacy", label: "侵害隱私" },
    { id: "property", label: "毀損財物" },
    { id: "discrimination", label: "歧視" },
    { id: "other", label: "其他法律問題" }
]

interface LegalAnalysisToolProps {
    caseId: string
    studentName: string
    isOpen: boolean
    onClose: () => void
    onSubmit: (analysis: LegalAnalysis) => void
}

export function LegalAnalysisTool({
    caseId,
    studentName,
    isOpen,
    onClose,
    onSubmit
}: LegalAnalysisToolProps) {
    const [analysisData, setAnalysisData] = useState<LegalAnalysis>({
        caseId,
        studentName,
        analysisDate: new Date().toISOString().split('T')[0],
        caseType: "civil",
        legalIssues: [],
        factualFindings: "",
        applicableLaws: "",
        legalOpinion: "",
        liability: "",
        recommendations: "",
        urgency: "medium"
    })

    const handleIssueToggle = (issueId: string) => {
        setAnalysisData(prev => ({
            ...prev,
            legalIssues: prev.legalIssues.includes(issueId)
                ? prev.legalIssues.filter(i => i !== issueId)
                : [...prev.legalIssues, issueId]
        }))
    }

    const handleSubmit = () => {
        onSubmit(analysisData)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-amber-600" />
                        法律分析工具
                    </DialogTitle>
                    <DialogDescription>
                        為 {studentName} 的案件進行完整的法律分析
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* 基本資訊 */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">案件資訊</CardTitle>
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
                                    <Label className="text-sm text-muted-foreground">分析日期</Label>
                                    <p className="font-medium">{analysisData.analysisDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 案件類型 */}
                    <div className="space-y-3">
                        <Label>案件類型 *</Label>
                        <RadioGroup
                            value={analysisData.caseType}
                            onValueChange={(value) => setAnalysisData({ ...analysisData, caseType: value as any })}
                        >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="civil" id="type-civil" />
                                <Label htmlFor="type-civil" className="cursor-pointer flex-1">
                                    <span className="font-medium">民事案件</span>
                                    <p className="text-sm text-muted-foreground">損害賠償、名譽侵害等</p>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="criminal" id="type-criminal" />
                                <Label htmlFor="type-criminal" className="cursor-pointer flex-1">
                                    <span className="font-medium">刑事案件</span>
                                    <p className="text-sm text-muted-foreground">誹謗、恐嚇、傷害等</p>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="administrative" id="type-admin" />
                                <Label htmlFor="type-admin" className="cursor-pointer flex-1">
                                    <span className="font-medium">行政案件</span>
                                    <p className="text-sm text-muted-foreground">學校處分、申訴等</p>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* 法律問題檢核 */}
                    <div className="space-y-3">
                        <Label>涉及法律問題</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {legalIssueOptions.map((issue) => (
                                <div key={issue.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={issue.id}
                                        checked={analysisData.legalIssues.includes(issue.id)}
                                        onCheckedChange={() => handleIssueToggle(issue.id)}
                                    />
                                    <Label htmlFor={issue.id} className="cursor-pointer font-normal">
                                        {issue.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 事實認定 */}
                    <div className="space-y-2">
                        <Label htmlFor="factualFindings">事實認定 *</Label>
                        <Textarea
                            id="factualFindings"
                            value={analysisData.factualFindings}
                            onChange={(e) => setAnalysisData({ ...analysisData, factualFindings: e.target.value })}
                            placeholder="詳細記錄案件的事實經過、證據資料、相關人證物證等..."
                            rows={5}
                        />
                    </div>

                    {/* 適用法律 */}
                    <div className="space-y-2">
                        <Label htmlFor="applicableLaws">適用法律條文 *</Label>
                        <Textarea
                            id="applicableLaws"
                            value={analysisData.applicableLaws}
                            onChange={(e) => setAnalysisData({ ...analysisData, applicableLaws: e.target.value })}
                            placeholder="列出相關的法律條文，如刑法第309條、民法第184條等..."
                            rows={4}
                        />
                    </div>

                    {/* 法律意見 */}
                    <div className="space-y-2">
                        <Label htmlFor="legalOpinion">法律意見 *</Label>
                        <Textarea
                            id="legalOpinion"
                            value={analysisData.legalOpinion}
                            onChange={(e) => setAnalysisData({ ...analysisData, legalOpinion: e.target.value })}
                            placeholder="提供專業的法律分析與意見，說明案件的法律性質與可能結果..."
                            rows={6}
                        />
                    </div>

                    {/* 責任歸屬 */}
                    <div className="space-y-2">
                        <Label htmlFor="liability">責任歸屬分析</Label>
                        <Textarea
                            id="liability"
                            value={analysisData.liability}
                            onChange={(e) => setAnalysisData({ ...analysisData, liability: e.target.value })}
                            placeholder="分析各方的法律責任，包括學生、家長、學校等..."
                            rows={4}
                        />
                    </div>

                    {/* 建議處理方式 */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendations">建議處理方式 *</Label>
                        <Textarea
                            id="recommendations"
                            value={analysisData.recommendations}
                            onChange={(e) => setAnalysisData({ ...analysisData, recommendations: e.target.value })}
                            placeholder="提供具體的處理建議，如和解、調解、訴訟等途徑..."
                            rows={5}
                        />
                    </div>

                    {/* 緊急程度 */}
                    <div className="space-y-3">
                        <Label>緊急程度 *</Label>
                        <RadioGroup
                            value={analysisData.urgency}
                            onValueChange={(value) => setAnalysisData({ ...analysisData, urgency: value as any })}
                        >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="low" id="urgency-low" />
                                <Label htmlFor="urgency-low" className="cursor-pointer flex-1">
                                    <span className="font-medium text-green-700">一般處理</span>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="medium" id="urgency-medium" />
                                <Label htmlFor="urgency-medium" className="cursor-pointer flex-1">
                                    <span className="font-medium text-orange-700">需盡快處理</span>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="high" id="urgency-high" />
                                <Label htmlFor="urgency-high" className="cursor-pointer flex-1">
                                    <span className="font-medium text-red-700">緊急處理</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        取消
                    </Button>
                    <Button onClick={handleSubmit}>
                        <Save className="h-4 w-4 mr-2" />
                        儲存分析
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
