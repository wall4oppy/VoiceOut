"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Send, Upload } from "lucide-react"

export function ConsultationForm() {
    const [formData, setFormData] = useState({
        identity: "",
        incidentDate: "",
        platform: "",
        description: "",
        contactMethod: "",
        contactInfo: "",
        anonymous: false,
    })

    const [submitted, setSubmitted] = useState(false)

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate form submission
        console.log("Consultation request:", formData)
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <Card className="w-full max-w-3xl mx-auto">
                <CardContent className="p-12 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold">諮詢申請已送出</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        我們已收到您的諮詢申請。專業團隊將在 1-3 個工作天內與您聯繫。
                    </p>
                    <p className="text-sm text-muted-foreground">
                        案件編號：<span className="font-mono font-bold">LC-{Date.now().toString().slice(-8)}</span>
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                        提交新的諮詢
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    線上法律諮詢申請
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    填寫以下資訊，我們的合作律師將盡快與您聯繫
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label>您的身份 *</Label>
                        <RadioGroup
                            value={formData.identity}
                            onValueChange={(value) => handleChange("identity", value)}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                        >
                            {["學生", "家長", "老師", "其他"].map((identity) => (
                                <div key={identity} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                                    <RadioGroupItem value={identity} id={identity} />
                                    <Label htmlFor={identity} className="cursor-pointer flex-1">{identity}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="incidentDate">事件發生時間 *</Label>
                            <Input
                                id="incidentDate"
                                type="date"
                                value={formData.incidentDate}
                                onChange={(e) => handleChange("incidentDate", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="platform">發生平台 *</Label>
                            <Input
                                id="platform"
                                placeholder="例如：Instagram、Facebook"
                                value={formData.platform}
                                onChange={(e) => handleChange("platform", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">事件描述 *</Label>
                        <Textarea
                            id="description"
                            placeholder="請詳細描述發生的事情，包括時間、地點、對方行為等..."
                            rows={6}
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                        <Label>證據上傳（選填）</Label>
                        <div className="flex items-center gap-3">
                            <Button type="button" variant="outline" className="w-full">
                                <Upload className="mr-2 h-4 w-4" />
                                上傳截圖或文件
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            支援格式：JPG, PNG, PDF（最大 10MB）
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="contactMethod">希望聯絡方式 *</Label>
                            <RadioGroup
                                value={formData.contactMethod}
                                onValueChange={(value) => handleChange("contactMethod", value)}
                            >
                                {["Email", "電話", "LINE"].map((method) => (
                                    <div key={method} className="flex items-center space-x-2">
                                        <RadioGroupItem value={method} id={method} />
                                        <Label htmlFor={method} className="cursor-pointer">{method}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactInfo">聯絡資訊 *</Label>
                            <Input
                                id="contactInfo"
                                placeholder="請輸入您的 Email 或電話"
                                value={formData.contactInfo}
                                onChange={(e) => handleChange("contactInfo", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={formData.anonymous}
                            onChange={(e) => handleChange("anonymous", e.target.checked)}
                            className="rounded"
                        />
                        <Label htmlFor="anonymous" className="cursor-pointer text-sm">
                            我希望保持匿名，僅提供案件描述
                        </Label>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg">
                        <Send className="mr-2 h-5 w-5" />
                        提交諮詢申請
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                        提交即表示您同意我們的隱私政策。您的資料將嚴格保密。
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
