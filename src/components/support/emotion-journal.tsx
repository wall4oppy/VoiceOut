"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BookHeart, Smile, Frown, Meh, Angry, Heart } from "lucide-react"
import { useUserData } from "@/contexts/user-data-context"

const moods = [
    { icon: Smile, label: "開心", color: "text-green-500", value: "happy" },
    { icon: Heart, label: "平靜", color: "text-blue-500", value: "calm" },
    { icon: Meh, label: "還好", color: "text-yellow-500", value: "okay" },
    { icon: Frown, label: "難過", color: "text-orange-500", value: "sad" },
    { icon: Angry, label: "憤怒", color: "text-red-500", value: "angry" },
]

export function EmotionJournal() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null)
    const [journalEntry, setJournalEntry] = useState("")
    const [saved, setSaved] = useState(false)
    const { addJournalEntry } = useUserData()

    const handleSave = () => {
        if (!selectedMood || !journalEntry) return

        // Save using context
        addJournalEntry({
            mood: selectedMood,
            content: journalEntry,
        })

        setSaved(true)
        setTimeout(() => {
            setSelectedMood(null)
            setJournalEntry("")
            setSaved(false)
        }, 2000)
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookHeart className="w-6 h-6 text-primary" />
                    情緒日記
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    記錄你的感受，幫助你更了解自己的情緒模式。
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <Label className="text-sm font-medium">今天的心情如何？</Label>
                    <div className="grid grid-cols-5 gap-3">
                        {moods.map((mood) => {
                            const Icon = mood.icon
                            return (
                                <button
                                    key={mood.value}
                                    onClick={() => setSelectedMood(mood.value)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${selectedMood === mood.value
                                        ? "border-primary bg-primary/10 scale-105"
                                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                                        }`}
                                >
                                    <Icon className={`w-8 h-8 ${mood.color}`} />
                                    <span className="text-xs font-medium">{mood.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="journal" className="text-sm font-medium">
                        寫下你的感受或今天發生的事...
                    </Label>
                    <Textarea
                        id="journal"
                        placeholder="今天我感覺..."
                        rows={8}
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                        className="resize-none"
                    />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                    <p>💡 <strong>小提示：</strong>你的日記會安全儲存，可以在個人資料頁面查看歷史記錄。定期回顧可以幫助你發現情緒的觸發因素。</p>
                </div>

                {saved ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center text-green-800 dark:text-green-200 font-medium">
                        ✓ 已儲存！感謝你記錄今天的感受。
                    </div>
                ) : (
                    <Button
                        onClick={handleSave}
                        disabled={!selectedMood || !journalEntry}
                        className="w-full h-12"
                    >
                        儲存日記
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

function Label({ children, htmlFor, className }: { children: React.ReactNode; htmlFor?: string; className?: string }) {
    return <label htmlFor={htmlFor} className={className}>{children}</label>
}
