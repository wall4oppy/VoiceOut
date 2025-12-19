"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Flag, Ban, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

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
    mood?: string
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
            author: "我",
            content: newComment,
            time: "剛剛"
        }

        setComments([...comments, comment])
        setNewComment("")
        toast.success("留言已發佈")
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`https://voiceout.app/post/${post.id}`)
        toast.success("連結已複製")
    }

    const handleReport = () => toast.success("已收到您的檢舉")
    const handleBlock = () => toast.success(`已封鎖 ${post.author}`)

    return (
        <article className="p-4 border-b border-border/40 hover:bg-muted/5 transition-colors animate-in fade-in duration-500">
            <div className="flex gap-4">
                {/* Left: Avatar */}
                <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-background shadow-sm mt-1">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">{post.author[0]}</AvatarFallback>
                    </Avatar>
                </div>

                {/* Right: Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-base text-foreground hover:underline cursor-pointer">
                                {post.author}
                            </span>
                            {post.mood && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10 font-medium">
                                    {post.mood}
                                </span>
                            )}
                            <span className="text-sm text-muted-foreground">·</span>
                            <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
                                {post.time}
                            </span>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground rounded-full">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleReport} className="text-destructive focus:text-destructive">
                                    <Flag className="mr-2 h-4 w-4" /> 檢舉貼文
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleBlock}>
                                    <Ban className="mr-2 h-4 w-4" /> 封鎖用戶
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Body */}
                    <div className="space-y-3">
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-foreground/90">
                            {post.content}
                        </p>

                        {post.image && (
                            <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt="Post content"
                                    className="w-full h-auto max-h-[500px] object-cover hover:brightness-95 transition-all"
                                />
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-primary text-sm hover:underline cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 -ml-2 max-w-md">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "rounded-full hover:bg-pink-50 hover:text-pink-500 gap-2 px-3 transition-all",
                                isLiked ? "text-pink-500" : "text-muted-foreground"
                            )}
                            onClick={handleLike}
                        >
                            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                            <span className="text-xs">{likeCount || ""}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full hover:bg-blue-50 hover:text-blue-500 gap-2 px-3 text-muted-foreground transition-all"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-xs">{comments.length || ""}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full hover:bg-green-50 hover:text-green-500 gap-2 px-3 text-muted-foreground transition-all"
                            onClick={handleShare}
                        >
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Comments Section */}
                    {showComments && (
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                            {comments.map(comment => (
                                <div key={comment.id} className="flex gap-3 text-sm animate-in fade-in slide-in-from-top-1">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-[10px]">{comment.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 bg-muted/30 p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-xs">{comment.author}</span>
                                            <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                                        </div>
                                        <p className="text-foreground/80">{comment.content}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="flex gap-3 items-center pt-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/5 text-primary text-xs">我</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                    <Input
                                        placeholder="發佈你的回應..."
                                        className="pr-10 h-10 rounded-full bg-muted/30 border-transparent focus-visible:bg-background focus-visible:border-primary/30"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleComment()}
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-1 top-1 h-8 w-8 rounded-full text-primary hover:bg-primary/10"
                                        onClick={handleComment}
                                        disabled={!newComment.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}
