"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import destinationsData from "@/data/destination-data.json"

interface DestinationCard {
  id: number
  name: string
  image: string
  country: string
  rating: number
  reviews: number
  description: string
  guides: Array<{ id: number }>
}

export default function DestinationsPage() {
  const DESTINATIONS: DestinationCard[] = destinationsData.destinations.map(dest => ({
    id: dest.id,
    name: dest.name,
    image: dest.image,
    country: dest.country,
    rating: dest.rating,
    reviews: dest.reviews,
    description: dest.description,
    guides: dest.guides
  }))

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-muted-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Nepal</h1>
          <p className="text-black text-lg font-medium">
            Discover Nepal's most beautiful destinations and book tours with verified local guides
          </p>
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
                    <span className="text-sm text-black">{destination.country}</span>
                  </div>

                  <p className="text-sm text-black mb-4 line-clamp-2">{destination.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-muted-light">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-accent text-2xl fill-yellow-500" />
                      <span className="font-semibold text-yellow-700 text-foreground">{destination.rating}</span>
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