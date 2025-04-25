"use client"

import { motion } from "framer-motion"

export function NoDataLiteracy() {
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
            Zero training. Zero jargon. Just insights you can act on.
          </h2>
          <p className="text-xl text-gray-600">
            Dashwise is designed for decision-makers. You don't need to slice data, write formulas, or read between the
            (chart) lines.
            <br />
            <br />
            <span className="font-medium">It's plug‑and‑play clarity.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
