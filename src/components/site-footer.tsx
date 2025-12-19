import Link from "next/link"
import { ShieldCheck, Github, Twitter, Facebook, Instagram } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto w-full py-10 md:py-12 flex flex-col items-center text-center">
                {/* Brand Section */}
                <div className="flex flex-col items-center space-y-4 mb-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <span className="font-bold text-2xl">VoiceOut</span>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                        致力於打造更安全的網路環境。讓每個人都能安心發聲，杜絕網路霸凌。
                    </p>
                </div>

                {/* Legal & Social */}
                <div className="flex flex-col items-center space-y-6">
                    <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        <Link href="/about" className="hover:text-primary transition-colors">關於我們</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">隱私政策</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">服務條款</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">聯絡我們</Link>
                    </nav>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-6">
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

                {/* Bottom Bar */}
                <div className="mt-10 pt-8 border-t w-full flex flex-col items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2025 VoiceOut. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                        Built for a safer internet <ShieldCheck className="h-3 w-3" />
                    </p>
                </div>
            </div>
        </footer>
    )
}
