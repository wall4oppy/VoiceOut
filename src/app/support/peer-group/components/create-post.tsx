"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Smile, Hash, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

interface CreatePostProps {
    onPost: (content: string, tags: string[], image?: string, mood?: string) => void
}

export function CreatePost({ onPost }: CreatePostProps) {
    const [content, setContent] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedMood, setSelectedMood] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const moods = [
        { icon: "😊", label: "開心" },
        { icon: "😢", label: "難過" },
        { icon: "😡", label: "生氣" },
        { icon: "😨", label: "焦慮" },
        { icon: "😐", label: "平靜" },
        { icon: "💪", label: "堅強" },
    ]

    const handleSubmit = () => {
        if (!content.trim() && !selectedImage) return
        const tags = content.match(/#[\w\u4e00-\u9fa5]+/g) || []
        onPost(content, tags, selectedImage || undefined, selectedMood || undefined)
        setContent("")
        setSelectedImage(null)
        setSelectedMood(null)
        setIsExpanded(false)
        toast.success("貼文已發佈")
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setSelectedImage(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const insertEmoji = (emoji: string) => setContent(prev => prev + emoji)
    const insertHashtag = () => setContent(prev => prev + " #")
    const commonEmojis = ["😊", "😂", "🥰", "🥺", "😭", "😡", "👍", "💪", "🙏", "❤️"]

    return (
        <div className="p-4 border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-14 z-20">
            <div className="flex gap-4">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground">我</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                    <div className="relative">
                        <Textarea
                            placeholder="發生了什麼事？分享一下心情吧..."
                            className="min-h-[50px] resize-none border-none focus-visible:ring-0 p-0 text-lg bg-transparent placeholder:text-muted-foreground/60"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                        />

                        {selectedImage && (
                            <div className="relative mt-3 inline-block group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={selectedImage} alt="Selected" className="h-40 w-auto rounded-xl object-cover border shadow-sm" />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-2 -right-2 bg-background border rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}

                        {selectedMood && (
                            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full animate-in zoom-in-50">
                                <span>{selectedMood}</span>
                                <button onClick={() => setSelectedMood(null)} className="hover:text-primary/70">
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    {isExpanded && (
                        <div className="space-y-4 pt-2 border-t border-border/40 animate-in fade-in slide-in-from-top-2">
                            {/* Mood Selector */}
                            {!selectedMood && (
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap mr-1">心情:</span>
                                    {moods.map(m => (
                                        <button
                                            key={m.label}
                                            onClick={() => setSelectedMood(`${m.icon} ${m.label}`)}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
                                        >
                                            <span className="text-sm">{m.icon}</span> {m.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Toolbar */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-0.5 text-primary">
                                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
                                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full" onClick={() => fileInputRef.current?.click()}>
                                        <ImageIcon className="h-5 w-5" />
                                    </Button>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full">
                                                <Smile className="h-5 w-5" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2" align="start">
                                            <div className="flex gap-2">
                                                {commonEmojis.map(emoji => (
                                                    <button key={emoji} onClick={() => insertEmoji(emoji)} className="text-xl hover:scale-125 transition-transform p-1">
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full" onClick={insertHashtag}>
                                        <Hash className="h-5 w-5" />
                                    </Button>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={!content.trim() && !selectedImage}
                                    className="rounded-full px-6 font-bold"
                                    size="sm"
                                >
                                    發佈
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
