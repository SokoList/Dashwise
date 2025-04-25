"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function DataPlaybooks() {
  const companies = [
    {
      name: "Amazon",
      color: "bg-yellow-400",
      description: "Known for narrative briefs and forcing clarity in meetings",
      logo: "/amazon-logo.png",
    },
    {
      name: "Bridgewater",
      color: "bg-blue-500",
      description: "Pioneers in data-driven, radically transparent decisions",
      logo: "/bridgewater-logo.png",
    },
    {
      name: "McKinsey",
      color: "bg-green-500",
      description: "Experts in executive-ready synthesis",
      logo: "/mckinsey-logo.png",
    },
    {
      name: "Google",
      color: "bg-orange-500",
      description: "Champions of scalable, AI-first knowledge systems",
      logo: "/google-logo.png",
    },
    {
      name: "Stripe",
      color: "bg-blue-300",
      description: "Precision-focused, writing-heavy decision culture",
      logo: "/stripe-logo.png",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3">Use Data Like the World's Best</h2>
          <p className="text-lg text-gray-600">
            Dashwise uses principles inspired by the decision-making systems at leading companies
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-4 h-4 rounded-full ${company.color} flex-shrink-0`} aria-hidden="true"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-20 relative flex items-center">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={`${company.name} logo`}
                          className="max-h-8 max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `/placeholder.svg?height=32&width=80&query=${company.name}+logo`
                          }}
                        />
                      </div>
                      <h3 className="font-bold">{company.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{company.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mt-10"
        >
          <p className="text-gray-600">
            We've distilled these practices into a tool that works in seconds—so you can apply the same rigor to your
            day-to-day decisions without hiring a team of analysts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
