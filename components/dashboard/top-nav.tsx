"use client"

import { useState } from "react"
import { Bell, Search, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { clearAuthState } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import Link from "next/link"

export function TopNav() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSignOut = () => {
    clearAuthState()
    router.push("/")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {isSidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative hidden md:block max-w-md flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-slate-50 border-slate-200 focus-visible:ring-slate-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="default" size="sm" asChild className="hidden sm:flex">
            <Link href="/dashboard/new-analysis">
              <Plus className="h-4 w-4 mr-1" />
              New Analysis
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}
