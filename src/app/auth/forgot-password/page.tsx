"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email input, 2: Verification code
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(59);
  const [showResend, setShowResend] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Countdown timer for verification code
  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/forgot-password", { email }, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.statusCode === "00") {
        toast.success("Verification code sent to your email!");
        setStep(2); // Move to verification code step
      } else {
        setError(response.data.message || "Failed to send verification code");
        toast.error(response.data.message || "Failed to send verification code");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "An error occurred");
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      setError("");

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (verificationCode.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the verification code");
      setIsLoading(false);
      return;
    }

    const otp = verificationCode.join("");

    try {
      const response = await axios.post("/api/verify-otp", { email, otp }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.statusCode === "00") {
        // Store userId in sessionStorage
        if (response.data.user?.id) {
          sessionStorage.setItem("reset_user_id", response.data.user.id);
        }
        toast.success("Code verified successfully!");
        setTimeout(() => {
          router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setError(response.data.message || "Invalid verification code");
        toast.error(response.data.message || "Invalid verification code");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Invalid verification code");
        toast.error(error.response?.data?.message || "Invalid verification code");
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    setVerificationCode(["", "", "", "", "", ""]);
    setTimeLeft(59);
    setShowResend(false);

    try {
      const response = await axios.post("/api/forgot-password", { email }, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.statusCode === "00") {
        toast.success("New verification code sent!");
      } else {
        setError(response.data.message || "Failed to resend code");
        toast.error(response.data.message || "Failed to resend code");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to resend code");
        toast.error(error.response?.data?.message || "Failed to resend code");
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
            <CardTitle className="text-2xl">{step === 1 ? "Forgot Password" : "Reset Password"}</CardTitle>
            <CardDescription>
              {step === 1
                ? "Enter your email address to receive a verification code."
                : "We've sent a 6-digit verification code to your email. Enter it below to reset your password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#047146] text-white cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-center block">Verification Code</Label>
                  <div className="flex justify-center space-x-2">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-semibold"
                      />
                    ))}
                  </div>
                  {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#047146] text-white cursor-pointer"
                  disabled={verificationCode.some((digit) => digit === "") || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
                  {!showResend ? (
                    <p className="text-sm text-muted-foreground">
                      Resend code in <span className="text-[#047146]">{timeLeft} second{timeLeft !== 1 ? "s" : ""}</span>
                    </p>
                  ) : (
                    <Button
                      variant="link"
                      className="text-[#047146] p-0 h-auto cursor-pointer"
                      onClick={handleResend}
                      disabled={isLoading}
                    >
                      Resend verification code
                    </Button>
                  )}
                </div>
              </form>
            )}
            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-[#047146] hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}