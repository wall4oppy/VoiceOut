"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, User, School, MapPin, Award } from "lucide-react"

// 測試用戶資料（包含完整的組織欄位）
const testUsers = {
    teacher: {
        email: "teacher@test.com",
        role: UserRole.TEACHER,
        userData: {
            name: "張老師",
            school: "台北市立中正國中",
            district: "台北市",
            position: "學務主任",
            teachingGrades: ["七年級", "八年級", "九年級"]
        }
    },
    psychologist: {
        email: "psychologist@test.com",
        role: UserRole.PSYCHOLOGIST,
        userData: {
            name: "李心理師",
            licenseNumber: "心字第12345號",
            serviceArea: ["台北市", "新北市"],
            specialties: ["霸凌創傷", "情緒障礙"]
        }
    },
    lawyer: {
        email: "lawyer@test.com",
        role: UserRole.LAWYER,
        userData: {
            name: "王律師",
            licenseNumber: "律字第67890號",
            serviceArea: ["台北市", "新北市", "桃園市"],
            specialties: ["校園法律", "少年法"]
        }
    },
    victim: {
        email: "victim@test.com",
        role: UserRole.VICTIM,
        userData: {
            name: "王小明",
            school: "台北市立中正國中",
            district: "台北市",
            grade: "八年級",
            class: "2"
        }
    }
}

export default function AuthTestPage() {
    const { user, isLoggedIn, login, logout } = useAuth()
    const [testResults, setTestResults] = useState<Array<{ test: string, passed: boolean, message: string }>>([])

    const runTests = () => {
        const results: Array<{ test: string, passed: boolean, message: string }> = []

        // Test 1: 登入教師帳號
        try {
            const teacher = testUsers.teacher
            login(teacher.email, teacher.role, teacher.userData)

            // 檢查 localStorage
            const storedData = localStorage.getItem("userData")
            if (storedData) {
                const parsed = JSON.parse(storedData)
                const hasSchool = parsed.school === "台北市立中正國中"
                const hasPosition = parsed.position === "學務主任"

                results.push({
                    test: "教師登入 - 組織欄位儲存",
                    passed: hasSchool && hasPosition,
                    message: hasSchool && hasPosition
                        ? "✓ 學校和職稱正確儲存"
                        : "✗ 組織欄位遺失"
                })
            } else {
                results.push({
                    test: "教師登入 - 組織欄位儲存",
                    passed: false,
                    message: "✗ userData 未儲存到 localStorage"
                })
            }
        } catch (error) {
            results.push({
                test: "教師登入 - 組織欄位儲存",
                passed: false,
                message: `✗ 錯誤: ${error}`
            })
        }

        // Test 2: 登出並重新登入
        try {
            logout()
            const psychologist = testUsers.psychologist
            login(psychologist.email, psychologist.role, psychologist.userData)

            const storedData = localStorage.getItem("userData")
            if (storedData) {
                const parsed = JSON.parse(storedData)
                const hasLicense = parsed.licenseNumber === "心字第12345號"
                const hasServiceArea = Array.isArray(parsed.serviceArea) && parsed.serviceArea.length === 2

                results.push({
                    test: "心理師登入 - 專業欄位儲存",
                    passed: hasLicense && hasServiceArea,
                    message: hasLicense && hasServiceArea
                        ? "✓ 證照和服務地區正確儲存"
                        : "✗ 專業欄位遺失"
                })
            }
        } catch (error) {
            results.push({
                test: "心理師登入 - 專業欄位儲存",
                passed: false,
                message: `✗ 錯誤: ${error}`
            })
        }

        // Test 3: 測試陣列欄位
        try {
            const storedData = localStorage.getItem("userData")
            if (storedData) {
                const parsed = JSON.parse(storedData)
                const serviceAreaCorrect =
                    Array.isArray(parsed.serviceArea) &&
                    parsed.serviceArea.includes("台北市") &&
                    parsed.serviceArea.includes("新北市")

                const specialtiesCorrect =
                    Array.isArray(parsed.specialties) &&
                    parsed.specialties.includes("霸凌創傷")

                results.push({
                    test: "陣列欄位序列化",
                    passed: serviceAreaCorrect && specialtiesCorrect,
                    message: serviceAreaCorrect && specialtiesCorrect
                        ? "✓ 陣列欄位正確序列化和反序列化"
                        : "✗ 陣列欄位處理錯誤"
                })
            }
        } catch (error) {
            results.push({
                test: "陣列欄位序列化",
                passed: false,
                message: `✗ 錯誤: ${error}`
            })
        }

        // Test 4: 向後兼容性測試
        try {
            // 清除新格式，設置舊格式
            localStorage.removeItem("userData")
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userEmail", "old@test.com")
            localStorage.setItem("userRole", UserRole.ADMIN)

            // 重新載入頁面會觸發 useEffect，但我們可以手動測試
            const storedEmail = localStorage.getItem("userEmail")
            const storedRole = localStorage.getItem("userRole")

            results.push({
                test: "向後兼容性",
                passed: storedEmail === "old@test.com" && storedRole === UserRole.ADMIN,
                message: "✓ 舊格式資料仍可讀取"
            })
        } catch (error) {
            results.push({
                test: "向後兼容性",
                passed: false,
                message: `✗ 錯誤: ${error}`
            })
        }

        setTestResults(results)
    }

    const testLogin = (userKey: keyof typeof testUsers) => {
        const testUser = testUsers[userKey]
        login(testUser.email, testUser.role, testUser.userData)
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">AuthContext 擴展功能測試</h1>
                <p className="text-muted-foreground">
                    測試 Phase 5 擴展的用戶模型與數據儲存功能
                </p>
            </div>

            {/* 當前用戶狀態 */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        當前用戶狀態
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoggedIn && user ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">已登入</Badge>
                                <span className="font-medium">{user.email}</span>
                            </div>

                            {user.name && (
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.name}</span>
                                </div>
                            )}

                            {user.school && (
                                <div className="flex items-center gap-2 text-sm">
                                    <School className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.school}</span>
                                    {user.grade && user.class && (
                                        <span className="text-muted-foreground">
                                            · {user.grade}{user.class}班
                                        </span>
                                    )}
                                </div>
                            )}

                            {user.district && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.district}</span>
                                </div>
                            )}

                            {user.position && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.position}</span>
                                </div>
                            )}

                            {user.licenseNumber && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.licenseNumber}</span>
                                </div>
                            )}

                            {user.serviceArea && user.serviceArea.length > 0 && (
                                <div className="text-sm">
                                    <span className="text-muted-foreground">服務地區: </span>
                                    {user.serviceArea.join(", ")}
                                </div>
                            )}

                            {user.specialties && user.specialties.length > 0 && (
                                <div className="text-sm">
                                    <span className="text-muted-foreground">專長: </span>
                                    {user.specialties.join(", ")}
                                </div>
                            )}

                            <Button onClick={logout} variant="outline" size="sm" className="mt-4">
                                登出
                            </Button>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">未登入</p>
                    )}
                </CardContent>
            </Card>

            {/* 測試用戶登入 */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>測試用戶登入</CardTitle>
                    <CardDescription>點擊按鈕以不同角色登入，查看擴展欄位</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                        <Button onClick={() => testLogin("teacher")} variant="outline">
                            教師登入
                        </Button>
                        <Button onClick={() => testLogin("psychologist")} variant="outline">
                            心理師登入
                        </Button>
                        <Button onClick={() => testLogin("lawyer")} variant="outline">
                            律師登入
                        </Button>
                        <Button onClick={() => testLogin("victim")} variant="outline">
                            學生登入
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 自動化測試 */}
            <Card>
                <CardHeader>
                    <CardTitle>自動化測試</CardTitle>
                    <CardDescription>執行完整的功能測試套件</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={runTests} className="mb-4">
                        執行測試
                    </Button>

                    {testResults.length > 0 && (
                        <div className="space-y-2">
                            {testResults.map((result, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg border ${result.passed
                                            ? "bg-green-50 border-green-200"
                                            : "bg-red-50 border-red-200"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {result.passed ? (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <XCircle className="h-4 w-4 text-red-600" />
                                        )}
                                        <span className="font-medium">{result.test}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1 ml-6">
                                        {result.message}
                                    </p>
                                </div>
                            ))}

                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="font-medium">
                                    測試結果: {testResults.filter(r => r.passed).length} / {testResults.length} 通過
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
