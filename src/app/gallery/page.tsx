"use client"

import Link from "next/link"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react"

type Image = {
  id: number
  src: string
  title: string
  description: string
  date: string
  category: string
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const trainingImages: Image[] = [
    {
      id: 1,
      src: "/training1.jpg",
      title: "Technical Skills Training",
      description: "Players practicing ball control and passing techniques",
      date: "December 2024",
      category: "Training",
    },
    {
      id: 2,
      src: "/training2.jpg",
      title: "Tactical Session",
      description: "Players practicing tactics and positioning",
      date: "December 2024",
      category: "Training",
    },
    {
      id: 3,
      src: "/training3.jpg",
      title: "Physical Conditioning",
      description: "Fitness training and endurance building",
      date: "November 2024",
      category: "Training",
    },
    {
      id: 4,
      src: "/jogging.jpg",
      title: "Ready for Kickoff",
      description: "A glimpse of grit and determination before the battle begins.",
      date: "November 2024",
      category: "Training",
    },
    {
      id: 5,
      src: "/jogging2.jpg",
      title: "Team Building Exercise",
      description: "Players working together on team coordination",
      date: "October 2024",
      category: "Training",
    },
    {
      id: 6,
      src: "/elite.jpg",
      title: "Team Formation",
      description: "Starting eleven before the championship match",
      date: "October 2024",
      category: "Training",
    },
  ]

  const matchImages = [
    {
      id: 7,
      src: "/training.jpg",
      title: "Team Huddle",
      description: "Pre-match team talk and motivation",
      date: "December 2024",
      category: "Matches",
    },
    {
      id: 8,
      src: "/winner.jpg",
      title: "Trophy Celebration",
      description: "Team celebrating a crucial goal in the semi-final",
      date: "November 2024",
      category: "Matches",
    },
    {
      id: 9,
      src: "/match.jpg",
      title: "Final Touches",
      description: "Sharpening skills. Building rhythm. Game time nears.",
      date: "December 2024",
      category: "Matches",
    },
  ]

  const eventImages: Image[] = [
    {
      id: 12,
      src: "/before-match.jpg",
      title: "United Front",
      description: "11 strong. One mission. Game on!",
      date: "November 2024",
      category: "Matches",
    },
    {
      id: 11,
      src: "/during-match.jpg",
      title: "Paired Precision",
      description: "Two minds, one focus — building sharpness together.",
      date: "November 2024",
      category: "Matches",
    },
    // {
    //   id: 15,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Community Outreach",
    //   description: "CBFA players visiting local schools",
    //   date: "October 2024",
    //   category: "Events",
    // },
    // {
    //   id: 16,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Graduation Ceremony",
    //   description: "Players graduating to professional clubs",
    //   date: "August 2024",
    //   category: "Events",
    // },
    // {
    //   id: 17,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Parent-Player Meeting",
    //   description: "Annual meeting with parents and guardians",
    //   date: "September 2024",
    //   category: "Events",
    // },
    // {
    //   id: 18,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Coaching Workshop",
    //   description: "Professional development session for coaches",
    //   date: "July 2024",
    //   category: "Events",
    // },
  ]

  interface FacilityImage {
    id: number
    src: string
    title: string
    description: string
    date: string
    category: string
  }

  const facilityImages: FacilityImage[] = [
    {
      id: 10,
      src: "/running.jpg",
      title: "Pushing Forward",
      description: "United in pace, driven by purpose.",
      date: "December 2024",
      category: "Matches",
    },
    // {
    //   id: 20,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Gymnasium",
    //   description: "Indoor training facility for fitness and conditioning",
    //   date: "Facility",
    //   category: "Facilities",
    // },
    // {
    //   id: 21,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Changing Rooms",
    //   description: "Modern changing facilities for players",
    //   date: "Facility",
    //   category: "Facilities",
    // },
    // {
    //   id: 22,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Equipment Storage",
    //   description: "Well-organized storage for training equipment",
    //   date: "Facility",
    //   category: "Facilities",
    // },
    // {
    //   id: 23,
    //   src: "/placeholder.svg?height=400&width=600",
    //   title: "Medical Room",
    //   description: "First aid and injury treatment facility",
    //   date: "Facility",
    //   category: "Facilities",
    // },
  ]

  const allImages: Image[] = [...trainingImages, ...matchImages, ...eventImages, ...facilityImages]


  const navigateImage = (direction: "prev" | "next", images: Image[]) => {
    if (selectedImage === null) return

    const currentIndex = images.findIndex((img) => img.id === selectedImage)
    if (direction === "prev") {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
      setSelectedImage(images[newIndex].id)
    } else {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(images[newIndex].id)
    }
  }

  interface ImageGridProps {
    images: Image[]
  }

  const ImageGrid: React.FC<ImageGridProps> = ({ images }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Dialog key={image.id}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 overflow-hidden rounded-t-lg">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage(image.id)}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {image.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {image.date}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="relative">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <Badge className="bg-black/50 text-white">{image.category}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-black/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-white/90 text-sm mb-2">{image.description}</p>
                <div className="flex items-center text-white/80 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {image.date}
                </div>
              </div>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-black/20"
                  onClick={() => navigateImage("prev", images)}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-black/20"
                  onClick={() => navigateImage("next", images)}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[36px] lg:text-[60px] font-bold mb-2">Gallery</h1>
            <p className="lg:text-xl text-[16px] lg:w-[540px] w-auto text-green-100 leading-tight mx-auto">
              Capturing moments of excellence, growth, and achievement at Corporate Ballers Football Academy
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{allImages.length}</div>
              <div className="text-gray-600">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{trainingImages.length}</div>
              <div className="text-gray-600">Training Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{matchImages.length}</div>
              <div className="text-gray-600">Match Moments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{eventImages.length}</div>
              <div className="text-gray-600">Special Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="space-y-8">
            <div className="text-center mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">All Photos</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Browse through our complete collection of photos showcasing life at CBFA
                </p>
              </div>
              <ImageGrid images={allImages} />
            </TabsContent>

            <TabsContent value="training" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Training Sessions</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Behind the scenes of our intensive training programs and skill development sessions
                </p>
              </div>
              <ImageGrid images={trainingImages} />
            </TabsContent>

            <TabsContent value="matches" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Match Moments</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Capturing the excitement, passion, and victories from our competitive matches
                </p>
              </div>
              <ImageGrid images={matchImages} />
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Events</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Memorable moments from ceremonies, community outreach, and academy milestones
                </p>
              </div>
              <ImageGrid images={eventImages} />
            </TabsContent>

            <TabsContent value="facilities" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Facilities</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Take a tour of our modern training facilities and academy infrastructure
                </p>
              </div>
              <ImageGrid images={facilityImages} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white lg:mx-24 mx-4 mb-10 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="lg:text-4xl text-3xl font-bold mb-6">Be Part of Our Story</h2>
            <p className="text-xl text-green-100 mb-8">
              Join CBFA and create your own memorable moments. Your journey to football excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/auth/register">Join Our Academy</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent"
              >
                <Link href="/contact">Visit Our Facility</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
