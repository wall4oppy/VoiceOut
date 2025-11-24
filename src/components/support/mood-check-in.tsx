"use client"

import { useState } from "react"
import { FadeIn } from "@/components/ui/motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUserData } from "@/contexts/user-data-context"
import { CheckCircle2 } from "lucide-react"

const moods = [
    { emoji: "😔", label: "低落", value: "sad", message: "感到低落是正常的。試著深呼吸，或找個信任的人聊聊。" },
    { emoji: "😠", label: "憤怒", value: "angry", message: "憤怒是一種保護色。試著離開當下的環境，讓自己冷靜一下。" },
    { emoji: "😨", label: "害怕", value: "anxious", message: "你現在是安全的。我們在這裡支持你，你不需要獨自面對。" },
    { emoji: "😐", label: "平靜", value: "calm", message: "保持平靜的心。這是一個很好的狀態，繼續保持。" },
    { emoji: "🙂", label: "還好", value: "okay", message: "日子一天天過，一切都會慢慢變好的。" },
]

export function MoodCheckIn() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null)
    const [saved, setSaved] = useState(false)
    const { addMoodCheckIn } = useUserData()

    const handleMoodSelect = (index: number) => {
        setSelectedMood(index)
        setSaved(false)
    }

    const saveMood = () => {
        if (selectedMood !== null) {
            addMoodCheckIn({
                mood: moods[selectedMood].value,
            })
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
                setSelectedMood(null)
            }, 3000)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto border-none shadow-lg bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50">
            <CardContent className="p-6 md:p-8 text-center">
                <h3 className="text-xl font-bold mb-6">你現在感覺如何？</h3>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {moods.map((mood, index) => (
                        <Button
                            key={index}
                            variant={selectedMood === index ? "default" : "outline"}
                            className={`h-20 w-20 rounded-full flex flex-col gap-1 transition-all duration-300 ${selectedMood === index ? "scale-110 shadow-md" : "hover:scale-105 hover:bg-muted"
                                }`}
                            onClick={() => handleMoodSelect(index)}
                        >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className="text-xs">{mood.label}</span>
                        </Button>
                    ))}
                </div>

                {selectedMood !== null && !saved && (
                    <FadeIn key={selectedMood} className="space-y-4">
                        <div className="bg-primary/10 p-4 rounded-lg text-primary-foreground/90">
                            <p className="text-lg font-medium text-primary">
                                {moods[selectedMood].message}
                            </p>
                        </div>
                        <Button onClick={saveMood} className="w-full">
                            記錄這個心情
                        </Button>
                    </FadeIn>
                )}

                {saved && (
                    <FadeIn className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center justify-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <p className="font-medium text-green-600">心情已記錄！</p>
                    </FadeIn>
                )}
            </CardContent>
        </Card>
    )
}
