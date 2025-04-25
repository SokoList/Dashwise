import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Enable more detailed logging
const ENABLE_DETAILED_LOGGING = true

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

// Supported file formats
const SUPPORTED_FORMATS = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  // PDFs
  "application/pdf",
  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // PowerPoint
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]

export async function POST(req: NextRequest) {
  try {
    console.log("API route called: /api/analyze")

    // Get the form data from the request
    const formData = await req.formData()
    const file = formData.get("image") as File | null
    const context = formData.get("context") as string | null
    const debug = formData.get("debug") === "true"

    // Validate file
    if (!file) {
      console.error("No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      console.error(`File too large: ${file.size} bytes`)
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 })
    }

    // Check file type
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      console.error(`Unsupported file format: ${file.type}`)
      return NextResponse.json(
        {
          error: `Unsupported file format: ${file.type}. Supported formats include images, PDF, Excel, and PowerPoint.`,
        },
        { status: 400 },
      )
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`)

    // Convert the file to a base64 string
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64File = buffer.toString("base64")

    // Verify the base64 string is valid
    if (!base64File || base64File.length === 0) {
      console.error("Failed to convert file to base64")
      return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
    }

    // Log the first 100 characters of the base64 string to verify it's valid
    console.log(`Base64 file (first 100 chars): ${base64File.substring(0, 100)}...`)

    // Verify OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY environment variable is not set")
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    // Log that we found the key (without exposing it)
    console.log("OpenAI API key found, proceeding with analysis")

    // Create the system prompt for the AI model based on file type
    let systemPrompt = `
      You are a Dashboard Analysis Specialist. Your task is to convert dashboard data into clear, comprehensive business insights.
      
      IMPORTANT: You MUST respond with ONLY valid JSON in the exact format specified below. Do not include any explanations, apologies, or text outside of the JSON structure.
      
      OUTPUT FORMAT:
      You MUST respond with a JSON object containing these exact keys:
      {
        "executiveSummary": "300-500 word comprehensive analysis",
        "keyInsights": [
          {
            "title": "Insight title",
            "data": "Insight data",
            "category": "Insight category",
            "source": "Source in the dashboard"
          }
        ],
        "strategicQuestions": [
          {
            "question": "Strategic question",
            "context": "Question context",
            "category": "Question category"
          }
        ],
        "recommendations": [
          {
            "action": "Recommended action",
            "rationale": "Action rationale",
            "risk": "Risk level"
          }
        ],
        "dataDiscovery": [
          {
            "data": "Additional data needed",
            "location": "Where to find it"
          }
        ]
      }
    `

    // Add file-type specific instructions
    if (file.type.startsWith("image/")) {
      systemPrompt += `
        VISUAL PROCESSING STEPS:
        1. Read all numerical values with precision
        2. Identify chart types (bar charts, line graphs, pie charts, tables)
        3. Read all text elements: titles, labels, legends, annotations
        4. Note scales, units, and time periods
        5. Identify color-coding schemes and their meanings
        6. Look for trends, patterns, outliers, and relationships
      `
    } else if (file.type === "application/pdf") {
      systemPrompt += `
        PDF PROCESSING STEPS:
        1. Extract all text content from the PDF
        2. Identify tables, charts, and graphs
        3. Read all numerical values and metrics
        4. Identify key performance indicators (KPIs)
        5. Look for trends, patterns, and outliers
        6. Analyze executive summaries and conclusions
      `
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      systemPrompt += `
        EXCEL PROCESSING STEPS:
        1. Identify all sheets and their purposes
        2. Analyze data tables, headers, and structures
        3. Identify formulas and calculations
        4. Look for trends, patterns, and outliers in numerical data
        5. Analyze any charts or visualizations
        6. Identify key metrics and KPIs
      `
    } else if (
      file.type === "application/vnd.ms-powerpoint" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      systemPrompt += `
        POWERPOINT PROCESSING STEPS:
        1. Extract all text content from slides
        2. Identify key messages and takeaways
        3. Analyze charts, graphs, and tables
        4. Identify metrics and KPIs
        5. Look for trends, patterns, and insights
        6. Analyze conclusions and recommendations
      `
    }

    // Prepare the user message text with more explicit instructions
    const fileType = file.type.split("/")[1].toUpperCase()
    const userMessageText = `
      Analyze this ${fileType} dashboard in detail. 
      ${context ? `Additional context: ${context}` : ""}
      
      This is a dashboard that needs to be analyzed. Extract all metrics, trends, and insights visible in the file.
      Remember to respond ONLY with the JSON format specified in the system instructions.
    `

    console.log("Sending request to OpenAI...")

    try {
      // Call the OpenAI API with the file
      console.log("Sending request to OpenAI with image data...")
      if (ENABLE_DETAILED_LOGGING) {
        console.log(`Image type: ${file.type}, size: ${base64File.length} characters`)
        console.log("Using OpenAI API key:", process.env.OPENAI_API_KEY ? "Key is present" : "Key is missing")
      }

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: userMessageText,
        images: [`data:${file.type};base64,${base64File}`],
        temperature: 0.1, // Lower temperature for more consistent JSON output
        max_tokens: 4000, // Ensure we have enough tokens for a complete response
      })

      console.log(`Received response from OpenAI (length: ${text.length})`)

      // Log the first part of the response for debugging
      if (ENABLE_DETAILED_LOGGING) {
        console.log(`Response preview: ${text.substring(0, 300)}...`)
      }

      // Parse the response as JSON
      let analysisResult
      try {
        // Try to extract JSON from the response if it's not pure JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        const jsonString = jsonMatch ? jsonMatch[0] : text

        console.log("Attempting to parse JSON...")
        analysisResult = JSON.parse(jsonString)
        console.log("JSON parsed successfully")
      } catch (error) {
        console.error("Failed to parse AI response as JSON:", error)
        console.error("AI response:", text.substring(0, 500) + "...") // Log more of the response

        // Create a fallback response
        analysisResult = {
          executiveSummary:
            "The AI was unable to generate a proper JSON response. This might be because the file is too complex to analyze or in a format that's difficult to process.",
          keyInsights: [
            {
              title: "Analysis Error",
              data: "The AI model did not return data in the expected format",
              category: "Error",
              source: "AI Processing",
            },
          ],
          strategicQuestions: [
            {
              question: "Is this a valid dashboard file?",
              context: "The file may not contain dashboard data or may be in a format that's difficult to process",
              category: "Verification",
            },
          ],
          recommendations: [
            {
              action: "Try uploading a different file format",
              rationale: "A different format might yield better analysis results",
              risk: "Low",
            },
            {
              action: "Ensure the file contains clear data visualizations",
              rationale: "The AI is designed to analyze dashboard elements like charts and tables",
              risk: "Low",
            },
          ],
          dataDiscovery: [
            {
              data: "Dashboard file",
              location: "Please provide a clear dashboard file with visible data",
            },
          ],
        }
      }

      // If debug mode is enabled, include the raw response
      const response = {
        analysis: analysisResult,
        ...(debug && { debug: { rawResponse: text.substring(0, 1000) } }),
      }

      return NextResponse.json(response)
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json(
        {
          error: `OpenAI API error: ${openaiError instanceof Error ? openaiError.message : String(openaiError)}`,
          details: "There was an error communicating with the AI service. Please try again later.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing dashboard:", error)
    return NextResponse.json(
      { error: `Failed to analyze dashboard: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}
