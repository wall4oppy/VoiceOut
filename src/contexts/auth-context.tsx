"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { UserRole, Permission, hasPermission, hasAnyPermission, hasAllPermissions, ROLE_PERMISSIONS } from "@/lib/roles"

interface User {
    email: string
    name?: string
    role: UserRole

    // 組織歸屬 (學生、家長、教師)
    school?: string          // 學校名稱
    district?: string        // 縣市/地區
    grade?: string           // 年級
    class?: string           // 班級

    // 教師專屬
    teachingGrades?: string[]  // 任教年級（可多選）
    teachingClasses?: string[] // 任教班級（可多選）
    position?: string          // 職稱（導師/輔導老師/學務主任）

    // 專業人員 (心理師、律師)
    licenseNumber?: string     // 證照號碼
    serviceArea?: string[]     // 服務地區
    serviceSchools?: string[]  // 服務學校列表
    specialties?: string[]     // 專長領域

    // 家長專屬
    childName?: string         // 學生姓名
    relationship?: string      // 關係（父/母/監護人）

    // 管理員專屬
    jurisdiction?: 'national' | 'district' | 'school'  // 管轄範圍
    jurisdictionArea?: string  // 管轄地區/學校
}


interface AuthContextType {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    login: (email: string, role: UserRole, userData?: Partial<User>) => void
    logout: () => void
    updateProfile: (updates: Partial<User>) => void
    hasPermission: (permission: Permission) => boolean
    hasAnyPermission: (permissions: Permission[]) => boolean
    hasAllPermissions: (permissions: Permission[]) => boolean
    hasRole: (role: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
        const storedUserData = localStorage.getItem("userData")

        if (storedIsLoggedIn === "true" && storedUserData) {
            try {
                const userData = JSON.parse(storedUserData) as User
                setUser(userData)
                setIsLoggedIn(true)
            } catch (error) {
                console.error("Failed to parse user data:", error)
                // Fallback to old format for backward compatibility
                const storedEmail = localStorage.getItem("userEmail")
                const storedRole = localStorage.getItem("userRole") as UserRole
                if (storedEmail && storedRole) {
                    setUser({ email: storedEmail, role: storedRole })
                    setIsLoggedIn(true)
                }
            }
        }
        setIsLoading(false)
    }, [])

    const login = (email: string, role: UserRole, userData?: Partial<User>) => {
        const fullUserData: User = {
            email,
            role,
            ...userData
        }

        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userData", JSON.stringify(fullUserData))
        // Keep old format for backward compatibility
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userRole", role)

        setUser(fullUserData)
        setIsLoggedIn(true)
    }

    const updateProfile = (updates: Partial<User>) => {
        if (!user) return

        const updatedUser = { ...user, ...updates }
        setUser(updatedUser)
        localStorage.setItem("userData", JSON.stringify(updatedUser))

        // Update legacy storage if needed
        if (updates.email) localStorage.setItem("userEmail", updates.email)
        if (updates.role) localStorage.setItem("userRole", updates.role)
    }

    const logout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userData")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userRole")
        setUser(null)
        setIsLoggedIn(false)
    }

    const checkPermission = (permission: Permission): boolean => {
        if (!user) return false
        return hasPermission(user.role, permission)
    }

    const checkAnyPermission = (permissions: Permission[]): boolean => {
        if (!user) return false
        return hasAnyPermission(user.role, permissions)
    }

    const checkAllPermissions = (permissions: Permission[]): boolean => {
        if (!user) return false
        return hasAllPermissions(user.role, permissions)
    }

    const checkRole = (role: UserRole | UserRole[]): boolean => {
        if (!user) return false
        if (Array.isArray(role)) {
            return role.includes(user.role)
        }
        return user.role === role
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            isLoading,
            login,
            logout,
            updateProfile,
            hasPermission: checkPermission,
            hasAnyPermission: checkAnyPermission,
            hasAllPermissions: checkAllPermissions,
            hasRole: checkRole,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
