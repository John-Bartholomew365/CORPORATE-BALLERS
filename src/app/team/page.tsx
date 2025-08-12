import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Award, Target } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"
import Image from "next/image"

export default function TeamPage() {
  const coaches = [
    {
      name: "Coach Shola Lawal",
      position: "Head Coach & Technical Director",
      experience: "15 years",
      qualifications: "UEFA B License, CAF License",
      image: "/coach.jpg",
      specialization: "Tactical Development",
      bio: "A skilled and passionate coach dedicated to developing talent and building disciplined, professional footballers.",
    },
    // {
    //   name: "Coach Sarah Okonkwo",
    //   position: "Assistant Coach",
    //   experience: "8 years",
    //   qualifications: "CAF C License, Sports Science Degree",
    //   image: "/placeholder.svg?height=300&width=300",
    //   specialization: "Physical Conditioning",
    //   bio: "Specialized in fitness training and injury prevention with a background in sports science.",
    // },
    // {
    //   name: "Coach David Musa",
    //   position: "Goalkeeping Coach",
    //   experience: "12 years",
    //   qualifications: "FIFA Goalkeeping Certificate",
    //   image: "/placeholder.svg?height=300&width=300",
    //   specialization: "Goalkeeping",
    //   bio: "Former professional goalkeeper with expertise in modern goalkeeping techniques and training methods.",
    // },
    // {
    //   name: "Coach Fatima Ibrahim",
    //   position: "Youth Development Coach",
    //   experience: "6 years",
    //   qualifications: "CAF D License, Child Psychology",
    //   image: "/placeholder.svg?height=300&width=300",
    //   specialization: "Youth Development",
    //   bio: "Specialized in working with young players, focusing on skill development and character building.",
    // },
  ]

  const seniorPlayers = [
    {
      name: "Samonroka",
      position: "Goalkeeper",
      age: 24,
      image: "/goalkeeper.jpg",
      achievements: ["Team Captain", "Best Player 2024"],
      stats: { goals: 12, assists: 8, appearances: 28 },
    },
    {
      name: "Tunde",
      position: "Centre Back",
      age: 22,
      image: "/tunde.jpg",
      achievements: ["Top Scorer 2024"],
      stats: { goals: 18, assists: 4, appearances: 26 },
    },
    {
      name: "Ajeye",
      position: "Centre Back",
      age: 21,
      image: "/ajeye.jpg",
      achievements: ["Best Goalkeeper 2023"],
      stats: { cleanSheets: 15, saves: 89, appearances: 24 },
    },
    {
      name: "Beckhamp",
      position: "Midfielder",
      age: 23,
      image: "/beckham.jpg",
      achievements: ["Most Consistent Player"],
      stats: { goals: 3, assists: 6, appearances: 30 },
    },
    {
      name: "Bobo",
      position: "Defensive Midfielder",
      age: 20,
      image: "/bobo.jpg",
      achievements: ["Rising Star 2024"],
      stats: { goals: 8, assists: 12, appearances: 25 },
    },
    {
      name: "Ajani",
      position: "Defender",
      age: 25,
      image: "/ajani.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Araromi N.",
      position: "Right Back",
      age: 25,
      image: "/araromi.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Seedorf",
      position: "Midfielder",
      age: 25,
      image: "/seedorf.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Nana",
      position: "Defensive Midfielder",
      age: 25,
      image: "/nana.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Murr",
      position: "Attacker",
      age: 25,
      image: "/murr.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Titta",
      position: "Attacking Striker",
      age: 25,
      image: "/titta.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Jubril",
      position: "Attacker",
      age: 25,
      image: "/jubril.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Alabi",
      position: "Midfielder",
      age: 25,
      image: "/alabi-m.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Muftau",
      position: "Left Back",
      age: 25,
      image: "/muftau.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Ay-Zee",
      position: "Left Winger",
      age: 25,
      image: "/ayzee.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Araromi L.",
      position: "Attacker",
      age: 25,
      image: "/araromi-l.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "Waheed",
      position: "Attacker",
      age: 25,
      image: "/waheed.jpg",
      achievements: ["Most Assists 2024"],
      stats: { goals: 6, assists: 15, appearances: 29 },
    },
    {
      name: "A. Johnson",
      position: "Striker",
      age: 25,
      image: "/a-johnson.jpg",
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
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="lg:text-6xl text-4xl font-bold mb-6">Our Team</h1>
            <p className="lg:text-[16px] text-[14px] text-green-100 leading-tight lg:w-[440px] w-auto mx-auto">
              From experienced coaches to rising stars, our team is the heartbeat of CBFA, committed to excellence, growth, and the beautiful game.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
          </div>
        </div>
      </section>

      {/* Team Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="coaches" className="space-y-8">
            <TabsList className="grid lg:w-[50%] mx-auto grid-cols-2 cursor-pointer">
              <TabsTrigger className="cursor-pointer" value="coaches">Coaching Staff</TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="senior">Players</TabsTrigger>
              {/* <TabsTrigger className="cursor-pointer" value="junior">Junior Players</TabsTrigger> */}
            </TabsList>

            {/* Coaches Tab */}
            <TabsContent value="coaches" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="lg:text-4xl text-[28px] font-bold text-gray-900 mb-4">Our Coaching Staff</h2>
                <p className="lg:text-[16px] text-[14px] lg:w-[430px] leading-tight w-auto text-gray-600 max-w-3xl mx-auto">
                  Meet our experienced and qualified coaching team dedicated to developing the next generation of
                  football stars
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coaches.map((coach, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={coach.image || "/placeholder.svg"}
                          alt={coach.name}
                          className="w-full h-full object-cover object-top"
                          width={228}
                          height={228}
                        />
                      </div>
                      <CardTitle className="text-xl">{coach.name}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{coach.position}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Experience:</span>
                          <p className="text-gray-600">{coach.experience}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Specialization:</span>
                          <p className="text-gray-600">{coach.specialization}</p>
                        </div>
                      </div> */}
                      {/* <div>
                        <span className="font-medium text-gray-700">Qualifications:</span>
                        <p className="text-gray-600">{coach.qualifications}</p>
                      </div> */}
                      <p className="text-gray-600 text-sm leading-relaxed">{coach.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Senior Players Tab */}
            <TabsContent value="senior" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="lg:text-4xl text-[28px] font-bold text-gray-900 mb-4">Senior Category Players</h2>
                <p className="lg:text-[16px] text-[14px] lg:w-[430px] leading-tight w-auto text-gray-600 max-w-3xl mx-auto">
                  Our senior players represent the pinnacle of talent and dedication at CBFA
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seniorPlayers.map((player, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          className="w-full h-full object-cover object-top"
                          width={228}
                          height={228}
                        />
                      </div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{player.position}</CardDescription>
                      {/* <Badge variant="secondary">Age {player.age}</Badge> */}
                    </CardHeader>
                    {/* <CardContent className="space-y-4">
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
                            <Badge key={achIndex} variant="outline" className="text-xs text-[#B0B3B8]">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent> */}
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Junior Players Tab */}
            <TabsContent value="junior" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="lg:text-4xl text-[28px] font-bold text-gray-900 mb-4">Junior Category Players</h2>
                <p className="lg:text-[16px] text-[14px] lg:w-[430px] leading-tight w-auto text-gray-600 max-w-3xl mx-auto">
                  Our promising young talents who represent the future of CBFA and Nigerian football
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {juniorPlayers.map((player, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
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
                            <Badge key={achIndex} variant="outline" className="text-xs text-[#B0B3B8]">
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white lg:mx-24 mx-4 rounded-md mb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="lg:text-4xl text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="lg:text-[16px] text-[14px] lg:w-[530px] w-auto text-green-100 mb-8 mx-auto leading-tight">
              Whether you&apos;re a player ready to level up your game or a coach looking to inspire the next generation, there&apos;s a place for you in the CBFA family. Let&apos;s build greatness together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/auth/register">Register as Player</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
