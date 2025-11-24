"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface LegalTermCardProps {
    term: string
    definition: string
    example: string
    penalty: string
    color?: string
}

export function LegalTermCard({ term, definition, example, penalty, color = "blue" }: LegalTermCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    const colorClasses = {
        blue: "from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800",
        red: "from-red-500/10 to-red-600/5 border-red-200 dark:border-red-800",
        amber: "from-amber-500/10 to-amber-600/5 border-amber-200 dark:border-amber-800",
        purple: "from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800",
    }

    return (
        <div
            className="perspective-1000 h-64 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <Card className={`absolute inset-0 backface-hidden bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} border-2`}>
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <h3 className="text-2xl font-bold mb-4">{term}</h3>
                        <p className="text-sm text-muted-foreground">點擊查看詳情</p>
                    </CardContent>
                </Card>

                {/* Back */}
                <Card className={`absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} border-2`}>
                    <CardContent className="h-full p-6 overflow-y-auto text-sm space-y-3">
                        <div>
                            <h4 className="font-bold text-primary mb-1">定義</h4>
                            <p className="text-muted-foreground">{definition}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-primary mb-1">案例</h4>
                            <p className="text-muted-foreground">{example}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-primary mb-1">刑責</h4>
                            <p className="text-muted-foreground">{penalty}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
