"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/motion"
import { Send, Heart, MessageCircle, Users } from "lucide-react"

type Post = {
    id: string
    author: string
    avatar: string
    content: string
    likes: number
    comments: number
    tags: string[]
    time: string
}

export default function PeerSupportPage() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: "1",
            author: "暖心小熊",
            avatar: "/avatars/bear.png",
            content: "今天在學校被同學排擠，覺得很難過...但來到這裡看到大家互相打氣，覺得好多了。謝謝你們。",
            likes: 12,
            comments: 5,
            tags: ["#校園生活", "#心情抒發"],
            time: "10 分鐘前"
        },
        {
            id: "2",
            author: "匿名樹洞",
            avatar: "/avatars/tree.png",
            content: "有些人講話真的很傷人，但我決定不再讓他們影響我的心情。我要為自己而活！💪",
            likes: 24,
            comments: 8,
            tags: ["#正能量", "#自我成長"],
            time: "1 小時前"
        },
        {
            id: "3",
            author: "星星",
            avatar: "/avatars/star.png",
            content: "如果有人現在覺得很孤單，請記得這世界上還有人在乎你。我們一起加油！",
            likes: 45,
            comments: 12,
            tags: ["#陪伴", "#溫暖"],
            time: "3 小時前"
        }
    ])
    const [newPost, setNewPost] = useState("")

    const handlePost = () => {
        if (!newPost.trim()) return

        const post: Post = {
            id: Date.now().toString(),
            author: "我",
            avatar: "", // Default avatar
            content: newPost,
            likes: 0,
            comments: 0,
            tags: ["#心情"],
            time: "剛剛"
        }

        setPosts([post, ...posts])
        setNewPost("")
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <FadeIn>
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Users className="h-10 w-10 text-primary" />
                        匿名同儕互助圈
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        這裡是一個安全、溫暖的空間。你可以匿名分享心情，也可以為他人加油打氣。
                        我們相信，陪伴是最好的療癒。
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Sidebar / Guidelines */}
                    <div className="md:col-span-1 space-y-6">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">社群守則</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p>1. 保持友善與尊重</p>
                                <p>2. 不洩露個人隱私</p>
                                <p>3. 禁止攻擊或霸凌言論</p>
                                <p>4. 給予支持而非批判</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">熱門標籤</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#心情抒發</Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#求助</Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#正能量</Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#校園</Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#職場</Badge>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Feed */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Post Input */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarFallback>Me</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-4">
                                        <Input
                                            placeholder="分享你的心情或是給予鼓勵..."
                                            value={newPost}
                                            onChange={(e) => setNewPost(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handlePost()}
                                        />
                                        <div className="flex justify-end">
                                            <Button onClick={handlePost} disabled={!newPost.trim()}>
                                                <Send className="mr-2 h-4 w-4" />
                                                發佈
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Posts List */}
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <Card key={post.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={post.avatar} />
                                                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{post.author}</p>
                                                    <p className="text-xs text-muted-foreground">{post.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {post.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-3">
                                        <p className="text-sm leading-relaxed">{post.content}</p>
                                    </CardContent>
                                    <CardFooter className="border-t pt-3">
                                        <div className="flex gap-4 w-full">
                                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                                                <Heart className="mr-2 h-4 w-4" />
                                                {post.likes}
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                {post.comments}
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}
