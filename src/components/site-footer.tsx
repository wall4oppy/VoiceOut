export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built for a safer internet. © 2025 VoiceOut.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="/about" className="hover:underline">關於我們</a>
                    <a href="/privacy" className="hover:underline">隱私政策</a>
                    <a href="/terms" className="hover:underline">服務條款</a>
                </div>
            </div>
        </footer>
    )
}
