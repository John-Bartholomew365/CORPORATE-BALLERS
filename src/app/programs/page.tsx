import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Target, Clock, Calendar, Star, CheckCircle, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-600">CBFA</h1>
              <p className="text-xs text-muted-foreground">Football Academy</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/programs" className="text-sm font-medium text-green-600">
              Programs
            </Link>
            <Link href="/coaches" className="text-sm font-medium hover:text-green-600 transition-colors">
              Coaches
            </Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-green-600 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">
              Training Programs
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Develop Your Skills with
              <span className="text-green-600"> Professional Training</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our comprehensive training programs designed to develop players at every level, from beginners to advanced athletes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Junior Program */}
            <Card className="border-green-200 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800">Ages 12-17</Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl">Junior Category</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Foundation building program for young aspiring footballers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Junior training session"
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Program Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Fundamental Skills Development</span>
                        <p className="text-sm text-muted-foreground">Ball control, passing, shooting, and dribbling basics</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Character Building</span>
                        <p className="text-sm text-muted-foreground">Discipline, teamwork, and sportsmanship development</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Educational Support</span>
                        <p className="text-sm text-muted-foreground">Academic guidance and life skills training</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Progressive Pathway</span>
                        <p className="text-sm text-muted-foreground">Clear route to senior category advancement</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <p className="text-sm text-muted-foreground">2 hours/session</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Schedule</span>
                    </div>
                    <p className="text-sm text-muted-foreground">5 days/week</p>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/auth/register">Join Junior Program</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Senior Program */}
            <Card className="border-green-200 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800">Ages 18+</Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl">Senior Category</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Advanced training for serious athletes and professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width="400"
                    height="200"
                    alt="Senior training session"
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Program Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Professional Standards</span>
                        <p className="text-sm text-muted-foreground">Elite-level training methodologies and techniques</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Career Development</span>
                        <p className="text-sm text-muted-foreground">Professional pathway guidance and opportunities</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">League Participation</span>
                        <p className="text-sm text-muted-foreground">Competitive matches and tournament opportunities</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Professional Networking</span>
                        <p className="text-sm text-muted-foreground">Connections with scouts and professional clubs</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <p className="text-sm text-muted-foreground">3 hours/session</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Schedule</span>
                    </div>
                    <p className="text-sm text-muted-foreground">6 days/week</p>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/auth/register">Join Senior Program</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialized Training */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Specialized Training Modules
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Additional focused training sessions to enhance specific skills and abilities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>
                  Advanced ball control, passing accuracy, and shooting precision
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Ball mastery drills</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Precision passing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Finishing techniques</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Physical Conditioning</CardTitle>
                <CardDescription>
                  Strength, speed, agility, and endurance development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Strength training</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Speed & agility</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Cardiovascular fitness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Tactical Training</CardTitle>
                <CardDescription>
                  Game understanding, positioning, and strategic play
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Formation play</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Set piece execution</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Match analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Goalkeeper Training</CardTitle>
                <CardDescription>
                  Specialized training for goalkeeping skills and techniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Shot stopping</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Distribution skills</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Command of area</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Mental Preparation</CardTitle>
                <CardDescription>
                  Psychological training for peak performance and resilience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Confidence building</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Focus techniques</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Pressure management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Match Preparation</CardTitle>
                <CardDescription>
                  Pre-game preparation and competitive match experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Warm-up routines</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Team coordination</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>Match simulation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

            {/* Training Schedule */}
            <section className="py-16 lg:py-24">
              <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    Weekly Training Schedule
                  </h2>
                  <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                    Our structured training schedule ensures comprehensive development across all skill areas
                  </p>
                </div>
      
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <span>Junior Category Schedule</span>
                      </CardTitle>
                      <CardDescription>Ages 12-17 years</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { day: "Monday", time: "4:00 PM - 6:00 PM", focus: "Technical Skills" },
                          { day: "Tuesday", time: "4:00 PM - 6:00 PM", focus: "Physical Training" },
                          { day: "Wednesday", time: "4:00 PM - 6:00 PM", focus: "Tactical Training" },
                          { day: "Thursday", time: "4:00 PM - 6:00 PM", focus: "Match Preparation" },
                          // ...rest of your schedule and component code
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b py-2">
                            <span className="font-medium">{item.day}</span>
                            <span className="text-muted-foreground">{item.time}</span>
                            <span className="text-green-600">{item.focus}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        )
      }
