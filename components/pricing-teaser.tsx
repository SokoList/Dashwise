"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function PricingTeaser() {
  return (
    <section className="py-20 bg-slate-50" id="pricing">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
            Give Yourself an Unfair Advantage This Quarter
          </h2>
          <p className="text-xl text-gray-600 mb-4">Free for early users during beta. Only 69 spots remaining.</p>
          <p className="text-lg text-gray-600 mb-8">
            Works 30 seconds after signup. No tutorials. No integrations. No headaches.
          </p>
          <Button size="lg" className="gap-1.5 group" asChild>
            <Link href="/register">
              Skip the Waitlist – Get Immediate Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-6 italic">
            "Stop guessing what your dashboards mean. Start solving problems that get you promoted."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
