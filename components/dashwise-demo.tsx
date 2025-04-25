"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Upload, BarChart, CheckCircle, FileText, Brain, Lightbulb } from "lucide-react"
import { UploadZone } from "@/components/dashboard/upload-zone"

export function DashwiseDemo() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isVisible, setIsVisible] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Simulate progress when on analyze tab
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (activeTab === "analyze") {
      let progress = 0
      interval = setInterval(() => {
        progress += 5
        if (progress > 90) {
          clearInterval(interval as NodeJS.Timeout)
          setDemoProgress(90)
        } else {
          setDemoProgress(progress)
        }
      }, 300)
    } else if (activeTab === "act") {
      setDemoProgress(100)
    } else {
      setDemoProgress(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeTab])

  return (
    <section className="py-20 bg-white" id="demo">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">HOW IT WORKS</h2>
          <p className="mt-4 text-gray-500 md:text-xl">From chart to smart—how Dashwise helps you win</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-5xl rounded-xl border bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-xl font-semibold">Dashboard Analysis</h3>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Copy className="h-4 w-4" />
              Copy Analysis
            </Button>
          </div>

          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-50 p-0 h-auto">
              <TabsTrigger
                value="upload"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <Upload className="h-4 w-4" />
                1. Upload
              </TabsTrigger>
              <TabsTrigger
                value="analyze"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <BarChart className="h-4 w-4" />
                2. Analyze
              </TabsTrigger>
              <TabsTrigger
                value="act"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                3. Act
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="upload" className="p-6">
                  <UploadTab />
                </TabsContent>
                <TabsContent value="analyze" className="p-6">
                  <AnalyzeTab progress={demoProgress} />
                </TabsContent>
                <TabsContent value="act" className="p-6">
                  <ActTab />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

function UploadTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <Upload className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Upload</h3>
          <p className="text-sm text-gray-500">Drop in a screenshot or export of your dashboard.</p>
        </div>
      </div>

      {/* Actual upload zone from the dashboard */}
      <UploadZone onFileUpload={() => {}} isUploading={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-lg p-6 border">
          <h4 className="text-lg font-medium mb-4">Supported Formats</h4>
          <ul className="space-y-2 list-disc pl-5">
            <li className="text-gray-700">Dashboard screenshots (PNG, JPG)</li>
            <li className="text-gray-700">PDF exports</li>
            <li className="text-gray-700">Excel files (XLSX, XLS)</li>
            <li className="text-gray-700">PowerPoint (PPTX, PPT)</li>
          </ul>
        </div>
        <div className="bg-slate-50 rounded-lg p-6 border">
          <h4 className="text-lg font-medium mb-4">Compatible With</h4>
          <ul className="space-y-2 list-disc pl-5">
            <li className="text-gray-700">PowerBI</li>
            <li className="text-gray-700">Excel</li>
            <li className="text-gray-700">Tableau</li>
            <li className="text-gray-700">Qlik</li>
            <li className="text-gray-700">Google Analytics</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function AnalyzeTab({ progress }: { progress: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
          <BarChart className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Analyze</h3>
          <p className="text-sm text-gray-500">Dashwise AI breaks it down into insights + next steps.</p>
        </div>
      </div>

      {/* Actual analysis progress component from the dashboard */}
      <Card className="mt-4">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Analyzing your dashboard...</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 0,
                  name: "Processing file",
                  icon: FileText,
                  description: "Extracting data from your dashboard...",
                  isActive: progress < 25,
                  isComplete: progress >= 25,
                },
                {
                  id: 1,
                  name: "Analyzing metrics",
                  icon: BarChart,
                  description: "Identifying key metrics and trends...",
                  isActive: progress >= 25 && progress < 50,
                  isComplete: progress >= 50,
                },
                {
                  id: 2,
                  name: "Generating insights",
                  icon: Brain,
                  description: "Discovering patterns and anomalies...",
                  isActive: progress >= 50 && progress < 75,
                  isComplete: progress >= 75,
                },
                {
                  id: 3,
                  name: "Creating recommendations",
                  icon: Lightbulb,
                  description: "Formulating strategic recommendations...",
                  isActive: progress >= 75,
                  isComplete: progress >= 95,
                },
              ].map((step) => {
                const StepIcon = step.icon
                return (
                  <div key={step.id} className="flex items-start gap-3">
                    <div
                      className={`rounded-full p-1.5 ${step.isComplete ? "bg-green-100" : step.isActive ? "bg-blue-100" : "bg-slate-100"}`}
                    >
                      {step.isComplete ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : step.isActive ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <StepIcon className="h-5 w-5 text-blue-600" />
                        </motion.div>
                      ) : (
                        <StepIcon className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${step.isComplete ? "text-green-600" : step.isActive ? "text-blue-600" : "text-slate-500"}`}
                      >
                        {step.name}
                      </p>
                      {step.isActive && <p className="text-sm text-slate-500">{step.description}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ActTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-500">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Act</h3>
          <p className="text-sm text-gray-500">
            Copy what matters. Ask the right questions. Look like the smartest person in the room.
          </p>
        </div>
      </div>

      {/* Actual analysis results UI from the dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <CardDescription>Key insights from your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="prose">
          <p>
            This Q1 Sales Dashboard provides a comprehensive overview of sales performance across different regions and
            product categories. The data shows strong performance in the Western region, particularly in the Electronics
            category, while the Southern region is underperforming compared to targets. Overall revenue is trending
            upward with a 12% increase compared to the previous quarter.
          </p>
          <p>Key metrics indicate positive momentum:</p>
          <ul>
            <li>Total Revenue: $1.2M (↑12% QoQ)</li>
            <li>Units Sold: 8,450 (↑8% QoQ)</li>
            <li>Average Order Value: $142 (↑4% QoQ)</li>
            <li>Customer Acquisition Cost: $38 (↓5% QoQ)</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-blue-700">Western Region Outperforming</h4>
            <p className="text-blue-600 mt-1">
              The Western region is exceeding targets by 18%, driven primarily by strong electronics sales.
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-blue-500">
              <span className="bg-blue-100 px-2 py-0.5 rounded">Regional Performance</span>
              <span>Source: Regional Sales Chart</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-purple-700">What factors are driving Western region success?</h4>
            <p className="text-purple-600 mt-1">
              Understanding the specific strategies and market conditions could help replicate success elsewhere.
            </p>
            <div className="mt-2 text-xs">
              <span className="bg-purple-100 text-purple-500 px-2 py-0.5 rounded">Strategy</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
