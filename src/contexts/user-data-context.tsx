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

export interface Activity {
    id: string
    action: string
    date: string
    status: string
}

interface UserData {
    emotionJournal: EmotionJournalEntry[]
    assessmentResults: AssessmentResult[]
    safetyPlan: SafetyPlanData | null
    moodHistory: MoodCheckIn[]
    activityHistory: Activity[]
}

interface UserDataContextType {
    userData: UserData
    addJournalEntry: (entry: Omit<EmotionJournalEntry, "id" | "date">) => void
    addEmotionEntry: (entry: Omit<EmotionJournalEntry, "id" | "date">) => void
    addAssessmentResult: (result: Omit<AssessmentResult, "id" | "date">) => void
    updateSafetyPlan: (plan: Omit<SafetyPlanData, "lastUpdated">) => void
    addMoodCheckIn: (mood: Omit<MoodCheckIn, "id" | "date">) => void
    addActivity: (action: string, status: string) => void
    setMoodForDate: (date: Date, mood: string) => void
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
        activityHistory: [],
    })

    // Load data from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setUserData((prev) => ({
                    ...prev,
                    ...parsed,
                    // Ensure arrays are initialized if missing in stored data (migration for old data)
                    emotionJournal: Array.isArray(parsed.emotionJournal) ? parsed.emotionJournal : [],
                    assessmentResults: Array.isArray(parsed.assessmentResults) ? parsed.assessmentResults : [],
                    moodHistory: Array.isArray(parsed.moodHistory) ? parsed.moodHistory : [],
                    activityHistory: Array.isArray(parsed.activityHistory) ? parsed.activityHistory : [],
                }))
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

    const setMoodForDate = (date: Date, mood: string) => {
        const dateStr = date.toDateString()
        setUserData((prev) => {
            const existingIndex = prev.emotionJournal.findIndex(
                (entry) => new Date(entry.date).toDateString() === dateStr
            )

            let newJournal = [...prev.emotionJournal]
            if (existingIndex >= 0) {
                // Update existing
                newJournal[existingIndex] = {
                    ...newJournal[existingIndex],
                    mood,
                }
            } else {
                // Add new
                newJournal = [
                    {
                        id: Date.now().toString(),
                        date: date.toISOString(),
                        mood,
                        content: "快速心情記錄",
                    },
                    ...newJournal,
                ]
            }
            return { ...prev, emotionJournal: newJournal }
        })
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

    const addActivity = (action: string, status: string) => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            action,
            status,
            date: new Date().toISOString(),
        }
        setUserData((prev) => ({
            ...prev,
            activityHistory: [newActivity, ...prev.activityHistory].slice(0, 50), // Keep last 50 entries
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
                activityHistory: [],
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
                setMoodForDate,
                addAssessmentResult,
                updateSafetyPlan,
                addMoodCheckIn,
                addActivity,
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
