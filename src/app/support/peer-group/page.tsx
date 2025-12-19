"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/motion"
import { Users, TrendingUp, Shield, Sparkles } from "lucide-react"
import { PostCard, PostProps } from "./components/post-card"
import { CreatePost } from "./components/create-post"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function PeerSupportPage() {
    const [posts, setPosts] = useState<PostProps[]>([
        {
            id: "1",
            author: "暖心小熊",
            avatar: "/avatars/bear.png",
            content: "今天在學校被同學排擠，覺得很難過...但來到這裡看到大家互相打氣，覺得好多了。謝謝你們。",
            likes: 12,
            comments: [
                { id: "c1", author: "路人甲", content: "加油！我們都在這裡陪你", time: "5 分鐘前" },
                { id: "c2", author: "星星", content: "不要理會那些人，你很棒！", time: "2 分鐘前" }
            ],
            tags: ["#校園生活", "#心情抒發"],
            mood: "😢 難過",
            time: "10 分鐘前"
        },
        {
            id: "2",
            author: "匿名樹洞",
            avatar: "/avatars/tree.png",
            content: "有些人講話真的很傷人，但我決定不再讓他們影響我的心情。我要為自己而活！💪\n\n這是我今天拍的天空，分享給大家。",
            image: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2574&auto=format&fit=crop",
            likes: 24,
            comments: [],
            tags: ["#正能量", "#自我成長"],
            mood: "💪 堅強",
            time: "1 小時前"
        },
        {
            id: "3",
            author: "星星",
            avatar: "/avatars/star.png",
            content: "如果有人現在覺得很孤單，請記得這世界上還有人在乎你。我們一起加油！",
            likes: 45,
            comments: [],
            tags: ["#陪伴", "#溫暖"],
            mood: "😊 開心",
            time: "3 小時前"
        }
    ])

    const handleNewPost = (content: string, tags: string[], image?: string, mood?: string) => {
        const post: PostProps = {
            id: Date.now().toString(),
            author: "我",
            content: content,
            image: image,
            likes: 0,
            comments: [],
            tags: tags.length > 0 ? tags : ["#心情"],
            mood: mood,
            time: "剛剛"
        }
        setPosts([post, ...posts])
    }

    const hotTopics = [
        { tag: "#心情抒發", count: 128, color: "bg-pink-100 text-pink-700" },
        { tag: "#求助", count: 85, color: "bg-blue-100 text-blue-700" },
        { tag: "#正能量", count: 64, color: "bg-yellow-100 text-yellow-700" },
        { tag: "#校園霸凌", count: 42, color: "bg-red-100 text-red-700" },
        { tag: "#職場甘苦", count: 36, color: "bg-purple-100 text-purple-700" },
    ]

    return (
        <div className="min-h-screen bg-muted/10 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <FadeIn>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Sidebar - Navigation & Info (Hidden on mobile) */}
                        <div className="hidden lg:block lg:col-span-3 space-y-6">
                            <Card className="border-none shadow-sm sticky top-24 bg-background/60 backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl text-primary">
                                        <Users className="h-6 w-6" />
                                        匿名社群
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-muted-foreground">
                                    <p>
                                        這裡是一個安全、溫暖的空間。你可以匿名分享心情，也可以為他人加油打氣。
                                    </p>
                                    <div className="pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-2 mb-2 font-medium text-foreground">
                                            <Shield className="h-4 w-4" />
                                            社群守則
                                        </div>
                                        <ul className="space-y-2 pl-1">
                                            <li>• 保持友善與尊重</li>
                                            <li>• 不洩露個人隱私</li>
                                            <li>• 禁止攻擊言論</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Feed */}
                        <div className="lg:col-span-6 space-y-6">
                            {/* Mobile Header */}
                            <div className="lg:hidden mb-6">
                                <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
                                    <Users className="h-6 w-6 text-primary" />
                                    匿名社群
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    分享心情，溫暖彼此
                                </p>
                            </div>

                            {/* Create Post */}
                            <CreatePost onPost={handleNewPost} />

                            {/* Filters & Scroll */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">探索話題</h3>
                                    <div className="flex gap-2">
                                        {["推薦", "最新", "熱門"].map((filter, i) => (
                                            <button
                                                key={filter}
                                                className={`px-3 py-1 text-sm rounded-full transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <ScrollArea className="w-full whitespace-nowrap pb-2">
                                    <div className="flex w-max space-x-3 p-1">
                                        {hotTopics.map((topic) => (
                                            <div
                                                key={topic.tag}
                                                className={`px-4 py-2 rounded-full cursor-pointer transition-all hover:scale-105 shadow-sm text-sm font-medium flex items-center gap-2 ${topic.color}`}
                                            >
                                                {topic.tag}
                                                <span className="opacity-60 text-xs bg-black/5 px-1.5 py-0.5 rounded-full">{topic.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="hidden" />
                                </ScrollArea>
                            </div>

                            {/* Posts List */}
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar - Trending (Hidden on mobile) */}
                        <div className="hidden lg:block lg:col-span-3 space-y-6">
                            <Card className="border-none shadow-sm sticky top-24 bg-background/60 backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <TrendingUp className="h-5 w-5 text-orange-500" />
                                        熱門話題
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {hotTopics.map((topic, index) => (
                                            <div key={topic.tag} className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full ${index < 3 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{topic.tag}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Sparkles className="h-3 w-3" />
                                                    {topic.count}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </FadeIn>
            </div >
        </div >
    )
}


