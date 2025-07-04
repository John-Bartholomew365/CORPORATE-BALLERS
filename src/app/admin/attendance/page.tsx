// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Calendar, Search, CheckCircle, XCircle, PlusCircle } from "lucide-react"
// import { AdminLayout } from "@/components/dashboard/AdminLayout"
// import { useToast } from "@/components/ui/use-toast"
// import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns"

// type Player = {
//   id: string
//   name: string
//   category: "Senior" | "Junior"
//   present: boolean
//   time: string
// }

// type Session = {
//   id: string
//   name: string
//   day: string
//   time: string
// }

// type WeeklyAttendance = {
//   day: string
//   date: string
//   session: string
//   attendance: string
// }

// export default function AttendancePage() {
//   const { toast } = useToast()
//   const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
//   const [selectedSession, setSelectedSession] = useState<string>("tuesday-4pm")
//   const [searchQuery, setSearchQuery] = useState<string>("")
//   const [isMarkingAttendance, setIsMarkingAttendance] = useState<boolean>(false)
//   const [players, setPlayers] = useState<Player[]>([
//     {
//       id: "CBFA001",
//       name: "John Adebayo",
//       category: "Senior",
//       present: true,
//       time: "4:00 PM",
//     },
//     {
//       id: "CBFA002",
//       name: "Sarah Okafor",
//       category: "Junior",
//       present: true,
//       time: "4:05 PM",
//     },
//     {
//       id: "CBFA003",
//       name: "Michael Ibrahim",
//       category: "Senior",
//       present: false,
//       time: "-",
//     },
//     {
//       id: "CBFA004",
//       name: "Fatima Yusuf",
//       category: "Junior",
//       present: true,
//       time: "4:02 PM",
//     },
//     {
//       id: "CBFA005",
//       name: "David Okonkwo",
//       category: "Junior",
//       present: false,
//       time: "-",
//     },
//   ])

//   const sessions: Session[] = [
//     { id: "tuesday-4pm", name: "Tuesday Session", day: "Tuesday", time: "4:00 PM" },
//     { id: "wednesday-4pm", name: "Wednesday Session", day: "Wednesday", time: "4:00 PM" },
//     { id: "thursday-4pm", name: "Thursday Session", day: "Thursday", time: "4:00 PM" },
//     { id: "saturday-430pm", name: "Saturday Session", day: "Saturday", time: "4:30 PM" },
//     { id: "sunday-430pm", name: "Sunday Session", day: "Sunday", time: "4:30 PM" },
//   ]

//   // Generate weekly overview based on selected date
//   const generateWeeklyOverview = (date: string): WeeklyAttendance[] => {
//     const parsedDate = parseISO(date)
//     const weekStart = startOfWeek(parsedDate)
    
//     return Array.from({ length: 7 }).map((_, index) => {
//       const dayDate = addDays(weekStart, index)
//       const dayName = format(dayDate, 'EEEE')
//       const dateString = format(dayDate, 'yyyy-MM-dd')
      
//       // Determine session based on day
//       let session = "Rest Day"
//       let attendance = "-"
      
//       if (dayName === 'Tuesday' || dayName === 'Wednesday' || dayName === 'Thursday') {
//         session = "4:00 PM"
//         attendance = dayName === 'Tuesday' ? "45/50" : dayName === 'Wednesday' ? "42/50" : "48/50"
//       } else if (dayName === 'Saturday' || dayName === 'Sunday') {
//         session = "4:30 PM"
//         attendance = dayName === 'Saturday' ? "52/55" : "49/55"
//       }
      
//       return {
//         day: dayName,
//         date: dateString,
//         session,
//         attendance
//       }
//     })
//   }

//   const [weeklyOverview, setWeeklyOverview] = useState<WeeklyAttendance[]>(generateWeeklyOverview(selectedDate))

//   const handleDateChange = (date: string) => {
//     setSelectedDate(date)
//     setWeeklyOverview(generateWeeklyOverview(date))
//   }

//   const attendanceStats = {
//     present: players.filter((p) => p.present).length,
//     absent: players.filter((p) => !p.present).length,
//     total: players.length,
//     percentage: Math.round((players.filter((p) => p.present).length / players.length) * 100),
//   }

//   const filteredPlayers = players.filter(player =>
//     player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     player.id.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const handleToggleAttendance = (playerId: string) => {
//     setPlayers(players.map(player => {
//       if (player.id === playerId) {
//         const isPresent = !player.present
//         return {
//           ...player,
//           present: isPresent,
//           time: isPresent ? format(new Date(), "h:mm a") : "-"
//         }
//       }
//       return player
//     }))
//   }

//   const handleMarkAllPresent = () => {
//     setIsMarkingAttendance(true)
//     setTimeout(() => {
//       setPlayers(players.map(player => ({
//         ...player,
//         present: true,
//         time: format(new Date(), "h:mm a")
//       })))
//       setIsMarkingAttendance(false)
//       toast({
//         title: "Attendance marked",
//         description: "All players have been marked as present",
//       })
//     }, 1000)
//   }

//   const handleGenerateMonthlyReport = () => {
//     toast({
//       title: "Monthly report generated",
//       description: "The monthly attendance report is being prepared",
//     })
//     // In a real app, this would generate a PDF or open a modal with the report
//   }

//   const selectedSessionData = sessions.find(session => session.id === selectedSession)

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
//             <p className="text-gray-600">Track and manage training session attendance</p>
//           </div>
//           <div className="flex gap-2 bg-[#0F0F0F] text-white rounded-lg">
//             <Button onClick={handleMarkAllPresent} disabled={isMarkingAttendance}>
//               {isMarkingAttendance ? (
//                 "Marking..."
//               ) : (
//                 <>
//                   <CheckCircle className="w-4 h-4 mr-2" />
//                   Mark All Present
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Attendance Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
//               <p className="text-sm text-muted-foreground">Present Today</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
//               <p className="text-sm text-muted-foreground">Absent Today</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{attendanceStats.total}</div>
//               <p className="text-sm text-muted-foreground">Total Players</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{attendanceStats.percentage}%</div>
//               <p className="text-sm text-muted-foreground">Attendance Rate</p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Daily Attendance */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <CardTitle>Daily Attendance</CardTitle>
//                     <CardDescription>Mark attendance for training sessions</CardDescription>
//                   </div>
//                   <div className="w-64">
//                     <Input
//                       placeholder="Search players..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-4 pt-4">
//                   <Input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => handleDateChange(e.target.value)}
//                     className="w-40"
//                   />
//                   <Select value={selectedSession} onValueChange={setSelectedSession}>
//                     <SelectTrigger className="w-48">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {sessions.map((session) => (
//                         <SelectItem key={session.id} value={session.id}>
//                           {session.day} {session.time}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="mb-4">
//                   {selectedSessionData && (
//                     <p className="text-sm text-gray-600">
//                       Session: <span className="font-medium">{selectedSessionData.name}</span> | 
//                       Date: <span className="font-medium">{format(parseISO(selectedDate), "MMMM d, yyyy")}</span>
//                     </p>
//                   )}
//                 </div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Player</TableHead>
//                       <TableHead>Category</TableHead>
//                       <TableHead>Present</TableHead>
//                       <TableHead>Time</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredPlayers.length > 0 ? (
//                       filteredPlayers.map((player) => (
//                         <TableRow key={player.id}>
//                           <TableCell>
//                             <div>
//                               <p className="font-medium">{player.name}</p>
//                               <p className="text-sm text-gray-600">{player.id}</p>
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant={player.category === "Senior" ? "default" : "secondary"}>
//                               {player.category}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <Checkbox 
//                               checked={player.present}
//                               onCheckedChange={() => handleToggleAttendance(player.id)}
//                             />
//                           </TableCell>
//                           <TableCell>{player.time}</TableCell>
//                           <TableCell>
//                             {player.present ? (
//                               <Badge variant="default" className="bg-green-100 text-green-800">
//                                 <CheckCircle className="w-3 h-3 mr-1" />
//                                 Present
//                               </Badge>
//                             ) : (
//                               <Badge variant="secondary" className="bg-red-100 text-red-800">
//                                 <XCircle className="w-3 h-3 mr-1" />
//                                 Absent
//                               </Badge>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={5} className="text-center py-8">
//                           <div className="flex flex-col items-center justify-center space-y-2">
//                             <Search className="w-8 h-8 text-gray-400" />
//                             <p className="text-gray-500">No players found</p>
//                             <Button variant="outline" size="sm">
//                               <PlusCircle className="w-4 h-4 mr-2" />
//                               Add New Player
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Weekly Overview */}
//           <div>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Weekly Overview</CardTitle>
//                 <CardDescription>
//                   Week of {format(startOfWeek(parseISO(selectedDate)), "MMMM d")}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {weeklyOverview.map((day, index) => (
//                     <div 
//                       key={index} 
//                       className={`flex items-center justify-between p-3 rounded-lg ${
//                         isSameDay(parseISO(day.date), parseISO(selectedDate)) ? 
//                         "bg-blue-50 border border-blue-200" : "bg-gray-50"
//                       }`}
//                     >
//                       <div>
//                         <p className="font-medium">{day.day}</p>
//                         <p className="text-sm text-gray-600">{format(parseISO(day.date), "MMM d")}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">{day.session}</p>
//                         <p className="text-sm text-gray-600">{day.attendance}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Quick Actions */}
//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <Button 
//                     variant="outline" 
//                     className="w-full justify-start"
//                     onClick={handleGenerateMonthlyReport}
//                   >
//                     <Calendar className="w-4 h-4 mr-2" />
//                     View Monthly Report
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     className="w-full justify-start"
//                     onClick={() => {
//                       // Reset to current date
//                       const today = format(new Date(), "yyyy-MM-dd")
//                       setSelectedDate(today)
//                       setWeeklyOverview(generateWeeklyOverview(today))
//                     }}
//                   >
//                     <Calendar className="w-4 h-4 mr-2" />
//                     View Today&apos;s Attendance
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   )
// }





"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Search, CheckCircle, XCircle, PlusCircle } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import { useToast } from "@/components/ui/use-toast"
import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns"

type Player = {
  id: string
  name: string
  category: "Senior" | "Junior"
  present: boolean
  time: string
}

type Session = {
  id: string
  name: string
  day: string
  time: string
}

type WeeklyAttendance = {
  day: string
  date: string
  session: string
  attendance: string
}

export default function AttendancePage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [selectedSession, setSelectedSession] = useState<string>("tuesday-4pm")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isMarkingAttendance, setIsMarkingAttendance] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "CBFA001",
      name: "John Adebayo",
      category: "Senior",
      present: true,
      time: "4:00 PM",
    },
    {
      id: "CBFA002",
      name: "Sarah Okafor",
      category: "Junior",
      present: true,
      time: "4:05 PM",
    },
    {
      id: "CBFA003",
      name: "Michael Ibrahim",
      category: "Senior",
      present: false,
      time: "-",
    },
    {
      id: "CBFA004",
      name: "Fatima Yusuf",
      category: "Junior",
      present: true,
      time: "4:02 PM",
    },
    {
      id: "CBFA005",
      name: "David Okonkwo",
      category: "Junior",
      present: false,
      time: "-",
    },
    {
      id: "CBFA006",
      name: "Dennis Okoro",
      category: "Senior",
      present: true,
      time: "-",
    },
  ])

  const sessions: Session[] = [
    { id: "tuesday-4pm", name: "Tuesday Session", day: "Tuesday", time: "4:00 PM" },
    { id: "wednesday-4pm", name: "Wednesday Session", day: "Wednesday", time: "4:00 PM" },
    { id: "thursday-4pm", name: "Thursday Session", day: "Thursday", time: "4:00 PM" },
    { id: "saturday-430pm", name: "Saturday Session", day: "Saturday", time: "4:30 PM" },
    { id: "sunday-430pm", name: "Sunday Session", day: "Sunday", time: "4:30 PM" },
  ]

  const generateWeeklyOverview = (date: string): WeeklyAttendance[] => {
    const parsedDate = parseISO(date)
    const weekStart = startOfWeek(parsedDate)
    
    return Array.from({ length: 7 }).map((_, index) => {
      const dayDate = addDays(weekStart, index)
      const dayName = format(dayDate, 'EEEE')
      const dateString = format(dayDate, 'yyyy-MM-dd')
      
      let session = "Rest Day"
      let attendance = "-"
      
      if (dayName === 'Tuesday' || dayName === 'Wednesday' || dayName === 'Thursday') {
        session = "4:00 PM"
        attendance = dayName === 'Tuesday' ? "45/50" : dayName === 'Wednesday' ? "42/50" : "48/50"
      } else if (dayName === 'Saturday' || dayName === 'Sunday') {
        session = "4:30 PM"
        attendance = dayName === 'Saturday' ? "52/55" : "49/55"
      }
      
      return {
        day: dayName,
        date: dateString,
        session,
        attendance
      }
    })
  }

  const [weeklyOverview, setWeeklyOverview] = useState<WeeklyAttendance[]>(generateWeeklyOverview(selectedDate))

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setWeeklyOverview(generateWeeklyOverview(date))
  }

  const attendanceStats = {
    present: players.filter((p) => p.present).length,
    absent: players.filter((p) => !p.present).length,
    total: players.length,
    percentage: Math.round((players.filter((p) => p.present).length / players.length) * 100),
  }

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggleAttendance = (playerId: string) => {
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        const isPresent = !player.present
        return {
          ...player,
          present: isPresent,
          time: isPresent ? format(new Date(), "h:mm a") : "-"
        }
      }
      return player
    }))
  }

  const handleMarkAllPresent = () => {
    setIsMarkingAttendance(true)
    setTimeout(() => {
      setPlayers(players.map(player => ({
        ...player,
        present: true,
        time: format(new Date(), "h:mm a")
      })))
      setIsMarkingAttendance(false)
      toast({
        title: "Attendance marked",
        description: "All players have been marked as present",
      })
    }, 1000)
  }

  const handleGenerateMonthlyReport = () => {
    toast({
      title: "Monthly report generated",
      description: "The monthly attendance report is being prepared",
    })
  }

  const selectedSessionData = sessions.find(session => session.id === selectedSession)

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-3">Attendance Management</h1>
            <p className="text-gray-600 lg:mt-0 mt-2">Track and manage training session attendance</p>
          </div>
          <Button 
            onClick={handleMarkAllPresent} 
            disabled={isMarkingAttendance}
            className="w-full md:w-auto"
          >
            {isMarkingAttendance ? (
              "Marking..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Present
              </>
            )}
          </Button>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{attendanceStats.present}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Present Today</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Absent Today</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{attendanceStats.total}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Players</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{attendanceStats.percentage}%</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Attendance Rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Daily Attendance */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div>
                    <CardTitle>Daily Attendance</CardTitle>
                    <CardDescription>Mark attendance for training sessions</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full sm:w-40"
                      />
                      <Select value={selectedSession} onValueChange={setSelectedSession}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sessions.map((session) => (
                            <SelectItem key={session.id} value={session.id}>
                              {session.day} {session.time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {selectedSessionData && (
                    <p className="text-sm text-gray-600">
                      Session: <span className="font-medium">{selectedSessionData.name}</span> | 
                      Date: <span className="font-medium">{format(parseISO(selectedDate), "MMMM d, yyyy")}</span>
                    </p>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Player</TableHead>
                        <TableHead className="hidden sm:table-cell">Category</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead className="hidden xs:table-cell">Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-sm text-gray-600">{player.id}</p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant={player.category === "Senior" ? "default" : "secondary"}>
                                {player.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Checkbox 
                                checked={player.present}
                                onCheckedChange={() => handleToggleAttendance(player.id)}
                              />
                            </TableCell>
                            <TableCell className="hidden xs:table-cell">{player.time}</TableCell>
                            <TableCell>
                              {player.present ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Present</span>
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Absent</span>
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <Search className="w-8 h-8 text-gray-400" />
                              <p className="text-gray-500">No players found</p>
                              <Button variant="outline" size="sm">
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add New Player
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Overview */}
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
                <CardDescription>
                  Week of {format(startOfWeek(parseISO(selectedDate)), "MMMM d")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklyOverview.map((day, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isSameDay(parseISO(day.date), parseISO(selectedDate)) ? 
                        "bg-blue-50 border border-blue-200" : "bg-gray-50"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-sm sm:text-base">{day.day}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{format(parseISO(day.date), "MMM d")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm sm:text-base">{day.session}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{day.attendance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleGenerateMonthlyReport}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Monthly Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      const today = format(new Date(), "yyyy-MM-dd")
                      setSelectedDate(today)
                      setWeeklyOverview(generateWeeklyOverview(today))
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Today&apos;s Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}