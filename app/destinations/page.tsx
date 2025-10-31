"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"

interface DestinationCard {
  id: number
  name: string
  image: string
  country: string
  rating: number
  reviews: number
  description: string
  guides: number
}

const DESTINATIONS: DestinationCard[] = [
  {
    id: 1,
    name: "Taj Mahal",
    image: "/taj-mahal-mausoleum.png",
    country: "Agra, India",
    rating: 4.8,
    reviews: 1240,
    description: "Iconic white marble mausoleum and UNESCO World Heritage site",
    guides: 12,
  },
  {
    id: 2,
    name: "Jaipur City Palace",
    image: "/jaipur-city-palace.jpg",
    country: "Jaipur, India",
    rating: 4.6,
    reviews: 856,
    description: "Historic blend of Rajasthani and Mughal architecture",
    guides: 8,
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    image: "/kerala-backwaters.jpg",
    country: "Kerala, India",
    rating: 4.9,
    reviews: 2103,
    description: "Scenic waterways and tropical landscape paradise",
    guides: 15,
  },
  {
    id: 4,
    name: "Goa Beaches",
    image: "/goa-beach.jpg",
    country: "Goa, India",
    rating: 4.7,
    reviews: 1567,
    description: "Golden sandy beaches with vibrant beach culture",
    guides: 10,
  },
  {
    id: 5,
    name: "Himalayas",
    image: "/himalayas-trek.jpg",
    country: "Northern India",
    rating: 4.9,
    reviews: 945,
    description: "Majestic mountain ranges with trekking and adventure",
    guides: 11,
  },
  {
    id: 6,
    name: "Mumbai Street Food",
    image: "/mumbai-street-food.jpg",
    country: "Mumbai, India",
    rating: 4.8,
    reviews: 1123,
    description: "Vibrant culinary experience and local food culture",
    guides: 9,
  },
]

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-muted-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Top Destinations</h1>
          <p className="text-muted text-lg">Explore popular destinations and book tours with verified local guides</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((destination) => (
            <Link key={destination.id} href={`/destination/${destination.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{destination.name}</h3>
                  <div className="flex items-center gap-1 text-muted mb-3">
                    <MapPin size={16} />
                    <span className="text-sm">{destination.country}</span>
                  </div>

                  <p className="text-sm text-muted mb-4 line-clamp-2">{destination.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-muted-light">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-accent fill-accent" />
                      <span className="font-semibold text-foreground">{destination.rating}</span>
                      <span className="text-xs text-muted">({destination.reviews})</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary-dark text-white">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
