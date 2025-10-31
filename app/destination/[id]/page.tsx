"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

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

const MOCK_DESTINATIONS: Record<number, Destination> = {
  1: {
    id: 1,
    name: "Taj Mahal",
    country: "India",
    image: "/taj-mahal-mausoleum.png",
    rating: 4.8,
    reviews: 1240,
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in Agra, a city in the Agra District in Uttar Pradesh. It was commissioned by Mughal emperor Shah Jahan to house the remains of his favourite wife, Mumtaz Mahal.",
    bestTimeToVisit: "October to March",
    duration: "4-6 hours",
    distance: "206 km from Delhi",
    elevation: "171 m above sea level",
    highlights: [
      "Stunning marble architecture",
      "Beautiful gardens and fountains",
      "Historic mosque and guest house",
      "Sunset and sunrise views",
    ],
    gallery: ["/taj-mahal-mausoleum.png", "/taj-mahal-mausoleum.png", "/taj-mahal-mausoleum.png"],
    guides: [
      { id: 1, name: "Rajesh Kumar", image: "/male-guide.jpg", rating: 4.8, packageCount: 12, priceFrom: 85 },
      { id: 2, name: "Arjun Nair", image: "/helpful-guide.png", rating: 4.7, packageCount: 8, priceFrom: 75 },
      { id: 3, name: "Dev Patel", image: "/helpful-guide.png", rating: 4.9, packageCount: 15, priceFrom: 95 },
    ],
    hotels: [
      { name: "The Oberoi Amarvilas", rating: 5, pricePerNight: "$300+" },
      { name: "ITC Mughal, Agra", rating: 5, pricePerNight: "$250+" },
      { name: "Trident Agra", rating: 4.5, pricePerNight: "$150+" },
    ],
    attractions: [
      {
        name: "Agra Fort",
        distance: "2.5 km away",
        description: "UNESCO World Heritage site with red sandstone walls",
      },
      { name: "Mehtab Bagh", distance: "1 km away", description: "Beautiful garden with views of Taj Mahal" },
      {
        name: "Kinari Bazaar",
        distance: "3 km away",
        description: "Traditional market for souvenirs and local crafts",
      },
    ],
    tips: [
      "Arrive early morning for fewer crowds and better photography",
      "Book tickets online to skip queues",
      "Bring comfortable walking shoes",
      "Photography is allowed everywhere except inside the mausoleum",
      "Respect local customs and dress modestly",
    ],
    coordinates: { lat: 27.1751, lng: 78.0421 },
  },
}

import ClientDestinationContent from "@/components/client-destination-content"

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const destinationId = Number.parseInt(id) || 1
  const destination = MOCK_DESTINATIONS[destinationId] || MOCK_DESTINATIONS[1]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ClientDestinationContent destination={destination} />
      <Footer />
    </main>
  )
}
