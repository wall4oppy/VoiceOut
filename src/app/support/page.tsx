"use client"

import { FadeIn, StaggerText } from "@/components/ui/motion"
import { MoodCheckIn } from "@/components/support/mood-check-in"
import { ResourceCard } from "@/components/support/resource-card"
import { BreathingExercise } from "@/components/support/breathing-exercise"
import { MentalHealthAssessment } from "@/components/support/mental-health-assessment"
import { EmotionJournal } from "@/components/support/emotion-journal"
import { SuccessStories } from "@/components/support/success-stories"
import { SafetyPlan } from "@/components/support/safety-plan"
import { ParentResources } from "@/components/support/parent-resources"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Phone, Users, ArrowRight, Wind, Brain, BookHeart, Shield, Sparkles, Users2 } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 bg-gradient-to-b from-pink-50/50 to-background dark:from-pink-950/20 dark:to-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                            <StaggerText text="我們在這裡陪你" className="justify-center" />
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            無論你正在經歷什麼，請記得你的感受是重要的。這裡有專業的資源與溫暖的社群，隨時準備接住你。
                        </p>
                    </FadeIn>
                </div>
            </section>



            {/* Mood Check-in */}
            <section className="w-full py-12 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <MoodCheckIn />
                </div>
            </section>

            {/* Success Stories - Moved up to provide hope early */}
            <section className="w-full py-12 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <SuccessStories />
                </div>
            </section>

            {/* Mental Health Tools - Tabbed Interface */}
            <section className="w-full py-12 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">心理健康工具箱</h2>
                        <p className="text-muted-foreground">選擇適合你的工具，照顧自己的心理健康。</p>
                    </div>

                    <Tabs defaultValue="breathing" className="w-full">
                        <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-4 mb-8">
                            <TabsTrigger value="breathing" className="flex items-center gap-2">
                                <Wind className="w-4 h-4" />
                                <span className="hidden sm:inline">呼吸練習</span>
                            </TabsTrigger>
                            <TabsTrigger value="assessment" className="flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                <span className="hidden sm:inline">心理評估</span>
                            </TabsTrigger>
                            <TabsTrigger value="journal" className="flex items-center gap-2">
                                <BookHeart className="w-4 h-4" />
                                <span className="hidden sm:inline">情緒日記</span>
                            </TabsTrigger>
                            <TabsTrigger value="safety" className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span className="hidden sm:inline">安全計畫</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="breathing" className="mt-8">
                            <BreathingExercise />
                        </TabsContent>

                        <TabsContent value="assessment" className="mt-8">
                            <MentalHealthAssessment />
                        </TabsContent>

                        <TabsContent value="journal" className="mt-8">
                            <EmotionJournal />
                        </TabsContent>

                        <TabsContent value="safety" className="mt-8">
                            <SafetyPlan />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Professional Resources */}
            <section className="w-full py-12 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">專業諮詢資源</h2>
                        <p className="text-muted-foreground">尋求專業協助是勇敢的第一步。如果你感到絕望或有自我傷害的念頭，請立即撥打緊急專線。</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <FadeIn delay={0.1}>
                            <ResourceCard
                                title="生命線"
                                description="24小時免費心理諮詢專線，提供即時的情緒支持與危機處理。"
                                contact="1995"
                                link="tel:1995"
                                icon={<Phone className="w-5 h-5" />}
                                isEmergency
                            />
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <ResourceCard
                                title="安心專線"
                                description="衛福部心理健康專線，提供心理諮詢與情緒支持服務。"
                                contact="1925"
                                link="tel:1925"
                                icon={<Phone className="w-5 h-5" />}
                                isEmergency
                            />
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <ResourceCard
                                title="張老師基金會"
                                description="提供免費心理諮商輔導，陪伴青少年走過成長的迷惘。"
                                contact="1980"
                                link="http://www.1980.org.tw/"
                                icon={<Users className="w-5 h-5" />}
                            />
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <ResourceCard
                                title="兒福聯盟"
                                description="致力於兒童福利保障，提供霸凌諮詢與家庭支持服務。"
                                contact="0800-003-123"
                                link="https://www.children.org.tw/"
                                icon={<Heart className="w-5 h-5" />}
                            />
                        </FadeIn>
                        <FadeIn delay={0.5}>
                            <ResourceCard
                                title="台灣展翅協會"
                                description="關注兒少網路安全，提供數位性暴力與網路霸凌協助。"
                                contact="02-2562-1233"
                                link="https://www.ecpat.org.tw/"
                                icon={<Users className="w-5 h-5" />}
                            />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Parent/Teacher Resources */}
            <section className="w-full py-12 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <ParentResources />
                </div>
            </section>

            {/* Peer Support Group CTA */}
            <section className="w-full py-12 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-16 text-center">
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold">加入同儕支持小組</h2>
                            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                                你不需要獨自面對。加入我們的匿名支持社群，與有相似經歷的夥伴互相打氣。
                            </p>
                            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" asChild>
                                <Link href="/support/peer-group">
                                    立即加入 <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
                            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white blur-3xl" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
