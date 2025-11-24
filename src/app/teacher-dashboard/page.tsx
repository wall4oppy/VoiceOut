"use client"

import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/roles"
import { FadeIn } from "@/components/ui/motion"
import { ProtectedRoute } from "@/components/protected-route"
import { SchoolCaseList } from "@/components/teacher/school-case-list"
import { StudentCounselingLog } from "@/components/teacher/student-counseling-log"
import { ReferralSystem } from "@/components/teacher/referral-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeacherDashboard() {
    const { user } = useAuth()

    return (
        <ProtectedRoute requiredRole={UserRole.TEACHER}>
            <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 space-y-8">
                <FadeIn>
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold">教師儀表板</h1>
                        <p className="text-muted-foreground mt-2 text-base md:text-lg">
                            歡迎回來，{user?.name || "老師"}。這裡是您管理學生狀況與案件的中心。
                        </p>
                    </div>

                    <Tabs defaultValue="cases" className="space-y-6 md:space-y-8">
                        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
                            <TabsTrigger value="cases" className="py-3">學校案件</TabsTrigger>
                            <TabsTrigger value="counseling" className="py-3">輔導記錄</TabsTrigger>
                            <TabsTrigger value="referrals" className="py-3">轉介系統</TabsTrigger>
                        </TabsList>

                        <TabsContent value="cases" className="mt-6">
                            <SchoolCaseList />
                        </TabsContent>

                        <TabsContent value="counseling" className="mt-6">
                            <StudentCounselingLog />
                        </TabsContent>

                        <TabsContent value="referrals" className="mt-6">
                            <ReferralSystem />
                        </TabsContent>
                    </Tabs>
                </FadeIn>
            </div>
        </ProtectedRoute>
    )
}
