// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { AdminLayout } from "@/components/dashboard/AdminLayout";
// import Link from "next/link";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getToken } from "@/app/reuseables/authToken";
// import { useRouter } from "next/navigation";

// interface Player {
//   id: string;
//   name: string;
//   age?: number;
//   category: string;
//   position: string;
//   joinDate?: string;
//   attendance: number;
//   phone?: string;
//   status: string;
//   playerId: string;
// }

// export default function PlayersPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     senior: 0,
//     junior: 0,
//     active: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const token = getToken();

//         if (!token) {
//           toast.error("Please log in to view players.");
//           setTimeout(() => {
//             router.push("/auth/login");
//           }, 2000);
//           return;
//         }

//         const response = await axios.get("/api/all-players", {
//           headers: {
//             Authorization: token,
//           },
//         });

//         const data = response.data;

//         if (data.statusCode === "00") {
//           const mappedPlayers: Player[] = data.players.map((player: {
//             id: string;
//             fullName: string;
//             category: string;
//             position: string;
//             attendance: number;
//             status: string;
//             playerId: string;
//           }) => ({
//             id: player.id,
//             name: player.fullName,
//             category: player.category,
//             position: player.position,
//             attendance: player.attendance,
//             status: player.status,
//             playerId: player.playerId,
//             age: undefined,
//             joinDate: undefined,
//             phone: undefined,
//           }));

//           setPlayers(mappedPlayers);
//           setStats({
//             total: data.totalPlayers,
//             senior: data.seniorCount,
//             junior: data.juniorCount,
//             active: data.activePlayers,
//           });
//           toast.success("Players retrieved successfully!");
//         } else {
//           toast.error(data.message || "Failed to fetch players");
//         }
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             if (error.response.status === 401) {
//               toast.error("Session expired. Please log in again.");
//               setTimeout(() => {
//                 router.push("/auth/login");
//               }, 2000);
//             } else {
//               toast.error(error.response.data?.message || "Failed to fetch players");
//             }
//           } else if (error.request) {
//             toast.error("No response from server. Please try again later.");
//           } else {
//             toast.error(error.message || "An error occurred while fetching players");
//           }
//         } else {
//           toast.error("An unexpected error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlayers();
//   }, [router]);

//   const filteredPlayers = players.filter((player) => {
//     const matchesSearch =
//       player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       player.playerId.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = categoryFilter === "all" || player.category.toLowerCase() === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <AdminLayout>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Player Management</h1>
//             <p className="text-gray-600">Manage all academy players and their information</p>
//           </div>
//           <Link href={"/admin/registration"}>
//             <Button className="bg-[#0F0F0F] text-white cursor-pointer">
//               <Plus className="w-4 h-4 mr-2" />
//               Add New Player
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{stats.total}</div>
//               <p className="text-sm text-muted-foreground">Total Players</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{stats.senior}</div>
//               <p className="text-sm text-muted-foreground">Senior Category</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{stats.junior}</div>
//               <p className="text-sm text-muted-foreground">Junior Category</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-2xl font-bold">{stats.active}</div>
//               <p className="text-sm text-muted-foreground">Active Players</p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Players List</CardTitle>
//             <CardDescription>View and manage all registered players</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search players by name or ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 outline-none"
//                 />
//               </div>
//               <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                 <SelectTrigger className="w-full sm:w-48">
//                   <SelectValue placeholder="Filter by category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   <SelectItem value="senior">Senior</SelectItem>
//                   <SelectItem value="junior">Junior</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Player</TableHead>
//                     <TableHead>ID</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Position</TableHead>
//                     <TableHead>Attendance</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={7} className="text-center">
//                         Loading players...
//                       </TableCell>
//                     </TableRow>
//                   ) : filteredPlayers.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={7} className="text-center">
//                         No players found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredPlayers.map((player) => (
//                       <TableRow key={player.id}>
//                         <TableCell>
//                           <div className="flex items-center gap-3">
//                             <Avatar className="border">
//                               <AvatarImage src="/placeholder.svg?height=32&width=32" />
//                               <AvatarFallback>
//                                 {player.name
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <p className="font-medium">{player.name}</p>
//                               {player.age && <p className="text-sm text-gray-600">Age: {player.age}</p>}
//                             </div>
//                           </div>
//                           </TableCell>
//                           <TableCell className="font-mono">{player.playerId}</TableCell>
//                           <TableCell>
//                             <Badge
//                               variant={player.category === "Senior" ? "default" : "secondary"}
//                               className={
//                                 player.category === "Senior"
//                                   ? "bg-[#0F0F0F] text-white"
//                                   : "bg-[#FFFFFF] text-[#0F0F0F] border border-[#E5E5E5]"
//                               }
//                             >
//                               {player.category}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>{player.position}</TableCell>
//                           <TableCell>
//                             <div className="flex items-center gap-2">
//                               <div className="w-16 bg-gray-200 rounded-full h-2">
//                                 <div
//                                   className="bg-green-600 h-2 rounded-full"
//                                   style={{ width: `${player.attendance}%` }}
//                                 />
//                               </div>
//                               <span className="text-sm">{player.attendance}%</span>
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant={player.status === "Active" ? "default" : "secondary"}>
//                               {player.status}
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" size="sm">
//                                   <MoreHorizontal className="w-4 h-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuItem>
//                                   <Edit className="w-4 h-4 mr-2" />
//                                   Edit Player
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem className="text-red-600">
//                                   <Trash2 className="w-4 h-4 mr-2" />
//                                   Remove Player
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </AdminLayout>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AdminLayout } from "@/components/dashboard/AdminLayout";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

interface Player {
  id: string;
  name: string;
  age?: number;
  category: string;
  position: string;
  joinDate?: string;
  attendance: number;
  phone?: string;
  status: string;
  playerId: string;
}

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    senior: 0,
    junior: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = getToken();

        if (!token) {
          toast.error("Please log in to view players.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
          return;
        }

        const response = await axios.get("/api/all-players", {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;

        if (data.statusCode === "00") {
          const mappedPlayers: Player[] = data.players.map((player: {
            id: string;
            fullName: string;
            category: string;
            position: string;
            attendance: number;
            status: string;
            playerId: string;
          }) => ({
            id: player.id,
            name: player.fullName,
            category: player.category,
            position: player.position,
            attendance: player.attendance,
            status: player.status,
            playerId: player.playerId,
            age: undefined,
            joinDate: undefined,
            phone: undefined,
          }));

          setPlayers(mappedPlayers);
          setStats({
            total: data.totalPlayers,
            senior: data.seniorCount,
            junior: data.juniorCount,
            active: data.activePlayers,
          });
          toast.success("Players retrieved successfully!");
        } else {
          toast.error(data.message || "Failed to fetch players");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              toast.error("Session expired. Please log in again.");
              setTimeout(() => {
                router.push("/auth/login");
              }, 2000);
            } else {
              toast.error(error.response.data?.message || "Failed to fetch players");
            }
          } else if (error.request) {
            toast.error("No response from server. Please try again later.");
          } else {
            toast.error(error.message || "An error occurred while fetching players");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [router]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.playerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || player.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleRowClick = (playerId: string) => {
    router.push(`/admin/players/${playerId}/achievements`);
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
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Loading players...
                      </TableCell>
                    </TableRow>
                  ) : filteredPlayers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No players found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPlayers.map((player) => (
                      <TableRow 
                        key={player.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleRowClick(player.id)}
                      >
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
                              {player.age && <p className="text-sm text-gray-600">Age: {player.age}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{player.playerId}</TableCell>
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
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${player.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm">{player.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={player.status === "Active" ? "default" : "secondary"}>
                            {player.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}