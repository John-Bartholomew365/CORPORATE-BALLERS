"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Award, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminLayout } from "@/components/dashboard/AdminLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { getToken } from "@/app/reuseables/authToken";

interface PlayerData {
    name: string;
    playerId: string;
    category: string;
    rating: number;
    attendance: number;
    goals: number;
    assists: number;
}

interface Skill {
    skill: string;
    current: number;
    target: number;
    improvement: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    type: string;
    date: string;
}

export default function PlayerAchievementsAdminPage() {
    const [playerData, setPlayerData] = useState<PlayerData>({
        name: "",
        playerId: "",
        category: "",
        rating: 0,
        attendance: 0,
        goals: 0,
        assists: 0,
    });
    const [skillsData, setSkillsData] = useState<Skill[]>([
        { skill: "Ball Control", current: 0, target: 90, improvement: "+0" },
        { skill: "Passing Accuracy", current: 0, target: 85, improvement: "+0" },
        { skill: "Shooting", current: 0, target: 80, improvement: "+0" },
        { skill: "Defending", current: 0, target: 75, improvement: "+0" },
        { skill: "Physical Fitness", current: 0, target: 90, improvement: "+0" },
        { skill: "Teamwork", current: 0, target: 95, improvement: "+0" },
    ]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [newAchievement, setNewAchievement] = useState({
        title: "",
        description: "",
        type: "award",
        date: new Date().toISOString().split("T")[0],
    });
    const [editingSkill, setEditingSkill] = useState<null | {
        index: number;
        skill: string;
        current: number;
        target: number;
        improvement: string;
    }>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const playerId = params.playerId as string;

    // Check if player has any performance data or achievements
    const hasPerformanceData = () => {
        return (
            playerData.rating > 0 ||
            playerData.attendance > 0 ||
            playerData.goals > 0 ||
            playerData.assists > 0 ||
            skillsData.some(skill => skill.current > 0) ||
            achievements.length > 0
        );
    };

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const token = getToken();
                if (!token) {
                    toast.error("Please log in to view player data.");
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 2000);
                    return;
                }

                const response = await axios.get(`/api/get-achievement?userId=${playerId}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const data = response.data;

                if (data.statusCode === "00") {
                    const player = data.data;
                    setPlayerData({
                        name: player.playerName,
                        playerId: player._id,
                        category: player.category || "Unknown",
                        rating: player.statistics.rating,
                        attendance: player.statistics.attendance,
                        goals: player.statistics.goals,
                        assists: player.statistics.assists,
                    });
                    setSkillsData([
                        { skill: "Ball Control", current: player.skills.ballControl, target: 90, improvement: "+0" },
                        { skill: "Passing Accuracy", current: player.skills.passingAccuracy, target: 85, improvement: "+0" },
                        { skill: "Shooting", current: player.skills.shooting, target: 80, improvement: "+0" },
                        { skill: "Defending", current: player.skills.defending, target: 75, improvement: "+0" },
                        { skill: "Physical Fitness", current: player.skills.physical_fitness, target: 90, improvement: "+0" },
                        { skill: "Teamwork", current: player.skills.team_work, target: 95, improvement: "+0" },
                    ]);
                    setAchievements(
                        player.achievements.map((ach: {
                            _id: string;
                            title: string;
                            description: string;
                            accolade: string;
                            date: string;
                        }) => ({
                            id: ach._id,
                            title: ach.title,
                            description: ach.description,
                            type: ach.accolade,
                            date: new Date(ach.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }),
                        }))
                    );
                    toast.success("Player data retrieved successfully!");
                } else {
                    toast.error(data.message || "Failed to fetch player data");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        toast.error("Session expired. Please log in again.");
                        setTimeout(() => {
                            router.push("/auth/login");
                        }, 2000);
                    } else {
                        toast.error(error.response?.data?.message || "Failed to fetch player data");
                    }
                } else {
                    toast.error("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, [playerId, router]);

    const handleAddAchievement = async () => {
        if (!newAchievement.title || !newAchievement.description) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                toast.error("Please log in to add achievements.");
                return;
            }

            const response = await axios.post(
                "/api/add-achievement",
                {
                    userId: playerId,
                    title: newAchievement.title,
                    description: newAchievement.description,
                    accolade: newAchievement.type,
                    date: newAchievement.date,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const result = response.data;
            if (result.statusCode === "00") {
                const formattedDate = new Date(newAchievement.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                });
                setAchievements([
                    ...achievements,
                    {
                        id: result.data._id,
                        title: newAchievement.title,
                        description: newAchievement.description,
                        type: newAchievement.type,
                        date: formattedDate,
                    },
                ]);
                setNewAchievement({
                    title: "",
                    description: "",
                    type: "award",
                    date: new Date().toISOString().split("T")[0],
                });
                toast.success("Achievement added successfully");
            } else {
                toast.error(result.message || "Failed to add achievement");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to add achievement");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    const handleDeleteAchievement = async (id: string) => {
        try {
            const token = getToken();
            if (!token) {
                toast.error("Please log in to delete achievements.");
                return;
            }

            const response = await axios.delete(`/api/add-achievement?id=${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            const result = response.data;
            if (result.statusCode === "00") {
                setAchievements(achievements.filter((ach) => ach.id !== id));
                toast.success("Achievement deleted successfully");
            } else {
                toast.error(result.message || "Failed to delete achievement");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to delete achievement");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    const handleEditSkill = (index: number) => {
        setEditingSkill({
            index,
            ...skillsData[index],
        });
    };

    const handleSaveSkill = () => {
        if (!editingSkill) return;

        const newSkills = [...skillsData];
        newSkills[editingSkill.index] = {
            skill: editingSkill.skill,
            current: editingSkill.current,
            target: editingSkill.target,
            improvement: editingSkill.improvement,
        };

        setSkillsData(newSkills);
        setEditingSkill(null);
        toast.success("Skill updated successfully");
    };

    const handleUpdateStats = (field: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setPlayerData({
            ...playerData,
            [field]: numValue,
        });
    };

    const handleUpdatePlayerInfo = (field: string, value: string) => {
        setPlayerData({
            ...playerData,
            [field]: value,
        });
    };

    const handleSaveAllChanges = async () => {
        try {
            const token = getToken();
            if (!token) {
                toast.error("Please log in to save changes.");
                return;
            }

            const response = await axios.patch(
                "/api/update-performance",
                {
                    userId: playerId,
                    playerName: playerData.name,
                    skills: {
                        ballControl: skillsData[0].current,
                        passingAccuracy: skillsData[1].current,
                        shooting: skillsData[2].current,
                        defending: skillsData[3].current,
                        physical_fitness: skillsData[4].current,
                        team_work: skillsData[5].current,
                    },
                    statistics: {
                        rating: playerData.rating,
                        attendance: playerData.attendance,
                        goals: playerData.goals,
                        assists: playerData.assists,
                    },
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const result = response.data;
            if (result.statusCode === "00") {
                toast.success("Player performance updated successfully");
            } else {
                toast.error(result.message || "Failed to update player performance");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to update player performance");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <AdminLayout>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {loading ? (
                        <div className="space-y-3">
                            <div className="h-8 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Player Performance</h1>
                                <p className="text-gray-600 lg:mt-0 mt-2">Manage achievements and skills for {playerData.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Player ID"
                                    value={playerData.playerId}
                                    readOnly
                                    className="w-24 sm:w-32"
                                />
                                <Select
                                    value={playerData.category}
                                    onValueChange={(value) => handleUpdatePlayerInfo("category", value)}
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
                        </>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        {loading ? (
                            <div className="space-y-3">
                                <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <CardTitle>Player Information</CardTitle>
                                <CardDescription>Set basic player information</CardDescription>
                            </>
                        )}
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label>Player Name</Label>
                                    <Input
                                        value={playerData.name}
                                        onChange={(e) => handleUpdatePlayerInfo("name", e.target.value)}
                                        readOnly={hasPerformanceData()}
                                        className={hasPerformanceData() ? "bg-gray-100 cursor-not-allowed" : ""}
                                    />
                                    {hasPerformanceData() && (
                                        <p className="text-xs text-gray-500">Player name cannot be edited once performance data exists</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        {loading ? (
                            <div className="space-y-3">
                                <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ) : (
                            <>
                                <CardTitle>Player Statistics</CardTitle>
                                <CardDescription>Update player&apos;s key performance metrics</CardDescription>
                            </>
                        )}
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="h-4 w-[60px] bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs sm:text-sm">Rating</Label>
                                    <Input
                                        type="number"
                                        value={playerData.rating || ''}
                                        onChange={(e) => handleUpdateStats("rating", e.target.value)}
                                        min="0"
                                        max="100"
                                        step="0.1"
                                        className="text-sm"
                                        placeholder="Rating"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs sm:text-sm">Attendance</Label>
                                    <Input
                                        type="number"
                                        value={playerData.attendance || ''}
                                        onChange={(e) => handleUpdateStats("attendance", e.target.value)}
                                        min="0"
                                        max="100"
                                        className="text-sm"
                                        placeholder="Attendance %"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs sm:text-sm">Goals</Label>
                                    <Input
                                        type="number"
                                        value={playerData.goals || ''}
                                        onChange={(e) => handleUpdateStats("goals", e.target.value)}
                                        min="0"
                                        className="text-sm"
                                        placeholder="Goals"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs sm:text-sm">Assists</Label>
                                    <Input
                                        type="number"
                                        value={playerData.assists || ''}
                                        onChange={(e) => handleUpdateStats("assists", e.target.value)}
                                        min="0"
                                        className="text-sm"
                                        placeholder="Assists"
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <Card>
                        <CardHeader>
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ) : (
                                <>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-4 sm:w-5 h-4 sm:h-5" />
                                        <span className="text-sm sm:text-base">Skills Development</span>
                                    </CardTitle>
                                    <CardDescription>Manage player&apos;s skill progression</CardDescription>
                                </>
                            )}
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                            <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="flex justify-between">
                                                <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 w-[60px] bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4 sm:space-y-6">
                                    {skillsData.map((skill, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center gap-4">
                                                {editingSkill?.index === index ? (
                                                    <Input
                                                        value={editingSkill.skill}
                                                        onChange={(e) =>
                                                            setEditingSkill({
                                                                ...editingSkill,
                                                                skill: e.target.value,
                                                            })
                                                        }
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
                                                            onChange={(e) =>
                                                                setEditingSkill({
                                                                    ...editingSkill,
                                                                    current: parseInt(e.target.value) || 0,
                                                                })
                                                            }
                                                            className="text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs">Target</Label>
                                                        <Input
                                                            type="number"
                                                            value={editingSkill.target}
                                                            onChange={(e) =>
                                                                setEditingSkill({
                                                                    ...editingSkill,
                                                                    target: parseInt(e.target.value) || 0,
                                                                })
                                                            }
                                                            className="text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs">Improvement</Label>
                                                        <Input
                                                            value={editingSkill.improvement}
                                                            onChange={(e) =>
                                                                setEditingSkill({
                                                                    ...editingSkill,
                                                                    improvement: e.target.value,
                                                                })
                                                            }
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
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ) : (
                                <>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="w-4 sm:w-5 h-4 sm:h-5" />
                                        <span className="text-sm sm:text-base">Achievements</span>
                                    </CardTitle>
                                    <CardDescription>Add and manage player&apos;s achievements</CardDescription>
                                </>
                            )}
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="p-3 border rounded-lg space-y-2">
                                        <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                                        <div className="border rounded-lg">
                                            <Table className="min-w-[600px] sm:min-w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="h-12 bg-gray-200 animate-pulse"></TableHead>
                                                        <TableHead className="h-12 bg-gray-200 animate-pulse hidden sm:table-cell"></TableHead>
                                                        <TableHead className="h-12 bg-gray-200 animate-pulse"></TableHead>
                                                        <TableHead className="h-12 bg-gray-200 animate-pulse"></TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {Array.from({ length: 3 }).map((_, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="py-2 sm:py-3">
                                                                <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                                                                <div className="h-3 w-[200px] bg-gray-200 rounded animate-pulse mt-1"></div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell py-2 sm:py-3">
                                                                <div className="h-6 w-[60px] bg-gray-200 rounded animate-pulse"></div>
                                                            </TableCell>
                                                            <TableCell className="py-2 sm:py-3">
                                                                <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                                                            </TableCell>
                                                            <TableCell className="py-2 sm:py-3">
                                                                <div className="h-6 w-6 sm:w-8 bg-gray-200 rounded animate-pulse"></div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3">
                                        <h4 className="font-medium text-sm sm:text-base">Add New Achievement</h4>
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Title"
                                                value={newAchievement.title}
                                                onChange={(e) =>
                                                    setNewAchievement({
                                                        ...newAchievement,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="text-sm"
                                            />
                                            <Input
                                                placeholder="Description"
                                                value={newAchievement.description}
                                                onChange={(e) =>
                                                    setNewAchievement({
                                                        ...newAchievement,
                                                        description: e.target.value,
                                                    })
                                                }
                                                className="text-sm"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Select
                                                    value={newAchievement.type}
                                                    onValueChange={(value) =>
                                                        setNewAchievement({
                                                            ...newAchievement,
                                                            type: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger className="text-xs sm:text-sm">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="award" className="text-xs sm:text-sm">
                                                            Award
                                                        </SelectItem>
                                                        <SelectItem value="attendance" className="text-xs sm:text-sm">
                                                            Attendance
                                                        </SelectItem>
                                                        <SelectItem value="performance" className="text-xs sm:text-sm">
                                                            Performance
                                                        </SelectItem>
                                                        <SelectItem value="leadership" className="text-xs sm:text-sm">
                                                            Leadership
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    type="date"
                                                    value={newAchievement.date}
                                                    onChange={(e) =>
                                                        setNewAchievement({
                                                            ...newAchievement,
                                                            date: e.target.value,
                                                        })
                                                    }
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
                                                            <TableHead className="whitespace-nowrap text-xs sm:text-sm hidden sm:table-cell">
                                                                Type
                                                            </TableHead>
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
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    {loading ? (
                        <div className="h-10 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                        <Button
                            className="bg-[#0F0F0F] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base cursor-pointer"
                            onClick={handleSaveAllChanges}
                        >
                            Save All Changes
                        </Button>
                    )}
                </div>
            </div>

            <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        .animate-pulse {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
          background-size: 800px 104px;
          position: relative;
        }
      `}</style>
        </AdminLayout>
    );
}