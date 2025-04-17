"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  type GoogleCredentialResponse,
  loadGoogleScript,
  initializeGoogleOneTap,
  renderGoogleButton,
  debugGoogleAuth,
} from "@/lib/google-auth"
import { verifyGoogleToken, storeSession, type UserSession } from "@/lib/auth-utils"

type SocialAuthButtonsProps = {
  onSuccess?: (provider: string, session: UserSession) => void
  onError?: (provider: string, error: any) => void
  mode?: "signin" | "signup"
}

export function SocialAuthButtons({ onSuccess, onError, mode = "signup" }: SocialAuthButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false)
  const googleButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadScript = async () => {
      try {
        await loadGoogleScript()
        setIsGoogleScriptLoaded(true)
        // Add debugging information
        debugGoogleAuth()
      } catch (error) {
        console.error("Failed to load Google script:", error)
        onError?.("google", error)
      }
    }

    loadScript()
  }, [onError])

  useEffect(() => {
    if (!isGoogleScriptLoaded || !googleButtonRef.current) return

    const handleGoogleResponse = async (response: GoogleCredentialResponse) => {
      setIsLoading(true)

      try {
        // Verify the token with our backend
        const authResponse = await verifyGoogleToken(response.credential)

        if (!authResponse.success || !authResponse.session) {
          throw new Error(authResponse.message || authResponse.error || "Authentication failed")
        }

        // Store the session
        storeSession(authResponse.session)

        // Call the onSuccess callback
        onSuccess?.("google", authResponse.session)
      } catch (error) {
        console.error("Google authentication error:", error)
        onError?.("google", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Initialize Google One Tap
    initializeGoogleOneTap(handleGoogleResponse, {
      context: mode === "signin" ? "signin" : "signup",
    })

    // Render the Google button
    renderGoogleButton("google-signin-button", {
      text: mode === "signin" ? "signin_with" : "signup_with",
      theme: "outline",
      size: "large",
      width: googleButtonRef.current.offsetWidth,
    })

    return () => {
      // Clean up Google One Tap when component unmounts
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel()
      }
    }
  }, [isGoogleScriptLoaded, onSuccess, onError, mode])

  return (
    <div className="w-full">
      {isLoading ? (
        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
          {mode === "signin" ? "Signing in" : "Signing up"} with Google...
        </Button>
      ) : (
        <div id="google-signin-button" ref={googleButtonRef} className="w-full h-[40px] flex justify-center"></div>
      )}
    </div>
  )
}
