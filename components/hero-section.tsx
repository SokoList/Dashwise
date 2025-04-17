"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 py-20 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Turn Data into <span className="text-primary">Strategic Decisions</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Dashwise transforms your business data into actionable insights, helping you make informed decisions
                faster.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1.5 group" asChild>
                <Link href="/register">
                  Try Dashwise Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Book a Demo
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full overflow-hidden rounded-lg border bg-background shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-8 z-10 bottom-0"></div>
              <video className="w-full rounded-lg" controls autoPlay muted loop playsInline>
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dashwise%20Demo-rEeR29j8GjEMyQQlCh4C1ZhhQnaPiG.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
