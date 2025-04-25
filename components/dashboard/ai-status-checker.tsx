"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { testAIConnection } from "@/lib/analysis-service"

export function AIStatusChecker() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle")
  const [message, setMessage] = useState<string>("")

  const checkAIStatus = async () => {
    setStatus("loading")
    try {
      const result = await testAIConnection()
      if (result.status === "success") {
        setStatus("success")
        setMessage("AI service is connected and working properly")
      } else {
        setStatus("error")
        setMessage(result.message || "Failed to connect to AI service")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Unknown error occurred")
    }
  }

  return (
    <Card className="bg-slate-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status === "loading" && <Loader2 className="h-4 w-4 text-slate-500 animate-spin" />}
            {status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
            {status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
            <span className="text-sm font-medium">AI Service Status</span>
          </div>
          <Button variant="outline" size="sm" onClick={checkAIStatus} disabled={status === "loading"}>
            {status === "loading" ? "Checking..." : "Check Connection"}
          </Button>
        </div>
        {message && <p className="text-xs mt-2">{message}</p>}
      </CardContent>
    </Card>
  )
}
