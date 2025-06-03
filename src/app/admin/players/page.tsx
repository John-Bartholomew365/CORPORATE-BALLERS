"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import Link from "next/link"

export default function PlayersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")

    const players = [
        {
            id: "CBFA001",
            name: "John Adebayo",
            age: 16,
            category: "Senior",
            position: "Midfielder",
            joinDate: "2024-01-15",
            attendance: 92,
            phone: "+234 8123456789",
            status: "Active",
        },
        {
            id: "CBFA002",
            name: "Sarah Okafor",
            age: 14,
            category: "Junior",
            position: "Forward",
            joinDate: "2024-02-01",
            attendance: 88,
            phone: "+234 8123456790",
            status: "Active",
        },
        {
            id: "CBFA003",
            name: "Michael Ibrahim",
            age: 17,
            category: "Senior",
            position: "Defender",
            joinDate: "2023-11-20",
            attendance: 95,
            phone: "+234 8123456791",
            status: "Active",
        },
        {
            id: "CBFA004",
            name: "Fatima Yusuf",
            age: 13,
            category: "Junior",
            position: "Goalkeeper",
            joinDate: "2024-01-30",
            attendance: 90,
            phone: "+234 8123456792",
            status: "Active",
        },
        {
            id: "CBFA005",
            name: "David Okonkwo",
            age: 15,
            category: "Junior",
            position: "Midfielder",
            joinDate: "2024-03-01",
            attendance: 85,
            phone: "+234 8123456793",
            status: "Inactive",
        },
    ]

    const filteredPlayers = players.filter((player) => {
        const matchesSearch =
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || player.category.toLowerCase() === categoryFilter
        return matchesSearch && matchesCategory
    })

    const stats = {
        total: players.length,
        senior: players.filter((p) => p.category === "Senior").length,
        junior: players.filter((p) => p.category === "Junior").length,
        active: players.filter((p) => p.status === "Active").length,
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Player Management</h1>
                        <p className="text-gray-600">Manage all academy players and their information</p>
                    </div>
                    <Link href={"/admin/registration"}>
                        <Button className="bg-[#0F0F0F] text-white cursor-pointer">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Player
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-sm text-muted-foreground">Total Players</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">{stats.senior}</div>
                            <p className="text-sm text-muted-foreground">Senior Category</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">{stats.junior}</div>
                            <p className="text-sm text-muted-foreground">Junior Category</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">{stats.active}</div>
                            <p className="text-sm text-muted-foreground">Active Players</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Players List</CardTitle>
                        <CardDescription>View and manage all registered players</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search players by name or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 outline-none"
                                />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="senior" className="">Senior</SelectItem>
                                    <SelectItem value="junior">Junior</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button> */}
                        </div>

                        {/* Players Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Attendance</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPlayers.map((player) => (
                                        <TableRow key={player.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="border">
                                                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                                        <AvatarFallback>
                                                            {player.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{player.name}</p>
                                                        <p className="text-sm text-gray-600">Age: {player.age}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono">{player.id}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={player.category === "Senior" ? "default" : "secondary"}
                                                    className={
                                                        player.category === "Senior"
                                                            ? "bg-[#0F0F0F] text-white"
                                                            : "bg-[#FFFFFF] text-[#0F0F0F] border border-[#E5E5E5]"
                                                    }
                                                >
                                                    {player.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{player.position}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${player.attendance}%` }} />
                                                    </div>
                                                    <span className="text-sm">{player.attendance}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={player.status === "Active" ? "default" : "secondary"}>{player.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            Edit Player
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Remove Player
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
