import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Users, Award, Heart, Globe, Trophy, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 lg:py-[150px] bg-gradient-to-br from-green-50 to-green-100">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">About CBFA</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Building Champions, <br />
              <span className="text-[#047146]"> Shaping Lives</span>
            </h1>
            <p className="lg:text-[16px] text-[14px] text-muted-foreground lg:w-[590px] mx-auto">
              At Corporate Ballers Football Academy, we’re more than just a football club; we are a community. We train talent, build character, and create real pathways for success.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Corporate Ballers Football Academy (CBFA) is a fast-growing football club based in Ilorin, Kwara State, Nigeria. Founded with a clear vision to turn raw talent into professional excellence, we’ve become a go-to academy for young, ambitious footballers.
                </p>
                <p>
                  We train players aged 12 and above across both junior and senior levels, helping them rise through the ranks and unlock their God-given potential.
                </p>
                <p>
                  True to our name, CBFA is built on structure, discipline, and passion. Greatness on the field starts with strong character, hard work, and a commitment to continually improving one training session at a time.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/our-about.jpg"
                width="460"
                height="300"
                alt="CBFA Training Session"
                className="rounded-lg object-cover h-[450px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  At CBFA, our mission is to discover raw talent and guide them to football excellence. We train and mentor individuals into professionals, both in skill and in character.
                </p>
                <p className="text-muted-foreground mb-4">
                  Beyond the game, we’re building a better society by using football to keep young minds off the streets and away from harmful distractions. Through structured training and positive engagement, we promote discipline, teamwork, and good value
                </p>
                <p className="text-muted-foreground">
                  With strong coaching, solid strategies, and a focus on education, we’re not just shaping great players; we are raising responsible role models.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We aim to spot talent early, nurture it with care, and provide everything players need to reach the top of their football careers.
                </p>
                <p className="text-muted-foreground">
                  Our coaching team brings strong technical knowledge and a keen eye for potential. Wherever talent shows up, we are ready to shape it. We envision CBFA as one of Africa’s leading football academies, producing world-class players who leave a mark on the global football stage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our Core Values</h2>
            <p className="text-muted-foreground lg:text-[16px] text-[14px] lg:w-[490px] leading-tight w-auto mx-auto">
              The values that shape every goal we score and the principles that guide us at Corporate Ballers Football Academy.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We train to win, not just on match day, but in character, discipline, and personal growth.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We play fair, stay honest, and uphold strong values in everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Unity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Football is a team sport; we build bonds across backgrounds and stand together as one.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We believe in progress, developing skills, knowledge, and mindset for success beyond the pitch.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="lg:text-[35px] text-[28px] font-bold tracking-tighter mb-4">What Sets Us Apart</h2>
            <p className="text-muted-foreground lg:text-[16px] text-[14px] lg:w-[350px] w-auto mx-auto">
              Why train with us? Here’s what makes CBFA different from the rest
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualified Coaching Staff</h3>
              <p className="text-muted-foreground">
                Our coaches aren&apos;t just skilled; they&apos;re certified professionals with extensive experience in football training, player development, and character building.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Standardized Training</h3>
              <p className="text-muted-foreground">
                Every player gets top-quality, structured training. No matter your level, we ensure steady progress, proper technique, and consistent growth.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Holistic Development</h3>
              <p className="text-muted-foreground">
                We train more than just athletes. We build character, encourage education, and prepare our players for success in football and in life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 rounded-lg bg-[#047146] text-white lg:mx-20 mx-4 mb-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Ready to Join CBFA?</h2>
          <p className="text-[15px] mb-8 lg:w-[400px] w-auto mx-auto opacity-90 leading-tight">
            Take the first step towards your professional football career. Register today and become part of our growing
            family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#047146] hover:border hover:border-white hover:text-[#FFFFFF] hover:bg-transparent" size="lg" variant="secondary" asChild>
              <Link href="/auth/register">Register Now</Link>
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-[#FFFFFF] border bg-transparent text-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="/programs">View Programs</Link>
            </Button> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
