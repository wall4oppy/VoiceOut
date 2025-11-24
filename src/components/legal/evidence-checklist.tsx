"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle } from "lucide-react"

const checklistItems = [
    { id: "url", label: "截圖是否包含完整的網址 (URL)？" },
    { id: "time", label: "是否有顯示清楚的發文時間？" },
    { id: "profile", label: "是否有截到對方的個人頁面（ID / UID）？" },
    { id: "context", label: "是否有對話的前後文（證明非斷章取義）？" },
    { id: "original", label: "是否保留原始檔案（未經編輯）？" },
]

export function EvidenceChecklist() {
    const [checked, setChecked] = useState<Record<string, boolean>>({})

    const handleCheck = (id: string, value: boolean) => {
        setChecked(prev => ({ ...prev, [id]: value }))
    }

    const completedCount = Object.values(checked).filter(Boolean).length
    const totalCount = checklistItems.length
    const isComplete = completedCount === totalCount

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                    )}
                    蒐證檢核表
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    確保你的證據在法庭上有效 ({completedCount}/{totalCount})
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                            id={item.id}
                            checked={checked[item.id] || false}
                            onCheckedChange={(value) => handleCheck(item.id, value as boolean)}
                            className="mt-1"
                        />
                        <label
                            htmlFor={item.id}
                            className="text-sm font-medium leading-relaxed cursor-pointer flex-1"
                        >
                            {item.label}
                        </label>
                    </div>
                ))}

                {isComplete && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                            ✓ 太好了！你的證據符合基本要求。建議將這些截圖備份到雲端或多個裝置。
                        </p>
                    </div>
                )}

                {!isComplete && completedCount > 0 && (
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                            還有 {totalCount - completedCount} 項需要確認。建議重新截圖或補充資料。
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
