"use client"

import { FadeIn } from "@/components/ui/motion"
import { FileText, BrainCircuit, UserCheck, HeartHandshake, ArrowRight } from "lucide-react"

const steps = [
    {
        id: 1,
        title: "提交資料",
        description: "匿名或實名填寫，AI 輔助整理案情",
        icon: FileText,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        id: 2,
        title: "AI 初判",
        description: "即時分析風險等級，優先處理緊急案件",
        icon: BrainCircuit,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        id: 3,
        title: "專家複審",
        description: "轉介學校、法律單位或社工介入",
        icon: UserCheck,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        id: 4,
        title: "獲得協助",
        description: "心理諮商、法律行動與後續追蹤",
        icon: HeartHandshake,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
]

export function ProcessFlow() {
    return (
        <section className="w-full py-12 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            我們如何協助你？
                        </h2>
                        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                            透明、安全的處理流程，讓你不再感到無助。
                        </p>
                    </FadeIn>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />

                    <div className="grid gap-8 md:grid-cols-4 relative z-10">
                        {steps.map((step, index) => (
                            <FadeIn key={step.id} delay={index * 0.2} className="flex flex-col items-center text-center group">
                                <div className={`relative flex items-center justify-center w-20 h-20 rounded-full ${step.bg} mb-4 transition-transform duration-300 group-hover:scale-110 border-4 border-background shadow-sm`}>
                                    <step.icon className={`w-10 h-10 ${step.color}`} />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                                        {step.id}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground max-w-[200px]">
                                    {step.description}
                                </p>

                                {/* Arrow for Mobile */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden mt-6 text-muted-foreground/30">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                )}
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
