import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Location",
            details: ["Stadium Complex, Ibrahim Taiwo Road", "Ilorin, Kwara State, Nigeria"],
        },
        {
            icon: Phone,
            title: "Phone Numbers",
            details: ["+234 8133178008", "+234 8065943751", "+234 8033907248", "+234 8120380080"],
        },
        {
            icon: Mail,
            title: "Email",
            details: ["corporateballersfa418@gmail.com"],
        },
        {
            icon: Clock,
            title: "Training Hours",
            details: ["Monday - Friday: 4:00 PM - 7:00 PM", "Saturday: 8:00 AM - 12:00 PM", "Sunday: Rest Day"],
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to join our academy or have questions? We&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8 h-full">
                        <div className="h-full">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                {contactInfo.map((info, index) => (
                                    <Card key={index} className="bg-white hover:shadow-md transition-shadow h-[190px]">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-green-100 rounded-full p-2">
                                                    <info.icon className="h-5 w-5 text-green-600" />
                                                </div>
                                                <CardTitle className="text-lg">{info.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {info.details.map((detail, detailIndex) => (
                                                <p key={detailIndex} className="text-gray-600 text-sm">
                                                    {detail}
                                                </p>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-full lg:mt-0 mt-7">
                        <Card className=" h-full">
                            <CardHeader>
                                <CardTitle>Find Us</CardTitle>
                                <CardDescription>Stadium Complex, Ibrahim Taiwo Road, Ilorin</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[calc(100%-110px)]">
                                <div className="bg-gray-200 rounded-lg h-full overflow-hidden">
                                    <img
                                        src="/map.jpg"
                                        alt="Map showing our location"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}