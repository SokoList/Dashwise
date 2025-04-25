import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { redirect } from "next/navigation"
import { getAuthState } from "@/lib/auth-utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated on the client side
  // This is a simple check - in a real app, you'd use a more robust auth system
  const isAuthenticated = getAuthState().isAuthenticated

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden lg:block h-full">
        <Sidebar />
      </div>
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
