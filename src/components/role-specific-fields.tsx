"use client"

import { useState } from "react"
import { UserRole } from "@/lib/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface RoleSpecificFieldsProps {
    role: UserRole
    formData: any
    setFormData: (data: any) => void
}

// 台灣縣市列表
const TAIWAN_DISTRICTS = [
    "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
    "基隆市", "新竹市", "嘉義市",
    "新竹縣", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣",
    "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"
]

// 年級選項
const GRADES = ["一年級", "二年級", "三年級", "四年級", "五年級", "六年級", "七年級", "八年級", "九年級", "十年級", "十一年級", "十二年級"]

// 專長領域
const PSYCHOLOGIST_SPECIALTIES = ["霸凌創傷", "情緒障礙", "家庭問題", "學習困難", "人際關係", "青少年發展"]
const LAWYER_SPECIALTIES = ["校園法律", "少年法", "民事訴訟", "刑事訴訟", "行政訴訟", "調解協商"]

export function RoleSpecificFields({ role, formData, setFormData }: RoleSpecificFieldsProps) {
    const updateField = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value })
    }

    const toggleArrayItem = (field: string, item: string) => {
        const currentArray = formData[field] || []
        const newArray = currentArray.includes(item)
            ? currentArray.filter((i: string) => i !== item)
            : [...currentArray, item]
        updateField(field, newArray)
    }

    // 學生/受害者註冊欄位
    if (role === UserRole.VICTIM) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="district">縣市 *</Label>
                    <Select value={formData.district || ""} onValueChange={(v: string) => updateField("district", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="選擇縣市" />
                        </SelectTrigger>
                        <SelectContent>
                            {TAIWAN_DISTRICTS.map(d => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="school">學校名稱 *</Label>
                    <Input
                        id="school"
                        value={formData.school || ""}
                        onChange={(e) => updateField("school", e.target.value)}
                        placeholder="例：台北市立中正國中"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="grade">年級 *</Label>
                        <Select value={formData.grade || ""} onValueChange={(v: string) => updateField("grade", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="選擇年級" />
                            </SelectTrigger>
                            <SelectContent>
                                {GRADES.map(g => (
                                    <SelectItem key={g} value={g}>{g}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="class">班級 *</Label>
                        <Input
                            id="class"
                            value={formData.class || ""}
                            onChange={(e) => updateField("class", e.target.value)}
                            placeholder="例：3"
                        />
                    </div>
                </div>
            </div>
        )
    }

    // 家長/監護人註冊欄位
    if (role === UserRole.PARENT) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="childName">學生姓名 *</Label>
                    <Input
                        id="childName"
                        value={formData.childName || ""}
                        onChange={(e) => updateField("childName", e.target.value)}
                        placeholder="孩子的姓名"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="relationship">關係 *</Label>
                    <Select value={formData.relationship || ""} onValueChange={(v: string) => updateField("relationship", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="選擇關係" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="父親">父親</SelectItem>
                            <SelectItem value="母親">母親</SelectItem>
                            <SelectItem value="監護人">監護人</SelectItem>
                            <SelectItem value="其他">其他</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="district">縣市 *</Label>
                    <Select value={formData.district || ""} onValueChange={(v: string) => updateField("district", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="選擇縣市" />
                        </SelectTrigger>
                        <SelectContent>
                            {TAIWAN_DISTRICTS.map(d => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="school">學生就讀學校 *</Label>
                    <Input
                        id="school"
                        value={formData.school || ""}
                        onChange={(e) => updateField("school", e.target.value)}
                        placeholder="例：台北市立中正國中"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="grade">年級 *</Label>
                        <Select value={formData.grade || ""} onValueChange={(v: string) => updateField("grade", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="選擇年級" />
                            </SelectTrigger>
                            <SelectContent>
                                {GRADES.map(g => (
                                    <SelectItem key={g} value={g}>{g}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="class">班級 *</Label>
                        <Input
                            id="class"
                            value={formData.class || ""}
                            onChange={(e) => updateField("class", e.target.value)}
                            placeholder="例：3"
                        />
                    </div>
                </div>
            </div>
        )
    }

    // 教師/輔導老師註冊欄位
    if (role === UserRole.TEACHER) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="district">縣市 *</Label>
                    <Select value={formData.district || ""} onValueChange={(v: string) => updateField("district", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="選擇縣市" />
                        </SelectTrigger>
                        <SelectContent>
                            {TAIWAN_DISTRICTS.map(d => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="school">任職學校 *</Label>
                    <Input
                        id="school"
                        value={formData.school || ""}
                        onChange={(e) => updateField("school", e.target.value)}
                        placeholder="例：台北市立中正國中"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="position">職稱 *</Label>
                    <Select value={formData.position || ""} onValueChange={(v: string) => updateField("position", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="選擇職稱" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="導師">導師</SelectItem>
                            <SelectItem value="輔導老師">輔導老師</SelectItem>
                            <SelectItem value="學務主任">學務主任</SelectItem>
                            <SelectItem value="輔導主任">輔導主任</SelectItem>
                            <SelectItem value="其他">其他</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label>任教年級（可多選）</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {GRADES.map(grade => (
                            <div key={grade} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`grade-${grade}`}
                                    checked={(formData.teachingGrades || []).includes(grade)}
                                    onCheckedChange={() => toggleArrayItem("teachingGrades", grade)}
                                />
                                <Label htmlFor={`grade-${grade}`} className="cursor-pointer font-normal text-sm">
                                    {grade}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // 心理師註冊欄位
    if (role === UserRole.PSYCHOLOGIST) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">心理師證照號碼 *</Label>
                    <Input
                        id="licenseNumber"
                        value={formData.licenseNumber || ""}
                        onChange={(e) => updateField("licenseNumber", e.target.value)}
                        placeholder="例：心字第 12345 號"
                    />
                </div>

                <div className="space-y-3">
                    <Label>服務地區（可多選）*</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                        {TAIWAN_DISTRICTS.map(district => (
                            <div key={district} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`district-${district}`}
                                    checked={(formData.serviceArea || []).includes(district)}
                                    onCheckedChange={() => toggleArrayItem("serviceArea", district)}
                                />
                                <Label htmlFor={`district-${district}`} className="cursor-pointer font-normal text-sm">
                                    {district}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>專長領域（可多選）</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {PSYCHOLOGIST_SPECIALTIES.map(specialty => (
                            <div key={specialty} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`specialty-${specialty}`}
                                    checked={(formData.specialties || []).includes(specialty)}
                                    onCheckedChange={() => toggleArrayItem("specialties", specialty)}
                                />
                                <Label htmlFor={`specialty-${specialty}`} className="cursor-pointer font-normal text-sm">
                                    {specialty}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // 律師註冊欄位
    if (role === UserRole.LAWYER) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">律師證號 *</Label>
                    <Input
                        id="licenseNumber"
                        value={formData.licenseNumber || ""}
                        onChange={(e) => updateField("licenseNumber", e.target.value)}
                        placeholder="例：律字第 12345 號"
                    />
                </div>

                <div className="space-y-3">
                    <Label>服務地區（可多選）*</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                        {TAIWAN_DISTRICTS.map(district => (
                            <div key={district} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`district-${district}`}
                                    checked={(formData.serviceArea || []).includes(district)}
                                    onCheckedChange={() => toggleArrayItem("serviceArea", district)}
                                />
                                <Label htmlFor={`district-${district}`} className="cursor-pointer font-normal text-sm">
                                    {district}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>專長領域（可多選）</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {LAWYER_SPECIALTIES.map(specialty => (
                            <div key={specialty} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`specialty-${specialty}`}
                                    checked={(formData.specialties || []).includes(specialty)}
                                    onCheckedChange={() => toggleArrayItem("specialties", specialty)}
                                />
                                <Label htmlFor={`specialty-${specialty}`} className="cursor-pointer font-normal text-sm">
                                    {specialty}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // 管理員註冊欄位
    if (role === UserRole.ADMIN) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="jurisdiction">管轄範圍 *</Label>
                    <Select value={formData.jurisdiction || ""} onValueChange={(v: string) => updateField("jurisdiction", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="選擇管轄範圍" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="national">全國</SelectItem>
                            <SelectItem value="district">縣市</SelectItem>
                            <SelectItem value="school">學校</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {formData.jurisdiction === "district" && (
                    <div className="space-y-2">
                        <Label htmlFor="jurisdictionArea">管轄縣市 *</Label>
                        <Select value={formData.jurisdictionArea || ""} onValueChange={(v: string) => updateField("jurisdictionArea", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="選擇縣市" />
                            </SelectTrigger>
                            <SelectContent>
                                {TAIWAN_DISTRICTS.map(d => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {formData.jurisdiction === "school" && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="district">縣市 *</Label>
                            <Select value={formData.district || ""} onValueChange={(v: string) => updateField("district", v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="選擇縣市" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TAIWAN_DISTRICTS.map(d => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jurisdictionArea">管轄學校 *</Label>
                            <Input
                                id="jurisdictionArea"
                                value={formData.jurisdictionArea || ""}
                                onChange={(e) => updateField("jurisdictionArea", e.target.value)}
                                placeholder="例：台北市立中正國中"
                            />
                        </div>
                    </>
                )}
            </div>
        )
    }

    return null
}
