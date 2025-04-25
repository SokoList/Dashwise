"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SolutionIntro() {
  return (
    <section className="py-20 bg-slate-50" id="solution">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Picture This Instead:</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Walk in with confidence</h3>
                    <p className="text-slate-600 text-sm">
                      You walk into the meeting with 3 specific bullet points about that Western region drop.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 16V12L14 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-primary"
                      />
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Speak with precision</h3>
                    <p className="text-slate-600 text-sm">
                      You confidently say, "Our premium tier conversions fell 22% after the price increase."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Impress your colleagues</h3>
                    <p className="text-slate-600 text-sm">
                      Your colleague whispers, "How did you figure that out so quickly?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-slate-200">
              <CardContent className="p-0">
                <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium">Dashwise Analysis</div>
                  <div></div>
                </div>
                <div className="p-6">
                  <p className="text-lg font-medium text-primary mb-6">
                    Dashwise gives you exactly this. Upload any screenshot, and in 30 seconds you'll get:
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        "Revenue dropped because conversion rates fell 22% in premium tier products"
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        "This happened immediately following the March 15th price increase"
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        "Similar drops occurred in 2022 when we increased prices without adding features"
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        "Competitors are currently offering 15% discounts in the same markets"
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
