"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Phone, MapPin, Send } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("訊息已發送", {
            description: "我們已收到您的訊息，將會盡快與您聯繫。",
        })

        setIsSubmitting(false)
        // Reset form would go here
    }

    return (
        <div className="min-h-screen bg-background py-12 md:py-24">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-24">
                    {/* Contact Info Side */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">聯絡我們</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                無論是尋求協助、合作提案，或是對平台有任何建議，我們都樂意傾聽。
                            </p>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="flex items-start gap-4 p-6">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">一般諮詢</h3>
                                        <p className="text-sm text-muted-foreground mb-2">課程合作、媒體採訪、一般問題</p>
                                        <a href="mailto:contact@voiceout.site" className="text-primary hover:underline font-medium">contact@voiceout.site</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="flex items-start gap-4 p-6">
                                    <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">求助與支援</h3>
                                        <p className="text-sm text-muted-foreground mb-2">若您遇到使用問題或需要緊急協助</p>
                                        <a href="mailto:support@voiceout.site" className="text-primary hover:underline font-medium">support@voiceout.site</a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">傳送訊息</h2>
                            <p className="text-sm text-muted-foreground">填寫表單，我們通常會在 24 小時內回覆。</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">您的稱呼</Label>
                                <Input id="name" placeholder="王小明" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">電子信箱</Label>
                                <Input id="email" type="email" placeholder="example@email.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">主旨</Label>
                                <Input id="subject" placeholder="我想詢問關於..." required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">訊息內容</Label>
                                <Textarea
                                    id="message"
                                    placeholder="請詳細描述您的問題或建議..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    "傳送中..."
                                ) : (
                                    <>
                                        發送訊息 <Send className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
