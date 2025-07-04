"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Award, Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "react-toastify"
import { Label } from "@/components/ui/label"

export default function PlayerAchievementsAdminPage() {
    // Player data state
    const [playerData, setPlayerData] = useState({
        name: "Player Name",
        playerId: "CBFA-001",
        category: "Category",
        rating: 0,
        attendance: 0,
        goals: 0,
        assists: 0
    })

    // Skills data state
    const [skillsData, setSkillsData] = useState([
        { skill: "Ball Control", current: 0, target: 90, improvement: "+0" },
        { skill: "Passing Accuracy", current: 0, target: 85, improvement: "+0" },
        { skill: "Shooting", current: 0, target: 80, improvement: "+0" },
        { skill: "Defending", current: 0, target: 75, improvement: "+0" },
        { skill: "Physical Fitness", current: 0, target: 90, improvement: "+0" },
        { skill: "Teamwork", current: 0, target: 95, improvement: "+0" },
    ])

    // Achievements state
    const [achievements, setAchievements] = useState([
        {
            id: "1",
            title: "Sample Achievement",
            description: "This is an example achievement",
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            type: "award",
        }
    ])

    // New achievement form state
    const [newAchievement, setNewAchievement] = useState({
        title: "",
        description: "",
        type: "award",
        date: new Date().toISOString().split('T')[0]
    })

    // Skill editing state
    const [editingSkill, setEditingSkill] = useState<null | {
        index: number,
        skill: string,
        current: number,
        target: number,
        improvement: string
    }>(null)

    // Handler for adding a new achievement
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

    // Handler for deleting an achievement
    const handleDeleteAchievement = (id: string) => {
        setAchievements(achievements.filter(ach => ach.id !== id))
        toast.success("Achievement deleted successfully")
    }

    // Handler for editing a skill
    const handleEditSkill = (index: number) => {
        setEditingSkill({
            index,
            ...skillsData[index]
        })
    }

    // Handler for saving edited skill
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

    // Handler for updating player stats
    const handleUpdateStats = (field: string, value: string) => {
        const numValue = parseInt(value) || 0
        setPlayerData({
            ...playerData,
            [field]: numValue
        })
    }

    // Handler for updating player info
    const handleUpdatePlayerInfo = (field: string, value: string) => {
        setPlayerData({
            ...playerData,
            [field]: value
        })
    }

    return (
        <AdminLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Player Performance</h1>
                        <p className="text-gray-600 lg:mt-0 mt-2">Manage achievements and skills for players</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Player ID"
                            value={playerData.playerId}
                            onChange={(e) => handleUpdatePlayerInfo('playerId', e.target.value)}
                            className="w-24 sm:w-32"
                        />
                        <Select
                            value={playerData.category}
                            onValueChange={(value) => handleUpdatePlayerInfo('category', value)}
                        >
                            <SelectTrigger className="w-24 sm:w-32">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Junior">Junior</SelectItem>
                                <SelectItem value="Senior">Senior</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Player Info Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Player Information</CardTitle>
                        <CardDescription>Set basic player information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label>Player Name</Label>
                                <Input
                                    value={playerData.name}
                                    onChange={(e) => handleUpdatePlayerInfo('name', e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Player Stats Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Player Statistics</CardTitle>
                        <CardDescription>Update player&apos;s key performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs sm:text-sm">Rating</Label>
                                <Input
                                    type="number"
                                    value={playerData.rating}
                                    onChange={(e) => handleUpdateStats('rating', e.target.value)}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs sm:text-sm">Attendance</Label>
                                <Input
                                    type="number"
                                    value={playerData.attendance}
                                    onChange={(e) => handleUpdateStats('attendance', e.target.value)}
                                    min="0"
                                    max="100"
                                    className="text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs sm:text-sm">Goals</Label>
                                <Input
                                    type="number"
                                    value={playerData.goals}
                                    onChange={(e) => handleUpdateStats('goals', e.target.value)}
                                    min="0"
                                    className="text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs sm:text-sm">Assists</Label>
                                <Input
                                    type="number"
                                    value={playerData.assists}
                                    onChange={(e) => handleUpdateStats('assists', e.target.value)}
                                    min="0"
                                    className="text-sm"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Skills Development */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-4 sm:w-5 h-4 sm:h-5" />
                                <span className="text-sm sm:text-base">Skills Development</span>
                            </CardTitle>
                            <CardDescription>Manage player&apos;s skill progression</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 sm:space-y-6">
                                {skillsData.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center gap-4">
                                            {editingSkill?.index === index ? (
                                                <Input
                                                    value={editingSkill.skill}
                                                    onChange={(e) => setEditingSkill({
                                                        ...editingSkill,
                                                        skill: e.target.value
                                                    })}
                                                    className="text-sm"
                                                />
                                            ) : (
                                                <span className="font-medium text-sm sm:text-base">{skill.skill}</span>
                                            )}
                                            <div className="flex items-center gap-2">
                                                {editingSkill?.index === index ? (
                                                    <Button
                                                        size="sm"
                                                        onClick={handleSaveSkill}
                                                        className="bg-[#0F0F0F] text-white text-xs sm:text-sm cursor-pointer"
                                                    >
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditSkill(index)}
                                                    >
                                                        <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        {editingSkill?.index === index ? (
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <Label className="text-xs">Current</Label>
                                                    <Input
                                                        type="number"
                                                        value={editingSkill.current}
                                                        onChange={(e) => setEditingSkill({
                                                            ...editingSkill,
                                                            current: parseInt(e.target.value) || 0
                                                        })}
                                                        className="text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Target</Label>
                                                    <Input
                                                        type="number"
                                                        value={editingSkill.target}
                                                        onChange={(e) => setEditingSkill({
                                                            ...editingSkill,
                                                            target: parseInt(e.target.value) || 0
                                                        })}
                                                        className="text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Improvement</Label>
                                                    <Input
                                                        value={editingSkill.improvement}
                                                        onChange={(e) => setEditingSkill({
                                                            ...editingSkill,
                                                            improvement: e.target.value
                                                        })}
                                                        className="text-xs"
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
                                <Award className="w-4 sm:w-5 h-4 sm:h-5" />
                                <span className="text-sm sm:text-base">Achievements</span>
                            </CardTitle>
                            <CardDescription>Add and manage player&apos;s achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {/* Add New Achievement Form */}
                                <div className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3">
                                    <h4 className="font-medium text-sm sm:text-base">Add New Achievement</h4>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Title"
                                            value={newAchievement.title}
                                            onChange={(e) => setNewAchievement({
                                                ...newAchievement,
                                                title: e.target.value
                                            })}
                                            className="text-sm"
                                        />
                                        <Input
                                            placeholder="Description"
                                            value={newAchievement.description}
                                            onChange={(e) => setNewAchievement({
                                                ...newAchievement,
                                                description: e.target.value
                                            })}
                                            className="text-sm"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Select
                                                value={newAchievement.type}
                                                onValueChange={(value) => setNewAchievement({
                                                    ...newAchievement,
                                                    type: value
                                                })}
                                            >
                                                <SelectTrigger className="text-xs sm:text-sm">
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="award" className="text-xs sm:text-sm">Award</SelectItem>
                                                    <SelectItem value="attendance" className="text-xs sm:text-sm">Attendance</SelectItem>
                                                    <SelectItem value="performance" className="text-xs sm:text-sm">Performance</SelectItem>
                                                    <SelectItem value="leadership" className="text-xs sm:text-sm">Leadership</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                type="date"
                                                value={newAchievement.date}
                                                onChange={(e) => setNewAchievement({
                                                    ...newAchievement,
                                                    date: e.target.value
                                                })}
                                                className="text-xs sm:text-sm"
                                            />
                                        </div>
                                        <Button
                                            className="w-full bg-[#0F0F0F] text-white text-sm sm:text-base cursor-pointer"
                                            onClick={handleAddAchievement}
                                        >
                                            <Plus className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                                            Add Achievement
                                        </Button>
                                    </div>
                                </div>

                                {/* Achievements List */}
                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm sm:text-base">Current Achievements</h4>
                                    {achievements.length === 0 ? (
                                        <p className="text-xs sm:text-sm text-gray-500">No achievements yet</p>
                                    ) : (
                                        <div className="border rounded-lg overflow-x-auto">
                                            <Table className="min-w-[600px] sm:min-w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="whitespace-nowrap text-xs sm:text-sm">Title</TableHead>
                                                        <TableHead className="whitespace-nowrap text-xs sm:text-sm hidden sm:table-cell">Type</TableHead>
                                                        <TableHead className="whitespace-nowrap text-xs sm:text-sm">Date</TableHead>
                                                        <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {achievements.map((achievement) => (
                                                        <TableRow key={achievement.id}>
                                                            <TableCell className="py-2 sm:py-3">
                                                                <div>
                                                                    <p className="font-medium text-xs sm:text-sm">{achievement.title}</p>
                                                                    <p className="text-xs text-gray-600 line-clamp-1">{achievement.description}</p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell py-2 sm:py-3">
                                                                <Badge variant="secondary" className="text-xs sm:text-sm">
                                                                    {achievement.type}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="whitespace-nowrap text-xs sm:text-sm py-2 sm:py-3">
                                                                {achievement.date}
                                                            </TableCell>
                                                            <TableCell className="text-right py-2 sm:py-3">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 cursor-pointer"
                                                                    onClick={() => handleDeleteAchievement(achievement.id)}
                                                                >
                                                                    <Trash2 className="w-3 sm:w-4 h-3 sm:h-4 text-red-600" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Save All Changes Button */}
                <div className="flex justify-end">
                    <Button className="bg-[#0F0F0F] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                        Save All Changes
                    </Button>
                </div>
            </div>
        </AdminLayout>
    )
}