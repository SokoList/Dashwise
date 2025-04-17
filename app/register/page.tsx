import { RegisterForm } from "@/components/register-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="container max-w-screen-xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create your Dashwise account</h1>
            <p className="text-slate-600 mt-2">Start turning your data into strategic decisions</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
