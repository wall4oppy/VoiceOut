import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">忘記密碼</CardTitle>
                    <CardDescription>
                        請輸入您的電子郵件地址，我們將發送重設密碼的連結給您。
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">電子郵件</Label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>
                    <Button className="w-full">發送重設連結</Button>
                    <div className="text-center">
                        <Link href="/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            返回登入
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
