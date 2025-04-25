"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BarChart2, Settings, HelpCircle, Menu, X, Upload, History, Star } from "lucide-react"
import { getAuthState } from "@/lib/auth-utils"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)

  useEffect(() => {
    // Get user info from auth state
    const authState = getAuthState()
    if (authState.isAuthenticated && authState.user) {
      setUser(authState.user)
    }
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "New Analysis",
      href: "/dashboard/new-analysis",
      icon: <Upload className="h-5 w-5" />,
    },
    {
      name: "History",
      href: "/dashboard/history",
      icon: <History className="h-5 w-5" />,
    },
    {
      name: "Saved Insights",
      href: "/dashboard/saved",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Help & Support",
      href: "/dashboard/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.name) return "U"

    const nameParts = user.name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return user.name[0].toUpperCase()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Mobile toggle button - moved to top-left corner with z-index to avoid overlap */}
      <Button variant="ghost" size="icon" className="absolute top-3 left-3 z-50 lg:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`h-full bg-white border-r w-64 transition-all duration-200 ease-in-out lg:block ${
          isOpen ? "fixed inset-y-0 left-0 z-40" : "hidden"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Dashwise</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-slate-100"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="font-medium text-sm">{getInitials()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || "user@example.com"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
