"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function ProblemSolution() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-none">
              <CardContent className="p-0 flex flex-col h-full">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Drowning in dashboards?</h2>
                <p className="text-gray-700 text-lg">
                  You open the report. Charts everywhere. Time's ticking. And the meeting starts in 10. You're expected
                  to lead with insight—but instead, you're stuck in a maze of metrics.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-none">
              <CardContent className="p-0 flex flex-col h-full">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Meet Dashwise:</h2>
                <p className="text-gray-700 text-lg">
                  Your AI-Powered Data Translator. Dashwise ingests your dashboard snapshots and instantly delivers the
                  insights you—and your stakeholders—need. No more hunting for anomalies. No more scrambling for talking
                  points. Just clear next steps.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
