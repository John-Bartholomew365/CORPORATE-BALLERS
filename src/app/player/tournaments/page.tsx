"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, MapPin, Clock } from "lucide-react"
import { PlayerLayout } from "@/components/dashboard/PlayerLayout"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getToken } from "@/app/reuseables/authToken"

interface Tournament {
  _id: string
  name: string
  location: string
  startDate: string
  endDate: string
  category: string
  maxTeams: number
  status: string
  description: string
}

interface Match {
  opponent: string
  date: string
  result: string
  tournament: string
  round: string
  playerStats: {
    goals: number
    assists: number
    rating: number
  }
}

interface PlayerStats {
  tournamentsPlayed: number
  matchesWon: number
  totalGoals: number
  totalAssists: number
  averageRating: number
}

export default function PlayerTournamentsPage() {
  const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([])
  interface UpcomingMatch {
    opponent: string
    date: string
    time: string
    venue: string
    tournament: string
    round: string
    status: string
  }

  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([])
  const [matchHistory, setMatchHistory] = useState<Match[]>([])
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    tournamentsPlayed: 0,
    matchesWon: 0,
    totalGoals: 0,
    totalAssists: 0,
    averageRating: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const token = getToken()
        if (!token) {
          toast.error("Please log in to view tournaments")
          return
        }

        const response = await axios.get("/api/player-tournament", {
          headers: {
            Authorization: token
          }
        })

        if (response.data.statusCode === "00") {
          const data = response.data.data
          
          // Filter upcoming tournaments (status: Upcoming or Ongoing)
          const upcoming = data.tournaments.filter((t: Tournament) => 
            t.status === "Upcoming" || t.status === "Ongoing")
          setUpcomingTournaments(upcoming)

          // Mock upcoming matches (in a real app, this would come from API)
          const mockUpcomingMatches = [
            {
              opponent: "Lions FC",
              date: formatDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
              time: "4:00 PM",
              venue: "Main Stadium",
              tournament: upcoming[0]?.name || "FA Cup",
              round: "Group Stage",
              status: "upcoming"
            },
            {
              opponent: "Eagles Academy",
              date: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
              time: "2:00 PM",
              venue: "Away",
              tournament: upcoming[1]?.name || "Wesley Cup",
              round: "Quarter-Final",
              status: "upcoming"
            }
          ]
          setUpcomingMatches(mockUpcomingMatches)

          // Mock match history (in a real app, this would come from API)
          const mockMatchHistory = [
            {
              opponent: "Thunder FC",
              date: formatDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
              result: "Won 3-1",
              tournament: data.tournaments.find((t: Tournament) => t.status === "Completed")?.name || "Summer Cup",
              round: "Quarter-Final",
              playerStats: { goals: 1, assists: 0, rating: 4.5 }
            },
            {
              opponent: "Sharks United",
              date: formatDate(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)),
              result: "Won 2-0",
              tournament: data.tournaments.find((t: Tournament) => t.status === "Completed")?.name || "Summer Cup",
              round: "Round of 16",
              playerStats: { goals: 0, assists: 1, rating: 4.2 }
            }
          ]
          setMatchHistory(mockMatchHistory)

          // Set player stats (mock values - would come from API in real app)
          setPlayerStats({
            tournamentsPlayed: data.total,
            matchesWon: 8,
            totalGoals: 12,
            totalAssists: 9,
            averageRating: 4.3
          })
        } else {
          toast.error(response.data.message || "Failed to fetch tournaments")
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch tournaments")
        } else {
          toast.error("An unexpected error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTournamentData()
  }, [])

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  const formatTournamentDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  if (loading) {
    return (
      <PlayerLayout>
        <div className="space-y-4 md:space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 w-[250px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-[150px] bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="min-w-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-8 w-[40px] bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse mt-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Upcoming Tournaments Skeleton */}
            <Card>
              <CardHeader>
                <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="p-3 sm:p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-[80px] bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Matches Skeleton */}
            <Card>
              <CardHeader>
                <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="p-3 sm:p-4 bg-gray-100 rounded-lg border">
                      <div className="space-y-2">
                        <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Match History Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-[200px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-[300px] bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-[250px] bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-6 w-[80px] bg-gray-200 rounded-full animate-pulse"></div>
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

  return (
    <PlayerLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 lg:mt-0 mt-2">Tournaments & Matches</h1>
            <p className="text-gray-600">Your tournament participation and match history</p>
          </div>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{playerStats.tournamentsPlayed}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Tournaments</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{playerStats.matchesWon}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Matches Won</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{playerStats.totalGoals}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Goals</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{playerStats.totalAssists}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Assists</p>
            </CardContent>
          </Card>
          <Card className="min-w-0">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold">{playerStats.averageRating}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Upcoming Tournaments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tournaments</CardTitle>
              <CardDescription>Tournaments you&apos;re registered for</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingTournaments.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {upcomingTournaments.map((tournament) => (
                    <div key={tournament._id} className="p-3 sm:p-4 border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">{tournament.name}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                {formatTournamentDate(tournament.startDate)} - {formatTournamentDate(tournament.endDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                {tournament.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={tournament.status === "Upcoming" ? "default" : "destructive"} 
                            className="bg-[#0F0F0F] text-white text-xs sm:text-sm"
                          >
                            {tournament.status}
                          </Badge>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {tournament.maxTeams} teams
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {tournament.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No upcoming tournaments</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Matches</CardTitle>
              <CardDescription>Your next scheduled matches</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingMatches.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {upcomingMatches.map((match, index) => (
                    <div key={index} className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">CBFA vs {match.opponent}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              {match.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              {match.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              {match.venue}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-[#0F0F0F] text-white text-xs sm:text-sm">
                            {match.round}
                          </Badge>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">{match.tournament}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No upcoming matches</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Match History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Match History</CardTitle>
            <CardDescription>Your recent match results and performance</CardDescription>
          </CardHeader>
          <CardContent>
            {matchHistory.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {matchHistory.map((match, index) => (
                  <div key={index} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">CBFA vs {match.opponent}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
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
                          className="bg-[#0F0F0F] text-white text-xs sm:text-sm"
                        >
                          {match.result}
                        </Badge>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1">
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
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No match history available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PlayerLayout>
  )
}