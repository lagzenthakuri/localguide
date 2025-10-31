"use client"

import Link from "next/link"

const destinations = [
  {
    id: 1,
    name: "Mt. Everest",
    region: "Nepal",
    guides: 128,
    image: "/mountain-peak-snow-everest.jpg",
    tours: 45,
  },
  {
    id: 2,
    name: "ABC Camp",
    region: "Nepal",
    guides: 95,
    image: "/mountain-camping-trek.jpg",
    tours: 38,
  },
  {
    id: 3,
    name: "Kathmandu",
    region: "Nepal",
    guides: 156,
    image: "/ancient-city-temples-architecture.jpg",
    tours: 72,
  },
  {
    id: 4,
    name: "Lusolie",
    region: "Tanzania",
    guides: 87,
    image: "/safari-wildlife-landscape.jpg",
    tours: 29,
  },
]

export default function TopDestinations() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Top Destinations</h2>
          <p className="text-xl text-muted max-w-2xl">
            Explore the most popular destinations with verified local guides
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link key={dest.id} href={`/destination/${dest.id}`} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img
                  src={dest.image || "/placeholder.svg"}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{dest.name}</h3>
                  <p className="text-blue-100">{dest.region}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>{dest.guides} Guides</span>
                <span>{dest.tours} Tours</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
