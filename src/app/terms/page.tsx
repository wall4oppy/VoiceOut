import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
    return (
        <div className="container max-w-3xl py-12 md:py-20 mx-auto">
            <div className="space-y-6">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">服務條款</h1>
                    <p className="text-muted-foreground">
                        最後更新日期：2025 年 1 月 1 日
                    </p>
                </div>

                <Separator className="my-8" />

                <div className="space-y-8 text-foreground/90 leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">1. 同意條款</h2>
                        <p>
                            歡迎使用 VoiceOut（以下簡稱「本平台」）。本平台致力於提供一個安全、匿名的網路霸凌舉報與支援環境。
                            當您訪問或使用本平台時，即表示您已閱讀、瞭解並同意遵守本服務條款（以下簡稱「本條款」）。
                            如果您不同意本條款的任何部分，請立即停止使用本平台。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">2. 服務說明</h2>
                        <p>
                            VoiceOut 提供線上舉報、匿名社群討論、心理資源媒合及相關教育內容。
                            本平台旨在協助使用者對抗網路霸凌，但我們並非執法機關或緊急救援單位。
                            若您或他人面臨立即的人身安全危險，請務必直接撥打當地緊急救助電話（如 110 或 119）。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">3. 使用者規範</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>真實性原則：</strong> 您承諾在舉報時提供的資訊皆為真實，絕不進行惡意捏造或濫用舉報功能來騷擾他人。</li>
                            <li><strong>尊重社群：</strong> 在匿名社群或討論區中，禁止散布仇恨言論、歧視性內容、暴力威脅或任何形式的騷擾。</li>
                            <li><strong>禁止違法：</strong> 不得利用本平台進行任何違反中華民國法律的行為。</li>
                            <li><strong>帳號安全：</strong> 若您註冊了帳號，您有責任維護您的帳號密碼安全，並對該帳號下的所有活動負責。</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">4. 匿名與隱私保護</h2>
                        <p>
                            我們高度重視您的隱私。本平台提供「匿名舉報」功能，您的身份資訊將受到嚴格保護。
                            關於我們如何收集、使用與保護您的個人資料，請參閱我們的
                            <a href="/privacy" className="text-primary hover:underline mx-1">隱私政策</a>。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">5. 免責聲明</h2>
                        <p>
                            本平台所提供的心理支持建議與法律資訊僅供參考，並無法取代專業心理師或律師的正式諮詢。
                            VoiceOut 不對使用者在平台外的行為或因使用本平台資訊而產生的後果負責。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">6. 條款修改</h2>
                        <p>
                            VoiceOut 保留隨時修改本條款的權利。修改後的條款將公佈於本頁面，恕不另行個別通知。
                            建議您定期查看本頁面以確保瞭解最新的服務規範。
                        </p>
                    </section>

                    <Separator className="my-8" />

                    <div className="bg-muted/30 p-6 rounded-lg text-sm text-muted-foreground">
                        <p>
                            若您對本服務條款有任何疑問，歡迎透過 <a href="mailto:support@voiceout.site" className="text-primary hover:underline">support@voiceout.site</a> 與我們聯繫。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
