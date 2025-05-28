import { Trophy, Users, Target } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "200+",
      label: "Active Players",
      description: "Across junior and senior categories",
    },
    {
      icon: Trophy,
      number: "15+",
      label: "Tournaments Won",
      description: "Local and regional competitions",
    },
    {
      icon: Target,
      number: "95%",
      label: "Success Rate",
      description: "Players advancing to higher levels",
    },
    // {
    //   icon: Award,
    //   number: "10+",
    //   label: "Professional Coaches",
    //   description: "Qualified and experienced staff",
    // },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
          <p className="text-xl text-gray-600 lg:w-[400px] w-auto mx-auto leading-tight">
            Numbers that speak to our commitment to excellence and player development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-800 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
