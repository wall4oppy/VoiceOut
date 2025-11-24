"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, FileText } from "lucide-react"

export function LetterGenerator() {
    const [formData, setFormData] = useState({
        recipientName: "",
        recipientAddress: "",
        incidentDate: "",
        incidentDescription: "",
        senderName: "",
        senderContact: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const generateLetter = () => {
        const letterContent = `
存證信函

收件人：${formData.recipientName || "[對方姓名]"}
地址：${formData.recipientAddress || "[對方地址]"}

主旨：要求停止網路霸凌行為並刪除不當內容

本人 ${formData.senderName || "[您的姓名]"}，茲因下列事由，特此發函：

一、事實陳述
於 ${formData.incidentDate || "[事發日期]"} 起，台端在網路上發表以下不當言論或行為：

${formData.incidentDescription || "[詳細描述霸凌內容、平台、截圖證據等]"}

上述行為已嚴重侵害本人之名譽權及人格權，並造成本人精神上之痛苦。

二、法律依據
台端之行為可能涉及：
1. 刑法第309條公然侮辱罪
2. 刑法第310條誹謗罪
3. 民法第184條侵權行為損害賠償責任

三、要求事項
1. 立即停止一切網路霸凌行為
2. 於收函後三日內刪除所有不當言論及內容
3. 於收函後七日內以書面向本人道歉

四、法律後果
若台端未於期限內履行上述要求，本人將保留採取法律行動之權利，包括但不限於：
1. 向警方提出刑事告訴
2. 向法院提起民事損害賠償訴訟
3. 向平台檢舉要求下架內容

此致

發函人：${formData.senderName || "[您的姓名]"}
聯絡方式：${formData.senderContact || "[您的聯絡方式]"}
發函日期：${new Date().toLocaleDateString('zh-TW')}

---
※ 本函為範本，建議諮詢專業律師後再寄出。
    `.trim()

        // Create a downloadable text file
        const blob = new Blob([letterContent], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `存證信函_${new Date().toISOString().split('T')[0]}.txt`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    存證信函產生器
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    填寫以下資訊，系統將自動生成存證信函範本
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="recipientName">對方姓名 *</Label>
                        <Input
                            id="recipientName"
                            placeholder="例：王小明"
                            value={formData.recipientName}
                            onChange={(e) => handleChange("recipientName", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="recipientAddress">對方地址（選填）</Label>
                        <Input
                            id="recipientAddress"
                            placeholder="若不知道可留空"
                            value={formData.recipientAddress}
                            onChange={(e) => handleChange("recipientAddress", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="incidentDate">事發日期 *</Label>
                    <Input
                        id="incidentDate"
                        type="date"
                        value={formData.incidentDate}
                        onChange={(e) => handleChange("incidentDate", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="incidentDescription">霸凌內容描述 *</Label>
                    <Textarea
                        id="incidentDescription"
                        placeholder="詳細描述對方的霸凌行為，包括在哪個平台、說了什麼、做了什麼..."
                        rows={6}
                        value={formData.incidentDescription}
                        onChange={(e) => handleChange("incidentDescription", e.target.value)}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="senderName">您的姓名 *</Label>
                        <Input
                            id="senderName"
                            placeholder="例：李小華"
                            value={formData.senderName}
                            onChange={(e) => handleChange("senderName", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="senderContact">您的聯絡方式 *</Label>
                        <Input
                            id="senderContact"
                            placeholder="電話或 Email"
                            value={formData.senderContact}
                            onChange={(e) => handleChange("senderContact", e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-4 space-y-3">
                    <Button
                        onClick={generateLetter}
                        className="w-full h-12 text-lg"
                        size="lg"
                    >
                        <Download className="mr-2 h-5 w-5" />
                        生成並下載存證信函
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        ⚠️ 此為範本，建議諮詢專業律師後再正式寄出
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
