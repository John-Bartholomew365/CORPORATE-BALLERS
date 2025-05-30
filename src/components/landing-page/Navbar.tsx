// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X, User, ChevronDown } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// export function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const navigation = [
//     { name: "About", href: "/about" },
//     {
//       name: "Programs",
//       href: "/program",
//       dropdown: [
//         { name: "Junior Category", href: "/program/junior" },
//         { name: "Senior Category", href: "/program/senior" },
//         { name: "Elite Development", href: "/program/elite" },
//       ],
//     },
//     { name: "Team", href: "/team" },
//     { name: "Gallery", href: "/gallery" },
//     { name: "News", href: "/news" },
//     { name: "Contact", href: "/contact" },
//   ]

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between lg:h-10 h-[28px]">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 flex items-center justify-center">
//               <Image src={"/corporate-ballers.svg"} alt="Logo" width={45} height={45} />
//             </div>
//             <div className="hidden sm:block">
//               <div className="font-bold text-gray-900 text-lg">CBFA</div>
//               <div className="text-xs text-gray-600">Football Academy</div>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             {navigation.map((item) =>
//               item.dropdown ? (
//                 <div key={item.name} className="relative group">
//                   <button className="text-gray-700 text-[14px] hover:text-green-600 font-medium transition-colors flex items-center">
//                     {item.name}
//                     <ChevronDown className="ml-1 h-4 w-4" />
//                   </button>
//                   <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                     <div className="py-2">
//                       {item.dropdown.map((subItem) => (
//                         <Link
//                           key={subItem.name}
//                           href={subItem.href}
//                           className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-green-50 hover:text-green-600"
//                         >
//                           {subItem.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-700 text-[14px] hover:text-green-600 font-medium transition-colors"
//                 >
//                   {item.name}
//                 </Link>
//               ),
//             )}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <Button asChild className="border border-green-600">
//               <Link href="/auth/login">
//                 <User className="h-4 w-4 mr-2" />
//                 Login
//               </Link>
//             </Button>
//             <Button asChild className="bg-green-600 hover:bg-green-700">
//               <Link href="/auth/register">Join Academy</Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 py-4">
//             <nav className="flex flex-col space-y-4">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-1"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
//                 <Button asChild variant="ghost" className="justify-start">
//                   <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
//                     <User className="h-4 w-4 mr-2" />
//                     Login
//                   </Link>
//                 </Button>
//                 <Button asChild className="bg-green-600 hover:bg-green-700">
//                   <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
//                     Join Academy
//                   </Link>
//                 </Button>
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }



"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navigation = [
    { name: "About", href: "/about" },
    {
      name: "Programs",
      dropdown: [
        { name: "Junior Category", href: "/program/junior" },
        { name: "Senior Category", href: "/program/senior" },
        { name: "Elite Development", href: "/program/elite" },
      ],
    },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ]

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:h-10 h-[28px] py-6 lg:py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image src={"/corporate-ballers.svg"} alt="Logo" width={45} height={45} />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-lg">CBFA</div>
              <div className="text-xs text-gray-600">Football Academy</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button className="text-gray-700 text-[14px] hover:text-green-600 font-medium transition-colors flex items-center">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 text-[14px] hover:text-green-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild className="border border-green-600">
              <Link href="/auth/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/auth/register">Join Academy</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 pb-4 h-[100vh]">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="flex flex-col">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-3"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 py-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-2 py-2 text-gray-700 hover:text-green-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors px-2 py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                <Button asChild variant="ghost" className="justify-center border border-[#047146]">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-[#047146] text-white">
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    Join Academy
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}