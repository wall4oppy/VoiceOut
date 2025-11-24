"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowRight, ArrowLeft } from "lucide-react"

const questions = [
    {
        id: "type",
        question: "對方的行為屬於哪一種？",
        options: [
            { value: "insult", label: "辱罵、嘲諷" },
            { value: "defamation", label: "散布不實謠言" },
            { value: "threat", label: "威脅、恐嚇" },
            { value: "privacy", label: "散布私密照片/影片" },
        ],
    },
    {
        id: "publicity",
        question: "這些行為發生在哪裡？",
        options: [
            { value: "public", label: "公開平台（例如：IG 貼文、FB 公開留言）" },
            { value: "semi-public", label: "半公開（例如：限時動態、社團）" },
            { value: "private", label: "私訊" },
        ],
    },
    {
        id: "evidence",
        question: "你有保留證據嗎？",
        options: [
            { value: "complete", label: "有完整截圖（含時間、網址、對方帳號）" },
            { value: "partial", label: "有截圖但不完整" },
            { value: "none", label: "沒有保留" },
        ],
    },
]

export function CaseAssessment() {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [result, setResult] = useState<string | null>(null)

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }))
    }

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            calculateResult()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const calculateResult = () => {
        let score = 0
        let recommendation = ""

        // Simple scoring logic
        if (answers.type === "privacy") score += 40
        else if (answers.type === "threat") score += 35
        else if (answers.type === "defamation") score += 30
        else score += 25

        if (answers.publicity === "public") score += 30
        else if (answers.publicity === "semi-public") score += 20
        else score += 10

        if (answers.evidence === "complete") score += 30
        else if (answers.evidence === "partial") score += 15

        if (score >= 80) {
            recommendation = "此情況有 85% 以上機率構成刑事犯罪。建議立即保留證據並尋求法律協助，可考慮報警或向法扶申請免費諮詢。"
        } else if (score >= 60) {
            recommendation = "此情況有 60-80% 機率涉及法律問題。建議先向學校或平台檢舉，同時諮詢專業律師評估是否提告。"
        } else if (score >= 40) {
            recommendation = "此情況可能涉及法律爭議，但證據或情節可能不足。建議補強證據（重新截圖、錄影），並尋求心理支持。"
        } else {
            recommendation = "目前情況較難直接構成刑事責任，但仍可透過平台檢舉或學校輔導處理。建議優先尋求心理支持。"
        }

        setResult(recommendation)
    }

    const progress = ((currentStep + 1) / questions.length) * 100

    if (result) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="w-6 h-6 text-primary" />
                        AI 評估結果
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-lg leading-relaxed">{result}</p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>⚠️ <strong>重要提醒：</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>此為 AI 預判，非正式法律意見</li>
                            <li>實際情況需由專業律師評估</li>
                            <li>建議諮詢法律扶助基金會或律師</li>
                        </ul>
                    </div>
                    <Button onClick={() => { setResult(null); setCurrentStep(0); setAnswers({}) }} className="w-full">
                        重新評估
                    </Button>
                </CardContent>
            </Card>
        )
    }

    const currentQuestion = questions[currentStep]
    const canProceed = answers[currentQuestion.id] !== undefined

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-primary" />
                    AI 法律初步評估
                </CardTitle>
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        步驟 {currentStep + 1} / {questions.length}
                    </p>
                    <Progress value={progress} className="h-2" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
                    <RadioGroup
                        value={answers[currentQuestion.id]}
                        onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                    >
                        {currentQuestion.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="flex gap-3">
                    {currentStep > 0 && (
                        <Button variant="outline" onClick={handleBack} className="flex-1">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            上一步
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="flex-1"
                    >
                        {currentStep === questions.length - 1 ? "查看結果" : "下一步"}
                        {currentStep < questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
