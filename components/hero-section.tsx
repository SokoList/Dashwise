"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="absolute -top-[40rem] -left-[40rem] w-[80rem] h-[80rem] rounded-full border border-primary/10"></div>
        <div className="absolute -top-[30rem] -right-[30rem] w-[60rem] h-[60rem] rounded-full border border-primary/10"></div>
        <div className="absolute top-[20rem] -right-[40rem] w-[80rem] h-[80rem] rounded-full border border-primary/10"></div>
      </div>

      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="outline" className="mb-4 py-1.5 backdrop-blur bg-white/50 border-slate-200">
              <span className="text-primary font-medium mr-1">🚨</span> Your Meeting Starts in 5 Minutes
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your Meeting Starts in <span className="text-primary">5 Minutes</span> and You Don't Understand This Sales
            Report
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your boss just asked what's causing the revenue drop in Q3. You're staring at 12 charts with no clue what to
            say.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="gap-1.5 group px-8" asChild>
              <Link href="/register">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto max-w-5xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>

            {/* Video Demo */}
            <video className="w-full rounded-lg" autoPlay muted loop playsInline poster="/data-driven-insights.png">
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dashwise%20Demo-gLAnGh9rDQSJ2624jzJoLM6im7XuLZ.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Live Demo
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute -bottom-6 left-8 md:left-12 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 6L8 14L4 10"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 6L12 14L11 13"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">Analysis Complete</p>
                <p className="text-xs text-slate-500">3 key insights found</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 right-8 md:right-12 bg-white rounded-lg shadow-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 8V12L15 15"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">30 Second Analysis</p>
                <p className="text-xs text-slate-500">Faster than any human</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
