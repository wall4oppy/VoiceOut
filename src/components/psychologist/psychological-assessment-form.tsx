"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Brain, FileText, Save } from "lucide-react"

interface AssessmentForm {
    caseId: string
    studentName: string
    assessmentDate: string
    emotionalState: string
    behavioralObservations: string
    riskLevel: "low" | "medium" | "high"
    symptoms: string[]
    recommendations: string
    followUpRequired: boolean
}

const symptomOptions = [
    { id: "anxiety", label: "焦慮症狀" },
    { id: "depression", label: "憂鬱傾向" },
    { id: "stress", label: "壓力過大" },
    { id: "sleep", label: "睡眠障礙" },
    { id: "social", label: "社交退縮" },
    { id: "academic", label: "學業困難" },
    { id: "self_harm", label: "自傷傾向" },
    { id: "other", label: "其他症狀" }
]

interface PsychologicalAssessmentFormProps {
    caseId: string
    studentName: string
    isOpen: boolean
    onClose: () => void
    onSubmit: (assessment: AssessmentForm) => void
}

export function PsychologicalAssessmentForm({
    caseId,
    studentName,
    isOpen,
    onClose,
    onSubmit
}: PsychologicalAssessmentFormProps) {
    const [formData, setFormData] = useState<AssessmentForm>({
        caseId,
        studentName,
        assessmentDate: new Date().toISOString().split('T')[0],
        emotionalState: "",
        behavioralObservations: "",
        riskLevel: "medium",
        symptoms: [],
        recommendations: "",
        followUpRequired: false
    })

    const handleSymptomToggle = (symptomId: string) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptomId)
                ? prev.symptoms.filter(s => s !== symptomId)
                : [...prev.symptoms, symptomId]
        }))
    }

    const handleSubmit = () => {
        onSubmit(formData)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-pink-600" />
                        心理評估表單
                    </DialogTitle>
                    <DialogDescription>
                        為 {studentName} 進行完整的心理狀態評估
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* 基本資訊 */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">基本資訊</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">案件編號</Label>
                                    <p className="font-medium">{caseId}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">學生姓名</Label>
                                    <p className="font-medium">{studentName}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 情緒狀態 */}
                    <div className="space-y-2">
                        <Label htmlFor="emotionalState">情緒狀態評估 *</Label>
                        <Textarea
                            id="emotionalState"
                            value={formData.emotionalState}
                            onChange={(e) => setFormData({ ...formData, emotionalState: e.target.value })}
                            placeholder="描述學生當前的情緒狀態、表情、語氣等..."
                            rows={4}
                        />
                    </div>

                    {/* 行為觀察 */}
                    <div className="space-y-2">
                        <Label htmlFor="behavioralObservations">行為觀察 *</Label>
                        <Textarea
                            id="behavioralObservations"
                            value={formData.behavioralObservations}
                            onChange={(e) => setFormData({ ...formData, behavioralObservations: e.target.value })}
                            placeholder="記錄觀察到的行為模式、互動方式、肢體語言等..."
                            rows={4}
                        />
                    </div>

                    {/* 症狀檢核 */}
                    <div className="space-y-3">
                        <Label>症狀檢核</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {symptomOptions.map((symptom) => (
                                <div key={symptom.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={symptom.id}
                                        checked={formData.symptoms.includes(symptom.id)}
                                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                                    />
                                    <Label htmlFor={symptom.id} className="cursor-pointer font-normal">
                                        {symptom.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 風險評估 */}
                    <div className="space-y-3">
                        <Label>風險等級評估 *</Label>
                        <RadioGroup
                            value={formData.riskLevel}
                            onValueChange={(value) => setFormData({ ...formData, riskLevel: value as any })}
                        >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="low" id="risk-low" />
                                <Label htmlFor="risk-low" className="cursor-pointer flex-1">
                                    <span className="font-medium text-green-700">低風險</span>
                                    <p className="text-sm text-muted-foreground">情況穩定，定期追蹤即可</p>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="medium" id="risk-medium" />
                                <Label htmlFor="risk-medium" className="cursor-pointer flex-1">
                                    <span className="font-medium text-orange-700">中風險</span>
                                    <p className="text-sm text-muted-foreground">需要持續輔導與關注</p>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="high" id="risk-high" />
                                <Label htmlFor="risk-high" className="cursor-pointer flex-1">
                                    <span className="font-medium text-red-700">高風險</span>
                                    <p className="text-sm text-muted-foreground">需要立即介入與密切監控</p>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* 建議與處置 */}
                    <div className="space-y-2">
                        <Label htmlFor="recommendations">專業建議與處置方案 *</Label>
                        <Textarea
                            id="recommendations"
                            value={formData.recommendations}
                            onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                            placeholder="提供具體的輔導建議、處置方案、家長配合事項等..."
                            rows={5}
                        />
                    </div>

                    {/* 後續追蹤 */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="followUp"
                            checked={formData.followUpRequired}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, followUpRequired: checked as boolean })
                            }
                        />
                        <Label htmlFor="followUp" className="cursor-pointer">
                            需要安排後續追蹤評估
                        </Label>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        取消
                    </Button>
                    <Button onClick={handleSubmit}>
                        <Save className="h-4 w-4 mr-2" />
                        儲存評估
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
