"use client"

import { motion } from "framer-motion"
import { FileText, Zap, HelpCircle, Layout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Auto-Summarization",
      description: "One-click summaries that surface key insights—no analysis paralysis.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Key Takeaways",
      description: "Instant bullets on trends, anomalies, and red flags—perfect for copy-paste into slides or Slack.",
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "Suggested Questions",
      description:
        "AI-crafted prompts to spark meaningful discussion in your next meeting and position you as the data-savvy leader.",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Intuitive Design",
      description:
        "A clean, distraction‑free interface that requires zero training—dashboards have never felt this approachable.",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features & Benefits</h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Everything you need to transform complex dashboards into actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
