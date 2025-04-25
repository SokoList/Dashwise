/**
 * Service for handling dashboard analysis
 */

export interface AnalysisResult {
  executiveSummary: string
  keyInsights: Array<{
    title: string
    data: string
    category: string
    source: string
  }>
  strategicQuestions: Array<{
    question: string
    context: string
    category: string
  }>
  recommendations: Array<{
    action: string
    rationale: string
    risk: string
  }>
  dataDiscovery: Array<{
    data: string
    location: string
  }>
}

export interface AnalysisDebugInfo {
  rawResponse?: string
}

export interface AnalysisResponse {
  analysis: AnalysisResult
  debug?: AnalysisDebugInfo
}

// Function to optimize file before sending to API
async function optimizeFile(file: File): Promise<File> {
  // For now, we'll just return the original file
  // In a real app, you might want to resize or compress the file
  return file
}

export async function testAIConnection(): Promise<{ status: string; message: string; response?: string }> {
  try {
    const response = await fetch("/api/test-ai", {
      method: "GET",
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error testing AI connection:", error)
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Update the analyzeDashboard function to remove the test connection check that might be causing issues
// and improve error handling to be more transparent

// Replace the analyzeDashboard function with this updated version:
export async function analyzeDashboard(file: File, context?: string, debug = true): Promise<AnalysisResponse> {
  try {
    // Check if the file type is supported
    const supportedTypes = [
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

    if (!supportedTypes.includes(file.type)) {
      throw new Error(`Unsupported file type: ${file.type}`)
    }

    // Optimize the file before sending it
    const optimizedFile = await optimizeFile(file)

    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("image", optimizedFile)

    if (context) {
      formData.append("context", context)
    }

    // Add debug flag
    if (debug) {
      formData.append("debug", "true")
    }

    console.log(`Sending file: ${optimizedFile.name}, type: ${optimizedFile.type}, size: ${optimizedFile.size} bytes`)

    // Send the request directly without testing the connection first
    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || errorData.details || `Server responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.analysis) {
      throw new Error("No analysis data returned from server")
    }

    // Ensure all arrays exist to prevent mapping errors
    const analysis = {
      ...data.analysis,
      keyInsights: data.analysis.keyInsights || [],
      strategicQuestions: data.analysis.strategicQuestions || [],
      recommendations: data.analysis.recommendations || [],
      dataDiscovery: data.analysis.dataDiscovery || [],
    }

    return {
      analysis,
      debug: data.debug,
    }
  } catch (error) {
    console.error("Error in analyzeDashboard:", error)
    throw error
  }
}
