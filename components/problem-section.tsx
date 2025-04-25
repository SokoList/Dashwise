"use client"

import { motion } from "framer-motion"
import { Clock, AlertCircle, MessageSquare } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="py-20 bg-white" id="problem">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">The 9:55 AM Scramble:</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <MessageSquare className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Slack Panic</h3>
            <p className="text-slate-600">
              Your Slack pings: "Can you explain why we're down 8% in the Western region?"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Data Overload</h3>
            <p className="text-slate-600">
              Your screen shows a PowerBI dashboard with dozens of metrics. You click random filters hoping for an
              obvious answer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <Clock className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Time's Up</h3>
            <p className="text-slate-600">
              The calendar reminder pops up: "Quarterly Review in 5 minutes" and you still have no answers.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mt-12"
        >
          <p className="text-xl font-medium text-primary">
            Dashwise transforms that colorful mess into exactly what to say in your meeting—before you even leave your
            desk.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
