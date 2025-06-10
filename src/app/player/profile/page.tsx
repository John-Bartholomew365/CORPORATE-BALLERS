"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Edit, Save, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { PlayerLayout } from "@/components/dashboard/PlayerLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/app/reuseables/authToken";
import { useRouter } from "next/navigation";

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyName: string;
  bio: string;
};

type PlayerInfo = {
  id: string;
  category: string;
  position: string;
  joinDate: string;
  age: number;
  height: string;
  weight: string;
  preferredFoot: string;
  jerseyNumber: number;
};

export default function PlayerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyName: "",
    bio: "",
  });
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    id: "",
    category: "",
    position: "",
    joinDate: "",
    age: 0,
    height: "",
    weight: "",
    preferredFoot: "",
    jerseyNumber: 0,
  });
  const [avatar, setAvatar] = useState("/placeholder.svg?height=96&width=96");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        console.log("PlayerProfilePage: Token for API call:", token); // Debug: Log token

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
        console.log("PlayerProfilePage: API response:", data); // Debug: Log response

        if (data.statusCode === "00") {
          const user = data.user;
          setProfileData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            address: user.address || "",
            emergencyContact: user.emergencyContact?.contactPhone || "",
            emergencyName: user.emergencyContact?.contactName || "",
            bio: user.bio || "", // Default to empty if not provided
          });
          setPlayerInfo({
            id: user.playerID || "",
            category: user.category || "",
            position: user.preferredPosition || "",
            joinDate: user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : "",
            age: user.dateOfBirth
              ? Math.floor(
                (new Date().getTime() - new Date(user.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
              )
              : 0,
            height: user.height || "", // Default to empty if not provided
            weight: user.weight || "", // Default to empty if not provided
            preferredFoot: user.preferredFoot || "",
            jerseyNumber: user.jerseyNumber || 0, // Default to 0 if not provided
          });
          setAvatar(user.profilePicture || "/placeholder.svg?height=96&width=96");
          toast.success("Profile loaded successfully!");
        } else {
          toast.error(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("PlayerProfilePage: Fetch profile error:", error);
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

  const handleSave = async () => {
    try {
      const token = getToken();
      console.log("PlayerProfilePage: Token for update:", token); // Debug: Log token

      if (!token) {
        toast.error("Please log in to update your profile.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
        return;
      }

      const response = await axios.patch(
        "/api/update-profile",
        {
          profilePicture: avatar,
          bio: profileData.bio,
          jerseyNumber: playerInfo.jerseyNumber,
          age: playerInfo.age,
          height: playerInfo.height,
          weight: playerInfo.weight,
          preferredFoot: playerInfo.preferredFoot,
          preferredPosition: playerInfo.position,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phoneNumber: profileData.phone,
          address: profileData.address,
          emergencyContact: {
            contactName: profileData.emergencyName,
            contactPhone: profileData.emergencyContact,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;
      console.log("PlayerProfilePage: Update response:", data); // Debug: Log response

      if (data.statusCode === "00") {
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("PlayerProfilePage: Update profile error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            setTimeout(() => {
              router.push("/auth/login");
            }, 2000);
          } else {
            toast.error(error.response.data?.message || "Failed to update profile");
          }
        } else if (error.request) {
          toast.error("No response from server. Please try again later.");
        } else {
          toast.error(error.message || "An error occurred while updating profile");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          setAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Player Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <Button
            className="bg-[#0F0F0F] text-white cursor-pointer"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {loading ? (
                  <p className="text-gray-600">Loading profile...</p>
                ) : (
                  <>
                    <div className="relative inline-block">
                      <Avatar
                        className="w-24 h-24 mx-auto mb-4 border border-[#B0B3B8] cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-2xl text-[#B0B3B8]">
                          {profileData.firstName[0] || "P"}
                          {profileData.lastName[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-gray-600 mb-2">Player ID: {playerInfo.id}</p>
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge variant="default" className="bg-[#0F0F0F] text-white">
                        {playerInfo.category}
                      </Badge>
                      <Badge variant="outline" className="text-[#B0B3B8]">
                        {playerInfo.position}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mb-4 bg-transparent"
                      onClick={handleAvatarClick}
                      disabled={!isEditing}
                    >
                      Change Photo
                    </Button>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Jersey Number:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={playerInfo.jerseyNumber || ""}
                            onChange={(e) =>
                              setPlayerInfo({ ...playerInfo, jerseyNumber: parseInt(e.target.value) || 0 })
                            }
                            className="w-16 h-6 text-right"
                          />
                        ) : (
                          <span className="font-medium">#{playerInfo.jerseyNumber || "N/A"}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Join Date:</span>
                        <span className="font-medium">{playerInfo.joinDate || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Age:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={playerInfo.age || ""}
                            onChange={(e) => setPlayerInfo({ ...playerInfo, age: parseInt(e.target.value) || 0 })}
                            className="w-16 h-6 text-right"
                          />
                        ) : (
                          <span className="font-medium">{playerInfo.age ? `${playerInfo.age} years` : "N/A"}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Physical Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Physical Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  {isEditing ? (
                    <Input
                      id="height"
                      value={playerInfo.height}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, height: e.target.value })}
                    />
                  ) : (
                    <div className="font-medium">{playerInfo.height || "N/A"}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      value={playerInfo.weight}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, weight: e.target.value })}
                    />
                  ) : (
                    <div className="font-medium">{playerInfo.weight || "N/A"}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredFoot">Preferred Foot</Label>
                  {isEditing ? (
                    <select
                      id="preferredFoot"
                      value={playerInfo.preferredFoot}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, preferredFoot: e.target.value })}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Right">Right</option>
                      <option value="Left">Left</option>
                      <option value="Both">Both</option>
                    </select>
                  ) : (
                    <div className="font-medium">{playerInfo.preferredFoot || "N/A"}</div>
                  )}
                </div>
                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <select
                      id="position"
                      value={playerInfo.position}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, position: e.target.value })}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Goalkeeper">Goalkeeper</option>
                      <option value="Defender">Defender</option>
                      <option value="Midfielder">Midfielder</option>
                      <option value="Winger">Winger</option>
                      <option value="Forward">Forward</option>
                    </select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={profileData.emergencyName}
                      onChange={(e) => setProfileData({ ...profileData, emergencyName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your goals, and aspirations..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Academy Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Academy Information</CardTitle>
              <CardDescription>Important academy details and contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Academy Address
                  </h4>
                  <p className="text-sm text-gray-600">
                    Stadium Complex, Ibrahim Taiwo Road
                    <br />
                    Ilorin, Kwara State, Nigeria
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Numbers
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>+234 8133178008</p>
                    <p>+234 8065943751</p>
                    <p>+234 8033907248</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </h4>
                  <p className="text-sm text-gray-600">corporateballersfa418@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Training Schedule
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Tue/Wed/Thu: 4:00 PM</p>
                    <p>Sat/Sun: 4:30 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PlayerLayout>
  );
}