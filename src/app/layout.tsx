import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { UserDataProvider } from "@/contexts/user-data-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const genRyuMin = localFont({
  src: "./fonts/GenRyuMin2TW-SB.otf",
  variable: "--font-genryumin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoiceOut: Your voice, your power",
  description: "安全、匿名的網路霸凌舉報平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${genRyuMin.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <UserDataProvider>
            <CustomCursor />
            <SiteHeader />
            {children}
            <Toaster />
            <SiteFooter />
          </UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
