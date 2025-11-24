import { useAuth } from "@/contexts/auth-context"
import { Permission } from "@/lib/roles"

/**
 * Custom hook for checking user permissions
 * @returns Object with permission checking functions
 */
export function usePermission() {
    const { hasPermission, hasAnyPermission, hasAllPermissions, hasRole } = useAuth()

    return {
        /**
         * Check if user has a specific permission
         */
        can: hasPermission,

        /**
         * Check if user has any of the specified permissions
         */
        canAny: hasAnyPermission,

        /**
         * Check if user has all of the specified permissions
         */
        canAll: hasAllPermissions,

        /**
         * Check if user has a specific role
         */
        is: hasRole,
    }
}
