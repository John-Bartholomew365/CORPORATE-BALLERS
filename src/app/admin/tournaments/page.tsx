// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Trophy, Calendar, MapPin, Plus, Edit } from "lucide-react"
// import { AdminLayout } from "@/components/dashboard/AdminLayout"

// export default function TournamentsPage() {
//   const tournaments = [
//     {
//       id: 1,
//       name: "Kwara State Youth Championship",
//       date: "2024-02-15",
//       location: "Kwara State Stadium",
//       category: "Senior",
//       status: "Upcoming",
//       teams: 16,
//       prize: "₦500,000",
//     },
//     {
//       id: 2,
//       name: "Inter-Academy Cup",
//       date: "2024-01-28",
//       location: "CBFA Stadium",
//       category: "Junior",
//       status: "Ongoing",
//       teams: 8,
//       prize: "₦200,000",
//     },
//     {
//       id: 3,
//       name: "Northern Nigeria Championship",
//       date: "2024-03-10",
//       location: "Abuja Sports Complex",
//       category: "Senior",
//       status: "Registration",
//       teams: 24,
//       prize: "₦1,000,000",
//     },
//   ]

//   const matches = [
//     {
//       date: "2024-01-20",
//       time: "4:00 PM",
//       opponent: "Lions FC",
//       venue: "CBFA Stadium",
//       category: "Senior",
//       status: "Won 3-1",
//     },
//     {
//       date: "2024-01-25",
//       time: "2:00 PM",
//       opponent: "Eagles Academy",
//       venue: "Away",
//       category: "Junior",
//       status: "Upcoming",
//     },
//     {
//       date: "2024-01-30",
//       time: "5:00 PM",
//       opponent: "Thunder FC",
//       venue: "CBFA Stadium",
//       category: "Senior",
//       status: "Upcoming",
//     },
//   ]

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Tournament Management</h1>
//             <p className="text-gray-600">Manage tournaments and matches</p>
//           </div>
//           <Button className="cursor-pointer bg-[#0F0F0F] text-white">
//             <Plus className="w-4 h-4 mr-2" />
//             Register Tournament
//           </Button>
//         </div>

//         {/* Tournament Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">8</div>
//               <p className="text-sm text-muted-foreground">Active Tournaments</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">15</div>
//               <p className="text-sm text-muted-foreground">Matches Won</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">3</div>
//               <p className="text-sm text-muted-foreground">Trophies Won</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">₦2.5M</div>
//               <p className="text-sm text-muted-foreground">Prize Money</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Tournaments List */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Tournaments</CardTitle>
//             <CardDescription>All registered tournaments</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Tournament</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Teams</TableHead>
//                   <TableHead>Prize</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {tournaments.map((tournament) => (
//                   <TableRow key={tournament.id}>
//                     <TableCell className="font-medium">{tournament.name}</TableCell>
//                     <TableCell>{tournament.date}</TableCell>
//                     <TableCell>{tournament.location}</TableCell>
//                     <TableCell>
//                       <Badge variant={tournament.category === "Senior" ? "default" : "secondary"}>
//                         {tournament.category}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{tournament.teams} teams</TableCell>
//                     <TableCell>{tournament.prize}</TableCell>
//                     <TableCell>
//                       <Badge className="bg-[#F4F4F5] text-gray-800"
//                         variant={
//                           tournament.status === "Upcoming"
//                             ? "default"
//                             : tournament.status === "Ongoing"
//                               ? "destructive"
//                               : "secondary"
//                         }
//                       >
//                         {tournament.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Button size="sm" variant="outline">
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Upcoming Matches */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Upcoming Matches</CardTitle>
//             <CardDescription>Scheduled matches and results</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {matches.map((match, index) => (
//                 <div key={index} className="p-4 border rounded-lg">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                         <Trophy className="w-6 h-6 text-yellow-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold">CBFA vs {match.opponent}</h3>
//                         <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             {match.date} at {match.time}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <MapPin className="w-4 h-4" />
//                             {match.venue}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <Badge variant="secondary" className="mb-2 bg-[#F4F4F5]">
//                         {match.category}
//                       </Badge>
//                       <p className="text-sm font-medium">{match.status}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </AdminLayout>
//   )
// }




"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Search, MoreVertical } from "lucide-react"
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type Tournament = {
    id: string
    name: string
    location: string
    startDate: string
    endDate: string
    category: "Junior" | "Senior" | "Both"
    status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled"
    description: string
    teamsCount: number
    registrationDeadline: string
    teamsRegistered: number
}

export default function TournamentsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const tournamentsPerPage = 8

    // Sample tournament data
    const [allTournaments, setAllTournaments] = useState<Tournament[]>([
        {
            id: "TOUR2024",
            name: "Summer Youth Cup 2024",
            location: "City Stadium",
            startDate: "2024-07-15",
            endDate: "2024-07-22",
            category: "Junior",
            status: "Upcoming",
            description: "Annual youth football tournament for players under 18",
            teamsCount: 16,
            registrationDeadline: "2024-06-30",
            teamsRegistered: 8
        },
        {
            id: "TOUR2025",
            name: "Winter Championship 2025",
            location: "National Arena",
            startDate: "2025-01-10",
            endDate: "2025-01-17",
            category: "Senior",
            status: "Upcoming",
            description: "Professional winter football championship",
            teamsCount: 32,
            registrationDeadline: "2024-12-15",
            teamsRegistered: 12
        },
        {
            id: "TOUR2023",
            name: "Spring Tournament 2023",
            location: "Regional Complex",
            startDate: "2023-04-05",
            endDate: "2023-04-12",
            category: "Both",
            status: "Completed",
            description: "Mixed junior and senior tournament",
            teamsCount: 24,
            registrationDeadline: "2023-03-20",
            teamsRegistered: 24
        }
    ])

    // Filter tournaments based on search query
    const filteredTournaments = allTournaments.filter(tournament =>
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination logic
    const indexOfLastTournament = currentPage * tournamentsPerPage
    const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage
    const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament)
    const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage)

    // Tournament stats
    const tournamentStats = {
        total: allTournaments.length,
        upcoming: allTournaments.filter(t => t.status === "Upcoming").length,
        ongoing: allTournaments.filter(t => t.status === "Ongoing").length,
        completed: allTournaments.filter(t => t.status === "Completed").length,
        junior: allTournaments.filter(t => t.category === "Junior").length,
        senior: allTournaments.filter(t => t.category === "Senior").length,
        both: allTournaments.filter(t => t.category === "Both").length
    }

    // Status change handler
    const handleStatusChange = (id: string, newStatus: "Upcoming" | "Ongoing" | "Completed" | "Cancelled") => {
        setAllTournaments(prevTournaments =>
            prevTournaments.map(tournament =>
                tournament.id === id ? { ...tournament, status: newStatus } : tournament
            )
        )
    }

    // Add new tournament
    const handleNewTournament = (newTournament: Tournament) => {
        setAllTournaments([newTournament, ...allTournaments])
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tournaments</h1>
                        <p className="text-gray-600">Manage football tournaments and competitions</p>
                    </div>
                    <TournamentRegistrationModal onNewTournament={handleNewTournament} />
                </div>

                {/* Tournament Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold">{tournamentStats.total}</div>
                            <p className="text-sm text-muted-foreground">Total Tournaments</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-blue-600">{tournamentStats.upcoming}</div>
                            <p className="text-sm text-muted-foreground">Upcoming</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-green-600">{tournamentStats.ongoing}</div>
                            <p className="text-sm text-muted-foreground">Ongoing</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-2xl font-bold text-gray-600">{tournamentStats.completed}</div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tournaments Table */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>All Tournaments</CardTitle>
                                <CardDescription className="text-[#B0B3B8] mt-1">View and manage all tournaments</CardDescription>
                            </div>
                            <div className="relative w-64 outline-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search tournaments..."
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
                                        <TableHead>Name</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Teams</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentTournaments.length > 0 ? (
                                        currentTournaments.map((tournament) => (
                                            <TableRow key={tournament.id}>
                                                <TableCell className="font-medium">{tournament.name}</TableCell>
                                                <TableCell>{tournament.id}</TableCell>
                                                <TableCell>{tournament.location}</TableCell>
                                                <TableCell>
                                                    {format(new Date(tournament.startDate), "MMM d")} - {format(new Date(tournament.endDate), "MMM d, yyyy")}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        tournament.category === "Junior" ? "secondary" :
                                                            tournament.category === "Senior" ? "default" : "outline"
                                                    }>
                                                        {tournament.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {tournament.teamsRegistered}/{tournament.teamsCount}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            tournament.status === "Upcoming" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                                                                tournament.status === "Ongoing" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                                                    tournament.status === "Completed" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" :
                                                                        "bg-red-100 text-red-800 hover:bg-red-200"
                                                        }
                                                    >
                                                        {tournament.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                className="text-blue-600 focus:bg-blue-50"
                                                                onClick={() => handleStatusChange(tournament.id, "Upcoming")}
                                                            >
                                                                Set Upcoming
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-green-600 focus:bg-green-50"
                                                                onClick={() => handleStatusChange(tournament.id, "Ongoing")}
                                                            >
                                                                Set Ongoing
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-gray-600 focus:bg-gray-50"
                                                                onClick={() => handleStatusChange(tournament.id, "Completed")}
                                                            >
                                                                Mark Completed
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:bg-red-50"
                                                                onClick={() => handleStatusChange(tournament.id, "Cancelled")}
                                                            >
                                                                Cancel
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8">
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <Search className="w-8 h-8 text-gray-400" />
                                                    <p className="text-gray-500">No tournaments found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {filteredTournaments.length > tournamentsPerPage && (
                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Showing {indexOfFirstTournament + 1}-{Math.min(indexOfLastTournament, filteredTournaments.length)} of {filteredTournaments.length} tournaments
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

function TournamentRegistrationModal({ onNewTournament }: { onNewTournament: (tournament: Tournament) => void }) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        category: "",
        description: "",
        registrationDeadline: "",
        teamsCount: 16
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Generate a new tournament
        const newTournament: Tournament = {
            id: `TOUR${Math.floor(Math.random() * 9000 + 1000)}`,
            name: formData.name,
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.endDate,
            category: formData.category as "Junior" | "Senior" | "Both",
            status: "Upcoming",
            description: formData.description,
            teamsCount: formData.teamsCount,
            registrationDeadline: formData.registrationDeadline,
            teamsRegistered: 0
        }

        // Call the callback
        onNewTournament(newTournament)

        // Reset form and close modal
        setFormData({
            name: "",
            location: "",
            startDate: "",
            endDate: "",
            category: "",
            description: "",
            registrationDeadline: "",
            teamsCount: 16
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#0F0F0F] cursor-pointer text-white hover:bg-[#1A1A1A]">
                    Create Tournament
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] bg-[#FAFAFA]">
                <DialogHeader>
                    <DialogTitle className="text-xl">New Tournament Registration</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Tournament Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Summer Youth Cup 2024"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. City Stadium"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !formData.startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.startDate ? format(new Date(formData.startDate), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-fit bg-[#FAFAFA] ml-76">
                                    <Calendar
                                        mode="single"
                                        selected={formData.startDate ? new Date(formData.startDate) : undefined}
                                        onSelect={(date) => setFormData({ ...formData, startDate: date?.toISOString() || "" })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !formData.endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.endDate ? format(new Date(formData.endDate), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[#FAFAFA]">
                                    <Calendar
                                        mode="single"
                                        selected={formData.endDate ? new Date(formData.endDate) : undefined}
                                        onSelect={(date) => setFormData({ ...formData, endDate: date?.toISOString() || "" })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Registration Deadline</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !formData.registrationDeadline && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.registrationDeadline ? format(new Date(formData.registrationDeadline), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[#FAFAFA] mr-82">
                                    <Calendar
                                        mode="single"
                                        selected={formData.registrationDeadline ? new Date(formData.registrationDeadline) : undefined}
                                        onSelect={(date) => setFormData({ ...formData, registrationDeadline: date?.toISOString() || "" })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Junior">Junior</SelectItem>
                                    <SelectItem value="Senior">Senior</SelectItem>
                                    <SelectItem value="Both">Both</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="teamsCount">Max Teams</Label>
                            <Input
                                id="teamsCount"
                                type="number"
                                min="4"
                                max="32"
                                value={formData.teamsCount}
                                onChange={(e) => setFormData({ ...formData, teamsCount: parseInt(e.target.value) || 16 })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Provide details about the tournament format, rules, prizes, etc."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#0F0F0F] cursor-pointer text-white hover:bg-[#1A1A1A]">
                            Create Tournament
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}