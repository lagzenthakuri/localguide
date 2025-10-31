"use client"

import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import PackageCard from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const MOCK_PACKAGES = [
  {
    id: 1,
    name: "Everest Base Camp Trek",
    price: 85,
    duration: "14 days",
    destination: "Sagarmatha",
    rating: 4.8,
    reviews: 324,
    guide: { id: 1, name: "Raj Singh", image: "/male-guide.jpg" },
    image: "/taj-mahal-mausoleum.png",
  },
  {
    id: 2,
    name: "Kathmandu Heritage Tour",
    price: 65,
    duration: "6 hours",
    destination: "Kathmandu",
    rating: 4.7,
    reviews: 156,
    guide: { id: 2, name: "Priya Sharma", image: "/female-guide.jpg" },
    image: "/jaipur-city-palace.jpg",
  },
  {
    id: 3,
    name: "Pokhara Lake Cruise",
    price: 120,
    duration: "8 hours",
    destination: "Pokhara",
    rating: 4.9,
    reviews: 289,
    guide: { id: 3, name: "Ramesh Chand", image: "/helpful-guide.png" },
    image: "/kerala-backwaters.jpg",
  },
  {
    id: 4,
    name: "Chitwan Safari Adventure",
    price: 75,
    duration: "2 days",
    destination: "Chitwan",
    rating: 4.6,
    reviews: 198,
    guide: { id: 4, name: "Anita Nepal", image: "/helpful-guide.png" },
    image: "/goa-beach.jpg",
  },
  {
    id: 5,
    name: "Nagarkot Sunrise Trek",
    price: 45,
    duration: "1 day",
    destination: "Nagarkot",
    rating: 4.7,
    reviews: 412,
    guide: { id: 5, name: "Vikas Sharma", image: "/helpful-guide.png" },
    image: "/mumbai-street-food.jpg",
  },
  {
    id: 6,
    name: "Rara Lake Mountain Experience",
    price: 150,
    duration: "3 days",
    destination: "Rara Lake",
    rating: 4.9,
    reviews: 87,
    guide: { id: 6, name: "Dev Patel", image: "/helpful-guide.png" },
    image: "/himalayas-trek.jpg",
  },
]

const DESTINATIONS = ["Sagarmatha", "Kathmandu", "Pokhara", "Chitwan", "Nagarkot", "Rara Lake"]
const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured")

  const filteredPackages = useMemo(() => {
    const result = MOCK_PACKAGES.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(pkg.destination)

      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          return pkg.price >= min && pkg.price <= max
        })

      return matchesSearch && matchesDestination && matchesPrice
    })

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "featured":
      default:
        break
    }

    return result
  }, [searchTerm, selectedDestinations, selectedPriceRanges, sortBy])

  const handleDestinationChange = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination) ? prev.filter((d) => d !== destination) : [...prev, destination],
    )
  }

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Packages</h1>
          <p className="text-slate-600 text-lg">Discover authentic experiences with verified local guides</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-white p-5 rounded-2xl border-2 border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Destination</h3>
                <div className="space-y-2">
                  {DESTINATIONS.map((destination) => (
                    <div key={destination} className="flex items-center">
                      <Checkbox
                        id={destination}
                        checked={selectedDestinations.includes(destination)}
                        onCheckedChange={() => handleDestinationChange(destination)}
                      />
                      <label htmlFor={destination} className="ml-2 text-sm text-slate-900 cursor-pointer">
                        {destination}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => {
                    const rangeKey = `${range.min}-${range.max}`
                    return (
                      <div key={rangeKey} className="flex items-center">
                        <Checkbox
                          id={rangeKey}
                          checked={selectedPriceRanges.includes(rangeKey)}
                          onCheckedChange={() => handlePriceRangeChange(rangeKey)}
                        />
                        <label htmlFor={rangeKey} className="ml-2 text-sm text-slate-900 cursor-pointer">
                          {range.label}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedDestinations([])
                  setSelectedPriceRanges([])
                  setSortBy("featured")
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-3 text-slate-600">🔍</span>
                <Input
                  type="text"
                  placeholder="Search packages or destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 rounded-lg border-2 border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 bg-white">
                <span className="text-sm text-slate-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-900 font-medium outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="mb-8 p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">🎯 Custom Package</h3>
                  <p className="text-slate-700">
                    Can't find the perfect package? Create a custom one and ask guides to bid for your offer!
                  </p>
                </div>
                <Link href="/packages/custom-package">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8">
                    Create Custom Package
                  </Button>
                </Link>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-slate-600 mb-6">
              Showing <span className="font-semibold text-slate-900">{filteredPackages.length}</span> of{" "}
              <span className="font-semibold text-slate-900">{MOCK_PACKAGES.length}</span> packages
            </p>

            {/* Package Grid */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-200">
                <p className="text-slate-600 text-lg mb-2">No packages found</p>
                <p className="text-slate-500 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
