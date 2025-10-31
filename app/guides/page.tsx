"use client"
import Navigation from "@/components/navigation"
import { useState } from "react"
import Link from "next/link"

export default function GuidesPage() {
  const [guides] = useState([
    {
      id: 1,
      name: "Raj Singh",
      experience: "8 years",
      location: "Sagarmatha (Mt. Everest)",
      specialization: "Trekking, Mountain Expeditions",
      languages: ["English", "Nepali", "Hindi"],
      rating: 4.9,
      reviews: 156,
      hourlyRate: "$45",
      image: "/male-guide.jpg",
      verified: true,
      packages: 12,
      responseTime: "< 2 hours",
    },
    {
      id: 2,
      name: "Priya Sharma",
      experience: "6 years",
      location: "Kathmandu",
      specialization: "Cultural Tours, Heritage",
      languages: ["English", "Nepali", "German"],
      rating: 4.8,
      reviews: 142,
      hourlyRate: "$40",
      image: "/female-guide.jpg",
      verified: true,
      packages: 10,
      responseTime: "< 1 hour",
    },
    {
      id: 3,
      name: "Ramesh Chand",
      experience: "12 years",
      location: "Pokhara",
      specialization: "Adventure, Paragliding",
      languages: ["English", "Nepali", "French"],
      rating: 4.9,
      reviews: 189,
      hourlyRate: "$50",
      image: "/male-guide.jpg",
      verified: true,
      packages: 15,
      responseTime: "< 1.5 hours",
    },
    {
      id: 4,
      name: "Anita Nepal",
      experience: "5 years",
      location: "Chitwan",
      specialization: "Wildlife, Nature",
      languages: ["English", "Nepali"],
      rating: 4.7,
      reviews: 98,
      hourlyRate: "$35",
      image: "/female-guide.jpg",
      verified: true,
      packages: 8,
      responseTime: "< 3 hours",
    },
    {
      id: 5,
      name: "Deepak Gurung",
      experience: "10 years",
      location: "Lukla",
      specialization: "High Altitude Trekking",
      languages: ["English", "Nepali", "Mandarin"],
      rating: 4.8,
      reviews: 176,
      hourlyRate: "$55",
      image: "/male-guide.jpg",
      verified: true,
      packages: 14,
      responseTime: "< 4 hours",
    },
    {
      id: 6,
      name: "Seema Paudel",
      experience: "7 years",
      location: "Panauti",
      specialization: "History Tours, Photography",
      languages: ["English", "Nepali", "Spanish"],
      rating: 4.6,
      reviews: 134,
      hourlyRate: "$38",
      image: "/female-guide.jpg",
      verified: true,
      packages: 11,
      responseTime: "< 2.5 hours",
    },
  ])

  const [filters, setFilters] = useState({
    rating: 0,
    language: "",
    priceMax: 100,
  })

  const filteredGuides = guides.filter((guide) => {
    const ratingMatch = guide.rating >= filters.rating
    const languageMatch = !filters.language || guide.languages.includes(filters.language)
    const priceMatch = Number.parseInt(guide.hourlyRate.replace("$", "")) <= filters.priceMax
    return ratingMatch && languageMatch && priceMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24">
      <Navigation/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Expert Guides</h1>
          <p className="text-lg text-slate-600">Choose from verified local guides with years of experience</p>
        </div>

        {/* Team Guide Collaboration Banner */}
        <div className="mb-12 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 md:p-10 text-white">
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-bold mb-4">
                ⭐ Premium Service
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Extra Support & Safety?
              </h2>
              <p className="text-lg text-cyan-50 mb-6 leading-relaxed">
                Book our expert guide teams! Get dual guides for enhanced safety, combined expertise, and personalized attention throughout your journey.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    🛡️
                  </div>
                  <span className="text-cyan-50">Enhanced safety with 24/7 dual support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    🎯
                  </div>
                  <span className="text-cyan-50">Combined decades of expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    👥
                  </div>
                  <span className="text-cyan-50">Better group management & attention</span>
                </div>
              </div>

              <Link href="/guide-collaboration">
                <button className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform inline-flex items-center gap-2">
                  View Team Packages
                  <span className="text-xl">→</span>
                </button>
              </Link>
            </div>

            {/* Right Side - Visual */}
            <div className="relative bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-8 md:p-10 flex items-center justify-center">
              <div className="relative">
                {/* Guide Icons */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    👨
                  </div>
                  <div className="text-4xl text-white">🤝</div>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    👩
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-lg">
                    <p className="text-2xl font-bold text-slate-900">98%</p>
                    <p className="text-xs text-slate-600">Success Rate</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-lg">
                    <p className="text-2xl font-bold text-slate-900">5/5</p>
                    <p className="text-xs text-slate-600">Safety Rating</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-lg">
                    <p className="text-2xl font-bold text-slate-900">3+</p>
                    <p className="text-xs text-slate-600">Team Packages</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-lg">
                    <p className="text-2xl font-bold text-slate-900">30+</p>
                    <p className="text-xs text-slate-600">Years Combined</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Filters</h3>

              <div className="space-y-6">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Minimum Rating</label>
                  <div className="space-y-2">
                    {[4.0, 4.5, 4.7, 4.9].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          checked={filters.rating === rating}
                          onChange={() => setFilters({ ...filters, rating })}
                          className="w-4 h-4 text-cyan-600"
                        />
                        <span className="ml-2 text-slate-700">{rating}+ ⭐</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Language</label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Nepali">Nepali</option>
                    <option value="Hindi">Hindi</option>
                    <option value="German">German</option>
                    <option value="French">French</option>
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Max Hourly Rate: ${filters.priceMax}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: Number.parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Reset */}
                <button
                  onClick={() => setFilters({ rating: 0, language: "", priceMax: 100 })}
                  className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-all"
                >
                  Reset Filters
                </button>
              </div>

              {/* Quick Link to Collaborations */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <Link href="/guide-collaboration">
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-4 cursor-pointer hover:border-cyan-400 transition-all">
                    <div className="text-2xl mb-2">🤝</div>
                    <p className="font-bold text-slate-900 text-sm mb-1">Team Guides</p>
                    <p className="text-xs text-slate-600 mb-3">Dual guide packages for extra support</p>
                    <div className="text-cyan-600 font-semibold text-xs">
                      Explore Teams →
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.map((guide) => (
                <Link href={`/guide/${guide.id}`} key={guide.id}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer h-full">
                    {/* Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-cyan-100 to-blue-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-slate-300 flex items-center justify-center text-4xl">
                          👤
                        </div>
                      </div>
                      {guide.verified && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ✓ Verified
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{guide.name}</h3>
                      <p className="text-sm text-slate-600 mb-3">📍 {guide.location}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-amber-500">⭐ {guide.rating}</span>
                        <span className="text-sm text-slate-500">({guide.reviews} reviews)</span>
                      </div>

                      {/* Specialization */}
                      <p className="text-sm text-slate-700 mb-3 font-semibold">{guide.specialization}</p>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {guide.languages.slice(0, 2).map((lang) => (
                          <span key={lang} className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4 pb-4 border-b border-slate-200">
                        <div>
                          <p className="font-bold text-slate-900">{guide.packages}</p>
                          <p className="text-slate-600">Packages</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{guide.experience}</p>
                          <p className="text-slate-600">Experience</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{guide.responseTime}</p>
                          <p className="text-slate-600">Response</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-cyan-600">{guide.hourlyRate}/hour</p>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600">No guides found matching your filters. Try adjusting them.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}