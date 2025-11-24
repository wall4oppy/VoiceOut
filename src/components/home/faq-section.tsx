"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from "@/components/ui/motion"

const faqs = [
    {
        question: "截圖可以當證據嗎？",
        answer: "可以！請務必保留完整截圖（包含對話內容、時間、對方帳號資訊、網址 URL）。如果可以，建議使用螢幕錄影功能，更能證明內容的真實性與完整性。",
    },
    {
        question: "檢舉會被對方發現嗎？",
        answer: "不會。在 VoiceOut 平台上的檢舉是完全保密的。除非進入司法程序且您同意公開身份，否則對方不會知道檢舉人是誰。",
    },
    {
        question: "我只是目擊者可以檢舉嗎？",
        answer: "當然可以！旁觀者的挺身而出往往是阻止霸凌的關鍵。您可以選擇匿名檢舉，我們會根據您提供的資訊進行查證與協助。",
    },
    {
        question: "如果我還沒準備好檢舉，可以先聊聊嗎？",
        answer: "沒問題。您可以先使用我們的「心理支持」功能，與 AI 諮詢師對話，或是查看相關文章。我們隨時在這裡，等您準備好。",
    },
]

export function FAQSection() {
    return (
        <section className="w-full py-12 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            常見問題
                        </h2>
                        <p className="text-muted-foreground">
                            有些疑問？這裡可能有您需要的答案。
                        </p>
                    </FadeIn>
                </div>

                <FadeIn delay={0.2}>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-medium">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </FadeIn>
            </div>
        </section>
    )
}
