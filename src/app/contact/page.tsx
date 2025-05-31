import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"
// import Image from "next/image"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Numbers",
      // items: [
      //   { label: "Main Office", value: "+234 8133178008" },
      //   { label: "Admissions", value: "+234 8065943751" },
      //   { label: "Coaching Staff", value: "+234 8033907248" },
      //   { label: "Emergency", value: "+234 8120380080" },
      // ],
      items: [
        { label: "", value: "+234 8133178008" },
        { label: "", value: "+234 8065943751" },
        { label: "", value: "+234 8033907248" },
        { label: "", value: "+234 8120380080" },
      ],
      color: "bg-green-50 border-green-200",
    },
    {
      icon: Mail,
      title: "Email Address",
      items: [
        { label: "General Inquiries", value: "corporateballersfa418@gmail.com" },
        // { label: "Admissions", value: "admissions@cbfa.com" },
        // { label: "Coaching", value: "coaching@cbfa.com" },
        // { label: "Finance", value: "finance@cbfa.com" },
      ],
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: MapPin,
      title: "Location",
      items: [
        { label: "Address", value: "Stadium Complex, Ibrahim Taiwo Road" },
        { label: "City", value: "Ilorin, Kwara State" },
        { label: "Country", value: "Nigeria" },
        { label: "Postal Code", value: "240001" },
      ],
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      icon: Clock,
      title: "Operating Hours",
      items: [
        { label: "Monday - Friday", value: "8:00 AM - 6:00 PM" },
        { label: "Saturday", value: "8:00 AM - 4:00 PM" },
        { label: "Sunday", value: "Closed" },
        { label: "Training Hours", value: "4:00 PM - 7:00 PM (Weekdays)" },
      ],
      color: "bg-purple-50 border-purple-200",
    },
  ]

  const departments = [
    {
      icon: Users,
      title: "General Inquiries",
      description: "Questions about our academy, programs, or general information",
      contact: "corporateballersfa418@gmail.com",
      phone: "+234 8133178008",
    },
    {
      icon: GraduationCap,
      title: "Admissions & Registration",
      description: "Player registration, program enrollment, and admission requirements",
      contact: "corporateballersfa418@gmail.com",
      phone: "+234 8065943751",
    },
    {
      icon: MessageSquare,
      title: "Coaching & Training",
      description: "Training schedules, coaching inquiries, and player development",
      contact: "corporateballersfa418@gmail.com",
      phone: "+234 8033907248",
    },
    {
      icon: DollarSign,
      title: "Finance & Payments",
      description: "Fee payments, financial assistance, and billing inquiries",
      contact: "corporateballersfa418@gmail.com",
      phone: "+234 8120380080",
    },
  ]

  const faqs = [
    {
      question: "What age groups do you accept?",
      answer: "We accept players from age 12 and above, with junior (12-17) and senior (18+) categories.",
    },
    {
      question: "How much is the registration fees?",
      answer: "Junior and Senior Categories: Form Price: ₦5,000 (per person) while Elite program is by invitation only.",
    },
    {
      question: "What documents are required for registration?",
      answer: "Birth certificate, medical clearance, passport photos, and parent/guardian consent (for minors).",
    },
    {
      question: "Do you provide accommodation?",
      answer: "We don't provide accommodation, but we can help connect you with local housing options.",
    },
    {
      question: "Can I visit the academy before registering?",
      answer: "Yes! We encourage visits. Please contact us to schedule a tour of our facilities.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="lg:text-6xl text-[40px] font-bold mb-6">Contact Us</h1>
            <p className="lg:text-xl text-[16px] lg:w-[440px] w-auto text-green-100 leading-tight mx-auto">
              Get in touch with us for any questions about our programs, admissions, or to schedule a visit
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="lg:text-xl  text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`${method.color} hover:shadow-lg transition-shadow`}>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-white rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                    <method.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {method.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm">
                        <div className="font-medium text-gray-700">{item.label}</div>
                        <div className="text-gray-600">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map & Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Find Us
                </CardTitle>
                <CardDescription>Stadium Complex, Ibrahim Taiwo Road, Ilorin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden h-[350px] w-full">
                  <img
                    src="/map.jpg"
                    alt="CBFA Training Session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-sm mt-2">
                  <p>
                    <span className="font-medium">Landmarks:</span> Near Kwara State Stadium
                  </p>
                  <p>
                    <span className="font-medium">Public Transport:</span> Accessible by local buses and taxis
                  </p>
                  <p>
                    <span className="font-medium">Parking:</span> Free parking available on-site
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule a Visit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We encourage prospective players and parents to visit our facilities. See our training methods, meet
                  our coaches, and experience the CBFA environment firsthand.
                </p>
                <div className="space-y-2 space-x-1">
                  <Badge variant="outline" className="text-[#B0B3B8]">Free facility tours</Badge>
                  <Badge variant="outline" className="text-[#B0B3B8]">Meet with coaches</Badge>
                  <Badge variant="outline" className="text-[#B0B3B8]">Watch training sessions</Badge>
                </div>
                <Button className="w-full bg-transparent border border-[#047146]" variant="outline">
                  Schedule Your Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 lg:mb-4 mb-2.5">Contact by Department</h2>
            <p className="lg:text-xl text-[16px] text-gray-600 lg:w-[360px] w-auto mx-auto">
              Reach out to the right department for faster assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-3">
                      <dept.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{dept.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-green-600 font-medium">{dept.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-green-600 font-medium">{dept.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Quick answers to common questions about CBFA</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Can&apos;t find what you&apos;re looking for?</p>
              <Link href={"/faq"}>
                <Button variant="outline" className="bg-transparent cursor-pointer" size="lg">
                  {/* <MessageSquare className="h-4 w-4 mr-2" /> */}
                  See More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-t border-red-200 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency Contact</h3>
            <p className="text-red-700 mb-4">For urgent matters during training sessions or academy events</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="font-bold text-red-800">+234 8120380080</span>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-6" />
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-600" />
                <span className="font-bold text-red-800">emergency@cbfa.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
