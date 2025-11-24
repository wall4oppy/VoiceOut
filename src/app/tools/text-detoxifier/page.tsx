"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react"
import { FadeIn } from "@/components/ui/motion"

export default function TextDetoxifierPage() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleDetoxify = () => {
        if (!input.trim()) return

        setIsProcessing(true)
        // Mock AI processing delay
        setTimeout(() => {
            // Simple mock replacement logic for demo
            const detoxified = input
                .replace(/白痴/g, "想法比較特別的人")
                .replace(/笨蛋/g, "還在學習中的朋友")
                .replace(/滾/g, "請給我一點空間")
                .replace(/去死/g, "我現在非常生氣")
                .replace(/智障/g, "理解力比較獨特")
                .replace(/垃圾/g, "不太有建設性的事物")
                .replace(/fuck/gi, "oops")
                .replace(/shit/gi, "oh no")

            setOutput(detoxified === input ? "這句話看起來已經很溫和了，或者包含了我們還沒學會的詞彙！" : detoxified)
            setIsProcessing(false)
        }, 1000)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <FadeIn>
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Sparkles className="h-10 w-10 text-primary" />
                        文字消毒轉換器
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        想罵人但不想口出惡言？讓 AI 幫你把「情緒話」翻譯成「高情商」的表達方式。
                        罵人也可以很有格調。
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>輸入你想說的話</CardTitle>
                            <CardDescription>盡情宣洩你的不滿，不用擔心用詞</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder="例如：你這個白痴，滾一邊去！"
                                className="min-h-[200px] text-lg resize-none"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button
                                className="w-full h-12 text-lg"
                                onClick={handleDetoxify}
                                disabled={isProcessing || !input.trim()}
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                        正在轉換中...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        開始消毒
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="h-full bg-muted/50 border-dashed">
                        <CardHeader>
                            <CardTitle>轉換結果</CardTitle>
                            <CardDescription>優雅、不帶髒字，但依然有力</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="min-h-[200px] p-4 rounded-md bg-background border flex items-center justify-center text-lg text-center relative">
                                {output ? (
                                    <span className="text-foreground font-medium">{output}</span>
                                ) : (
                                    <span className="text-muted-foreground">等待輸入...</span>
                                )}

                                {output && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2"
                                        onClick={handleCopy}
                                    >
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                )}
                            </div>
                            <div className="text-center text-sm text-muted-foreground pt-2">
                                * 僅供娛樂與教育用途，請勿用於真實攻擊
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </FadeIn>
        </div>
    )
}
