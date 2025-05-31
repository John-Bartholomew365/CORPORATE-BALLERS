import Link from 'next/link'
import React from 'react'
import { Settings, Trophy, Activity, User, Target, Calendar, TrendingUp, BookOpen, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = () => {
  return (
    <div>  <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-600">CBFA</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 pb-4 space-y-1">
            <Link
              href="/dashboard"
              className="bg-green-50 text-green-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Activity className="mr-3 h-5 w-5" />
              Overview
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/dashboard/training"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Target className="mr-3 h-5 w-5" />
              Training
            </Link>
            <Link
              href="/dashboard/schedule"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Schedule
            </Link>
            <Link
              href="/dashboard/progress"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Progress
            </Link>
            <Link
              href="/dashboard/resources"
              className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Resources
            </Link>
          </nav>

          <div className="flex-shrink-0 px-4 py-4 border-t">
            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
                className="text-muted-foreground hover:bg-muted hover:text-foreground group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div></div>
  )
}

export default Sidebar