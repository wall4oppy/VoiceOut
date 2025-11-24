"use client"

import { FadeIn, StaggerText } from "@/components/ui/motion"
import { LegalTermCard } from "@/components/legal/legal-term-card"
import { EvidenceChecklist } from "@/components/legal/evidence-checklist"
import { LetterGenerator } from "@/components/legal/letter-generator"
import { CaseAssessment } from "@/components/legal/case-assessment"
import { ConsultationForm } from "@/components/legal/consultation-form"
import { Scale, Shield, FileText, Brain, Calendar, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const legalTerms = [
    {
        term: "公然侮辱罪",
        definition: "在大家聽得到或看得到的地方，用言語、文字或動作侮辱他人。",
        example: "在遊戲大廳罵人「垃圾」、在 IG 留言區罵「綠茶婊」、在 Discord 公開頻道嘲諷他人。",
        penalty: "拘役（1-60日）或新台幣 9,000 元以下罰金。",
        color: "blue",
    },
    {
        term: "誹謗罪",
        definition: "散布不實的言論，損害他人名譽。",
        example: "在社群媒體上謠傳「某某偷東西」、「某某劈腿」等未經證實的消息。",
        penalty: "1 年以下有期徒刑、拘役或新台幣 15 萬元以下罰金。",
        color: "red",
    },
    {
        term: "恐嚇危害安全罪",
        definition: "以加害生命、身體、自由、名譽、財產之事恐嚇他人，使人心生畏懼。",
        example: "傳訊息說「我要殺了你」、「小心你家人」、「我知道你住哪」。",
        penalty: "2 年以下有期徒刑、拘役或新台幣 9,000 元以下罰金。",
        color: "amber",
    },
    {
        term: "散布猥褻物品罪",
        definition: "未經同意散布他人私密照片或影片。",
        example: "將前任的私密照傳到群組、把偷拍的照片上傳到網路。",
        penalty: "2 年以下有期徒刑、拘役或新台幣 3 萬元以下罰金。可能另涉及性侵害犯罪防治法。",
        color: "purple",
    },
]

export default function LegalPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20 dark:to-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                            <Scale className="w-6 h-6 fill-current" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                            <StaggerText text="知識就是你的盾牌" className="justify-center" />
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            了解法律權益，掌握蒐證技巧。我們提供實用的法律知識與教育資源，讓你懂得保護自己。
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Legal Q&A (Moved from Education) */}
            <section className="w-full py-12 bg-background">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Shield className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">法律權益百科</h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="item-1" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-lg font-medium">網路霸凌涉及哪些法律責任？</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                                網路霸凌可能涉及刑法上的「公然侮辱罪」（第309條）、「誹謗罪」（第310條）、「恐嚇危害安全罪」（第305條）。若涉及散布私密影像，則可能觸犯「妨害秘密罪」及性侵害犯罪防治法相關規定。民事部分，受害者可請求損害賠償與精神撫慰金。
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-lg font-medium">如何進行有效蒐證？</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                                1. <strong>完整截圖</strong>：包含對話內容、發文時間、對方帳號名稱、網址（URL）。<br />
                                2. <strong>螢幕錄影</strong>：滑動頁面錄製完整對話串，證明內容未經變造。<br />
                                3. <strong>保留原始檔案</strong>：不要刪除原始訊息或貼文。<br />
                                4. <strong>公證</strong>：若情況嚴重，可請公證人進行網頁公證，增加證據力。
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border rounded-lg px-4">
                            <AccordionTrigger className="text-lg font-medium">未成年人被告會怎麼樣？</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                                未滿18歲之行為人，適用《少年事件處理法》。由少年法庭法官審理，依情節輕重可能裁定訓誡、保護管束、安置輔導或感化教育。目的是為了矯正行為而非單純懲罰。
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* Legal Terms Cards */}
            <section className="w-full py-12 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <Shield className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">這算犯法嗎？法律名詞翻譯蒟蒻</h2>
                    </div>
                    <p className="text-muted-foreground mb-8">點擊卡片查看詳細說明</p>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {legalTerms.map((term, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <LegalTermCard {...term} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Section with Tabs */}
            <section className="w-full py-12 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-4 mb-8 text-center justify-center">
                        <FileText className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">我該怎麼做？實用工具箱</h2>
                    </div>

                    <Tabs defaultValue="checklist" className="w-full">
                        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
                            <TabsTrigger value="checklist">蒐證檢核</TabsTrigger>
                            <TabsTrigger value="letter">存證信函</TabsTrigger>
                            <TabsTrigger value="assessment">AI 評估</TabsTrigger>
                        </TabsList>

                        <TabsContent value="checklist" className="mt-8">
                            <EvidenceChecklist />
                        </TabsContent>

                        <TabsContent value="letter" className="mt-8">
                            <LetterGenerator />
                        </TabsContent>

                        <TabsContent value="assessment" className="mt-8">
                            <CaseAssessment />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Consultation Section */}
            <section className="w-full py-12 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-4 mb-8 text-center justify-center">
                        <Calendar className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold">需要專家協助？</h2>
                    </div>
                    <ConsultationForm />
                </div>
            </section>

            {/* Disclaimer */}
            <section className="w-full py-8 bg-amber-50 dark:bg-amber-950/20 border-t border-amber-200 dark:border-amber-800">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-start gap-4 max-w-4xl mx-auto">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div className="space-y-2 text-sm text-amber-900 dark:text-amber-200">
                            <p className="font-bold">免責聲明</p>
                            <p>
                                本平台提供之資訊僅供參考，不構成正式法律意見。實際法律問題應諮詢專業律師。
                                若涉及緊急情況或人身安全，請立即撥打 110 或相關專線求助。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
