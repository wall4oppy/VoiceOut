"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Share2, Plus, Brain, Scale, ArrowRight } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Referral {
    id: string
    caseId: string
    studentName: string
    targetProfessional: "psychologist" | "lawyer"
    reason: string
    date: string
    status: "pending" | "accepted" | "completed"
}

const mockReferrals: Referral[] = [
    {
        id: "REF-001",
        caseId: "CASE-001",
        studentName: "王小明",
        targetProfessional: "psychologist",
        reason: "學生出現明顯的焦慮症狀，需要專業心理評估與輔導。",
        date: "2024-11-22",
        status: "pending"
    }
]

const professionalConfig = {
    psychologist: { label: "心理師", icon: Brain, color: "bg-pink-100 text-pink-700" },
    lawyer: { label: "律師", icon: Scale, color: "bg-amber-100 text-amber-700" }
}

const statusConfig = {
    pending: { label: "待接受", color: "bg-yellow-100 text-yellow-700" },
    accepted: { label: "已接受", color: "bg-blue-100 text-blue-700" },
    completed: { label: "已完成", color: "bg-green-100 text-green-700" }
}

export function ReferralSystem() {
    const [referrals, setReferrals] = useState<Referral[]>(mockReferrals)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newReferral, setNewReferral] = useState({
        caseId: "",
        studentName: "",
        targetProfessional: "psychologist" as "psychologist" | "lawyer",
        reason: ""
    })

    const handleSubmitReferral = () => {
        const referral: Referral = {
            id: `REF-${String(referrals.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            status: "pending",
            ...newReferral
        }
        setReferrals([referral, ...referrals])
        setNewReferral({ caseId: "", studentName: "", targetProfessional: "psychologist", reason: "" })
        setIsDialogOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Share2 className="h-5 w-5" />
                            轉介系統
                        </CardTitle>
                        <CardDescription>
                            將案件轉介給心理師或律師
                        </CardDescription>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                新增轉介
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>新增轉介申請</DialogTitle>
                                <DialogDescription>
                                    將案件轉介給專業人員進行評估與協助
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="caseId">案件編號</Label>
                                    <input
                                        id="caseId"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={newReferral.caseId}
                                        onChange={(e) => setNewReferral({ ...newReferral, caseId: e.target.value })}
                                        placeholder="例如：CASE-001"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="studentName">學生姓名</Label>
                                    <input
                                        id="studentName"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={newReferral.studentName}
                                        onChange={(e) => setNewReferral({ ...newReferral, studentName: e.target.value })}
                                        placeholder="請輸入學生姓名"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>轉介對象</Label>
                                    <RadioGroup
                                        value={newReferral.targetProfessional}
                                        onValueChange={(value) => setNewReferral({ ...newReferral, targetProfessional: value as "psychologist" | "lawyer" })}
                                    >
                                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                            <RadioGroupItem value="psychologist" id="psychologist" />
                                            <Label htmlFor="psychologist" className="flex items-center gap-2 cursor-pointer flex-1">
                                                <Brain className="h-4 w-4 text-pink-600" />
                                                <span>心理師/諮商師</span>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                                            <RadioGroupItem value="lawyer" id="lawyer" />
                                            <Label htmlFor="lawyer" className="flex items-center gap-2 cursor-pointer flex-1">
                                                <Scale className="h-4 w-4 text-amber-600" />
                                                <span>律師/法律顧問</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reason">轉介原因</Label>
                                    <Textarea
                                        id="reason"
                                        value={newReferral.reason}
                                        onChange={(e) => setNewReferral({ ...newReferral, reason: e.target.value })}
                                        placeholder="請說明轉介的原因與需求..."
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    取消
                                </Button>
                                <Button onClick={handleSubmitReferral}>
                                    提交轉介
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {referrals.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            尚無轉介記錄
                        </div>
                    ) : (
                        referrals.map((referral) => {
                            const ProfessionalIcon = professionalConfig[referral.targetProfessional].icon
                            return (
                                <Card key={referral.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{referral.id}</span>
                                                    <Badge className={statusConfig[referral.status].color}>
                                                        {statusConfig[referral.status].label}
                                                    </Badge>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{referral.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">案件：{referral.caseId}</span>
                                                <span className="text-sm text-muted-foreground">·</span>
                                                <span className="text-sm font-medium">{referral.studentName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                                <ProfessionalIcon className="h-5 w-5" />
                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                                <Badge className={professionalConfig[referral.targetProfessional].color}>
                                                    {professionalConfig[referral.targetProfessional].label}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {referral.reason}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
