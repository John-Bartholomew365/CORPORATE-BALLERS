"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)

    // In a real implementation, you would make an API call here
    // try {
    //   const response = await fetch('/api/auth/forgot-password', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   })
    //
    //   if (!response.ok) {
    //     throw new Error('Failed to send reset email')
    //   }
    //
    //   setIsSubmitted(true)
    // } catch (err) {
    //   setError('An error occurred. Please try again.')
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 mt-6">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="flex items-center justify-center">
              <Image
                src="/corporate-ballers.svg"
                alt="CBFA Logo"
                width={50}
                height={50}
                className="h-16 w-16 object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-xl">CBFA</div>
              <div className="text-sm text-gray-600">Football Academy</div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive password reset instructions</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>We&apos;ll send you a link to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Reset Password"}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-700 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
                  <p className="text-gray-600">
                    We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    If you don&apos;t see it in your inbox, please check your spam folder
                  </p>
                </div>
                <div className="pt-4">
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/auth/login">Return to Login</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-green-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
