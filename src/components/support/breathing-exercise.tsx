"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause } from "lucide-react"

type Phase = "inhale" | "hold" | "exhale" | "rest"

export function BreathingExercise() {
    const [isActive, setIsActive] = useState(false)
    const [phase, setPhase] = useState<Phase>("inhale")
    const [seconds, setSeconds] = useState(4)
    const [cycle, setCycle] = useState(0)

    const phaseDurations = {
        inhale: 4,
        hold: 7,
        exhale: 8,
        rest: 0,
    }

    const phaseInstructions = {
        inhale: "慢慢吸氣",
        hold: "屏住呼吸",
        exhale: "緩緩吐氣",
        rest: "準備下一輪",
    }

    useEffect(() => {
        if (!isActive) return

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    // Move to next phase
                    const phases: Phase[] = ["inhale", "hold", "exhale", "rest"]
                    const currentIndex = phases.indexOf(phase)
                    const nextPhase = phases[(currentIndex + 1) % phases.length]

                    if (nextPhase === "inhale") {
                        setCycle((c) => c + 1)
                    }

                    setPhase(nextPhase)
                    return phaseDurations[nextPhase]
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isActive, phase])

    const handleToggle = () => {
        if (!isActive) {
            setPhase("inhale")
            setSeconds(4)
            setCycle(0)
        }
        setIsActive(!isActive)
    }

    const getCircleSize = () => {
        switch (phase) {
            case "inhale":
                return "scale-150"
            case "hold":
                return "scale-150"
            case "exhale":
                return "scale-75"
            default:
                return "scale-100"
        }
    }

    const getCircleColor = () => {
        switch (phase) {
            case "inhale":
                return "bg-blue-400/30 border-blue-400"
            case "hold":
                return "bg-purple-400/30 border-purple-400"
            case "exhale":
                return "bg-green-400/30 border-green-400"
            default:
                return "bg-gray-400/30 border-gray-400"
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wind className="w-6 h-6 text-primary" />
                    4-7-8 呼吸練習
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    這個簡單的呼吸技巧可以幫助你放鬆身心，減輕焦慮。
                </p>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Breathing Circle */}
                <div className="flex flex-col items-center justify-center py-12">
                    <div
                        className={`w-32 h-32 rounded-full border-4 transition-all duration-1000 ease-in-out ${getCircleSize()} ${getCircleColor()}`}
                    />
                    <div className="mt-8 text-center space-y-2">
                        <p className="text-2xl font-bold">{phaseInstructions[phase]}</p>
                        <p className="text-4xl font-mono text-primary">{seconds}</p>
                        <p className="text-sm text-muted-foreground">完成循環：{cycle}</p>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                    <h4 className="font-bold">如何練習：</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>找一個舒適的姿勢坐下或躺下</li>
                        <li>吸氣 4 秒（鼻子吸氣）</li>
                        <li>屏住呼吸 7 秒</li>
                        <li>吐氣 8 秒（嘴巴吐氣）</li>
                        <li>重複 3-4 個循環</li>
                    </ol>
                </div>

                {/* Control Button */}
                <Button
                    onClick={handleToggle}
                    className="w-full h-14 text-lg"
                    variant={isActive ? "outline" : "default"}
                >
                    {isActive ? (
                        <>
                            <Pause className="mr-2 h-5 w-5" />
                            暫停練習
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-5 w-5" />
                            開始練習
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}
