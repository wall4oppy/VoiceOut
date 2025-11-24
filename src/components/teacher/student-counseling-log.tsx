"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, Plus, Calendar } from "lucide-react"

interface CounselingLog {
    id: string
    date: string
    studentName: string
    grade: string
    notes: string
    duration: string
}

const mockLogs: CounselingLog[] = [
    {
        id: "LOG-001",
        date: "2024-11-22",
        studentName: "王小明",
        grade: "3年2班",
        notes: "討論了社群媒體霸凌的應對策略，學生情緒穩定，願意配合後續輔導。",
        duration: "30分鐘"
    },
    {
        id: "LOG-002",
        date: "2024-11-20",
        studentName: "李小華",
        grade: "2年1班",
        notes: "進行第二次輔導，學生表示情況有所改善，已與班上同學建立初步友誼。",
        duration: "45分鐘"
    }
]

export function StudentCounselingLog() {
    const [logs, setLogs] = useState<CounselingLog[]>(mockLogs)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newLog, setNewLog] = useState({
        studentName: "",
        grade: "",
        notes: "",
        duration: ""
    })

    const handleAddLog = () => {
        const log: CounselingLog = {
            id: `LOG-${String(logs.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            ...newLog
        }
        setLogs([log, ...logs])
        setNewLog({ studentName: "", grade: "", notes: "", duration: "" })
        setIsDialogOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            學生輔導記錄
                        </CardTitle>
                        <CardDescription>
                            記錄與追蹤學生的輔導狀況
                        </CardDescription>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                新增記錄
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>新增輔導記錄</DialogTitle>
                                <DialogDescription>
                                    記錄本次輔導的詳細資訊
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="studentName">學生姓名</Label>
                                    <Input
                                        id="studentName"
                                        value={newLog.studentName}
                                        onChange={(e) => setNewLog({ ...newLog, studentName: e.target.value })}
                                        placeholder="請輸入學生姓名"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="grade">班級</Label>
                                    <Input
                                        id="grade"
                                        value={newLog.grade}
                                        onChange={(e) => setNewLog({ ...newLog, grade: e.target.value })}
                                        placeholder="例如：3年2班"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">輔導時長</Label>
                                    <Input
                                        id="duration"
                                        value={newLog.duration}
                                        onChange={(e) => setNewLog({ ...newLog, duration: e.target.value })}
                                        placeholder="例如：30分鐘"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">輔導記錄</Label>
                                    <Textarea
                                        id="notes"
                                        value={newLog.notes}
                                        onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                                        placeholder="請詳細記錄本次輔導的內容、學生狀況及後續建議..."
                                        rows={5}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    取消
                                </Button>
                                <Button onClick={handleAddLog}>
                                    儲存記錄
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {logs.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            尚無輔導記錄
                        </div>
                    ) : (
                        logs.map((log) => (
                            <Card key={log.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">{log.date}</span>
                                                <span className="text-sm text-muted-foreground">·</span>
                                                <span className="text-sm text-muted-foreground">{log.duration}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{log.id}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold">{log.studentName}</span>
                                            <span className="text-muted-foreground text-sm"> · {log.grade}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {log.notes}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
