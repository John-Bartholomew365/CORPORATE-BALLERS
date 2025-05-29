"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Search, MessageCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const faqCategories = [
    {
      title: "General Information",
      icon: "ℹ️",
      questions: [
        {
          id: "general-1",
          question: "What is Corporate Ballers Football Academy (CBFA)?",
          answer: "CBFA is a rapidly growing football club situated in Ilorin, Kwara State, Nigeria. We cater to individuals aged 12 years and above, providing high-quality standardized training and character development programs."
        },
        {
          id: "general-2", 
          question: "What age groups do you accept?",
          answer: "We accept players aged 12 years and above. We have two main categories: Junior Category (ages 12-17) and Senior Category (ages 18+). We also have an Elite Development program for selected players."
        },
        {
          id: "general-3",
          question: "Where is CBFA located?",
          answer: "We are located at Stadium Complex, Ibrahim Taiwo Road, Ilorin, Kwara State, Nigeria. Our training sessions are held at this facility."
        },
        {
          id: "general-4",
          question: "Is CBFA a registered organization?",
          answer: "Yes, Corporate Ballers Football Academy is a registered company with RC: 7580099. We are a legitimate and well-organized entity."
        }
      ]
    },
    {
      title: "Registration & Enrollment",
      icon: "📝",
      questions: [
        {
          id: "registration-1",
          question: "How do I register for CBFA?",
          answer: "You can register online through our website by clicking the 'Join Academy' button and filling out the registration form. You can also visit our facility during office hours for in-person registration."
        },
        {
          id: "registration-2",
          question: "What documents do I need for registration?",
          answer: "You'll need a valid ID, birth certificate or age declaration, passport photographs, medical clearance certificate, and emergency contact information. For minors, parental consent is required."
        },
        {
          id: "registration-3",
          question: "Is there a registration fee?",
          answer: "Yes, there is a one-time registration fee that covers administrative costs and initial kit. Please contact us for current fee structure as it may vary by category."
        },
        {
          id: "registration-4",
          question: "Can I register mid-season?",
          answer: "Yes, we accept registrations throughout the year. However, joining at the beginning of a training cycle is recommended for optimal development and integration."
        }
      ]
    },
    {
      title: "Training & Programs",
      icon: "⚽",
      questions: [
        {
          id: "training-1",
          question: "What are your training schedules?",
          answer: "Training sessions are held Monday-Friday from 4:00 PM to 7:00 PM, and Saturdays from 8:00 AM to 12:00 PM. Sunday is our rest day. Schedules may vary for different categories."
        },
        {
          id: "training-2",
          question: "What programs do you offer?",
          answer: "We offer Junior Category (ages 12-17) focusing on foundation skills, Senior Category (ages 18+) for advanced training, and Elite Development for exceptional talents with professional potential."
        },
        {
          id: "training-3",
          question: "Do you provide equipment?",
          answer: "Basic training equipment is provided by the academy. However, players are expected to have their own boots, shin guards, and water bottles. Training kits are provided upon registration."
        },
        {
          id: "training-4",
          question: "What qualifications do your coaches have?",
          answer: "Our coaching staff consists of qualified professionals with CAF licenses, UEFA certifications, and extensive playing/coaching experience. All coaches undergo continuous professional development."
        }
      ]
    },
    {
      title: "Fees & Payments",
      icon: "💰",
      questions: [
        {
          id: "fees-1",
          question: "What are the training fees?",
          answer: "Training fees vary by category and program. We offer monthly, quarterly, and annual payment options. Please contact our administration for detailed fee structure."
        },
        {
          id: "fees-2",
          question: "Do you offer scholarships or financial aid?",
          answer: "Yes, we have a scholarship program for exceptionally talented players who demonstrate financial need. Applications are reviewed on a case-by-case basis."
        },
        {
          id: "fees-3",
          question: "What payment methods do you accept?",
          answer: "We accept bank transfers, mobile money payments, and cash payments at our facility. Online payment options are also available through our website."
        },
        {
          id: "fees-4",
          question: "Is there a refund policy?",
          answer: "Refunds are considered on a case-by-case basis, particularly for medical reasons or relocation. Please refer to our terms and conditions for detailed refund policy."
        }
      ]
    },
    {
      title: "Facilities & Safety",
      icon: "🏟️",
      questions: [
        {
          id: "facilities-1",
          question: "What facilities do you have?",
          answer: "Our facility includes multiple training pitches, changing rooms, equipment storage, first aid station, and administrative offices. We're continuously upgrading our facilities."
        },
        {
          id: "facilities-2",
          question: "Do you have medical support?",
          answer: "Yes, we have qualified first aid personnel during training sessions and partnerships with local medical facilities for emergency situations."
        },
        {
          id: "facilities-3",
          question: "What safety measures are in place?",
          answer: "We maintain strict safety protocols including proper warm-up procedures, equipment checks, qualified supervision, and emergency response procedures."
        },
        {
          id: "facilities-4",
          question: "Can parents watch training sessions?",
          answer: "Yes, parents are welcome to observe training sessions from designated viewing areas. We encourage parental involvement in their child's development."
        }
      ]
    }
  ]

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Find answers to common questions about Corporate Ballers Football Academy
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                className="pl-10 py-3 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No questions found matching your search.</p>
                <Button 
                  onClick={() => setSearchTerm("")}
                  variant="outline" 
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center">
                        <span className="text-3xl mr-3">{category.icon}</span>
                        {category.title}
                      </CardTitle>
                      <CardDescription>
                        {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.questions.map((faq) => (
                          <Collapsible
                            key={faq.id}
                            open={openItems.includes(faq.id)}
                            onOpenChange={() => toggleItem(faq.id)}
                          >
                            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50 transition-colors">
                              <span className="font-medium text-gray-900">{faq.question}</span>
                              <ChevronDown 
                                className={`h-5 w-5 text-gray-500 transition-transform ${
                                  openItems.includes(faq.id) ? 'rotate-180' : ''
                                }`} 
                              />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-4 pb-4">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <MessageCircle className="h-16 w-16 mx-auto mb-6 text-green-200" />
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-green-100 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help you with any questions about CBFA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                <Link href="mailto:corporateballersfa418@gmail.com">Email Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
