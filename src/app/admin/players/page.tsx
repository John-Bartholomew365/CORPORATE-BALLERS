"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
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
  verificationStatus: string;
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
            verificationStatus: string;
            playerId: string;
          }) => ({
            id: player.id,
            name: player.fullName,
            category: player.category,
            position: player.position,
            attendance: player.attendance,
            verificationStatus: player.verificationStatus,
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Player Management</h1>
                <p className="text-gray-600 lg:mt-0 mt-2">Manage all academy players and their information</p>
              </div>
              <Link href={"/admin/registration"}>
                <Button className="bg-[#0F0F0F] text-white cursor-pointer w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">Add New Player</span>
                  <span className="sm:hidden">Add Player</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-8 w-[60px] bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card className="col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Players</p>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold">{stats.senior}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Senior</p>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold">{stats.junior}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Junior</p>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold">{stats.active}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active</p>
                </CardContent>
              </Card>
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
                <CardTitle>Players List</CardTitle>
                <CardDescription>View and manage all registered players</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                <div className="relative flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full sm:w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 outline-none"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[600px] sm:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Player</TableHead>
                    <TableHead className="whitespace-nowrap hidden sm:table-cell">ID</TableHead>
                    <TableHead className="whitespace-nowrap">Category</TableHead>
                    <TableHead className="whitespace-nowrap hidden sm:table-cell">Position</TableHead>
                    <TableHead className="whitespace-nowrap">Attendance</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                              <div className="h-3 w-[60px] bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-[60px] bg-gray-200 rounded-full animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2 animate-pulse"></div>
                            <div className="h-4 w-[30px] bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-[70px] bg-gray-200 rounded-full animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-[70px] bg-gray-200 rounded-full animate-pulse"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredPlayers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Search className="w-8 h-8 text-gray-400" />
                          <p className="text-gray-500">No players found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPlayers.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="border h-8 w-8 sm:h-10 sm:w-10">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm sm:text-base">{player.name}</p>
                              {player.age && (
                                <p className="text-xs sm:text-sm text-gray-600">Age: {player.age}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm hidden sm:table-cell">
                          {player.playerId}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={player.category === "Senior" ? "default" : "secondary"}
                            className={
                              player.category === "Senior"
                                ? "bg-[#0F0F0F] text-white text-xs sm:text-sm font-[500]"
                                : "bg-[#FFFFFF] text-[#0F0F0F] border border-[#E5E5E5] text-xs sm:text-sm font-[500]"
                            }
                          >
                            {player.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {player.position}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${player.attendance}%` }}
                              />
                            </div>
                            <span className="text-xs sm:text-sm">{player.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs sm:text-sm font-[500] ${player.verificationStatus === "Approved"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : player.verificationStatus === "Rejected"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }`}
                          >
                            {player.verificationStatus || "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Link href={`/admin/players/${player.id}/achievements`}>
                            <Button variant="ghost" size="sm" className="cursor-pointer">
                              View Achievements
                            </Button>
                          </Link>
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