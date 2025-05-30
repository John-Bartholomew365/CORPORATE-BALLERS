// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Trophy, Mail, CheckCircle } from "lucide-react"
// import Link from "next/link"
// import { useState } from "react"

// export default function VerifyAccountPage() {
//   const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
//   const [isVerified, setIsVerified] = useState(false)

//   const handleCodeChange = (index: number, value: string) => {
//     if (value.length <= 1) {
//       const newCode = [...verificationCode]
//       newCode[index] = value
//       setVerificationCode(newCode)

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.getElementById(`code-${index + 1}`)
//         nextInput?.focus()
//       }
//     }
//   }

//   const handleVerify = () => {
//     // Simulate verification
//     setIsVerified(true)
//   }

//   if (isVerified) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
//         <div className="w-full max-w-md">
//           <Card>
//             <CardHeader className="text-center">
//               <div className="flex justify-center mb-4">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//                   <CheckCircle className="h-10 w-10 text-green-600" />
//                 </div>
//               </div>
//               <CardTitle className="text-2xl text-green-600">Account Verified!</CardTitle>
//               <CardDescription>Your account has been successfully verified. Welcome to CBFA!</CardDescription>
//             </CardHeader>
//             <CardContent className="text-center space-y-4">
//               <p className="text-sm text-muted-foreground">
//                 You can now access all features of your Corporate Ballers Football Academy account.
//               </p>
//               <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
//                 <Link href="/dashboard">Go to Dashboard</Link>
//               </Button>
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/">Back to Homepage</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
//               <Trophy className="h-8 w-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-green-600">CBFA</h1>
//               <p className="text-sm text-muted-foreground">Football Academy</p>
//             </div>
//           </div>
//         </div>

//         <Card>
//           <CardHeader className="text-center">
//             <div className="flex justify-center mb-4">
//               <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//                 <Mail className="h-10 w-10 text-green-600" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl">Verify Your Account</CardTitle>
//             <CardDescription>
//               We&apos;ve sent a 6-digit verification code to your email address. Please enter it below to verify your
//               account.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="space-y-6">
//               <div className="space-y-2">
//                 <Label className="text-center block">Verification Code</Label>
//                 <div className="flex justify-center space-x-2">
//                   {verificationCode.map((digit, index) => (
//                     <Input
//                       key={index}
//                       id={`code-${index}`}
//                       type="text"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleCodeChange(index, e.target.value)}
//                       className="w-12 h-12 text-center text-lg font-semibold"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <Button type="button" onClick={handleVerify} className="w-full bg-green-600 hover:bg-green-700">
//                 Verify Account
//               </Button>
//             </form>

//             <div className="mt-6 text-center space-y-2">
//               <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
//               <Button variant="link" className="text-green-600 p-0 h-auto">
//                 Resend verification code
//               </Button>
//             </div>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Need help?{" "}
//                 <Link href="/contact" className="text-green-600 hover:underline">
//                   Contact support
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mt-6 text-center">
//           <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-green-600">
//             ← Back to login
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function VerifyAccountPage() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [isVerified, setIsVerified] = useState(false)
  const [timeLeft, setTimeLeft] = useState(59)
  const [showResend, setShowResend] = useState(false)

  useEffect(() => {
    // Start the countdown when component mounts
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = () => {
    // Simulate verification
    setIsVerified(true)
  }

  const handleResend = () => {
    // Reset the timer and hide the resend button
    setTimeLeft(59)
    setShowResend(false)

    // Start the countdown again
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-600">Account Verified!</CardTitle>
              <CardDescription>Your account has been successfully verified. Welcome to CBFA!</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                You can now access all features of your Corporate Ballers Football Academy account.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Back to Homepage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4 mt-16 lg:mt-6">
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
              <h1 className="text-2xl font-bold text-green-600">CBFA</h1>
              <p className="text-sm text-muted-foreground">Football Academy</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Verify Your Account</CardTitle>
            <CardDescription>
              We&apos;ve sent a 6-digit verification code to your email address. Please enter it below to verify your
              account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label className="text-center block">Verification Code</Label>
                <div className="flex justify-center space-x-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-semibold"
                    />
                  ))}
                </div>
              </div>

              <Button type="button" onClick={handleVerify} className="w-full bg-green-600 hover:bg-green-700">
                Verify Account
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
              {!showResend ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in <span className="text-green-600">{timeLeft} second{timeLeft !== 1 ? 's' : ''}</span>
                </p>
              ) : (
                <Button variant="link" className="text-green-600 p-0 h-auto" onClick={handleResend}>
                  Resend verification code
                </Button>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help?{" "}
                <Link href="/contact" className="text-green-600 hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-green-600">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}