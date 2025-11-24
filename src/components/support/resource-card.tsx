import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ResourceCardProps {
    title: string
    description: string
    contact: string
    link: string
    icon: React.ReactNode
    isEmergency?: boolean
}

export function ResourceCard({ title, description, contact, link, icon }: ResourceCardProps) {
    return (
        <Card className="h-full transition-all duration-300 hover:shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-primary">
                    {contact}
                </div>
                <Button
                    variant="outline"
                    className="w-full"
                    asChild
                >
                    <Link href={link} target={link.startsWith('http') ? '_blank' : undefined}>
                        {link.startsWith('tel:') ? '立即撥打' : '了解更多'}
                        {link.startsWith('http') && <ExternalLink className="ml-2 h-4 w-4" />}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
