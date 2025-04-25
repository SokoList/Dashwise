"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Download, Star, Share2, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { AnalysisResult } from "@/lib/analysis-service"
import { useRouter } from "next/navigation"

export default function NewAnalysisPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("summary")
  const [isSaved, setIsSaved] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)

  useEffect(() => {
    // Get the analysis result from sessionStorage
    const storedAnalysis = sessionStorage.getItem("latestAnalysis")
    const storedDebugInfo = sessionStorage.getItem("debugInfo")
    const storedImageUrl = sessionStorage.getItem("originalImageUrl")

    if (storedAnalysis) {
      try {
        console.log("Found stored analysis, parsing...")
        const parsedAnalysis = JSON.parse(storedAnalysis)
        setAnalysis(parsedAnalysis)
        console.log("Analysis loaded successfully:", parsedAnalysis)
      } catch (error) {
        console.error("Failed to parse stored analysis:", error)
        setError("Failed to load analysis results. Please try again.")
      }
    } else {
      console.error("No analysis results found in session storage")
      setError("No analysis results found. Please upload a dashboard to analyze.")
    }

    if (storedDebugInfo) {
      setDebugInfo(storedDebugInfo)
    }

    // Use the stored image URL or fallback to a placeholder
    if (storedImageUrl) {
      console.log("Using stored image URL:", storedImageUrl)
      setOriginalImage(storedImageUrl)
    } else {
      console.log("No stored image URL found, using placeholder")
      setOriginalImage("/data-driven-insights.png")
    }

    setIsLoading(false)
  }, [])

  const handleCopyToClipboard = () => {
    if (analysis) {
      navigator.clipboard
        .writeText(JSON.stringify(analysis, null, 2))
        .then(() => alert("Analysis copied to clipboard!"))
        .catch(() => alert("Failed to copy to clipboard"))
    }
  }

  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
      alert("Analysis downloaded as PDF!")
    }, 1500)
  }

  const handleToggleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    setIsSharing(true)

    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false)
      alert("Analysis shared via email!")
    }, 1500)
  }

  const handleSaveAnalysis = () => {
    alert("Analysis saved!")
    router.push("/dashboard")
  }

  const formatExecutiveSummary = (text: string) => {
    if (!text) return null

    // Split by double newlines to create paragraphs
    const paragraphs = text.split(/\n\n+/)

    return paragraphs.map((paragraph, index) => {
      // Check if this paragraph contains bullet points
      if (paragraph.includes("•")) {
        const [title, ...bullets] = paragraph.split(/\n/)
        return (
          <div key={index} className="mb-4">
            {title && <p className="mb-2">{title}</p>}
            <ul className="list-disc pl-5 space-y-1">
              {bullets.map((bullet, i) => (
                <li key={i}>{bullet.replace("•", "").trim()}</li>
              ))}
            </ul>
          </div>
        )
      }

      return (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm font-medium">Loading analysis...</p>
        </div>
      </div>
    )
  }

  if (error || !analysis) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Analysis Error</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-red-100 p-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium">Analysis Failed</h3>
              <p className="text-slate-500 mt-2">
                {error || "We couldn't load the analysis results. Please try uploading your dashboard again."}
              </p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if any of the required sections are missing or empty
  const hasKeyInsights = analysis.keyInsights && analysis.keyInsights.length > 0
  const hasQuestions = analysis.strategicQuestions && analysis.strategicQuestions.length > 0
  const hasRecommendations = analysis.recommendations && analysis.recommendations.length > 0
  const hasDiscovery = analysis.dataDiscovery && analysis.dataDiscovery.length > 0

  // Check if we got the default error response
  const isErrorResponse =
    analysis.executiveSummary.includes("Unable to analyze the dashboard image") &&
    hasKeyInsights &&
    analysis.keyInsights[0].title === "Analysis not possible"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Analysis</h1>
            <p className="text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleSave}
            className={
              isSaved ? "text-yellow-500 border-yellow-200 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-600" : ""
            }
          >
            <Star className="mr-2 h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} disabled={isSharing}>
            {isSharing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sharing...
              </>
            ) : (
              <>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Original Dashboard Image */}
      {originalImage && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm text-slate-500">Original Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="aspect-video bg-slate-100 rounded-md overflow-hidden">
              <img
                src={originalImage || "/placeholder.svg"}
                alt="Original dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {isErrorResponse && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">Analysis Issues Detected</h3>
                <p className="text-amber-700 text-sm mt-1">
                  The AI had trouble analyzing your dashboard image. For better results, try:
                </p>
                <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc pl-5">
                  <li>Uploading a higher resolution image</li>
                  <li>Ensuring the dashboard elements are clearly visible</li>
                  <li>Including chart legends and labels in the screenshot</li>
                  <li>Using PNG or JPEG format for best compatibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Here's what we found in your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="insights" disabled={!hasKeyInsights}>
                Insights
              </TabsTrigger>
              <TabsTrigger value="questions" disabled={!hasQuestions}>
                Questions
              </TabsTrigger>
              <TabsTrigger value="recommendations" disabled={!hasRecommendations}>
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="discovery" disabled={!hasDiscovery}>
                Discovery
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="summary" className="space-y-4">
                <h3 className="text-lg font-medium">Executive Summary</h3>
                <div className="prose max-w-none">{formatExecutiveSummary(analysis.executiveSummary)}</div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                {hasKeyInsights ? (
                  <div className="space-y-4">
                    {analysis.keyInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-blue-50 border border-blue-100" />
                    ))}
                  </div>
                ) : (
                  <p>No key insights found.</p>
                )}
              </TabsContent>

              <TabsContent value="questions" className="space-y-4">
                {hasQuestions ? (
                  <div className="space-y-4">
                    {analysis.strategicQuestions.map((question, index) => (
                      <div key={index} className="p-4 bg-green-50 border border-green-100" />
                    ))}
                  </div>
                ) : (
                  <p>No strategic questions found.</p>
                )}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                {hasRecommendations ? (
                  <div className="space-y-4">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="p-4 bg-yellow-50 border border-yellow-100" />
                    ))}
                  </div>
                ) : (
                  <p>No recommendations found.</p>
                )}
              </TabsContent>

              <TabsContent value="discovery" className="space-y-4">
                {hasDiscovery ? (
                  <div className="space-y-4">
                    {analysis.dataDiscovery.map((discovery, index) => (
                      <div key={index} className="p-4 bg-purple-50 border border-purple-100" />
                    ))}
                  </div>
                ) : (
                  <p>No data discovery insights found.</p>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSaveAnalysis}>Save Analysis</Button>
      </div>
    </div>
  )
}
