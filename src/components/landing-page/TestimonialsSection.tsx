'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import * as Avatar from "@radix-ui/react-avatar"

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Ahmed Olatunji",
            role: "Player",
            content:
                "CBFA transformed my life. The discipline and training I received here prepared me for professional football. The coaches truly care about your development both as a player and as a person.",
            rating: 5,
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            name: "Fatima Ibrahim",
            role: "Parent",
            content:
                "My son joined CBFA at 14, and I've watched him grow not just in football skills but in character. The academy's focus on education and moral values is exceptional.",
            rating: 5,
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            name: "Coach Adebayo",
            role: "Youth Coach",
            content:
                "Working with CBFA has been incredible. The organization's commitment to excellence and player development is unmatched. They truly live up to their mission.",
            rating: 5,
            image: "/placeholder.svg?height=80&width=80",
        },
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="lg:text-4xl text-[32px] font-bold text-gray-900 mb-4 leading-tight">What People Say <br className="lg:hidden block" /> About Us</h2>
                    <p className="lg:text-xl text-[16px] text-gray-600 max-w-3xl mx-auto leading-tight">
                        Hear from our players, parents, and partners about their experience with CBFA
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-[#EBC228] fill-current" />
                                    ))}
                                </div>

                                <Quote className="h-8 w-8 text-green-200 mb-4" />

                                <p className="text-gray-600 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

                                <div className="flex items-center">
                                    <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                                        <Avatar.Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <Avatar.Fallback className="text-sm text-black border rounded-full border-[#047146] w-full h-full flex items-center justify-center">
                                            {testimonial.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar.Root>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
