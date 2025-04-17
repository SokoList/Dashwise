"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { Divider } from "@/components/ui/divider"
import type { GoogleUser } from "@/lib/google-auth"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))

    if (errors.agreeTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.agreeTerms
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions"

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      // In a real application, you would send this data to your backend
      // to create a new user account
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to onboarding or dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuthSuccess = (provider: string, response: { token: string; user: GoogleUser }) => {
    console.log(`Successfully authenticated with ${provider}`, response)

    // In a real application, you would:
    // 1. Send the token to your backend for verification
    // 2. Create or authenticate the user
    // 3. Set up a session or JWT token for the user

    // For now, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  const handleSocialAuthError = (provider: string, error: any) => {
    console.error(`Error authenticating with ${provider}`, error)
    // You could show an error message to the user here
  }

  return (
    <Card className="border-slate-200 shadow-md">
      <CardContent className="pt-6">
        <SocialAuthButtons onSuccess={handleSocialAuthSuccess} onError={handleSocialAuthError} mode="signup" />

        <Divider className="my-6">or continue with email</Divider>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2 mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {!errors.password && <p className="text-xs text-slate-500 mt-1">Password must be at least 8 characters</p>}
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              name="company"
              placeholder="Acme Inc."
              value={formData.company}
              onChange={handleChange}
              className={errors.company ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  errors.agreeTerms ? "text-red-500" : ""
                }`}
              >
                I agree to the Terms of Service and Privacy Policy
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col pt-0">
        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
