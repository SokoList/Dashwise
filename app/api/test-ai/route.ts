import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function GET() {
  try {
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY environment variable is not set")
      return NextResponse.json(
        {
          status: "error",
          message: "OPENAI_API_KEY environment variable is not set. Please add it to your environment variables.",
        },
        { status: 500 },
      )
    }

    // Log that we found the key (without exposing it)
    console.log("OpenAI API key found, testing connection...")

    try {
      // Test the OpenAI API with a simple request
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: "Respond with 'OpenAI API is working correctly!' if you receive this message.",
        temperature: 0,
      })

      return NextResponse.json({
        status: "success",
        message: "OpenAI API is working correctly",
        response: text,
      })
    } catch (apiError) {
      console.error("OpenAI API call failed:", apiError)

      // Check for common API key issues
      const errorMessage = apiError instanceof Error ? apiError.message : String(apiError)
      let detailedMessage = errorMessage

      if (errorMessage.includes("401") || errorMessage.includes("unauthorized")) {
        detailedMessage = "Invalid API key. Please check that your API key is correct."
      } else if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
        detailedMessage = "Rate limit exceeded. Please try again later or check your OpenAI account limits."
      } else if (errorMessage.includes("insufficient_quota")) {
        detailedMessage = "Insufficient quota. Your OpenAI account may need payment information or additional credits."
      }

      return NextResponse.json(
        {
          status: "error",
          message: `OpenAI API test failed: ${detailedMessage}`,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error testing OpenAI API:", error)
    return NextResponse.json(
      {
        status: "error",
        message: `OpenAI API test failed: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
