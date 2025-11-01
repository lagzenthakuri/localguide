// "use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ClientDestinationContent from "@/components/client-destination-content"
import destinationsData from "@/data/destination-data.json"

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

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const destinationId = Number.parseInt(id) || 1
  
  // Create a map of destinations from JSON data
  const destinationsMap: Record<number, Destination> = {}
  destinationsData.destinations.forEach(dest => {
    destinationsMap[dest.id] = dest as Destination
  })
  
  // Get the destination or fallback to first one
  const destination = destinationsMap[destinationId] || destinationsMap[1]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ClientDestinationContent destination={destination} />
      <Footer />
    </main>
  )
}