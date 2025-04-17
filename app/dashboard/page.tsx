"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { isAuthenticated, getAuthState, clearAuthState } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    // Get user data
    const authState = getAuthState()
    setUser(authState.user)
  }, [router])

  const handleSignOut = () => {
    clearAuthState()
    router.push("/")
  }

  if (!user) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="container max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashwise</h1>
          <div className="flex items-center gap-4">
            {user?.picture && (
              <img
                src={user.picture || "/placeholder.svg"}
                alt={user.name || "User"}
                className="w-8 h-8 rounded-full"
              />
            )}
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Dashwise{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
          </h2>
          <p className="text-slate-600 mb-6">
            Your account has been successfully authenticated. This is your dashboard page.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
