"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome"
import { RecentAnalyses } from "@/components/dashboard/recent-analyses"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  FileText,
  AlertCircle,
  Info,
  FileSpreadsheet,
  FileIcon as FilePresentation,
  ImageIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { analyzeDashboard } from "@/lib/analysis-service"

// Import the ApiKeyTester component
import { ApiKeyTester } from "@/components/dashboard/api-key-tester"

export default function DashboardPage() {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [context, setContext] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStage, setAnalysisStage] = useState("")

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setError(null)
    setDebugInfo(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  // Update the handleAnalyze function to ensure it properly handles the analysis process

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setError(null)
    setDebugInfo(null)
    setAnalysisProgress(0)
    setAnalysisStage("Preparing dashboard for analysis...")

    // Simulate progressive analysis stages
    const simulateAnalysisProgress = () => {
      const stages = [
        "Preparing dashboard for analysis...",
        "Detecting charts and tables...",
        "Extracting data points...",
        "Identifying trends and patterns...",
        "Generating insights...",
        "Formulating recommendations...",
        "Finalizing analysis...",
      ]

      let currentStage = 0
      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setAnalysisStage(stages[currentStage])
          setAnalysisProgress(Math.min(95, Math.round(((currentStage + 1) / stages.length) * 100)))
          currentStage++
        } else {
          clearInterval(interval)
        }
      }, 800)

      return interval
    }

    const progressInterval = simulateAnalysisProgress()

    try {
      console.log("Starting dashboard analysis...")

      // Create a temporary URL for the uploaded file to display in the results
      const imageUrl = URL.createObjectURL(uploadedFile)
      sessionStorage.setItem("originalImageUrl", imageUrl)
      console.log("Image URL stored in session storage")

      // Clear any previous analysis results
      sessionStorage.removeItem("latestAnalysis")
      sessionStorage.removeItem("debugInfo")

      // Enable debug mode
      console.log("Calling analyzeDashboard with file:", uploadedFile.name)
      const result = await analyzeDashboard(uploadedFile, context, true)
      console.log("Analysis completed successfully")

      // Clear the interval when analysis is complete
      clearInterval(progressInterval)
      setAnalysisProgress(100)
      setAnalysisStage("Analysis complete!")

      // Store the result in sessionStorage
      console.log("Storing analysis result in session storage")
      sessionStorage.setItem("latestAnalysis", JSON.stringify(result.analysis))

      // If there's debug info, store it
      if (result.debug?.rawResponse) {
        sessionStorage.setItem("debugInfo", result.debug.rawResponse)
        console.log("Debug info stored in session storage")
      }

      // Short delay to show 100% completion before navigating
      setTimeout(() => {
        // Navigate to the analysis result page
        console.log("Navigating to analysis result page")
        router.push(`/dashboard/analysis/new`)
      }, 500)
    } catch (err) {
      // Clear the interval if there's an error
      clearInterval(progressInterval)

      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze dashboard")
      setIsAnalyzing(false)
    }
  }

  // Function to validate if the file is supported
  const isValidFileType = (file: File): boolean => {
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
    return supportedTypes.includes(file.type)
  }

  // Function to check if the file size is within limits
  const isValidSize = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    return file.size <= maxSize
  }

  // Function to get file type icon
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    } else if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />
    } else if (
      file.type === "application/vnd.ms-powerpoint" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      return <FilePresentation className="h-5 w-5 text-orange-500" />
    }
    return <FileText className="h-5 w-5 text-blue-500" />
  }

  // Function to get file type name
  const getFileTypeName = (file: File): string => {
    if (file.type.startsWith("image/")) {
      return "Image"
    } else if (file.type === "application/pdf") {
      return "PDF"
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return "Excel"
    } else if (
      file.type === "application/vnd.ms-powerpoint" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      return "PowerPoint"
    }
    return "File"
  }

  return (
    <div className="space-y-6">
      <DashboardWelcome />

      <ApiKeyTester />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload Dashboard</CardTitle>
          <CardDescription>Upload a dashboard screenshot, document, or spreadsheet for AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedFile ? (
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("dashboard-upload")?.click()}
            >
              <input
                type="file"
                id="dashboard-upload"
                onChange={handleFileInputChange}
                accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">Drag & drop your dashboard or click to browse</p>
                <p className="text-xs text-slate-500">
                  Supports images (PNG, JPG), PDF, Excel (XLSX, XLS), and PowerPoint (PPTX, PPT)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getFileIcon(uploadedFile)}
                <span className="font-medium">{uploadedFile.name}</span>
                <span className="text-slate-500">({Math.round(uploadedFile.size / 1024)} KB)</span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">
                  {getFileTypeName(uploadedFile)}
                </span>

                {/* Show warnings for invalid files */}
                {!isValidFileType(uploadedFile) && <span className="text-red-500 text-xs">Unsupported file type</span>}
                {!isValidSize(uploadedFile) && <span className="text-red-500 text-xs">File too large (max 10MB)</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="context" className="text-sm font-medium">
                  Additional Context (Optional)
                </label>
                <Input
                  id="context"
                  placeholder="Add any additional context about this dashboard (e.g., KPIs, business goals)"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setUploadedFile(null)} disabled={isAnalyzing}>
                  Change File
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !isValidFileType(uploadedFile) || !isValidSize(uploadedFile)}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Dashboard"
                  )}
                </Button>
              </div>

              {/* Analysis Progress Indicator */}
              {isAnalyzing && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{analysisStage}</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Analysis Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {debugInfo && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-600 text-sm flex items-start gap-2">
                  <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Debug Information</p>
                    <p className="whitespace-pre-wrap">{debugInfo}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Tips in small print under the tool */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-2">Quick Tips:</p>
            <ul className="space-y-1 text-xs text-slate-500">
              <li className="flex items-start gap-1.5">
                <span>•</span>
                <span>For images: Upload clear, high-resolution screenshots for best results</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span>•</span>
                <span>For Excel: Make sure your data is well-structured with clear headers</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span>•</span>
                <span>For PDF/PowerPoint: Ensure charts and tables are clearly visible</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span>•</span>
                <span>Add context about your KPIs for more targeted insights</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <RecentAnalyses />
    </div>
  )
}
