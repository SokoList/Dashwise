import { env } from "@/lib/env"

// Types for Google's OAuth response
export interface GoogleUser {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  name: string
  picture: string
  given_name: string
  family_name: string
  locale: string
  iat: number
  exp: number
}

export interface GoogleCredentialResponse {
  credential: string
  clientId: string
  select_by: string
}

// Load the Google Identity Services script
export const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Google Identity Services can only be loaded in browser environment"))
      return
    }

    // Check if the script is already loaded
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"))
    document.head.appendChild(script)
  })
}

// Parse the JWT token from Google
export const parseGoogleJwt = (token: string): GoogleUser => {
  try {
    // Split the token and get the payload
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error parsing Google JWT:", error)
    throw new Error("Invalid token format")
  }
}

// Add this function to help debug Google OAuth issues
export const debugGoogleAuth = (): void => {
  if (typeof window === "undefined") return

  console.log("Google Client ID:", env.GOOGLE_CLIENT_ID)
  console.log("Current Origin:", window.location.origin)

  // Check if client ID is properly formatted
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_ID.includes(".apps.googleusercontent.com")) {
    console.error("Invalid Google Client ID format. It should end with .apps.googleusercontent.com")
  }
}

// Initialize Google One Tap
export const initializeGoogleOneTap = (
  callback: (response: GoogleCredentialResponse) => void,
  options?: {
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
    context?: "signin" | "signup" | "use"
  },
) => {
  if (typeof window === "undefined") return

  if (!window.google) {
    console.error("Google Identity Services not loaded. Make sure the script is properly loaded.")
    return
  }

  if (!env.GOOGLE_CLIENT_ID) {
    console.error("Google Client ID is missing. Make sure NEXT_PUBLIC_GOOGLE_CLIENT_ID is set in your environment.")
    return
  }

  try {
    window.google.accounts.id.initialize({
      client_id: env.GOOGLE_CLIENT_ID,
      callback,
      auto_select: options?.auto_select ?? false,
      cancel_on_tap_outside: options?.cancel_on_tap_outside ?? true,
      context: options?.context ?? "signin",
    })
    console.log("Google Identity Services initialized successfully")
  } catch (error) {
    console.error("Failed to initialize Google Identity Services:", error)
  }
}

// Render the Google Sign In button
export const renderGoogleButton = (
  elementId: string,
  options?: {
    type?: "standard" | "icon"
    theme?: "outline" | "filled_blue" | "filled_black"
    size?: "large" | "medium" | "small"
    text?: "signin_with" | "signup_with" | "continue_with" | "signin"
    shape?: "rectangular" | "pill" | "circle" | "square"
    logo_alignment?: "left" | "center"
    width?: number
    locale?: string
  },
) => {
  if (typeof window === "undefined" || !window.google) return

  window.google.accounts.id.renderButton(document.getElementById(elementId)!, {
    type: options?.type ?? "standard",
    theme: options?.theme ?? "outline",
    size: options?.size ?? "large",
    text: options?.text ?? "signin_with",
    shape: options?.shape ?? "rectangular",
    logo_alignment: options?.logo_alignment ?? "left",
    width: options?.width,
    locale: options?.locale,
  })
}

// Prompt the One Tap UI
export const promptGoogleOneTap = () => {
  if (typeof window === "undefined" || !window.google) return
  window.google.accounts.id.prompt()
}

// Cancel the One Tap UI
export const cancelGoogleOneTap = () => {
  if (typeof window === "undefined" || !window.google) return
  window.google.accounts.id.cancel()
}
