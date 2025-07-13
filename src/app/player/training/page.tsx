"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getToken } from "@/app/reuseables/authToken"

interface TrainingSession {
  id: string
  day: string
  time: string
  duration: string
  category: string
  coach: string
  trainingType: string
  location: string
  description: string
  createdAt: string
}

interface PastSession {
  date: string
  type: string
  attendance: "present" | "absent"
  rating: number | null
  notes: string
}

export default function PlayerTrainingPage() {
  const [upcomingSessions, setUpcomingSessions] = useState<TrainingSession[]>([])
  const [pastSessions, setPastSessions] = useState<PastSession[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    sessionsThisWeek: 0,
    attendanceRate: 0,
    avgPerformance: 0,
    hoursThisWeek: 0
  })

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const token = getToken()
        if (!token) {
          toast.error("Please log in to view training schedule")
          return
        }

        const response = await axios.get("/api/player-training", {
          headers: {
            Authorization: token
          }
        })

        if (response.data.statusCode === "00") {
          const sessions = response.data.data
          setUpcomingSessions(sessions)

          // Calculate stats based on sessions
          const sessionsThisWeek = sessions.length
          const hoursThisWeek = sessions.reduce((sum: number, session: TrainingSession) => 
            sum + parseInt(session.duration), 0)
          
          // Mock past sessions (in a real app, this would come from the API)
          const mockPastSessions: PastSession[] = [
            {
              date: formatDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
              type: sessions[0]?.trainingType || "Technical Training",
              attendance: "present",
              rating: 4.5,
              notes: sessions[0]?.description || "Excellent performance"
            },
            {
              date: formatDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
              type: sessions[1]?.trainingType || "Physical Training",
              attendance: "present",
              rating: 4.2,
              notes: sessions[1]?.description || "Good effort"
            },
            {
              date: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
              type: sessions[0]?.trainingType || "Tactical Training",
              attendance: "absent",
              rating: null,
              notes: "Missed due to illness"
            }
          ]

          setPastSessions(mockPastSessions)
          setStats({
            sessionsThisWeek,
            attendanceRate: 85, // Mock value - would come from API
            avgPerformance: 4.3, // Mock value - would come from API
            hoursThisWeek
          })
        } else {
          toast.error(response.data.message || "Failed to fetch training data")
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch training data")
        } else {
          toast.error("An unexpected error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTrainingData()
  }, [])

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":")
    const hour = parseInt(hours)
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  }

  if (loading) {
    return (
      <PlayerLayout>
        <div className="space-y-4 md:space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 w-[200px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[250px] bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-[150px] bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-8 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse mt-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Training Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Past Training Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-6 w-[80px] bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guidelines Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="h-5 w-[120px] bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="space-y-1">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-5 w-[120px] bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="space-y-1">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PlayerLayout>
    )
  }

  return (
    <PlayerLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Training Schedule</h1>
            <p className="text-gray-600">Your upcoming training sessions and history</p>
          </div>
          <Button variant="outline" className="bg-transparent w-full md:w-auto">
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
        </div>

        {/* Training Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{stats.sessionsThisWeek}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Sessions This Week</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{stats.attendanceRate}%</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Attendance Rate</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{stats.avgPerformance}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg Performance</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{stats.hoursThisWeek}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Hours This Week</p>
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
            {upcomingSessions.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {session.day} - {session.trainingType}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
                              {formatTime(session.time)} ({session.duration} hours)
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                              {session.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 sm:w-4 h-3 sm:h-4" />
                              {session.coach}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:text-right mt-2 sm:mt-0">
                        <p className="text-sm sm:text-base font-medium">
                          {formatDate(new Date(session.createdAt))}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            upcoming
                          </Badge>
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Required
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming training sessions</p>
            )}
          </CardContent>
        </Card>

        {/* Training History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Training History</CardTitle>
            <CardDescription>Your past training sessions and performance</CardDescription>
          </CardHeader>
          <CardContent>
            {pastSessions.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {pastSessions.map((session, index) => (
                  <div key={index} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          session.attendance === "present" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {session.attendance === "present" ? (
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">{session.type}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{session.date}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">{session.notes}</p>
                        </div>
                      </div>
                      <div className="sm:text-right mt-2 sm:mt-0">
                        <Badge variant={session.attendance === "present" ? "default" : "secondary"} className="text-xs sm:text-sm">
                          {session.attendance}
                        </Badge>
                        {session.rating && (
                          <div className="flex items-center justify-end gap-1 mt-2">
                            <span className="text-yellow-500">★</span>
                            <span className="font-medium text-sm sm:text-base">{session.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No past training sessions</p>
            )}
          </CardContent>
        </Card>

        {/* Training Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Training Guidelines</CardTitle>
            <CardDescription>Important information for training sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-2">What to Bring</h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>• Football boots and shin guards</li>
                  <li>• Water bottle and towel</li>
                  <li>• Training kit (provided by academy)</li>
                  <li>• Positive attitude and dedication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-2">Training Rules</h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
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