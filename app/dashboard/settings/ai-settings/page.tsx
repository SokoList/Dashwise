"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { testAIConnection } from "@/lib/analysis-service"

export default function AISettingsPage() {
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [testMessage, setTestMessage] = useState("")

  const handleTestConnection = async () => {
    setTestStatus("loading")
    try {
      const result = await testAIConnection()
      if (result.status === "success") {
        setTestStatus("success")
        setTestMessage("AI service is connected and working properly")
      } else {
        setTestStatus("error")
        setTestMessage(result.message || "Failed to connect to AI service")
      }
    } catch (error) {
      setTestStatus("error")
      setTestMessage(error instanceof Error ? error.message : "Unknown error occurred")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Settings</h1>
        <p className="text-slate-500">Configure and test your AI integration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Connection Test</CardTitle>
          <CardDescription>Test your connection to the OpenAI API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Click the button below to test your connection to the OpenAI API. This will help diagnose any issues with
            your AI integration.
          </p>

          <div className="flex items-center gap-4">
            <Button onClick={handleTestConnection} disabled={testStatus === "loading"}>
              {testStatus === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>

            {testStatus === "success" && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>{testMessage}</span>
              </div>
            )}

            {testStatus === "error" && (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                <span>{testMessage}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Configuration</CardTitle>
          <CardDescription>Configure your AI settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            The AI integration requires an OpenAI API key to be set as an environment variable. Make sure you have set
            the <code className="bg-slate-100 px-1 py-0.5 rounded">OPENAI_API_KEY</code> environment variable in your
            Vercel project settings or your local <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code> file.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
