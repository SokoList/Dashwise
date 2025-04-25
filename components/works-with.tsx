"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function WorksWith() {
  const tools = [
    {
      name: "PowerBI",
      logo: "/powerbi-logo.png",
      description: "Explains complex cross-filtered visualizations in plain English",
    },
    {
      name: "Tableau",
      logo: "/tableau-logo.svg",
      description: "Translates intricate dashboards into clear next steps",
    },
    {
      name: "Excel",
      logo: "/excel-logo.png",
      description: "Makes sense of pivot tables and chart data instantly",
    },
    {
      name: "Google Analytics",
      logo: "/google-analytics-logo.png",
      description: "Tells you exactly why your metrics changed",
    },
    {
      name: "Salesforce",
      logo: "/salesforce-logo.svg",
      description: "Identifies the true drivers behind your pipeline changes",
    },
    {
      name: "HubSpot",
      logo: "/hubspot-logo.svg",
      description: "Explains which marketing activities actually drive revenue",
    },
  ]

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-2">Works With Everything You Already Use</h3>
          <p className="text-slate-600">Upload from any platform and get instant insights</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full hover:shadow-md transition-all border-slate-200 overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center text-center h-full">
                  <div className="h-16 flex items-center justify-center mb-3 p-2">
                    <img
                      src={tool.logo || `/placeholder.svg?height=40&width=120&query=${tool.name}+logo`}
                      alt={`${tool.name} logo`}
                      className="h-10 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=40&width=120&query=${tool.name}+logo`
                      }}
                    />
                  </div>
                  <h4 className="font-medium text-sm mb-1">{tool.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{tool.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
