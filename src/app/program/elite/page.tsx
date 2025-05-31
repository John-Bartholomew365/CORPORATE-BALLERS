import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"

export default function EliteDevelopmentPage() {
  const curriculum = [
    {
      phase: "Phase 1",
      title: "Individual Excellence",
      topics: ["Personalized training plans", "1-on-1 coaching sessions", "Skill refinement", "Weakness analysis"],
    },
    {
      phase: "Phase 2",
      title: "Professional Preparation",
      topics: ["Trial preparation", "Scout networking", "Professional etiquette", "Contract negotiations"],
    },
    {
      phase: "Phase 3",
      title: "International Exposure",
      topics: ["International tournaments", "Exchange programs", "Cultural adaptation", "Global networking"],
    },
    {
      phase: "Phase 4",
      title: "Career Development",
      topics: ["Scholarship applications", "University partnerships", "Professional placements", "Long-term planning"],
    },
  ]

  const benefits = [
    "Personalized individual coaching sessions",
    "Professional trial opportunities",
    "International tournament participation",
    "Scholarship and university partnerships",
    "Mental conditioning and sports psychology",
    "Media training and public speaking",
    "Nutrition and lifestyle guidance",
    "Career planning and professional networking",
  ]

  const schedule = [
    { day: "Monday", time: "6:00 AM - 8:00 AM", activity: "Individual Technical Training" },
    { day: "Tuesday", time: "5:00 PM - 7:30 PM", activity: "Tactical & Match Analysis" },
    { day: "Wednesday", time: "6:00 AM - 8:00 AM", activity: "Physical Conditioning" },
    { day: "Thursday", time: "5:00 PM - 7:30 PM", activity: "Mental Training & Strategy" },
    { day: "Friday", time: "6:00 AM - 8:00 AM", activity: "Skills & Finishing" },
    { day: "Saturday", time: "9:00 AM - 12:00 PM", activity: "Match Play & Assessment" },
  ]

  const successStories = [
    { name: "Ibrahim Musa", achievement: "Signed with Kano Pillars FC", year: "2024" },
    { name: "Fatima Adebayo", achievement: "Full Scholarship to US University", year: "2023" },
    { name: "Ahmed Olatunji", achievement: "Nigeria U-20 National Team", year: "2024" },
  ]

  return (
    <div className="min-h-screen bg-white">

      <Navbar />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-900 via-yellow-800 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">By Invitation Only</Badge>
            <h1 className="lg:text-6xl text-[36px] font-bold mb-6">Elite Development</h1>
            <p className="lg:text-xl text-[16px] lg:w-[550px] w-auto text-yellow-100 leading-tight mb-8 mx-auto">
              Specialized program for exceptional talents with professional potential and international exposure
              opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-yellow-800 hover:bg-gray-100">
                <Link href="/contact">Request Assessment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent"
              >
                <Link href="/contact">Learn More</Link>
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
              <h2 className="lg:text-4xl text-3xl font-bold text-gray-900">Program Overview</h2>
              <p className="lg:text-lg text-[16px] text-gray-600 leading-relaxed">
                Our Elite Development program is an exclusive, invitation-only program designed for players who
                demonstrate exceptional talent and potential for professional football careers. This program provides
                the highest level of training, mentorship, and opportunities available at CBFA.
              </p>
              <p className="lg:text-lg text-[16px] text-gray-600 leading-relaxed">
                Elite players receive personalized attention, access to international opportunities, and direct pathways
                to professional clubs and university scholarships. Our elite coaching staff includes former professional
                players and internationally certified coaches.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">Invitation</div>
                  <div className="text-sm text-gray-600">Only</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">5x</div>
                  <div className="text-sm text-gray-600">Per Week</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl overflow-hidden">
                <img
                  src="/elite.jpg"
                  alt="Elite Development Training"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="lg:text-xl text-[15px] text-gray-600 lg:w-[550px] w-auto mx-auto leading-tight">
              Our elite program graduates continue to achieve remarkable success in professional football and academics
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-xl">{story.name}</CardTitle>
                    <Badge variant="secondary">{story.year}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-medium">{story.achievement}</p>
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
            <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Elite Training Schedule</h2>
            <p className="lg:text-xl text-[16px] text-gray-600 lg:w-[420px] w-auto mx-auto lg:px-0 px-4 leading-tight">
              Intensive, personalized training schedule designed for elite-level development
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedule.map((session, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg text-yellow-600">{session.day}</CardTitle>
                    <CardDescription className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {session.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-gray-900 text-sm">{session.activity}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-900">Training Locations</span>
              </div>
              <p className="text-center text-gray-700">
                Stadium Complex, Ibrahim Taiwo Road, Ilorin + Partner Facilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Development Phases</h2>
            <p className="lg:text-xl text-[16px] text-gray-600 lg:w-[485px] w-auto mx-auto leading-tight">
              A comprehensive development journey tailored to each elite player&apos;s goals and potential
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {curriculum.map((phase, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <Badge variant="outline" className="text-[#B0B3B8]">{phase.phase}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-yellow-500 mr-3 flex-shrink-0" />
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
            <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Elite Program Benefits</h2>
            <p className="lg:text-xl text-[16px] text-gray-600 max-w-3xl mx-auto leading-tight">
              Exclusive opportunities and resources available only to our elite development players
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-sm border">
                  <Star className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-100 border-yellow-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-yellow-900">Selection Criteria</CardTitle>
                <CardDescription className="text-yellow-700">
                  How players are selected for our Elite Development program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-3">Technical Excellence</h4>
                    <ul className="space-y-2 text-yellow-800">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Exceptional ball control and technique
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Advanced tactical understanding
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Outstanding match performance
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Consistent improvement trajectory
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-3">Personal Qualities</h4>
                    <ul className="space-y-2 text-yellow-800">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Strong mental resilience
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Leadership potential
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Dedication and work ethic
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Professional attitude
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
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white lg:mx-24 mx-4 mb-10 rounded-md">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="lg:text-4xl text-3xl font-bold mb-6">Ready for Elite Development?</h2>
            <p className="lg:text-[16px] text-[14px] text-yellow-100 mb-8 lg:w-[550px] w-auto mx-auto">
              If you believe you have what it takes to join our elite program, we want to hear from you. Contact us to
              discuss assessment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
                <Link href="/contact">Request Assessment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent"
              >
                <Link href="/contact">Schedule Meeting</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
