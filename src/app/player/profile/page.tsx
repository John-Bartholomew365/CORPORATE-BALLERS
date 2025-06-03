// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { User, Edit, Save, Phone, Mail, MapPin, Calendar } from "lucide-react"
// import { PlayerLayout } from "@/components/dashboard/PlayerLayout"

// export default function PlayerProfilePage() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [profileData, setProfileData] = useState({
//     firstName: "John",
//     lastName: "Bartholomew",
//     email: "john.bartholomew@email.com",
//     phone: "+234 8123456789",
//     address: "123 Football Street, Ilorin, Kwara State",
//     emergencyContact: "+234 8123456790",
//     emergencyName: "Mrs. Bartholomew",
//     bio: "Passionate midfielder with strong technical skills and leadership qualities.",
//   })

//   const playerInfo = {
//     id: "CBFA001",
//     category: "Senior",
//     position: "Midfielder",
//     joinDate: "January 15, 2024",
//     age: 16,
//     height: "5'8\"",
//     weight: "65kg",
//     preferredFoot: "Right",
//     jerseyNumber: 10,
//   }

//   const handleSave = () => {
//     setIsEditing(false)
//     // Save profile data
//   }

//   return (
//     <PlayerLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Player Profile</h1>
//             <p className="text-gray-600">Manage your personal information and preferences</p>
//           </div>
//           <Button className="bg-[#0F0F0F] text-white cursor-pointer" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
//             {isEditing ? (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Changes
//               </>
//             ) : (
//               <>
//                 <Edit className="w-4 h-4 mr-2" />
//                 Edit Profile
//               </>
//             )}
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Profile Overview */}
//           <div className="lg:col-span-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   Profile Overview
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <Avatar className="w-24 h-24 mx-auto mb-4 border border-[#B0B3B8]" >
//                   <AvatarImage src="/placeholder.svg?height=96&width=96" />
//                   <AvatarFallback className="text-2xl text-[#B0B3B8]">
//                     {profileData.firstName[0]}
//                     {profileData.lastName[0]}
//                   </AvatarFallback>
//                 </Avatar>
//                 <h3 className="text-xl font-semibold">
//                   {profileData.firstName} {profileData.lastName}
//                 </h3>
//                 <p className="text-gray-600 mb-2">Player ID: {playerInfo.id}</p>
//                 <div className="flex justify-center gap-2 mb-4">
//                   <Badge variant="default" className="bg-[#0F0F0F] text-white">{playerInfo.category}</Badge>
//                   <Badge variant="outline" className="text-[#B0B3B8]">{playerInfo.position}</Badge>
//                 </div>
//                 <Button variant="outline" size="sm" className="mb-4 bg-transparent cursor-pointer">
//                   Change Photo
//                 </Button>
//                 <Separator className="my-4" />
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span>Jersey Number:</span>
//                     <span className="font-medium">#{playerInfo.jerseyNumber}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Join Date:</span>
//                     <span className="font-medium">{playerInfo.joinDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Age:</span>
//                     <span className="font-medium">{playerInfo.age} years</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Physical Stats */}
//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle>Physical Stats</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>Height:</span>
//                     <span className="font-medium">{playerInfo.height}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Weight:</span>
//                     <span className="font-medium">{playerInfo.weight}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Preferred Foot:</span>
//                     <span className="font-medium">{playerInfo.preferredFoot}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Personal Information */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//                 <CardDescription>Your personal details and contact information</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="firstName">First Name</Label>
//                     <Input
//                       id="firstName"
//                       value={profileData.firstName}
//                       onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input
//                       id="lastName"
//                       value={profileData.lastName}
//                       onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="flex items-center gap-2">
//                       <Mail className="w-4 h-4" />
//                       Email
//                     </Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={profileData.email}
//                       onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone" className="flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       Phone Number
//                     </Label>
//                     <Input
//                       id="phone"
//                       value={profileData.phone}
//                       onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="address" className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     Address
//                   </Label>
//                   <Textarea
//                     id="address"
//                     value={profileData.address}
//                     onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="emergencyName">Emergency Contact Name</Label>
//                     <Input
//                       id="emergencyName"
//                       value={profileData.emergencyName}
//                       onChange={(e) => setProfileData({ ...profileData, emergencyName: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="emergencyContact">Emergency Contact Phone</Label>
//                     <Input
//                       id="emergencyContact"
//                       value={profileData.emergencyContact}
//                       onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio">Bio</Label>
//                   <Textarea
//                     id="bio"
//                     placeholder="Tell us about yourself, your goals, and aspirations..."
//                     value={profileData.bio}
//                     onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Academy Information */}
//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle>Academy Information</CardTitle>
//                 <CardDescription>Important academy details and contacts</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Academy Address
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       Stadium Complex, Ibrahim Taiwo Road
//                       <br />
//                       Ilorin, Kwara State, Nigeria
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       Contact Numbers
//                     </h4>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       <p>+234 8133178008</p>
//                       <p>+234 8065943751</p>
//                       <p>+234 8033907248</p>
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <Mail className="w-4 h-4" />
//                       Email
//                     </h4>
//                     <p className="text-sm text-gray-600">corporateballersfa418@gmail.com</p>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       Training Schedule
//                     </h4>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       <p>Tue/Wed/Thu: 4:00 PM</p>
//                       <p>Sat/Sun: 4:30 PM</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </PlayerLayout>
//   )
// }




// "use client"

// import { useState, useRef } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { User, Edit, Save, Phone, Mail, MapPin, Calendar } from "lucide-react"
// import { PlayerLayout } from "@/components/dashboard/PlayerLayout"

// export default function PlayerProfilePage() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [profileData, setProfileData] = useState({
//     firstName: "John",
//     lastName: "Bartholomew",
//     email: "john.bartholomew@email.com",
//     phone: "+234 8123456789",
//     address: "123 Football Street, Ilorin, Kwara State",
//     emergencyContact: "+234 8123456790",
//     emergencyName: "Mrs. Bartholomew",
//     bio: "Passionate midfielder with strong technical skills and leadership qualities.",
//   })
//   const [avatar, setAvatar] = useState("/placeholder.svg?height=96&width=96")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const playerInfo = {
//     id: "CBFA001",
//     category: "Senior",
//     position: "Midfielder",
//     joinDate: "January 15, 2024",
//     age: 16,
//     height: "5'8\"",
//     weight: "65kg",
//     preferredFoot: "Right",
//     jerseyNumber: 10,
//   }

//   const handleSave = () => {
//     setIsEditing(false)
//     // Save profile data
//   }

//   const handleAvatarClick = () => {
//     if (isEditing && fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0]
//     if (file) {
//         const reader = new FileReader()
//         reader.onload = (event: ProgressEvent<FileReader>) => {
//             const result = event.target && event.target.result
//             if (typeof result === "string") {
//                 setAvatar(result)
//             }
//         }
//         reader.readAsDataURL(file)
//     }
// }

//   return (
//     <PlayerLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Player Profile</h1>
//             <p className="text-gray-600">Manage your personal information and preferences</p>
//           </div>
//           <Button className="bg-[#0F0F0F] text-white cursor-pointer" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
//             {isEditing ? (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Changes
//               </>
//             ) : (
//               <>
//                 <Edit className="w-4 h-4 mr-2" />
//                 Edit Profile
//               </>
//             )}
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Profile Overview */}
//           <div className="lg:col-span-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   Profile Overview
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <div className="relative inline-block">
//                   <Avatar 
//                     className="w-24 h-24 mx-auto mb-4 border border-[#B0B3B8] cursor-pointer"
//                     onClick={handleAvatarClick}
//                   >
//                     <AvatarImage src={avatar} />
//                     <AvatarFallback className="text-2xl text-[#B0B3B8]">
//                       {profileData.firstName[0]}
//                       {profileData.lastName[0]}
//                     </AvatarFallback>
//                   </Avatar>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold">
//                   {profileData.firstName} {profileData.lastName}
//                 </h3>
//                 <p className="text-gray-600 mb-2">Player ID: {playerInfo.id}</p>
//                 <div className="flex justify-center gap-2 mb-4">
//                   <Badge variant="default" className="bg-[#0F0F0F] text-white">{playerInfo.category}</Badge>
//                   <Badge variant="outline" className="text-[#B0B3B8]">{playerInfo.position}</Badge>
//                 </div>
//                 <Button 
//                   variant="outline" 
//                   size="sm" 
//                   className="mb-4 bg-transparent" 
//                   onClick={handleAvatarClick}
//                   disabled={!isEditing}
//                 >
//                   Change Photo
//                 </Button>
//                 <Separator className="my-4" />
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span>Jersey Number:</span>
//                     <span className="font-medium">#{playerInfo.jerseyNumber}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Join Date:</span>
//                     <span className="font-medium">{playerInfo.joinDate}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Age:</span>
//                     <span className="font-medium">{playerInfo.age} years</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Physical Stats */}
//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle>Physical Stats</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>Height:</span>
//                     <span className="font-medium">{playerInfo.height}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Weight:</span>
//                     <span className="font-medium">{playerInfo.weight}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Preferred Foot:</span>
//                     <span className="font-medium">{playerInfo.preferredFoot}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Personal Information */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Personal Information</CardTitle>
//                 <CardDescription>Your personal details and contact information</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="firstName">First Name</Label>
//                     <Input
//                       id="firstName"
//                       value={profileData.firstName}
//                       onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input
//                       id="lastName"
//                       value={profileData.lastName}
//                       onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="flex items-center gap-2">
//                       <Mail className="w-4 h-4" />
//                       Email
//                     </Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={profileData.email}
//                       onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone" className="flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       Phone Number
//                     </Label>
//                     <Input
//                       id="phone"
//                       value={profileData.phone}
//                       onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="address" className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     Address
//                   </Label>
//                   <Textarea
//                     id="address"
//                     value={profileData.address}
//                     onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="emergencyName">Emergency Contact Name</Label>
//                     <Input
//                       id="emergencyName"
//                       value={profileData.emergencyName}
//                       onChange={(e) => setProfileData({ ...profileData, emergencyName: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="emergencyContact">Emergency Contact Phone</Label>
//                     <Input
//                       id="emergencyContact"
//                       value={profileData.emergencyContact}
//                       onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio">Bio</Label>
//                   <Textarea
//                     id="bio"
//                     placeholder="Tell us about yourself, your goals, and aspirations..."
//                     value={profileData.bio}
//                     onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Academy Information */}
//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle>Academy Information</CardTitle>
//                 <CardDescription>Important academy details and contacts</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Academy Address
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       Stadium Complex, Ibrahim Taiwo Road
//                       <br />
//                       Ilorin, Kwara State, Nigeria
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       Contact Numbers
//                     </h4>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       <p>+234 8133178008</p>
//                       <p>+234 8065943751</p>
//                       <p>+234 8033907248</p>
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <Mail className="w-4 h-4" />
//                       Email
//                     </h4>
//                     <p className="text-sm text-gray-600">corporateballersfa418@gmail.com</p>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-2 flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       Training Schedule
//                     </h4>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       <p>Tue/Wed/Thu: 4:00 PM</p>
//                       <p>Sat/Sun: 4:30 PM</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </PlayerLayout>
//   )
// }



"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Edit, Save, Phone, Mail, MapPin, Calendar } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"

export default function PlayerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Bartholomew",
    email: "john.bartholomew@email.com",
    phone: "+234 8123456789",
    address: "123 Football Street, Ilorin, Kwara State",
    emergencyContact: "+234 8123456790",
    emergencyName: "Mrs. Bartholomew",
    bio: "Passionate midfielder with strong technical skills and leadership qualities.",
  })
  
  const [playerInfo, setPlayerInfo] = useState({
    id: "CBFA001",
    category: "Senior",
    position: "Midfielder",
    joinDate: "January 15, 2024",
    age: 16,
    height: "5'8\"",
    weight: "65kg",
    preferredFoot: "Right",
    jerseyNumber: 10,
  })

  const [avatar, setAvatar] = useState("/placeholder.svg?height=96&width=96")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target && event.target.result
        if (typeof result === "string") {
          setAvatar(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <PlayerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Player Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <Button className="bg-[#0F0F0F] text-white cursor-pointer" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
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
                <div className="relative inline-block">
                  <Avatar 
                    className="w-24 h-24 mx-auto mb-4 border border-[#B0B3B8] cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="text-2xl text-[#B0B3B8]">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
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
                  <Badge variant="default" className="bg-[#0F0F0F] text-white">{playerInfo.category}</Badge>
                  <Badge variant="outline" className="text-[#B0B3B8]">{playerInfo.position}</Badge>
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
                        value={playerInfo.jerseyNumber}
                        onChange={(e) => setPlayerInfo({...playerInfo, jerseyNumber: parseInt(e.target.value) || 0})}
                        className="w-16 h-6 text-right"
                      />
                    ) : (
                      <span className="font-medium">#{playerInfo.jerseyNumber}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span>Join Date:</span>
                    <span className="font-medium">{playerInfo.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age:</span>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={playerInfo.age}
                        onChange={(e) => setPlayerInfo({...playerInfo, age: parseInt(e.target.value) || 0})}
                        className="w-16 h-6 text-right"
                      />
                    ) : (
                      <span className="font-medium">{playerInfo.age} years</span>
                    )}
                  </div>
                </div>
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
                      onChange={(e) => setPlayerInfo({...playerInfo, height: e.target.value})}
                    />
                  ) : (
                    <div className="font-medium">{playerInfo.height}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      value={playerInfo.weight}
                      onChange={(e) => setPlayerInfo({...playerInfo, weight: e.target.value})}
                    />
                  ) : (
                    <div className="font-medium">{playerInfo.weight}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredFoot">Preferred Foot</Label>
                  {isEditing ? (
                    <select
                      id="preferredFoot"
                      value={playerInfo.preferredFoot}
                      onChange={(e) => setPlayerInfo({...playerInfo, preferredFoot: e.target.value})}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Right">Right</option>
                      <option value="Left">Left</option>
                      <option value="Both">Both</option>
                    </select>
                  ) : (
                    <div className="font-medium">{playerInfo.preferredFoot}</div>
                  )}
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <select
                      id="position"
                      value={playerInfo.position}
                      onChange={(e) => setPlayerInfo({...playerInfo, position: e.target.value})}
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
      </div>
    </PlayerLayout>
  )
}