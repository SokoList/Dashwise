"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { session, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render the dashboard
  // (the useEffect will handle the redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="container max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashwise</h1>
          <div className="flex items-center gap-4">
            {session?.user?.picture && (
              <img
                src={session.user.picture || "/placeholder.svg"}
                alt={session.user.name || "User"}
                className="w-8 h-8 rounded-full"
              />
            )}
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to Dashwise, {session?.user?.name}!</h2>
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
