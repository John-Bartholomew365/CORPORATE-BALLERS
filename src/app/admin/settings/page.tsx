"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Shield, Bell, Globe } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getToken } from "@/app/reuseables/authToken"

interface AcademySettings {
  academyName: string
  rcNumber: string
  address: string
  email: string
  primaryPhone: string
  missionStatement: string
  trainingSettings: {
    maxPlayersPerSession: number
    sessionDurationHours: number
    minimumAttendance: number
  }
  notifications: {
    email: boolean
    sms: boolean
    tournamentUpdates: boolean
    attendanceAlerts: boolean
  }
  securitySettings: {
    twoFactorAuth: boolean
    sessionTimeout: number
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AcademySettings>({
    academyName: "",
    rcNumber: "",
    address: "",
    email: "",
    primaryPhone: "",
    missionStatement: "",
    trainingSettings: {
      maxPlayersPerSession: 0,
      sessionDurationHours: 0,
      minimumAttendance: 0
    },
    notifications: {
      email: false,
      sms: false,
      tournamentUpdates: false,
      attendanceAlerts: false
    },
    securitySettings: {
      twoFactorAuth: false,
      sessionTimeout: 0
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = getToken()
        if (!token) {
          toast.error("Please log in to view settings")
          return
        }

        const response = await axios.get("/api/settings", {
          headers: {
            Authorization: token
          }
        })

        if (response.data.statusCode === "00") {
          setSettings(response.data.data)
        } else {
          toast.error(response.data.message || "Failed to fetch settings")
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch settings")
        } else {
          toast.error("An unexpected error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setSettings(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleTrainingSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSettings(prev => ({
      ...prev,
      trainingSettings: {
        ...prev.trainingSettings,
        [id]: Number(value)
      }
    }))
  }

  const handleNotificationToggle = (field: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }))
  }

  const handleSecurityToggle = (field: keyof typeof settings.securitySettings) => {
    setSettings(prev => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        [field]: field === "sessionTimeout" 
          ? prev.securitySettings[field] === 20 ? 0 : 20
          : !prev.securitySettings[field]
      }
    }))
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      const token = getToken()
      if (!token) {
        toast.error("Please log in to save settings")
        return
      }

      const response = await axios.post("/api/settings", settings, {
        headers: {
          Authorization: token
        }
      })

      if (response.data.statusCode === "00") {
        toast.success("Settings saved successfully")
      } else {
        toast.error(response.data.message || "Failed to save settings")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to save settings")
      } else {
        toast.error("An unexpected error occurred")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4 md:space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 w-[150px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-full md:w-[150px] bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Side Skeleton */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardHeader>
                    <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3].map((field) => (
                      <div key={field} className="space-y-2">
                        <div className="h-4 w-[100px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Side Skeleton */}
            <div className="space-y-4 md:space-y-6">
              {[1, 2].map((item) => (
                <Card key={item}>
                  <CardHeader>
                    <div className="h-6 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3, 4].map((field) => (
                      <div key={field} className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="h-4 w-[120px] bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-[150px] bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-3">Settings</h1>
            <p className="text-gray-600">Manage academy settings and preferences</p>
          </div>
          <Button 
            className="bg-[#0F0F0F] text-white cursor-pointer w-full md:w-auto"
            onClick={handleSaveSettings}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Academy Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Academy Information
                </CardTitle>
                <CardDescription className="ml-7">Update academy details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academyName">Academy Name</Label>
                    <Input 
                      id="academyName" 
                      value={settings.academyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rcNumber">RC Number</Label>
                    <Input 
                      id="rcNumber" 
                      value={settings.rcNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    className="lg:min-h-[100px] h-auto leading-tight"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={settings.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryPhone">Primary Phone</Label>
                    <Input 
                      id="primaryPhone" 
                      value={settings.primaryPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    value={settings.missionStatement}
                    onChange={handleInputChange}
                    className="min-h-[100px] leading-tight"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Training Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Training Settings</CardTitle>
                <CardDescription>Configure training schedules and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxPlayersPerSession">Max Players per Session</Label>
                    <Input 
                      id="maxPlayersPerSession" 
                      type="number" 
                      value={settings.trainingSettings.maxPlayersPerSession}
                      onChange={handleTrainingSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionDurationHours">Session Duration (hours)</Label>
                    <Input 
                      id="sessionDurationHours" 
                      type="number" 
                      step="0.5" 
                      value={settings.trainingSettings.sessionDurationHours}
                      onChange={handleTrainingSettingChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumAttendance">Minimum Attendance (%)</Label>
                  <Input 
                    id="minimumAttendance" 
                    type="number" 
                    value={settings.trainingSettings.minimumAttendance}
                    onChange={handleTrainingSettingChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="ml-7">Manage security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch 
                    checked={settings.securitySettings.twoFactorAuth}
                    onCheckedChange={() => handleSecurityToggle("twoFactorAuth")}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Switch 
                    checked={settings.securitySettings.sessionTimeout > 0}
                    onCheckedChange={() => handleSecurityToggle("sessionTimeout")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings - Right Side */}
          <div className="space-y-4 md:space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription className="ml-7">Configure notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">New registrations, updates</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.email}
                    onCheckedChange={() => handleNotificationToggle("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">Important alerts only</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.sms}
                    onCheckedChange={() => handleNotificationToggle("sms")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tournament Updates</Label>
                    <p className="text-xs text-muted-foreground">Match results, schedules</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.tournamentUpdates}
                    onCheckedChange={() => handleNotificationToggle("tournamentUpdates")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Attendance Alerts</Label>
                    <p className="text-xs text-muted-foreground">Low attendance warnings</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.attendanceAlerts}
                    onCheckedChange={() => handleNotificationToggle("attendanceAlerts")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between flex-col space-y-5">
                <div className="space-y-1 flex justify-between">
                  <p className="text-sm text-muted-foreground">Total Players</p>
                  <p className="font-medium">156</p>
                </div>
                <div className="space-y-1 flex justify-between">
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="font-medium">5</p>
                </div>
                <div className="space-y-1 flex justify-between">
                  <p className="text-sm text-muted-foreground">This Month Revenue</p>
                  <p className="font-medium">₦520,000</p>
                </div>
                <div className="space-y-1 flex justify-between">
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="font-medium">92%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}