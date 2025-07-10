import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function TeamShowcaseSection() {

    const featuredPlayers = [
        {
            name: "Abdullahi Musa",
            position: "Striker",
            age: 17,
            achievement: "Top Scorer - 23 Goals",
            image: "/winner.jpg",
            status: "Scouted by Professional Club",
        },
        {
            name: "Ibrahim Yakubu",
            position: "Midfielder",
            age: 16,
            achievement: "Best Player Award 2023",
            image: "/match.jpg",
            status: "National Youth Team Call-up",
        },
        {
            name: "Fatima Aliyu",
            position: "Goalkeeper",
            age: 15,
            achievement: "Clean Sheet Record Holder",
            image: "/before-match.jpg",
            status: "State Team Captain",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Our Team</Badge>
                    <h2 className="lg:text-4xl text-[26px] font-bold text-gray-900 mb-6">Meet Our Rising Stars</h2>
                    <p className="text-[16px] text-gray-600 max-w-3xl mx-auto leading-tight">
                        Join a winning team! Our players are making waves in local and national competitions. Your journey to
                        football excellence starts here.
                    </p>
                </div>

                {/* Featured Players */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Star Players</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredPlayers.map((player, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={player.image || "/placeholder.svg"}
                                        alt={player.name}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <CardContent className="p-6 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{player.name}</h4>
                                        <p className="text-green-600 font-medium mb-2">{player.position}</p>
                                        <p className="text-gray-600 mb-3">{player.achievement}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs text-gray-400 mt-4 w-fit">
                                        {player.status}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Success Stories */}
                <div className="bg-green-900 rounded-2xl p-8 md:p-12 text-white mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-6">Success Stories</h3>
                        <blockquote className="text-[18px] lg:text-2xl italic mb-6">
                            &quot;CBFA transformed my son from a street footballer to a disciplined athlete. Today, he&apos;s been scouted by
                            three professional clubs and represents Kwara State in national competitions. The academy doesn&apos;t just
                            train players; it builds champions.&quot;
                        </blockquote>

                        <div className="text-center mt-4">
                            <div className="font-semibold">Mrs. Aisha Mohammed</div>
                            <div className="text-green-200">Parent of Ibrahim Yakubu</div>
                        </div>

                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-white rounded-2xl p-5 lg:p-12 shadow-lg">
                    <h3 className="text-[24px] lg:text-3xl leading-tight font-bold text-gray-900 mb-4">Ready to Join Our Winning Team?</h3>
                    <p className="text-[16px] text-gray-600 mb-8 max-w-2xl mx-auto">
                        Don&apos;t just watch from the sidelines. Be part of the next success story. Our professional coaches are ready
                        to unlock your potential.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#047146] text-white hover:bg-green-700 px-8 py-4 text-lg">
                            <Link href="/auth/register">
                                Register Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-[#047146] text-[#047146] hover:bg-green-50 px-8 py-4 text-lg bg-transparent"
                        >
                            <Link href="/team">Meet the Full Team</Link>
                        </Button>
                    </div>
                    <div className="lg:mt-6 mt-10 lg:flex lg:flex-row flex-col lg:space-y-0 space-y-5 items-center justify-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Free Trial Session
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Professional Coaching
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Scholarship Opportunities
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}