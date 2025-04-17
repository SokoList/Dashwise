import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dashwise</h3>
            <p className="text-slate-400 mb-4 max-w-md">
              Transform your business data into actionable insights with our powerful analytics platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-slate-200 hover:text-white hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-200 hover:text-white hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-200 hover:text-white hover:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2025 Dashwise. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
