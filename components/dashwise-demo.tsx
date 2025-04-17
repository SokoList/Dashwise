"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, PieChart, HelpCircle, Lightbulb, ListChecks, Database, FileText, Copy } from "lucide-react"

export function DashwiseDemo() {
  const [activeTab, setActiveTab] = useState("summary")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 bg-white" id="demo">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience Dashwise in Action</h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Explore our interactive demo to see how Dashwise transforms your data
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-5xl rounded-xl border bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-xl font-semibold">Analysis Results</h3>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Copy className="h-4 w-4" />
              Copy Analysis
            </Button>
          </div>

          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-50 p-0 h-auto">
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <FileText className="h-4 w-4" />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <ListChecks className="h-4 w-4" />
                Recommendations
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3 flex gap-2"
              >
                <Database className="h-4 w-4" />
                Data Discovery
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
                <TabsContent value="summary" className="p-6">
                  <SummaryTab />
                </TabsContent>
                <TabsContent value="insights" className="p-6">
                  <InsightsTab />
                </TabsContent>
                <TabsContent value="questions" className="p-6">
                  <QuestionsTab />
                </TabsContent>
                <TabsContent value="recommendations" className="p-6">
                  <RecommendationsTab />
                </TabsContent>
                <TabsContent value="data" className="p-6">
                  <DataDiscoveryTab />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

function SummaryTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Executive Summary</h3>
          <p className="text-sm text-gray-500">A concise overview of the key findings from your dashboard</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-700">
            The dashboard provides a comprehensive overview of contract management, highlighting key metrics such as the
            number of contracts, revenue projections, and cost analysis. It presents a detailed comparison of costs
            versus revenues over different time periods, alongside insights into contract statuses, industries, and
            categories. This visualization is crucial for understanding financial performance and operational efficiency
            in preparation for the upcoming meeting.
          </p>

          <h4 className="mt-6 mb-4 text-lg font-semibold">Key Metrics Overview</h4>
          <ul className="space-y-2 list-disc pl-5">
            <li className="text-gray-700">
              <span className="font-medium">Number of Contracts:</span> 73
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Projected Revenues (Next 12 Months):</span> $13,920
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Projected Costs (Next 12 Months):</span> $35,750
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Contracts to Review:</span> 7 without milestones, 9 without tasks
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-lg p-6 border">
          <h4 className="text-lg font-medium mb-4">Cost vs. Revenue Trends</h4>
          <div className="aspect-[4/3] bg-white rounded-md border p-4 flex items-center justify-center">
            <BarChart3 className="h-32 w-32 text-slate-300" />
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-6 border">
          <h4 className="text-lg font-medium mb-4">Contract Distribution</h4>
          <div className="aspect-[4/3] bg-white rounded-md border p-4 flex items-center justify-center">
            <PieChart className="h-32 w-32 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Key Insights</h3>
          <p className="text-sm text-gray-500">Important findings and patterns identified in your dashboard</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-blue-700">High Cost Over Revenue in Long-term Projections</h4>
            <p className="text-blue-600 mt-1">5-year costs: -84, revenues: 16</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Finance</span>
              <span className="text-sm text-blue-600">Source: Cost vs. Revenues by year chart</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-blue-700">
              Significant Portion of Contracts Pending or Terminated
            </h4>
            <p className="text-blue-600 mt-1">Pending: 28%, Terminated: 17%</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Operations</span>
              <span className="text-sm text-blue-600">Source: Contracts status pie chart</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-blue-700">Consulting Services Lead in Industry Contracts</h4>
            <p className="text-blue-600 mt-1">Consulting Services: 33%</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Market</span>
              <span className="text-sm text-blue-600">Source: Contracts by industry pie chart</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function QuestionsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-500">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Strategic Questions</h3>
          <p className="text-sm text-gray-500">Key questions to guide your decision-making process</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-purple-700">
              How can we reduce the cost disparity in long-term projections?
            </h4>
            <p className="text-purple-600 mt-1">The 5-year cost vs. revenue analysis shows a significant gap.</p>
            <div className="mt-3">
              <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Finance</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-purple-700">
              What strategies can be implemented to decrease the number of pending contracts?
            </h4>
            <p className="text-purple-600 mt-1">28% of contracts are currently pending, impacting operational flow.</p>
            <div className="mt-3">
              <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Operations</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-purple-700">
              How can we diversify our industry focus beyond consulting services?
            </h4>
            <p className="text-purple-600 mt-1">
              Consulting services account for 33% of contracts, indicating a potential over-reliance.
            </p>
            <div className="mt-3">
              <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Market</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RecommendationsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-500">
          <ListChecks className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Recommendations</h3>
          <p className="text-sm text-gray-500">Suggested actions based on the dashboard analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-green-700">
              Implement cost-control measures for long-term projects.
            </h4>
            <p className="text-green-600 mt-1">
              Reducing costs in the 5-year projection will improve financial stability.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-alert-triangle"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <span className="text-sm font-medium">Risk:</span>
              </div>
              <span className="text-sm text-red-500">
                Potential reduction in service quality if cost-cutting is too aggressive.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-green-700">
              Streamline contract approval processes to reduce pending contracts.
            </h4>
            <p className="text-green-600 mt-1">
              Improving efficiency in contract management will enhance operational performance.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-alert-triangle"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <span className="text-sm font-medium">Risk:</span>
              </div>
              <span className="text-sm text-red-500">
                Possible initial increase in workload for contract management teams.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-green-700">
              Explore new industry opportunities to balance contract distribution.
            </h4>
            <p className="text-green-600 mt-1">
              Diversifying industry focus can mitigate risks associated with market changes.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-alert-triangle"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <span className="text-sm font-medium">Risk:</span>
              </div>
              <span className="text-sm text-red-500">
                Entering new markets may require additional resources and expertise.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DataDiscoveryTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <Database className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Data Discovery</h3>
          <p className="text-sm text-gray-500">Additional data needed for a complete picture</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold">Detailed Cost Breakdown by Project</h4>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Financial department reports or project management software</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold">Contract Approval Time Metrics</h4>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Contract management system or workflow analysis tools</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold">Industry Market Trends</h4>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Market research reports or industry analysis platforms</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
