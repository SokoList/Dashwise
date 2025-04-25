import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionIntro } from "@/components/solution-intro"
import { WorksWith } from "@/components/works-with"
import { FeaturesShowcase } from "@/components/features-showcase"
import { CaseStudies } from "@/components/case-studies"
import { DataPlaybooks } from "@/components/data-playbooks"
import { NoDataLiteracy } from "@/components/no-data-literacy"
import { HowItWorks } from "@/components/how-it-works"
import { PricingTeaser } from "@/components/pricing-teaser"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <section id="attention">
          <ProblemSection />
        </section>
        <section id="interest">
          <SolutionIntro />
        </section>
        <WorksWith />
        <section id="desire">
          <FeaturesShowcase />
        </section>
        <section id="testimonials">
          <CaseStudies />
        </section>
        <DataPlaybooks />
        <NoDataLiteracy />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="action">
          <PricingTeaser />
        </section>
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
