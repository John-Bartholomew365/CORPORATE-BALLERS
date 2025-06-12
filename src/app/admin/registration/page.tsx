// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { UserPlus, ChevronLeft, ChevronRight, Search, MoreVertical } from "lucide-react";
// import { AdminLayout } from "@/components/dashboard/AdminLayout";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Textarea } from "@/components/ui/textarea";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getToken } from "@/app/reuseables/authToken";
// import { useRouter } from "next/navigation";

// type Registration = {
//     id: string;
//     name: string;
//     age?: number;
//     category: string;
//     date: string;
//     status: "Approved" | "Pending" | "Rejected";
//     position: string;
//     parentName: string;
// };

// export default function RegistrationPage() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
//     const [loading, setLoading] = useState(true);
//     const registrationsPerPage = 10;
//     const router = useRouter();

//     useEffect(() => {
//         const fetchRegistrations = async () => {
//             try {
//                 const token = getToken();
//                 console.log("RegistrationPage: Token for API call:", token); // Debug: Log token

//                 if (!token) {
//                     toast.error("Please log in to view registrations.");
//                     setTimeout(() => {
//                         router.push("/auth/login");
//                     }, 2000);
//                     return;
//                 }

//                 const response = await axios.get("/api/all-players", {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });

//                 const data = response.data;
//                 console.log("RegistrationPage: API response:", data); // Debug: Log response

//                 if (data.statusCode === "00") {
//                     type PlayerApiResponse = {
//                         id: string;
//                         fullName: string;
//                         category: string;
//                         status: string;
//                         position: string;
//                     };
//                     const mappedRegistrations: Registration[] = data.players.map((player: PlayerApiResponse) => ({
//                         id: player.id,
//                         name: player.fullName,
//                         age: undefined, // Not in API response
//                         category: player.category,
//                         date: new Date().toISOString().split("T")[0], // Default to today
//                         status: player.status === "Active" ? "Approved" : (player.status as "Approved" | "Pending" | "Rejected"),
//                         position: player.position,
//                         parentName: "", // Not in API response
//                     }));

//                     setAllRegistrations(mappedRegistrations);
//                     toast.success("Registrations retrieved successfully!");
//                 } else {
//                     toast.error(data.message || "Failed to fetch registrations");
//                 }
//             } catch (error) {
//                 console.error("RegistrationPage: Fetch registrations error:", error);
//                 if (axios.isAxiosError(error)) {
//                     if (error.response) {
//                         if (error.response.status === 401) {
//                             toast.error("Session expired. Please log in again.");
//                             setTimeout(() => {
//                                 router.push("/auth/login");
//                             }, 2000);
//                         } else {
//                             toast.error(error.response.data?.message || "Failed to fetch registrations");
//                         }
//                     } else if (error.request) {
//                         toast.error("No response from server. Please try again later.");
//                     } else {
//                         toast.error(error.message || "An error occurred while fetching registrations");
//                     }
//                 } else {
//                     toast.error("An unexpected error occurred");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRegistrations();
//     }, [router]);

//     // Filter registrations based on search query
//     const filteredRegistrations = allRegistrations.filter(
//         (reg) =>
//             reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             reg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             reg.parentName.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Pagination logic
//     const indexOfLastRegistration = currentPage * registrationsPerPage;
//     const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
//     const currentRegistrations = filteredRegistrations.slice(indexOfFirstRegistration, indexOfLastRegistration);
//     const totalPages = Math.ceil(filteredRegistrations.length / registrationsPerPage);

//     // Registration stats
//     const registrationStats = {
//         total: allRegistrations.length,
//         approved: allRegistrations.filter((r) => r.status === "Approved").length,
//         pending: allRegistrations.filter((r) => r.status === "Pending").length,
//         rejected: allRegistrations.filter((r) => r.status === "Rejected").length,
//         thisMonth: allRegistrations.filter((r) => {
//             const regDate = new Date(r.date);
//             const now = new Date();
//             return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
//         }).length,
//     };

//     // Status change handler (Verify/Reject)
//     const handleStatusChange = async (id: string, newStatus: "Approved" | "Pending" | "Rejected") => {
//         try {
//             const token = getToken();
//             console.log("RegistrationPage: Token for status change:", token); // Debug: Log token

//             if (!token) {
//                 toast.error("Please log in to perform this action.");
//                 setTimeout(() => {
//                     router.push("/auth/login");
//                 }, 2000);
//                 return;
//             }

//             if (newStatus === "Pending") {
//                 // No API call for Pending; just update locally
//                 setAllRegistrations((prev) =>
//                     prev.map((reg) => (reg.id === id ? { ...reg, status: newStatus } : reg))
//                 );
//                 toast.success("Registration status set to Pending");
//                 return;
//             }

//             const endpoint = newStatus === "Approved"
//                 ? `/api/verify-player?id=${id}`
//                 : `/api/reject-player?id=${id}`;

//             const response = await axios({
//                 method: newStatus === "Approved" ? "PATCH" : "DELETE",
//                 url: endpoint,
//                 headers: {
//                     Authorization: token,
//                 },
//             });

//             const data = response.data;
//             console.log("RegistrationPage: Status change response:", data); // Debug: Log response

//             if (data.statusCode === "00") {
//                 // Refresh registrations after status change
//                 const refreshResponse = await axios.get("/api/all-players", {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });

//                 if (refreshResponse.data.statusCode === "00") {
//                     type PlayerApiResponse = {
//                         id: string;
//                         fullName: string;
//                         category: string;
//                         status: string;
//                         position: string;
//                     };
//                     const updatedRegistrations: Registration[] = refreshResponse.data.players.map((player: PlayerApiResponse) => ({
//                         id: player.id,
//                         name: player.fullName,
//                         age: undefined,
//                         category: player.category,
//                         date: new Date().toISOString().split("T")[0],
//                         status: player.status === "Active" ? "Approved" : (player.status as "Approved" | "Pending" | "Rejected"),
//                         position: player.position,
//                         parentName: "",
//                     }));
//                     setAllRegistrations(updatedRegistrations);
//                     toast.success(`Registration ${newStatus.toLowerCase()} successfully!`);
//                 } else {
//                     toast.error(refreshResponse.data.message || "Failed to refresh registrations");
//                 }
//             } else {
//                 toast.error(data.message || `Failed to ${newStatus.toLowerCase()} registration`);
//             }
//         } catch (error) {
//             console.error("RegistrationPage: Status change error:", error);
//             if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                     if (error.response.status === 401) {
//                         toast.error("Session expired. Please log in again.");
//                         setTimeout(() => {
//                             router.push("/auth/login");
//                         }, 2000);
//                     } else {
//                         toast.error(error.response.data?.message || `Failed to ${newStatus.toLowerCase()} registration`);
//                     }
//                 } else if (error.request) {
//                     toast.error("No response from server. Please try again later.");
//                 } else {
//                     toast.error(error.message || "An error occurred during status change");
//                 }
//             } else {
//                 toast.error("An unexpected error occurred");
//             }
//         }
//     };

//     return (
//         <AdminLayout>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//             <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">Player Registrations</h1>
//                         <p className="text-gray-600">Manage player registrations for the academy</p>
//                     </div>
//                     <RegistrationModal
//                         onNewRegistration={(newReg) => {
//                             setAllRegistrations([newReg, ...allRegistrations]);
//                         }}
//                     />
//                 </div>

//                 {/* Registration Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                     <Card>
//                         <CardContent className="p-6">
//                             <div className="text-2xl font-bold">{registrationStats.total}</div>
//                             <p className="text-sm text-muted-foreground">Total Players</p>
//                         </CardContent>
//                     </Card>
//                     <Card>
//                         <CardContent className="p-6">
//                             <div className="text-2xl font-bold text-green-600">{registrationStats.approved}</div>
//                             <p className="text-sm text-muted-foreground">Approved</p>
//                         </CardContent>
//                     </Card>
//                     <Card>
//                         <CardContent className="p-6">
//                             <div className="text-2xl font-bold text-yellow-600">{registrationStats.pending}</div>
//                             <p className="text-sm text-muted-foreground">Pending</p>
//                         </CardContent>
//                     </Card>
//                     <Card>
//                         <CardContent className="p-6">
//                             <div className="text-2xl font-bold text-red-600">{registrationStats.rejected}</div>
//                             <p className="text-sm text-muted-foreground">Rejected</p>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* Registrations Table */}
//                 <Card>
//                     <CardHeader>
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <CardTitle>All Registrations</CardTitle>
//                                 <CardDescription className="text-[#B0B3B8] mt-1">View and manage player registrations</CardDescription>
//                             </div>
//                             <div className="relative w-64 outline-none">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                                 <Input
//                                     placeholder="Search registrations..."
//                                     className="pl-10"
//                                     value={searchQuery}
//                                     onChange={(e) => {
//                                         setSearchQuery(e.target.value);
//                                         setCurrentPage(1);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="border rounded-lg overflow-hidden">
//                             <Table>
//                                 <TableHeader className="bg-gray-50">
//                                     <TableRow>
//                                         <TableHead>Player</TableHead>
//                                         <TableHead>ID</TableHead>
//                                         <TableHead>Age</TableHead>
//                                         <TableHead>Category</TableHead>
//                                         <TableHead>Position</TableHead>
//                                         <TableHead>Parent</TableHead>
//                                         <TableHead>Date</TableHead>
//                                         <TableHead>Status</TableHead>
//                                         <TableHead>Actions</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {loading ? (
//                                         <TableRow>
//                                             <TableCell colSpan={9} className="text-center py-8">
//                                                 Loading registrations...
//                                             </TableCell>
//                                         </TableRow>
//                                     ) : currentRegistrations.length > 0 ? (
//                                         currentRegistrations.map((registration) => (
//                                             <TableRow key={registration.id}>
//                                                 <TableCell className="font-medium">{registration.name}</TableCell>
//                                                 <TableCell>{registration.id}</TableCell>
//                                                 <TableCell>{registration.age || "N/A"}</TableCell>
//                                                 <TableCell>
//                                                     <Badge variant={registration.category === "Senior" ? "default" : "secondary"}>
//                                                         {registration.category}
//                                                     </Badge>
//                                                 </TableCell>
//                                                 <TableCell>{registration.position}</TableCell>
//                                                 <TableCell>{registration.parentName || "N/A"}</TableCell>
//                                                 <TableCell>{new Date(registration.date).toLocaleDateString()}</TableCell>
//                                                 <TableCell>
//                                                     <Badge
//                                                         className={
//                                                             registration.status === "Approved"
//                                                                 ? "bg-green-100 text-green-800 hover:bg-green-200"
//                                                                 : registration.status === "Pending"
//                                                                     ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
//                                                                     : "bg-red-100 text-red-800 hover:bg-red-200"
//                                                         }
//                                                     >
//                                                         {registration.status}
//                                                     </Badge>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <DropdownMenu>
//                                                         <DropdownMenuTrigger asChild>
//                                                             <Button variant="ghost" size="sm">
//                                                                 <MoreVertical className="h-4 w-4" />
//                                                             </Button>
//                                                         </DropdownMenuTrigger>
//                                                         <DropdownMenuContent align="end">
//                                                             <DropdownMenuItem
//                                                                 className="text-green-600 focus:bg-green-50"
//                                                                 onClick={() => handleStatusChange(registration.id, "Approved")}
//                                                             >
//                                                                 Approve
//                                                             </DropdownMenuItem>
//                                                             <DropdownMenuItem
//                                                                 className="text-yellow-600 focus:bg-yellow-50"
//                                                                 onClick={() => handleStatusChange(registration.id, "Pending")}
//                                                             >
//                                                                 Set Pending
//                                                             </DropdownMenuItem>
//                                                             <DropdownMenuItem
//                                                                 className="text-red-600 focus:bg-red-50"
//                                                                 onClick={() => handleStatusChange(registration.id, "Rejected")}
//                                                             >
//                                                                 Reject
//                                                             </DropdownMenuItem>
//                                                         </DropdownMenuContent>
//                                                     </DropdownMenu>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))
//                                     ) : (
//                                         <TableRow>
//                                             <TableCell colSpan={9} className="text-center py-8">
//                                                 <div className="flex flex-col items-center justify-center space-y-2">
//                                                     <Search className="w-8 h-8 text-gray-400" />
//                                                     <p className="text-gray-500">No registrations found</p>
//                                                 </div>
//                                             </TableCell>
//                                         </TableRow>
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </div>

//                         {/* Pagination */}
//                         {filteredRegistrations.length > registrationsPerPage && (
//                             <div className="mt-4 flex justify-between items-center">
//                                 <div className="text-sm text-gray-500">
//                                     Showing {indexOfFirstRegistration + 1}-
//                                     {Math.min(indexOfLastRegistration, filteredRegistrations.length)} of{" "}
//                                     {filteredRegistrations.length} registrations
//                                 </div>
//                                 <Pagination>
//                                     <PaginationContent>
//                                         <PaginationItem>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 disabled={currentPage === 1}
//                                                 onClick={() => setCurrentPage(currentPage - 1)}
//                                             >
//                                                 <ChevronLeft className="h-4 w-4" />
//                                             </Button>
//                                         </PaginationItem>
//                                         <PaginationItem>
//                                             <span className="text-sm">
//                                                 Page {currentPage} of {totalPages}
//                                             </span>
//                                         </PaginationItem>
//                                         <PaginationItem>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 disabled={currentPage === totalPages}
//                                                 onClick={() => setCurrentPage(currentPage + 1)}
//                                             >
//                                                 <ChevronRight className="h-4 w-4" />
//                                             </Button>
//                                         </PaginationItem>
//                                     </PaginationContent>
//                                 </Pagination>
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </AdminLayout>
//     );
// }

// function RegistrationModal({ onNewRegistration }: { onNewRegistration: (reg: Registration) => void }) {
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         age: "",
//         category: "",
//         position: "",
//         parentName: "",
//         parentPhone: "",
//         address: "",
//         medicalInfo: "",
//     });
//     const [submitting, setSubmitting] = useState(false);
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setSubmitting(true);

//         try {
//             const token = getToken();
//             console.log("RegistrationModal: Token for API call:", token); // Debug: Log token

//             if (!token) {
//                 toast.error("Please log in to register a player.");
//                 setTimeout(() => {
//                     router.push("/auth/login");
//                 }, 2000);
//                 return;
//             }

//             const response = await axios.post(
//                 "/api/add-player",
//                 {
//                     firstName: formData.firstName,
//                     lastName: formData.lastName,
//                     age: parseInt(formData.age),
//                     category: formData.category === "junior" ? "Junior" : "Senior",
//                     position: formData.position,
//                     parentName: formData.parentName,
//                     parentPhone: formData.parentPhone,
//                     address: formData.address,
//                     medicalInfo: formData.medicalInfo,
//                 },
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 }
//             );

//             const data = response.data;
//             console.log("RegistrationModal: API response:", data); // Debug: Log response

//             if (data.statusCode === "00") {
//                 const newRegistration: Registration = {
//                     id: data.player.id, // Assuming backend returns player object with id
//                     name: `${formData.firstName} ${formData.lastName}`,
//                     age: parseInt(formData.age),
//                     category: formData.category === "junior" ? "Junior" : "Senior",
//                     date: new Date().toISOString().split("T")[0],
//                     status: "Pending",
//                     position: formData.position,
//                     parentName: formData.parentName,
//                 };
//                 onNewRegistration(newRegistration);
//                 toast.success("Player registered successfully!");
//                 setFormData({
//                     firstName: "",
//                     lastName: "",
//                     age: "",
//                     category: "",
//                     position: "",
//                     parentName: "",
//                     parentPhone: "",
//                     address: "",
//                     medicalInfo: "",
//                 });
//                 setOpen(false);
//             } else {
//                 toast.error(data.message || "Failed to register player");
//             }
//         } catch (error) {
//             console.error("RegistrationModal: Submit error:", error);
//             if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                     if (error.response.status === 401) {
//                         toast.error("Session expired. Please log in again.");
//                         setTimeout(() => {
//                             router.push("/auth/login");
//                         }, 2000);
//                     } else {
//                         toast.error(error.response.data?.message || "Failed to register player");
//                     }
//                 } else if (error.request) {
//                     toast.error("No response from server. Please try again later.");
//                 } else {
//                     toast.error(error.message || "An error occurred during registration");
//                 }
//             } else {
//                 toast.error("An unexpected error occurred");
//             }
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild className="bg-[#0F0F0F] text-white cursor-pointer">
//                 <Button>
//                     <UserPlus className="w-4 h-4 mr-2" />
//                     Register a Player
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[600px] bg-[#FAFAFA]">
//                 <DialogHeader>
//                     <DialogTitle className="flex flex-row items-center gap-2">
//                         <UserPlus className="w-5 h-5" />
//                         New Player Registration
//                     </DialogTitle>
//                 </DialogHeader>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="firstName">First Name</Label>
//                             <Input
//                                 id="firstName"
//                                 value={formData.firstName}
//                                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="lastName">Last Name</Label>
//                             <Input
//                                 id="lastName"
//                                 value={formData.lastName}
//                                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="age">Age</Label>
//                             <Input
//                                 id="age"
//                                 type="number"
//                                 min="12"
//                                 max="25"
//                                 value={formData.age}
//                                 onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="category">Category</Label>
//                             <Select
//                                 value={formData.category}
//                                 onValueChange={(value) => setFormData({ ...formData, category: value })}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="junior">Junior (12-17 years)</SelectItem>
//                                     <SelectItem value="senior">Senior (18+ years)</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="position">Preferred Position</Label>
//                             <Select
//                                 value={formData.position}
//                                 onValueChange={(value) => setFormData({ ...formData, position: value })}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select position" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
//                                     <SelectItem value="Defender">Defender</SelectItem>
//                                     <SelectItem value="Midfielder">Midfielder</SelectItem>
//                                     <SelectItem value="Winger">Winger</SelectItem>
//                                     <SelectItem value="Forward">Forward</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="parentName">Parent/Guardian Name</Label>
//                             <Input
//                                 id="parentName"
//                                 value={formData.parentName}
//                                 onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
//                             <Input
//                                 id="parentPhone"
//                                 type="tel"
//                                 value={formData.parentPhone}
//                                 onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="address">Address</Label>
//                         <Textarea
//                             id="address"
//                             value={formData.address}
//                             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                             required
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="medicalInfo" className="outline-none">
//                             Medical Information (Optional)
//                         </Label>
//                         <Textarea
//                             id="medicalInfo"
//                             placeholder="Any medical conditions, allergies, or special requirements..."
//                             value={formData.medicalInfo}
//                             onChange={(e) => setFormData({ ...formData, medicalInfo: e.target.value })}
//                         />
//                     </div>

//                     <Button
//                         type="submit"
//                         className="w-full mt-4 bg-[#0F0F0F] cursor-pointer text-white hover:bg-[#1A1A1A]"
//                         disabled={submitting}
//                     >
//                         {submitting ? "Registering..." : "Register Player"}
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }






"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserPlus, ChevronLeft, ChevronRight, Search, MoreVertical } from "lucide-react";
import { AdminLayout } from "@/components/dashboard/AdminLayout";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

type Registration = {
    id: string;
    name: string;
    age?: number; // Age is optional but will be provided by API
    category: string;
    date: string;
    status: "Approved" | "Pending" | "Rejected";
    position: string;
    parentName: string;
};

export default function RegistrationPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const registrationsPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const token = getToken();
                console.log("RegistrationPage: Token for API call:", token); // Debug: Log token

                if (!token) {
                    toast.error("Please log in to view registrations.");
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
                console.log("RegistrationPage: API response:", data); // Debug: Log response

                if (data.statusCode === "00") {
                    type PlayerApiResponse = {
                        id: string;
                        fullName: string;
                        age: number; // Added age field
                        category: string;
                        status: string;
                        position: string;
                        playerId: string;
                        attendance: number;
                    };
                    const mappedRegistrations: Registration[] = data.players.map((player: PlayerApiResponse) => ({
                        id: player.id,
                        name: player.fullName,
                        age: player.age,
                        category: player.category,
                        date: new Date().toISOString().split("T")[0], // Default to today
                        status: player.status === "Active" ? "Approved" : (player.status as "Approved" | "Pending" | "Rejected"),
                        position: player.position,
                        parentName: "", // Not in API response
                    }));

                    setAllRegistrations(mappedRegistrations);
                    toast.success("Registrations retrieved successfully!");
                } else {
                    toast.error(data.message || "Failed to fetch registrations");
                }
            } catch (error) {
                console.error("RegistrationPage: Fetch registrations error:", error);
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            toast.error("Session expired. Please log in again.");
                            setTimeout(() => {
                                router.push("/auth/login");
                            }, 2000);
                        } else {
                            toast.error(error.response.data?.message || "Failed to fetch registrations");
                        }
                    } else if (error.request) {
                        toast.error("No response from server. Please try again later.");
                    } else {
                        toast.error(error.message || "An error occurred while fetching registrations");
                    }
                } else {
                    toast.error("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [router]);

    // Filter registrations based on search query
    const filteredRegistrations = allRegistrations.filter(
        (reg) =>
            reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reg.parentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRegistration = currentPage * registrationsPerPage;
    const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
    const currentRegistrations = filteredRegistrations.slice(indexOfFirstRegistration, indexOfLastRegistration);
    const totalPages = Math.ceil(filteredRegistrations.length / registrationsPerPage);

    // Registration stats
    const registrationStats = {
        total: allRegistrations.length,
        approved: allRegistrations.filter((r) => r.status === "Approved").length,
        pending: allRegistrations.filter((r) => r.status === "Pending").length,
        rejected: allRegistrations.filter((r) => r.status === "Rejected").length,
        thisMonth: allRegistrations.filter((r) => {
            const regDate = new Date(r.date);
            const now = new Date();
            return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
        }).length,
    };

    // Status change handler (Verify/Reject)
    const handleStatusChange = async (id: string, newStatus: "Approved" | "Pending" | "Rejected") => {
        try {
            const token = getToken();
            console.log("RegistrationPage: Token for status change:", token); // Debug: Log token

            if (!token) {
                toast.error("Please log in to perform this action.");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
                return;
            }

            if (newStatus === "Pending") {
                // No API call for Pending; just update locally
                setAllRegistrations((prev) =>
                    prev.map((reg) => (reg.id === id ? { ...reg, status: newStatus } : reg))
                );
                toast.success("Registration status set to Pending");
                return;
            }

            const endpoint = newStatus === "Approved"
                ? `/api/verify-player?id=${id}`
                : `/api/reject-player?id=${id}`;

            const response = await axios({
                method: newStatus === "Approved" ? "PATCH" : "DELETE",
                url: endpoint,
                headers: {
                    Authorization: token,
                },
            });

            const data = response.data;
            console.log("RegistrationPage: Status change response:", data); // Debug: Log response

            if (data.statusCode === "00") {
                // Refresh registrations after status change
                const refreshResponse = await axios.get("/api/all-players", {
                    headers: {
                        Authorization: token,
                    },
                });

                if (refreshResponse.data.statusCode === "00") {
                    type PlayerApiResponse = {
                        id: string;
                        fullName: string;
                        age: number; // Added age field
                        category: string;
                        status: string;
                        position: string;
                        playerId: string;
                        attendance: number;
                    };
                    const updatedRegistrations: Registration[] = refreshResponse.data.players.map((player: PlayerApiResponse) => ({
                        id: player.id,
                        name: player.fullName,
                        age: player.age, // Map age from API response
                        category: player.category,
                        date: new Date().toISOString().split("T")[0],
                        status: player.status === "Active" ? "Approved" : (player.status as "Approved" | "Pending" | "Rejected"),
                        position: player.position,
                        parentName: "",
                    }));
                    setAllRegistrations(updatedRegistrations);
                    toast.success(`Registration ${newStatus.toLowerCase()} successfully!`);
                } else {
                    toast.error(refreshResponse.data.message || "Failed to refresh registrations");
                }
            } else {
                toast.error(data.message || `Failed to ${newStatus.toLowerCase()} registration`);
            }
        } catch (error) {
            console.error("RegistrationPage: Status change error:", error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Session expired. Please log in again.");
                        setTimeout(() => {
                            router.push("/auth/login");
                        }, 2000);
                    } else {
                        toast.error(error.response.data?.message || `Failed to ${newStatus.toLowerCase()} registration`);
                    }
                } else if (error.request) {
                    toast.error("No response from server. Please try again later.");
                } else {
                    toast.error(error.message || "An error occurred during status change");
                }
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
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Player Registrations</h1>
                        <p className="text-gray-600">Manage player registrations for the academy</p>
                    </div>
                    <RegistrationModal
                        onNewRegistration={(newReg) => {
                            setAllRegistrations([newReg, ...allRegistrations]);
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
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
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
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="text-center py-8">
                                                Loading registrations...
                                            </TableCell>
                                        </TableRow>
                                    ) : currentRegistrations.length > 0 ? (
                                        currentRegistrations.map((registration) => (
                                            <TableRow key={registration.id}>
                                                <TableCell className="font-medium">{registration.name}</TableCell>
                                                <TableCell>{registration.id}</TableCell>
                                                <TableCell>{registration.age ?? "N/A"}</TableCell>
                                                <TableCell>
                                                    <Badge variant={registration.category === "Senior" ? "default" : "secondary"}>
                                                        {registration.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{registration.position}</TableCell>
                                                <TableCell>{registration.parentName || "N/A"}</TableCell>
                                                <TableCell>{new Date(registration.date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            registration.status === "Approved"
                                                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                                : registration.status === "Pending"
                                                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                                                    : "bg-red-100 text-red-800 hover:bg-red-200"
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
                                    Showing {indexOfFirstRegistration + 1}-
                                    {Math.min(indexOfLastRegistration, filteredRegistrations.length)} of{" "}
                                    {filteredRegistrations.length} registrations
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
    );
}

function RegistrationModal({ onNewRegistration }: { onNewRegistration: (reg: Registration) => void }) {
    const [open, setOpen] = useState(false);
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
    });
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = getToken();
            console.log("RegistrationModal: Token for API call:", token); // Debug: Log token

            if (!token) {
                toast.error("Please log in to register a player.");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
                return;
            }

            const response = await axios.post(
                "/api/add-player",
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    age: parseInt(formData.age),
                    category: formData.category === "junior" ? "Junior" : "Senior",
                    position: formData.position,
                    parentName: formData.parentName,
                    parentPhone: formData.parentPhone,
                    address: formData.address,
                    medicalInfo: formData.medicalInfo,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const data = response.data;
            console.log("RegistrationModal: API response:", data); // Debug: Log response

            if (data.statusCode === "00") {
                const newRegistration: Registration = {
                    id: data.player.id, // Assuming backend returns player object with id
                    name: `${formData.firstName} ${formData.lastName}`,
                    age: parseInt(formData.age),
                    category: formData.category === "junior" ? "Junior" : "Senior",
                    date: new Date().toISOString().split("T")[0],
                    status: "Pending",
                    position: formData.position,
                    parentName: formData.parentName,
                };
                onNewRegistration(newRegistration);
                toast.success("Player registered successfully!");
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
                });
                setOpen(false);
            } else {
                toast.error(data.message || "Failed to register player");
            }
        } catch (error) {
            console.error("RegistrationModal: Submit error:", error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Session expired. Please log in again.");
                        setTimeout(() => {
                            router.push("/auth/login");
                        }, 2000);
                    } else {
                        toast.error(error.response.data?.message || "Failed to register player");
                    }
                } else if (error.request) {
                    toast.error("No response from server. Please try again.");
                } else {
                    toast.error(error.message || "An error occurred during registration");
                }
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setSubmitting(false);
        }
    };

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
                    <DialogTitle className="flex flex-row items-center gap-2">
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
                        <Label htmlFor="medicalInfo" className="outline-none">
                            Medical Information (Optional)
                        </Label>
                        <Textarea
                            id="medicalInfo"
                            placeholder="Any medical conditions, allergies, or special requirements..."
                            value={formData.medicalInfo}
                            onChange={(e) => setFormData({ ...formData, medicalInfo: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-[#0F0F0F] cursor-pointer text-white hover:bg-[#1A1A1A]"
                        disabled={submitting}
                    >
                        {submitting ? "Registering..." : "Register Player"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}