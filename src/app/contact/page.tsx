import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Numbers",
      items: [
        { label: "Main Office", value: "+234 8133178008" },
        { label: "Admissions", value: "+234 8065943751" },
        { label: "Coaching Staff", value: "+234 8033907248" },
        { label: "Emergency", value: "+234 8120380080" },
      ],
      color: "bg-green-50 border-green-200",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      items: [
        { label: "General Inquiries", value: "corporateballersfa418@gmail.com" },
        { label: "Admissions", value: "admissions@cbfa.com" },
        { label: "Coaching", value: "coaching@cbfa.com" },
        { label: "Finance", value: "finance@cbfa.com" },
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
      contact: "admissions@cbfa.com",
      phone: "+234 8065943751",
    },
    {
      icon: MessageSquare,
      title: "Coaching & Training",
      description: "Training schedules, coaching inquiries, and player development",
      contact: "coaching@cbfa.com",
      phone: "+234 8033907248",
    },
    {
      icon: DollarSign,
      title: "Finance & Payments",
      description: "Fee payments, financial assistance, and billing inquiries",
      contact: "finance@cbfa.com",
      phone: "+234 8120380080",
    },
  ]

  const faqs = [
    {
      question: "What age groups do you accept?",
      answer: "We accept players from age 12 and above, with junior (12-17) and senior (18+) categories.",
    },
    {
      question: "How much are the training fees?",
      answer: "Junior category: ₦12,000/month, Senior category: ₦18,000/month. Elite program is by invitation only.",
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
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Get in touch with us for any questions about our programs, admissions, or to schedule a visit
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="admission">Admission & Registration</SelectItem>
                      <SelectItem value="coaching">Coaching & Training</SelectItem>
                      <SelectItem value="finance">Finance & Payments</SelectItem>
                      <SelectItem value="visit">Schedule a Visit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Send Message
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  * Required fields. We typically respond within 24 hours.
                </p>
              </CardContent>
            </Card>

            {/* Map & Location Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Find Us
                  </CardTitle>
                  <CardDescription>Stadium Complex, Ibrahim Taiwo Road, Ilorin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Stadium Complex, Ibrahim Taiwo Road</p>
                      <p className="text-sm">Ilorin, Kwara State, Nigeria</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
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
                  <div className="space-y-2">
                    <Badge variant="outline">Free facility tours</Badge>
                    <Badge variant="outline">Meet with coaches</Badge>
                    <Badge variant="outline">Watch training sessions</Badge>
                  </div>
                  <Button className="w-full" variant="outline">
                    Schedule Your Visit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact by Department</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
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
              <Button variant="outline" size="lg">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-t border-red-200">
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
    </div>
  )
}
