import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
