import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'

interface UserData {
    _id: string
    username: string
    email: string
    firstName?: string
    lastName?: string
    primaryRole?: string
    roles?: string[]
    permissions?: string[]
}

interface AuthStore {
    token: string | null
    refreshToken: string | null
    user: UserData | null
    setToken: (token: string | null) => void
    setRefreshToken: (refreshToken: string | null) => void
    setUser: (user: UserData | null) => void
    logout: () => void
}

// Cookie storage implementation for zustand
const cookieStorage: StateStorage = {
    getItem: (name: string): string | null => {
        if (typeof document === 'undefined') return null
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift()
            return cookieValue || null
        }
        return null
    },
    setItem: (name: string, value: string): void => {
        if (typeof document === 'undefined') return
        // Set cookie with 7 days expiry, HttpOnly cannot be set from JS
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`
    },
    removeItem: (name: string): void => {
        if (typeof document === 'undefined') return
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    },
}

export const useAuthStore = create<AuthStore>()(persist(
    (set) => ({
        token: null,
        refreshToken: null,
        user: null,
        setToken: (token: string | null) => set({ token }),
        setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
        setUser: (user: UserData | null) => set({ user }),
        logout: () => set({ token: null, refreshToken: null, user: null }),
    }),
    {
        name: 'auth-storage',
        storage: createJSONStorage(() => cookieStorage),
        partialize: (state) => {
        return ({ 
            token: state.token,
            refreshToken: state.refreshToken 
        })},
    }
))