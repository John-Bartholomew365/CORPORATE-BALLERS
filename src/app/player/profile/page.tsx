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
import { toast } from "react-toastify";
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
          setProfileData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            address: user.address || "",
            emergencyContact: user.emergencyContact?.contactPhone || "",
            emergencyName: user.emergencyContact?.contactName || "",
            bio: user.bio || "",
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
            height: user.height || "",
            weight: user.weight || "",
            preferredFoot: user.preferredFoot || "",
            jerseyNumber: user.jerseyNumber || 0,
          });
          setAvatar(user.profilePicture || "/placeholder.svg?height=96&width=96");
          toast.success("Profile loaded successfully!");
        } else {
          toast.error(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            setTimeout(() => {
              router.push("/auth/login");
            }, 2000);
          } else {
            toast.error(error.response?.data?.message || "Failed to fetch profile");
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
      if (data.statusCode === "00") {
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        } else {
          toast.error(error.response?.data?.message || "Failed to update profile");
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
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
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
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Player Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <Button
            className="bg-[#0F0F0F] text-white w-full md:w-auto"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Profile Overview and Physical Stats */}
          <div className="space-y-4 md:space-y-6">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-gray-600">Loading profile...</p>
                ) : (
                  <div className="space-y-4">
                    <div className="relative flex justify-center ">
                      <Avatar
                        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 border border-[#B0B3B8] cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-xl sm:text-2xl text-[#B0B3B8]">
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
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Player ID: {playerInfo.id}</p>
                      <div className="flex justify-center gap-2 mb-3 sm:mb-4">
                        <Badge variant="default" className="bg-[#0F0F0F] text-white text-xs sm:text-sm">
                          {playerInfo.category}
                        </Badge>
                        <Badge variant="outline" className="text-[#B0B3B8] text-xs sm:text-sm">
                          {playerInfo.position}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mb-3 sm:mb-4 bg-transparent text-xs sm:text-sm"
                        onClick={handleAvatarClick}
                        disabled={!isEditing}
                      >
                        Change Photo
                      </Button>
                    </div>
                    <Separator className="my-3 sm:my-4" />
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between items-center">
                        <span>Jersey Number:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={playerInfo.jerseyNumber || ""}
                            onChange={(e) =>
                              setPlayerInfo({ ...playerInfo, jerseyNumber: parseInt(e.target.value) || 0 })
                            }
                            className="w-16 h-6 sm:h-8 text-right text-xs sm:text-sm"
                          />
                        ) : (
                          <span className="font-medium">#{playerInfo.jerseyNumber || "N/A"}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Join Date:</span>
                        <span className="font-medium">{playerInfo.joinDate || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Age:</span>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={playerInfo.age || ""}
                            onChange={(e) => setPlayerInfo({ ...playerInfo, age: parseInt(e.target.value) || 0 })}
                            className="w-16 h-6 sm:h-8 text-right text-xs sm:text-sm"
                          />
                        ) : (
                          <span className="font-medium">{playerInfo.age ? `${playerInfo.age} years` : "N/A"}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Physical Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Physical Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="height" className="text-xs sm:text-sm">Height</Label>
                  {isEditing ? (
                    <Input
                      id="height"
                      value={playerInfo.height}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, height: e.target.value })}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  ) : (
                    <div className="font-medium text-sm sm:text-base">{playerInfo.height || "N/A"}</div>
                  )}
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="weight" className="text-xs sm:text-sm">Weight</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      value={playerInfo.weight}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, weight: e.target.value })}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  ) : (
                    <div className="font-medium text-sm sm:text-base">{playerInfo.weight || "N/A"}</div>
                  )}
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="preferredFoot" className="text-xs sm:text-sm">Preferred Foot</Label>
                  {isEditing ? (
                    <select
                      id="preferredFoot"
                      value={playerInfo.preferredFoot}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, preferredFoot: e.target.value })}
                      className="flex h-8 sm:h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-xs sm:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Right">Right</option>
                      <option value="Left">Left</option>
                      <option value="Both">Both</option>
                    </select>
                  ) : (
                    <div className="font-medium text-sm sm:text-base">{playerInfo.preferredFoot || "N/A"}</div>
                  )}
                </div>
                {isEditing && (
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="position" className="text-xs sm:text-sm">Position</Label>
                    <select
                      id="position"
                      value={playerInfo.position}
                      onChange={(e) => setPlayerInfo({ ...playerInfo, position: e.target.value })}
                      className="flex h-8 sm:h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-xs sm:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          {/* Right Column - Personal Information and Academy Info */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Personal Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="firstName" className="text-xs sm:text-sm">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="lastName" className="text-xs sm:text-sm">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-xs sm:text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-xs sm:text-sm">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2 text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    className="text-xs sm:text-sm min-h-[80px] sm:min-h-[100px]"
                  />
                </div>
                <Separator className="my-3 sm:my-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="emergencyName" className="text-xs sm:text-sm">Emergency Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={profileData.emergencyName}
                      onChange={(e) => setProfileData({ ...profileData, emergencyName: e.target.value })}
                      disabled={!isEditing}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="emergencyContact" className="text-xs sm:text-sm">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                      className="text-xs sm:text-sm h-8 sm:h-9"
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="bio" className="text-xs sm:text-sm">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your goals, and aspirations..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    className="text-xs sm:text-sm min-h-[100px] sm:min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Academy Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Academy Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Important academy details and contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium mb-1 sm:mb-2 flex items-center gap-2 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      Academy Address
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Stadium Complex, Ibrahim Taiwo Road
                      <br />
                      Ilorin, Kwara State, Nigeria
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 sm:mb-2 flex items-center gap-2 text-xs sm:text-sm">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Contact Numbers
                    </h4>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p>+234 8133178008</p>
                      <p>+234 8065943751</p>
                      <p>+234 8033907248</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 sm:mb-2 flex items-center gap-2 text-xs sm:text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Email
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">corporateballersfa418@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 sm:mb-2 flex items-center gap-2 text-xs sm:text-sm">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      Training Schedule
                    </h4>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p>Tue/Wed/Thu: 4:00 PM</p>
                      <p>Sat/Sun: 4:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PlayerLayout>
  );
}