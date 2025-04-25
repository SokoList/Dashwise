"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { useState, useEffect } from "react"

export function EnvStatus() {
  const [envStatus, setEnvStatus] = useState<{
    openai: boolean
  } | null>(null)

  useEffect(() => {
    const checkEnvStatus = async () => {
      try {
        const response = await fetch("/api/test-ai")
        const data = await response.json()

        setEnvStatus({
          openai: data.status === "success",
        })
      } catch (error) {
        console.error("Error checking environment status:", error)
        setEnvStatus({
          openai: false,
        })
      }
    }

    checkEnvStatus()
  }, [])

  if (!envStatus) {
    return null
  }

  return (
    <Card className="bg-slate-50">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-2">Environment Status</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {envStatus.openai ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-xs">OpenAI API Key: {envStatus.openai ? "Configured" : "Not Configured"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
