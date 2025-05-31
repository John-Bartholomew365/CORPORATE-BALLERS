"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Target,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  User,
  Activity,
  Award,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src={"/corporate-ballers.svg"} alt="Logo" width={45} height={45} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-600">CBFA</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 pb-4 space-y-1">
            <Link
              href="/dashboard"
              className="bg-green-50 text-green-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Activity className="mr-3 h-5 w-5" />
              Overview
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/dashboard/training"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Target className="mr-3 h-5 w-5" />
              Training
            </Link>
            <Link
              href="/dashboard/schedule"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Schedule
            </Link>
            <Link
              href="/dashboard/progress"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Progress
            </Link>
            <Link
              href="/dashboard/resources"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Resources
            </Link>
          </nav>

          <div className="flex-shrink-0 px-4 py-4 border-t">
            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
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
        <div className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-10">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl text-[#0F0F0F] font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border border-[#047146]">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-[14px]">JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Junior Player</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Welcome back, <strong>John!</strong> </h2>
            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your training today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Intermediate</div>
                <p className="text-xs text-muted-foreground">Progressing well</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Today</div>
                <p className="text-xs text-muted-foreground">4:00 PM - 6:00 PM</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Training Progress */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Training Progress</CardTitle>
                    <CardDescription>Your skill development over the past month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Ball Control</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Passing Accuracy</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Physical Fitness</span>
                        <span className="text-sm text-muted-foreground">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tactical Awareness</span>
                        <span className="text-sm text-muted-foreground">70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your latest training sessions and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <Trophy className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Completed Fitness Test</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Shooting Practice</p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                          <Users className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Team Scrimmage</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Training Sessions</CardTitle>
                  <CardDescription>Your scheduled training for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium">Today</span>
                          <span className="text-xs text-muted-foreground">Dec 28</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Technical Skills Training</h3>
                          <p className="text-sm text-muted-foreground">4:00 PM - 6:00 PM</p>
                          <Badge variant="secondary" className="mt-1">
                            Mandatory
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">Join Session</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium">Tomorrow</span>
                          <span className="text-xs text-muted-foreground">Dec 29</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Physical Conditioning</h3>
                          <p className="text-sm text-muted-foreground">6:00 AM - 8:00 AM</p>
                          <Badge variant="outline" className="mt-1 text-[#B0B3B8]">
                            Optional
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your complete training schedule for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (day, index) => (
                        <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-20">
                              <span className="font-medium">{day}</span>
                            </div>
                            <div className="flex-1">
                              {index < 5 ? (
                                <div>
                                  <h3 className="font-medium">Training Session</h3>
                                  <p className="text-sm text-muted-foreground">4:00 PM - 6:00 PM</p>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">Rest Day</span>
                              )}
                            </div>
                          </div>
                          {index < 5 && (
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              {index === 0 ? "Today" : "Scheduled"}
                            </Badge>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Goals</CardTitle>
                    <CardDescription>Track your progress towards monthly objectives</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Attend 20 training sessions</span>
                        <span className="text-sm text-muted-foreground">18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Complete fitness assessments</span>
                        <span className="text-sm text-muted-foreground">3/4</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Improve passing accuracy</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your recent accomplishments and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                          <Trophy className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Perfect Attendance</h3>
                          <p className="text-sm text-muted-foreground">Attended all sessions this month</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Skill Improvement</h3>
                          <p className="text-sm text-muted-foreground">15% increase in ball control</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <Target className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Goal Achieved</h3>
                          <p className="text-sm text-muted-foreground">Completed monthly fitness target</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Announcements</CardTitle>
                  <CardDescription>Important updates from CBFA coaching staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">New Training Equipment Arrival</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            We&apos;ve received new training equipment including agility cones, resistance bands, and
                            practice balls. These will be available for use starting next week.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">Posted 2 hours ago</p>
                        </div>
                        <Badge>New</Badge>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">Inter-Academy Tournament</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            CBFA will be participating in the regional inter-academy tournament next month. Tryouts for
                            the team will be held this weekend.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">Posted yesterday</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">Holiday Training Schedule</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Please note the modified training schedule during the holiday period. Regular sessions will
                            resume on January 8th, 2024.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">Posted 3 days ago</p>
                        </div>
                      </div>
                    </div>
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
