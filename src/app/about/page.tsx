import { Shield, Users, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        讓每一個聲音，<span className="text-primary">都被溫柔接住</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                        VoiceOut 致力於打造一個零霸凌的網路世界。我們提供安全、隱密的舉報管道與心理支持，讓受傷的心靈不再獨自承受。
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/report">
                            <Button size="lg" className="rounded-full px-8">我要發聲</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="rounded-full px-8">聯絡我們</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-background">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <Lightbulb className="w-4 h-4" /> 我們的使命
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold">為什麼 VoiceOut 存在？</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                在數位時代，霸凌不再只發生在校園角落，而是隨時隨地可能透過螢幕傷害一個人。
                                許多受害者因為恐懼、羞愧或不知所措，選擇了沉默。
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                VoiceOut 成立的初衷，就是為了打破這份沉默。我們相信，科技應該用來保護人，而不是傷害人。
                                我們整合了法律、心理諮商與學校資源，建立了一道堅固的防護網。
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/30 p-6 rounded-2xl md:translate-y-8">
                                <Shield className="w-10 h-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg mb-2">安全隱密</h3>
                                <p className="text-sm text-muted-foreground">軍規級加密技術，確保您的舉報內容與身份絕對保密。</p>
                            </div>
                            <div className="bg-muted/30 p-6 rounded-2xl">
                                <Heart className="w-10 h-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg mb-2">心理支持</h3>
                                <p className="text-sm text-muted-foreground">專業心理師團隊進駐，提供即時的情緒疏導與陪伴。</p>
                            </div>
                            <div className="bg-muted/30 p-6 rounded-2xl md:translate-y-8">
                                <Users className="w-10 h-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg mb-2">匿名社群</h3>
                                <p className="text-sm text-muted-foreground">在這裡，你可以卸下面具，與有相同經歷的夥伴互相打氣。</p>
                            </div>
                            <div className="bg-muted/30 p-6 rounded-2xl">
                                <Lightbulb className="w-10 h-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg mb-2">教育推廣</h3>
                                <p className="text-sm text-muted-foreground">深入校園與社區，推動反霸凌教育，從源頭減少傷害。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 bg-muted/20 text-center">
                <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                    <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed font-serif italic text-foreground/80">
                        "勇氣並不是不害怕，而是即使害怕，也要堅持做對的事。你的聲音，值得被全世界聽見。"
                    </blockquote>
                    <p className="mt-8 text-primary font-semibold">— VoiceOut 創始團隊</p>
                </div>
            </section>
        </div>
    )
}
