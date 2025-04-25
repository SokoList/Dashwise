"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, BarChart2, Lightbulb, Brain, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Upload Your Dashboard",
      description: "Drop a screenshot from Power BI, Tableau, Looker, or any tool.",
      component: (
        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-slate-200 hover:border-primary/50">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium">Drag & drop your dashboard or click to browse</p>
            <p className="text-xs text-slate-500">
              Supports images (PNG, JPG), PDF, Excel (XLSX, XLS), and PowerPoint (PPTX, PPT)
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Let Dashwise Analyze",
      description: "The AI extracts insights, trends, and suggested actions—automatically.",
      component: (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Analyzing your dashboard...</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 font-medium">Processing file</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-blue-100">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Generating insights</p>
                    <p className="text-xs text-slate-500">Discovering patterns and anomalies...</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Lead With Clarity",
      description: "Show up with the summary, the questions, and the plan—without touching a spreadsheet.",
      component: (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Executive Summary</CardTitle>
            <CardDescription className="text-xs">Key insights from your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="mb-2">
              The Western region is exceeding targets by 18%, driven primarily by strong electronics sales. The Southern
              region is 15% below target, with particularly weak performance in the Furniture category.
            </p>
            <Button size="sm" className="w-full mt-2">
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            From screenshot to strategy in seconds:
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 p-4 text-primary mb-4 self-center">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">{step.description}</p>
                  <div className="mt-auto">{step.component}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
