"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users2, Download, BookOpen, AlertTriangle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const warningSignsChecklist = [
    "孩子突然不願意上學或使用電腦/手機",
    "情緒起伏大，容易焦慮或憂鬱",
    "睡眠或飲食習慣改變",
    "成績突然下滑",
    "避免談論學校或朋友",
    "出現自我傷害行為或念頭",
]

const communicationTips = [
    "選擇安靜、不被打擾的時間與地點",
    "用開放式問題引導，例如：「最近在學校過得怎麼樣？」",
    "傾聽而不批判，讓孩子知道你相信他們",
    "避免立即給建議，先同理孩子的感受",
    "一起討論解決方案，而不是替孩子做決定",
    "持續關注，霸凌問題通常不會一次解決",
]

export function ParentResources() {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 mb-4">
                    <Users2 className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">家長 / 老師資源</h2>
                <p className="text-muted-foreground">
                    幫助您識別霸凌跡象，並學習如何支持孩子。
                </p>
            </div>

            {/* Warning Signs */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        辨識霸凌警訊
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        如果孩子出現以下跡象，可能正遭受霸凌：
                    </p>
                    <ul className="space-y-2">
                        {warningSignsChecklist.map((sign, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{sign}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Communication Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        如何與孩子談論霸凌
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>有效溝通的 6 個原則</AccordionTrigger>
                            <AccordionContent>
                                <ul className="space-y-3 mt-2">
                                    {communicationTips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-primary font-bold">{i + 1}.</span>
                                            <span className="text-muted-foreground">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>如果孩子不願意說話怎麼辦？</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground space-y-2">
                                <p>• 不要強迫，給孩子時間和空間</p>
                                <p>• 可以透過寫信、傳訊息等其他方式溝通</p>
                                <p>• 尋求學校輔導室或專業諮商師協助</p>
                                <p>• 持續表達你的關心和支持</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>家長可以採取的行動</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground space-y-2">
                                <p>• 保留霸凌證據（截圖、訊息記錄）</p>
                                <p>• 聯繫學校老師或輔導室</p>
                                <p>• 考慮報警（若涉及犯罪行為）</p>
                                <p>• 尋求專業心理諮商</p>
                                <p>• 加入家長支持團體</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Downloadable Resources */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-bold">家長指南手冊</h3>
                        <p className="text-sm text-muted-foreground">
                            完整的霸凌應對指南，包含法律資訊與實用建議。
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                            <a href="/downloads/parent-guide.pdf" download>
                                <Download className="mr-2 h-4 w-4" />
                                下載 PDF
                            </a>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-bold">教師資源包</h3>
                        <p className="text-sm text-muted-foreground">
                            班級經營與霸凌預防教案，適合老師使用。
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                            <a href="/downloads/teacher-pack.zip" download>
                                <Download className="mr-2 h-4 w-4" />
                                下載資源包
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
