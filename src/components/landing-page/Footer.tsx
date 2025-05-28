import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">CBFA</h3>
              <p className="text-gray-300 leading-relaxed">
                Corporate Ballers Football Academy - Nurturing talent, building champions, and contributing to society
                through football excellence.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">RC: 7580099</p>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Ilorin, Kwara State, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Our Coaches
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Programs</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/programs/junior" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Junior Category (12-17)
                </Link>
              </li>
              <li>
                <Link href="/programs/senior" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Senior Category (18+)
                </Link>
              </li>
              <li>
                <Link href="/programs/elite" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Elite Development
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Register Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+234 8133178008</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>corporateballersfa418@gmail.com</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-3">Subscribe to our newsletter</p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Subscribe
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="p-2 hover:bg-gray-800">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2 hover:bg-gray-800">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2 hover:bg-gray-800">
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Corporate Ballers Football Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
