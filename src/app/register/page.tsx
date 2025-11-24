import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FadeIn } from "@/components/ui/motion"
import { ShieldCheck, ShieldAlert, Heart, Scale } from "lucide-react"

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Brand Section */}
            <FadeIn className="hidden lg:flex flex-col justify-center px-12 xl:px-20 bg-card">
                <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">VoiceOut</h2>
                    </div>

                    <h1 className="text-4xl font-bold mb-4">
                        加入我們<br />共同守護網路安全
                    </h1>

                    <p className="text-muted-foreground text-lg mb-12">
                        成為 VoiceOut 的一員，一起建立更友善的網路環境
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <ShieldAlert className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">安全舉報</h3>
                                <p className="text-sm text-muted-foreground">匿名且安全的舉報系統</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Heart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">心理支持</h3>
                                <p className="text-sm text-muted-foreground">專業的心理諮詢服務</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Scale className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">法律協助</h3>
                                <p className="text-sm text-muted-foreground">完整的法律諮詢與支援</p>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* Right Side - Register Form */}
            <FadeIn delay={0.2} className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <ShieldCheck className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold">VoiceOut</h1>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">建立新帳戶</h2>
                        <p className="text-muted-foreground">填寫以下資訊開始使用</p>
                    </div>

                    <Card className="p-6">
                        <form className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">名字</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="王"
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">姓氏</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="小明"
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">電子郵件</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">密碼</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="至少 8 個字元"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">確認密碼</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="再次輸入密碼"
                                    className="h-11"
                                />
                            </div>

                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms" className="mt-1" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                                >
                                    我同意{" "}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        服務條款
                                    </Link>{" "}
                                    和{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        隱私政策
                                    </Link>
                                </label>
                            </div>

                            <Button className="w-full h-11" size="lg">
                                建立帳戶
                            </Button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-card text-muted-foreground">或使用</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-11">
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="h-11">
                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    GitHub
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            已經有帳戶了？{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                立即登入
                            </Link>
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}
