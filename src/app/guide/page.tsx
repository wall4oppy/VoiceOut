"use client"

import { FadeIn, StaggerText } from "@/components/ui/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, HelpCircle } from "lucide-react"

export default function GuidePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20 dark:to-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                            <BookOpen className="w-6 h-6 fill-current" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                            <StaggerText text="VoiceOut 平台使用指南" className="justify-center" />
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            了解如何使用 VoiceOut 平台，讓我們協助您找回聲音與力量。
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Platform Guide Section */}
            <section className="w-full py-12 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">平台運作流程</h2>
                        <p className="text-muted-foreground">簡單四步驟，開始您的旅程</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

                        {/* Step 1 */}
                        <FadeIn delay={0.1} className="bg-background relative">
                            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
                                <CardHeader className="text-center">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-xl">
                                        1
                                    </div>
                                    <CardTitle>註冊與登入</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground">
                                    <p>選擇您的身分（學生、家長、教師等）註冊帳戶。我們嚴格保護您的個人隱私。</p>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        {/* Step 2 */}
                        <FadeIn delay={0.2} className="bg-background relative">
                            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
                                <CardHeader className="text-center">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-xl">
                                        2
                                    </div>
                                    <CardTitle>尋求協助</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground">
                                    <p>使用「匿名舉報」功能通報霸凌事件，或透過「心理支持」區塊記錄心情與尋求資源。</p>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        {/* Step 3 */}
                        <FadeIn delay={0.3} className="bg-background relative">
                            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
                                <CardHeader className="text-center">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-xl">
                                        3
                                    </div>
                                    <CardTitle>案件處理</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground">
                                    <p>您的案件將由專業人員（輔導老師、心理師）接手處理，您可以隨時追蹤進度。</p>
                                </CardContent>
                            </Card>
                        </FadeIn>

                        {/* Step 4 */}
                        <FadeIn delay={0.4} className="bg-background relative">
                            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
                                <CardHeader className="text-center">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-xl">
                                        4
                                    </div>
                                    <CardTitle>持續支持</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground">
                                    <p>除了案件處理，我們提供長期的心理健康工具與社群支持，陪伴您走出陰霾。</p>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full py-12 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary/10 text-primary">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">常見問題</h2>
                        <p className="text-muted-foreground">解答您對 VoiceOut 平台的疑問</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">舉報真的是匿名的嗎？</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">是的，您可以選擇匿名舉報。在匿名模式下，我們不會記錄您的個人身分資訊，僅保留案件相關內容以供處理。</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">誰會看到我的舉報內容？</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">您的舉報內容僅限於您指定的學校/機構的授權輔導人員與相關處理人員可見，我們有嚴格的資料權限控管。</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">如果我不是受害者，可以舉報嗎？</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">可以。如果您是旁觀者或知情人士，我們鼓勵您挺身而出。您可以選擇「旁觀者」身分進行舉報。</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">平台提供哪些心理支持？</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">我們提供情緒日記、心理健康自我評估量表、呼吸練習引導，以及專業諮詢機構的轉介資訊。</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}
