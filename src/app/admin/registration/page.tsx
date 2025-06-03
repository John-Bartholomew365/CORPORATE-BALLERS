"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserPlus, ChevronLeft, ChevronRight, Search, MoreVertical } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Registration = {
    id: string
    name: string
    age: number
    category: string
    date: string
    status: "Approved" | "Pending" | "Rejected"
    position: string
    parentName: string
}

// List of realistic player names
const PLAYER_NAMES = [
    "James Rodriguez",
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Neymar Jr",
    "Kylian Mbappé",
    "Mohamed Salah",
    "Kevin De Bruyne",
    "Virgil van Dijk",
    "Robert Lewandowski",
    "Harry Kane",
    "Erling Haaland",
    "Karim Benzema",
    "Luka Modric",
    "Toni Kroos",
    "Sergio Ramos",
    "Manuel Neuer",
    "Joshua Kimmich",
    "Sadio Mané",
    "Raheem Sterling",
    "Bruno Fernandes",
    "Paul Pogba",
    "Antoine Griezmann",
    "Eden Hazard",
    "Thibaut Courtois",
    "Jan Oblak",
    "Marc-André ter Stegen",
    "Alisson Becker",
    "Ederson Moraes",
    "Riyad Mahrez",
    "Bernardo Silva",
    "João Cancelo",
    "Ruben Dias",
    "Aymeric Laporte",
    "Phil Foden",
    "Jack Grealish",
    "Bukayo Saka",
    "Gabriel Martinelli",
    "Martin Ødegaard",
    "Thomas Partey",
    "Declan Rice",
    "Jude Bellingham",
    "Jamal Musiala",
    "Pedri González",
    "Gavi",
    "Ansu Fati"
]

export default function RegistrationPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const registrationsPerPage = 10

    // State for registrations with realistic names
    const [allRegistrations, setAllRegistrations] = useState<Registration[]>(
        Array.from({ length: 45 }, (_, i) => ({
            id: `CBFA${200 + i}`,
            name: PLAYER_NAMES[i % PLAYER_NAMES.length],
            age: Math.floor(Math.random() * 10) + 12,
            category: Math.random() > 0.5 ? "Junior" : "Senior",
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: ["Approved", "Pending", "Rejected"][Math.floor(Math.random() * 3)] as "Approved" | "Pending" | "Rejected",
            position: ["Goalkeeper", "Defender", "Midfielder", "Winger", "Forward"][Math.floor(Math.random() * 5)],
            parentName: `Parent ${i + 1}`
        }))
    )

    // Filter registrations based on search query
    const filteredRegistrations = allRegistrations.filter(reg =>
        reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.parentName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination logic
    const indexOfLastRegistration = currentPage * registrationsPerPage
    const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage
    const currentRegistrations = filteredRegistrations.slice(indexOfFirstRegistration, indexOfLastRegistration)
    const totalPages = Math.ceil(filteredRegistrations.length / registrationsPerPage)

    // Registration stats
    const registrationStats = {
        total: allRegistrations.length,
        approved: allRegistrations.filter(r => r.status === "Approved").length,
        pending: allRegistrations.filter(r => r.status === "Pending").length,
        rejected: allRegistrations.filter(r => r.status === "Rejected").length,
        thisMonth: allRegistrations.filter(r => {
            const regDate = new Date(r.date)
            const now = new Date()
            return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear()
        }).length
    }

    // Status change handler
    const handleStatusChange = (id: string, newStatus: "Approved" | "Pending" | "Rejected") => {
        setAllRegistrations(prevRegistrations =>
            prevRegistrations.map(reg =>
                reg.id === id ? { ...reg, status: newStatus } : reg
            )
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Player Registrations</h1>
                        <p className="text-gray-600">Manage player registrations for the academy</p>
                    </div>
                    <RegistrationModal
                        onNewRegistration={(newReg) => {
                            setAllRegistrations([newReg, ...allRegistrations])
                        }}
                    />
                </div>

                {/* Registration Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">{registrationStats.total}</div>
                            <p className="text-sm text-muted-foreground">Total Players</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-green-600">{registrationStats.approved}</div>
                            <p className="text-sm text-muted-foreground">Approved</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-yellow-600">{registrationStats.pending}</div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-red-600">{registrationStats.rejected}</div>
                            <p className="text-sm text-muted-foreground">Rejected</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Registrations Table */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>All Registrations</CardTitle>
                                <CardDescription className="text-[#B0B3B8] mt-1">View and manage player registrations</CardDescription>
                            </div>
                            <div className="relative w-64 outline-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search registrations..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Age</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Parent</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentRegistrations.length > 0 ? (
                                        currentRegistrations.map((registration) => (
                                            <TableRow key={registration.id}>
                                                <TableCell className="font-medium">{registration.name}</TableCell>
                                                <TableCell>{registration.id}</TableCell>
                                                <TableCell>{registration.age}</TableCell>
                                                <TableCell>
                                                    <Badge variant={registration.category === "Senior" ? "default" : "secondary"}>
                                                        {registration.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{registration.position}</TableCell>
                                                <TableCell>{registration.parentName}</TableCell>
                                                <TableCell>{new Date(registration.date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            registration.status === "Approved" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                                                registration.status === "Pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                                                                    "bg-red-100 text-red-800 hover:bg-red-200"
                                                        }
                                                    >
                                                        {registration.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                className="text-green-600 focus:bg-green-50"
                                                                onClick={() => handleStatusChange(registration.id, "Approved")}
                                                            >
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-yellow-600 focus:bg-yellow-50"
                                                                onClick={() => handleStatusChange(registration.id, "Pending")}
                                                            >
                                                                Set Pending
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:bg-red-50"
                                                                onClick={() => handleStatusChange(registration.id, "Rejected")}
                                                            >
                                                                Reject
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={9} className="text-center py-8">
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <Search className="w-8 h-8 text-gray-400" />
                                                    <p className="text-gray-500">No registrations found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {filteredRegistrations.length > registrationsPerPage && (
                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Showing {indexOfFirstRegistration + 1}-{Math.min(indexOfLastRegistration, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
                                </div>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <span className="text-sm">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}

function RegistrationModal({ onNewRegistration }: { onNewRegistration: (reg: Registration) => void }) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        category: "",
        position: "",
        parentName: "",
        parentPhone: "",
        address: "",
        medicalInfo: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Generate a new registration
        const newRegistration: Registration = {
            id: `CBFA${Math.floor(Math.random() * 900 + 100)}`,
            name: `${formData.firstName} ${formData.lastName}`,
            age: parseInt(formData.age),
            category: formData.category === "junior" ? "Junior" : "Senior",
            date: new Date().toISOString().split('T')[0],
            status: "Pending",
            position: formData.position,
            parentName: formData.parentName
        }

        // Call the callback
        onNewRegistration(newRegistration)

        // Reset form and close modal
        setFormData({
            firstName: "",
            lastName: "",
            age: "",
            category: "",
            position: "",
            parentName: "",
            parentPhone: "",
            address: "",
            medicalInfo: "",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="bg-[#0F0F0F] text-white cursor-pointer">
                <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register a Player
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-[#FAFAFA]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        New Player Registration
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                min="12"
                                max="25"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="junior">Junior (12-17 years)</SelectItem>
                                    <SelectItem value="senior">Senior (18+ years)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position">Preferred Position</Label>
                            <Select
                                value={formData.position}
                                onValueChange={(value) => setFormData({ ...formData, position: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                                    <SelectItem value="Defender">Defender</SelectItem>
                                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                                    <SelectItem value="Winger">Winger</SelectItem>
                                    <SelectItem value="Forward">Forward</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="parentName">Parent/Guardian Name</Label>
                            <Input
                                id="parentName"
                                value={formData.parentName}
                                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                            <Input
                                id="parentPhone"
                                type="tel"
                                value={formData.parentPhone}
                                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="medicalInfo" className="outline-none">Medical Information (Optional)</Label>
                        <Textarea
                            id="medicalInfo"
                            placeholder="Any medical conditions, allergies, or special requirements..."
                            value={formData.medicalInfo}
                            onChange={(e) => setFormData({ ...formData, medicalInfo: e.target.value })}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4 bg-[#0F0F0F] cursor-pointer text-white hover:bg-[#1A1A1A]">
                        Register Player
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}