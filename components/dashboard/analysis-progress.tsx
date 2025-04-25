"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, BarChart2, FileText, Brain, Lightbulb } from "lucide-react"

interface AnalysisProgressProps {
  isAnalyzing: boolean
  progress: number // 0 to 100
}

export function AnalysisProgress({ isAnalyzing, progress }: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    { id: 0, name: "Processing file", icon: FileText, description: "Extracting data from your dashboard..." },
    { id: 1, name: "Analyzing metrics", icon: BarChart2, description: "Identifying key metrics and trends..." },
    { id: 2, name: "Generating insights", icon: Brain, description: "Discovering patterns and anomalies..." },
    {
      id: 3,
      name: "Creating recommendations",
      icon: Lightbulb,
      description: "Formulating strategic recommendations...",
    },
  ]

  useEffect(() => {
    if (!isAnalyzing) return

    // Simulate step progression based on progress
    if (progress < 25) {
      setCurrentStep(0)
    } else if (progress < 50) {
      setCurrentStep(1)
    } else if (progress < 75) {
      setCurrentStep(2)
    } else {
      setCurrentStep(3)
    }
  }, [isAnalyzing, progress])

  if (!isAnalyzing) return null

  return (
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
            {steps.map((step) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isComplete = currentStep > step.id

              return (
                <div key={step.id} className="flex items-start gap-3">
                  <div
                    className={`rounded-full p-1.5 ${isComplete ? "bg-green-100" : isActive ? "bg-blue-100" : "bg-slate-100"}`}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    ) : (
                      <StepIcon className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${isComplete ? "text-green-600" : isActive ? "text-blue-600" : "text-slate-500"}`}
                    >
                      {step.name}
                    </p>
                    {isActive && <p className="text-sm text-slate-500">{step.description}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
