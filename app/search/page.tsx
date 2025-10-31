"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import PackageCard from "@/components/package-card"
import GuideCard from "@/components/guide-card"
import Footer from "@/components/footer"

const mockPackages = [
  {
    id: 1,
    name: "3 Day Everest Trek",
    price: 150,
    duration: "3 days",
    destination: "Everest",
    rating: 4.8,
    reviews: 124,
    guide: { id: 1, name: "Ram Chand", image: "/guide-profile.jpg" },
    image: "/mountain-trekking-everest.jpg",
  },
  {
    id: 2,
    name: "5 Day Package",
    price: 280,
    duration: "5 days",
    destination: "Kathmandu",
    rating: 4.9,
    reviews: 89,
    guide: { id: 2, name: "Laxmi", image: "/guide-profile.jpg" },
    image: "/nepal-cultural-tour.jpg",
  },
  {
    id: 3,
    name: "7 Day Package",
    price: 420,
    duration: "7 days",
    destination: "Sagarmatha",
    rating: 5,
    reviews: 45,
    guide: { id: 3, name: "Sherpa Dawa", image: "/guide-profile.jpg" },
    image: "/mountain-adventure.png",
  },
  {
    id: 4,
    name: "30 Day Package",
    price: 1200,
    duration: "30 days",
    destination: "Nepal",
    rating: 4.7,
    reviews: 67,
    guide: { id: 4, name: "Kavi Chand", image: "/guide-profile.jpg" },
    image: "/nepal-landscape.jpg",
  },
]

const mockGuides = [
  {
    id: 1,
    name: "Ram Chand",
    experience: "8 years",
    location: "Sagarmatha",
    rating: 4.8,
    reviews: 245,
    languages: ["English", "Nepali", "Hindi"],
    image: "/male-guide-smiling.jpg",
  },
  {
    id: 2,
    name: "Laxmi Poudel",
    experience: "5 years",
    location: "Kathmandu",
    rating: 4.9,
    reviews: 187,
    languages: ["English", "Nepali"],
    image: "/female-guide-smiling.jpg",
  },
  {
    id: 3,
    name: "Sherpa Dawa",
    experience: "12 years",
    location: "Everest",
    rating: 5,
    reviews: 312,
    languages: ["English", "Nepali", "Mandarin"],
    image: "/sherpa-guide.jpg",
  },
  {
    id: 4,
    name: "Kavi Singh",
    experience: "6 years",
    location: "Pokhara",
    rating: 4.6,
    reviews: 156,
    languages: ["English", "Nepali", "Spanish"],
    image: "/guide-adventure.jpg",
  },
]

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("packages")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    priceRange: [0, 1500],
    rating: 4,
    duration: [],
  })

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-600 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search destinations, guides, experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-600 text-slate-900"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-slate-200">
          <button
            onClick={() => setActiveTab("packages")}
            className={`pb-3 px-4 font-semibold transition ${
              activeTab === "packages" ? "border-b-2 border-cyan-600 text-cyan-600" : "text-slate-600"
            }`}
          >
            Packages
          </button>
          <button
            onClick={() => setActiveTab("guides")}
            className={`pb-3 px-4 font-semibold transition ${
              activeTab === "guides" ? "border-b-2 border-cyan-600 text-cyan-600" : "text-slate-600"
            }`}
          >
            Guides
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-6 rounded-xl sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">⚙️</span>
                <h3 className="font-bold text-slate-900">Filters</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Minimum Rating: {filters.rating}+
                  </label>
                  <div className="space-y-2">
                    {[3, 3.5, 4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, rating })}
                        className={`block w-full text-left p-2 rounded transition ${
                          filters.rating === rating ? "bg-cyan-600 text-white" : "hover:bg-slate-100"
                        }`}
                      >
                        {"★".repeat(Math.floor(rating))} {rating}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "packages" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPackages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {mockGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
