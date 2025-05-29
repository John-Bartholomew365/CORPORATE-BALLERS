import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Trophy, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function SeniorCategoryPage() {
  const curriculum = [
    {
      month: "Months 1-3",
      title: "Advanced Technical Skills",
      topics: ["Advanced ball control", "Precision passing", "Clinical finishing", "1v1 situations"],
    },
    {
      month: "Months 4-6",
      title: "Tactical Mastery",
      topics: ["Formation systems", "Positional play", "Set piece execution", "Game reading"],
    },
    {
      month: "Months 7-9",
      title: "Physical & Mental Conditioning",
      topics: ["Strength training", "Endurance building", "Mental toughness", "Injury prevention"],
    },
    {
      month: "Months 10-12",
      title: "Professional Preparation",
      topics: ["Trial preparation", "Career guidance", "Leadership development", "Media training"],
    },
  ]

  const benefits = [
    "Professional-level coaching and training",
    "Advanced tactical and technical development",
    "Opportunity for professional trials",
    "Career guidance and mentorship",
    "Participation in competitive tournaments",
    "Fitness and conditioning programs",
    "Leadership and communication skills",
    "Pathway to elite development program",
  ]

  const schedule = [
    { day: "Monday", time: "5:00 PM - 7:30 PM", activity: "Technical & Tactical Training" },
    { day: "Wednesday", time: "5:00 PM - 7:30 PM", activity: "Match Preparation & Strategy" },
    { day: "Friday", time: "5:00 PM - 7:30 PM", activity: "Physical Conditioning" },
    { day: "Saturday", time: "3:00 PM - 5:30 PM", activity: "Match Play & Analysis" },
  ]

  const achievements = [
    { title: "Regional Champions", year: "2024", description: "Kwara State Senior League" },
    { title: "Best Academy", year: "2023", description: "North Central Zone" },
    { title: "Professional Signings", year: "2024", description: "8 players to professional clubs" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-800">Ages 18+</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Senior Category</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed mb-8">
              Advanced training for serious players aiming for professional football careers and competitive excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/auth/register">Join Senior Category</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-900"
              >
                <Link href="/contact">Book Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Program Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Senior Category program is designed for players aged 18 and above who are serious about pursuing
                football at a competitive or professional level. This intensive program combines advanced technical
                training, tactical sophistication, and professional preparation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Players in this category receive individualized attention, participate in competitive matches, and have
                opportunities for professional trials and career advancement. Our experienced coaching staff provides
                mentorship both on and off the field.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₦5,000</div>
                  <div className="text-sm text-gray-600">Monthly Fee</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4x</div>
                  <div className="text-sm text-gray-600">Per Week</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden">
                <img
                  src="/senior.jpg"
                  alt="Senior Category Training"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our senior category continues to excel in competitions and player development
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-xl">{achievement.title}</CardTitle>
                    <Badge variant="secondary">{achievement.year}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Schedule */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Schedule</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intensive training schedule designed for serious players committed to excellence
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {schedule.map((session, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-green-600">{session.day}</CardTitle>
                    <CardDescription className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {session.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-gray-900">{session.activity}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-900">Training Location</span>
              </div>
              <p className="text-center text-gray-700">Stadium Complex, Ibrahim Taiwo Road, Ilorin, Kwara State</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Curriculum</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive 12-month program covering all aspects of professional football development
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {curriculum.map((phase, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <Badge variant="outline">{phase.month}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">What you&apos;ll gain from our Senior Category program</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-sm border">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-900">Enrollment Requirements</CardTitle>
                <CardDescription className="text-green-700">What you need to join our Senior Category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">Required Documents</h4>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Valid identification document
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Medical fitness certificate
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Previous football experience records
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Recent passport photographs
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">Basic Requirements</h4>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Age 18 years and above
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Good physical fitness level
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Previous football experience
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Commitment to intensive training
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Take Your Game to the Next Level</h2>
            <p className="text-xl text-green-100 mb-8">
              Join our senior category and take the next step towards achieving your professional football dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/auth/register">Join Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-800"
              >
                <Link href="/contact">Book Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
