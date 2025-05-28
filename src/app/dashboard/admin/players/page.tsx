"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, UserPlus, MoreHorizontal, Eye, Edit, Trash2, Download, Mail, Phone } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

export default function PlayersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const players = [
        {
            id: 1,
            name: "Ahmed Olatunji",
            email: "ahmed.olatunji@email.com",
            phone: "+234 8123456789",
            category: "Senior",
            position: "Forward",
            jerseyNumber: 9,
            joinDate: "2024-01-15",
            status: "Active",
            avatar: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Fatima Ibrahim",
            email: "fatima.ibrahim@email.com",
            phone: "+234 8234567890",
            category: "Junior",
            position: "Midfielder",
            jerseyNumber: 7,
            joinDate: "2024-02-20",
            status: "Active",
            avatar: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Kemi Adebayo",
            email: "kemi.adebayo@email.com",
            phone: "+234 8345678901",
            category: "Senior",
            position: "Defender",
            jerseyNumber: 4,
            joinDate: "2024-01-10",
            status: "Inactive",
            avatar: "/placeholder.svg",
        },
        {
            id: 4,
            name: "Tunde Ogundimu",
            email: "tunde.ogundimu@email.com",
            phone: "+234 8456789012",
            category: "Junior",
            position: "Goalkeeper",
            jerseyNumber: 1,
            joinDate: "2024-03-05",
            status: "Active",
            avatar: "/placeholder.svg",
        },
        {
            id: 5,
            name: "Aisha Mohammed",
            email: "aisha.mohammed@email.com",
            phone: "+234 8567890123",
            category: "Senior",
            position: "Midfielder",
            jerseyNumber: 8,
            joinDate: "2024-02-14",
            status: "Active",
            avatar: "/placeholder.svg",
        },
    ]

    const filteredPlayers = players.filter((player) => {
        const matchesSearch =
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || player.category.toLowerCase() === selectedCategory
        return matchesSearch && matchesCategory
    })

    const stats = [
        { label: "Total Players", value: players.length, color: "bg-blue-500" },
        { label: "Active Players", value: players.filter((p) => p.status === "Active").length, color: "bg-green-500" },
        { label: "Senior Category", value: players.filter((p) => p.category === "Senior").length, color: "bg-purple-500" },
        { label: "Junior Category", value: players.filter((p) => p.category === "Junior").length, color: "bg-orange-500" },
    ]

    return (
        <DashboardLayout userType="admin">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Players Management</h1>
                        <p className="text-gray-600 mt-1">Manage all academy players and their information</p>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Player
                        </Button>
                    </div>
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
                                    </div>
                                    <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Players</CardTitle>
                        <CardDescription>View and manage all registered players</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search players by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={selectedCategory === "all" ? "default" : "outline"}
                                    onClick={() => setSelectedCategory("all")}
                                >
                                    All
                                </Button>
                                <Button
                                    variant={selectedCategory === "senior" ? "default" : "outline"}
                                    onClick={() => setSelectedCategory("senior")}
                                >
                                    Senior
                                </Button>
                                <Button
                                    variant={selectedCategory === "junior" ? "default" : "outline"}
                                    onClick={() => setSelectedCategory("junior")}
                                >
                                    Junior
                                </Button>
                            </div>
                        </div>

                        {/* Players Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Jersey #</TableHead>
                                        <TableHead>Join Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPlayers.map((player) => (
                                        <TableRow key={player.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={player.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {player.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{player.name}</div>
                                                        <div className="text-sm text-gray-500">{player.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm">
                                                        <Mail className="mr-1 h-3 w-3" />
                                                        {player.email}
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <Phone className="mr-1 h-3 w-3" />
                                                        {player.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={player.category === "Senior" ? "default" : "secondary"}>
                                                    {player.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{player.position}</TableCell>
                                            <TableCell>#{player.jerseyNumber}</TableCell>
                                            <TableCell>{player.joinDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={player.status === "Active" ? "default" : "secondary"}>{player.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Player
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Player
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {filteredPlayers.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No players found matching your search criteria.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
