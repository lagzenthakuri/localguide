"use client"
import Navigation from "@/components/navigation"
import { useState } from "react"
import Link from "next/link"
import Footer from "@/components/footer"

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
        <div className="mb-12 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Side - Content */}
            <div className="md:col-span-3 p-8 md:p-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-600 tracking-wide">PREMIUM SERVICE</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Team Guide Support
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Enhanced safety and expertise with dual-guide teams. Perfect for challenging treks and larger groups.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 transition-colors duration-200">
                    <svg className="w-3 h-3 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">24/7 dual guide coverage for enhanced safety</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 transition-colors duration-200">
                    <svg className="w-3 h-3 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Combined expertise and local knowledge</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 transition-colors duration-200">
                    <svg className="w-3 h-3 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Better attention for larger groups</span>
                </div>
              </div>

              <Link href="/guide-collaboration">
                <button className="group inline-flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all duration-200">
                  <span>Explore Team Packages</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Right Side - Visual */}
            <div className="md:col-span-2 relative bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:p-10 flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                {/* Guide Icons */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-200 hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">👨</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center animate-pulse">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-200 hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">👩</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <p className="text-2xl font-bold text-slate-900 mb-1">98%</p>
                    <p className="text-xs text-slate-600 font-medium">Success Rate</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <p className="text-2xl font-bold text-slate-900 mb-1">5.0</p>
                    <p className="text-xs text-slate-600 font-medium">Safety Rating</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <p className="text-2xl font-bold text-slate-900 mb-1">12+</p>
                    <p className="text-xs text-slate-600 font-medium">Team Options</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <p className="text-2xl font-bold text-slate-900 mb-1">30+</p>
                    <p className="text-xs text-slate-600 font-medium">Years Combined</p>
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
      <Footer/>
    </div>
  )
}