"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Zap, HelpCircle, ArrowRight } from "lucide-react"

export function FeaturesShowcase() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Watch Your Panic Transform into Preparation
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            From headache-inducing dashboards to meeting-winning insights in 30 seconds
          </p>
        </div>

        {/* Smart Summary */}
        <FeatureSection
          icon={<FileText className="h-8 w-8" />}
          title="The 60-Second Explainer"
          description="Clear, concise summaries of what's happening in your data and why it matters."
          reversed={false}
        >
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>Key insights from your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="prose">
              <p>
                "Our Western region premium sales dropped 8% this quarter because our $59 tier saw a 22% conversion
                decline after the March price increase. Meanwhile, our Eastern economy tier is up 15%, specifically in
                the mobile shopping category."
              </p>
            </CardContent>
          </Card>
        </FeatureSection>

        {/* Key Takeaways */}
        <FeatureSection
          icon={<Zap className="h-8 w-8" />}
          title="Copy-Paste These into Your Slides"
          description="Ready-to-use bullet points that highlight clear problem statements and surprise opportunities."
          reversed={true}
        >
          <div className="space-y-4">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-blue-700">Clear Problem Statement</h4>
                <p className="text-blue-600 mt-1">
                  "Premium conversions fell 22% immediately after our March price increase, while competitor BasicSoft
                  maintained their $49 pricing tier."
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-blue-500">
                  <span className="bg-blue-100 px-2 py-0.5 rounded">Regional Performance</span>
                  <span>Source: Regional Sales Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-blue-700">Surprise Opportunity Alert</h4>
                <p className="text-blue-600 mt-1">
                  "Mobile economy purchases are up 15% in Eastern region, primarily from first-time customers under 34."
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-blue-500">
                  <span className="bg-blue-100 px-2 py-0.5 rounded">Growth Opportunity</span>
                  <span>Source: Customer Demographics</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </FeatureSection>

        {/* Smart Questions */}
        <FeatureSection
          icon={<HelpCircle className="h-8 w-8" />}
          title="Questions That Make You Sound Like the CEO"
          description="Strategic questions that demonstrate your business acumen and drive meaningful discussions."
          reversed={false}
        >
          <div className="space-y-4">
            <Card className="bg-purple-50 border-purple-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-purple-700">
                  "Could we test reverting the premium tier to $49 in just the Western region for 30 days to measure
                  elasticity?"
                </h4>
                <p className="text-purple-600 mt-1">
                  Understanding price sensitivity could help optimize our pricing strategy across all regions.
                </p>
                <div className="mt-2 text-xs">
                  <span className="bg-purple-100 text-purple-500 px-2 py-0.5 rounded">Strategy</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-purple-700">
                  "What specific mobile features are driving our Eastern region success with younger customers?"
                </h4>
                <p className="text-purple-600 mt-1">
                  Identifying these features could help us replicate this success in other regions and demographics.
                </p>
                <div className="mt-2 text-xs">
                  <span className="bg-purple-100 text-purple-500 px-2 py-0.5 rounded">Product Development</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </FeatureSection>

        {/* Next Step Recommendations */}
        <FeatureSection
          icon={<ArrowRight className="h-8 w-8" />}
          title="Solutions You Can Implement Today"
          description="Actionable recommendations with specific steps you can take immediately to address issues."
          reversed={true}
        >
          <div className="space-y-4">
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-green-700">Targeted Price Test</h4>
                <p className="text-green-600 mt-1">
                  "Run a 30-day promotional reversion to $49 for Western region premium customers who abandoned carts in
                  April."
                </p>
                <div className="mt-2 text-xs">
                  <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded">
                    Risk: May set expectations for permanent price reduction
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-green-700">Capitalize on Mobile Success</h4>
                <p className="text-green-600 mt-1">
                  "Increase mobile ad spend by $12K in Eastern region targeting under-34 first-time buyers."
                </p>
                <div className="mt-2 text-xs">
                  <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded">
                    Risk: May divert resources from other marketing initiatives
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </FeatureSection>

        {/* Results Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Results from actual Dashwise users:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <Card className="bg-slate-50">
              <CardContent className="p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">6 → 25</h4>
                <p className="text-slate-700">Cut monthly reporting time from 6 hours to 25 minutes</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50">
              <CardContent className="p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">$240K</h4>
                <p className="text-slate-700">Identified revenue opportunity missed by entire analytics team</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-50">
              <CardContent className="p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">2 weeks</h4>
                <p className="text-slate-700">Onboarded to new role faster than predecessors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureSectionProps {
  icon: React.ReactNode
  title: string
  description: string
  reversed?: boolean
  children: React.ReactNode
}

function FeatureSection({ icon, title, description, reversed = false, children }: FeatureSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`grid gap-12 items-center mb-32 ${reversed ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"}`}
    >
      <div className={`${reversed ? "md:order-2" : ""}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <div className={`${reversed ? "md:order-1" : ""}`}>{children}</div>
    </motion.div>
  )
}
