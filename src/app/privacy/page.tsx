import { Footer } from "@/components/landing-page/Footer"
import { Navbar } from "@/components/landing-page/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react'

export default function PrivacyPage() {
    const sections = [
        {
            icon: Eye,
            title: "Information We Collect",
            content: [
                "Personal identification information (name, email, phone number, address)",
                "Age and date of birth for program eligibility",
                "Emergency contact information",
                "Medical information relevant to sports participation",
                "Payment and billing information",
                "Training performance and progress data",
                "Photos and videos for promotional purposes (with consent)"
            ]
        },
        {
            icon: Lock,
            title: "How We Use Your Information",
            content: [
                "To provide football training and academy services",
                "To communicate about programs, schedules, and academy updates",
                "To process payments and manage billing",
                "To ensure player safety and emergency contact",
                "To track training progress and development",
                "To comply with legal and regulatory requirements",
                "To improve our services and programs"
            ]
        },
        {
            icon: Shield,
            title: "Information Protection",
            content: [
                "We implement appropriate security measures to protect personal information",
                "Access to personal data is restricted to authorized personnel only",
                "We use secure payment processing systems for financial transactions",
                "Regular security audits and updates to our systems",
                "Staff training on data protection and privacy practices",
                "Secure storage of physical documents and digital backups"
            ]
        },
        {
            icon: Users,
            title: "Information Sharing",
            content: [
                "We do not sell, trade, or rent personal information to third parties",
                "Information may be shared with coaches and staff for training purposes",
                "Emergency contacts may be contacted in case of medical emergencies",
                "We may share information when required by law or legal process",
                "Anonymous, aggregated data may be used for research and improvement",
                "Third-party service providers (payment processors) under strict agreements"
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Shield className="h-16 w-16 mx-auto mb-6 text-green-200" />
                        <h1 className="lg:text-6xl text-[40px] font-bold mb-3 lg:mb-6">Privacy Policy</h1>
                        <p className="lg:text-xl text-[16px] text-green-100 leading-tight lg:w-[420px] w-auto mx-auto">
                            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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
                                <CardTitle className="text-2xl">Introduction</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    Corporate Ballers Football Academy (&quot;CBFA,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy
                                    and security of your personal information. This Privacy Policy explains how we collect, use, disclose,
                                    and safeguard your information when you visit our website, use our services, or participate in our programs.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    By using our services or providing us with your personal information, you consent to the collection,
                                    use, and disclosure of your information as described in this Privacy Policy.
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

                        {/* Additional Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Your Rights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Access your personal information</li>
                                        <li>• Request correction of inaccurate data</li>
                                        <li>• Request deletion of your information</li>
                                        <li>• Opt-out of marketing communications</li>
                                        <li>• Withdraw consent for data processing</li>
                                        <li>• Request data portability</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Cookies & Tracking</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">
                                        We use cookies and similar technologies to enhance your experience on our website:
                                    </p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Essential cookies for website functionality</li>
                                        <li>• Analytics cookies to improve our services</li>
                                        <li>• Marketing cookies for relevant content</li>
                                        <li>• You can control cookies through browser settings</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Data Retention</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">
                                        We retain your personal information for as long as necessary to:
                                    </p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Provide our services to you</li>
                                        <li>• Comply with legal obligations</li>
                                        <li>• Resolve disputes and enforce agreements</li>
                                        <li>• Maintain training records for development</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Children&apos;s Privacy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">
                                        We take special care with information from children under 18:
                                    </p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Parental consent required for registration</li>
                                        <li>• Limited data collection for minors</li>
                                        <li>• Parents can access and control their child&apos;s data</li>
                                        <li>• Enhanced security for children&apos;s information</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <Card className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-2xl text-green-800">Contact Us About Privacy</CardTitle>
                                <CardDescription>
                                    If you have questions about this Privacy Policy or our data practices, please contact us:
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
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
                                        <div className="ml-8 ">
                                            <p className="text-gray-600 -mt-5">+234 8133178008</p>
                                        </div>

                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 mb-2">Mailing Address</p>
                                        <p className="text-gray-600">
                                            Corporate Ballers Football Academy<br />
                                            Stadium Complex, Ibrahim Taiwo Road<br />
                                            Ilorin, Kwara State, Nigeria
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Updates */}
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle className="text-xl">Policy Updates</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                                    new Privacy Policy on our website and updating the &quot;Last updated&quot; date. We encourage you to review
                                    this Privacy Policy periodically to stay informed about how we protect your information.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
