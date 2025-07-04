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
  formattedTime: string;
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
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

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
          time: session.time,
          formattedTime: formatTime(session.time),
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
        
        const events: UpcomingEvent[] = sessions.map((session: TrainingSession): UpcomingEvent => ({
          title: session.trainingType,
          date: session.day,
          time: session.formattedTime,
          location: session.location,
          category: session.category
        }));
        
        setUpcomingEvents(events);
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
        setUpcomingEvents(prev => prev.filter(event => event.title !== trainingSchedule.find(s => s.id === id)?.trainingType));
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
        theme="light"
      />
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 lg:mt-0 mt-2">Training Management</h1>
            <p className="text-gray-600 lg:mt-0 mt-2">Manage training schedules and sessions</p>
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
              <p className="text-center text-gray-600 py-4">Loading training sessions...</p>
            ) : trainingSchedule.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {trainingSchedule.map((session) => (
                  <div key={session.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {session.day} - {session.trainingType}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
                              {session.formattedTime} ({session.duration})
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 sm:w-4 h-3 sm:h-4" />
                              {session.participants || 0} players
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <Badge variant="secondary" className="mb-1 sm:mb-2 bg-[#F4F4F5] text-xs sm:text-sm">
                          {session.category}
                        </Badge>
                        <p className="text-xs sm:text-sm text-gray-600">Coach: {session.coach}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Location: {session.location}</p>
                        <div className="flex gap-2 mt-2 justify-end sm:justify-start">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(session)}
                            className="cursor-pointer h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3"
                          >
                            <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(session.id)}
                            className="cursor-pointer h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3"
                          >
                            <Trash2 className="w-3 sm:w-4 h-3 sm:h-4 text-red-500" />
                            <span className="hidden sm:inline ml-1">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-4">No training sessions found.</p>
            )}
          </CardContent>
        </Card>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Special events and tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-gray-600 py-4">Loading upcoming events...</p>
              ) : upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-sm sm:text-base">{event.title}</h4>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">
                        <p>{event.date} at {event.time}</p>
                        <p>{event.location}</p>
                      </div>
                      <Badge variant="outline" className="mt-2 text-[#B0B3B8] text-xs sm:text-sm">
                        {event.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-4">No upcoming events found.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Statistics</CardTitle>
              <CardDescription>This week&apos;s training overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-xs sm:text-sm">Total Sessions</span>
                  <span className="block text-xl sm:text-2xl font-bold text-green-600 mt-1">
                    {trainingSchedule.length}
                  </span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-xs sm:text-sm">Avg Attendance</span>
                  <span className="block text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                    {trainingSchedule.length > 0 
                      ? Math.round(trainingSchedule.reduce((sum, session) => sum + (session.participants || 0), 0) / trainingSchedule.length)
                      : 0}
                  </span>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-xs sm:text-sm">Training Hours</span>
                  <span className="block text-xl sm:text-2xl font-bold text-purple-600 mt-1">
                    {trainingSchedule.reduce((sum, session) => sum + parseFloat(session.duration.split(' ')[0]), 0)}
                  </span>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-xs sm:text-sm">Active Coaches</span>
                  <span className="block text-xl sm:text-2xl font-bold text-orange-600 mt-1">
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