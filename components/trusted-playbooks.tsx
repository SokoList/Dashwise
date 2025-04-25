"use client"

import { motion } from "framer-motion"

export function TrustedPlaybooks() {
  const companies = [
    {
      name: "Amazon",
      color: "bg-yellow-400",
      description: "Known for narrative briefs and forcing clarity in meetings",
    },
    {
      name: "Bridgewater",
      color: "bg-blue-500",
      description: "Pioneers in data-driven, radically transparent decisions",
    },
    {
      name: "McKinsey",
      color: "bg-green-500",
      description: "Experts in executive-ready synthesis",
    },
    {
      name: "Google",
      color: "bg-orange-500",
      description: "Champions of scalable, AI-first knowledge systems",
    },
    {
      name: "Stripe",
      color: "bg-blue-300",
      description: "Precision-focused, writing-heavy decision culture",
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
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Trusted Playbooks, Simplified</h2>
          <p className="text-lg text-gray-600 mb-10">
            Dashwise uses principles inspired by the decision-making systems at:
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full ${company.color}`} aria-hidden="true"></div>
                  <h3 className="font-bold">{company.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{company.description}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-gray-600">
            We've distilled these practices into a tool that works in seconds—so you can apply the same rigor to your
            day-to-day decisions without hiring a team of analysts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
