"use client"

import { FadeIn } from "@/components/ui/motion"
import { ShieldCheck, Lock } from "lucide-react"

const partners = [
    { name: "教育部", color: "bg-blue-100 dark:bg-blue-900/20" },
    { name: "法律扶助基金會", color: "bg-red-100 dark:bg-red-900/20" },
    { name: "張老師基金會", color: "bg-green-100 dark:bg-green-900/20" },
    { name: "兒福聯盟", color: "bg-orange-100 dark:bg-orange-900/20" },
    { name: "台灣展翅協會", color: "bg-purple-100 dark:bg-purple-900/20" },
]

export function TrustBadges() {
    return (
        <section className="w-full py-12 border-t bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Partners */}
                    <div className="flex-1 w-full">
                        <p className="text-sm font-medium text-muted-foreground mb-4 text-center md:text-left uppercase tracking-wider">
                            共同守護夥伴
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            {partners.map((partner, index) => (
                                <FadeIn key={index} delay={index * 0.1}>
                                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${partner.color} text-foreground/80 hover:opacity-80 transition-opacity cursor-default`}>
                                        {partner.name}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Privacy Pledge */}
                    <FadeIn direction="left" className="flex items-center gap-4 bg-background p-4 rounded-xl shadow-sm border max-w-md">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="font-bold flex items-center gap-2">
                                資料隱私承諾
                                <Lock className="w-3 h-3 text-muted-foreground" />
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                採用端對端加密技術 (End-to-End Encryption)，您的對話內容與個資受到嚴格保護，絕不外洩。
                            </p>
                        </div>
                    </FadeIn>

                </div>
            </div>
        </section>
    )
}
