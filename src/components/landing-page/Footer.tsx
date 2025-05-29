import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Trophy,
  Users,
  Star,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const programLinks = [
    { name: "Junior Category (12-17)", href: "/program/junior", icon: Users },
    { name: "Senior Category (18+)", href: "/program/senior", icon: Trophy },
    { name: "Elite Development", href: "/program/elite", icon: Star },
  ]

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "News & Updates", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ]

  const playerLinks = [
    { name: "Player Dashboard", href: "/dashboard/user" },
    { name: "Training Schedule", href: "/dashboard/user/training" },
    { name: "Performance Stats", href: "/dashboard/user/performance" },
    { name: "Payment Portal", href: "/dashboard/user/payments" },
    { name: "Resources", href: "/dashboard/user/resources" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
  ]

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      items: [
        "+234 8133178008",
        "+234 8065943751",
        "+234 8033907248",
        "+234 8120380080",
      ],
    },
    {
      icon: Mail,
      title: "Email",
      items: ["corporateballersfa418@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      items: ["Stadium Complex, Ibrahim Taiwo Road", "Ilorin, Kwara State, Nigeria"],
    },
    {
      icon: Clock,
      title: "Training Hours",
      items: ["Mon-Fri: 4:00 PM - 7:00 PM", "Saturday: 8:00 AM - 12:00 PM", "Sunday: Rest Day"],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src={"/corporate-ballers.svg"} alt="Logo" width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#EBC228]">CBFA</h3>
                  <p className="text-sm text-gray-300">Football Academy</p>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed mb-4">
                Corporate Ballers Football Academy - Nurturing raw talent into professional excellence. Building
                champions on and off the field since our establishment in Ilorin, Kwara State.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-600 text-white">
                  RC: 7580099
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Registered Academy
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Est. 2019
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-[#047146]">200+</div>
                <div className="text-xs text-gray-400">Active Players</div>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-[#EBC228]">15+</div>
                <div className="text-xs text-gray-400">Tournaments Won</div>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#EBC228] mb-4">Our Programs</h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors group"
                  >
                    <link.icon className="h-4 w-4 mr-2 group-hover:text-yellow-400" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href="/auth/register"
                className="inline-flex items-center text-sm text-green-400 hover:text-green-300 font-medium"
              >
                Register Now <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#EBC228] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Player Portal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#EBC228] mb-4">Player Portal</h4>
            <ul className="space-y-3">
              {playerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                Player Login <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-[#EBC228] mb-4">Follow us:</h4>


              {/* Social Media */}
              <div>
                {/* <p className="text-sm text-gray-300 mb-3">Follow us on social media</p> */}
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      size="sm"
                      variant="ghost"
                      className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white"
                      asChild
                    >
                      <Link href={social.href} aria-label={social.name}>
                        <social.icon className="h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-700" />

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-2">
                <contact.icon className="h-5 w-5 text-green-400" />
                <h5 className="font-semibold text-white">{contact.title}</h5>
              </div>
              <ul className="space-y-1">
                {contact.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex space-x-4 text-[14px]">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-yellow-400 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Corporate Ballers Football Academy. All rights reserved.</p>

          </div>
        </div>
      </div>

    </footer>
  )
}
