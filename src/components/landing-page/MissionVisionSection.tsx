import { Target, Eye } from "lucide-react"

export function MissionVisionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
          <p className="text-[16px] text-gray-600 lg:w-[340px] w-auto mx-auto leading-tight">
            Driving excellence in football development while building character and contributing to society
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 rounded-full p-4 mr-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p>
                To harness raw talent and nurture them to full maturity, developing and molding individuals into
                professionals in their football careers.
              </p>
              <p>
                Our goal is to contribute to building a morally upright society through football by redirecting youth
                away from the streets, engaging their minds positively, and discouraging involvement in social vices and
                criminal activities.
              </p>
              <p>
                Through our educational initiatives, we aim to instill good sportsmanship, discipline, and an
                understanding of the importance of solidarity and cooperation among individuals.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 rounded-full p-4 mr-4">
                <Eye className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] ">
              <p>
                Our vision is to identify and nurture talent from a young age, providing all the necessary logistics and
                support for individuals to reach the pinnacle of their careers.
              </p>
              <p>
                Our entire coaching staff is well-equipped with the technical expertise to recognize, groom and develop
                talent whenever they encounter it.
              </p>
              <p>
                We envision becoming the premier football academy in Nigeria, known for producing world-class players
                who excel both on and off the field.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
