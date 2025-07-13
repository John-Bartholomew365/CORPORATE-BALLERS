"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Award, Star } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getToken } from "@/app/reuseables/authToken"

interface Skill {
    skill: string
    current: number
    target: number
    improvement: string
}

interface MonthlyPerformance {
    month: string
    rating: number
    attendance: number
    goals: number
    assists: number
}

interface Achievement {
    title: string
    description: string
    date: string
    type: string
}


interface PerformanceData {
    playerName: string
    skills: {
        ballControl: number
        passingAccuracy: number
        shooting: number
        defending: number
        physical_fitness: number
        team_work: number
    }
    statistics: {
        rating: number
        attendance: number
        goals: number
        assists: number
    }
    achievements: {
        title: string
        description: string
        accolade: string
        date: string
    }[]
}

export default function PlayerPerformancePage() {
    const [loading, setLoading] = useState(true)
    const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
    const [skillsData, setSkillsData] = useState<Skill[]>([])
    const [monthlyPerformance, setMonthlyPerformance] = useState<MonthlyPerformance[]>([])
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [overallRating, setOverallRating] = useState(0)

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const token = getToken()
                if (!token) {
                    toast.error("Please log in to view performance data")
                    return
                }

                const response = await axios.get("/api/get-profile", {
                    headers: {
                        Authorization: token
                    }
                })

                if (response.data.statusCode === "00") {
                    const data = response.data.performance
                    setPerformanceData(data)

                    // Map skills data
                    const mappedSkills: Skill[] = [
                        { skill: "Ball Control", current: data.skills.ballControl, target: 90, improvement: calculateImprovement(data.skills.ballControl, 90) },
                        { skill: "Passing Accuracy", current: data.skills.passingAccuracy, target: 85, improvement: calculateImprovement(data.skills.passingAccuracy, 85) },
                        { skill: "Shooting", current: data.skills.shooting, target: 80, improvement: calculateImprovement(data.skills.shooting, 80) },
                        { skill: "Defending", current: data.skills.defending, target: 75, improvement: calculateImprovement(data.skills.defending, 75) },
                        { skill: "Physical Fitness", current: data.skills.physical_fitness, target: 90, improvement: calculateImprovement(data.skills.physical_fitness, 90) },
                        { skill: "Teamwork", current: data.skills.team_work, target: 95, improvement: calculateImprovement(data.skills.team_work, 95) },
                    ]
                    setSkillsData(mappedSkills)

                    // Map achievements
                    interface RawAchievement {
                        title: string
                        description: string
                        accolade: string
                        date: string
                    }

                    const mappedAchievements: Achievement[] = (data.achievements as RawAchievement[]).map((ach: RawAchievement): Achievement => ({
                        title: ach.title,
                        description: ach.description,
                        type: ach.accolade,
                        date: formatDate(ach.date)
                    }))
                    setAchievements(mappedAchievements)

                    // Calculate overall rating (convert from 100 scale to 5 scale)
                    const rating = (data.statistics.rating / 20).toFixed(1)
                    setOverallRating(parseFloat(rating))

                    // Generate monthly performance data (mock for now)
                    generateMonthlyPerformance(data.statistics)
                } else {
                    toast.error(response.data.message || "Failed to fetch performance data")
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Failed to fetch performance data")
                } else {
                    toast.error("An unexpected error occurred")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchPerformanceData()
    }, [])

    const calculateImprovement = (current: number, target: number): string => {
        const percentage = Math.round((current / target) * 100) - 100
        return percentage >= 0 ? `+${percentage}` : percentage.toString()
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    }

    const generateMonthlyPerformance = (stats: PerformanceData["statistics"]) => {
        // This is mock data - in a real app you would get this from the API
        const months = ["October", "November", "December", "January"]
        const performance = months.map((month, index) => ({
            month,
            rating: (stats.rating / 20) + (Math.random() * 0.4 - 0.2), // Small variation around the average
            attendance: stats.attendance + (Math.random() * 6 - 3), // Small variation
            goals: Math.floor(stats.goals / 4) + (index % 2), // Distribute goals
            assists: Math.floor(stats.assists / 4) + (index % 3) // Distribute assists
        }))
        setMonthlyPerformance(performance)
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

                    {/* Performance Overview Skeleton */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <Card key={item} className="min-w-0">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="h-8 w-[50px] bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse mt-2"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        {/* Skills Development Skeleton */}
                        <Card>
                            <CardHeader>
                                <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 sm:space-y-6">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div key={item} className="space-y-2">
                                            <div className="flex justify-between">
                                                <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                            <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="flex justify-between">
                                                <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Monthly Performance Skeleton */}
                        {/* <Card>
              <CardHeader>
                <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        {[1, 2, 3].map((subItem) => (
                          <div key={subItem}>
                            <div className="h-3 w-[60px] bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse mt-1"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}


                        {/* Performance Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Performance Statistics
                                </CardTitle>
                                <CardDescription>Your current season performance metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Skills Rating</h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{performanceData ? (performanceData.statistics.rating / 20).toFixed(1) : "-"}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Ball Control: {performanceData ? performanceData.skills.ballControl : "-"}%</span>
                                            <span>Passing: {performanceData ? performanceData.skills.passingAccuracy : "-"}%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Physical Metrics</h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{performanceData ? performanceData.skills.physical_fitness : "-" }%</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Teamwork: {performanceData ? performanceData.skills.team_work : "-"}%</span>
                                            <span>Defending: {performanceData ? performanceData.skills.defending : "-"}%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Goal Contributions</h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{performanceData ? (performanceData.statistics.goals + performanceData.statistics.assists) : "-"}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Goals: {performanceData ? performanceData.statistics.goals : "-"}</span>
                                            <span>Assists: {performanceData ? performanceData.statistics.assists : "-"}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Attendance</h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{performanceData ? performanceData.statistics.attendance : "-"}%</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shooting: {performanceData ? performanceData.skills.shooting : "-"}%</span>
                                            <span>Overall: {performanceData ? (performanceData.statistics.rating / 20).toFixed(1) : "-"}/5</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Achievements Skeleton */}
                    <Card>
                        <CardHeader>
                            <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="p-3 sm:p-4 bg-gray-50 rounded-lg border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="flex justify-between items-center">
                                            <div className="h-6 w-[60px] bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="h-3 w-[60px] bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Coach Feedback Skeleton */}
                    <Card>
                        <CardHeader>
                            <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="p-3 sm:p-4 border rounded-lg">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                            <div>
                                                <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-3 w-[200px] bg-gray-200 rounded animate-pulse mt-1"></div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                                                <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </PlayerLayout>
        )
    }

    if (!performanceData) {
        return (
            <PlayerLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-gray-500">Failed to load performance data</p>
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
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Performance Dashboard</h1>
                        <p className="text-gray-600">Track your progress and development</p>
                    </div>
                    <Badge variant="default" className="text-base md:text-lg px-3 md:px-4 py-1 md:py-2 bg-[#0F0F0F] text-white w-fit">
                        Overall Rating: {overallRating}/5
                    </Badge>
                </div>

                {/* Performance Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <Card className="min-w-0">
                        <CardContent className="p-4 sm:p-6">
                            <div className="text-xl sm:text-2xl font-bold">{overallRating}</div>
                            <p className="text-xs sm:text-sm text-muted-foreground">Current Rating</p>
                        </CardContent>
                    </Card>
                    <Card className="min-w-0">
                        <CardContent className="p-4 sm:p-6">
                            <div className="text-xl sm:text-2xl font-bold">{performanceData.statistics.attendance}%</div>
                            <p className="text-xs sm:text-sm text-muted-foreground">Attendance Rate</p>
                        </CardContent>
                    </Card>
                    <Card className="min-w-0">
                        <CardContent className="p-4 sm:p-6">
                            <div className="text-xl sm:text-2xl font-bold">{performanceData.statistics.goals}</div>
                            <p className="text-xs sm:text-sm text-muted-foreground">Goals This Season</p>
                        </CardContent>
                    </Card>
                    <Card className="min-w-0">
                        <CardContent className="p-4 sm:p-6">
                            <div className="text-xl sm:text-2xl font-bold">{performanceData.statistics.assists}</div>
                            <p className="text-xs sm:text-sm text-muted-foreground">Assists This Season</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Skills Development */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Skills Development
                            </CardTitle>
                            <CardDescription>Your progress in different skill areas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 sm:space-y-6">
                                {skillsData.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{skill.skill}</span>
                                            <span className="text-green-600">{skill.improvement}</span>
                                        </div>
                                        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#0F0F0F] rounded-full"
                                                style={{ width: `${(skill.current / skill.target) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>{skill.current}%</span>
                                            <span>Target: {skill.target}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Monthly Performance
                            </CardTitle>
                            <CardDescription>Your performance trends over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {monthlyPerformance.map((month, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium text-sm sm:text-base">{month.month}</h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium text-sm sm:text-base">{month.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                                            <div>
                                                <p className="text-gray-600">Attendance</p>
                                                <p className="font-medium">{month.attendance.toFixed(0)}%</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Goals</p>
                                                <p className="font-medium">{month.goals}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Assists</p>
                                                <p className="font-medium">{month.assists}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Achievements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Achievements & Awards
                        </CardTitle>
                        <CardDescription>Your accomplishments and recognitions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {achievements.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className="p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                            <h4 className="font-medium text-sm sm:text-base">{achievement.title}</h4>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{achievement.description}</p>
                                        <div className="flex justify-between items-center">
                                            <Badge variant="secondary" className="text-xs">{achievement.type}</Badge>
                                            <p className="text-xs text-gray-500">{achievement.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">No achievements yet</p>
                        )}
                    </CardContent>
                </Card>

                {/* Coach Feedback */}
                <Card>
                    <CardHeader>
                        <CardTitle>Coach Feedback</CardTitle>
                        <CardDescription>Recent feedback from your coaches</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {[
                                {
                                    date: "Jan 14, 2024",
                                    coach: "Coach Ahmed",
                                    session: "Technical Training",
                                    feedback: "Excellent ball control and vision. Continue working on first touch under pressure.",
                                    rating: 4.5,
                                },
                                {
                                    date: "Jan 11, 2024",
                                    coach: "Coach Bola",
                                    session: "Match Practice",
                                    feedback: "Good positioning and movement. Need to be more decisive in the final third.",
                                    rating: 4.2,
                                },
                                {
                                    date: "Jan 9, 2024",
                                    coach: "Coach Ahmed",
                                    session: "Physical Training",
                                    feedback: "Strong endurance and speed. Keep up the fitness work.",
                                    rating: 4.6,
                                }
                            ].map((feedback, index) => (
                                <div key={index} className="p-3 sm:p-4 border rounded-lg">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                        <div>
                                            <h4 className="font-medium text-sm sm:text-base">{feedback.session}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                {feedback.coach} • {feedback.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span className="font-medium text-sm sm:text-base">{feedback.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700">{feedback.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PlayerLayout>
    )
}