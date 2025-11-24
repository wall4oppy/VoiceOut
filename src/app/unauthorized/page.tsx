"use client"

import { FadeIn } from "@/components/ui/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Home } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
            <FadeIn className="w-full max-w-md">
                <Card className="border-destructive/50">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                            <ShieldAlert className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl">無權訪問</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            抱歉，您沒有權限訪問此頁面。
                        </p>
                        <p className="text-sm text-muted-foreground">
                            這個頁面需要特定的身份權限才能訪問。
                        </p>
                        <div className="pt-4">
                            <Link href="/">
                                <Button className="w-full">
                                    <Home className="mr-2 h-4 w-4" />
                                    返回首頁
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </FadeIn>
        </div>
    )
}
