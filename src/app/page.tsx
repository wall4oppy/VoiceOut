import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, HeartHandshake, Scale, MessageCircle } from "lucide-react"
import { FadeIn, StaggerText } from "@/components/ui/motion"
import { ProcessFlow } from "@/components/home/process-flow"
import { TrustBadges } from "@/components/home/trust-badges"
import { TextDetoxWidget } from "@/components/home/text-detox-widget"
import { ImpactStats } from "@/components/home/impact-stats"
import { FAQSection } from "@/components/home/faq-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                <StaggerText text="面對網路霸凌，你並不孤單" className="justify-center" />
              </h1>
              <FadeIn delay={0.5} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                我們提供安全的舉報管道、專業的心理支持與法律協助。
                在這裡，你的聲音會被聽見，你的傷痛會被接住。
              </FadeIn>
            </div>
            <FadeIn delay={0.8} className="space-x-4">
              <Link href="/report">
                <Button size="lg" className="h-12 px-8 text-lg bg-destructive hover:bg-destructive/90 text-white shadow-lg shadow-destructive/20">
                  <ShieldAlert className="mr-2 h-5 w-5" />
                  立即舉報
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  <HeartHandshake className="mr-2 h-5 w-5" />
                  尋求支持
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                三大核心功能
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                從舉報到復原，我們提供全方位的支持
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FadeIn delay={0.2} direction="up" className="h-full">
              <Link href="/report" className="block h-full">
                <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl bg-gradient-to-br from-blue-50/50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-400/70 cursor-pointer">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Decorative Circle */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  <CardHeader className="items-center text-center pb-4 relative z-10">
                    {/* Icon Box with Title */}
                    <div className="mb-6 w-full p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 group-hover:scale-105 transition-all duration-500 shadow-lg">
                      <MessageCircle className="h-10 w-10 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">AI 智慧舉報</h3>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      透過對話式引導，輕鬆完成舉報，AI 協助分析內容，快速分類處理。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-8 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>支援截圖上傳</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>自動摘要避免創傷</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>

            <FadeIn delay={0.4} direction="up" className="h-full">
              <Link href="/support" className="block h-full">
                <Card className="group relative overflow-hidden border-2 border-pink-200/50 dark:border-pink-800/50 shadow-xl bg-gradient-to-br from-pink-50/50 via-background to-background dark:from-pink-950/20 dark:via-background dark:to-background h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-pink-400/70 cursor-pointer">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Decorative Circle */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  <CardHeader className="items-center text-center pb-4 relative z-10">
                    {/* Icon Box with Title */}
                    <div className="mb-6 w-full p-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 group-hover:scale-105 transition-all duration-500 shadow-lg">
                      <HeartHandshake className="h-10 w-10 mx-auto mb-3 text-pink-600 dark:text-pink-400" />
                      <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400">心理支持</h3>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      提供即時的情緒緩解工具與專業諮詢資源，陪伴你走過低谷。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-8 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-pink-500" />
                        <span>呼吸練習與情緒日記</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-pink-500" />
                        <span>心理健康自我評估</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>

            <FadeIn delay={0.6} direction="up" className="h-full">
              <Link href="/legal" className="block h-full">
                <Card className="group relative overflow-hidden border-2 border-amber-200/50 dark:border-amber-800/50 shadow-xl bg-gradient-to-br from-amber-50/50 via-background to-background dark:from-amber-950/20 dark:via-background dark:to-background h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-amber-400/70 cursor-pointer">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Decorative Circle */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  <CardHeader className="items-center text-center pb-4 relative z-10">
                    {/* Icon Box with Title */}
                    <div className="mb-6 w-full p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 group-hover:scale-105 transition-all duration-500 shadow-lg">
                      <Scale className="h-10 w-10 mx-auto mb-3 text-amber-600 dark:text-amber-400" />
                      <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">法律與教育</h3>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      整合法律諮詢管道與校園宣導教材，從根源解決問題。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-8 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>法律名詞白話解釋</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>存證信函自動生成</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <ProcessFlow />

      {/* Impact Stats */}
      <ImpactStats />

      {/* Interactive Text Detox */}
      <TextDetoxWidget />

      {/* FAQ Section */}
      <FAQSection />

      {/* Trust Badges */}
      <TrustBadges />
    </div>
  )
}
