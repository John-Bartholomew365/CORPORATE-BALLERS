"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Save, Edit, Phone, Mail, MapPin, Calendar, Trophy, Target, Activity } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+234 8123456789",
        dateOfBirth: "2005-03-15",
        address: "123 Main Street, Ilorin, Kwara State",
        position: "Midfielder",
        jerseyNumber: "10",
        height: "175",
        weight: "70",
        emergencyContact: "Jane Doe",
        emergencyPhone: "+234 8987654321",
        medicalConditions: "None",
        bio: "Passionate midfielder with 5 years of experience. Love creating opportunities and supporting my teammates.",
    })

    const playerStats = [
        { label: "Matches Played", value: "45", icon: Activity },
        { label: "Goals Scored", value: "12", icon: Target },
        { label: "Assists", value: "18", icon: Trophy },
        { label: "Training Sessions", value: "89", icon: Calendar },
    ]

    const achievements = [
        {
            title: "Player of the Month",
            date: "November 2024",
            description: "Outstanding performance in training and matches",
        },
        { title: "Perfect Attendance", date: "October 2024", description: "100% attendance for the month" },
        { title: "Top Assist Provider", date: "September 2024", description: "Most assists in the senior category" },
        { title: "Team Captain", date: "August 2024", description: "Selected as team captain for leadership qualities" },
    ]

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false)
    }

    return (
        <DashboardLayout userType="player">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
                    </div>
                    <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
                        {isEditing ? (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Cancel
                            </>
                        ) : (
                            <>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </>
                        )}
                    </Button>
                </div>

                <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="personal">Personal Info</TabsTrigger>
                        <TabsTrigger value="player">Player Details</TabsTrigger>
                        <TabsTrigger value="stats">Statistics</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>

                    {/* Personal Information */}
                    <TabsContent value="personal" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Profile Picture */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Picture</CardTitle>
                                    <CardDescription>Update your profile photo</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center space-y-4">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="text-2xl">
                                            {profileData.firstName[0]}
                                            {profileData.lastName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <Button variant="outline" size="sm">
                                            <Camera className="mr-2 h-4 w-4" />
                                            Change Photo
                                        </Button>
                                    )}
                                    <div className="text-center">
                                        <div className="font-semibold text-lg">
                                            {profileData.firstName} {profileData.lastName}
                                        </div>
                                        <div className="text-gray-600">{profileData.position}</div>
                                        <Badge variant="secondary" className="mt-2">
                                            Jersey #{profileData.jerseyNumber}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Personal Details */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Your basic personal details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={profileData.firstName}
                                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    value={profileData.lastName}
                                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="phone"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="dateOfBirth"
                                                    type="date"
                                                    value={profileData.dateOfBirth}
                                                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Textarea
                                                    id="address"
                                                    value={profileData.address}
                                                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder="Tell us about yourself..."
                                            />
                                        </div>

                                        {isEditing && (
                                            <Button onClick={handleSave} className="w-full">
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Player Details */}
                    <TabsContent value="player" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Player Information</CardTitle>
                                    <CardDescription>Your football-specific details</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="position">Position</Label>
                                            <Input
                                                id="position"
                                                value={profileData.position}
                                                onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="jerseyNumber">Jersey Number</Label>
                                            <Input
                                                id="jerseyNumber"
                                                value={profileData.jerseyNumber}
                                                onChange={(e) => setProfileData({ ...profileData, jerseyNumber: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="height">Height (cm)</Label>
                                            <Input
                                                id="height"
                                                value={profileData.height}
                                                onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="weight">Weight (kg)</Label>
                                            <Input
                                                id="weight"
                                                value={profileData.weight}
                                                onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Emergency Contact</CardTitle>
                                    <CardDescription>Emergency contact information</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                                        <Input
                                            id="emergencyContact"
                                            value={profileData.emergencyContact}
                                            onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                                        <Input
                                            id="emergencyPhone"
                                            value={profileData.emergencyPhone}
                                            onChange={(e) => setProfileData({ ...profileData, emergencyPhone: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                                        <Textarea
                                            id="medicalConditions"
                                            value={profileData.medicalConditions}
                                            onChange={(e) => setProfileData({ ...profileData, medicalConditions: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Any medical conditions or allergies..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Statistics */}
                    <TabsContent value="stats" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {playerStats.map((stat, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-muted-foreground">This season</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Overview</CardTitle>
                                <CardDescription>Your performance metrics over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-gray-500">
                                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Performance charts will be displayed here</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Achievements */}
                    <TabsContent value="achievements" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {achievements.map((achievement, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-yellow-100 rounded-full p-2">
                                                <Trophy className="h-5 w-5 text-yellow-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                                <CardDescription>{achievement.date}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{achievement.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
