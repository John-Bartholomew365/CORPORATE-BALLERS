import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutSection() {
  // const features = [
  //   "High-quality standardized training",
  //   "Qualified coaching staff",
  //   "Junior and senior categories",
  //   "Character development focus",
  //   "Professional pathway programs",
  // ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="lg:text-4xl text-[30px] font-bold text-gray-900 mb-6">About Corporate Ballers Football Academy</h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6 lg:w-[485px] w-auto">
                Corporate Ballers Football Academy (CBFA) is a rapidly growing football club situated in Ilorin, Kwara
                State, Nigeria. We cater to individuals aged 12 years and above, creating a pathway for players to
                progress through the ranks and realize their God-given talents.
              </p>
              {/* <p className="text-[16px] text-gray-600 leading-relaxed">
                True to our name, Corporate Ballers is a well-organized entity characterized by high discipline and
                meticulousness in all our activities. We foster positive working relationships across diverse
                backgrounds, including different tribes, races, colors, and religions.
              </p> */}
            </div>

            {/* <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-[15px]">{feature}</span>
                </div>
              ))}
            </div> */}

            <Button asChild size="lg" className="bg-[#047146] text-white">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden">
              <img
                src="/about.jpg"
                alt="CBFA Training Session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute lg:-bottom-6 -bottom-8 lg:-right-6 -right-3 bg-yellow-400 rounded-2xl lg:p-6 p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">RC: 7580099</div>
                <div className="text-sm text-gray-700">Registered Company</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
