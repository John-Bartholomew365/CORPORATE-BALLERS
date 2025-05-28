"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Users,
  Calendar,
  Trophy,
  Settings,
  Bell,
  Menu,
  LogOut,
  User,
  BarChart3,
  MessageSquare,
  CreditCard,
  Target,
  Activity,
  BookOpen,
  Camera,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "admin" | "player"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard/admin", icon: Home },
    { name: "Players", href: "/dashboard/admin/players", icon: Users },
    { name: "Training", href: "/dashboard/admin/training", icon: Calendar },
    { name: "Matches", href: "/dashboard/admin/matches", icon: Trophy },
    { name: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
    { name: "Finances", href: "/dashboard/admin/finances", icon: CreditCard },
    { name: "Communications", href: "/dashboard/admin/communications", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ]

  const playerNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Performance", href: "/dashboard/performance", icon: Activity },
    { name: "Goals", href: "/dashboard/goals", icon: Target },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
    { name: "Gallery", href: "/dashboard/gallery", icon: Camera },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const navigation = userType === "admin" ? adminNavigation : playerNavigation

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-6 border-b">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">CB</span>
        </div>
        <div>
          <div className="font-bold text-gray-900">CBFA</div>
          <div className="text-xs text-gray-600">{userType === "admin" ? "Admin Panel" : "Player Portal"}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {userType === "admin" ? "Admin User" : "John Doe"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {userType === "admin" ? "Administrator" : "Senior Player"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" />
        {/* Render SidebarContent outside SheetContent if children are not supported */}
        {isSidebarOpen && (
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:hidden">
            <SidebarContent />
          </div>
        )}
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900">
                  {userType === "admin" ? "Academy Management" : "Player Portal"}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userType === "admin" ? "Admin User" : "John Doe"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userType === "admin" ? "admin@cbfa.com" : "john.doe@email.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
