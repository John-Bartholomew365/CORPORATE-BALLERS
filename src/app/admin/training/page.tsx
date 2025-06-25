"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Edit, Trash2 } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import { AddTrainingModal } from "./AddTrainingModal"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

type TrainingSession = {
  id: string;
  day: string;
  time: string;
  duration: string;
  category: string;
  coach: string;
  trainingType: string;
  location: string;
  description: string;
  createdAt: string;
  participants?: number;
};

type UpcomingEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
};

export default function TrainingPage() {
  const [trainingSchedule, setTrainingSchedule] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const upcomingEvents: UpcomingEvent[] = [
    {
      title: "Inter-Academy Tournament",
      date: "January 25, 2024",
      time: "10:00 AM",
      location: "Kwara State Stadium",
      category: "Senior",
    },
    {
      title: "Skills Assessment",
      date: "January 30, 2024",
      time: "4:00 PM",
      location: "CBFA Training Ground",
      category: "All",
    },
    {
      title: "Parent-Coach Meeting",
      date: "February 5, 2024",
      time: "6:00 PM",
      location: "Academy Hall",
      category: "All",
    },
  ];

  const fetchTrainingSessions = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to view training sessions.");
        setTimeout(() => router.push("/auth/login"), 2000);
        return;
      }

      const response = await axios.get("/api/create-training", {
        headers: { Authorization: token },
      });

      if (response.data.statusCode === "00") {
        const sessions = response.data.data.map((session: TrainingSession) => ({
          id: session.id,
          day: session.day,
          time: formatTime(session.time),
          duration: `${session.duration} hours`,
          category: session.category,
          coach: session.coach,
          trainingType: session.trainingType,
          location: session.location,
          participants: 0,
          description: session.description,
          createdAt: session.createdAt
        }));
        setTrainingSchedule(sessions);
        toast.success("Training sessions loaded successfully!");
      } else {
        toast.error(response.data.message || "Failed to fetch training sessions");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingSessions();
  }, [router]);

  const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    } else {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDelete = async (id: string) => {

    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to continue.");
        setTimeout(() => router.push("/auth/login"), 1500);
        return;
      }

      const response = await axios.delete(`/api/update-training?id=${id}`, {
        headers: { Authorization: token },
      });

      if (response.data.statusCode === "00") {
        toast.success("Training session deleted successfully!");
        setTrainingSchedule(prev => prev.filter(session => session.id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete training session");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleEdit = (session: TrainingSession) => {
    setSelectedSession(session);
    setIsEditModalOpen(true);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
            <p className="text-gray-600">Manage training schedules and sessions</p>
          </div>
          <AddTrainingModal onSuccess={fetchTrainingSessions} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Training Schedule</CardTitle>
            <CardDescription>Regular training sessions for all categories</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-600">Loading training sessions...</p>
            ) : trainingSchedule.length > 0 ? (
              <div className="grid gap-4">
                {trainingSchedule.map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {session.day} - {session.trainingType}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.time} ({session.duration})
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {session.participants || 0} players
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2 bg-[#F4F4F5]">
                          {session.category}
                        </Badge>
                        <p className="text-sm text-gray-600">Coach: {session.coach}</p>
                        <p className="text-sm text-gray-600">Location: {session.location}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(session)}
                            className="cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(session.id)}
                            className="cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No training sessions found.</p>
            )}
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <AddTrainingModal
          session={selectedSession ?? undefined}
          isEdit={true}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={() => {
            fetchTrainingSessions();
            setIsEditModalOpen(false);
            setSelectedSession(null);
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Special events and tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{event.date} at {event.time}</p>
                      <p>{event.location}</p>
                    </div>
                    <Badge variant="outline" className="mt-2 text-[#B0B3B8]">
                      {event.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Statistics</CardTitle>
              <CardDescription>This week&apos;s training overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Total Sessions</span>
                  <span className="text-2xl font-bold text-green-600">{trainingSchedule.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Average Attendance</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {trainingSchedule.length > 0 
                      ? Math.round(trainingSchedule.reduce((sum, session) => sum + (session.participants || 0), 0) / trainingSchedule.length)
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Training Hours</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {trainingSchedule.reduce((sum, session) => sum + parseFloat(session.duration.split(' ')[0]), 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Active Coaches</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {new Set(trainingSchedule.map(session => session.coach)).size}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}