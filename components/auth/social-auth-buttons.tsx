"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  type GoogleCredentialResponse,
  loadGoogleScript,
  parseGoogleJwt,
  initializeGoogleOneTap,
  renderGoogleButton,
} from "@/lib/google-auth"

type SocialAuthButtonsProps = {
  onSuccess?: (provider: string, response: any) => void
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
      } catch (error) {
        console.error("Failed to load Google script:", error)
        onError?.("google", error)
      }
    }

    loadScript()
  }, [onError])

  useEffect(() => {
    if (!isGoogleScriptLoaded || !googleButtonRef.current) return

    const handleGoogleResponse = (response: GoogleCredentialResponse) => {
      setIsLoading(true)
      try {
        console.log("Google authentication successful, processing response...")
        // Parse the JWT token to get user information
        const userData = parseGoogleJwt(response.credential)

        console.log("User authenticated:", userData.email)

        // In a real application, you would send this token to your backend
        // for verification and to create/authenticate the user
        onSuccess?.("google", {
          token: response.credential,
          user: userData,
        })
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
