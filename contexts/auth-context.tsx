"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSession, clearSession, type UserSession } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"

interface AuthContextType {
  session: UserSession | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for session on initial load
    const currentSession = getSession()
    setSession(currentSession)
    setIsLoading(false)
  }, [])

  const logout = () => {
    clearSession()
    setSession(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
