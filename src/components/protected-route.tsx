"use client"

import { ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/roles"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
    children: ReactNode
    requiredRole?: UserRole | UserRole[]
    fallbackPath?: string
}

export function ProtectedRoute({
    children,
    requiredRole,
    fallbackPath = "/login"
}: ProtectedRouteProps) {
    const { user, isLoggedIn, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoading) return

        // Not logged in
        if (!isLoggedIn || !user) {
            router.push(fallbackPath)
            return
        }

        // Check role requirement
        if (requiredRole) {
            const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
            if (!roles.includes(user.role)) {
                router.push("/unauthorized")
                return
            }
        }
    }, [isLoggedIn, user, isLoading, requiredRole, router, fallbackPath])

    // Don't render children if loading or not authorized
    if (isLoading || !isLoggedIn || !user) {
        return null
    }

    if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
        if (!roles.includes(user.role)) {
            return null
        }
    }

    return <>{children}</>
}
