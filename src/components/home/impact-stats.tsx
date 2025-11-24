"use client"

import { FadeIn } from "@/components/ui/motion"
import { useEffect, useState } from "react"

interface StatProps {
    label: string
    value: string
    suffix?: string
    delay?: number
}

function StatItem({ label, value, suffix = "", delay = 0 }: StatProps) {
    const [count, setCount] = useState(0)
    const target = parseInt(value.replace(/,/g, ""), 10)

    useEffect(() => {
        const duration = 2000 // 2 seconds animation
        const steps = 60
        const stepValue = target / steps
        let current = 0

        const timer = setInterval(() => {
            current += stepValue
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [target])

    return (
        <FadeIn delay={delay} className="flex flex-col items-center justify-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border shadow-sm">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
                {label}
            </div>
        </FadeIn>
    )
}

export function ImpactStats() {
    return (
        <section className="w-full py-12 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatItem label="已處理案件數" value="1204" delay={0} />
                    <StatItem label="已過濾惡意詞彙" value="50000" suffix="+" delay={0.2} />
                    <StatItem label="合作專家與機構" value="35" delay={0.4} />
                </div>
            </div>
        </section>
    )
}
