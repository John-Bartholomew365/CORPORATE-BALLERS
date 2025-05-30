"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Users,
  Calendar,
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Bell,
  LogOut,
  BarChart3,
  FileText,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Admin Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-600">CBFA</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 pb-4 space-y-1">
            <Link
              href="/dashboard/admin"
              className="bg-green-50 text-green-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Overview
            </Link>
            <Link
              href="/dashboard/admin/players"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Users className="mr-3 h-5 w-5" />
              Players
            </Link>
            <Link
              href="/dashboard/admin/coaches"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <UserPlus className="mr-3 h-5 w-5" />
              Coaches
            </Link>
            <Link
              href="/dashboard/admin/training"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Training Sessions
            </Link>
            <Link
              href="/dashboard/admin/announcements"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Announcements
            </Link>
            <Link
              href="/dashboard/admin/reports"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <FileText className="mr-3 h-5 w-5" />
              Reports
            </Link>
          </nav>

          <div className="flex-shrink-0 px-4 py-4 border-t">
            <div className="space-y-1">
              <Link
                href="/dashboard/admin/settings"
                className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top Header */}
        <div className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Players</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Coaches</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">All positions filled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week&apos;s Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">6 sessions per day</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+3% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Admin Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="sessions">Training Sessions</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Registrations</CardTitle>
                    <CardDescription>New players who joined this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Michael Johnson", category: "Junior", date: "Today" },
                        { name: "Sarah Williams", category: "Senior", date: "Yesterday" },
                        { name: "David Brown", category: "Junior", date: "2 days ago" },
                        { name: "Emma Davis", category: "Senior", date: "3 days ago" },
                      ].map((player, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{player.name}</p>
                              <p className="text-xs text-muted-foreground">{player.category} Category</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{player.date}</p>
                            <Badge variant="outline" className="text-xs">
                              Pending
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today&apos;s Sessions</CardTitle>
                    <CardDescription>Training sessions scheduled for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { time: "6:00 AM", title: "Morning Fitness", coach: "Coach Smith", category: "Senior" },
                        { time: "4:00 PM", title: "Technical Skills", coach: "Coach Johnson", category: "Junior" },
                        { time: "6:00 PM", title: "Team Tactics", coach: "Coach Williams", category: "Senior" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.coach} • {session.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{session.time}</p>
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="players" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search players..." className="pl-8 w-64" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Players</CardTitle>
                  <CardDescription>Manage all registered players in the academy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "John Doe",
                        email: "john@example.com",
                        category: "Junior",
                        position: "Forward",
                        status: "Active",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane@example.com",
                        category: "Senior",
                        position: "Midfielder",
                        status: "Active",
                      },
                      {
                        name: "Mike Johnson",
                        email: "mike@example.com",
                        category: "Junior",
                        position: "Defender",
                        status: "Pending",
                      },
                      {
                        name: "Sarah Wilson",
                        email: "sarah@example.com",
                        category: "Senior",
                        position: "Goalkeeper",
                        status: "Active",
                      },
                    ].map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {player.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.email}</p>
                          </div>
                          <div>
                            <Badge variant="outline">{player.category}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={player.status === "Active" ? "default" : "secondary"}>{player.status}</Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Training Sessions</h2>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>This Week&apos;s Schedule</CardTitle>
                  <CardDescription>Manage and monitor all training sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        day: "Monday",
                        time: "4:00 PM - 6:00 PM",
                        title: "Technical Skills",
                        coach: "Coach Smith",
                        category: "Junior",
                        attendance: "18/20",
                      },
                      {
                        day: "Tuesday",
                        time: "6:00 AM - 8:00 AM",
                        title: "Fitness Training",
                        coach: "Coach Johnson",
                        category: "Senior",
                        attendance: "22/25",
                      },
                      {
                        day: "Wednesday",
                        time: "4:00 PM - 6:00 PM",
                        title: "Tactical Training",
                        coach: "Coach Williams",
                        category: "Junior",
                        attendance: "19/20",
                      },
                      {
                        day: "Thursday",
                        time: "6:00 PM - 8:00 PM",
                        title: "Match Preparation",
                        coach: "Coach Brown",
                        category: "Senior",
                        attendance: "24/25",
                      },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-20">
                            <p className="font-medium">{session.day}</p>
                            <p className="text-xs text-muted-foreground">{session.time}</p>
                          </div>
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.coach} • {session.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Attendance</p>
                            <p className="text-sm text-muted-foreground">{session.attendance}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Announcements</h2>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                  <CardDescription>Manage academy-wide communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "New Training Equipment",
                        content: "We've received new training equipment...",
                        date: "2 hours ago",
                        status: "Published",
                      },
                      {
                        title: "Inter-Academy Tournament",
                        content: "CBFA will be participating in the regional...",
                        date: "1 day ago",
                        status: "Published",
                      },
                      {
                        title: "Holiday Schedule Update",
                        content: "Please note the modified training schedule...",
                        date: "3 days ago",
                        status: "Draft",
                      },
                    ].map((announcement, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{announcement.title}</h3>
                            <Badge variant={announcement.status === "Published" ? "default" : "secondary"}>
                              {announcement.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                          <p className="text-xs text-muted-foreground">{announcement.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
