import Link from "next/link"
import { ShieldCheck, Github, Twitter, Facebook, Instagram } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-10 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand Section */}
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg">VoiceOut</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            致力於打造更安全的網路環境。讓每個人都能安心發聲，杜絕網路霸凌。
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">平台功能</h4>
                        <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <Link href="/report" className="hover:text-primary transition-colors">我要舉報</Link>
                            <Link href="/support/peer-group" className="hover:text-primary transition-colors">匿名社群</Link>
                            <Link href="/tools/text-detoxifier" className="hover:text-primary transition-colors">文字消毒</Link>
                            <Link href="/dashboard" className="hover:text-primary transition-colors">案件進度</Link>
                        </nav>
                    </div>

                    {/* Resources Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">支援資源</h4>
                        <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <Link href="/support" className="hover:text-primary transition-colors">心理支持</Link>
                            <Link href="/education" className="hover:text-primary transition-colors">教育宣導</Link>
                            <Link href="/legal" className="hover:text-primary transition-colors">法律諮詢</Link>
                            <Link href="/guide" className="hover:text-primary transition-colors">使用指南</Link>
                        </nav>
                    </div>

                    {/* Legal & Social */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">相關資訊</h4>
                        <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-primary transition-colors">關於我們</Link>
                            <Link href="/privacy" className="hover:text-primary transition-colors">隱私政策</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">服務條款</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">聯絡我們</Link>
                        </nav>

                        {/* Social Icons */}
                        <div className="flex items-center space-x-4 pt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-8 border-t flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © 2025 VoiceOut. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground text-center md:text-right flex items-center gap-2">
                        Built for a safer internet <ShieldCheck className="h-3 w-3" />
                    </p>
                </div>
            </div>
        </footer>
    )
}
