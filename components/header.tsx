"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M9 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <span className="font-bold text-xl">Dashwise</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
