"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, } from 'lucide-react'
import Link from "next/link"
import { Navbar } from "@/components/landing-page/Navbar"
import { Footer } from "@/components/landing-page/Footer"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Achievement", "Team", "Program", "Tournament", "Community"]

  const newsArticles = [
    {
      id: 1,
      title: "CBFA Wins Regional Championship",
      excerpt: "Our senior team secured victory in the Kwara State Regional Championship, showcasing exceptional teamwork and skill development.",
      content: "In a thrilling final match, Corporate Ballers Football Academy's senior team demonstrated the quality of training and character development that defines our institution...",
      date: "December 15, 2024",
      category: "Achievement",
      image: "/winner.jpg",
      featured: true,
      author: "Coach Michael Adebayo"
    },
    {
      id: 2,
      title: "Team Huddle",
      excerpt: "Pre-match team talk and motivation before our recent tournament.",
      content: "Our coaching staff emphasizes the importance of teamwork and mental preparation before each match...",
      date: "December 10, 2024",
      category: "Team",
      image: "/training.jpg",
      featured: true,
      author: "Team Captain"
    },
    {
      id: 3,
      title: "Training Session",
      excerpt: "Our team's pre-match training ahead of the tournament's match.",
      content: "Building on our commitment to excellence, CBFA players undergo rigorous training sessions...",
      date: "December 5, 2024",
      category: "Program",
      image: "/youth.jpg",
      featured: false,
      author: "Training Staff"
    },
    {
      id: 4,
      title: "Youth Development Program",
      excerpt: "Introducing our enhanced youth development program focusing on holistic player growth.",
      content: "As part of our mission to develop young talent, CBFA has launched an innovative youth development program...",
      date: "November 28, 2024",
      category: "Program",
      image: "/youth.jpg",
      featured: false,
      author: "Youth Development Team"
    },
    {
      id: 5,
      title: "Community Outreach",
      excerpt: "CBFA partners with local schools to promote football in the community.",
      content: "Continuing our commitment to community engagement, CBFA has launched outreach programs...",
      date: "November 20, 2024",
      category: "Community",
      image: "/training.jpg",
      featured: false,
      author: "Community Relations"
    },
    {
      id: 6,
      title: "Inter-Academy Tournament",
      excerpt: "CBFA teams excel in the annual inter-academy tournament, reaching finals.",
      content: "Our commitment to competitive excellence was on full display during the recent tournament...",
      date: "November 15, 2024",
      category: "Tournament",
      image: "/winner.jpg",
      featured: false,
      author: "Tournament Coordinator"
    }
  ]

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews.filter(article => article.featured)
  const regularNews = filteredNews.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="lg:text-6xl text-[36px] font-bold lg:mb-6 mb-3">News & Updates</h1>
            <p className="lg:text-xl text-[16px] text-green-100 leading-tight lg:w-[420px] w-auto mx-auto">
              Stay updated with the latest happenings at Corporate Ballers Football Academy
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search news articles..."
                  className="pl-10 py-3 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Filter:</span>
              </div> */}
            </div>

            <div className="flex flex-wrap gap-2 cursor-pointer">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-transparent cursor-pointer"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured News</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredNews.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl hover:text-green-600 transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {article.author}</span>
                        {/* <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Updates</h2>

            {regularNews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                  variant="outline"
                  className="mt-4 bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs text-[#B0B3B8]">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg hover:text-green-600 transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">By {article.author}</span>
                        {/* <Button variant="ghost" size="sm" className="p-0 h-auto text-green-600 hover:text-green-700">
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 lg:py-24 rounded-lg bg-[#047146] text-white lg:mx-20 mx-4 mb-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="lg:text-3xl text-[26px] font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Ready to Join CBFA?</h2>
          <p className="text-[15px] mb-8 lg:w-[400px] w-auto mx-auto opacity-90">
            Take the first step towards your professional football career. <br className="lg:hidden block" /> Register today and become part of our growing
            family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#047146] hover:border hover:border-white hover:text-[#FFFFFF] hover:bg-transparent" size="lg" variant="secondary" asChild>
              <Link href="/auth/register">Register Now</Link>
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-[#FFFFFF] border bg-transparent text-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="/programs">View Programs</Link>
            </Button> */}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}