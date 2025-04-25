import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Your next meeting could be your breakthrough moment
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't let another quarter go by where you're guessing at what your data means.
            <br />
            Get immediate access to Dashwise and transform how you use data forever.
          </p>
          <Button size="lg" className="gap-1.5 group" asChild>
            <Link href="/register">
              Get Immediate Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
