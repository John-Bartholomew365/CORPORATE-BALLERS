// // "use client";

// // import { useState, useEffect } from "react";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { Calendar, Search, CheckCircle, XCircle, PlusCircle } from "lucide-react";
// // import { AdminLayout } from "@/components/dashboard/AdminLayout";
// // import { useToast } from "@/components/ui/use-toast";
// // import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
// // import axios from "axios";
// // import { useRouter } from "next/navigation";
// // import { getToken } from "@/app/reuseables/authToken";

// // type Player = {
// //   _id: string; // MongoDB _id
// //   playerId: string; // Custom ID (e.g., "CBFA-001")
// //   name: string;
// //   category: "Senior" | "Junior";
// //   present: boolean;
// //   time: string;
// // };

// // type Session = {
// //   id: string;
// //   name: string;
// //   day: string;
// //   time: string;
// // };

// // type WeeklyAttendance = {
// //   day: string;
// //   date: string;
// //   session: string;
// //   attendance: string;
// // };

// // export default function AttendancePage() {
// //   const { toast } = useToast();
// //   const router = useRouter();
// //   const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
// //   const [selectedSession, setSelectedSession] = useState<string>("tuesday-4pm");
// //   const [searchQuery, setSearchQuery] = useState<string>("");
// //   const [isMarkingAttendance, setIsMarkingAttendance] = useState<boolean>(false);
// //   const [isLoading, setIsLoading] = useState<boolean>(true);
// //   const [players, setPlayers] = useState<Player[]>([]);
// //   const sessions: Session[] = [
// //     { id: "tuesday-4pm", name: "Tuesday Session", day: "Tuesday", time: "4:00 PM" },
// //     { id: "wednesday-4pm", name: "Wednesday Session", day: "Wednesday", time: "4:00 PM" },
// //     { id: "thursday-4pm", name: "Thursday Session", day: "Thursday", time: "4:00 PM" },
// //     { id: "saturday-430pm", name: "Saturday Session", day: "Saturday", time: "4:30 PM" },
// //     { id: "sunday-430pm", name: "Sunday Session", day: "Sunday", time: "4:30 PM" },
// //   ];

// //   const generateWeeklyOverview = (date: string): WeeklyAttendance[] => {
// //     const parsedDate = parseISO(date);
// //     const weekStart = startOfWeek(parsedDate);

// //     return Array.from({ length: 7 }).map((_, index) => {
// //       const dayDate = addDays(weekStart, index);
// //       const dayName = format(dayDate, "EEEE");
// //       const dateString = format(dayDate, "yyyy-MM-dd");

// //       let session = "Rest Day";
// //       let attendance = "-";

// //       if (dayName === "Tuesday" || dayName === "Wednesday" || dayName === "Thursday") {
// //         session = "4:00 PM";
// //         attendance = dayName === "Tuesday" ? "45/50" : dayName === "Wednesday" ? "42/50" : "48/50";
// //       } else if (dayName === "Saturday" || dayName === "Sunday") {
// //         session = "4:30 PM";
// //         attendance = dayName === "Saturday" ? "52/55" : "49/55";
// //       }

// //       return {
// //         day: dayName,
// //         date: dateString,
// //         session,
// //         attendance,
// //       };
// //     });
// //   };

// //   const [weeklyOverview, setWeeklyOverview] = useState<WeeklyAttendance[]>(generateWeeklyOverview(selectedDate));

// //   useEffect(() => {
// //     const fetchPlayers = async () => {
// //       try {
// //         const token = getToken();
// //         if (!token) {
// //           toast({
// //             title: "Error",
// //             description: "Please log in to view players.",
// //             variant: "destructive",
// //           });
// //           setTimeout(() => {
// //             router.push("/auth/login");
// //           }, 2000);
// //           return;
// //         }

// //         const response = await axios.get("/api/all-players", {
// //           headers: {
// //             Authorization: token,
// //           },
// //         });

// //         const result = response.data;
// //         if (result.statusCode === "00") {
// //           type ApiPlayer = {
// //             id: string;
// //             playerId: string;
// //             fullName: string;
// //             category: "Senior" | "Junior";
// //           };
// //           setPlayers(
// //             result.players.map((player: ApiPlayer) => ({
// //               _id: player.id,
// //               playerId: player.playerId,
// //               name: player.fullName,
// //               category: player.category,
// //               present: false, // Initialize as absent; fetch session-specific data if needed
// //               time: "-",
// //             }))
// //           );
// //           toast({
// //             title: "Success",
// //             description: "Players retrieved successfully",
// //           });
// //         } else {
// //           toast({
// //             title: "Error",
// //             description: result.message || "Failed to fetch players",
// //             variant: "destructive",
// //           });
// //         }
// //       } catch (error) {
// //         if (axios.isAxiosError(error)) {
// //           if (error.response?.status === 401) {
// //             toast({
// //               title: "Error",
// //               description: "Session expired. Please log in again.",
// //               variant: "destructive",
// //             });
// //             setTimeout(() => {
// //               router.push("/auth/login");
// //             }, 2000);
// //           } else {
// //             toast({
// //               title: "Error",
// //               description: error.response?.data?.message || "Failed to fetch players",
// //               variant: "destructive",
// //             });
// //           }
// //         } else {
// //           toast({
// //             title: "Error",
// //             description: "An unexpected error occurred",
// //             variant: "destructive",
// //           });
// //         }
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchPlayers();
// //   }, [router, toast]);

// //   const handleDateChange = (date: string) => {
// //     setSelectedDate(date);
// //     setWeeklyOverview(generateWeeklyOverview(date));
// //     // Reset players' attendance for new date/session
// //     setPlayers(
// //       players.map((player) => ({
// //         ...player,
// //         present: false,
// //         time: "-",
// //       }))
// //     );
// //   };

// //   const handleToggleAttendance = async (playerId: string) => {
// //     const player = players.find((p) => p._id === playerId);
// //     if (!player) return;

// //     const newPresentState = !player.present;
// //     const time = newPresentState ? format(new Date(), "h:mm a") : "-";

// //     setIsMarkingAttendance(true);
// //     try {
// //       const token = getToken();
// //       if (!token) {
// //         toast({
// //           title: "Error",
// //           description: "Please log in to mark attendance.",
// //           variant: "destructive",
// //         });
// //         return;
// //       }

// //       const response = await axios.post(
// //         "/api/mark-attendance",
// //         {
// //           userId: playerId,
// //           date: selectedDate,
// //           session: selectedSession,
// //           present: newPresentState,
// //         },
// //         {
// //           headers: {
// //             Authorization: token,
// //           },
// //         }
// //       );

// //       const result = response.data;
// //       if (result.statusCode === "00") {
// //         setPlayers(
// //           players.map((p) =>
// //             p._id === playerId
// //               ? {
// //                   ...p,
// //                   present: newPresentState,
// //                   time,
// //                 }
// //               : p
// //           )
// //         );
// //         toast({
// //           title: "Success",
// //           description: `Attendance marked for ${player.name}`,
// //         });
// //       } else {
// //         toast({
// //           title: "Error",
// //           description: result.message || "Failed to mark attendance",
// //           variant: "destructive",
// //         });
// //       }
// //     } catch (error) {
// //       if (axios.isAxiosError(error)) {
// //         toast({
// //           title: "Error",
// //           description: error.response?.data?.message || "Failed to mark attendance",
// //           variant: "destructive",
// //         });
// //       } else {
// //         toast({
// //           title: "Error",
// //           description: "An unexpected error occurred",
// //           variant: "destructive",
// //         });
// //       }
// //     } finally {
// //       setIsMarkingAttendance(false);
// //     }
// //   };

// //   const handleMarkAllPresent = async () => {
// //     setIsMarkingAttendance(true);
// //     try {
// //       const token = getToken();
// //       if (!token) {
// //         toast({
// //           title: "Error",
// //           description: "Please log in to mark attendance.",
// //           variant: "destructive",
// //         });
// //         return;
// //       }

// //       const userIds = players.map((player) => player._id);
// //       const response = await axios.post(
// //         "/api/mark-all-attendance",
// //         {
// //           date: selectedDate,
// //           session: selectedSession,
// //           userIds,
// //         },
// //         {
// //           headers: {
// //             Authorization: token,
// //           },
// //         }
// //       );

// //       const result = response.data;
// //       if (result.statusCode === "00") {
// //         setPlayers(
// //           players.map((player) => ({
// //             ...player,
// //             present: true,
// //             time: format(new Date(), "h:mm a"),
// //           }))
// //         );
// //         toast({
// //           title: "Success",
// //           description: "All players have been marked as present",
// //         });
// //       } else {
// //         toast({
// //           title: "Error",
// //           description: result.message || "Failed to mark all attendance",
// //           variant: "destructive",
// //         });
// //       }
// //     } catch (error) {
// //       if (axios.isAxiosError(error)) {
// //         toast({
// //           title: "Error",
// //           description: error.response?.data?.message || "Failed to mark all attendance",
// //           variant: "destructive",
// //         });
// //       } else {
// //         toast({
// //           title: "Error",
// //           description: "An unexpected error occurred",
// //           variant: "destructive",
// //         });
// //       }
// //     } finally {
// //       setIsMarkingAttendance(false);
// //     }
// //   };

// //   const handleGenerateMonthlyReport = () => {
// //     toast({
// //       title: "Monthly report generated",
// //       description: "The monthly attendance report is being prepared",
// //     });
// //   };

// //   const attendanceStats = {
// //     present: players.filter((p) => p.present).length,
// //     absent: players.filter((p) => !p.present).length,
// //     total: players.length,
// //     percentage: players.length > 0 ? Math.round((players.filter((p) => p.present).length / players.length) * 100) : 0,
// //   };

// //   const filteredPlayers = players.filter(
// //     (player) =>
// //       player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       player.playerId.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const selectedSessionData = sessions.find((session) => session.id === selectedSession);

// //   return (
// //     <AdminLayout>
// //       <div className="space-y-4 md:space-y-6">
// //         {/* Header Section */}
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-3">Attendance Management</h1>
// //             <p className="text-gray-600 lg:mt-0 mt-2">Track and manage training session attendance</p>
// //           </div>
// //           <Button
// //             onClick={handleMarkAllPresent}
// //             disabled={isMarkingAttendance || isLoading}
// //             className="w-full md:w-auto"
// //           >
// //             {isMarkingAttendance ? (
// //               "Marking..."
// //             ) : (
// //               <>
// //                 <CheckCircle className="w-4 h-4 mr-2" />
// //                 Mark All Present
// //               </>
// //             )}
// //           </Button>
// //         </div>

// //         {/* Attendance Stats */}
// //         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
// //           {isLoading ? (
// //             <>
// //               {Array.from({ length: 4 }).map((_, index) => (
// //                 <Card key={index} className="min-w-0">
// //                   <CardContent className="p-4 sm:p-6">
// //                     <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
// //                     <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </>
// //           ) : (
// //             <>
// //               <Card className="min-w-0">
// //                 <CardContent className="p-4 sm:p-6">
// //                   <div className="text-xl sm:text-2xl font-bold text-green-600">{attendanceStats.present}</div>
// //                   <p className="text-xs sm:text-sm text-muted-foreground">Present Today</p>
// //                 </CardContent>
// //               </Card>
// //               <Card className="min-w-0">
// //                 <CardContent className="p-4 sm:p-6">
// //                   <div className="text-xl sm:text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
// //                   <p className="text-xs sm:text-sm text-muted-foreground">Absent Today</p>
// //                 </CardContent>
// //               </Card>
// //               <Card className="min-w-0">
// //                 <CardContent className="p-4 sm:p-6">
// //                   <div className="text-xl sm:text-2xl font-bold">{attendanceStats.total}</div>
// //                   <p className="text-xs sm:text-sm text-muted-foreground">Total Players</p>
// //                 </CardContent>
// //               </Card>
// //               <Card className="min-w-0">
// //                 <CardContent className="p-4 sm:p-6">
// //                   <div className="text-xl sm:text-2xl font-bold">{attendanceStats.percentage}%</div>
// //                   <p className="text-xs sm:text-sm text-muted-foreground">Attendance Rate</p>
// //                 </CardContent>
// //               </Card>
// //             </>
// //           )}
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
// //           {/* Daily Attendance */}
// //           <div className="lg:col-span-2">
// //             <Card>
// //               <CardHeader>
// //                 <div className="flex flex-col gap-4">
// //                   <div>
// //                     <CardTitle>Daily Attendance</CardTitle>
// //                     <CardDescription>Mark attendance for training sessions</CardDescription>
// //                   </div>
// //                   <div className="flex flex-col sm:flex-row gap-4">
// //                     <Input
// //                       placeholder="Search players..."
// //                       value={searchQuery}
// //                       onChange={(e) => setSearchQuery(e.target.value)}
// //                       className="w-full sm:w-64"
// //                       disabled={isLoading}
// //                     />
// //                     <div className="flex gap-2">
// //                       <Input
// //                         type="date"
// //                         value={selectedDate}
// //                         onChange={(e) => handleDateChange(e.target.value)}
// //                         className="w-full sm:w-40"
// //                         disabled={isLoading}
// //                       />
// //                       <Select value={selectedSession} onValueChange={setSelectedSession} disabled={isLoading}>
// //                         <SelectTrigger className="w-full sm:w-48">
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {sessions.map((session) => (
// //                             <SelectItem key={session.id} value={session.id}>
// //                               {session.day} {session.time}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="mb-4">
// //                   {isLoading ? (
// //                     <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
// //                   ) : (
// //                     selectedSessionData && (
// //                       <p className="text-sm text-gray-600">
// //                         Session: <span className="font-medium">{selectedSessionData.name}</span> | Date:{" "}
// //                         <span className="font-medium">{format(parseISO(selectedDate), "MMMM d, yyyy")}</span>
// //                       </p>
// //                     )
// //                   )}
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <Table>
// //                     <TableHeader>
// //                       <TableRow>
// //                         <TableHead className="min-w-[150px]">Player</TableHead>
// //                         <TableHead className="hidden sm:table-cell">Category</TableHead>
// //                         <TableHead>Present</TableHead>
// //                         <TableHead className="hidden xs:table-cell">Time</TableHead>
// //                         <TableHead>Status</TableHead>
// //                       </TableRow>
// //                     </TableHeader>
// //                     <TableBody>
// //                       {isLoading ? (
// //                         Array.from({ length: 5 }).map((_, index) => (
// //                           <TableRow key={index}>
// //                             <TableCell>
// //                               <div className="space-y-2">
// //                                 <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
// //                                 <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
// //                               </div>
// //                             </TableCell>
// //                             <TableCell className="hidden sm:table-cell">
// //                               <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
// //                             </TableCell>
// //                             <TableCell>
// //                               <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
// //                             </TableCell>
// //                             <TableCell className="hidden xs:table-cell">
// //                               <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
// //                             </TableCell>
// //                             <TableCell>
// //                               <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
// //                             </TableCell>
// //                           </TableRow>
// //                         ))
// //                       ) : filteredPlayers.length > 0 ? (
// //                         filteredPlayers.map((player) => (
// //                           <TableRow key={player._id}>
// //                             <TableCell>
// //                               <div>
// //                                 <p className="font-medium">{player.name}</p>
// //                                 <p className="text-sm text-gray-600">{player.playerId}</p>
// //                               </div>
// //                             </TableCell>
// //                             <TableCell className="hidden sm:table-cell">
// //                               <Badge variant={player.category === "Senior" ? "default" : "secondary"}>
// //                                 {player.category}
// //                               </Badge>
// //                             </TableCell>
// //                             <TableCell>
// //                               <Checkbox
// //                                 checked={player.present}
// //                                 onCheckedChange={() => handleToggleAttendance(player._id)}
// //                                 disabled={isMarkingAttendance}
// //                               />
// //                             </TableCell>
// //                             <TableCell className="hidden xs:table-cell">{player.time}</TableCell>
// //                             <TableCell>
// //                               {player.present ? (
// //                                 <Badge variant="default" className="bg-green-100 text-green-800">
// //                                   <CheckCircle className="w-3 h-3 mr-1" />
// //                                   <span className="hidden sm:inline">Present</span>
// //                                 </Badge>
// //                               ) : (
// //                                 <Badge variant="secondary" className="bg-red-100 text-red-800">
// //                                   <XCircle className="w-3 h-3 mr-1" />
// //                                   <span className="hidden sm:inline">Absent</span>
// //                                 </Badge>
// //                               )}
// //                             </TableCell>
// //                           </TableRow>
// //                         ))
// //                       ) : (
// //                         <TableRow>
// //                           <TableCell colSpan={5} className="text-center py-8">
// //                             <div className="flex flex-col items-center justify-center space-y-2">
// //                               <Search className="w-8 h-8 text-gray-400" />
// //                               <p className="text-gray-500">No players found</p>
// //                               <Button variant="outline" size="sm">
// //                                 <PlusCircle className="w-4 h-4 mr-2" />
// //                                 Add New Player
// //                               </Button>
// //                             </div>
// //                           </TableCell>
// //                         </TableRow>
// //                       )}
// //                     </TableBody>
// //                   </Table>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Weekly Overview */}
// //           <div className="space-y-4 md:space-y-6">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Weekly Overview</CardTitle>
// //                 <CardDescription>Week of {format(startOfWeek(parseISO(selectedDate)), "MMMM d")}</CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-2">
// //                   {weeklyOverview.map((day, index) => (
// //                     <div
// //                       key={index}
// //                       className={`flex items-center justify-between p-3 rounded-lg ${
// //                         isSameDay(parseISO(day.date), parseISO(selectedDate))
// //                           ? "bg-blue-50 border border-blue-200"
// //                           : "bg-gray-50"
// //                       }`}
// //                     >
// //                       <div>
// //                         <p className="font-medium text-sm sm:text-base">{day.day}</p>
// //                         <p className="text-xs sm:text-sm text-gray-600">{format(parseISO(day.date), "MMM d")}</p>
// //                       </div>
// //                       <div className="text-right">
// //                         <p className="font-medium text-sm sm:text-base">{day.session}</p>
// //                         <p className="text-xs sm:text-sm text-gray-600">{day.attendance}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Quick Actions */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Quick Actions</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-2">
// //                   <Button
// //                     variant="outline"
// //                     className="w-full justify-start"
// //                     onClick={handleGenerateMonthlyReport}
// //                     disabled={isLoading}
// //                   >
// //                     <Calendar className="w-4 h-4 mr-2" />
// //                     View Monthly Report
// //                   </Button>
// //                   <Button
// //                     variant="outline"
// //                     className="w-full justify-start"
// //                     onClick={() => {
// //                       const today = format(new Date(), "yyyy-MM-dd");
// //                       setSelectedDate(today);
// //                       setWeeklyOverview(generateWeeklyOverview(today));
// //                     }}
// //                     disabled={isLoading}
// //                   >
// //                     <Calendar className="w-4 h-4 mr-2" />
// //                     View Today&apos;s Attendance
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx global>{`
// //         @keyframes shimmer {
// //           0% {
// //             background-position: -468px 0;
// //           }
// //           100% {
// //             background-position: 468px 0;
// //           }
// //         }
// //         .animate-pulse {
// //           animation: shimmer 1.5s infinite linear;
// //           background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
// //           background-size: 800px 104px;
// //           position: relative;
// //         }
// //       `}</style>
// //     </AdminLayout>
// //   );
// // }






// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Calendar, Search, CheckCircle, XCircle, PlusCircle } from "lucide-react";
// import { AdminLayout } from "@/components/dashboard/AdminLayout";
// import { useToast } from "@/components/ui/use-toast";
// import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { getToken } from "@/app/reuseables/authToken";

// type Player = {
//   _id: string; // MongoDB _id
//   playerId: string; // Custom ID (e.g., "CBFA-001")
//   name: string;
//   category: "Senior" | "Junior";
//   present: boolean;
//   time: string;
// };

// type Session = {
//   id: string;
//   name: string;
//   day: string;
//   time: string;
// };

// type WeeklyAttendance = {
//   day: string;
//   date: string;
//   session: string;
//   attendance: string;
// };

// export default function AttendancePage() {
//   const { toast } = useToast();
//   const router = useRouter();
//   const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
//   const [selectedSession, setSelectedSession] = useState<string>("tuesday-4pm");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [isMarkingAttendance, setIsMarkingAttendance] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [players, setPlayers] = useState<Player[]>([]);
//   const sessions: Session[] = [
//     { id: "tuesday-4pm", name: "Tuesday Session", day: "Tuesday", time: "4:00 PM" },
//     { id: "wednesday-4pm", name: "Wednesday Session", day: "Wednesday", time: "4:00 PM" },
//     { id: "thursday-4pm", name: "Thursday Session", day: "Thursday", time: "4:00 PM" },
//     { id: "saturday-430pm", name: "Saturday Session", day: "Saturday", time: "4:30 PM" },
//     { id: "sunday-430pm", name: "Sunday Session", day: "Sunday", time: "4:30 PM" },
//   ];

//   type WeeklyDataItem = {
//     date: string;
//     session: string;
//     present: number;
//     total: number;
//     attendanceRate: number;
//   };

//   const generateWeeklyOverview = (date: string, weeklyData: WeeklyDataItem[]): WeeklyAttendance[] => {
//     const parsedDate = parseISO(date);
//     const weekStart = startOfWeek(parsedDate);
//     const sessionDays = ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"];

//     return Array.from({ length: 7 }).map((_, index) => {
//       const dayDate = addDays(weekStart, index);
//       const dayName = format(dayDate, "EEEE");
//       const dateString = format(dayDate, "yyyy-MM-dd");

//       let session = "Rest Day";
//       let attendance = "-";

//       if (sessionDays.includes(dayName)) {
//         const sessionData = weeklyData.find(
//           (data) =>
//             isSameDay(parseISO(data.date), dayDate) &&
//             sessions.some((s) => s.id === data.session && s.day === dayName)
//         );
//         if (sessionData) {
//           session = sessions.find((s) => s.id === sessionData.session)?.time || "Rest Day";
//           attendance = `${sessionData.present}/${sessionData.total} (${sessionData.attendanceRate.toFixed(1)}%)`;
//         } else {
//           session = dayName === "Tuesday" || dayName === "Wednesday" || dayName === "Thursday" ? "4:00 PM" : "4:30 PM";
//         }
//       }

//       return {
//         day: dayName,
//         date: dateString,
//         session,
//         attendance,
//       };
//     });
//   };

//   const [weeklyOverview, setWeeklyOverview] = useState<WeeklyAttendance[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const token = getToken();
//         if (!token) {
//           toast({ title: "Error", description: "Please log in.", variant: "destructive" });
//           setTimeout(() => router.push("/auth/login"), 2000);
//           return;
//         }

//         // Fetch players
//         const playersResponse = await axios.get("/api/all-players", {
//           headers: { Authorization: token },
//         });

//         if (playersResponse.data.statusCode !== "00") {
//           toast({
//             title: "Error",
//             description: playersResponse.data.message || "Failed to fetch players",
//             variant: "destructive",
//           });
//           setIsLoading(false);
//           return;
//         }

//         type ApiPlayer = {
//           id: string;
//           playerId: string;
//           fullName: string;
//           category: "Senior" | "Junior";
//         };
//         const initialPlayers = playersResponse.data.players.map((player: ApiPlayer) => ({
//           _id: player.id,
//           playerId: player.playerId,
//           name: player.fullName,
//           category: player.category,
//           present: false,
//           time: "-",
//         }));

//         // Fetch daily attendance
//         const sessionData = sessions.find((s) => s.id === selectedSession);
//         const sessionParam = sessionData ? `${sessionData.day} ${sessionData.time}` : "";
//         const dailyResponse = await axios.get("/api/daily-attendance", {
//           params: { date: selectedDate, session: sessionParam },
//           headers: { Authorization: token },
//         });

//         type AttendanceRecord = {
//           userId: string;
//           present: boolean;
//           time?: string;
//         };

//         if (dailyResponse.data.statusCode === "00") {
//           setPlayers(
//             initialPlayers.map((player: Player) => {
//               const attendance = dailyResponse.data.data.find((a: AttendanceRecord) => a.userId === player._id);
//               return {
//                 ...player,
//                 present: attendance?.present ?? false,
//                 time: attendance?.time ? format(parseISO(attendance.time), "h:mm a") : "-",
//               };
//             })
//           );
//         } else {
//           setPlayers(initialPlayers);
//           toast({
//             title: "Warning",
//             description: dailyResponse.data.message || "No attendance data found for this session",
//           });
//         }

//         // Fetch weekly overview
//         const weekStart = format(startOfWeek(parseISO(selectedDate)), "yyyy-MM-dd");
//         const weekEnd = format(addDays(startOfWeek(parseISO(selectedDate)), 6), "yyyy-MM-dd");
//         const weeklyResponse = await axios.get("/api/weekly-overview", {
//           params: { weekStart, weekEnd },
//           headers: { Authorization: token },
//         });

//         if (weeklyResponse.data.statusCode === "00") {
//           setWeeklyOverview(generateWeeklyOverview(selectedDate, weeklyResponse.data.data));
//         } else {
//           setWeeklyOverview(generateWeeklyOverview(selectedDate, []));
//           toast({
//             title: "Warning",
//             description: weeklyResponse.data.message || "No weekly overview data found",
//           });
//         }
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           if (error.response?.status === 401) {
//             toast({ title: "Error", description: "Session expired. Please log in again.", variant: "destructive" });
//             setTimeout(() => router.push("/auth/login"), 2000);
//           } else {
//             toast({
//               title: "Error",
//               description: error.response?.data?.message || "Failed to fetch data",
//               variant: "destructive",
//             });
//           }
//         } else {
//           toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" });
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [router, toast, selectedDate, selectedSession]);

//   const handleDateChange = (date: string) => {
//     setSelectedDate(date);
//   };

//   const handleSessionChange = (session: string) => {
//     setSelectedSession(session);
//   };

//   const handleToggleAttendance = async (playerId: string) => {
//     const player = players.find((p) => p._id === playerId);
//     if (!player) return;

//     const newPresentState = !player.present;
//     const time = newPresentState ? format(new Date(), "h:mm a") : "-";

//     setIsMarkingAttendance(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         toast({
//           title: "Error",
//           description: "Please log in to mark attendance.",
//           variant: "destructive",
//         });
//         return;
//       }

//       const response = await axios.post(
//         "/api/mark-attendance",
//         {
//           userId: playerId,
//           date: selectedDate,
//           session: selectedSession,
//           present: newPresentState,
//         },
//         {
//           headers: { Authorization: token },
//         }
//       );

//       const result = response.data;
//       if (result.statusCode === "00") {
//         setPlayers(
//           players.map((p) =>
//             p._id === playerId
//               ? {
//                   ...p,
//                   present: newPresentState,
//                   time,
//                 }
//               : p
//           )
//         );
//         toast({
//           title: "Success",
//           description: `Attendance marked for ${player.name}`,
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to mark attendance",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast({
//           title: "Error",
//           description: error.response?.data?.message || "Failed to mark attendance",
//           variant: "destructive",
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         });
//       }
//     } finally {
//       setIsMarkingAttendance(false);
//     }
//   };

//   const handleMarkAllPresent = async () => {
//     setIsMarkingAttendance(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         toast({
//           title: "Error",
//           description: "Please log in to mark attendance.",
//           variant: "destructive",
//         });
//         return;
//       }

//       const userIds = players.map((player) => player._id);
//       const response = await axios.post(
//         "/api/mark-all-attendance",
//         {
//           date: selectedDate,
//           session: selectedSession,
//           userIds,
//         },
//         {
//           headers: { Authorization: token },
//         }
//       );

//       const result = response.data;
//       if (result.statusCode === "00") {
//         setPlayers(
//           players.map((player) => ({
//             ...player,
//             present: true,
//             time: format(new Date(), "h:mm a"),
//           }))
//         );
//         toast({
//           title: "Success",
//           description: "All players have been marked as present",
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to mark all attendance",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast({
//           title: "Error",
//           description: error.response?.data?.message || "Failed to mark all attendance",
//           variant: "destructive",
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred",
//           variant: "destructive",
//         });
//       }
//     } finally {
//       setIsMarkingAttendance(false);
//     }
//   };

//   const handleGenerateMonthlyReport = () => {
//     toast({
//       title: "Monthly report generated",
//       description: "The monthly attendance report is being prepared",
//     });
//   };

//   const attendanceStats = {
//     present: players.filter((p) => p.present).length,
//     absent: players.filter((p) => !p.present).length,
//     total: players.length,
//     percentage: players.length > 0 ? Math.round((players.filter((p) => p.present).length / players.length) * 100) : 0,
//   };

//   const filteredPlayers = players.filter(
//     (player) =>
//       player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       player.playerId.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const selectedSessionData = sessions.find((session) => session.id === selectedSession);

//   return (
//     <AdminLayout>
//       <div className="space-y-4 md:space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-3">Attendance Management</h1>
//             <p className="text-gray-600 lg:mt-0 mt-2">Track and manage training session attendance</p>
//           </div>
//           <Button
//             onClick={handleMarkAllPresent}
//             disabled={isMarkingAttendance || isLoading}
//             className="w-full md:w-auto"
//           >
//             {isMarkingAttendance ? (
//               "Marking..."
//             ) : (
//               <>
//                 <CheckCircle className="w-4 h-4 mr-2" />
//                 Mark All Present
//               </>
//             )}
//           </Button>
//         </div>

//         {/* Attendance Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
//           {isLoading ? (
//             <>
//               {Array.from({ length: 4 }).map((_, index) => (
//                 <Card key={index} className="min-w-0">
//                   <CardContent className="p-4 sm:p-6">
//                     <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
//                     <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </>
//           ) : (
//             <>
//               <Card className="min-w-0">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="text-xl sm:text-2xl font-bold text-green-600">{attendanceStats.present}</div>
//                   <p className="text-xs sm:text-sm text-muted-foreground">Present Today</p>
//                 </CardContent>
//               </Card>
//               <Card className="min-w-0">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="text-xl sm:text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
//                   <p className="text-xs sm:text-sm text-muted-foreground">Absent Today</p>
//                 </CardContent>
//               </Card>
//               <Card className="min-w-0">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="text-xl sm:text-2xl font-bold">{attendanceStats.total}</div>
//                   <p className="text-xs sm:text-sm text-muted-foreground">Total Players</p>
//                 </CardContent>
//               </Card>
//               <Card className="min-w-0">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="text-xl sm:text-2xl font-bold">{attendanceStats.percentage}%</div>
//                   <p className="text-xs sm:text-sm text-muted-foreground">Attendance Rate</p>
//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
//           {/* Daily Attendance */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <div className="flex flex-col gap-4">
//                   <div>
//                     <CardTitle>Daily Attendance</CardTitle>
//                     <CardDescription>Mark attendance for training sessions</CardDescription>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <Input
//                       placeholder="Search players..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full sm:w-64"
//                       disabled={isLoading}
//                     />
//                     <div className="flex gap-2">
//                       <Input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => handleDateChange(e.target.value)}
//                         className="w-full sm:w-40"
//                         disabled={isLoading}
//                       />
//                       <Select value={selectedSession} onValueChange={handleSessionChange} disabled={isLoading}>
//                         <SelectTrigger className="w-full sm:w-48">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {sessions.map((session) => (
//                             <SelectItem key={session.id} value={session.id}>
//                               {session.day} {session.time}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="mb-4">
//                   {isLoading ? (
//                     <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
//                   ) : (
//                     selectedSessionData && (
//                       <p className="text-sm text-gray-600">
//                         Session: <span className="font-medium">{selectedSessionData.name}</span> | Date:{" "}
//                         <span className="font-medium">{format(parseISO(selectedDate), "MMMM d, yyyy")}</span>
//                       </p>
//                     )
//                   )}
//                 </div>
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="min-w-[150px]">Player</TableHead>
//                         <TableHead className="hidden sm:table-cell">Category</TableHead>
//                         <TableHead>Present</TableHead>
//                         <TableHead className="hidden xs:table-cell">Time</TableHead>
//                         <TableHead>Status</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {isLoading ? (
//                         Array.from({ length: 5 }).map((_, index) => (
//                           <TableRow key={index}>
//                             <TableCell>
//                               <div className="space-y-2">
//                                 <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
//                                 <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
//                               </div>
//                             </TableCell>
//                             <TableCell className="hidden sm:table-cell">
//                               <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
//                             </TableCell>
//                             <TableCell className="hidden xs:table-cell">
//                               <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       ) : filteredPlayers.length > 0 ? (
//                         filteredPlayers.map((player) => (
//                           <TableRow key={player._id}>
//                             <TableCell>
//                               <div>
//                                 <p className="font-medium">{player.name}</p>
//                                 <p className="text-sm text-gray-600">{player.playerId}</p>
//                               </div>
//                             </TableCell>
//                             <TableCell className="hidden sm:table-cell">
//                               <Badge variant={player.category === "Senior" ? "default" : "secondary"}>
//                                 {player.category}
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <Checkbox
//                                 checked={player.present}
//                                 onCheckedChange={() => handleToggleAttendance(player._id)}
//                                 disabled={isMarkingAttendance}
//                               />
//                             </TableCell>
//                             <TableCell className="hidden xs:table-cell">{player.time}</TableCell>
//                             <TableCell>
//                               {player.present ? (
//                                 <Badge variant="default" className="bg-green-100 text-green-800">
//                                   <CheckCircle className="w-3 h-3 mr-1" />
//                                   <span className="hidden sm:inline">Present</span>
//                                 </Badge>
//                               ) : (
//                                 <Badge variant="secondary" className="bg-red-100 text-red-800">
//                                   <XCircle className="w-3 h-3 mr-1" />
//                                   <span className="hidden sm:inline">Absent</span>
//                                 </Badge>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={5} className="text-center py-8">
//                             <div className="flex flex-col items-center justify-center space-y-2">
//                               <Search className="w-8 h-8 text-gray-400" />
//                               <p className="text-gray-500">No players found</p>
//                               <Button variant="outline" size="sm">
//                                 <PlusCircle className="w-4 h-4 mr-2" />
//                                 Add New Player
//                               </Button>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Weekly Overview */}
//           <div className="space-y-4 md:space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Weekly Overview</CardTitle>
//                 <CardDescription>Week of {format(startOfWeek(parseISO(selectedDate)), "MMMM d")}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {isLoading ? (
//                   <div className="space-y-2">
//                     {Array.from({ length: 7 }).map((_, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
//                         <div>
//                           <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
//                           <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
//                         </div>
//                         <div className="text-right">
//                           <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
//                           <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     {weeklyOverview.map((day, index) => (
//                       <div
//                         key={index}
//                         className={`flex items-center justify-between p-3 rounded-lg ${
//                           isSameDay(parseISO(day.date), parseISO(selectedDate))
//                             ? "bg-blue-50 border border-blue-200"
//                             : "bg-gray-50"
//                         }`}
//                       >
//                         <div>
//                           <p className="font-medium text-sm sm:text-base">{day.day}</p>
//                           <p className="text-xs sm:text-sm text-gray-600">{format(parseISO(day.date), "MMM d")}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-medium text-sm sm:text-base">{day.session}</p>
//                           <p className="text-xs sm:text-sm text-gray-600">{day.attendance}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Quick Actions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start"
//                     onClick={handleGenerateMonthlyReport}
//                     disabled={isLoading}
//                   >
//                     <Calendar className="w-4 h-4 mr-2" />
//                     View Monthly Report
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start"
//                     onClick={() => {
//                       const today = format(new Date(), "yyyy-MM-dd");
//                       setSelectedDate(today);
//                     }}
//                     disabled={isLoading}
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

//       <style jsx global>{`
//         @keyframes shimmer {
//           0% {
//             background-position: -468px 0;
//           }
//           100% {
//             background-position: 468px 0;
//           }
//         }
//         .animate-pulse {
//           animation: shimmer 1.5s infinite linear;
//           background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
//           background-size: 800px 104px;
//           position: relative;
//         }
//       `}</style>
//     </AdminLayout>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Search, CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { AdminLayout } from "@/components/dashboard/AdminLayout";
import { useToast } from "@/components/ui/use-toast";
import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/reuseables/authToken";

type Player = {
  _id: string; // MongoDB _id
  playerId: string; // Custom ID (e.g., "CBFA-001")
  name: string;
  category: "Senior" | "Junior";
  present: boolean;
  time: string;
};

type Session = {
  id: string;
  name: string;
  day: string;
  time: string;
};

type WeeklyAttendance = {
  day: string;
  date: string;
  session: string;
  attendance: string;
};

export default function AttendancePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [selectedSession, setSelectedSession] = useState<string>("tuesday-4pm");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMarkingAttendance, setIsMarkingAttendance] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const sessions: Session[] = [
    { id: "tuesday-4pm", name: "Tuesday Session", day: "Tuesday", time: "4:00 PM" },
    { id: "wednesday-4pm", name: "Wednesday Session", day: "Wednesday", time: "4:00 PM" },
    { id: "thursday-4pm", name: "Thursday Session", day: "Thursday", time: "4:00 PM" },
    { id: "saturday-430pm", name: "Saturday Session", day: "Saturday", time: "4:30 PM" },
    { id: "sunday-430pm", name: "Sunday Session", day: "Sunday", time: "4:30 PM" },
  ];

  type WeeklyDataItem = {
    date: string;
    session: string;
    present: number;
    absent: number;
    total: number;
    attendanceRate: number;
  };

  const generateWeeklyOverview = (date: string, weeklyData: WeeklyDataItem[]): WeeklyAttendance[] => {
    const parsedDate = parseISO(date);
    const weekStart = startOfWeek(parsedDate);
    const sessionDays = ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"];

    return Array.from({ length: 7 }).map((_, index) => {
      const dayDate = addDays(weekStart, index);
      const dayName = format(dayDate, "EEEE");
      const dateString = format(dayDate, "yyyy-MM-dd");

      let session = "Rest Day";
      let attendance = "-";

      if (sessionDays.includes(dayName)) {
        const sessionData = weeklyData.find(
          (data) =>
            isSameDay(parseISO(data.date), dayDate) &&
            sessions.some((s) => s.id === data.session && s.day === dayName)
        );
        if (sessionData) {
          session = sessions.find((s) => s.id === sessionData.session)?.time || "Rest Day";
          attendance = `${sessionData.present}/${sessionData.total} (${sessionData.attendanceRate.toFixed(1)}%)`;
        } else {
          session = dayName === "Tuesday" || dayName === "Wednesday" || dayName === "Thursday" ? "4:00 PM" : "4:30 PM";
        }
      }

      return {
        day: dayName,
        date: dateString,
        session,
        attendance,
      };
    });
  };

  const [weeklyOverview, setWeeklyOverview] = useState<WeeklyAttendance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = getToken();
        if (!token) {
          toast({ title: "Error", description: "Please log in.", variant: "destructive" });
          setTimeout(() => router.push("/auth/login"), 2000);
          return;
        }

        // Fetch players
        const playersResponse = await axios.get("/api/all-players", {
          headers: { Authorization: token },
        });

        if (playersResponse.data.statusCode !== "00") {
          toast({
            title: "Error",
            description: playersResponse.data.message || "Failed to fetch players",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        type AttendanceRecord = {
          userId: string;
          present: boolean;
          time?: string;
        };

        const initialPlayers = playersResponse.data.players.map((player: {
          id: string;
          playerId: string;
          fullName: string;
          category: "Senior" | "Junior";
        }) => ({
          _id: player.id,
          playerId: player.playerId,
          name: player.fullName,
          category: player.category,
          present: false,
          time: "-",
        }));

        // Fetch daily attendance
        const sessionData = sessions.find((s) => s.id === selectedSession);
        const sessionParam = sessionData ? `${sessionData.day} ${sessionData.time}` : "";
        const dailyResponse = await axios.get("/api/daily-attendance", {
          params: { date: selectedDate, session: sessionParam },
          headers: { Authorization: token },
        });

        console.log("Daily Attendance Response:", dailyResponse.data);

        if (dailyResponse.data.statusCode === "00") {
          setPlayers(
            initialPlayers.map((player: Player) => {
              const attendance = (dailyResponse.data.data as AttendanceRecord[]).find((a) => a.userId === player._id);
              return {
                ...player,
                present: attendance?.present ?? false,
                time: attendance?.time ? format(parseISO(attendance.time), "h:mm a") : "-",
              };
            })
          );
        } else {
          setPlayers(initialPlayers);
          toast({
            title: "Warning",
            description: dailyResponse.data.message || "No attendance data found for this session",
          });
        }

        // Fetch weekly overview
        const weekStart = format(startOfWeek(parseISO(selectedDate)), "yyyy-MM-dd");
        const weekEnd = format(addDays(startOfWeek(selectedDate), 6), "yyyy-MM-dd");
        const weeklyResponse = await axios.get("/api/weekly-overview", {
          params: { weekStart, weekEnd },
          headers: { Authorization: token },
        });

        if (weeklyResponse.data.statusCode === "00") {
          setWeeklyOverview(generateWeeklyOverview(selectedDate, weeklyResponse.data.data));
        } else {
          setWeeklyOverview(generateWeeklyOverview(selectedDate, []));
          toast({
            title: "Warning",
            description: weeklyResponse.data.message || "No weekly overview data found",
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast({ title: "Error", description: "Session expired. Please log in again.", variant: "destructive" });
            setTimeout(() => router.push("/auth/login"), 2000);
          } else {
            toast({
              title: "Error",
              description: error.response?.data?.message || "Failed to fetch data",
              variant: "destructive",
            });
          }
        } else {
          toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, toast, selectedDate, selectedSession]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleSessionChange = (session: string) => {
    setSelectedSession(session);
  };

  const handleToggleAttendance = async (playerId: string) => {
    const player = players.find((p) => p._id === playerId);
    if (!player) return;

    const newPresentState = !player.present;
    const time = newPresentState ? format(new Date(), "h:mm a") : "-";

    setIsMarkingAttendance(true);
    try {
      const token = getToken();
      if (!token) {
        toast({
          title: "Error",
          description: "Please log in to mark attendance.",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post(
        "/api/mark-attendance",
        {
          userId: playerId,
          date: selectedDate,
          session: selectedSession,
          present: newPresentState,
        },
        {
          headers: { Authorization: token },
        }
      );

      const result = response.data;
      if (result.statusCode === "00") {
        setPlayers(
          players.map((p) =>
            p._id === playerId
              ? {
                  ...p,
                  present: newPresentState,
                  time,
                }
              : p
          )
        );
        toast({
          title: "Success",
          description: `Attendance marked for ${player.name}`,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to mark attendance",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to mark attendance",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsMarkingAttendance(false);
    }
  };

  const handleMarkAllPresent = async () => {
    setIsMarkingAttendance(true);
    try {
      const token = getToken();
      if (!token) {
        toast({
          title: "Error",
          description: "Please log in to mark attendance.",
          variant: "destructive",
        });
        return;
      }

      const userIds = players.map((player) => player._id);
      const response = await axios.post(
        "/api/mark-all-attendance",
        {
          date: selectedDate,
          session: selectedSession,
          userIds,
        },
        {
          headers: { Authorization: token },
        }
      );

      const result = response.data;
      if (result.statusCode === "00") {
        setPlayers(
          players.map((player) => ({
            ...player,
            present: true,
            time: format(new Date(), "h:mm a"),
          }))
        );
        toast({
          title: "Success",
          description: "All players have been marked as present",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to mark all attendance",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to mark all attendance",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsMarkingAttendance(false);
    }
  };

  const handleGenerateMonthlyReport = () => {
    toast({
      title: "Monthly report generated",
      description: "The monthly attendance report is being prepared",
    });
  };

  const attendanceStats = {
    present: players.filter((p) => p.present).length,
    absent: players.filter((p) => !p.present).length,
    total: players.length,
    percentage: players.length > 0 ? Math.round((players.filter((p) => p.present).length / players.length) * 100) : 0,
  };

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.playerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSessionData = sessions.find((session) => session.id === selectedSession);

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
            disabled={isMarkingAttendance || isLoading}
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
          {isLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="min-w-0">
                  <CardContent className="p-4 sm:p-6">
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
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
            </>
          )}
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
                      disabled={isLoading}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full sm:w-40"
                        disabled={isLoading}
                      />
                      <Select value={selectedSession} onValueChange={handleSessionChange} disabled={isLoading}>
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
                  {isLoading ? (
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    selectedSessionData && (
                      <p className="text-sm text-gray-600">
                        Session: <span className="font-medium">{selectedSessionData.name}</span> | Date:{" "}
                        <span className="font-medium">{format(parseISO(selectedDate), "MMMM d, yyyy")}</span>
                      </p>
                    )
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
                      {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell className="hidden xs:table-cell">
                              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player) => (
                          <TableRow key={player._id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-sm text-gray-600">{player.playerId}</p>
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
                                onCheckedChange={() => handleToggleAttendance(player._id)}
                                disabled={isMarkingAttendance}
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
                <CardDescription>Week of {format(startOfWeek(parseISO(selectedDate)), "MMMM d")}</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {weeklyOverview.map((day, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isSameDay(parseISO(day.date), parseISO(selectedDate))
                            ? "bg-blue-50 border border-blue-200"
                            : "bg-gray-50"
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
                )}
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
                    disabled={isLoading}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Monthly Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const today = format(new Date(), "yyyy-MM-dd");
                      setSelectedDate(today);
                    }}
                    disabled={isLoading}
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