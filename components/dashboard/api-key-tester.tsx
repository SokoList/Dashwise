"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

export function ApiKeyTester() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "checking">("checking")
  const [message, setMessage] = useState("")

  // Automatically check on component mount
  useEffect(() => {
    testApiKey()
  }, [])

  const testApiKey = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/test-ai")
      const data = await response.json()

      if (data.status === "success") {
        setStatus("success")
        setMessage(`API key is working! Response: ${data.response}`)
      } else {
        setStatus("error")
        setMessage(`API key test failed: ${data.message || "Unknown error"}`)
      }
    } catch (error) {
      setStatus("error")
      setMessage(`Error testing API key: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return (
    <Card className={status === "error" ? "border-red-300 bg-red-50" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
          {status === "error" && <AlertTriangle className="h-5 w-5 text-red-500" />}
          {(status === "loading" || status === "checking") && <Loader2 className="h-5 w-5 animate-spin" />}
          OpenAI API Key Status
        </CardTitle>
        <CardDescription>
          {status === "success" ? "Your API key is configured correctly" : "Verify your OpenAI API key configuration"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {status === "error" && (
            <div className="rounded-md bg-red-100 p-4 text-sm text-red-700">
              <p className="font-medium">API Key Error</p>
              <p className="mt-1">{message}</p>
              <div className="mt-3">
                <p className="font-medium">Troubleshooting steps:</p>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li>Verify that you've added the OPENAI_API_KEY to your environment variables</li>
                  <li>Make sure the API key is correct and active</li>
                  <li>Try restarting your development server</li>
                  <li>If using Vercel, check that the environment variable is properly set in your project settings</li>
                </ol>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="rounded-md bg-green-100 p-4 text-sm text-green-700">
              <p>{message}</p>
            </div>
          )}

          <Button onClick={testApiKey} disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              "Test API Key Again"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
