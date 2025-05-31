import type { Metadata } from 'next'
import './globals.css'
// import { Navbar } from '@/components/landing-page/Navbar'
// import { Footer } from '@/components/landing-page/Footer'

export const metadata: Metadata = {
  title: 'Corporate Ballers',
  description: 'Join the Legacy of Champions at Corporate Ballers Football Academy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <header className="">
        {/* <Navbar /> */}
      </header>
      <body className=''>{children}</body>
      {/* <footer>
        <Footer />
      </footer> */}
    </html>
  )
}
