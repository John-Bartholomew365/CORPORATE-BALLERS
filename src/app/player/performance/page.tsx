"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Award, Star } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"

export default function PlayerPerformancePage() {
    const skillsData = [
        { skill: "Ball Control", current: 85, target: 90, improvement: "+5" },
        { skill: "Passing Accuracy", current: 78, target: 85, improvement: "+3" },
        { skill: "Shooting", current: 72, target: 80, improvement: "+8" },
        { skill: "Defending", current: 68, target: 75, improvement: "+2" },
        { skill: "Physical Fitness", current: 88, target: 90, improvement: "+4" },
        { skill: "Teamwork", current: 92, target: 95, improvement: "+1" },
    ]

    const monthlyPerformance = [
        { month: "October", rating: 4.1, attendance: 95, goals: 3, assists: 2 },
        { month: "November", rating: 4.3, attendance: 92, goals: 5, assists: 4 },
        { month: "December", rating: 4.5, attendance: 98, goals: 4, assists: 3 },
        { month: "January", rating: 4.2, attendance: 90, goals: 2, assists: 5 },
    ]

    const achievements = [
        {
            title: "Player of the Month",
            description: "Outstanding performance in December",
            date: "Dec 2024",
            type: "award",
        },
        {
            title: "Perfect Attendance",
            description: "100% attendance for 3 consecutive months",
            date: "Dec 2024",
            type: "attendance",
        },
        {
            title: "Top Scorer",
            description: "Highest goals in junior category",
            date: "Nov 2024",
            type: "performance",
        },
        {
            title: "Leadership Award",
            description: "Excellent team leadership skills",
            date: "Oct 2024",
            type: "leadership",
        },
    ]

    const coachFeedback = [
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
        },
    ]

    return (
        <PlayerLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
                        <p className="text-gray-600">Track your progress and development</p>
                    </div>
                    <Badge variant="default" className="text-lg px-4 py-2 bg-[#0F0F0F] text-white">
                        Overall Rating: 4.3/5
                    </Badge>
                </div>

                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">4.3</div>
                            <p className="text-sm text-muted-foreground">Current Rating</p>
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
                            <div className="text-2xl font-bold">14</div>
                            <p className="text-sm text-muted-foreground">Goals This Season</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">14</div>
                            <p className="text-sm text-muted-foreground">Assists This Season</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            <div className="space-y-6">
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
                            <div className="space-y-4">
                                {monthlyPerformance.map((month, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium">{month.month}</h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="font-medium">{month.rating}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Attendance</p>
                                                <p className="font-medium">{month.attendance}%</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-yellow-600" />
                                        <h4 className="font-medium">{achievement.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                                    <div className="flex justify-between items-center">
                                        <Badge variant="secondary">{achievement.type}</Badge>
                                        <p className="text-xs text-gray-500">{achievement.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Coach Feedback */}
                <Card>
                    <CardHeader>
                        <CardTitle>Coach Feedback</CardTitle>
                        <CardDescription>Recent feedback from your coaches</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {coachFeedback.map((feedback, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium">{feedback.session}</h4>
                                            <p className="text-sm text-gray-600">
                                                {feedback.coach} • {feedback.date}
                                            </p>
                                        </div>
                                        {/* <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span className="font-medium">{feedback.rating}</span>
                                        </div> */}
                                    </div>
                                    <p className="text-sm text-gray-700">{feedback.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PlayerLayout>
    )
}
