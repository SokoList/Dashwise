"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const caseStudies = [
    {
      text: "Friday afternoon: staring at our quarterly dashboard wondering why sales tanked. Used Dashwise, discovered our checkout load time doubled on mobile after the last update. Flagged it in Monday's meeting, engineers fixed it by noon, and conversions recovered by Tuesday. My boss now introduces me as 'the guy who saved us $80K in one meeting.'",
      person: "Michael T.",
      role: "E-commerce Manager at BeautyBrands.com",
      avatar: "/avatars/michael.jpg",
    },
    {
      text: "With Dashwise, Maria spotted a 17% drop in conversion on mobile—right before her product review. She brought it up in the meeting, asked the right question, and now leads the mobile retention project.",
      person: "Maria",
      role: "Product Manager",
      avatar: "/avatars/maria.jpg",
    },
    {
      text: 'John used Dashwise to prep for a quarterly meeting—and flagged a $2M gap in forecasted revenue. The CFO asked how he caught it. He just smiled and said, "I checked the report."',
      person: "John",
      role: "Business Analyst",
      avatar: "/avatars/john.jpg",
    },
    {
      text: "Lina uploaded a weekly marketing report and Dashwise surfaced a 300% ROI spike from email. She redirected budget within hours and doubled down before anyone else noticed.",
      person: "Lina",
      role: "Marketing Director",
      avatar: "/avatars/lina.jpg",
    },
    {
      text: "Ahmed was reviewing operations data. Dashwise pointed out a spike in delayed shipments in Canada. He flagged it, asked logistics to investigate, and avoided a bigger mess downstream.",
      person: "Ahmed",
      role: "Operations Manager",
      avatar: "/avatars/ahmed.jpg",
    },
    {
      text: "Two minutes before her meeting, Zoe uploaded the team's dashboard. Dashwise gave her one sharp question. She asked it in the meeting—and suddenly everyone turned to her for the plan.",
      person: "Zoe",
      role: "Team Lead",
      avatar: "/avatars/zoe.jpg",
    },
    {
      text: "Cut monthly reporting time from 6 hours to 25 minutes. Identified $240K revenue opportunity missed by entire analytics team. Onboarded to new role 2 weeks faster than predecessors.",
      person: "Results",
      role: "From actual Dashwise users",
      avatar: "/avatars/results.jpg",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + caseStudies.length) % caseStudies.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50" id="testimonials">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">The Monday Morning Hero</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Used by people who get promoted</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-none shadow-xl bg-white">
                  <CardContent className="p-8 md:p-12">
                    <Quote className="h-12 w-12 text-primary/20 mb-6" />
                    <blockquote className="text-xl md:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                      "{caseStudies[currentIndex].text}"
                    </blockquote>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4 border-2 border-white shadow-sm">
                        <AvatarImage
                          src={caseStudies[currentIndex].avatar || "/placeholder.svg"}
                          alt={caseStudies[currentIndex].person}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {caseStudies[currentIndex].person[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900">{caseStudies[currentIndex].person}</p>
                        <p className="text-sm text-slate-600">{caseStudies[currentIndex].role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-slate-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex bg-white shadow-md border-slate-200"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex bg-white shadow-md border-slate-200"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
