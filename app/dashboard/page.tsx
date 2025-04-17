import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="container max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashwise</h1>
          <Button variant="outline" asChild>
            <Link href="/">Sign Out</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Dashwise!</h2>
          <p className="text-slate-600 mb-6">
            Your account has been successfully created. This is a placeholder dashboard page.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
