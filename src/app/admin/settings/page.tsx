"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Shield, Bell, Globe, } from "lucide-react"
import { AdminLayout } from "@/components/dashboard/AdminLayout"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-3">Settings</h1>
            <p className="text-gray-600">Manage academy settings and preferences</p>
          </div>
          <Button className="bg-[#0F0F0F] text-white cursor-pointer w-full md:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
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
                    <Input id="academyName" defaultValue="Corporate Ballers Football Academy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rcNumber">RC Number</Label>
                    <Input id="rcNumber" defaultValue="7580099" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="Stadium Complex, Ibrahim Taiwo Road, Ilorin, Kwara State, Nigeria."
                    className="lg:min-h-[100px] h-auto leading-tight"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="corporateballersfa418@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Primary Phone</Label>
                    <Input id="phone" defaultValue="+234 8133178008" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    defaultValue="To harness raw talent and nurture them to full maturity, developing and molding individuals into professionals in their football careers."
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
                    <Label htmlFor="maxPlayers">Max Players per Session</Label>
                    <Input id="maxPlayers" type="number" defaultValue="55" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionDuration">Session Duration (hours)</Label>
                    <Input id="sessionDuration" type="number" step="0.5" defaultValue="2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendanceThreshold">Minimum Attendance (%)</Label>
                  <Input id="attendanceThreshold" type="number" defaultValue="80" />
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
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Input id="passwordPolicy" defaultValue="Minimum 8 characters, 1 uppercase, 1 number" />
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
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">Important alerts only</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tournament Updates</Label>
                    <p className="text-xs text-muted-foreground">Match results, schedules</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Attendance Alerts</Label>
                    <p className="text-xs text-muted-foreground">Low attendance warnings</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System
                </CardTitle>
                <CardDescription>System maintenance and backup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                  <Button variant="outline" className="w-full">
                    Backup Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Reports
                  </Button>
                  <Button variant="outline" className="w-full">
                    System Logs
                  </Button>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Last Backup: Jan 15, 2024</p>
                  <p>System Version: 2.1.0</p>
                  <p>Database Size: 2.3 GB</p>
                </div>
              </CardContent>
            </Card> */}

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