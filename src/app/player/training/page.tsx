"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"

export default function PlayerTrainingPage() {
  const trainingSchedule = [
    {
      day: "Tuesday",
      date: "Jan 16, 2024",
      time: "4:00 PM",
      duration: "2 hours",
      type: "Technical Training",
      coach: "Coach Ahmed",
      location: "Main Field",
      status: "upcoming",
      attendance: "required",
    },
    {
      day: "Wednesday",
      date: "Jan 17, 2024",
      time: "4:00 PM",
      duration: "2 hours",
      type: "Physical Training",
      coach: "Coach Bola",
      location: "Training Ground",
      status: "upcoming",
      attendance: "required",
    },
    {
      day: "Thursday",
      date: "Jan 18, 2024",
      time: "4:00 PM",
      duration: "2 hours",
      type: "Tactical Training",
      coach: "Coach Ahmed",
      location: "Main Field",
      status: "upcoming",
      attendance: "required",
    },
    {
      day: "Saturday",
      date: "Jan 20, 2024",
      time: "4:30 PM",
      duration: "2.5 hours",
      type: "Match Practice",
      coach: "Coach Bola",
      location: "Main Field",
      status: "upcoming",
      attendance: "required",
    },
    {
      day: "Sunday",
      date: "Jan 21, 2024",
      time: "4:30 PM",
      duration: "2.5 hours",
      type: "Skills Development",
      coach: "Coach Ahmed",
      location: "Training Ground",
      status: "upcoming",
      attendance: "required",
    },
  ]

  const pastSessions = [
    {
      date: "Jan 14, 2024",
      type: "Technical Training",
      attendance: "present",
      rating: 4.5,
      notes: "Excellent ball control and passing accuracy",
    },
    {
      date: "Jan 11, 2024",
      type: "Match Practice",
      attendance: "present",
      rating: 4.2,
      notes: "Good positioning, needs work on finishing",
    },
    {
      date: "Jan 9, 2024",
      type: "Physical Training",
      attendance: "absent",
      rating: null,
      notes: "Missed due to illness",
    },
  ]

  return (
    <PlayerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Schedule</h1>
            <p className="text-gray-600">Your upcoming training sessions and history</p>
          </div>
          <Button variant="outline" className="bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
        </div>

        {/* Training Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Sessions This Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">92%</div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">4.3</div>
              <p className="text-sm text-muted-foreground">Avg Performance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">11</div>
              <p className="text-sm text-muted-foreground">Hours This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Training */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Training Sessions</CardTitle>
            <CardDescription>Your scheduled training sessions for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingSchedule.map((session, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
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
                            <MapPin className="w-4 h-4" />
                            {session.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.coach}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{session.date}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{session.status}</Badge>
                        {session.attendance === "required" && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Training History</CardTitle>
            <CardDescription>Your past training sessions and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastSessions.map((session, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          session.attendance === "present" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {session.attendance === "present" ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{session.type}</h3>
                        <p className="text-sm text-gray-600">{session.date}</p>
                        <p className="text-sm text-gray-600 mt-1">{session.notes}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={session.attendance === "present" ? "default" : "secondary"}>
                        {session.attendance}
                      </Badge>
                      {session.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{session.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Training Guidelines</CardTitle>
            <CardDescription>Important information for training sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">What to Bring</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Football boots and shin guards</li>
                  <li>• Water bottle and towel</li>
                  <li>• Training kit (provided by academy)</li>
                  <li>• Positive attitude and dedication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Training Rules</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Arrive 15 minutes before session</li>
                  <li>• Respect coaches and teammates</li>
                  <li>• Give 100% effort in every drill</li>
                  <li>• Maintain discipline and focus</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlayerLayout>
  )
}
