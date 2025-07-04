"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Trophy, Target, Settings } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";
import { PlayerLayout } from "@/components/dashboard/PlayerLayout";
import Link from "next/link";

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

        if (data.statusCode === "00") {
          const user = data.user;
          setPlayerProfile({
            firstName: user.firstName,
            lastName: user.lastName,
            playerID: user.playerID,
            category: user.category,
            preferredPosition: user.preferredPosition,
            createdAt: user.createdAt,
            achievements: user.achievements || [],
          });
          toast.success("Profile loaded successfully!");
        } else {
          toast.error(data.message || "Failed to fetch profile");
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

  // Training Schedule Data
  const upcomingTraining = [
    { day: "Tuesday", date: "Jan 16", time: "4:00 PM", status: "upcoming" },
    { day: "Wednesday", date: "Jan 17", time: "4:00 PM", status: "upcoming" },
    { day: "Thursday", date: "Jan 18", time: "4:00 PM", status: "upcoming" },
    { day: "Saturday", date: "Jan 20", time: "4:30 PM", status: "upcoming" },
    { day: "Sunday", date: "Jan 21", time: "4:30 PM", status: "upcoming" },
  ];

  // Recent Performance Data
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
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Player Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {playerProfile ? `${playerProfile.firstName} ${playerProfile.lastName}` : "Player"}!
            </p>
          </div>
          <Link href="/player/profile">
            <Button variant="outline" size="sm" className="bg-transparent cursor-pointer">
              <Settings className="w-4 h-4 mr-1" />
              Profile settings
            </Button>
          </Link>
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
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border border-[#B0B3B8]">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">
                    {`${playerProfile.firstName[0]}${playerProfile.lastName[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 w-full sm:w-auto">
                  <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
                    {`${playerProfile.firstName} ${playerProfile.lastName}`}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
                    Player ID: {playerProfile.playerID}
                  </p>
                  <div className="flex justify-center sm:justify-start gap-2 sm:gap-4 mt-2">
                    <Badge variant="secondary" className="border border-[#B0B3B8] text-[#B0B3B8]">
                      {playerProfile.category}
                    </Badge>
                    <Badge variant="outline" className="text-[#B0B3B8]">
                      {playerProfile.preferredPosition}
                    </Badge>
                  </div>
                </div>
                <div className="text-center sm:text-right w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Joined: {new Date(playerProfile.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">Failed to load profile.</p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{session.day}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{session.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm sm:text-base">{session.time}</p>
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
              <div className="space-y-3 sm:space-y-4">
                {recentPerformance.map((performance, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{performance.session}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{performance.rating}</span>
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{performance.notes}</p>
                    <p className="text-xs text-gray-500">{performance.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {playerProfile.achievements.map((achievement, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                      <h4 className="font-medium text-sm sm:text-base">{achievement.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No achievements yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Academy Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academy Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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