// Interface for the session object
export interface UserSession {
  user: {
    id: string
    email: string
    name: string
    givenName: string
    familyName: string
    picture: string
    emailVerified: boolean
  }
  expires: string
}

// Interface for the authentication response
export interface AuthResponse {
  success: boolean
  session?: UserSession
  error?: string
  message?: string
}

// Function to verify Google token with our backend
export async function verifyGoogleToken(token: string): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || "Authentication failed")
    }

    return data
  } catch (error: any) {
    console.error("Error verifying Google token:", error)
    return {
      success: false,
      error: "Authentication failed",
      message: error.message,
    }
  }
}

// Function to store session in localStorage
export function storeSession(session: UserSession): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("dashwise_session", JSON.stringify(session))
  }
}

// Function to retrieve session from localStorage
export function getSession(): UserSession | null {
  if (typeof window !== "undefined") {
    const sessionData = localStorage.getItem("dashwise_session")
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData) as UserSession

        // Check if session has expired
        if (new Date(session.expires) < new Date()) {
          localStorage.removeItem("dashwise_session")
          return null
        }

        return session
      } catch (error) {
        console.error("Error parsing session data:", error)
        return null
      }
    }
  }
  return null
}

// Function to clear session from localStorage
export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dashwise_session")
  }
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  return getSession() !== null
}
