"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Destination {
  id: number
  name: string
  country: string
  image: string
  rating: number
  reviews: number
  description: string
  bestTimeToVisit: string
  duration: string
  distance: string
  elevation?: string
  highlights: string[]
  gallery: string[]
  guides: Array<{
    id: number
    name: string
    image: string
    rating: number
    packageCount: number
    priceFrom: number
  }>
  hotels: Array<{
    name: string
    rating: number
    pricePerNight: string
  }>
  attractions: Array<{
    name: string
    distance: string
    description: string
  }>
  tips: string[]
  coordinates: { lat: number; lng: number }
}

export default function ClientDestinationContent({ destination }: { destination: Destination }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg?height=400&width=1200&query=destination"}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
                <div className="flex items-center gap-4 text-lg">
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{destination.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>
                      {destination.rating} ({destination.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 bg-white rounded-full text-foreground hover:bg-gray-100 transition"
                >
                  <span className={isFavorite ? "text-red-500 text-2xl" : "text-2xl"}>♡</span>
                </button>
                <button className="p-3 bg-white rounded-full text-foreground hover:bg-gray-100 transition">
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-12 relative z-10">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl mb-2">⏱️</p>
                <p className="text-sm text-foreground font-semibold">{destination.duration}</p>
                <p className="text-xs text-muted">Duration</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl mb-2">📅</p>
                <p className="text-sm text-foreground font-semibold">{destination.bestTimeToVisit}</p>
                <p className="text-xs text-muted">Best Time</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl mb-2">🗺️</p>
                <p className="text-sm text-foreground font-semibold">{destination.distance}</p>
                <p className="text-xs text-muted">Distance</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl mb-2">⛰️</p>
                <p className="text-sm text-foreground font-semibold">{destination.elevation}</p>
                <p className="text-xs text-muted">Elevation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="attractions">Nearby</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed mb-6">{destination.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-foreground mb-4">Highlights</h4>
                    <ul className="space-y-2">
                      {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground">
                          <span className="text-cyan-600 font-bold">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-foreground mb-4">Hotels</h4>
                    <div className="space-y-2">
                      {destination.hotels.map((hotel, idx) => (
                        <div key={idx} className="pb-2 border-b border-gray-200 last:border-0">
                          <p className="font-semibold text-foreground text-sm">{hotel.name}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                                <span key={i} className="text-yellow-400">
                                  ★
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-cyan-600 font-semibold">{hotel.pricePerNight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-2xl overflow-hidden cursor-pointer group border-2 border-gray-200"
                >
                  <img
                    src={img || "/placeholder.svg?height=300&width=300&query=destination"}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>

            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl mb-3">🖼️</p>
                <p className="text-foreground">View Street View below to explore the area</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-4">
            {destination.guides.map((guide) => (
              <Card key={guide.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={guide.image || "/placeholder.svg?height=60&width=60&query=guide"}
                        alt={guide.name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-foreground">{guide.name}</h3>
                        <div className="flex items-center gap-2 my-1">
                          <div className="flex gap-1">
                            {Array.from({ length: Math.floor(guide.rating) }).map((_, i) => (
                              <span key={i} className="text-yellow-400">
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-foreground">{guide.rating}</span>
                        </div>
                        <p className="text-xs text-foreground">{guide.packageCount} packages available</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-600">${guide.priceFrom}</p>
                      <Button size="sm" className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Attractions Tab */}
          <TabsContent value="attractions" className="space-y-4">
            {destination.attractions.map((attraction, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{attraction.name}</h3>
                      <p className="text-sm text-foreground mb-2">{attraction.description}</p>
                      <p className="text-xs text-foreground flex items-center gap-1">📍 {attraction.distance}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent border-cyan-600 text-cyan-600">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            {destination.tips.map((tip, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-foreground leading-relaxed">{tip}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Street View Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Explore Street View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center border-2 border-gray-200">
              <div className="text-center">
                <p className="text-4xl mb-3">🗺️</p>
                <p className="text-foreground font-semibold">360° Street View</p>
                <p className="text-xs text-foreground mt-1">
                  Coordinates: {destination.coordinates.lat}°N, {destination.coordinates.lng}°E
                </p>
                <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white">Open in Google Maps</Button>
              </div>
            </div>
            <p className="text-sm text-foreground mt-4">
              Use this 360° view to explore the destination before booking your tour. Zoom, pan, and navigate to see
              everything the destination has to offer.
            </p>
          </CardContent>
        </Card>

        {/* Booking CTA */}
        <div className="mt-8 p-6 bg-cyan-50 rounded-2xl border-2 border-cyan-600 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Ready to explore?</h3>
            <p className="text-foreground">Book a tour with a local guide today</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8">Book Now</Button>
        </div>
      </div>
    </>
  )
}
