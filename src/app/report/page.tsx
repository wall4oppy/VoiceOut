import { ReportChatInterface } from "@/components/report-chat-interface"
import { ShieldCheck } from "lucide-react"

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-muted/10 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side - Info (Visible on large screens) */}
                    <div className="hidden lg:flex lg:col-span-4 flex-col justify-center space-y-6 p-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            我們在這裡<br />
                            <span className="text-primary">聆聽您的聲音</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            這是一個安全、保密的空間。
                            <br />
                            無論發生了什麼，我們都願意協助您。
                            我們的 AI 助手會一步步引導您完成舉報流程。
                        </p>
                        <div className="pt-8 border-t border-slate-200/60">
                            <p className="text-sm text-slate-500 font-medium mb-2">您的權益保障</p>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    全程匿名加密
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    24小時 AI 協助
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    專業團隊後續追蹤
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Chat Interface */}
                    <div className="col-span-1 lg:col-span-8">
                        <ReportChatInterface />
                    </div>
                </div>
            </div>
        </div>
    )
}
