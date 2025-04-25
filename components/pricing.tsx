"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

export function Pricing() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Free during beta.</h2>
          <p className="mt-4 text-gray-500 md:text-xl">Get early access. Use Dashwise before everyone else does.</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="border-primary shadow-lg">
            <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
              Limited Time Offer
            </div>
            <CardHeader>
              <CardTitle>Beta Access</CardTitle>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">Free</span>
              </div>
              <CardDescription className="mt-2">
                Get early access to all features during our beta period.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Full dashboard analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited uploads</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">AI-powered insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-1.5 group">
                Join the Waitlist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
