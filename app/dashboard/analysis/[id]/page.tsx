"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Download, Star, Share2, Loader2 } from "lucide-react"
import Link from "next/link"
import type { AnalysisResult } from "@/lib/analysis-service"

// Mock data for demonstration purposes
const mockAnalyses: Record<string, AnalysisResult> = {
  "1": {
    executiveSummary: `This Q1 Sales Dashboard provides a comprehensive overview of sales performance across different regions and product categories. The data shows strong performance in the Western region, particularly in the Electronics category, while the Southern region is underperforming compared to targets. Overall revenue is trending upward with a 12% increase compared to the previous quarter.

Key metrics indicate positive momentum:
• Total Revenue: $1.2M (↑12% QoQ)
• Units Sold: 8,450 (↑8% QoQ)
• Average Order Value: $142 (↑4% QoQ)
• Customer Acquisition Cost: $38 (↓5% QoQ)

The dashboard highlights several areas of interest that warrant further investigation, including the significant performance gap between regions and the growing importance of mobile sales channels.`,
    keyInsights: [
      {
        title: "Western Region Outperforming",
        data: "The Western region is exceeding targets by 18%, driven primarily by strong electronics sales.",
        category: "Regional Performance",
        source: "Regional Sales Chart",
      },
      {
        title: "Southern Region Needs Attention",
        data: "The Southern region is 15% below target, with particularly weak performance in the Furniture category.",
        category: "Regional Performance",
        source: "Regional Sales Chart",
      },
      {
        title: "Mobile Orders Increasing",
        data: "Orders from mobile devices have increased by 23%, suggesting a need to optimize the mobile shopping experience.",
        category: "Channel Performance",
        source: "Sales by Channel Chart",
      },
    ],
    strategicQuestions: [
      {
        question: "What factors are driving Western region success?",
        context: "Understanding the specific strategies and market conditions could help replicate success elsewhere.",
        category: "Strategy",
      },
      {
        question: "Why is the Southern region underperforming in Furniture?",
        context: "Is this due to pricing, competition, regional preferences, or operational issues?",
        category: "Operations",
      },
      {
        question: "How can we optimize the mobile shopping experience?",
        context: "With mobile orders increasing by 23%, what specific improvements would have the biggest impact?",
        category: "Digital",
      },
    ],
    recommendations: [
      {
        action: "Invest in Western region electronics marketing",
        rationale:
          "Increase marketing budget allocation for electronics in the Western region by 15% to capitalize on strong performance.",
        risk: "May divert resources from other regions that need improvement",
      },
      {
        action: "Review Southern region furniture pricing strategy",
        rationale: "Conduct competitive analysis and consider regional pricing adjustments to improve performance.",
        risk: "Price adjustments could impact margins",
      },
      {
        action: "Optimize mobile checkout process",
        rationale:
          "Streamline the mobile checkout flow to reduce cart abandonment and capitalize on increasing mobile traffic.",
        risk: "Development resources required",
      },
    ],
    dataDiscovery: [
      {
        data: "Customer Segmentation Data",
        location:
          "Additional customer segmentation data would help identify which customer groups are driving the increase in mobile orders.",
      },
      {
        data: "Competitor Pricing in Southern Region",
        location:
          "Gathering data on competitor pricing in the Southern region would help understand the furniture category underperformance.",
      },
      {
        data: "Marketing Campaign Performance",
        location:
          "Analyzing the performance of recent marketing campaigns by region would provide insights into the Western region's success.",
      },
    ],
  },
  // Add more mock analyses for other IDs if needed
}

export default function AnalysisDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("summary")
  const [isSaved, setIsSaved] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Mock data - in a real app, you would fetch this based on the ID
  const analysisMetadata = {
    id: params.id,
    title:
      params.id === "1"
        ? "Q1 Sales Dashboard"
        : params.id === "2"
          ? "Marketing Campaign Performance"
          : "Customer Retention Analysis",
    date: "April 15, 2025",
    type: params.id === "1" ? "PowerBI" : params.id === "2" ? "Google Analytics" : "Excel",
    imageUrl: `/placeholder.svg?height=300&width=600&query=${params.id === "1" ? "Sales" : params.id === "2" ? "Marketing" : "Customer"} Dashboard`,
  }

  useEffect(() => {
    // In a real app, you would fetch the analysis from an API
    // For now, we'll use mock data
    setAnalysis(mockAnalyses[params.id] || null)
  }, [params.id])

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
            <h1 className="text-2xl font-bold tracking-tight">{analysisMetadata.title}</h1>
            <p className="text-slate-500">
              {analysisMetadata.type} • {analysisMetadata.date}
            </p>
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm text-slate-500">Original Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="aspect-video bg-slate-100 rounded-md overflow-hidden">
            <img
              src={analysisMetadata.imageUrl || "/placeholder.svg"}
              alt={`${analysisMetadata.title} dashboard`}
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {analysis ? (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Here's what we found in your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="discovery">Discovery</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="summary" className="space-y-4">
                  <h3 className="text-lg font-medium">Executive Summary</h3>
                  <div className="prose max-w-none">{formatExecutiveSummary(analysis.executiveSummary)}</div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <div className="space-y-4">
                    {analysis.keyInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <h3 className="text-lg font-medium text-blue-700">{insight.title}</h3>
                        <p className="text-blue-600 mt-1">{insight.data}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-blue-500">
                          <span className="bg-blue-100 px-2 py-0.5 rounded">{insight.category}</span>
                          <span>Source: {insight.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="space-y-4">
                  <div className="space-y-4">
                    {analysis.strategicQuestions.map((question, index) => (
                      <div key={index} className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                        <h3 className="text-lg font-medium text-purple-700">{question.question}</h3>
                        <p className="text-purple-600 mt-1">{question.context}</p>
                        <div className="mt-2 text-xs">
                          <span className="bg-purple-100 text-purple-500 px-2 py-0.5 rounded">{question.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="space-y-4">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="p-4 bg-green-50 border border-green-100 rounded-lg">
                        <h3 className="text-lg font-medium text-green-700">{recommendation.action}</h3>
                        <p className="text-green-600 mt-1">{recommendation.rationale}</p>
                        <div className="mt-2 text-xs">
                          <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded">
                            Risk: {recommendation.risk}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="discovery" className="space-y-4">
                  <div className="space-y-4">
                    {analysis.dataDiscovery.map((discovery, index) => (
                      <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <h3 className="text-lg font-medium">{discovery.data}</h3>
                        <p className="text-slate-600 mt-1">{discovery.location}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-slate-100 p-3 mb-4">
                <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
              </div>
              <h3 className="text-lg font-medium">Loading analysis...</h3>
              <p className="text-slate-500 mt-2">Please wait while we retrieve the analysis details.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
