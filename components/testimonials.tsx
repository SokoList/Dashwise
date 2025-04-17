"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Dashwise has transformed how we analyze our business data. The insights we've gained have directly contributed to a 27% increase in our operational efficiency.",
      author: "Sarah Johnson",
      role: "COO, TechCorp Inc.",
      avatar: "SJ",
    },
    {
      quote:
        "The strategic recommendations provided by Dashwise helped us identify key areas for improvement that we had overlooked for years.",
      author: "Michael Chen",
      role: "CFO, Global Solutions",
      avatar: "MC",
    },
    {
      quote:
        "As a data-driven company, we needed a tool that could keep up with our complex analytics needs. Dashwise exceeded our expectations.",
      author: "Priya Patel",
      role: "Head of Analytics, DataDrive",
      avatar: "PP",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Hear from businesses that have transformed their decision-making with Dashwise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
