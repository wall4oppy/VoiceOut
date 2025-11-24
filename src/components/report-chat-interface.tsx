"use client"

import * as React from "react"
import { Send, Paperclip, Loader2, X, ScanText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
    id: string
    role: "ai" | "user"
    content: string
    attachments?: { name: string; size: number }[]
}

type ReportingStep = "init" | "platform" | "incident" | "evidence" | "contact" | "summary" | "done"

export function ReportChatInterface() {
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: "welcome",
            role: "ai",
            content: "您好，我是 VoiceOut 的舉報助手。很遺憾您遇到了不愉快的事情。請問您今天想尋求什麼樣的協助？（例如：我想檢舉網路霸凌、我需要心理諮詢、或是我只是想記錄下來）",
        },
    ])
    const [inputValue, setInputValue] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [step, setStep] = React.useState<ReportingStep>("init")
    const [attachedFiles, setAttachedFiles] = React.useState<File[]>([])
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // Auto-scroll to bottom
    React.useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setAttachedFiles(prev => [...prev, ...files])
    }

    const handleRemoveFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleAnalyzeImage = (file: File) => {
        setIsLoading(true)
        // Mock OCR Process
        setTimeout(() => {
            const mockOcrText = "偵測到圖片文字：\n「你這個笨蛋，滾出我們的圈子！」\n\nAI 分析：包含攻擊性語言（笨蛋、滾），建議作為霸凌證據。"

            const aiMsg: Message = {
                id: Date.now().toString(),
                role: "ai",
                content: `針對圖片 ${file.name} 的分析結果：\n${mockOcrText}`,
            }
            setMessages(prev => [...prev, aiMsg])
            setIsLoading(false)
        }, 2000)
    }

    const handleSendMessage = async () => {
        if (!inputValue.trim() && attachedFiles.length === 0) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue || "（已上傳附件）",
            attachments: attachedFiles.map(f => ({ name: f.name, size: f.size }))
        }

        setMessages((prev) => [...prev, userMsg])
        setInputValue("")
        setAttachedFiles([])
        setIsLoading(true)

        // Simulate AI delay and logic
        setTimeout(() => {
            let aiResponseContent = ""
            let nextStep = step

            switch (step) {
                case "init":
                    aiResponseContent = "了解。為了協助您，我需要了解一些細節。請問這件事發生在哪個平台上？（例如：Facebook, Instagram, Line, 遊戲...）"
                    nextStep = "platform"
                    break
                case "platform":
                    aiResponseContent = "收到。請問事件大約發生在什麼時候？對方的帳號或暱稱是什麼？"
                    nextStep = "incident"
                    break
                case "incident":
                    aiResponseContent = "好的。請您簡述一下發生的經過，或是對方說了什麼讓您感到不舒服的話？（您可以直接複製貼上對話內容）"
                    nextStep = "evidence"
                    break
                case "evidence":
                    aiResponseContent = "我明白了，這聽起來確實讓人很難受。您手邊有相關的截圖或錄影證據嗎？如果有，請點擊下方的迴紋針圖示上傳。"
                    nextStep = "contact"
                    break
                case "contact":
                    aiResponseContent = "最後，請問您希望我們如何聯繫您？或者您希望保持匿名？（若需後續追蹤，建議留下 Email）"
                    nextStep = "summary"
                    break
                case "summary":
                    aiResponseContent = "感謝您提供的資訊。我已將您的案件整理如下：\n\n[案件摘要]\n平台：(根據前文)\n類型：疑似網路霸凌\n\n我們的人工審核團隊會在 24 小時內檢視此案件。如果您感到情緒不穩，請務必前往「心理支持」專區尋求協助。"
                    nextStep = "done"
                    break
                case "done":
                    aiResponseContent = "還有其他我可以幫您的嗎？"
                    break
                default:
                    aiResponseContent = "抱歉，我好像迷路了。我們可以重新開始嗎？"
                    nextStep = "init"
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponseContent,
            }

            setMessages((prev) => [...prev, aiMsg])
            setStep(nextStep)
            setIsLoading(false)
        }, 1500)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <Card className="w-full h-[600px] flex flex-col shadow-lg">
            <CardHeader className="border-b px-6 py-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">舉報助手</p>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="h-full p-4">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${msg.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {msg.attachments.map((file, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs opacity-90">
                                                    <Paperclip className="h-3 w-3" />
                                                    <span>{file.name}</span>
                                                    <span className="text-xs opacity-70">
                                                        ({(file.size / 1024).toFixed(1)} KB)
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted rounded-lg px-4 py-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4">
                <div className="flex flex-col w-full gap-2">
                    {/* Attached Files Preview */}
                    {attachedFiles.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                                {attachedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-muted rounded-md px-3 py-1.5 text-sm"
                                    >
                                        <Paperclip className="h-3 w-3" />
                                        <span className="max-w-[150px] truncate">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            ({(file.size / 1024).toFixed(1)} KB)
                                        </span>
                                        {file.type.startsWith('image/') && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-5 w-5 ml-1 text-blue-500 hover:text-blue-600"
                                                onClick={() => handleAnalyzeImage(file)}
                                                title="AI 文字辨識"
                                            >
                                                <ScanText className="h-3 w-3" />
                                            </Button>
                                        )}
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="ml-1 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="flex w-full items-center gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*,.pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() => fileInputRef.current?.click()}
                            type="button"
                        >
                            <Paperclip className="h-5 w-5" />
                            <span className="sr-only">Attach file</span>
                        </Button>
                        <Input
                            placeholder="輸入訊息..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={isLoading || (!inputValue.trim() && attachedFiles.length === 0)}
                            size="icon"
                        >
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
