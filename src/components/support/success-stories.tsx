"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

const stories = [
    {
        title: "從黑暗走向光明",
        quote: "我曾經以為自己永遠走不出來，但現在我知道，求助不是軟弱，而是勇敢。",
        author: "小雨，17歲",
    },
    {
        title: "找回自己的聲音",
        quote: "霸凌讓我失去了自信，但透過諮商和支持團體，我重新找回了自己。",
        author: "阿明，16歲",
    },
    {
        title: "不再孤單",
        quote: "加入同儕支持小組後，我發現原來有這麼多人理解我的感受。我不再覺得孤單了。",
        author: "小華，15歲",
    },
]

export function SuccessStories() {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 mb-4">
                    <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">你並不孤單</h2>
                <p className="text-muted-foreground">
                    這些是曾經走過黑暗的夥伴們的真實故事。如果他們可以，你也可以。
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {stories.map((story, index) => (
                    <Card key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-6 space-y-4">
                            <Sparkles className="w-8 h-8 text-primary" />
                            <h3 className="text-lg font-bold">{story.title}</h3>
                            <blockquote className="text-muted-foreground italic">
                                "{story.quote}"
                            </blockquote>
                            <p className="text-sm font-medium text-primary">— {story.author}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-primary/10 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">
                    每個人的康復之路都不一樣，但重要的是<strong>邁出第一步</strong>。
                </p>
            </div>
        </div>
    )
}
