"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminLayout } from "@/components/dashboard/AdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format, isAfter } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

type Tournament = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  category: "Junior" | "Senior" | "Both";
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  description: string;
  teamsCount: number;
  registrationDeadline: string;
};

type ApiResponse = {
  statusCode: string;
  message: string;
  data: {
    total: number;
    statusStats: {
      Upcoming: number;
      Ongoing: number;
      Completed: number;
      Cancelled: number;
    };
    tournaments: Array<{
      _id: string;
      name: string;
      location: string;
      startDate: string;
      endDate: string;
      registrationDeadline: string;
      category: "Junior" | "Senior" | "Both";
      maxTeams: number;
      description: string;
      status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allTournaments, setAllTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const tournamentsPerPage = 8;
  const router = useRouter();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = getToken();
        if (!token) {
          toast.error("Please log in to view tournaments", {
            toastId: "auth-error",
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            router.push("/auth/login");
          }, 1500);
          return;
        }

        const response = await axios.get<ApiResponse>("/api/get-tournament", {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.statusCode === "00") {
          const mappedTournaments = response.data.data.tournaments.map((t) => ({
            id: t._id,
            name: t.name,
            location: t.location,
            startDate: t.startDate,
            endDate: t.endDate,
            category: t.category,
            status: t.status,
            description: t.description,
            teamsCount: t.maxTeams,
            registrationDeadline: t.registrationDeadline,
          }));
          setAllTournaments(mappedTournaments);
          toast.success("Tournaments loaded successfully!", {
            toastId: "fetch-success",
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(response.data.message || "Failed to fetch tournaments", {
            toastId: "fetch-error",
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.", {
              toastId: "session-error",
              position: "top-right",
              autoClose: 3000,
            });
            setTimeout(() => {
              router.push("/auth/login");
            }, 1500);
          } else {
            toast.error(error.response?.data?.message || "Failed to fetch tournaments", {
              toastId: "fetch-error",
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else {
          toast.error("An unexpected error occurred", {
            toastId: "unexpected-error",
            position: "top-right",
            autoClose: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [router]);

  const filteredTournaments = allTournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);
  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage);

  const tournamentStats = {
    total: allTournaments.length,
    upcoming: allTournaments.filter((t) => t.status === "Upcoming").length,
    ongoing: allTournaments.filter((t) => t.status === "Ongoing").length,
    completed: allTournaments.filter((t) => t.status === "Completed").length,
    junior: allTournaments.filter((t) => t.category === "Junior").length,
    senior: allTournaments.filter((t) => t.category === "Senior").length,
    both: allTournaments.filter((t) => t.category === "Both").length,
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "Upcoming" | "Ongoing" | "Completed" | "Cancelled"
  ) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to update tournament status", {
          toastId: "auth-error-status",
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
        return;
      }

      const response = await axios.patch(
        `/api/update-tournament?id=${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode === "00") {
        toast.success("Tournament status updated successfully!", {
          toastId: "status-update-success",
          position: "top-right",
          autoClose: 3000,
        });
        setAllTournaments((prev) =>
          prev.map((tournament) =>
            tournament.id === id ? { ...tournament, status: newStatus } : tournament
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update tournament status", {
          toastId: "status-update-error", 
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update tournament status", {
          toastId: "status-update-error",
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("An unexpected error occurred", {
          toastId: "unexpected-error-status",
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleNewTournament = (newTournament: Tournament) => {
    setAllTournaments([newTournament, ...allTournaments]);
  };

  return (
    <AdminLayout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {loading ? (
            <div className="space-y-3">
              <div className="h-8 w-[250px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Tournaments</h1>
                <p className="text-gray-600 lg:mt-0 mt-2">Manage football tournaments and competitions</p>
              </div>
              <TournamentRegistrationModal onNewTournament={handleNewTournament} />
            </>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-8 w-[60px] bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold">{tournamentStats.total}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Tournaments</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{tournamentStats.upcoming}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Upcoming</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{tournamentStats.ongoing}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Ongoing</p>
                </CardContent>
              </Card>
              <Card className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-xl sm:text-2xl font-bold text-gray-600">{tournamentStats.completed}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Table Card */}
        <Card>
          <CardHeader>
            {loading ? (
              <div className="flex flex-col gap-4">
                <div className="space-y-3">
                  <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-full sm:w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <CardTitle>All Tournaments</CardTitle>
                  <CardDescription className="text-[#B0B3B8]">
                    View and manage all tournaments
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tournaments..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="min-w-[150px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Location</TableHead>
                    <TableHead className="min-w-[180px]">Dates</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden xs:table-cell">Teams</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-[60px] bg-gray-200 rounded-full animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden xs:table-cell">
                          <div className="h-4 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-[80px] bg-gray-200 rounded-full animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : currentTournaments.length > 0 ? (
                    currentTournaments.map((tournament) => (
                      <TableRow key={tournament.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{tournament.name}</span>
                            <span className="text-xs text-gray-500 md:hidden">{tournament.id}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{tournament.id}</TableCell>
                        <TableCell className="hidden sm:table-cell">{tournament.location}</TableCell>
                        <TableCell>
                          {format(new Date(tournament.startDate), "dd MMM, yyyy")} -{" "}
                          {format(new Date(tournament.endDate), "dd MMM, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              tournament.category === "Junior"
                                ? "bg-[#FFFFCC] text-[#0F0F0F]"
                                : tournament.category === "Senior"
                                ? "bg-green-100 text-[#047146]"
                                : "bg-gray-100 text-gray-600"
                            }
                          >
                            {tournament.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden xs:table-cell">{tournament.teamsCount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              tournament.status === "Upcoming"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : tournament.status === "Ongoing"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : tournament.status === "Completed"
                                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {tournament.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none" asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white border-none" align="end">
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

            {!loading && filteredTournaments.length > tournamentsPerPage && (
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstTournament + 1}-
                  {Math.min(indexOfLastTournament, filteredTournaments.length)} of{" "}
                  {filteredTournaments.length} tournaments
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

      {/* Add shimmer animation CSS */}
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

function TournamentRegistrationModal({ onNewTournament }: { onNewTournament: (tournament: Tournament) => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    category: "",
    description: "",
    registrationDeadline: "",
    maxTeams: 16,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        !formData.name ||
        !formData.location ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.registrationDeadline ||
        !formData.category
      ) {
        toast.error("Please fill in all required fields", {
          toastId: "form-validation-error",
          position: "top-right",
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const registrationDeadline = new Date(formData.registrationDeadline);

      if (isAfter(startDate, endDate)) {
        toast.error("End date must be after start date", {
          toastId: "date-validation-error-1",
          position: "top-right",
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      if (isAfter(registrationDeadline, startDate)) {
        toast.error("Registration deadline must be before tournament start", {
          toastId: "date-validation-error-2",
          position: "top-right",
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      if (!isAfter(startDate, new Date())) {
        toast.error("Start date must be in the future", {
          toastId: "date-validation-error-3",
          position: "top-right",
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      const token = getToken();
      if (!token) {
        toast.error("Please log in to create a tournament", {
          toastId: "auth-error-create",
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
        return;
      }

      const payload = {
        name: formData.name,
        location: formData.location,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        registrationDeadline: new Date(formData.registrationDeadline).toISOString(),
        category: formData.category,
        maxTeams: formData.maxTeams,
        description: formData.description,
      };

      const response = await axios.post("/api/create-tournament", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.data.statusCode === "00") {
        toast.success("Tournament created successfully!", {
          toastId: "create-success",
          position: "top-right",
          autoClose: 3000,
        });
        const newTournament = {
          id: response.data.data._id,
          name: response.data.data.name,
          location: response.data.data.location,
          startDate: response.data.data.startDate,
          endDate: response.data.data.endDate,
          category: response.data.data.category,
          status: response.data.data.status,
          description: response.data.data.description,
          teamsCount: response.data.data.maxTeams,
          registrationDeadline: response.data.data.registrationDeadline,
        };
        onNewTournament(newTournament);
        setOpen(false);
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to create tournament", {
          toastId: "create-error",
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Session expired. Please log in again.", {
              toastId: "session-error-create",
              position: "top-right",
              autoClose: 3000,
            });
            setTimeout(() => {
              router.push("/auth/login");
            }, 1500);
          } else {
            toast.error(error.response.data?.message || "Failed to create tournament", {
              toastId: "create-error",
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else if (error.request) {
          toast.error("No response from server. Please try again later.", {
            toastId: "server-error",
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(error.message || "An error occurred while creating tournament", {
            toastId: "create-error",
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("An unexpected error occurred", {
          toastId: "unexpected-error-create",
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      category: "",
      description: "",
      registrationDeadline: "",
      maxTeams: 16,
    });
  };

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
              <Label htmlFor="name">Tournament Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Summer Youth Cup 2024"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g. City Stadium"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationDeadline">Registration Deadline *</Label>
              <Input
                id="registrationDeadline"
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
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
              <Label htmlFor="maxTeams">Max Teams *</Label>
              <Input
                id="maxTeams"
                type="number"
                min="4"
                max="32"
                value={formData.maxTeams}
                onChange={(e) => setFormData({ ...formData, maxTeams: parseInt(e.target.value) || 16 })}
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
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0F0F0F] cursor-pointer text-white hover:bg-[#1A1A1A]"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Tournament"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}