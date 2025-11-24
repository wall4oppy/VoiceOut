import { ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Permission, UserRole } from "@/lib/roles"

interface PermissionGateProps {
    children: ReactNode
    permission?: Permission | Permission[]
    role?: UserRole | UserRole[]
    fallback?: ReactNode
}

/**
 * Component that conditionally renders children based on user permissions or roles
 */
export function PermissionGate({
    children,
    permission,
    role,
    fallback = null
}: PermissionGateProps) {
    const { hasPermission, hasAnyPermission, hasRole } = useAuth()

    // Check role if specified
    if (role) {
        if (!hasRole(role)) {
            return <>{fallback}</>
        }
    }

    // Check permission if specified
    if (permission) {
        const permissions = Array.isArray(permission) ? permission : [permission]
        if (!hasAnyPermission(permissions)) {
            return <>{fallback}</>
        }
    }

    return <>{children}</>
}
