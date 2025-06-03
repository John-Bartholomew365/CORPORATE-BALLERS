"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, MapPin, Clock } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"

export default function PlayerTournamentsPage() {
  const upcomingTournaments = [
    {
      name: "Kwara State Youth Championship",
      date: "February 15, 2024",
      time: "10:00 AM",
      location: "Kwara State Stadium",
      category: "Senior",
      status: "Registered",
      prize: "₦500,000",
      teams: 16,
    },
    {
      name: "Inter-Academy Cup",
      date: "January 28, 2024",
      time: "2:00 PM",
      location: "CBFA Stadium",
      category: "Junior",
      status: "Ongoing",
      prize: "₦200,000",
      teams: 8,
    },
  ]

  const upcomingMatches = [
    {
      opponent: "Lions FC",
      date: "January 25, 2024",
      time: "4:00 PM",
      venue: "CBFA Stadium",
      tournament: "Inter-Academy Cup",
      round: "Semi-Final",
      status: "upcoming",
    },
    {
      opponent: "Eagles Academy",
      date: "January 30, 2024",
      time: "2:00 PM",
      venue: "Away",
      tournament: "Friendly Match",
      round: "Friendly",
      status: "upcoming",
    },
  ]

  const matchHistory = [
    {
      opponent: "Thunder FC",
      date: "January 20, 2024",
      result: "Won 3-1",
      tournament: "Inter-Academy Cup",
      round: "Quarter-Final",
      playerStats: { goals: 1, assists: 0, rating: 4.5 },
    },
    {
      opponent: "Sharks United",
      date: "January 15, 2024",
      result: "Won 2-0",
      tournament: "Inter-Academy Cup",
      round: "Round of 16",
      playerStats: { goals: 0, assists: 1, rating: 4.2 },
    },
    {
      opponent: "Rangers FC",
      date: "January 10, 2024",
      result: "Draw 1-1",
      tournament: "Friendly Match",
      round: "Friendly",
      playerStats: { goals: 1, assists: 0, rating: 4.3 },
    },
  ]

  const playerStats = {
    tournamentsPlayed: 8,
    matchesWon: 15,
    totalGoals: 14,
    totalAssists: 14,
    averageRating: 4.3,
  }

  return (
    <PlayerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tournaments & Matches</h1>
            <p className="text-gray-600">Your tournament participation and match history</p>
          </div>
          <Button variant="outline" className="bg-transparent">
            <Trophy className="w-4 h-4 mr-2" />
            View All Tournaments
          </Button>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{playerStats.tournamentsPlayed}</div>
              <p className="text-sm text-muted-foreground">Tournaments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{playerStats.matchesWon}</div>
              <p className="text-sm text-muted-foreground">Matches Won</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{playerStats.totalGoals}</div>
              <p className="text-sm text-muted-foreground">Goals Scored</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{playerStats.totalAssists}</div>
              <p className="text-sm text-muted-foreground">Assists</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{playerStats.averageRating}</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tournaments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tournaments</CardTitle>
            <CardDescription>Tournaments you&apos;re registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{tournament.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {tournament.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {tournament.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {tournament.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={tournament.status === "Registered" ? "default" : "destructive"} className="bg-[#0F0F0F] text-white">
                        {tournament.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">Prize: {tournament.prize}</p>
                      <p className="text-sm text-gray-600">{tournament.teams} teams</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Matches</CardTitle>
            <CardDescription>Your next scheduled matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMatches.map((match, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">CBFA vs {match.opponent}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {match.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {match.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {match.venue}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-[#0F0F0F] text-white">{match.round}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{match.tournament}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Match History</CardTitle>
            <CardDescription>Your recent match results and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matchHistory.map((match, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">CBFA vs {match.opponent}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{match.date}</span>
                        <span>{match.tournament}</span>
                        <span>{match.round}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          match.result.includes("Won")
                            ? "default"
                            : match.result.includes("Draw")
                              ? "secondary"
                              : "destructive"
                        }
                      className="bg-[#0F0F0F] text-white">
                        {match.result}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>
                          Goals: {match.playerStats.goals} | Assists: {match.playerStats.assists}
                        </p>
                        <p>Rating: {match.playerStats.rating}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PlayerLayout>
  )
}
