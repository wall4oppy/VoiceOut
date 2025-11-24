import { UserRole } from "./roles"

// 擴展的 User 類型（與 auth-context 一致）
export interface ExtendedUser {
    email: string
    name?: string
    role: UserRole
    school?: string
    district?: string
    grade?: string
    class?: string
    teachingGrades?: string[]
    teachingClasses?: string[]
    position?: string
    licenseNumber?: string
    serviceArea?: string[]
    serviceSchools?: string[]
    specialties?: string[]
    childName?: string
    relationship?: string
    jurisdiction?: 'national' | 'district' | 'school'
    jurisdictionArea?: string
}

// 案件數據類型
export interface CaseData {
    id: string
    reporterId: string      // 通報者 ID
    victimId?: string        // 受害者 ID
    school: string           // 學校
    district: string         // 縣市
    grade: string            // 年級
    class: string            // 班級
    status: string
    priority: string
    assignedTeacherId?: string
    assignedPsychologistId?: string
    assignedLawyerId?: string
    createdAt: string
}

/**
 * 根據用戶角色過濾案件列表
 * @param cases 所有案件
 * @param user 當前用戶
 * @returns 用戶有權查看的案件
 */
export function filterCasesByRole(cases: CaseData[], user: ExtendedUser | null): CaseData[] {
    if (!user) return []

    switch (user.role) {
        case UserRole.VICTIM:
            // 學生只能看到自己通報的案件
            return cases.filter(c => c.reporterId === user.email || c.victimId === user.email)

        case UserRole.PARENT:
            // 家長只能看到自己孩子的案件（通過學校、年級、班級匹配）
            return cases.filter(c =>
                c.school === user.school &&
                c.grade === user.grade &&
                c.class === user.class
            )

        case UserRole.TEACHER:
            // 教師根據職稱看到不同範圍的案件
            if (user.position === "學務主任" || user.position === "輔導主任") {
                // 主任可以看到整個學校的案件
                return cases.filter(c => c.school === user.school)
            } else if (user.position === "導師") {
                // 導師只能看到自己班級的案件
                return cases.filter(c =>
                    c.school === user.school &&
                    user.teachingGrades?.includes(c.grade) &&
                    user.teachingClasses?.includes(c.class)
                )
            } else {
                // 輔導老師可以看到自己任教年級的案件
                return cases.filter(c =>
                    c.school === user.school &&
                    user.teachingGrades?.includes(c.grade)
                )
            }

        case UserRole.PSYCHOLOGIST:
            // 心理師看到被轉介給自己的案件 + 服務地區的待接案
            return cases.filter(c =>
                c.assignedPsychologistId === user.email ||
                (user.serviceArea?.includes(c.district) && !c.assignedPsychologistId)
            )

        case UserRole.LAWYER:
            // 律師看到被轉介給自己的案件 + 服務地區的待接案
            return cases.filter(c =>
                c.assignedLawyerId === user.email ||
                (user.serviceArea?.includes(c.district) && !c.assignedLawyerId)
            )

        case UserRole.ADMIN:
            // 管理員根據管轄範圍看到案件
            if (user.jurisdiction === "national") {
                return cases // 全國管理員看到所有案件
            } else if (user.jurisdiction === "district") {
                return cases.filter(c => c.district === user.jurisdictionArea)
            } else if (user.jurisdiction === "school") {
                return cases.filter(c => c.school === user.jurisdictionArea)
            }
            return cases

        default:
            return []
    }
}

/**
 * 檢查用戶是否有權查看特定案件
 * @param caseData 案件數據
 * @param user 當前用戶
 * @returns 是否有權限
 */
export function canViewCase(caseData: CaseData, user: ExtendedUser | null): boolean {
    if (!user) return false

    const filteredCases = filterCasesByRole([caseData], user)
    return filteredCases.length > 0
}

/**
 * 檢查用戶是否有權編輯特定案件
 * @param caseData 案件數據
 * @param user 當前用戶
 * @returns 是否有權限
 */
export function canEditCase(caseData: CaseData, user: ExtendedUser | null): boolean {
    if (!user) return false

    switch (user.role) {
        case UserRole.VICTIM:
            // 學生可以編輯自己通報的案件
            return caseData.reporterId === user.email

        case UserRole.PARENT:
            // 家長不能編輯案件
            return false

        case UserRole.TEACHER:
            // 教師可以編輯自己學校的案件
            return caseData.school === user.school

        case UserRole.PSYCHOLOGIST:
            // 心理師可以編輯被分配給自己的案件
            return caseData.assignedPsychologistId === user.email

        case UserRole.LAWYER:
            // 律師可以編輯被分配給自己的案件
            return caseData.assignedLawyerId === user.email

        case UserRole.ADMIN:
            // 管理員可以編輯管轄範圍內的案件
            return canViewCase(caseData, user)

        default:
            return false
    }
}

/**
 * 獲取可轉介的專業人員列表
 * @param caseData 案件數據
 * @param professionals 所有專業人員列表
 * @param role 專業人員角色（心理師或律師）
 * @returns 可轉介的專業人員
 */
export function getAvailableProfessionals(
    caseData: CaseData,
    professionals: ExtendedUser[],
    role: UserRole.PSYCHOLOGIST | UserRole.LAWYER
): ExtendedUser[] {
    return professionals.filter(prof =>
        prof.role === role &&
        prof.serviceArea?.includes(caseData.district)
    )
}

/**
 * 生成案件摘要文字（用於顯示）
 * @param caseData 案件數據
 * @returns 案件摘要
 */
export function getCaseSummary(caseData: CaseData): string {
    return `${caseData.school} ${caseData.grade}${caseData.class}班 - ${caseData.id}`
}
