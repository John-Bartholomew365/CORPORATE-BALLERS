"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Award, Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function PlayerAchievementsAdminPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const playerId = params.id
    
    // Dummy player data based on ID
    const getPlayerData = (id: string) => {
        const dummyPlayers = [
            {
                id: "1",
                name: "John Doe",
                playerId: "ACAD-001",
                category: "Senior",
                rating: 4.3,
                attendance: 92,
                goals: 14,
                assists: 14
            },
            {
                id: "2",
                name: "Jane Smith",
                playerId: "ACAD-002",
                category: "Junior",
                rating: 3.9,
                attendance: 88,
                goals: 8,
                assists: 12
            },
            {
                id: "3",
                name: "Mike Johnson",
                playerId: "ACAD-003",
                category: "Senior",
                rating: 4.1,
                attendance: 95,
                goals: 5,
                assists: 18
            },
            {
                id: "4",
                name: "Sarah Williams",
                playerId: "ACAD-004",
                category: "Junior",
                rating: 4.0,
                attendance: 85,
                goals: 10,
                assists: 7
            }
        ]
        return dummyPlayers.find(player => player.id === id) || dummyPlayers[0]
    }

    const [playerData, setPlayerData] = useState(getPlayerData(playerId))
    const [skillsData, setSkillsData] = useState([
        { skill: "Ball Control", current: 85, target: 90, improvement: "+5" },
        { skill: "Passing Accuracy", current: 78, target: 85, improvement: "+3" },
        { skill: "Shooting", current: 72, target: 80, improvement: "+8" },
        { skill: "Defending", current: 68, target: 75, improvement: "+2" },
        { skill: "Physical Fitness", current: 88, target: 90, improvement: "+4" },
        { skill: "Teamwork", current: 92, target: 95, improvement: "+1" },
    ])

    const [achievements, setAchievements] = useState([
        {
            id: "1",
            title: "Player of the Month",
            description: "Outstanding performance in December",
            date: "Dec 2024",
            type: "award",
        },
        {
            id: "2",
            title: "Perfect Attendance",
            description: "100% attendance for 3 consecutive months",
            date: "Dec 2024",
            type: "attendance",
        },
        {
            id: "3",
            title: "Top Scorer",
            description: "Highest goals in junior category",
            date: "Nov 2024",
            type: "performance",
        },
    ])

    const [newAchievement, setNewAchievement] = useState({
        title: "",
        description: "",
        type: "award",
        date: new Date().toISOString().split('T')[0]
    })

    const [editingSkill, setEditingSkill] = useState<null | {
        index: number,
        skill: string,
        current: number,
        target: number,
        improvement: string
    }>(null)

    const handleAddAchievement = () => {
        if (!newAchievement.title || !newAchievement.description) {
            toast.error("Please fill all fields")
            return
        }

        const formattedDate = new Date(newAchievement.date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        })

        setAchievements([...achievements, {
            id: Date.now().toString(),
            title: newAchievement.title,
            description: newAchievement.description,
            type: newAchievement.type,
            date: formattedDate
        }])

        setNewAchievement({
            title: "",
            description: "",
            type: "award",
            date: new Date().toISOString().split('T')[0]
        })

        toast.success("Achievement added successfully")
    }

    const handleDeleteAchievement = (id: string) => {
        setAchievements(achievements.filter(ach => ach.id !== id))
        toast.success("Achievement deleted successfully")
    }

    const handleEditSkill = (index: number) => {
        setEditingSkill({
            index,
            ...skillsData[index]
        })
    }

    const handleSaveSkill = () => {
        if (!editingSkill) return

        const newSkills = [...skillsData]
        newSkills[editingSkill.index] = {
            skill: editingSkill.skill,
            current: editingSkill.current,
            target: editingSkill.target,
            improvement: editingSkill.improvement
        }

        setSkillsData(newSkills)
        setEditingSkill(null)
        toast.success("Skill updated successfully")
    }

    const handleUpdateStats = (field: string, value: string) => {
        const numValue = parseInt(value) || 0
        setPlayerData({
            ...playerData,
            [field]: numValue
        })
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Button className="cursor-pointer" variant="ghost" onClick={() => router.back()}>
                            &larr; Back to Players
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900 mt-2">Player Performance Management</h1>
                        <p className="text-gray-600">Manage achievements and skills for {playerData.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-lg px-4 py-2 bg-[#0F0F0F] text-white">
                            ID: {playerData.playerId}
                        </Badge>
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                            {playerData.category}
                        </Badge>
                    </div>
                </div>

                {/* Player Stats Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Player Statistics</CardTitle>
                        <CardDescription>Update player&apos;s key performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Rating</label>
                                <Input 
                                    type="number" 
                                    value={playerData.rating} 
                                    onChange={(e) => handleUpdateStats('rating', e.target.value)}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Attendance Rate (%)</label>
                                <Input 
                                    type="number" 
                                    value={playerData.attendance} 
                                    onChange={(e) => handleUpdateStats('attendance', e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Goals This Season</label>
                                <Input 
                                    type="number" 
                                    value={playerData.goals} 
                                    onChange={(e) => handleUpdateStats('goals', e.target.value)}
                                    min="0"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Assists This Season</label>
                                <Input 
                                    type="number" 
                                    value={playerData.assists} 
                                    onChange={(e) => handleUpdateStats('assists', e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Skills Development */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Skills Development
                            </CardTitle>
                            <CardDescription>Manage player&apos; skill progression</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {skillsData.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            {editingSkill?.index === index ? (
                                                <Input
                                                    value={editingSkill.skill}
                                                    onChange={(e) => setEditingSkill({
                                                        ...editingSkill,
                                                        skill: e.target.value
                                                    })}
                                                />
                                            ) : (
                                                <span className="font-medium">{skill.skill}</span>
                                            )}
                                            <div className="flex items-center gap-2">
                                                {editingSkill?.index === index ? (
                                                    <Button 
                                                        size="sm" 
                                                        onClick={handleSaveSkill}
                                                        className="bg-[#0F0F0F] text-white"
                                                    >
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        onClick={() => handleEditSkill(index)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        {editingSkill?.index === index ? (
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <label className="text-xs">Current</label>
                                                    <Input
                                                        type="number"
                                                        value={editingSkill.current}
                                                        onChange={(e) => setEditingSkill({
                                                            ...editingSkill,
                                                            current: parseInt(e.target.value) || 0
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs">Target</label>
                                                    <Input
                                                        type="number"
                                                        value={editingSkill.target}
                                                        onChange={(e) => setEditingSkill({
                                                            ...editingSkill,
                                                            target: parseInt(e.target.value) || 0
                                                        })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs">Improvement</label>
                                                    <Input
                                                        value={editingSkill.improvement}
                                                        onChange={(e) => setEditingSkill({
                                                            ...editingSkill,
                                                            improvement: e.target.value
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
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
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Achievements Management
                            </CardTitle>
                            <CardDescription>Add and manage player&apos;s achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Add New Achievement Form */}
                                <div className="p-4 border rounded-lg space-y-3">
                                    <h4 className="font-medium">Add New Achievement</h4>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Achievement Title"
                                            value={newAchievement.title}
                                            onChange={(e) => setNewAchievement({
                                                ...newAchievement,
                                                title: e.target.value
                                            })}
                                        />
                                        <Input
                                            placeholder="Description"
                                            value={newAchievement.description}
                                            onChange={(e) => setNewAchievement({
                                                ...newAchievement,
                                                description: e.target.value
                                            })}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Select
                                                value={newAchievement.type}
                                                onValueChange={(value) => setNewAchievement({
                                                    ...newAchievement,
                                                    type: value
                                                })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="award">Award</SelectItem>
                                                    <SelectItem value="attendance">Attendance</SelectItem>
                                                    <SelectItem value="performance">Performance</SelectItem>
                                                    <SelectItem value="leadership">Leadership</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                type="date"
                                                value={newAchievement.date}
                                                onChange={(e) => setNewAchievement({
                                                    ...newAchievement,
                                                    date: e.target.value
                                                })}
                                            />
                                        </div>
                                        <Button 
                                            className="w-full bg-[#0F0F0F] text-white"
                                            onClick={handleAddAchievement}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Achievement
                                        </Button>
                                    </div>
                                </div>

                                {/* Achievements List */}
                                <div className="space-y-2">
                                    <h4 className="font-medium">Current Achievements</h4>
                                    {achievements.length === 0 ? (
                                        <p className="text-sm text-gray-500">No achievements yet</p>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {achievements.map((achievement) => (
                                                    <TableRow key={achievement.id}>
                                                        <TableCell>
                                                            <div>
                                                                <p className="font-medium">{achievement.title}</p>
                                                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary">{achievement.type}</Badge>
                                                        </TableCell>
                                                        <TableCell>{achievement.date}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm"
                                                                onClick={() => handleDeleteAchievement(achievement.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-600" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Save All Changes Button */}
                <div className="flex justify-end">
                    <Button className="bg-[#0F0F0F] text-white px-6 py-3">
                        Save All Changes
                    </Button>
                </div>
            </div>
        </AdminLayout>
    )
}