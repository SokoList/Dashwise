import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the analyze API
  if (request.nextUrl.pathname.startsWith("/api/analyze")) {
    // Log the environment variable status without exposing the actual key
    console.log("OpenAI API key status:", process.env.OPENAI_API_KEY ? "Present" : "Missing")

    // We'll let the API route handle the error instead of blocking in middleware
    // This ensures the key is checked in the actual request context
  }

  return NextResponse.next()
}

// Only run the middleware on the analyze API route
export const config = {
  matcher: "/api/analyze/:path*",
}
