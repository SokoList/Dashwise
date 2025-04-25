import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dashwise: AI Dashboard Insights for Managers",
  description: "Simplify your dashboards into clear, actionable insights. Join Dashwise's waitlist today.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}
