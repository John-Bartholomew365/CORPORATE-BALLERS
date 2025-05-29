import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, GraduationCap, ArrowRight, Clock, Target, Award } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      id: "junior",
      title: "Junior Category",
      subtitle: "Ages 12-17",
      description:
        "Foundation training focusing on skill development, teamwork, and character building for young talents.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Users,
      features: [
        "Basic football skills development",
        "Physical fitness training",
        "Team dynamics and cooperation",
        "Academic support and guidance",
        "Character building activities",
        "Regular skill assessments",
      ],
      duration: "6 months program",
      schedule: "3 times per week",
      price: "₦12,000/month",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      href: "/programs/junior",
    },
    {
      id: "senior",
      title: "Senior Category",
      subtitle: "Ages 18+",
      description:
        "Advanced training for serious players aiming for professional football careers and higher competition levels.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Trophy,
      features: [
        "Advanced tactical training",
        "Professional preparation",
        "Career guidance and mentorship",
        "Tournament participation",
        "Fitness and conditioning",
        "Leadership development",
      ],
      duration: "12 months program",
      schedule: "4 times per week",
      price: "₦18,000/month",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      href: "/programs/senior",
    },
    {
      id: "elite",
      title: "Elite Development",
      subtitle: "Selected Players",
      description:
        "Specialized program for exceptional talents with professional potential and international exposure opportunities.",
      image: "/placeholder.svg?height=300&width=400",
      icon: GraduationCap,
      features: [
        "Individual coaching sessions",
        "Professional trial opportunities",
        "International exposure programs",
        "Scholarship opportunities",
        "Mental conditioning",
        "Media and communication training",
      ],
      duration: "Ongoing program",
      schedule: "5 times per week",
      price: "By invitation only",
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-yellow-600",
      href: "/programs/elite",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Comprehensive training programs designed to develop players at every level, from beginners to elite
              athletes
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each program is carefully structured to meet the specific needs and goals of players at different stages
              of their football journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card
                key={index}
                className={`${program.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 mx-auto`}
                  >
                    <program.icon className={`h-8 w-8 ${program.iconColor}`} />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <Badge variant="secondary">{program.subtitle}</Badge>
                  </div>
                  <CardDescription className="text-gray-600 text-base">{program.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Program Image */}
                  <div className="aspect-video bg-white rounded-lg overflow-hidden">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Program Features</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Program Details */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration
                      </span>
                      <span className="font-medium">{program.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Target className="h-4 w-4 mr-2" />
                        Schedule
                      </span>
                      <span className="font-medium">{program.schedule}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-2" />
                        Investment
                      </span>
                      <span className="font-medium text-green-600">{program.price}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href={program.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join hundreds of players who have transformed their lives through our comprehensive training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/auth/register">Register Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
