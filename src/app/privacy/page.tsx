import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
    return (
        <div className="container max-w-3xl py-12 md:py-20 mx-auto">
            <div className="space-y-6">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">隱私政策</h1>
                    <p className="text-muted-foreground">
                        最後更新日期：2025 年 1 月 1 日
                    </p>
                </div>

                <Separator className="my-8" />

                <div className="space-y-8 text-foreground/90 leading-relaxed">
                    <section className="space-y-4">
                        <p className="text-lg font-medium text-foreground">
                            VoiceOut（以下簡稱「我們」）致力於保護您的隱私。本政策旨在說明我們如何收集、使用及保護您的個人資訊，特別是在您使用我們的匿名舉報與社群功能時。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">1. 我們收集的資訊</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>主動提供的資訊：</strong> 當您註冊帳號、填寫舉報單、或聯絡我們時，您可能提供的電子郵件、姓名或案件細節。</li>
                            <li><strong>自動收集的資訊：</strong> 為了維護系統安全與分析服務品質，我們可能會收集 IP 位址、瀏覽器類型、裝置資訊等技術數據。</li>
                            <li><strong>Cookie：</strong> 我們使用必要的 Cookie 來維持您的登入狀態與偏好設定。</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">2. 資訊使用方式</h2>
                        <p>我們收集的資訊主要用於：</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>驗證用戶身份並提供舉報追蹤服務。</li>
                            <li>協助學校、心理師或法律顧問處理霸凌案件（僅限您授權的範圍）。</li>
                            <li>改善平台功能與使用者體驗。</li>
                            <li>發送重要的系統通知或安全警報。</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">3. 匿名與資料揭露</h2>
                        <p>
                            <strong>您的匿名性是我們的首要考量。</strong> 除非發生以下情況，我們絕不會將您的個人識別資料透露給第三方：
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>您的明確同意：</strong> 例如您勾選同意將案件轉介給學校輔導室。</li>
                            <li><strong>法律要求：</strong> 當司法機關依法定程序要求提供特定資料時。</li>
                            <li><strong>生命安全威脅：</strong> 若我們有正當理由相信披露資料對於防止使用者的生命、身體受立即危害是必要的。</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">4. 資料安全</h2>
                        <p>
                            我們採用業界標準的加密技術（如 SSL/TLS）來傳輸您的數據，並嚴格限制內部人員對敏感情資的存取權限。
                            然而，網際網路傳輸無法保證 100% 安全，我們會盡最大努力保護您的資料，但也請您注意自身帳號安全。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">5. 您對資料的權利</h2>
                        <p>
                            您可以隨時登入帳號查看、修改或刪除您的個人資訊。
                            若您希望能完全刪除您的帳號與所有相關數據，請透過聯絡管道與我們聯繫，我們將協助處理。
                        </p>
                    </section>

                    <Separator className="my-8" />

                    <div className="bg-muted/30 p-6 rounded-lg text-sm text-muted-foreground">
                        <p>
                            若您對本隱私政策有任何疑慮，請聯繫我們的隱私保護官：<a href="mailto:privacy@voiceout.site" className="text-primary hover:underline">privacy@voiceout.site</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
