import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Users, Award, Heart, Globe, Trophy, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-green-600">
              About
            </Link>
            <Link href="/programs" className="text-sm font-medium hover:text-green-600 transition-colors">
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
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">About CBFA</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Building Champions,
              <span className="text-green-600"> Shaping Lives</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Corporate Ballers Football Academy is more than just a football club. We're a community dedicated to
              nurturing talent, building character, and creating pathways to success.
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
                  Corporate Ballers Football Academy (CBFA) is a rapidly growing football club situated in Ilorin, Kwara
                  State, Nigeria. Founded with a vision to transform raw talent into professional excellence, we have
                  established ourselves as a premier destination for aspiring footballers.
                </p>
                <p>
                  CBFA comprises both junior and senior categories, catering to individuals aged 12 years and above. We
                  create a clear pathway for players to progress through the ranks, realizing and fulfilling their
                  God-given talents in the realm of football.
                </p>
                <p>
                  True to our name, Corporate Ballers is a well-organized entity characterized by high discipline and
                  meticulousness in all our activities. We believe that success on the field begins with excellence in
                  character and commitment to continuous improvement.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width="500"
                height="400"
                alt="CBFA Training Session"
                className="rounded-lg object-cover"
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
                  To harness raw talent and nurture them to full maturity, developing and molding individuals into
                  professionals in their football careers.
                </p>
                <p className="text-muted-foreground mb-4">
                  Additionally, our goal is to contribute to building a morally upright society through football by
                  redirecting youth away from the streets, engaging their minds positively, and discouraging involvement
                  in social vices and criminal activities.
                </p>
                <p className="text-muted-foreground">
                  We plan to achieve this through our robust strategy and quality educational training programs,
                  instilling good sportsmanship, discipline, and understanding of solidarity and cooperation.
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
                  Our vision is to identify and nurture talent from a young age, providing all the necessary logistics
                  and support for individuals to reach the pinnacle of their careers.
                </p>
                <p className="text-muted-foreground">
                  Our entire coaching staff is well-equipped with the technical expertise to recognize, groom and
                  develop talent whenever they encounter it. We envision becoming a leading football academy that
                  produces world-class players and contributes to the global football community.
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
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Corporate Ballers Football Academy
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
                  We strive for the highest standards in training, character development, and professional growth.
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
                  Honesty, fairness, and moral uprightness form the foundation of all our interactions and decisions.
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
                  We foster positive relationships across diverse backgrounds, promoting solidarity and cooperation.
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
                  Continuous improvement and development of skills, knowledge, and character for lifelong success.
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">What Sets Us Apart</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Discover the unique advantages of training with Corporate Ballers Football Academy
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualified Coaching Staff</h3>
              <p className="text-muted-foreground">
                Our coaching team comprises qualified individuals with extensive knowledge and experience in football
                development and character building.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Standardized Training</h3>
              <p className="text-muted-foreground">
                We offer high-quality and standardized training programs across all categories, ensuring consistent
                development and progress.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Holistic Development</h3>
              <p className="text-muted-foreground">
                Beyond football skills, we focus on character development, education, and preparing players for life
                beyond the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-green-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join Corporate Ballers Football Academy and take the first step towards realizing your football dreams while
            building character that lasts a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/register">Join Our Academy</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-green-600">CBFA</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Corporate Ballers Football Academy - Nurturing talent, building character, creating champions.
              </p>
              <p className="text-xs text-muted-foreground">RC: 7580099</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-green-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-muted-foreground hover:text-green-600">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/coaches" className="text-muted-foreground hover:text-green-600">
                    Coaches
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-muted-foreground hover:text-green-600">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-green-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-green-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-green-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-green-600">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Stadium Complex, Ibrahim Taiwo Road</p>
                <p>Ilorin, Kwara State, Nigeria</p>
                <p>+234 8133178008</p>
                <p>corporateballersfa418@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Corporate Ballers Football Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
