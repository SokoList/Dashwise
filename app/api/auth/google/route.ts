import { type NextRequest, NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"

// Initialize the OAuth client with your Google Client ID
const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export async function POST(request: NextRequest) {
  try {
    // Extract the token from the request body
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Extract user information from the payload
    const userId = payload.sub
    const email = payload.email
    const name = payload.name
    const givenName = payload.given_name
    const familyName = payload.family_name
    const picture = payload.picture
    const emailVerified = payload.email_verified

    // In a real application, you would:
    // 1. Check if the user exists in your database
    // 2. Create the user if they don't exist
    // 3. Create a session or JWT token for authentication

    // For demonstration purposes, we'll create a simple session
    // In a real app, you'd use a more secure method like JWT or a session library

    // Create a simple session object
    const session = {
      user: {
        id: userId,
        email,
        name,
        givenName,
        familyName,
        picture,
        emailVerified,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    }

    // Return the session information
    return NextResponse.json({
      success: true,
      session,
    })
  } catch (error: any) {
    console.error("Token verification error:", error)

    // Return appropriate error response
    return NextResponse.json(
      {
        error: "Authentication failed",
        message: error.message,
      },
      { status: 401 },
    )
  }
}
