// Simple client-side auth utilities

// Store authentication state in localStorage
export const setAuthState = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "dashwise_auth",
      JSON.stringify({
        isAuthenticated: true,
        user,
        timestamp: Date.now(),
      }),
    )
  }
}

// Get authentication state
export const getAuthState = () => {
  if (typeof window !== "undefined") {
    const authData = localStorage.getItem("dashwise_auth")
    if (authData) {
      try {
        return JSON.parse(authData)
      } catch (e) {
        return { isAuthenticated: false }
      }
    }
  }
  return { isAuthenticated: false }
}

// Clear authentication state
export const clearAuthState = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dashwise_auth")
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const authState = getAuthState()
  return authState.isAuthenticated === true
}
