"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Trophy, Target, Settings, LogOut } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";
import { PlayerLayout } from "@/components/dashboard/PlayerLayout";

type PlayerProfile = {
  firstName: string;
  lastName: string;
  playerID: string;
  category: string;
  preferredPosition: string;
  createdAt: string;
  achievements: { title: string; description: string; date: string }[];
};

export default function PlayerDashboard() {
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        console.log("PlayerDashboard: Token for API call:", token); // Debug: Log token

        if (!token) {
          toast.error("Please log in to view your profile.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
          return;
        }

        const response = await axios.get("/api/get-profile", {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;
        console.log("PlayerDashboard: API response:", data); // Debug: Log response

        if (data.statusCode === "00") {
          const user = data.user;
          setPlayerProfile({
            firstName: user.firstName,
            lastName: user.lastName,
            playerID: user.playerID,
            category: user.category,
            preferredPosition: user.preferredPosition,
            createdAt: user.createdAt,
            achievements: user.achievements || [], // Default to empty array
          });
          toast.success("Profile loaded successfully!");
        } else {
          toast.error(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("PlayerDashboard: Fetch profile error:", error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              toast.error("Session expired. Please log in again.");
              setTimeout(() => {
                router.push("/auth/login");
              }, 2000);
            } else {
              toast.error(error.response.data?.message || "Failed to fetch profile");
            }
          } else if (error.request) {
            toast.error("No response from server. Please try again later.");
          } else {
            toast.error(error.message || "An error occurred while fetching profile");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Keep dummy data for Training Schedule and Recent Performance
  const upcomingTraining = [
    { day: "Tuesday", date: "Jan 16", time: "4:00 PM", status: "upcoming" },
    { day: "Wednesday", date: "Jan 17", time: "4:00 PM", status: "upcoming" },
    { day: "Thursday", date: "Jan 18", time: "4:00 PM", status: "upcoming" },
    { day: "Saturday", date: "Jan 20", time: "4:30 PM", status: "upcoming" },
    { day: "Sunday", date: "Jan 21", time: "4:30 PM", status: "upcoming" },
  ];

  const recentPerformance = [
    { date: "Jan 14", session: "Technical Training", rating: 4.5, notes: "Excellent ball control" },
    { date: "Jan 12", session: "Physical Training", rating: 4.2, notes: "Good endurance improvement" },
    { date: "Jan 10", session: "Tactical Training", rating: 4.8, notes: "Outstanding positioning" },
    { date: "Jan 7", session: "Match Practice", rating: 4.3, notes: "Great teamwork" },
  ];

  return (
    <PlayerLayout>
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
            <h1 className="text-3xl font-bold text-gray-900">Player Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {playerProfile ? `${playerProfile.firstName} ${playerProfile.lastName}` : "Player"}!
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Player Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Player Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-600">Loading profile...</p>
            ) : playerProfile ? (
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border border-[#B0B3B8]">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">
                    {`${playerProfile.firstName[0]}${playerProfile.lastName[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{`${playerProfile.firstName} ${playerProfile.lastName}`}</h3>
                  <p className="text-gray-600">Player ID: {playerProfile.playerID}</p>
                  <div className="flex gap-4 mt-2">
                    <Badge variant="secondary" className="border border-[#B0B3B8] text-[#B0B3B8]">
                      {playerProfile.category}
                    </Badge>
                    <Badge variant="outline" className="text-[#B0B3B8]">
                      {playerProfile.preferredPosition}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Joined: {new Date(playerProfile.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  {/* Comment out attendance until API provides it */}
                  {/* <div className="mt-2">
                    <p className="text-sm font-medium">Attendance Rate</p>
                    <div className="flex items-center justify-end gap-1">
                      <div className="flex items-center gap-2 mt-1 border border-[#B0B3B8] p-1 rounded-md w-20">
                        <div className="h-2 bg-gray-200 rounded" />
                      </div>
                      <span className="text-sm font-medium">N/A</span>
                    </div>
                  </div> */}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">Failed to load profile.</p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Training Schedule
              </CardTitle>
              <CardDescription>Your upcoming training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTraining.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{session.day}</p>
                        <p className="text-sm text-gray-600">{session.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{session.time}</p>
                      <Badge variant="secondary" className="text-xs">
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Recent Performance
              </CardTitle>
              <CardDescription>Your latest training evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPerformance.map((performance, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-sm">{performance.session}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{performance.notes}</p>
                        <p className="text-xs text-gray-500">{performance.date}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
</div>

{/* <!-- Achievements --> */}
<Card>
    <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
        </CardTitle>
        <CardDescription>Your recent accomplishments</CardDescription>
    </CardHeader>
    <CardContent>
        {loading ? (
            <p className="text-center text-gray-600">Loading achievements...</p>
        ) : playerProfile?.achievements && playerProfile.achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {playerProfile.achievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                            <h4 className="font-medium">{achievement.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-600">No achievements yet.</p>
        )}
    </CardContent>
</Card>

{/* <!-- Academy Information --> */}
<Card>
    <CardHeader>
        <CardTitle>Academy Information</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm text-gray-600">
                    <p>Stadium Complex, Ibrahim Taiwo Road</p>
                    <p>Ilorin, Kwara State, Nigeria</p>
                    <p>+234 8133178008</p>
                    <p>corporateballersfa418@gmail.com</p>
                </div>
            </div>
            <div>
                <h4 className="font-medium mb-2">Academy Mission</h4>
                <p className="text-sm text-gray-600">
                    To harness raw talent and nurture them to full maturity, developing them into individuals molding in their football careers while building a morally upright society through football.
                </p>
            </div>
        </div>
    </CardContent>
</Card>
</div>
</PlayerLayout>
  );
}