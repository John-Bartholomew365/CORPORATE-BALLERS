"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Calendar, Trophy, Target, User, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PlayerLayoutProps {
    children: React.ReactNode
}

export function PlayerLayout({ children }: PlayerLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = [
        { name: "Dashboard", href: "/player/dashboard", icon: Home },
        { name: "Training Schedule", href: "/player/training", icon: Calendar },
        { name: "Performance", href: "/player/performance", icon: Target },
        { name: "Tournaments", href: "/player/tournaments", icon: Trophy },
        { name: "Profile", href: "/player/profile", icon: User },
        // { name: "Messages", href: "/player/messages", icon: MessageSquare },
        // { name: "Documents", href: "/player/documents", icon: FileText },
    ]

    const Sidebar = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-6 border-b border-[#E4E4E7]">
                <div className="w-10 h-10 flex items-center justify-center">
                    <Image src={"/corporate-ballers.svg"} alt="Logo" width={45} height={45} />
                </div>
                <div>
                    <h2 className="font-semibold">Player Portal</h2>
                    <p className="text-xs text-gray-600">Football Academy</p>
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                    <Sidebar />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-40">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 bg-[#FAFAFA]">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="lg:pl-64">
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}
