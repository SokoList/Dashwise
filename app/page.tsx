import { DashwiseDemo } from "@/components/dashwise-demo"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DashwiseDemo />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
