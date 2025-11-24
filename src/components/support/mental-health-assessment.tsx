"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserData } from "@/contexts/user-data-context"
import Link from "next/link"

const phq9Questions = [
    "做事時提不起勁或沒有興趣",
    "感到心情低落、沮喪或絕望",
    "入睡困難、睡不安穩或睡眠過多",
    "感覺疲倦或沒有活力",
    "食慾不振或吃太多",
    "覺得自己很糟糕，或覺得自己很失敗，或讓自己或家人失望",
    "對事物專注有困難，例如閱讀報紙或看電視時",
    "動作或說話速度緩慢到別人已經察覺？或正好相反：煩躁或坐立不安、動來動去的情況更勝於平常",
    "有不如死掉或用某種方式傷害自己的念頭",
]

const gad7Questions = [
    "感覺緊張、焦慮或煩躁",
    "無法停止或控制擔心",
    "對各種事情擔心過度",
    "很難放鬆下來",
    "坐立不安，難以安靜地坐著",
    "變得容易煩惱或易怒",
    "感到害怕，好像將有可怕的事情發生",
]

const options = [
    { value: "0", label: "完全不會" },
    { value: "1", label: "幾天" },
    { value: "2", label: "一半以上的天數" },
    { value: "3", label: "幾乎每天" },
]

type AssessmentType = "phq9" | "gad7"

export function MentalHealthAssessment() {
    const [assessmentType, setAssessmentType] = useState<AssessmentType>("phq9")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [result, setResult] = useState<number | null>(null)
    const { addAssessmentResult } = useUserData()

    const questions = assessmentType === "phq9" ? phq9Questions : gad7Questions
    const totalQuestions = questions.length

    const handleAnswer = (value: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion]: parseInt(value) }))
    }

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((prev) => prev + 1)
        } else {
            calculateResult()
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1)
        }
    }

    const calculateResult = () => {
        const total = Object.values(answers).reduce((sum, val) => sum + val, 0)
        setResult(total)

        // Save result to context
        addAssessmentResult({
            type: assessmentType,
            score: total,
            answers: answers,
        })
    }

    const getInterpretation = (score: number, type: AssessmentType) => {
        if (type === "phq9") {
            if (score <= 4) return { level: "minimal", color: "text-green-600", message: "輕微或無憂鬱症狀" }
            if (score <= 9) return { level: "mild", color: "text-yellow-600", message: "輕度憂鬱症狀" }
            if (score <= 14) return { level: "moderate", color: "text-orange-600", message: "中度憂鬱症狀" }
            if (score <= 19) return { level: "moderately-severe", color: "text-red-600", message: "中重度憂鬱症狀" }
            return { level: "severe", color: "text-red-800", message: "重度憂鬱症狀" }
        } else {
            if (score <= 4) return { level: "minimal", color: "text-green-600", message: "輕微焦慮" }
            if (score <= 9) return { level: "mild", color: "text-yellow-600", message: "輕度焦慮" }
            if (score <= 14) return { level: "moderate", color: "text-orange-600", message: "中度焦慮" }
            return { level: "severe", color: "text-red-600", message: "重度焦慮" }
        }
    }

    const resetAssessment = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setResult(null)
    }

    const progress = ((currentQuestion + 1) / totalQuestions) * 100

    if (result !== null) {
        const interpretation = getInterpretation(result, assessmentType)
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="w-6 h-6 text-primary" />
                        評估結果
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center space-y-4">
                        <div className="text-6xl font-bold text-primary">{result}</div>
                        <p className={`text-xl font-bold ${interpretation.color}`}>
                            {interpretation.message}
                        </p>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800 space-y-3">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="space-y-2 text-sm">
                                <p className="font-bold">重要提醒</p>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    <li>此量表僅供初步篩檢，不能取代專業診斷</li>
                                    <li>如果分數較高，建議尋求專業心理諮商或精神科醫師協助</li>
                                    <li>如有自傷或自殺念頭，請立即撥打生命線 1995 或安心專線 1925</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {result >= 10 && (
                        <div className="bg-primary/10 p-6 rounded-lg space-y-3">
                            <h4 className="font-bold">建議資源</h4>
                            <ul className="space-y-2 text-sm">
                                <li>• 張老師基金會：1980（免費心理諮商）</li>
                                <li>• 衛福部心理健康專線：1925</li>
                                <li>• 各縣市社區心理衛生中心</li>
                                <li>• 學校輔導室或諮商中心</li>
                            </ul>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button onClick={resetAssessment} variant="outline" className="flex-1">
                            重新評估
                        </Button>
                        <Link href="/profile" className="flex-1">
                            <Button className="w-full">
                                查看歷史記錄
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-primary" />
                    心理健康自我評估
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    選擇一個量表進行評估。請根據過去兩週的感受回答。
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                <Tabs value={assessmentType} onValueChange={(v) => { setAssessmentType(v as AssessmentType); resetAssessment() }}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="phq9">PHQ-9 憂鬱篩檢</TabsTrigger>
                        <TabsTrigger value="gad7">GAD-7 焦慮篩檢</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>問題 {currentQuestion + 1} / {totalQuestions}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">
                            過去兩週內，你有多常被以下問題困擾：
                        </h3>
                        <p className="text-xl font-bold text-primary">
                            {questions[currentQuestion]}
                        </p>
                    </div>

                    <RadioGroup
                        value={answers[currentQuestion]?.toString()}
                        onValueChange={handleAnswer}
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors border"
                            >
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="flex gap-3">
                    {currentQuestion > 0 && (
                        <Button variant="outline" onClick={handleBack} className="flex-1">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            上一題
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        disabled={answers[currentQuestion] === undefined}
                        className="flex-1"
                    >
                        {currentQuestion === totalQuestions - 1 ? "查看結果" : "下一題"}
                        {currentQuestion < totalQuestions - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
