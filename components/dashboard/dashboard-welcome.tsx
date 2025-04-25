"use client"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardWelcome() {
  const router = useRouter()

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-slate-500">Upload a dashboard to get started with your analysis</p>
      </div>
      <Button onClick={() => router.push("/dashboard/new-analysis")}>
        <Upload className="mr-2 h-4 w-4" />
        New Analysis
      </Button>
    </div>
  )
}
