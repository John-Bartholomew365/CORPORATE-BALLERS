// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Phone, Mail, MapPin, Users, Target, Eye, Trophy, Star } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// export default function HomePage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="flex h-10 w-10 items-center justify-center">
//               <Image
//                 src="/corporate-ballers.svg"
//                 alt="CBFA Logo"
//                 width={50}
//                 height={50}
//                 className="h-10 w-10 object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-[#047146]">CBFA</h1>
//               <p className="text-xs text-muted-foreground">Football Academy</p>
//             </div>
//           </div>

//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
//               Home
//             </Link>
//             <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
//               About
//             </Link>
//             <Link href="/programs" className="text-sm font-medium hover:text-green-600 transition-colors">
//               Programs
//             </Link>
//             <Link href="/coaches" className="text-sm font-medium hover:text-green-600 transition-colors">
//               Coaches
//             </Link>
//             <Link href="/gallery" className="text-sm font-medium hover:text-green-600 transition-colors">
//               Gallery
//             </Link>
//             <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
//               Contact
//             </Link>
//           </nav>

//           <div className="flex items-center space-x-2">
//             <Button variant="outline" size="sm" asChild>
//               <Link href="/auth/login">Login</Link>
//             </Button>
//             <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
//               <Link href="/auth/register">Register</Link>
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 to-green-100">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
//             <div className="flex flex-col justify-center space-y-4">
//               <div className="space-y-2">
//                 <Badge className="bg-green-100 text-green-800 hover:bg-green-200">RC: 7580099</Badge>
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                   Corporate Ballers
//                   <span className="text-green-600"> Football Academy</span>
//                 </h1>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                   Nurturing raw talent into professional football careers. Join our academy and unlock your potential
//                   with qualified coaches and standardized training programs.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
//                   <Link href="/auth/register">Join Academy</Link>
//                 </Button>
//                 <Button variant="outline" size="lg" asChild>
//                   <Link href="/about">Learn More</Link>
//                 </Button>
//               </div>
//               <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                 <div className="flex items-center space-x-1">
//                   <MapPin className="h-4 w-4" />
//                   <span>Ilorin, Kwara State</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Users className="h-4 w-4" />
//                   <span>Ages 12+</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-center">
//               <Image
//                 src="/placeholder.svg?height=400&width=600"
//                 width="600"
//                 height="400"
//                 alt="Football training at CBFA"
//                 className="aspect-video overflow-hidden rounded-xl object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-16 lg:py-24">
//         <div className="container px-4 md:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our Academy</h2>
//             <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
//               A rapidly growing football club creating pathways for players to progress through the ranks and realize
//               their God-given talents.
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             <Card>
//               <CardHeader>
//                 <Target className="h-8 w-8 text-green-600 mb-2" />
//                 <CardTitle>Our Mission</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-muted-foreground">
//                   To harness raw talent and nurture them to full maturity, developing individuals into professionals
//                   while building a morally upright society through football.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <Eye className="h-8 w-8 text-green-600 mb-2" />
//                 <CardTitle>Our Vision</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-muted-foreground">
//                   To identify and nurture talent from a young age, providing all necessary logistics and support for
//                   individuals to reach the pinnacle of their careers.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <Star className="h-8 w-8 text-green-600 mb-2" />
//                 <CardTitle>Our Values</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-muted-foreground">
//                   High discipline, meticulousness, good sportsmanship, and fostering positive relationships across
//                   diverse backgrounds and cultures.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Programs Section */}
//       <section className="py-16 lg:py-24 bg-muted/50">
//         <div className="container px-4 md:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Training Programs</h2>
//             <p className="mt-4 text-muted-foreground md:text-lg">
//               High-quality and standardized training across all categories
//             </p>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <Card className="border-green-200">
//               <CardHeader>
//                 <div className="flex items-center space-x-2">
//                   <Users className="h-6 w-6 text-green-600" />
//                   <CardTitle>Junior Category</CardTitle>
//                 </div>
//                 <CardDescription>Ages 12-17 years</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm">
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Fundamental skills development</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Character building and discipline</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Educational support programs</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Pathway to senior category</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-green-200">
//               <CardHeader>
//                 <div className="flex items-center space-x-2">
//                   <Trophy className="h-6 w-6 text-green-600" />
//                   <CardTitle>Senior Category</CardTitle>
//                 </div>
//                 <CardDescription>Ages 18+ years</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm">
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Professional training standards</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Career development support</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>League participation</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <div className="h-2 w-2 bg-green-600 rounded-full" />
//                     <span>Professional networking</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

      // {/* Contact Section */}
      // <section className="py-16 lg:py-24">
      //   <div className="container px-4 md:px-6">
      //     <div className="text-center mb-12">
      //       <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
      //       <p className="mt-4 text-muted-foreground md:text-lg">
      //         Ready to start your football journey? Contact us today!
      //       </p>
      //     </div>

      //     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      //       <Card>
      //         <CardHeader>
      //           <MapPin className="h-8 w-8 text-green-600 mb-2" />
      //           <CardTitle>Location</CardTitle>
      //         </CardHeader>
      //         <CardContent>
      //           <p className="text-sm text-muted-foreground">
      //             Stadium Complex, Ibrahim Taiwo Road
      //             <br />
      //             Ilorin, Kwara State, Nigeria
      //           </p>
      //         </CardContent>
      //       </Card>

      //       <Card>
      //         <CardHeader>
      //           <Phone className="h-8 w-8 text-green-600 mb-2" />
      //           <CardTitle>Phone Numbers</CardTitle>
      //         </CardHeader>
      //         <CardContent>
      //           <div className="space-y-1 text-sm text-muted-foreground">
      //             <p>+234 8133178008</p>
      //             <p>+234 8065943751</p>
      //             <p>+234 8033907248</p>
      //             <p>+234 8120380080</p>
      //           </div>
      //         </CardContent>
      //       </Card>

      //       <Card>
      //         <CardHeader>
      //           <Mail className="h-8 w-8 text-green-600 mb-2" />
      //           <CardTitle>Email</CardTitle>
      //         </CardHeader>
      //         <CardContent>
      //           <p className="text-sm text-muted-foreground">corporateballersfa418@gmail.com</p>
      //           <Button className="mt-4 w-full bg-green-600 hover:bg-green-700" asChild>
      //             <Link href="/contact">Send Message</Link>
      //           </Button>
      //         </CardContent>
      //       </Card>
      //     </div>
      //   </div>
      // </section>

      // {/* CTA Section */}
      // <section className="py-16 lg:py-24 bg-green-600 text-white">
      //   <div className="container px-4 md:px-6 text-center">
      //     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Ready to Join CBFA?</h2>
      //     <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
      //       Take the first step towards your professional football career. Register today and become part of our growing
      //       family.
      //     </p>
      //     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      //       <Button size="lg" variant="secondary" asChild>
      //         <Link href="/auth/register">Register Now</Link>
      //       </Button>
      //       <Button
      //         size="lg"
      //         variant="outline"
      //         className="border-white text-white hover:bg-white hover:text-green-600"
      //         asChild
      //       >
      //         <Link href="/programs">View Programs</Link>
      //       </Button>
      //     </div>
      //   </div>
      // </section>

//       {/* Footer */}
//       <footer className="border-t py-12 bg-muted/50">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
//                   <Trophy className="h-4 w-4 text-white" />
//                 </div>
//                 <span className="font-bold text-green-600">CBFA</span>
//               </div>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Corporate Ballers Football Academy - Nurturing talent, building character, creating champions.
//               </p>
//               <p className="text-xs text-muted-foreground">RC: 7580099</p>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link href="/about" className="text-muted-foreground hover:text-green-600">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/programs" className="text-muted-foreground hover:text-green-600">
//                     Programs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/coaches" className="text-muted-foreground hover:text-green-600">
//                     Coaches
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/gallery" className="text-muted-foreground hover:text-green-600">
//                     Gallery
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Support</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <Link href="/contact" className="text-muted-foreground hover:text-green-600">
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/faq" className="text-muted-foreground hover:text-green-600">
//                     FAQ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="text-muted-foreground hover:text-green-600">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/terms" className="text-muted-foreground hover:text-green-600">
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Contact Info</h3>
//               <div className="space-y-2 text-sm text-muted-foreground">
//                 <p>Stadium Complex, Ibrahim Taiwo Road</p>
//                 <p>Ilorin, Kwara State, Nigeria</p>
//                 <p>+234 8133178008</p>
//                 <p>corporateballersfa418@gmail.com</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
//             <p>&copy; {new Date().getFullYear()} Corporate Ballers Football Academy. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }














import { HeroSection } from "@/components/landing-page/HeroSection"
import { StatsSection } from "@/components/landing-page/StatsSection"
import { AboutSection } from "@/components/landing-page/AboutSection"
import { MissionVisionSection } from "@/components/landing-page/MissionVisionSection"
import { ProgramsSection } from "@/components/landing-page/ProgramsSection"
import { TestimonialsSection } from "@/components/landing-page/TestimonialsSection"
import { NewsSection } from "@/components/landing-page/NewsSection"
import { ContactSection } from "@/components/landing-page/ContactSection"
import { Footer } from "@/components/landing-page/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <MissionVisionSection />
      <ProgramsSection />
      <TestimonialsSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
