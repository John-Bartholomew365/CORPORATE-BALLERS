"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, Plus, Settings, LogOut } from "lucide-react";
import { AdminLayout } from "@/components/dashboard/AdminLayout";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, removeToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

interface Stat {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = getToken();

        if (!token) {
          toast.error("Please log in to view dashboard.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
          return;
        }

        const response = await axios.get("/api/get-dashboard", {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;

        if (data.statusCode === "00") {
          const apiStats: Stat[] = [
            {
              title: "Total Players",
              value: data.data.totalPlayers,
              change: `+${data.data.totalPlayers} this month`, // Adjust as needed
              icon: Users,
              color: "text-blue-600",
            },
            {
              title: "Verified Players",
              value: data.data.verifiedPlayers,
              change: `${data.data.verifiedPlayers} verified`,
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              title: "Unverified Players",
              value: data.data.unverifiedPlayers,
              change: `${data.data.unverifiedPlayers} pending`,
              icon: Users,
              color: "text-yellow-600",
            },
            {
              title: "Training Sessions",
              value: 5, // Manual value since not in API
              change: "per week",
              icon: Calendar,
              color: "text-purple-600",
            },
          ];
          setStats(apiStats);
          toast.success("Dashboard stats retrieved successfully!");
        } else {
          toast.error(data.message || "Failed to fetch dashboard stats");
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
              toast.error(error.response.data?.message || "Failed to fetch dashboard stats");
            }
          } else if (error.request) {
            toast.error("No response from server. Please try again later.");
          } else {
            toast.error(error.message || "An error occurred while fetching stats");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [router]);

  const handleLogout = () => {
    try {
      removeToken();
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error) {
      console.error("AdminDashboard: Logout error:", error); // Debug: Log error
      toast.error("Failed to log out. Please try again.");
    }
  };

  const recentActivities = [
    { action: "New player registered", player: "John Bartholomew", time: "2 hours ago", category: "Senior" },
    { action: "Training session completed", session: "Tuesday 4PM", time: "1 day ago", category: "All" },
    { action: "Player promoted", player: "Sarah Okafor", time: "2 days ago", category: "Junior to Senior" },
    { action: "Tournament match scheduled", match: "CBFA vs Lions FC", time: "3 days ago", category: "Senior" },
  ];

  const upcomingTraining = [
    { day: "Tuesday", time: "4:00 PM", category: "All Categories", participants: 45 },
    { day: "Wednesday", time: "4:00 PM", category: "All Categories", participants: 42 },
    { day: "Thursday", time: "4:00 PM", category: "All Categories", participants: 48 },
    { day: "Saturday", time: "4:30 PM", category: "All Categories", participants: 52 },
    { day: "Sunday", time: "4:30 PM", category: "All Categories", participants: 49 },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening at CBFA.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/settings">
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <Card className="col-span-full">
              <CardContent className="p-6 text-center">
                <p>Loading dashboard stats...</p>
              </CardContent>
            </Card>
          ) : stats.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-6 text-center">
                <p>No stats available</p>
              </CardContent>
            </Card>
          ) : (
            stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from the academy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#FFFFFF] rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.player || activity.session || activity.match}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {activity.category}
                      </Badge>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Schedule */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Training Schedule</CardTitle>
                <CardDescription>Upcoming training sessions</CardDescription>
              </div>
              <Link href="/admin/training">
                <Button size="sm" className="cursor-pointer items-center flex justify-center">
                  <Plus className="w-4 h-4 mb-1" />
                  Add Session
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTraining.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{session.day}</p>
                      <p className="text-sm text-gray-600">{session.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.participants} players</p>
                      <p className="text-xs text-gray-500">{session.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}