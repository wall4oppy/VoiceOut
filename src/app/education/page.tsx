"use client"

import { FadeIn, StaggerText } from "@/components/ui/motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Download, ExternalLink, GraduationCap } from "lucide-react"
import Link from "next/link"
import { ParentResources } from "@/components/support/parent-resources"

export default function EducationPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 bg-gradient-to-b from-blue-50/50 to-background dark:from-blue-950/20 dark:to-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                            <GraduationCap className="w-6 h-6 fill-current" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                            <StaggerText text="教育是預防霸凌的最佳疫苗" className="justify-center" />
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            我們提供給學生、家長與教師的完整教育資源，共同營造友善校園。
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Parent / Teacher Resources (Moved from Home/Support) */}
            <section className="w-full py-12 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <ParentResources />
                </div>
            </section>

            {/* Educational Materials */}
            <section className="w-full py-12 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <BookOpen className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">教育資源下載</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">網路安全家長手冊</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    協助家長了解孩子在網路世界的風險，以及如何建立良好的親子溝通。
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="/downloads/parent-guide.pdf" download>
                                        <Download className="mr-2 h-4 w-4" /> 下載 PDF
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">反霸凌教案懶人包</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    適合老師在班級經營使用的教案，包含簡報、學習單與活動設計。
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="/downloads/teacher-pack.zip" download>
                                        <Download className="mr-2 h-4 w-4" /> 下載資源包
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">數位排毒指南</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    覺得網路社群讓你焦慮嗎？試試看 7 天數位排毒計畫。
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="/downloads/digital-detox-guide.pdf" download>
                                        <Download className="mr-2 h-4 w-4" /> 下載指南
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* External Links */}
            <section className="w-full py-12 bg-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl font-bold mb-8">相關網站連結</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="secondary" asChild>
                            <Link href="https://i.win.org.tw/" target="_blank">
                                iWIN 網路內容防護機構 <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="secondary" asChild>
                            <Link href="https://cfrc.moj.gov.tw/" target="_blank">
                                犯罪被害人保護協會 <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="secondary" asChild>
                            <Link href="https://help119.npa.gov.tw/" target="_blank">
                                110 視訊報案 App <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
