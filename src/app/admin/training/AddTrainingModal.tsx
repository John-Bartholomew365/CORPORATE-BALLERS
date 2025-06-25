"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

interface TrainingSession {
  id?: string;
  day: string;
  time: string;
  duration: string;
  category: string;
  coach: string;
  trainingType: string;
  location: string;
  description: string;
}

interface AddTrainingModalProps {
  session?: TrainingSession;
  isEdit?: boolean;
  onSuccess?: () => void;
  open?: boolean; // Add open prop to control modal state
  onOpenChange?: (open: boolean) => void; // Add callback for open state changes
}

export function AddTrainingModal({ session, isEdit = false, onSuccess, open: controlledOpen, onOpenChange }: AddTrainingModalProps) {
  const [formData, setFormData] = useState<TrainingSession>({
    day: "",
    time: "",
    duration: "",
    category: "All categories",
    coach: "",
    trainingType: "",
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Use controlledOpen if provided, otherwise manage internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  useEffect(() => {
    if (isEdit && session) {
      setFormData({
        id: session.id,
        day: session.day,
        time: session.time.includes(' ') ? session.time.split(' ')[0] : session.time, // Handle both formats
        duration: session.duration.split(' ')[0],
        category: session.category,
        coach: session.coach,
        trainingType: session.trainingType,
        location: session.location,
        description: session.description || "",
      });
      // Ensure modal opens when editing
      setIsOpen(true);
    }
  }, [isEdit, session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = ["day", "time", "duration", "category", "coach", "trainingType", "location"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      setIsLoading(false);
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        toast.error("Please log in to continue.");
        setTimeout(() => router.push("/auth/login"), 1500);
        return;
      }

      const payload = {
        day: formData.day,
        time: formData.time,
        duration: formData.duration,
        category: formData.category,
        coach: formData.coach,
        trainingType: formData.trainingType,
        location: formData.location,
        description: formData.description,
      };

      let response;
      if (isEdit && session?.id) {
        response = await axios.patch(`/api/update-training?id=${session.id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
      } else {
        response = await axios.post("/api/create-training", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
      }

      if (response.data.statusCode === "00") {
        toast.success(isEdit ? "Training session updated successfully!" : "Training session added successfully!");
        setFormData({
          day: "",
          time: "",
          duration: "",
          category: "All categories",
          coach: "",
          trainingType: "",
          location: "",
          description: "",
        });
        setIsOpen(false);
        onSuccess?.();
      } else {
        toast.error(response.data.message || `Failed to ${isEdit ? 'update' : 'add'} training session`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          sessionStorage.removeItem("token");
          setTimeout(() => router.push("/auth/login"), 1500);
        } else {
          toast.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'add'} training session`);
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const categories = ["All categories", "Junior", "Senior"];

  return (
    <>
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {!isEdit && (
          <DialogTrigger asChild>
            <Button className="bg-[#0F0F0F] text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Training Session
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Training Session" : "Add New Training Session"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select onValueChange={(value) => handleSelectChange("day", value)} value={formData.day}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="4"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coach">Coach</Label>
                <Input
                  id="coach"
                  name="coach"
                  type="text"
                  value={formData.coach}
                  onChange={handleChange}
                  placeholder="Enter coach name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainingType">Training Type</Label>
                <Input
                  id="trainingType"
                  name="trainingType"
                  type="text"
                  value={formData.trainingType}
                  onChange={handleChange}
                  placeholder="Enter training type"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional details about the session"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#0F0F0F] text-white cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : isEdit ? "Update Session" : "Save Session"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}