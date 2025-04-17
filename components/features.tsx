"use client"

import { motion } from "framer-motion"
import { Database, FileText, Zap, Brain, TrendingUp, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your data to uncover hidden patterns and insights you might miss.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Insights",
      description: "Get immediate answers to your business questions without complex data manipulation.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Strategic Recommendations",
      description: "Receive actionable recommendations to improve your business performance.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Comprehensive Dashboards",
      description: "Visualize your data with beautiful, interactive dashboards that tell the complete story.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Executive Summaries",
      description: "Get concise overviews of key metrics and insights for quick decision-making.",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Integration",
      description: "Connect with your existing tools and data sources for a unified view of your business.",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Discover how Dashwise transforms your data into actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
