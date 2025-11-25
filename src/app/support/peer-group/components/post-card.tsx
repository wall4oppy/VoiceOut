"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Flag, Ban, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export interface Comment {
    id: string
    author: string
    content: string
    time: string
}

export interface PostProps {
    id: string
    author: string
    avatar?: string
    content: string
    image?: string
    likes: number
    comments: Comment[]
    tags: string[]
    time: string
}

export function PostCard({ post }: { post: PostProps }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likes)
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState<Comment[]>(post.comments)

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(prev => prev - 1)
        } else {
            setLikeCount(prev => prev + 1)
        }
        setIsLiked(!isLiked)
    }

    const handleComment = () => {
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Date.now().toString(),
            author: "我", // In a real app, this would be the current user
            content: newComment,
            time: "剛剛"
        }

        setComments([...comments, comment])
        setNewComment("")
        toast.success("留言已發佈")
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`https://voiceout.app/post/${post.id}`)
        toast.success("連結已複製", {
            description: "你可以將此連結分享給朋友",
            icon: <LinkIcon className="h-4 w-4" />,
        })
    }

    const handleReport = () => {
        toast.success("已收到您的檢舉", {
            description: "我們會盡快審核此內容",
        })
    }

    const handleBlock = () => {
        toast.success(`已封鎖 ${post.author}`, {
            description: "您將不再看到此用戶的內容",
        })
    }

    return (
        <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group bg-background/80 backdrop-blur-sm hover:bg-background/95 ring-1 ring-border/50 hover:ring-primary/20">
            <CardHeader className="flex flex-row items-start justify-between p-5 pb-2">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-11 w-11 border-2 border-background shadow-sm transition-transform group-hover:scale-105">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-[15px] text-foreground/90 hover:text-primary transition-colors cursor-pointer">{post.author}</span>
                        <span className="text-xs text-muted-foreground font-medium">{post.time}</span>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={handleReport} className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
                            <Flag className="mr-2 h-4 w-4" />
                            檢舉貼文
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleBlock} className="cursor-pointer">
                            <Ban className="mr-2 h-4 w-4" />
                            封鎖用戶
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
                <p className="whitespace-pre-wrap text-[15px] leading-7 text-foreground/80 font-normal tracking-wide">
                    {post.content}
                </p>

                {post.image && (
                    <div className="rounded-2xl overflow-hidden border bg-muted/30 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-auto object-cover max-h-[500px] hover:scale-[1.02] transition-transform duration-700 ease-out"
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs font-medium text-primary/70 hover:text-primary hover:bg-primary/10 cursor-pointer transition-all bg-muted/50 px-2.5 py-1 rounded-full border border-transparent hover:border-primary/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-0 flex flex-col bg-gradient-to-b from-transparent to-muted/20">
                <div className="px-5 py-3 w-full flex items-center justify-between border-t border-border/40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className={cn(
                                "flex items-center gap-2 text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-red-50 active:scale-95 group/like",
                                isLiked ? "text-red-500 font-semibold bg-red-50" : "text-muted-foreground hover:text-red-500"
                            )}
                        >
                            <Heart className={cn("h-5 w-5 transition-transform group-active/like:scale-125", isLiked && "fill-current")} />
                            <span>{likeCount}</span>
                        </button>

                        <button
                            onClick={() => setShowComments(!showComments)}
                            className={cn(
                                "flex items-center gap-2 text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50 active:scale-95 group/comment",
                                showComments ? "text-blue-500 font-semibold bg-blue-50" : "text-muted-foreground hover:text-blue-500"
                            )}
                        >
                            <MessageCircle className="h-5 w-5 transition-transform group-active/comment:scale-110" />
                            <span>{comments.length}</span>
                        </button>
                    </div>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
                    >
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>

                {showComments && (
                    <div className="w-full bg-muted/30 p-5 space-y-5 animate-in slide-in-from-top-2 duration-300 border-t border-border/50">
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {comments.map(comment => (
                                <div key={comment.id} className="flex gap-3 text-sm group/comment animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <Avatar className="h-8 w-8 mt-1 border border-border/50">
                                        <AvatarFallback className="text-xs">{comment.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="bg-background p-3.5 rounded-2xl rounded-tl-none border shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-baseline mb-1.5">
                                                <span className="font-semibold text-xs text-foreground/90">{comment.author}</span>
                                                <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                                            </div>
                                            <p className="text-foreground/80 leading-relaxed">{comment.content}</p>
                                        </div>
                                        <div className="flex gap-3 mt-1.5 ml-2 opacity-0 group-hover/comment:opacity-100 transition-opacity duration-200">
                                            <button className="text-[10px] text-muted-foreground hover:text-foreground font-medium transition-colors">回覆</button>
                                            <button className="text-[10px] text-muted-foreground hover:text-red-500 font-medium transition-colors">讚</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 items-center pt-2 sticky bottom-0">
                            <Avatar className="h-9 w-9 border border-border/50">
                                <AvatarFallback className="bg-primary/5 text-primary">我</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 relative group/input">
                                <Input
                                    placeholder="寫下你的溫暖留言..."
                                    className="pr-12 h-11 rounded-full bg-background border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all shadow-sm group-hover/input:shadow-md"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleComment()}
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={cn(
                                        "absolute right-1 top-1 h-9 w-9 rounded-full transition-all duration-200",
                                        newComment.trim()
                                            ? "text-primary hover:bg-primary/10 hover:scale-110"
                                            : "text-muted-foreground/30"
                                    )}
                                    onClick={handleComment}
                                    disabled={!newComment.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
