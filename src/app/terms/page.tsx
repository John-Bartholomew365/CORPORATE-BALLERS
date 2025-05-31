import { Footer } from "@/components/landing-page/Footer"
import { Navbar } from "@/components/landing-page/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, Users, Mail, Phone } from 'lucide-react'

export default function TermsPage() {
    const sections = [
        {
            icon: Users,
            title: "Acceptance of Terms",
            content: [
                "By accessing and using CBFA services, you accept and agree to be bound by these terms",
                "If you do not agree to these terms, you may not use our services",
                "These terms apply to all users, including players, parents, and visitors",
                "Continued use of our services constitutes acceptance of any updates to these terms"
            ]
        },
        {
            icon: FileText,
            title: "Services Description",
            content: [
                "CBFA provides football training and development programs",
                "Services include coaching, skill development, and character building",
                "We offer junior and senior category programs",
                "Additional services may include tournaments, camps, and special events",
                "Service availability may vary based on capacity and seasonal schedules"
            ]
        },
        {
            icon: Scale,
            title: "User Responsibilities",
            content: [
                "Provide accurate and complete information during registration",
                "Maintain the confidentiality of your account information",
                "Follow all academy rules, policies, and codes of conduct",
                "Respect coaches, staff, and fellow players at all times",
                "Attend training sessions regularly and punctually",
                "Notify us of any changes to personal or medical information"
            ]
        },
        {
            icon: AlertTriangle,
            title: "Prohibited Activities",
            content: [
                "Violent, abusive, or unsportsmanlike behavior",
                "Use of prohibited substances or performance-enhancing drugs",
                "Sharing account credentials with unauthorized persons",
                "Disrupting training sessions or academy activities",
                "Engaging in activities that could harm the academy's reputation",
                "Violation of any applicable laws or regulations"
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar/>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Scale className="h-16 w-16 mx-auto mb-6 text-green-200" />
                        <h1 className="lg:text-6xl text-[40px] font-bold mb-3 lg:mb-6">Terms of Service</h1>
                        <p className="lg:text-xl text-[16px] text-green-100 leading-tight lg:w-[420px] w-auto mx-auto">
                            Please read these terms carefully before using our services or participating in our programs.
                        </p>
                        <p className="text-lg text-green-200 mt-4">
                            Last updated: 31st May, 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Card className="mb-12">
                            <CardHeader>
                                <CardTitle className="text-2xl">Agreement Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    These Terms of Service (&quot;Terms&quot;) govern your use of Corporate Ballers Football Academy&apos;s (&quot;CBFA&quot;)
                                    services, programs, and facilities. This agreement is between you (the &quot;User&quot;) and CBFA, a registered
                                    company (RC: 7580099) operating in Ilorin, Kwara State, Nigeria.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    By registering for our programs, using our facilities, or accessing our services, you acknowledge
                                    that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Main Sections */}
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <Card key={index} className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center">
                                            <div className="bg-green-100 rounded-full p-3 mr-4">
                                                <section.icon className="h-6 w-6 text-green-600" />
                                            </div>
                                            {section.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {section.content.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Additional Terms */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Payment Terms</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Fees are due as specified in your enrollment agreement</li>
                                        <li>• Late payments may result in suspension of services</li>
                                        <li>• Refunds are subject to our refund policy</li>
                                        <li>• Fee changes will be communicated in advance</li>
                                        <li>• Payment methods include bank transfer and mobile money</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Liability & Risk</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Football training involves inherent risks</li>
                                        <li>• Participants assume responsibility for their safety</li>
                                        <li>• Medical clearance required for participation</li>
                                        <li>• CBFA maintains appropriate insurance coverage</li>
                                        <li>• Emergency procedures are in place</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Intellectual Property</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• CBFA owns all training materials and methods</li>
                                        <li>• Academy logo and branding are protected</li>
                                        <li>• Photos/videos may be used for promotional purposes</li>
                                        <li>• Users grant permission for academy marketing use</li>
                                        <li>• Respect for third-party intellectual property</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Termination</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Either party may terminate with proper notice</li>
                                        <li>• Immediate termination for serious violations</li>
                                        <li>• Refund eligibility depends on circumstances</li>
                                        <li>• Return of academy property required</li>
                                        <li>• Certain obligations survive termination</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Detailed Sections */}
                        <div className="space-y-8 mt-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Code of Conduct</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-600 mb-4">
                                            All participants in CBFA programs are expected to maintain the highest standards of conduct:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Expected Behavior:</h4>
                                                <ul className="space-y-1 text-gray-600">
                                                    <li>• Respect for all individuals</li>
                                                    <li>• Positive attitude and sportsmanship</li>
                                                    <li>• Commitment to improvement</li>
                                                    <li>• Punctuality and attendance</li>
                                                    <li>• Following safety guidelines</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Disciplinary Actions:</h4>
                                                <ul className="space-y-1 text-gray-600">
                                                    <li>• Verbal warning for minor infractions</li>
                                                    <li>• Written warning for repeated issues</li>
                                                    <li>• Suspension for serious violations</li>
                                                    <li>• Termination for severe misconduct</li>
                                                    <li>• Appeal process available</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Limitation of Liability</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed">
                                        To the fullest extent permitted by law, CBFA shall not be liable for any indirect, incidental,
                                        special, consequential, or punitive damages, including but not limited to loss of profits, data,
                                        or use, incurred by you or any third party, whether in an action in contract or tort, even if
                                        CBFA has been advised of the possibility of such damages. Our total liability shall not exceed
                                        the amount paid by you for the specific service giving rise to the claim.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Governing Law</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed">
                                        These Terms shall be governed by and construed in accordance with the laws of Nigeria. Any
                                        disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts
                                        of Kwara State, Nigeria. If any provision of these Terms is found to be unenforceable, the
                                        remaining provisions shall remain in full force and effect.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <Card className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                            <CardHeader>
                                <CardTitle className="lg:text-2xl text-[20px] text-green-800">Questions About These Terms?</CardTitle>
                                <CardDescription>
                                    If you have any questions about these Terms of Service, please contact us:
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-green-600 mr-3" />
                                            <p className="font-medium text-gray-900">Email</p>
                                        </div>
                                        <div className="ml-8">
                                            <p className="text-gray-600 -mt-5">corporateballersfa418@gmail.com</p>
                                        </div>

                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-green-600 mr-3" />
                                            <p className="font-medium text-gray-900">Phone</p>
                                        </div>

                                        <div className="ml-8">
                                            <p className="text-gray-600 -mt-5">+234 8133178008</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 mb-2">Mailing Address</p>
                                        <p className="text-gray-600">
                                            Corporate Ballers Football Academy<br />
                                            Stadium Complex, Ibrahim Taiwo Road<br />
                                            Ilorin, Kwara State, Nigeria<br />
                                            RC: 7580099
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}
