"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, X, CheckCircle2 } from "lucide-react"
import { useUserData } from "@/contexts/user-data-context"
import Link from "next/link"

export function SafetyPlan() {
    const { userData, updateSafetyPlan } = useUserData()
    const [warningSign, setWarningSign] = useState("")
    const [warningSigns, setWarningSigns] = useState<string[]>([])
    const [copingStrategy, setCopingStrategy] = useState("")
    const [copingStrategies, setCopingStrategies] = useState<string[]>([])
    const [contact, setContact] = useState({ name: "", phone: "" })
    const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([])
    const [safePlace, setSafePlace] = useState("")
    const [safePlaces, setSafePlaces] = useState<string[]>([])
    const [saved, setSaved] = useState(false)

    // Load existing safety plan on mount
    useEffect(() => {
        if (userData.safetyPlan) {
            setWarningSigns(userData.safetyPlan.warningSigns)
            setCopingStrategies(userData.safetyPlan.copingStrategies)
            setContacts(userData.safetyPlan.contacts)
            setSafePlaces(userData.safetyPlan.safePlaces || [])
        }
    }, [])

    const addWarningSign = () => {
        if (warningSign.trim()) {
            setWarningSigns([...warningSigns, warningSign])
            setWarningSign("")
        }
    }

    const addCopingStrategy = () => {
        if (copingStrategy.trim()) {
            setCopingStrategies([...copingStrategies, copingStrategy])
            setCopingStrategy("")
        }
    }

    const addContact = () => {
        if (contact.name.trim() && contact.phone.trim()) {
            setContacts([...contacts, contact])
            setContact({ name: "", phone: "" })
        }
    }

    const addSafePlace = () => {
        if (safePlace.trim()) {
            setSafePlaces([...safePlaces, safePlace])
            setSafePlace("")
        }
    }

    const savePlan = () => {
        updateSafetyPlan({
            warningSigns,
            copingStrategies,
            contacts,
            safePlaces,
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    個人化安全計畫
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    建立你的專屬安全計畫，在困難時刻保護自己。
                </p>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Warning Signs */}
                <div className="space-y-3">
                    <h3 className="font-bold">1. 我的警訊（當我開始感到不對勁時）</h3>
                    <div className="flex gap-2">
                        <Input
                            placeholder="例如：開始失眠、不想見人、食慾改變..."
                            value={warningSign}
                            onChange={(e) => setWarningSign(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addWarningSign()}
                        />
                        <Button onClick={addWarningSign} size="icon">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    {warningSigns.length > 0 && (
                        <div className="space-y-2">
                            {warningSigns.map((sign, i) => (
                                <div key={i} className="flex items-center justify-between bg-muted p-3 rounded">
                                    <span>{sign}</span>
                                    <button onClick={() => setWarningSigns(warningSigns.filter((_, idx) => idx !== i))}>
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Coping Strategies */}
                <div className="space-y-3">
                    <h3 className="font-bold">2. 我的應對策略（可以幫助我的事情）</h3>
                    <div className="flex gap-2">
                        <Input
                            placeholder="例如：聽音樂、深呼吸、散步、找朋友聊天..."
                            value={copingStrategy}
                            onChange={(e) => setCopingStrategy(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addCopingStrategy()}
                        />
                        <Button onClick={addCopingStrategy} size="icon">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    {copingStrategies.length > 0 && (
                        <div className="space-y-2">
                            {copingStrategies.map((strategy, i) => (
                                <div key={i} className="flex items-center justify-between bg-muted p-3 rounded">
                                    <span>{strategy}</span>
                                    <button onClick={() => setCopingStrategies(copingStrategies.filter((_, idx) => idx !== i))}>
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Emergency Contacts */}
                <div className="space-y-3">
                    <h3 className="font-bold">3. 緊急聯絡人</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            placeholder="姓名"
                            value={contact.name}
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        />
                        <Input
                            placeholder="電話"
                            value={contact.phone}
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        />
                    </div>
                    <Button onClick={addContact} variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> 新增聯絡人
                    </Button>
                    {contacts.length > 0 && (
                        <div className="space-y-2">
                            {contacts.map((c, i) => (
                                <div key={i} className="flex items-center justify-between bg-muted p-3 rounded">
                                    <span>{c.name} - {c.phone}</span>
                                    <button onClick={() => setContacts(contacts.filter((_, idx) => idx !== i))}>
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Safe Places */}
                <div className="space-y-3">
                    <h3 className="font-bold">4. 我的安全地點</h3>
                    <div className="flex gap-2">
                        <Input
                            placeholder="例如：圖書館、公園、朋友家..."
                            value={safePlace}
                            onChange={(e) => setSafePlace(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addSafePlace()}
                        />
                        <Button onClick={addSafePlace} size="icon">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    {safePlaces.length > 0 && (
                        <div className="space-y-2">
                            {safePlaces.map((place, i) => (
                                <div key={i} className="flex items-center justify-between bg-muted p-3 rounded">
                                    <span>{place}</span>
                                    <button onClick={() => setSafePlaces(safePlaces.filter((_, idx) => idx !== i))}>
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {saved ? (
                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <div>
                                <p className="font-bold text-green-600">安全計畫已儲存！</p>
                                <p className="text-sm text-muted-foreground">你可以隨時在個人資料頁面查看你的安全計畫</p>
                            </div>
                        </div>
                        <Link href="/profile" className="block">
                            <Button variant="outline" className="w-full">
                                前往個人資料頁面
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Button onClick={savePlan} className="w-full h-12 text-lg">
                        儲存安全計畫
                    </Button>
                )}

                <div className="bg-destructive/10 p-4 rounded-lg text-sm text-destructive">
                    <p className="font-bold mb-2">緊急情況</p>
                    <p>如果你有立即的危險或自傷念頭，請立即撥打：</p>
                    <p className="font-bold mt-2">生命線 1995 | 安心專線 1925 | 110</p>
                </div>
            </CardContent>
        </Card>
    )
}
