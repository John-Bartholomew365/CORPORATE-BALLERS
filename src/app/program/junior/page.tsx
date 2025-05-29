import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function JuniorCategoryPage() {
    const curriculum = [
        {
            week: "Weeks 1-4",
            title: "Foundation Skills",
            topics: [
                "Ball control and first touch",
                "Basic passing techniques",
                "Simple dribbling moves",
                "Introduction to teamwork",
            ],
        },
        {
            week: "Weeks 5-8",
            title: "Technical Development",
            topics: ["Shooting techniques", "Defensive positioning", "Crossing and heading", "Small-sided games"],
        },
        {
            week: "Weeks 9-12",
            title: "Tactical Awareness",
            topics: ["Formation basics", "Set piece fundamentals", "Match situations", "Leadership skills"],
        },
        {
            week: "Weeks 13-16",
            title: "Character Building",
            topics: ["Sportsmanship", "Discipline and respect", "Goal setting", "Academic balance"],
        },
    ]

    const benefits = [
        "Professional coaching from qualified instructors",
        "Age-appropriate training methods",
        "Focus on fun and enjoyment",
        "Character development and life skills",
        "Academic support and guidance",
        "Regular progress assessments",
        "Opportunity to advance to senior category",
        "Participation in youth tournaments",
    ]

    const schedule = [
        { day: "Monday", time: "4:00 PM - 6:00 PM", activity: "Technical Skills Training" },
        { day: "Wednesday", time: "4:00 PM - 6:00 PM", activity: "Tactical Development" },
        { day: "Saturday", time: "9:00 AM - 11:00 AM", activity: "Match Play & Fitness" },
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-[#FFFFCC] text-black">
                <div className="container mx-auto px-4">
                    <div className="mx-auto text-center">
                        <Badge className="mb-4 bg-[#F5F5B5] text-[#0F0F0F]">Ages 12-17</Badge>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Junior Category</h1>
                        <p className="text-[18px] leading-tight text-[#B0B3B8] lg:w-[480px] w-auto mb-8 m-auto">
                            Building the foundation for future football stars through comprehensive skill development and character
                            building
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                <Link href="/auth/register">Enroll Now</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-900"
                            >
                                <Link href="/contact">Ask Questions</Link>
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
                                Our Junior Category program is specifically designed for young players aged 12-17 who are beginning
                                their football journey or looking to improve their foundational skills. We focus on creating a positive,
                                supportive environment where young athletes can develop both their football abilities and personal
                                character.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                The program emphasizes fun, learning, and personal growth while introducing players to the fundamentals
                                of football. Our experienced coaches use age-appropriate training methods to ensure each player develops
                                at their own pace.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-[#FFFFCC]  rounded-lg">
                                    <div className="text-2xl font-bold text-[#0F0F0F]">₦5,000</div>
                                    <div className="text-sm text-gray-600">Registration Fee</div>
                                </div>
                                <div className="text-center p-4 bg-[#FFFFCC] rounded-lg">
                                    <div className="text-2xl font-bold text-[#0F0F0F]">3x</div>
                                    <div className="text-sm text-gray-600">Per Week</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden">
                                <img
                                    src="/junior.jpg"
                                    alt="Junior Category Training"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Schedule */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Schedule</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our carefully structured schedule ensures optimal development while maintaining academic balance
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {schedule.map((session, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-xl text-[#0F0F0F] ">{session.day}</CardTitle>
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

                        <div className="mt-8 p-6 bg-[#FFFFCC] rounded-lg">
                            <div className="flex items-center justify-center mb-4">
                                <MapPin className="h-5 w-5 text-[#0F0F0F] mr-2" />
                                <span className="font-semibold text-black">Training Location</span>
                            </div>
                            <p className="text-center text-gray-700">Stadium Complex, Ibrahim Taiwo Road, Ilorin, Kwara State</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curriculum */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Curriculum</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A progressive 16-week curriculum designed to build skills systematically
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {curriculum.map((phase, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">{phase.title}</CardTitle>
                                            <Badge variant="outline">{phase.week}</Badge>
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
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Benefits</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            What your child will gain from our Junior Category program
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3 bg-white p-6 rounded-lg shadow-sm">
                                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Card className="bg-gradient-to-r from-[#FFFFCC] to-[#FFFFE0] border-[#F5F5B5]">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-[#666633]">Enrollment Requirements</CardTitle>
                                <CardDescription className="text-[#999966]">What you need to join our Junior Category</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-[#666633] mb-3">Required Documents</h4>
                                        <ul className="space-y-2 text-[#999966]">
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Birth certificate or age verification
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Medical clearance certificate
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Parent/guardian consent form
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Recent passport photographs
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#666633] mb-3">Basic Requirements</h4>
                                        <ul className="space-y-2 text-[#999966]">
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Age between 12-17 years
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Basic physical fitness
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Commitment to training schedule
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Positive attitude and willingness to learn
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
            <section className="py-20 rounded-md bg-gradient-to-r from-[#FFFFCC] to-[#FFFFE0] border-[#F5F5B5] text-black lg:mx-20 mx-4">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6">Start Your Football Journey Today</h2>
                        <p className="text-[16px] text-[#B0B3B8] mb-8 lg:w-[440px] w-auto mx-auto">
                            Give your child the opportunity to develop their football skills while building character and making
                            lifelong friendships.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                                <Link href="/auth/register">Enroll Now</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-800"
                            >
                                <Link href="/contact">Schedule a Visit</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
