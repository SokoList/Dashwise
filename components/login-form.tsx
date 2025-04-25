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
import Link from "next/link"
import type { GoogleUser } from "@/lib/google-auth"
import { setAuthState } from "@/lib/auth-utils"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

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
      // to authenticate the user
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store auth state
      setAuthState({
        email: formData.email,
        name: "User",
        isAuthenticated: true,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuthSuccess = (provider: string, response: { token: string; user: GoogleUser }) => {
    console.log(`Successfully authenticated with ${provider}`, response.user.email)

    // Store auth state
    setAuthState({
      email: response.user.email,
      name: response.user.name,
      picture: response.user.picture,
      provider,
      isAuthenticated: true,
    })

    // Force navigation to dashboard
    console.log("Redirecting to dashboard...")
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 100)
  }

  const handleSocialAuthError = (provider: string, error: any) => {
    console.error(`Error authenticating with ${provider}`, error)
    // You could show an error message to the user here
  }

  return (
    <Card className="border-slate-200 shadow-md">
      <CardContent className="pt-6">
        <SocialAuthButtons onSuccess={handleSocialAuthSuccess} onError={handleSocialAuthError} mode="signin" />

        <Divider className="my-6">or continue with email</Divider>

        <form onSubmit={handleSubmit}>
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

          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
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
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col pt-0">
        <p className="text-center text-sm text-slate-500 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
