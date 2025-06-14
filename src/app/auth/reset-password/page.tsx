// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// export default function ResetPasswordPage() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     // Retrieve userId from sessionStorage or URL query
//     const storedUserId = typeof window !== "undefined" ? sessionStorage.getItem("reset_user_id") : null;
//     const queryUserId = searchParams.get("userId");
//     const email = searchParams.get("email"); // For logging context
//     console.log("ResetPassword: Retrieved userId:", { storedUserId, queryUserId, email }); // Debug: Log userId sources
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else if (queryUserId) {
//       setUserId(queryUserId);
//     } else {
//       setError("Invalid session. Please start the password reset process again.");
//       toast.error("Invalid session. Please start the password reset process again.");
//       setTimeout(() => router.push("/auth/forgot-password"), 2000);
//     }
//   }, [router, searchParams]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     // Validate passwords
//     if (!newPassword || !confirmPassword) {
//       setError("Please enter and confirm your new password");
//       setIsLoading(false);
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     if (newPassword.length < 8) {
//       setError("Password must be at least 8 characters");
//       setIsLoading(false);
//       return;
//     }

//     if (!userId) {
//       setError("Invalid session. Please start the password reset process again.");
//       toast.error("Invalid session. Please start the password reset process again.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("/api/reset-password", {
//         password: newPassword,
//         confirmPassword,
//         userId,
//       }, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.statusCode === "00") {
//         toast.success("Password reset successfully!");
//         // Clear sessionStorage
//         if (typeof window !== "undefined") {
//           sessionStorage.removeItem("reset_user_id");
//         }
//         setIsSubmitted(true);
//       } else {
//         setError(response.data.message || "Failed to reset password");
//         toast.error(response.data.message || "Failed to reset password");
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         setError(error.response?.data?.message || "An error occurred");
//         toast.error(error.response?.data?.message || "An error occurred");
//       } else {
//         setError("An unexpected error occurred");
//         toast.error("An unexpected error occurred");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8 mt-6">
//             <Link href="/" className="inline-flex items-center space-x-2 mb-6">
//               <div className="flex items-center justify-center">
//                 <Image
//                   src="/corporate-ballers.svg"
//                   alt="CBFA Logo"
//                   width={50}
//                   height={50}
//                   className="h-16 w-16 object-cover"
//                 />
//               </div>
//               <div>
//                 <div className="font-bold text-gray-900 text-xl">CBFA</div>
//                 <div className="text-sm text-gray-600">Football Academy</div>
//               </div>
//             </Link>
//           </div>
//           <Card className="shadow-lg">
//             <CardContent className="py-6 text-center space-y-4">
//               <div className="flex justify-center">
//                 <CheckCircle className="h-16 w-16 text-[#047146]" />
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium text-gray-900">Password Reset Successful</h3>
//                 <p className="text-gray-600">Your password has been updated successfully</p>
//               </div>
//               <div className="pt-4">
//                 <Button
//                   onClick={() => router.push("/auth/login")}
//                   className="w-full bg-[#047146] text-white cursor-pointer"
//                 >
//                   Return to Login
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8 mt-6">
//           <Link href="/" className="inline-flex items-center space-x-2 mb-6">
//             <div className="flex items-center justify-center">
//               <Image
//                 src="/corporate-ballers.svg"
//                 alt="CBFA Logo"
//                 width={50}
//                 height={50}
//                 className="h-16 w-16 object-cover"
//               />
//             </div>
//             <div>
//               <div className="font-bold text-gray-900 text-xl">CBFA</div>
//               <div className="text-sm text-gray-600">Football Academy</div>
//             </div>
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h1>
//           <p className="text-gray-600">Create a strong password for your account</p>
//         </div>
//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>Reset Password</CardTitle>
//             <CardDescription>Create a strong password that you don&apos;t use elsewhere</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="newPassword">New Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="newPassword"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm new password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>
//               {error && <p className="text-sm text-red-500">{error}</p>}
//               <Button
//                 type="submit"
//                 className="w-full bg-[#047146] text-white cursor-pointer"
//                 size="lg"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Updating..." : "Reset Password"}
//               </Button>
//               <div className="text-center">
//                 <Link
//                   href="/auth/login"
//                   className="inline-flex items-center text-sm text-[#047146] hover:underline"
//                 >
//                   <ArrowLeft className="h-4 w-4 mr-1" />
//                   Back to Login
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }





"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve userId from sessionStorage or URL query
    const storedUserId = typeof window !== "undefined" ? sessionStorage.getItem("reset_user_id") : null;
    const queryUserId = searchParams.get("userId");
    const email = searchParams.get("email");
    console.log("ResetPassword: Retrieved userId:", { storedUserId, queryUserId, email });
    
    if (storedUserId) {
      setUserId(storedUserId);
    } else if (queryUserId) {
      setUserId(queryUserId);
    } else {
      setError("Invalid session. Please start the password reset process again.");
      toast.error("Invalid session. Please start the password reset process again.");
      setTimeout(() => router.push("/auth/forgot-password"), 2000);
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (!userId) {
      setError("Invalid session. Please start the password reset process again.");
      toast.error("Invalid session. Please start the password reset process again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {
        password: newPassword,
        confirmPassword,
        userId,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.statusCode === "00") {
        toast.success("Password reset successfully!");
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("reset_user_id");
        }
        setIsSubmitted(true);
      } else {
        setError(response.data.message || "Failed to reset password");
        toast.error(response.data.message || "Failed to reset password");
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
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
          </div>
          <Card className="shadow-lg">
            <CardContent className="py-6 text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-[#047146]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Password Reset Successful</h3>
                <p className="text-gray-600">Your password has been updated successfully</p>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="w-full bg-[#047146] text-white cursor-pointer"
                >
                  Return to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h1>
          <p className="text-gray-600">Create a strong password for your account</p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Create a strong password that you don&apos;t use elsewhere</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#047146] text-white cursor-pointer"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-[#047146] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading password reset form...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}