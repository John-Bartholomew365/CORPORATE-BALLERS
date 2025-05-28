import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
        
      <header className="fixed top-0 z-50 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center">
              <Image
                src="/corporate-ballers.svg"
                alt="CBFA Logo"
                width={50}
                height={50}
                className="h-10 w-10 object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#047146]">CBFA</h1>
              <p className="text-xs text-muted-foreground text-white">Football Academy</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center text-[#B0B3B8] space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/programs" className="text-sm font-medium hover:text-green-600 transition-colors">
              Programs
            </Link>
            <Link href="/coaches" className="text-sm font-medium hover:text-green-600 transition-colors">
              Coaches
            </Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-green-600 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button className='bg-white border-[#047146] px-5' variant="outline" size="sm" asChild>
              <Link
               href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" className="bg-[#047146] text-white hover:bg-green-700 px-5" asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar