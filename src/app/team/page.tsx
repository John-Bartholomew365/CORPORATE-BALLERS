import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Award, Target } from "lucide-react"
import Link from "next/link"

export default function TeamPage() {
  const coaches = [
    {
      name: "Coach Michael Adebayo",
      position: "Head Coach & Technical Director",
      experience: "15 years",
      qualifications: "UEFA B License, CAF License",
      image: "/placeholder.svg?height=300&width=300",
      specialization: "Tactical Development",
      bio: "Former professional player with extensive coaching experience in youth development and tactical training.",
    },
    {
      name: "Coach Sarah Okonkwo",
      position: "Assistant Coach",
      experience: "8 years",
      qualifications: "CAF C License, Sports Science Degree",
      image: "/placeholder.svg?height=300&width=300",
      specialization: "Physical Conditioning",
      bio: "Specialized in fitness training and injury prevention with a background in sports science.",
    },
    {
      name: "Coach David Musa",
      position: "Goalkeeping Coach",
      experience: "12 years",
      qualifications: "FIFA Goalkeeping Certificate",
      image: "/placeholder.svg?height=300&width=300",
      specialization: "Goalkeeping",
      bio: "Former professional goalkeeper with expertise in modern goalkeeping techniques and training methods.",
    },
    {
      name: "Coach Fatima Ibrahim",
      position: "Youth Development Coach",
      experience: "6 years",
      qualifications: "CAF D License, Child Psychology",
      image: "/placeholder.svg?height=300&width=300",
      specialization: "Youth Development",
      bio: "Specialized in working with young players, focusing on skill development and character building.",
    },
  ]

  const seniorPlayers = [
    {
      name: "Ibrahim Olatunji",
      position: "Captain / Central Midfielder",
      age: 24,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Team Captain", "Best Player 2024"],
      stats: { goals: 12, assists: 8, appearances: 28 },
    },
    {
      name: "Ahmed Bello",
      position: "Striker",
      age: 22,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Top Scorer 2024"],
      stats: { goals: 18, assists: 4, appearances: 26 },
    },
    {
      name: "Fatima Adebayo",
      position: "Goalkeeper",
      age: 21,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Best Goalkeeper 2023"],
      stats: { cleanSheets: 15, saves: 89, appearances: 24 },
    },
    {
      name: "John Musa",
      position: "Defender",
      age: 23,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Most Consistent Player"],
      stats: { goals: 3, assists: 6, appearances: 30 },
    },
    {
      name: "Grace Okonkwo",
      position: "Winger",
      age: 20,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Rising Star 2024"],
      stats: { goals: 8, assists: 12, appearances: 25 },
    },
    {
      name: "Samuel Adamu",
      position: "Central Midfielder",
      age: 25,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
  ]

  const juniorPlayers = [
    {
      name: "Daniel Okafor",
      position: "Forward",
      age: 16,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Junior Top Scorer"],
      stats: { goals: 15, assists: 7, appearances: 20 },
    },
    {
      name: "Blessing Uche",
      position: "Midfielder",
      age: 15,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Most Improved Player"],
      stats: { goals: 5, assists: 10, appearances: 22 },
    },
    {
      name: "Emmanuel Sani",
      position: "Defender",
      age: 17,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Best Defender"],
      stats: { goals: 2, assists: 4, appearances: 24 },
    },
    {
      name: "Aisha Mohammed",
      position: "Goalkeeper",
      age: 14,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Youngest Player"],
      stats: { cleanSheets: 12, saves: 67, appearances: 18 },
    },
    {
      name: "Victor Eze",
      position: "Winger",
      age: 16,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Fastest Player"],
      stats: { goals: 9, assists: 8, appearances: 21 },
    },
    {
      name: "Khadija Bello",
      position: "Midfielder",
      age: 15,
      image: "/placeholder.svg?height=200&width=200",
      achievements: ["Team Spirit Award"],
      stats: { goals: 4, assists: 9, appearances: 23 },
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Team</h1>
            <p className="text-[17px] text-green-100 leading-tight lg:w-[520px] w-auto mx-auto">
              Meet the dedicated coaches and talented players who make CBFA a center of excellence in football
              development
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">200+</div>
              <div className="text-gray-600">Total Players</div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">12</div>
              <div className="text-gray-600">Professional Coaches</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-gray-600">Tournaments Won</div>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Alumni in Pro Clubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="coaches" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 ">
              <TabsTrigger className="" value="coaches">Coaching Staff</TabsTrigger>
              <TabsTrigger className="" value="senior">Senior Players</TabsTrigger>
              <TabsTrigger className="" value="junior">Junior Players</TabsTrigger>
            </TabsList>

            {/* Coaches Tab */}
            <TabsContent value="coaches" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Coaching Staff</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Meet our experienced and qualified coaching team dedicated to developing the next generation of
                  football stars
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coaches.map((coach, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={coach.image || "/placeholder.svg"}
                          alt={coach.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-xl">{coach.name}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{coach.position}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Experience:</span>
                          <p className="text-gray-600">{coach.experience}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Specialization:</span>
                          <p className="text-gray-600">{coach.specialization}</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Qualifications:</span>
                        <p className="text-gray-600">{coach.qualifications}</p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{coach.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Senior Players Tab */}
            <TabsContent value="senior" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Senior Category Players</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our senior players represent the pinnacle of talent and dedication at CBFA
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seniorPlayers.map((player, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{player.position}</CardDescription>
                      <Badge variant="secondary">Age {player.age}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Season Stats</h4>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-green-600">
                              {player.stats.goals || player.stats.cleanSheets || 0}
                            </div>
                            <div className="text-gray-600">
                              {player.stats.goals !== undefined ? "Goals" : "Clean Sheets"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600">
                              {player.stats.assists || player.stats.saves || 0}
                            </div>
                            <div className="text-gray-600">
                              {player.stats.assists !== undefined ? "Assists" : "Saves"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-600">{player.stats.appearances}</div>
                            <div className="text-gray-600">Apps</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Achievements</h4>
                        <div className="space-y-1">
                          {player.achievements.map((achievement, achIndex) => (
                            <Badge key={achIndex} variant="outline" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Junior Players Tab */}
            <TabsContent value="junior" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Junior Category Players</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our promising young talents who represent the future of CBFA and Nigerian football
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {juniorPlayers.map((player, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">{player.position}</CardDescription>
                      <Badge variant="secondary">Age {player.age}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Season Stats</h4>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-green-600">
                              {player.stats.goals || player.stats.cleanSheets || 0}
                            </div>
                            <div className="text-gray-600">
                              {player.stats.goals !== undefined ? "Goals" : "Clean Sheets"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600">
                              {player.stats.assists || player.stats.saves || 0}
                            </div>
                            <div className="text-gray-600">
                              {player.stats.assists !== undefined ? "Assists" : "Saves"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-600">{player.stats.appearances}</div>
                            <div className="text-gray-600">Apps</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Achievements</h4>
                        <div className="space-y-1">
                          {player.achievements.map((achievement, achIndex) => (
                            <Badge key={achIndex} variant="outline" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-green-100 mb-8">
              Ready to be part of the CBFA family? Whether you&apos;re a player looking to develop your skills or a coach
              wanting to make a difference, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/auth/register">Register as Player</Link>
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
