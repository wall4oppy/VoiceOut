"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react"
import { FadeIn } from "@/components/ui/motion"

export function TextDetoxWidget() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleDetox = () => {
        if (!input.trim()) return

        setIsLoading(true)
        // Simulate AI processing
        setTimeout(() => {
            let detoxed = "這句話聽起來有點激動，或許我們可以換個方式說？"

            if (input.includes("白癡") || input.includes("笨")) {
                detoxed = "你的智商可能還有很大的進步空間。"
            } else if (input.includes("死") || input.includes("滾")) {
                detoxed = "我現在需要一些個人空間，請你暫時離開。"
            } else if (input.includes("醜") || input.includes("胖")) {
                detoxed = "每個人的審美觀不同，我尊重你的獨特。"
            } else {
                // Default funny responses
                const responses = [
                    "你的表達方式非常有創意，但我建議用更和平的方式溝通。",
                    "深呼吸，世界很美好，你的文字也可以很美好。",
                    "這句話如果加點糖，可能會比較好入口。",
                ]
                detoxed = responses[Math.floor(Math.random() * responses.length)]
            }

            setOutput(detoxed)
            setIsLoading(false)
        }, 800)
    }

    return (
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 items-center">

                    <FadeIn direction="right" className="space-y-4">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                            AI 互動體驗
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            文字消毒器 <span className="text-primary">Magic Eraser</span>
                        </h2>
                        <p className="text-muted-foreground md:text-xl">
                            生氣想罵人？試試看用更有格調的方式表達。
                            <br />
                            讓 AI 幫你把負面情緒轉化為機智的幽默。
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center">
                                <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                                即時語意分析
                            </li>
                            <li className="flex items-center">
                                <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                                情緒轉化演算法
                            </li>
                            <li className="flex items-center">
                                <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                                提升溝通藝術
                            </li>
                        </ul>
                    </FadeIn>

                    <FadeIn direction="left">
                        <Card className="border-2 border-primary/10 shadow-xl bg-background/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        輸入你想說的（例如：你這個白癡）
                                    </label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="在這裡輸入..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleDetox()}
                                        />
                                        <Button onClick={handleDetox} disabled={isLoading || !input.trim()}>
                                            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative min-h-[100px] rounded-lg bg-muted/50 p-4 flex items-center justify-center text-center border-2 border-dashed border-muted-foreground/20">
                                    {output ? (
                                        <p className="text-lg font-medium text-primary animate-in fade-in zoom-in duration-300">
                                            {output}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            點擊按鈕，看看 AI 會怎麼說...
                                        </p>
                                    )}
                                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm rotate-12">
                                        AI Powered
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>

                </div>
            </div>
        </section>
    )
}
