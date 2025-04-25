"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadZone } from "@/components/dashboard/upload-zone"
import { Loader2, ArrowLeft, FileText, FileSpreadsheet, FileIcon as FilePresentation, ImageIcon } from "lucide-react"
import Link from "next/link"
import { analyzeDashboard, type AnalysisResult } from "@/lib/analysis-service"
import { useRouter } from "next/navigation"
import { AnalysisProgress } from "@/components/dashboard/analysis-progress"
import { Input } from "@/components/ui/input"

export default function NewAnalysisPage() {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [context, setContext] = useState("")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setError(null)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAnalyzing) {
      // Simulate progress for better UX
      interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          // Slow down as we approach 90%
          const increment = prev < 50 ? 5 : prev < 80 ? 3 : 1
          const newProgress = Math.min(prev + increment, 90)
          return newProgress
        })
      }, 500)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAnalyzing])

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setError(null)

    try {
      // Create a temporary URL for the uploaded file to display in the results
      const imageUrl = URL.createObjectURL(uploadedFile)
      sessionStorage.setItem("originalImageUrl", imageUrl)

      const result = await analyzeDashboard(uploadedFile, context)
      setAnalysisResult(result.analysis)

      // Complete the progress bar
      setAnalysisProgress(100)

      // Store the result in sessionStorage temporarily
      sessionStorage.setItem("latestAnalysis", JSON.stringify(result.analysis))

      // If there's debug info, store it
      if (result.debug?.rawResponse) {
        sessionStorage.setItem("debugInfo", result.debug.rawResponse)
      }

      // Short delay before redirecting to show 100% completion
      setTimeout(() => {
        // Navigate to the analysis result page
        router.push("/dashboard/analysis/new")
      }, 500)
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze dashboard")
      setIsAnalyzing(false)
      setAnalysisProgress(0)
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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">New Analysis</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Dashboard</CardTitle>
          <CardDescription>Upload a screenshot, document, or spreadsheet from your dashboard tool</CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedFile ? (
            <UploadZone onFileUpload={handleFileUpload} isUploading={isUploading} />
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
                  className="h-10"
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

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
              )}

              {/* Analysis Progress */}
              <AnalysisProgress isAnalyzing={isAnalyzing} progress={analysisProgress} />
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
    </div>
  )
}
