"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, ArrowRight, Filter } from 'lucide-react'

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Achievement", "Training", "Facility", "Program", "Tournament", "Community"]

  const newsArticles = [
    {
      id: 1,
      title: "CBFA Wins Regional Championship",
      excerpt: "Our senior team secured victory in the Kwara State Regional Championship, showcasing exceptional teamwork and skill development.",
      content: "In a thrilling final match, Corporate Ballers Football Academy's senior team demonstrated the quality of training and character development that defines our institution...",
      date: "December 15, 2024",
      category: "Achievement",
      image: "/placeholder.svg?height=300&width=400",
      featured: true,
      author: "Coach Michael Adebayo"
    },
    {
      id: 2,
      title: "New Training Facility Opening",
      excerpt: "We're excited to announce the opening of our new state-of-the-art training facility with modern equipment and expanded fields.",
      content: "After months of construction and planning, CBFA is proud to unveil our new training complex featuring...",
      date: "December 10, 2024",
      category: "Facility",
      image: "/placeholder.svg?height=300&width=400",
      featured: true,
      author: "CBFA Administration"
    },
    {
      id: 3,
      title: "Youth Development Program Launch",
      excerpt: "Introducing our enhanced youth development program focusing on holistic player growth and academic excellence.",
      content: "Building on our commitment to nurturing young talent, CBFA launches an innovative youth development program...",
      date: "December 5, 2024",
      category: "Program",
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
      author: "Youth Development Team"
    },
    {
      id: 4,
      title: "Community Outreach Initiative",
      excerpt: "CBFA partners with local schools to promote football and character development in the community.",
      content: "As part of our mission to contribute to society, CBFA has launched a community outreach program...",
      date: "November 28, 2024",
      category: "Community",
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
      author: "Community Relations"
    },
    {
      id: 5,
      title: "Advanced Coaching Certification",
      excerpt: "Our coaching staff completes advanced certification programs to enhance training quality and player development.",
      content: "Continuing our commitment to excellence, CBFA's coaching team has successfully completed advanced certification...",
      date: "November 20, 2024",
      category: "Training",
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
      author: "Coaching Department"
    },
    {
      id: 6,
      title: "Inter-Academy Tournament Success",
      excerpt: "CBFA teams excel in the annual inter-academy tournament, with multiple age groups reaching finals.",
      content: "Our commitment to competitive excellence was on full display during the recent inter-academy tournament...",
      date: "November 15, 2024",
      category: "Tournament",
      image: "/placeholder.svg?height=300&width=400",
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
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
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
                  className="pl-10 py-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Filter:</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
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
                        src={article.image || "/placeholder.svg"}
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
                        <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
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
                  className="mt-4"
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
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
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
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-green-600 hover:text-green-700">
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-green-100 mb-8">
              Subscribe to our newsletter to receive the latest news and updates from CBFA directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 placeholder-gray-500"
              />
              <Button variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-green-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
