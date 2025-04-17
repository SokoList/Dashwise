"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { env } from "@/lib/env"
import Link from "next/link"

export default function TroubleshootPage() {
  const [origin, setOrigin] = useState<string>("")
  const [clientId, setClientId] = useState<string>("")
  const [isClientIdValid, setIsClientIdValid] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
      const id = env.GOOGLE_CLIENT_ID
      setClientId(id)
      setIsClientIdValid(!!id && id.includes(".apps.googleusercontent.com"))
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Google OAuth Troubleshooting</CardTitle>
          <CardDescription>Use this page to diagnose issues with your Google OAuth configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Current Origin</h3>
            <p className="p-2 bg-slate-100 rounded text-sm font-mono break-all">{origin}</p>
            <p className="text-sm text-slate-500">
              Make sure this origin is added to the Authorized JavaScript origins in your Google Cloud Console
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Google Client ID</h3>
            <p className="p-2 bg-slate-100 rounded text-sm font-mono break-all">{clientId || "Not set"}</p>
            {!clientId && (
              <p className="text-red-500 text-sm">
                Client ID is not set. Make sure NEXT_PUBLIC_GOOGLE_CLIENT_ID is set in your environment.
              </p>
            )}
            {clientId && !isClientIdValid && (
              <p className="text-red-500 text-sm">
                Client ID format appears invalid. It should end with .apps.googleusercontent.com
              </p>
            )}
          </div>

          <div className="space-y-2 border-t pt-4">
            <h3 className="font-medium">Common Issues</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Invalid Client ID</strong>: Make sure your Client ID is correctly copied from Google Cloud
                Console
              </li>
              <li>
                <strong>Unauthorized Domain</strong>: Add {origin} to Authorized JavaScript origins in Google Cloud
                Console
              </li>
              <li>
                <strong>OAuth Consent Screen</strong>: Make sure your OAuth consent screen is properly configured
              </li>
              <li>
                <strong>API Enabled</strong>: Ensure the Google Identity Services API is enabled for your project
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild>
            <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">
              Open Google Cloud Console
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
