"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Types
export interface EmotionJournalEntry {
    id: string
    date: string
    mood: string
    content: string
}

export interface AssessmentResult {
    id: string
    date: string
    type: "phq9" | "gad7"
    score: number
    answers: Record<number, number>
}

export interface SafetyPlanData {
    warningSigns: string[]
    copingStrategies: string[]
    contacts: { name: string; phone: string }[]
    safePlaces: string[]
    lastUpdated: string
}

export interface MoodCheckIn {
    id: string
    date: string
    mood: string
    note?: string
}

interface UserData {
    emotionJournal: EmotionJournalEntry[]
    assessmentResults: AssessmentResult[]
    safetyPlan: SafetyPlanData | null
    moodHistory: MoodCheckIn[]
}

interface UserDataContextType {
    userData: UserData
    addJournalEntry: (entry: Omit<EmotionJournalEntry, "id" | "date">) => void
    addEmotionEntry: (entry: Omit<EmotionJournalEntry, "id" | "date">) => void
    addAssessmentResult: (result: Omit<AssessmentResult, "id" | "date">) => void
    updateSafetyPlan: (plan: Omit<SafetyPlanData, "lastUpdated">) => void
    addMoodCheckIn: (mood: Omit<MoodCheckIn, "id" | "date">) => void
    exportData: () => string
    clearAllData: () => void
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

const STORAGE_KEY = "obrh_user_data"

export function UserDataProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData>({
        emotionJournal: [],
        assessmentResults: [],
        safetyPlan: null,
        moodHistory: [],
    })

    // Load data from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                setUserData(JSON.parse(stored))
            } catch (error) {
                console.error("Failed to load user data:", error)
            }
        }
    }, [])

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    }, [userData])

    const addJournalEntry = (entry: Omit<EmotionJournalEntry, "id" | "date">) => {
        const newEntry: EmotionJournalEntry = {
            ...entry,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        }
        setUserData((prev) => ({
            ...prev,
            emotionJournal: [newEntry, ...prev.emotionJournal],
        }))
    }

    const addAssessmentResult = (result: Omit<AssessmentResult, "id" | "date">) => {
        const newResult: AssessmentResult = {
            ...result,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        }
        setUserData((prev) => ({
            ...prev,
            assessmentResults: [newResult, ...prev.assessmentResults],
        }))
    }

    const updateSafetyPlan = (plan: Omit<SafetyPlanData, "lastUpdated">) => {
        const updatedPlan: SafetyPlanData = {
            ...plan,
            lastUpdated: new Date().toISOString(),
        }
        setUserData((prev) => ({
            ...prev,
            safetyPlan: updatedPlan,
        }))
    }

    const addMoodCheckIn = (mood: Omit<MoodCheckIn, "id" | "date">) => {
        const newMood: MoodCheckIn = {
            ...mood,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        }
        setUserData((prev) => ({
            ...prev,
            moodHistory: [newMood, ...prev.moodHistory].slice(0, 30), // Keep last 30 entries
        }))
    }

    const exportData = () => {
        return JSON.stringify(userData, null, 2)
    }

    const clearAllData = () => {
        if (confirm("確定要清除所有數據嗎？此操作無法復原。")) {
            setUserData({
                emotionJournal: [],
                assessmentResults: [],
                safetyPlan: null,
                moodHistory: [],
            })
            localStorage.removeItem(STORAGE_KEY)
        }
    }

    return (
        <UserDataContext.Provider
            value={{
                userData,
                addJournalEntry,
                addEmotionEntry: addJournalEntry, // Alias for compatibility
                addAssessmentResult,
                updateSafetyPlan,
                addMoodCheckIn,
                exportData,
                clearAllData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    )
}

export function useUserData() {
    const context = useContext(UserDataContext)
    if (context === undefined) {
        throw new Error("useUserData must be used within a UserDataProvider")
    }
    return context
}
