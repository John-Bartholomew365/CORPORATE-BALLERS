import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Link from "next/link"

export function NewsSection() {
  const news = [
    {
      title: "CBFA Wins Regional Championship",
      description:
        "Our senior team secured victory in the Kwara State Regional Championship, showcasing exceptional teamwork and skill.",
      date: "December 15, 2024",
      image: "/winner.jpg",
      category: "Achievement",
    },
    {
      title: "Team Huddle",
      description:
        "Pre-match team talk and motivation",
      date: "December 10, 2024",
      image: "/training.jpg",
      category: "Team",
    },
    {
      title: "Training section",
      description:
        "Our team's pre-match training ahead of the tournament's match",
      date: "December 5, 2024",
      image: "/youth.jpg",
      category: "Program",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lg:text-4xl text-[30px] font-bold text-gray-900 mb-4">Latest News & Updates</h2>
          <p className="lg:text-xl text-[16px] lg:w-[400px] w-auto text-gray-600 mx-auto">
            Stay updated with the latest happenings at Corporate Ballers Football Academy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-lg hover:text-green-600 transition-colors">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              {/* <CardContent>
                <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent> */}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white"
          >
            <Link href="/news">View All News</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
