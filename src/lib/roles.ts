// User roles enum
export enum UserRole {
    VICTIM = 'victim',
    PARENT = 'parent',
    TEACHER = 'teacher',
    PSYCHOLOGIST = 'psychologist',
    LAWYER = 'lawyer',
    ADMIN = 'admin'
}

// Permission constants
export const PERMISSIONS = {
    // Basic permissions
    SUBMIT_REPORT: 'submit_report',
    VIEW_OWN_CASES: 'view_own_cases',
    USE_MENTAL_HEALTH_TOOLS: 'use_mental_health_tools',
    ACCESS_LEGAL_RESOURCES: 'access_legal_resources',

    // Teacher permissions
    REVIEW_SCHOOL_CASES: 'review_school_cases',
    MANAGE_STUDENTS: 'manage_students',
    SUBMIT_REFERRAL: 'submit_referral',

    // Expert permissions
    PSYCHOLOGICAL_REVIEW: 'psychological_review',
    LEGAL_REVIEW: 'legal_review',
    WRITE_REPORTS: 'write_reports',

    // Admin permissions
    MANAGE_ALL_CASES: 'manage_all_cases',
    MANAGE_USERS: 'manage_users',
    ASSIGN_CASES: 'assign_cases',
    SYSTEM_SETTINGS: 'system_settings',
    VIEW_ANALYTICS: 'view_analytics',
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.VICTIM]: [
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_OWN_CASES,
        PERMISSIONS.USE_MENTAL_HEALTH_TOOLS,
        PERMISSIONS.ACCESS_LEGAL_RESOURCES,
    ],
    [UserRole.PARENT]: [
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_OWN_CASES,
        PERMISSIONS.ACCESS_LEGAL_RESOURCES,
    ],
    [UserRole.TEACHER]: [
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_OWN_CASES,
        PERMISSIONS.REVIEW_SCHOOL_CASES,
        PERMISSIONS.MANAGE_STUDENTS,
        PERMISSIONS.SUBMIT_REFERRAL,
        PERMISSIONS.ACCESS_LEGAL_RESOURCES,
    ],
    [UserRole.PSYCHOLOGIST]: [
        PERMISSIONS.PSYCHOLOGICAL_REVIEW,
        PERMISSIONS.WRITE_REPORTS,
        PERMISSIONS.ACCESS_LEGAL_RESOURCES,
    ],
    [UserRole.LAWYER]: [
        PERMISSIONS.LEGAL_REVIEW,
        PERMISSIONS.WRITE_REPORTS,
        PERMISSIONS.ACCESS_LEGAL_RESOURCES,
    ],
    [UserRole.ADMIN]: [
        PERMISSIONS.SUBMIT_REPORT,
        PERMISSIONS.VIEW_OWN_CASES,
        PERMISSIONS.USE_MENTAL_HEALTH_TOOLS,
        PERMISSIONS.ACCESS_LEGAL_RESOURCES,
        PERMISSIONS.REVIEW_SCHOOL_CASES,
        PERMISSIONS.MANAGE_STUDENTS,
        PERMISSIONS.SUBMIT_REFERRAL,
        PERMISSIONS.PSYCHOLOGICAL_REVIEW,
        PERMISSIONS.LEGAL_REVIEW,
        PERMISSIONS.WRITE_REPORTS,
        PERMISSIONS.MANAGE_ALL_CASES,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.ASSIGN_CASES,
        PERMISSIONS.SYSTEM_SETTINGS,
        PERMISSIONS.VIEW_ANALYTICS,
    ],
}

// Role metadata
export const ROLE_METADATA = {
    [UserRole.VICTIM]: {
        label: '受害者/學生',
        icon: '👤',
        color: 'blue',
        description: '提交霸凌舉報，使用心理支持工具',
    },
    [UserRole.PARENT]: {
        label: '家長/監護人',
        icon: '👨‍👩‍👧',
        color: 'green',
        description: '代表子女提交舉報，查看案件進度',
    },
    [UserRole.TEACHER]: {
        label: '教師/輔導老師',
        icon: '👨‍🏫',
        color: 'purple',
        description: '協助學生，審核學校案件',
    },
    [UserRole.PSYCHOLOGIST]: {
        label: '心理師/諮商師',
        icon: '🧠',
        color: 'pink',
        description: '提供心理評估和專業建議',
    },
    [UserRole.LAWYER]: {
        label: '律師/法律顧問',
        icon: '⚖️',
        color: 'amber',
        description: '提供法律評估和建議',
    },
    [UserRole.ADMIN]: {
        label: '系統管理員',
        icon: '👔',
        color: 'red',
        description: '管理系統和所有案件',
    },
} as const

// Helper function to check if user has permission
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
    return ROLE_PERMISSIONS[userRole].includes(permission)
}

// Helper function to check if user has any of the permissions
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.some(permission => hasPermission(userRole, permission))
}

// Helper function to check if user has all permissions
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.every(permission => hasPermission(userRole, permission))
}
