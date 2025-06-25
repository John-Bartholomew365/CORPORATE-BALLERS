"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
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
};

export function EditTrainingModal({ 
  session,
  onUpdate,
  onClose
}: { 
  session: TrainingSession;
  onUpdate: (updatedSession: TrainingSession) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<TrainingSession>({
    id: "",
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

  useEffect(() => {
    if (session) {
      setFormData({
        ...session,
        duration: session.duration.replace(' hours', '') // Remove 'hours' for editing
      });
    }
  }, [session]);

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

    // Validate required fields
    const requiredFields = ["day", "time", "duration", "category", "coach", "trainingType", "location"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData] && formData[field as keyof typeof formData] !== "0"
    );
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      setIsLoading(false);
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        toast.error("Please log in to update a training session.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
        return;
      }

      // Prepare payload
      const payload = {
        day: formData.day,
        time: formData.time,
        duration: formData.duration,
        category: formData.category,
        coach: formData.coach,
        trainingType: formData.trainingType,
        location: formData.location,
        description: formData.description || "",
      };

      const response = await axios.patch(`/api/update-session/${formData.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.data.statusCode === "00") {
        toast.success("Training session updated successfully!");
        onUpdate({
          ...formData,
          duration: `${formData.duration} hours` // Add 'hours' back for display
        });
        onClose();
      } else {
        toast.error(response.data.message || "Failed to update training session");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("token");
            }
            setTimeout(() => {
              router.push("/auth/login");
            }, 1500);
          } else {
            toast.error(error.response.data?.message || "Failed to update training session");
          }
        } else if (error.request) {
          toast.error("No response from server. Please try again later.");
        } else {
          toast.error(error.message || "An error occurred while updating training session");
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
    <Dialog open={!!session} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Training Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("day", value)} 
                value={formData.day}
              >
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
              <Select 
                onValueChange={(value) => handleSelectChange("category", value)} 
                value={formData.category}
              >
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
            <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0F0F0F] text-white" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Session"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}