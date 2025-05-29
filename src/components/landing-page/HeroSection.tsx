import { Button } from "@/components/ui/button"
import { ArrowRight, User } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center lg:mt-0 mt-16 justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center ">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="lg:text-[54px] text-[35px] font-bold leading-tight">
              CORPORATE BALLERS
              <span className="block text-[#EBC228]">FOOTBALL ACADEMY</span>
            </h1>
            <p className="lg:text-[20px] text-[16.5px] text-gray-200 max-w-3xl mx-auto leading-tight">
              Nurturing raw talent into professional excellence. <br /> Building champions on and off the field.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-black font-semibold px-8 py-4 text-lg"
            >
              <Link href="/auth/register">
                Join Our Academy <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="border-yellow-500 lg:w-auto w-[250px] cursor-pointer bg-transparent text-white px-8 py-4 text-lg"
              >
                <User className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="lg:text-3xl text-[25px] font-bold text-[#EBC228]">12+</div>
              <div className="text-gray-300">Minimum Age</div>
            </div>
            <div className="text-center">
              <div className="lg:text-3xl text-[25px] font-bold text-[#EBC228]">Professional</div>
              <div className="text-gray-300">Coaching Staff</div>
            </div>
            <div className="text-center">
              <div className="lg:text-3xl text-[25px] font-bold text-[#EBC228]">Ilorin</div>
              <div className="text-gray-300">Kwara State</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-400/20 rounded-full animate-pulse delay-1000" />
    </section>
  )
}
