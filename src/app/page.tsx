// import { HeroSection } from "@/components/landing-page/HeroSection"
// import { StatsSection } from "@/components/landing-page/StatsSection"
// import { AboutSection } from "@/components/landing-page/AboutSection"
// // import { MissionVisionSection } from "@/components/landing-page/MissionVisionSection"
// import { ProgramsSection } from "@/components/landing-page/ProgramsSection"
// import { TestimonialsSection } from "@/components/landing-page/TestimonialsSection"
// import { NewsSection } from "@/components/landing-page/NewsSection"
// import { ContactSection } from "@/components/landing-page/ContactSection"
// import { Navbar } from "@/components/landing-page/Navbar"
// import { Footer } from "@/components/landing-page/Footer"
// import { TeamShowcaseSection } from "@/components/landing-page/TeamSection"

// export default function HomePage() {
//   return (
//     <main className="min-h-screen">
//       <Navbar/>
//       <HeroSection />
//       <StatsSection />
//       <TeamShowcaseSection/>
//       <AboutSection />
//       {/* <MissionVisionSection /> */}
//       <ProgramsSection />
//       <TestimonialsSection />
//       <NewsSection />
//       <ContactSection />
//       <Footer/>
//     </main>
//   )
// }





"use client"
import { HeroSection } from "@/components/landing-page/HeroSection"
import { StatsSection } from "@/components/landing-page/StatsSection"
import { AboutSection } from "@/components/landing-page/AboutSection"
import { ProgramsSection } from "@/components/landing-page/ProgramsSection"
import { TestimonialsSection } from "@/components/landing-page/TestimonialsSection"
import { NewsSection } from "@/components/landing-page/NewsSection"
import { ContactSection } from "@/components/landing-page/ContactSection"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"
import { TeamShowcaseSection } from "@/components/landing-page/TeamSection"
import { useEffect, useState } from "react"
import Image from "next/image"

function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#047146] transition-all duration-500">
      <div className="text-center max-w-lg px-4 relative">
        {/* Football field background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-1/2 w-1 h-full bg-white -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Animated Football */}
        <div className="absolute top-0 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 animate-bounce">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <div className="w-full h-full rounded-full border-2 border-black relative">
              <div className="absolute top-0 left-1/2 w-1 h-full bg-black -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo with pulse animation */}
          <div className="mb-8 mx-auto w-40 h-40 relative animate-pulse">
            <Image 
              src="/corporate-ballers.svg" 
              alt="Corporate Ballers Logo" 
              width={160} 
              height={160} 
              className="drop-shadow-lg"
            />
          </div>
          
          {/* Team Name with animation */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in opacity-0 text-white">
            CORPORATE BALLERS
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in animation-delay-200 opacity-0 text-[#EBC228]">
            FOOTBALL ACADEMY
          </h2>
          
          {/* Description with staggered animation */}
          <div className="lg:space-y-4 space-y-2 mb-8">
            <p className="lg:text-lg text-[16px] text-white animate-fade-in animation-delay-400 opacity-0">
              Building Champions On and Off the Pitch
            </p>
            <p className="text-white/80 animate-fade-in animation-delay-600 opacity-0">
              Where passion meets professionalism
            </p>
          </div>
          
          {/* Loading indicator with football theme */}
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#EBC228] to-[#047146] animate-loading-bar"></div>
            <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full animate-move-ball" style={{ animationDuration: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const visitedBefore = sessionStorage.getItem('visited')
    setIsFirstVisit(!visitedBefore)
    
    // Set loading time based on first visit or not
    const loadingTime = isFirstVisit ? 3000 : 5
    
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('visited', 'true')
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [isFirstVisit])

  return (
    <>
      {isLoading && <LoadingAnimation />}
      
      <main className={`min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
        <Navbar/>
        <HeroSection />
        <StatsSection />
        <TeamShowcaseSection/>
        <AboutSection />
        <ProgramsSection />
        <TestimonialsSection />
        <NewsSection />
        <ContactSection />
        <Footer/>
      </main>
    </>
  )
}