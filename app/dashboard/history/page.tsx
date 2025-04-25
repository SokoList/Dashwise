"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart2, FileText, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const analyses = [
    {
      id: "1",
      title: "Q1 Sales Dashboard",
      date: "April 15, 2025",
      type: "PowerBI",
      insights: 12,
      questions: 5,
    },
    {
      id: "2",
      title: "Marketing Campaign Performance",
      date: "April 8, 2025",
      type: "Google Analytics",
      insights: 8,
      questions: 3,
    },
    {
      id: "3",
      title: "Customer Retention Analysis",
      date: "April 1, 2025",
      type: "Excel",
      insights: 15,
      questions: 7,
    },
    {
      id: "4",
      title: "Product Launch Metrics",
      date: "March 25, 2025",
      type: "Tableau",
      insights: 10,
      questions: 4,
    },
    {
      id: "5",
      title: "Website Traffic Analysis",
      date: "March 18, 2025",
      type: "Google Analytics",
      insights: 9,
      questions: 6,
    },
  ]

  const filteredAnalyses = analyses.filter(
    (analysis) =>
      analysis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Analysis History</h1>
        <Button asChild>
          <Link href="/dashboard/new-analysis">New Analysis</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Past Analyses</CardTitle>
              <CardDescription>Your previously analyzed dashboards</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search analyses..."
                  className="pl-8 w-full sm:w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((analysis) => (
                <Link key={analysis.id} href={`/dashboard/analysis/${analysis.id}`} className="block">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="rounded-md bg-blue-100 p-2.5 text-blue-700">
                      <BarChart2 className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{analysis.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center text-sm text-slate-500">
                          <FileText className="mr-1 h-4 w-4" />
                          {analysis.type}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {analysis.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-blue-600">{analysis.insights}</span>
                        <span className="text-slate-500">insights</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-blue-600">{analysis.questions}</span>
                        <span className="text-slate-500">questions</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">No analyses found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
