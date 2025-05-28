"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function TrainingPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const trainingSessions = [
        {
            id: 1,
            title: "Technical Skills Training",
            date: "2024-12-20",
            time: "16:00 - 18:00",
            location: "Main Field",
            category: "Senior",
            coach: "Coach Michael",
            participants: 25,
            maxParticipants: 30,
            status: "Scheduled",
            description: "Focus on ball control, passing accuracy, and shooting techniques",
        },
        {
            id: 2,
            title: "Fitness & Conditioning",
            date: "2024-12-21",
            time: "15:00 - 17:00",
            location: "Training Ground",
            category: "Junior",
            coach: "Coach Sarah",
            participants: 18,
            maxParticipants: 20,
            status: "Scheduled",
            description: "Cardiovascular endurance and strength training",
        },
        {
            id: 3,
            title: "Tactical Formation",
            date: "2024-12-22",
            time: "10:00 - 12:00",
            location: "Stadium Complex",
            category: "Senior",
            coach: "Coach David",
            participants: 22,
            maxParticipants: 25,
            status: "In Progress",
            description: "4-3-3 formation practice and positioning",
        },
        {
            id: 4,
            title: "Goalkeeping Specialist",
            date: "2024-12-23",
            time: "14:00 - 16:00",
            location: "Goal Area",
            category: "All",
            coach: "Coach James",
            participants: 8,
            maxParticipants: 10,
            status: "Scheduled",
            description: "Specialized training for goalkeepers",
        },
    ]

    const upcomingWeek = [
        { day: "Monday", sessions: 3 },
        { day: "Tuesday", sessions: 2 },
        { day: "Wednesday", sessions: 4 },
        { day: "Thursday", sessions: 2 },
        { day: "Friday", sessions: 3 },
        { day: "Saturday", sessions: 1 },
        { day: "Sunday", sessions: 0 },
    ]

    const stats = [
        { label: "Total Sessions This Week", value: "15", change: "+3" },
        { label: "Active Participants", value: "73", change: "+8" },
        { label: "Available Coaches", value: "8", change: "0" },
        { label: "Training Hours", value: "32", change: "+6" },
    ]

    return (
        <DashboardLayout userType="admin">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Training Management</h1>
                        <p className="text-gray-600 mt-1">Schedule and manage training sessions</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Schedule Training
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Schedule New Training Session</DialogTitle>
                                <DialogDescription>Create a new training session for your players.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Session Title</Label>
                                    <Input id="title" placeholder="e.g., Technical Skills Training" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input id="date" type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input id="time" placeholder="16:00 - 18:00" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" placeholder="Main Field" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="junior">Junior</SelectItem>
                                                <SelectItem value="senior">Senior</SelectItem>
                                                <SelectItem value="all">All Categories</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="coach">Coach</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select coach" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="michael">Coach Michael</SelectItem>
                                                <SelectItem value="sarah">Coach Sarah</SelectItem>
                                                <SelectItem value="david">Coach David</SelectItem>
                                                <SelectItem value="james">Coach James</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxParticipants">Max Participants</Label>
                                    <Input id="maxParticipants" type="number" placeholder="30" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" placeholder="Training session description..." />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsDialogOpen(false)}>Schedule Session</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-xs text-green-600">{stat.change} from last week</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Calendar */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CalendarIcon className="mr-2 h-5 w-5" />
                                Calendar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                            />

                            <div className="mt-6">
                                <h4 className="font-semibold mb-3">This Week</h4>
                                <div className="space-y-2">
                                    {upcomingWeek.map((day, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">{day.day}</span>
                                            <Badge variant={day.sessions > 0 ? "default" : "secondary"}>{day.sessions} sessions</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Training Sessions */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Scheduled Training Sessions</CardTitle>
                                <CardDescription>Manage upcoming and ongoing training sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {trainingSessions.map((session) => (
                                        <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="font-semibold text-lg">{session.title}</h3>
                                                        <Badge
                                                            variant={
                                                                session.status === "Scheduled"
                                                                    ? "default"
                                                                    : session.status === "In Progress"
                                                                        ? "secondary"
                                                                        : "outline"
                                                            }
                                                        >
                                                            {session.status}
                                                        </Badge>
                                                        <Badge variant="outline">{session.category}</Badge>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {session.date}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="mr-2 h-4 w-4" />
                                                            {session.time}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="mr-2 h-4 w-4" />
                                                            {session.location}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                                        <div className="flex items-center">
                                                            <Users className="mr-2 h-4 w-4" />
                                                            {session.participants}/{session.maxParticipants} participants
                                                        </div>
                                                        <div>Coach: {session.coach}</div>
                                                    </div>

                                                    <p className="text-sm text-gray-600">{session.description}</p>
                                                </div>

                                                <div className="flex space-x-2 mt-4 md:mt-0">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
