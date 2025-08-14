import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Award, Target } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"
import Image from "next/image"

// Function to generate initials from name
function getInitials(name: string) {
  const names = name.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()
  
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  
  return initials
}

export default function TeamPage() {
  const coaches = [
    {
      name: "Coach Shola Lawal",
      image: "/coach.jpg",
      bio: "A skilled and passionate coach dedicated to developing talent and building disciplined, professional footballers.",
    },
  ]

  const seniorPlayers = [
    {
      name: "Samonroka",
      position: "Goalkeeper",
      image: "/goalkeeper.jpg",
    },
    {
      name: "Tunde",
      position: "Centre Back",
      image: "/tunde.jpg",
    },
    {
      name: "Ajeye",
      position: "Centre Back",
      image: "/ajeye.jpg",
    },
    {
      name: "Beckhamp",
      position: "Midfielder",
      image: "/beckham.jpg",
    },
    {
      name: "Bobo",
      position: "Defensive Midfielder",
      image: "/bobo.jpg",
    },
    {
      name: "Ajani",
      position: "Defender",
      image: "/ajani.jpg",
    },
    {
      name: "Pelumi",
      position: "Midfielder",
      image: "/see.jpg",
    },
    {
      name: "Furqon",
      position: "Attacking Midfielder",
      image: "/furs.jpg",
    },
    {
      name: "Adebayo",
      position: "Attacker",
      image: "/adebayo.jpg",
    },
    {
      name: "Araromi N.",
      position: "Right Back",
      image: "/araromi.jpg",
    },
    {
      name: "Seedorf",
      position: "Midfielder",
      image: "/seedorf.jpg",
    },
    {
      name: "Nana",
      position: "Defensive Midfielder",
      image: "/nana.jpg",
    },
    {
      name: "Murr",
      position: "Attacker",
      image: "/murr.jpg",
    },
    {
      name: "Titta",
      position: "Attacking Striker",
      image: "/titta.jpg",
    },
    {
      name: "Jubril",
      position: "Attacker",
      image: "/jubril.jpg",
    },
    {
      name: "Alabi",
      position: "Midfielder",
      image: "/alabi-m.jpg",
    },
    {
      name: "Muftau",
      position: "Left Back",
      image: "/muftau.jpg",
    },
    {
      name: "Ay-Zee",
      position: "Left Winger",
      image: "/ayzee.jpg",
    },
    {
      name: "Araromi L.",
      position: "Attacker",
      image: "/araromi-l.jpg",
    },
    {
      name: "Waheed",
      position: "Attacker",
      image: "/waheed.jpg",
    },
    {
      name: "A. Johnson",
      position: "Striker",
      image: "/a-johnson.jpg",
    },
  ]

  const juniorPlayers = [
    {
      name: "Abduganiyu Azeez",
      position: "Centre Back",
      image: "/ganiyu.jpg",
    },
    {
      name: "Abdullahi Muhammed Furqon ",
      position: "Attacker",
      image: "/furqon.jpg",
    },
    {
      name: "Abdulqudus Tunde Atoyebi",
      position: "Centre Back",
      image: "/qudus.jpg",
    },
    {
      name: "Abdulrasaq Mubaraq",
      position: "Centre Back",
      image: "/muba.jpg",
    },
    {
      name: "Adelodun Muftau",
      position: "Right Back",
      image: "/adelodun.jpg",
    },
    {
      name: "Adeyanju Ridwan Bobo",
      position: "Defensive Midfielder",
      image: "/adeyanju.jpg",
    },
    {
      name: "Adura Samuel",
      position: "Left Back",
      image: "/adura.jpg",
    },
    {
      name: "Agbaje Boluwatife I.",
      position: "Winger",
      image: "/agbaje.jpg",
    },
    {
      name: "Agbaje Nasim",
      position: "Attacking Midfielder",
      image: "/nasim.jpg",
    },
    {
      name: "Araromi Lawal",
      position: "Attacker",
      image: "/lawal.jpg",
    },
    {
      name: "Atolagbe Treasure Onaolapo",
      position: "Left Winger",
      image: "/treasure.jpg",
    },
    {
      name: "David Oni Oluwatobi",
      position: "Goalkeeper",
      image: "/oni.jpg",
    },
    {
      name: "Haruna Onoroiza Ibrahim",
      position: "Left Back",
      image: "/haruna.jpg",
    },
    {
      name: "Ibrahim Moshood ",
      position: "Centre Back",
      image: "/moshood.jpg",
    },
    {
      name: "Idris Umar-Faruq",
      position: "Defensive Midfielder",
      image: "/idris.jpg",
    },
    {
      name: "Isaiah Sebastin",
      position: "Striker",
      image: "/isaiah.jpg",
    },
    {
      name: "Iskil Otolorin Ayinla",
      position: "Left Winger",
      image: "/ayinla.jpg",
    },
    {
      name: "Johnson Olaoluwa Akintola",
      position: "Striker",
      image: "/johnson.jpg",
    },
    {
      name: "Owolafe Mustapha",
      position: "Right Winger",
      image: "/mustapha.jpg",
    },
    {
      name: "Pelumi Olayinka A.",
      position: "Attacking Midfielder",
      image: "/pelumi.jpg",
    },
    {
      name: "Qudus Ajani",
      position: "Defender",
      image: "/q-ajani.jpg",
    },
    {
      name: "Ridwan Ishola Hamed",
      position: "Left Back",
      image: "/ridwan.jpg",
    },
    {
      name: "Sekoni Kazeem",
      position: "Midfielder",
      image: "/sekoni.jpg",
    },
    {
      name: "Usman Abdulwaheed Ozomata",
      position: "Attacker",
      image: "/usman.jpg",
    },
    {
      name: "Victor Adebayo",
      position: "Attacker",
      image: "/victor.jpg",
    },
    {
      name: "Oni Oluwatobi D",
      position: "Goalkeeper",
      image: "/tobi.jpg",
    },
    {
      name: "Yusuph Mukhtar",
      position: "Striker",
      image: "/yusuph.jpg",
    },
    {
      name: "Abubakar Abdulrasheed Olayinka",
      position: "Goalkeeper",
      image: "/avatar",
    },
    {
      name: "Olayanju Ridwan Oluwaseun",
      position: "Winger",
      image: "/avatar",
    },
    {
      name: "Abdulrasaq Mubaraq Omokayode",
      position: "Goalkeeper",
      image: "/avatar",
    },
    {
      name: "Akingboye David Temitope",
      position: "Midfielder",
      image: "/avatar",
    },
    {
      name: "Ismail Abdulwasiu Adebayo",
      position: "Attacker",
      image: "/avatar",
    },
    {
      name: "Okeowo Moses Shola",
      position: "Defensive Midfielder",
      image: "/avatar",
    },
    {
      name: "Jubril Adedayo Bello",
      position: "Right Winger",
      image: "/avatar",
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
            <TabsList className="grid lg:w-[50%] w-full mx-auto grid-cols-3 cursor-pointer">
              <TabsTrigger className="cursor-pointer" value="coaches">Coach</TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="senior">Senior</TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="junior">Junior</TabsTrigger>
            </TabsList>

            {/* Coaches Tab - Centered */}
            <TabsContent value="coaches" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="lg:text-4xl text-[28px] font-bold text-gray-900 mb-4">Our Coaching Staff</h2>
                <p className="lg:text-[16px] text-[14px] lg:w-[430px] leading-tight w-auto text-gray-600 max-w-3xl mx-auto">
                  Meet our experienced and qualified coaching team dedicated to developing the next generation of
                  football stars
                </p>
              </div>

              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full md:w-1/2">
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
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{coach.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                        {player.image !== "/avatar" ? (
                          <Image
                            src={player.image || "/placeholder.svg"}
                            alt={player.name}
                            className="w-full h-full object-cover object-top"
                            width={228}
                            height={228}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-4xl font-bold">
                            {getInitials(player.name)}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{player.position}</CardDescription>
                    </CardHeader>
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
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ">
                        {player.image !== "/avatar" ? (
                          <Image
                            src={player.image || "/placeholder.svg"}
                            alt={player.name}
                            className="w-full h-full object-cover"
                            width={128}
                            height={128}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#F5F5F5]  text-black text-2xl font-bold">
                            {getInitials(player.name)}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription className="text-[#047146] font-medium">{player.position}</CardDescription>
                    </CardHeader>
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