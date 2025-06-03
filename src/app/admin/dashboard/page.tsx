"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Trophy, TrendingUp, Plus, Settings, LogOut } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Players",
      value: "156",
      change: "+12 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Training Sessions",
      value: "5",
      change: "per week",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Tournaments",
      value: "8",
      change: "this season",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Performance",
      value: "92%",
      change: "attendance rate",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentActivities = [
    { action: "New player registered", player: "John Bartholomew", time: "2 hours ago", category: "Senior" },
    { action: "Training session completed", session: "Tuesday 4PM", time: "1 day ago", category: "All" },
    { action: "Player promoted", player: "Sarah Okafor", time: "2 days ago", category: "Junior to Senior" },
    { action: "Tournament match scheduled", match: "CBFA vs Lions FC", time: "3 days ago", category: "Senior" },
  ]

  const upcomingTraining = [
    { day: "Tuesday", time: "4:00 PM", category: "All Categories", participants: 45 },
    { day: "Wednesday", time: "4:00 PM", category: "All Categories", participants: 42 },
    { day: "Thursday", time: "4:00 PM", category: "All Categories", participants: 48 },
    { day: "Saturday", time: "4:30 PM", category: "All Categories", participants: 52 },
    { day: "Sunday", time: "4:30 PM", category: "All Categories", participants: 49 },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening at CBFA.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/settings">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            </Link>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from the academy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#FFFFFF] rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.player || activity.session || activity.match}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {activity.category}
                      </Badge>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Schedule */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Training Schedule</CardTitle>
                <CardDescription>Upcoming training sessions</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Session
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTraining.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{session.day}</p>
                      <p className="text-sm text-gray-600">{session.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.participants} players</p>
                      <p className="text-xs text-gray-500">{session.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Manage Players</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Schedule Training</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Trophy className="w-6 h-6" />
                <span className="text-sm">Tournaments</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </AdminLayout>
  )
}
