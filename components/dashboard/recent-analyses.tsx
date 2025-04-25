import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for recent analyses
const recentAnalyses = [
  {
    id: "1",
    title: "Q1 Sales Dashboard",
    date: "April 15, 2025",
    type: "PowerBI",
    insights: 12,
  },
  {
    id: "2",
    title: "Marketing Campaign Performance",
    date: "April 10, 2025",
    type: "Google Analytics",
    insights: 8,
  },
  {
    id: "3",
    title: "Customer Retention Analysis",
    date: "April 5, 2025",
    type: "Excel",
    insights: 10,
  },
]

export function RecentAnalyses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Analyses</CardTitle>
          <CardDescription>Your recently analyzed dashboards</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/analyses">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0"
            >
              <div>
                <Link href={`/dashboard/analysis/${analysis.id}`} className="font-medium hover:underline">
                  {analysis.title}
                </Link>
                <div className="text-sm text-slate-500">
                  {analysis.type} • {analysis.date}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">{analysis.insights}</span> insights
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
