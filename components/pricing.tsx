"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small businesses just getting started with data analysis.",
      features: [
        "Basic dashboard templates",
        "Up to 5 users",
        "1,000 data points per month",
        "Email support",
        "7-day data history",
      ],
    },
    {
      name: "Professional",
      price: "$99",
      description: "Ideal for growing businesses with more complex data needs.",
      features: [
        "Advanced dashboard templates",
        "Up to 20 users",
        "10,000 data points per month",
        "Priority email & chat support",
        "30-day data history",
        "Custom recommendations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced analytics requirements.",
      features: [
        "Custom dashboard development",
        "Unlimited users",
        "Unlimited data points",
        "24/7 dedicated support",
        "Unlimited data history",
        "Advanced AI recommendations",
        "On-premise deployment option",
      ],
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-gray-500 md:text-xl">Choose the plan that's right for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-1 text-xl font-semibold">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
