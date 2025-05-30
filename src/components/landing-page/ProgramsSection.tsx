import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, GraduationCap } from "lucide-react"
import Link from "next/link"

export function ProgramsSection() {

  type ButtonVariant = "default" | "secondary" | "outline" | "link" | "destructive" | "ghost";

  interface Program {
    icon: React.ElementType;
    title: string;
    age: string;
    description: string;
    features: string[];
    color: string;
    buttonText: string;
    buttonVariant: ButtonVariant;
    link: string;
  }

  const programs: Program[] = [
    {
      icon: Users,
      title: "Junior Category",
      age: "Ages 12-17",
      description: "Foundation training focusing on skill development, teamwork, and character building.",
      features: ["Basic football skills", "Physical fitness", "Team dynamics", "Academic support"],
      color: "bg-blue-50 border-blue-200",
      buttonText: "Learn more",
      buttonVariant: "default",
      link: "/program/junior"
    },
    {
      icon: Trophy,
      title: "Senior Category",
      age: "Ages 18+",
      description: "Advanced training for serious players aiming for professional football careers.",
      features: ["Advanced tactics", "Professional preparation", "Career guidance", "Tournament participation"],
      color: "bg-green-50 border-green-200",
      buttonText: "Learn more",
      buttonVariant: "secondary",
      link: "/program/senior"
    },
    {
      icon: GraduationCap,
      title: "Elite Development",  // Fixed typo from "Elite" to "Elite"
      age: "Selected Players",
      description: "Specialized program for exceptional talents with professional potential.",
      features: ["Individual coaching", "Professional trials", "International exposure", "Scholarship opportunities"],
      color: "bg-yellow-50 border-yellow-200",
      buttonText: "Learn more",
      buttonVariant: "outline",
      link: "/program/elite"
    },
  ]

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="lg:text-4xl text-[30px] font-bold text-gray-900 mb-4">Our Training Programs</h2>
          <p className="text-[16px] text-gray-600 lg:w-[400px] w-auto mx-auto leading-tight">
            Comprehensive programs designed to develop players at every level, from beginners to elite athletes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <Card key={index} className={`${program.color} hover:shadow-lg transition-shadow duration-300 flex flex-col h-full`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <program.icon className="h-10 w-10 text-gray-700" />
                  <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full">
                    {program.age}
                  </span>
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription className="text-gray-600">{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="px-6 pb-6">
                <Link href={program.link} passHref>
                  <Button 
                    variant={program.buttonVariant} 
                    className={`w-full ${
                      program.buttonVariant === 'default' ? 'bg-[#047146] hover:bg-green-900 cursor-pointer text-white' : 
                      program.buttonVariant === 'secondary' ? 'bg-[#047146] hover:bg-green-900 cursor-pointer text-white' : 
                      'bg-[#047146] hover:bg-green-900 cursor-pointer text-white'
                    }`}
                  >
                    {program.buttonText}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}