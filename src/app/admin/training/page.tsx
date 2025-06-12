"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Edit, Trash2 } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import { AddTrainingModal } from "./AddTrainingModal"

export default function TrainingPage() {
  const trainingSchedule = [
    {
      id: 1,
      day: "Tuesday",
      time: "4:00 PM",
      duration: "2 hours",
      category: "All Categories",
      coach: "Coach Ahmed",
      participants: 45,
      type: "Technical Training",
      location: "Main Field",
    },
    {
      id: 2,
      day: "Wednesday",
      time: "4:00 PM",
      duration: "2 hours",
      category: "All Categories",
      coach: "Coach Bola",
      participants: 42,
      type: "Physical Training",
      location: "Training Ground",
    },
    {
      id: 3,
      day: "Thursday",
      time: "4:00 PM",
      duration: "2 hours",
      category: "All Categories",
      coach: "Coach Ahmed",
      participants: 48,
      type: "Tactical Training",
      location: "Main Field",
    },
    {
      id: 4,
      day: "Saturday",
      time: "4:30 PM",
      duration: "2.5 hours",
      category: "All Categories",
      coach: "Coach Bola",
      participants: 52,
      type: "Match Practice",
      location: "Main Field",
    },
    {
      id: 5,
      day: "Sunday",
      time: "4:30 PM",
      duration: "2.5 hours",
      category: "All Categories",
      coach: "Coach Ahmed",
      participants: 49,
      type: "Skills Development",
      location: "Training Ground",
    },
  ]

  const upcomingEvents = [
    {
      title: "Inter-Academy Tournament",
      date: "January 25, 2024",
      time: "10:00 AM",
      location: "Kwara State Stadium",
      category: "Senior",
    },
    {
      title: "Skills Assessment",
      date: "January 30, 2024",
      time: "4:00 PM",
      location: "CBFA Training Ground",
      category: "All",
    },
    {
      title: "Parent-Coach Meeting",
      date: "February 5, 2024",
      time: "6:00 PM",
      location: "Academy Hall",
      category: "All",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Management</h1>
            <p className="text-gray-600">Manage training schedules and sessions</p>
          </div>
          <AddTrainingModal />
        </div>

        {/* Training Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Training Schedule</CardTitle>
            <CardDescription>Regular training sessions for all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {trainingSchedule.map((session) => (
                <div key={session.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {session.day} - {session.type}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.time} ({session.duration})
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.participants} players
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2 bg-[#F4F4F5]">
                        {session.category}
                      </Badge>
                      <p className="text-sm text-gray-600">Coach: {session.coach}</p>
                      <p className="text-sm text-gray-600">Location: {session.location}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Special events and tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>
                        {event.date} at {event.time}
                      </p>
                      <p>{event.location}</p>
                    </div>
                    <Badge variant="outline" className="mt-2 text-[#B0B3B8]">
                      {event.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Training Statistics</CardTitle>
              <CardDescription>This week&apos;s training overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Total Sessions</span>
                  <span className="text-2xl font-bold text-green-600">5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Average Attendance</span>
                  <span className="text-2xl font-bold text-blue-600">47</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Training Hours</span>
                  <span className="text-2xl font-bold text-purple-600">11</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Active Coaches</span>
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}