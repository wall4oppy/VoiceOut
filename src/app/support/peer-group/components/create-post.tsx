"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Smile, Hash, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

interface CreatePostProps {
    onPost: (content: string, tags: string[], image?: string) => void
}

export function CreatePost({ onPost }: CreatePostProps) {
    const [content, setContent] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if (!content.trim() && !selectedImage) return

        // Simple tag extraction
        const tags = content.match(/#[\w\u4e00-\u9fa5]+/g) || []

        onPost(content, tags, selectedImage || undefined)
        setContent("")
        setSelectedImage(null)
        setIsExpanded(false)
        toast.success("貼文已發佈")
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const insertEmoji = (emoji: string) => {
        setContent(prev => prev + emoji)
    }

    const insertHashtag = () => {
        setContent(prev => prev + " #")
    }

    const commonEmojis = ["😊", "😂", "🥰", "🥺", "😭", "😡", "👍", "💪", "🙏", "❤️"]

    return (
        <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>我</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                        <div
                            className={`relative transition-all duration-200 ${isExpanded ? 'min-h-[120px]' : 'min-h-[40px]'}`}
                        >
                            <Textarea
                                placeholder="分享你的心情..."
                                className="min-h-[40px] resize-none border-none focus-visible:ring-0 p-2 text-base bg-transparent placeholder:text-muted-foreground/50"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onFocus={() => setIsExpanded(true)}
                            />

                            {selectedImage && (
                                <div className="relative mt-2 inline-block">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="h-32 w-auto rounded-lg object-cover border"
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute -top-2 -right-2 bg-background border rounded-full p-1 shadow-sm hover:bg-muted"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {isExpanded && (
                            <div className="flex items-center justify-between pt-2 border-t animate-in fade-in slide-in-from-top-1">
                                <div className="flex gap-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageSelect}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <ImageIcon className="h-5 w-5" />
                                    </Button>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                                <Smile className="h-5 w-5" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2" align="start">
                                            <div className="flex gap-2">
                                                {commonEmojis.map(emoji => (
                                                    <button
                                                        key={emoji}
                                                        onClick={() => insertEmoji(emoji)}
                                                        className="text-xl hover:scale-125 transition-transform p-1"
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                                        onClick={insertHashtag}
                                    >
                                        <Hash className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!content.trim() && !selectedImage}
                                    className="rounded-full px-6 font-medium"
                                >
                                    發佈
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
