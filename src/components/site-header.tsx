"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, User, Settings, LogOut, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ROLE_METADATA } from "@/lib/roles"
import { Badge } from "@/components/ui/badge"
import { EmergencyHelpDialog } from "@/components/emergency-help-dialog"

export function SiteHeader() {
    const { user, isLoggedIn, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase()
    }

    const getDashboardLink = (role: string) => {
        switch (role) {
            case 'teacher':
                return '/teacher-dashboard'
            case 'psychologist':
                return '/psychologist-workspace'
            case 'lawyer':
                return '/lawyer-workspace'
            case 'admin':
                return '/admin'
            default:
                return '/dashboard'
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-6">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image
                            src="/logo-with-text.png"
                            alt="VoiceOut"
                            width={140}
                            height={40}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/report" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            我要舉報
                        </Link>
                        <Link href="/support" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            心理支持
                        </Link>
                        <Link href="/education" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            教育宣導
                        </Link>
                        <Link href="/legal" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            法律諮詢
                        </Link>
                        {isLoggedIn && user && (
                            <>
                                <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    案件進度
                                </Link>
                                {(user.role === 'admin' || user.role === 'teacher' || user.role === 'psychologist' || user.role === 'lawyer') && (
                                    <Link href={getDashboardLink(user.role)} className="transition-colors hover:text-foreground/80 text-foreground/600 font-semibold">
                                        專業後台
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                            <Menu className="h-7 w-7" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle className="text-left">VoiceOut</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 mt-4 px-4">
                            <SheetClose asChild>
                                <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    首頁
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/report" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    我要舉報
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/support" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    心理支持
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/education" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    教育宣導
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/legal" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    法律諮詢
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/support/peer-group" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    互助圈
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/tools/text-detoxifier" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    文字消毒
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-foreground/80">
                                    案件進度
                                </Link>
                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo-with-text.png"
                            alt="VoiceOut"
                            width={120}
                            height={36}
                            className="h-7 w-auto"
                            priority
                        />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other items */}
                    </div>
                    <nav className="flex items-center gap-2">
                        {isLoggedIn && user ? (
                            <>
                                <EmergencyHelpDialog>
                                    <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white">
                                        緊急求助
                                    </Button>
                                </EmergencyHelpDialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {getUserInitials(user.email)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">我的帳戶</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user.email}
                                                </p>
                                                {user.role && (
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <span className="text-base">{ROLE_METADATA[user.role].icon}</span>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {ROLE_METADATA[user.role].label}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>個人資料</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>案件進度</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        {user.role && (user.role === 'admin' || user.role === 'teacher' || user.role === 'psychologist' || user.role === 'lawyer') && (
                                            <DropdownMenuItem asChild>
                                                <Link href={getDashboardLink(user.role)} className="cursor-pointer">
                                                    <Shield className="mr-2 h-4 w-4" />
                                                    <span>專業後台</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>登出</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        登入
                                    </Button>
                                </Link>
                                <EmergencyHelpDialog>
                                    <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white">
                                        緊急求助
                                    </Button>
                                </EmergencyHelpDialog>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}
