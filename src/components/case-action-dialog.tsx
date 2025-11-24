"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { FileText, CheckCircle, PlayCircle, Paperclip } from "lucide-react"

export type ActionType = "start_processing" | "resolve" | "add_note"

interface CaseActionDialogProps {
    isOpen: boolean
    onClose: () => void
    caseId: string
    studentName: string
    actionType: ActionType
    onConfirm: (data: any) => void
}

export function CaseActionDialog({
    isOpen,
    onClose,
    caseId,
    studentName,
    actionType,
    onConfirm
}: CaseActionDialogProps) {
    const [actionData, setActionData] = useState({
        date: new Date().toISOString().split('T')[0],
        title: "",
        description: "",
        outcome: ""
    })

    // Reset form when dialog opens or action type changes
    useEffect(() => {
        if (isOpen) {
            const defaults = getDefaultsForAction(actionType)
            setActionData({
                date: new Date().toISOString().split('T')[0],
                title: defaults.title,
                description: "",
                outcome: ""
            })
        }
    }, [isOpen, actionType])

    const getDefaultsForAction = (type: ActionType) => {
        switch (type) {
            case "start_processing":
                return {
                    title: "開始處理案件",
                    icon: PlayCircle,
                    color: "text-blue-600",
                    descPlaceholder: "描述初步處理計劃或採取的立即措施...",
                    btnText: "確認開始處理"
                }
            case "resolve":
                return {
                    title: "標記為已解決",
                    icon: CheckCircle,
                    color: "text-green-600",
                    descPlaceholder: "描述案件處理結果和解決方案...",
                    btnText: "確認結案"
                }
            case "add_note":
            default:
                return {
                    title: "新增處理記錄",
                    icon: FileText,
                    color: "text-gray-600",
                    descPlaceholder: "記錄處理過程、訪談內容或觀察事項...",
                    btnText: "儲存記錄"
                }
        }
    }

    const config = getDefaultsForAction(actionType)
    const Icon = config.icon

    const handleConfirm = () => {
        onConfirm({
            caseId,
            actionType,
            ...actionData,
            timestamp: new Date().toISOString()
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Icon className={`h-6 w-6 ${config.color}`} />
                        {config.title}
                    </DialogTitle>
                    <DialogDescription>
                        案件: {caseId} | 學生: {studentName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">日期</Label>
                        <Input
                            id="date"
                            type="date"
                            value={actionData.date}
                            onChange={(e) => setActionData({ ...actionData, date: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            {actionType === "resolve" ? "處理結果與方案" : "內容描述"}
                        </Label>
                        <Textarea
                            id="description"
                            placeholder={config.descPlaceholder}
                            value={actionData.description}
                            onChange={(e) => setActionData({ ...actionData, description: e.target.value })}
                            rows={5}
                        />
                    </div>

                    {actionType === "resolve" && (
                        <div className="space-y-2">
                            <Label htmlFor="outcome">後續追蹤事項 (選填)</Label>
                            <Input
                                id="outcome"
                                placeholder="例如：下週需再次晤談..."
                                value={actionData.outcome}
                                onChange={(e) => setActionData({ ...actionData, outcome: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-primary">
                        <Paperclip className="h-4 w-4" />
                        <span>附加檔案 (圖片/文件)</span>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>取消</Button>
                    <Button onClick={handleConfirm}>{config.btnText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
