import { ReportChatInterface } from "@/components/report-chat-interface"

export default function ReportPage() {
    return (
        <div className="container mx-auto max-w-4xl py-10 px-4">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold">我要舉報</h1>
                <p className="text-muted-foreground">
                    請告訴我們發生了什麼事。我們的 AI 助手會引導您完成舉報流程。
                    <br />
                    您的所有資訊都將被嚴格保密。
                </p>
            </div>
            <ReportChatInterface />
        </div>
    )
}
