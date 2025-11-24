"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, ShieldAlert, HeartHandshake } from "lucide-react"

export function EmergencyHelpDialog({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <ShieldAlert className="h-6 w-6" />
                        緊急求助資訊
                    </DialogTitle>
                    <DialogDescription>
                        如果您或他人正面臨立即的危險，請立即尋求專業協助。
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-destructive/10 p-2 text-destructive">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">報案專線</p>
                                <p className="text-sm text-muted-foreground">警察局</p>
                            </div>
                        </div>
                        <Button variant="destructive" size="lg" asChild>
                            <a href="tel:110">110</a>
                        </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                                <HeartHandshake className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">保護專線</p>
                                <p className="text-sm text-muted-foreground">24小時婦幼保護</p>
                            </div>
                        </div>
                        <Button variant="outline" size="lg" className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700" asChild>
                            <a href="tel:113">113</a>
                        </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-2 text-green-600">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">安心專線</p>
                                <p className="text-sm text-muted-foreground">心理諮詢</p>
                            </div>
                        </div>
                        <Button variant="outline" size="lg" className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700" asChild>
                            <a href="tel:1925">1925</a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
