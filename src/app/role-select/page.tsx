"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserRole, ROLE_METADATA } from "@/lib/roles"
import { useRouter } from "next/navigation"
import { FadeIn } from "@/components/ui/motion"
import { ArrowRight } from "lucide-react"

export default function RoleSelectPage() {
    const router = useRouter()
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

    const roles = Object.values(UserRole)

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role)
        // Store selected role temporarily
        sessionStorage.setItem("selectedRole", role)
        // Redirect to login page
        router.push("/login")
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <FadeIn className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">VoiceOut</h1>
                    <p className="text-xl text-muted-foreground">Your voice, your power</p>
                    <p className="text-xl text-muted-foreground">請選擇您的身份登入</p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role, index) => {
                        const metadata = ROLE_METADATA[role]
                        return (
                            <FadeIn key={role} delay={index * 0.1}>
                                <Card
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${selectedRole === role ? 'ring-2 ring-primary' : ''
                                        }`}
                                    onClick={() => handleRoleSelect(role)}
                                >
                                    <CardHeader className="text-center">
                                        <div className="text-6xl mb-4">{metadata.icon}</div>
                                        <CardTitle className="text-2xl">{metadata.label}</CardTitle>
                                        <CardDescription className="text-base mt-2">
                                            {metadata.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            className="w-full"
                                            variant={selectedRole === role ? "default" : "outline"}
                                        >
                                            選擇此身份
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </FadeIn>
                        )
                    })}
                </div>

                <FadeIn delay={0.6} className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">已有帳號？</p>
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/login")}
                        className="text-lg"
                    >
                        直接登入 →
                    </Button>
                </FadeIn>
            </div>
        </div>
    )
}
