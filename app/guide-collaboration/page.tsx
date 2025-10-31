"use client"

import { useState } from "react"

// TypeScript Interfaces
interface Destination {
  id: number
  name: string
  country: string
  rating: number
  reviews: number
}

interface Guide {
  id: number
  name: string
  experience: string
  location: string
  specialization: string
  rating: number
  reviews: number
  image: string
}

interface Package {
  id: number
  name: string
  price: number
  duration: string
  destination: string
  destinationId: number
  rating: number
  reviews: number
  guideId: number
  type: string
  inclusions: string[]
}

interface Collaboration {
  id: number
  mainGuideId: number
  assistantGuideId: number
  packageId: number
  destinationId: number
  combinedExperience: string
  teamSpecialization: string
  groupSize: string
  safetyRating: string
  successRate: string
  highlights: string[]
}

interface DestinationData {
  destinations: Destination[]
  guides: Guide[]
  packages: Package[]
}

// Import data from destination-data.json
const destinationData: DestinationData = {
  destinations: [
    {
      id: 1,
      name: "Sagarmatha (Mt. Everest)",
      country: "Solukhumbu, Nepal",
      rating: 4.9,
      reviews: 2847
    },
    {
      id: 2,
      name: "Kathmandu Valley",
      country: "Kathmandu, Nepal",
      rating: 4.7,
      reviews: 3421
    },
    {
      id: 3,
      name: "Pokhara Valley",
      country: "Pokhara, Nepal",
      rating: 4.8,
      reviews: 2903
    },
    {
      id: 4,
      name: "Chitwan National Park",
      country: "Chitwan, Nepal",
      rating: 4.7,
      reviews: 1876
    },
    {
      id: 5,
      name: "Lumbini",
      country: "Rupandehi, Nepal",
      rating: 4.6,
      reviews: 1543
    },
    {
      id: 6,
      name: "Annapurna Base Camp",
      country: "Kaski, Nepal",
      rating: 4.9,
      reviews: 2234
    }
  ],
  guides: [
    {
      id: 1,
      name: "Raj Singh",
      experience: "8 years",
      location: "Sagarmatha (Mt. Everest)",
      specialization: "Trekking, Mountain Expeditions",
      rating: 4.9,
      reviews: 156,
      image: "/male-guide.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      experience: "6 years",
      location: "Kathmandu",
      specialization: "Cultural Tours, Heritage",
      rating: 4.8,
      reviews: 142,
      image: "/female-guide.jpg"
    },
    {
      id: 3,
      name: "Ramesh Chand",
      experience: "12 years",
      location: "Pokhara",
      specialization: "Adventure, Paragliding",
      rating: 4.9,
      reviews: 189,
      image: "/male-guide.jpg"
    },
    {
      id: 4,
      name: "Anita Nepal",
      experience: "5 years",
      location: "Chitwan",
      specialization: "Wildlife, Nature",
      rating: 4.7,
      reviews: 98,
      image: "/female-guide.jpg"
    },
    {
      id: 5,
      name: "Deepak Gurung",
      experience: "10 years",
      location: "Lukla",
      specialization: "High Altitude Trekking",
      rating: 4.8,
      reviews: 176,
      image: "/male-guide.jpg"
    },
    {
      id: 6,
      name: "Seema Paudel",
      experience: "7 years",
      location: "Lumbini",
      specialization: "History Tours, Photography",
      rating: 4.6,
      reviews: 134,
      image: "/female-guide.jpg"
    }
  ],
  packages: [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      price: 85,
      duration: "14 days",
      destination: "Sagarmatha",
      destinationId: 1,
      rating: 4.8,
      reviews: 324,
      guideId: 1,
      type: "Adventure & Trekking",
      inclusions: [
        "Professional Mountain Guide",
        "Accommodation in mountain lodges",
        "All meals (breakfast, lunch, dinner)",
        "Trek permits and insurance",
        "Oxygen backup (if needed)",
        "Emergency evacuation support"
      ]
    },
    {
      id: 2,
      name: "Kathmandu Heritage Tour",
      price: 65,
      duration: "6 hours",
      destination: "Kathmandu",
      destinationId: 2,
      rating: 4.7,
      reviews: 156,
      guideId: 2,
      type: "Cultural Experience",
      inclusions: [
        "Expert cultural guide",
        "Transportation",
        "Entrance fees to all sites",
        "Traditional lunch",
        "Hotel pickup and drop"
      ]
    },
    {
      id: 3,
      name: "Pokhara Lake Cruise & Adventure",
      price: 120,
      duration: "8 hours",
      destination: "Pokhara",
      destinationId: 3,
      rating: 4.9,
      reviews: 289,
      guideId: 3,
      type: "Relaxation",
      inclusions: [
        "Boat cruise on Phewa Lake",
        "Paragliding experience",
        "Lunch with lake view",
        "Cave exploration",
        "Transportation"
      ]
    },
    {
      id: 4,
      name: "Chitwan Safari Adventure",
      price: 75,
      duration: "2 days",
      destination: "Chitwan",
      destinationId: 4,
      rating: 4.6,
      reviews: 198,
      guideId: 4,
      type: "Wildlife",
      inclusions: [
        "Jungle safari",
        "Canoe ride",
        "Elephant breeding center visit",
        "Tharu cultural program",
        "Full board accommodation"
      ]
    },
    {
      id: 5,
      name: "Annapurna Base Camp Trek",
      price: 150,
      duration: "10 days",
      destination: "Annapurna",
      destinationId: 6,
      rating: 4.9,
      reviews: 412,
      guideId: 3,
      type: "Adventure & Trekking",
      inclusions: [
        "Experienced trekking guide",
        "Teahouse accommodation",
        "All meals during trek",
        "Permits and fees",
        "Porter service available"
      ]
    },
    {
      id: 6,
      name: "Lumbini Pilgrimage Tour",
      price: 45,
      duration: "1 day",
      destination: "Lumbini",
      destinationId: 5,
      rating: 4.6,
      reviews: 87,
      guideId: 6,
      type: "Cultural Experience",
      inclusions: [
        "Expert guide on Buddhism",
        "Bicycle rental",
        "Entrance fees",
        "Lunch at monastery",
        "Transportation"
      ]
    }
  ]
}

export default function GuideCollaborationPage() {
  const [selectedCollab, setSelectedCollab] = useState<Collaboration | null>(null)
  
  // Enhanced collaborations with real data connections
  const [collaborations] = useState<Collaboration[]>([
    {
      id: 1,
      mainGuideId: 1,
      assistantGuideId: 5,
      packageId: 1,
      destinationId: 1,
      combinedExperience: "18 years",
      teamSpecialization: "High Altitude Mountain Expeditions",
      groupSize: "8-12 people",
      safetyRating: "5/5",
      successRate: "98%",
      highlights: [
        "Dual guide system for safety",
        "24/7 emergency support",
        "Altitude sickness management",
        "Helicopter evacuation backup"
      ]
    },
    {
      id: 2,
      mainGuideId: 2,
      assistantGuideId: 6,
      packageId: 2,
      destinationId: 2,
      combinedExperience: "13 years",
      teamSpecialization: "Cultural Heritage & Photography Tours",
      groupSize: "6-10 people",
      safetyRating: "5/5",
      successRate: "100%",
      highlights: [
        "Expert historians and photographers",
        "Access to restricted heritage sites",
        "Professional photo guidance",
        "Traditional cuisine experiences"
      ]
    },
    {
      id: 3,
      mainGuideId: 3,
      assistantGuideId: 4,
      packageId: 3,
      destinationId: 3,
      combinedExperience: "17 years",
      teamSpecialization: "Adventure Sports & Wildlife Exploration",
      groupSize: "4-8 people",
      safetyRating: "5/5",
      successRate: "99%",
      highlights: [
        "Certified paragliding instructors",
        "Wildlife tracking experts",
        "Multi-activity coordination",
        "Nature photography workshops"
      ]
    }
  ])

  const getGuideById = (id: number): Guide | undefined => {
    return destinationData.guides.find(g => g.id === id)
  }

  const getPackageById = (id: number): Package | undefined => {
    return destinationData.packages.find(p => p.id === id)
  }

  const getDestinationById = (id: number): Destination | undefined => {
    return destinationData.destinations.find(d => d.id === id)
  }

  const openModal = (collab: Collaboration): void => {
    setSelectedCollab(collab)
  }

  const closeModal = (): void => {
    setSelectedCollab(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Expert Guide Collaborations</h1>
          <p className="text-lg text-slate-600">
            Dual-guide teams providing enhanced safety, expertise, and unforgettable experiences
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Why Choose Team Guides?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-bold mb-1">Enhanced Safety</h3>
              <p className="text-sm text-cyan-100">Dual support system for emergencies</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-1">Expert Knowledge</h3>
              <p className="text-sm text-cyan-100">Combined decades of experience</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-bold mb-1">Better Attention</h3>
              <p className="text-sm text-cyan-100">Personalized care for each guest</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold mb-1">Flexible Service</h3>
              <p className="text-sm text-cyan-100">Adaptable to group needs</p>
            </div>
          </div>
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collaborations.map((collab) => {
            const mainGuide = getGuideById(collab.mainGuideId)
            const assistantGuide = getGuideById(collab.assistantGuideId)
            const packageData = getPackageById(collab.packageId)
            const destination = getDestinationById(collab.destinationId)

            if (!mainGuide || !assistantGuide || !packageData || !destination) return null

            return (
              <div key={collab.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                {/* Destination Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                      {packageData.type}
                    </span>
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                      {packageData.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm text-cyan-100">{destination.country}</p>
                </div>

                {/* Guides Section */}
                <div className="p-6 bg-slate-50">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
                    Your Expert Team
                  </h4>

                  <div className="space-y-4">
                    {/* Main Guide */}
                    <div className="bg-white rounded-lg p-4 border-2 border-cyan-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-xl">
                          👨
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{mainGuide.name}</p>
                          <p className="text-xs text-slate-600">{mainGuide.experience} experience</p>
                        </div>
                        <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-1 rounded">
                          Lead
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-amber-500">⭐ {mainGuide.rating}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-600">{mainGuide.reviews} reviews</span>
                      </div>
                    </div>

                    {/* Connection */}
                    <div className="flex justify-center -my-2">
                      <div className="bg-white rounded-full p-2 shadow-md">
                        <div className="text-2xl">🤝</div>
                      </div>
                    </div>

                    {/* Assistant Guide */}
                    <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-xl">
                          👩
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{assistantGuide.name}</p>
                          <p className="text-xs text-slate-600">{assistantGuide.experience} experience</p>
                        </div>
                        <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded">
                          Support
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-amber-500">⭐ {assistantGuide.rating}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-600">{assistantGuide.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-6">
                  <h4 className="font-bold text-slate-900 mb-3">{packageData.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Combined Experience</p>
                      <p className="font-bold text-slate-900">{collab.combinedExperience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Group Size</p>
                      <p className="font-bold text-slate-900">{collab.groupSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Safety Rating</p>
                      <p className="font-bold text-green-600">{collab.safetyRating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Success Rate</p>
                      <p className="font-bold text-green-600">{collab.successRate}</p>
                    </div>
                  </div>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                    <div>
                      <p className="text-2xl font-bold text-cyan-600">${packageData.price}</p>
                      <p className="text-xs text-slate-600">per person</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-500">⭐ {packageData.rating}</p>
                      <p className="text-xs text-slate-600">{packageData.reviews} reviews</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => openModal(collab)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const mainGuide = getGuideById(selectedCollab.mainGuideId)
              const assistantGuide = getGuideById(selectedCollab.assistantGuideId)
              const packageData = getPackageById(selectedCollab.packageId)
              const destination = getDestinationById(selectedCollab.destinationId)

              if (!mainGuide || !assistantGuide || !packageData || !destination) return null

              return (
                <>
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                    >
                      ✕
                    </button>
                    <h2 className="text-3xl font-bold mb-2">{packageData.name}</h2>
                    <p className="text-cyan-100 mb-4">{destination.name}, {destination.country}</p>
                    <div className="flex gap-4">
                      <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                        {packageData.duration}
                      </span>
                      <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                        {packageData.type}
                      </span>
                      <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                        ⭐ {packageData.rating} ({packageData.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Team Guides Section */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Meet Your Expert Team</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Lead Guide */}
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-2xl">
                              👨
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-slate-900">{mainGuide.name}</h4>
                              <p className="text-sm text-slate-600">Lead Guide</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold">Experience:</span> {mainGuide.experience}</p>
                            <p><span className="font-semibold">Specialization:</span> {mainGuide.specialization}</p>
                            <p><span className="font-semibold">Location:</span> {mainGuide.location}</p>
                            <div className="flex items-center gap-2 pt-2">
                              <span className="text-amber-500 font-bold">⭐ {mainGuide.rating}</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-slate-600">{mainGuide.reviews} reviews</span>
                            </div>
                          </div>
                        </div>

                        {/* Support Guide */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-2xl">
                              👩
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-slate-900">{assistantGuide.name}</h4>
                              <p className="text-sm text-slate-600">Support Guide</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold">Experience:</span> {assistantGuide.experience}</p>
                            <p><span className="font-semibold">Specialization:</span> {assistantGuide.specialization}</p>
                            <p><span className="font-semibold">Location:</span> {assistantGuide.location}</p>
                            <div className="flex items-center gap-2 pt-2">
                              <span className="text-amber-500 font-bold">⭐ {assistantGuide.rating}</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-slate-600">{assistantGuide.reviews} reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Package Highlights */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Team Collaboration Benefits</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedCollab.highlights.map((highlight: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
                            <div className="text-green-600 text-xl">✓</div>
                            <p className="text-slate-700">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's Included */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">What's Included</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {packageData.inclusions.map((item: string, index: number) => (
                          <div key={index} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                            <div className="text-green-600 text-lg">✓</div>
                            <p className="text-slate-700 text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-slate-900 mb-1">{selectedCollab.combinedExperience}</p>
                        <p className="text-xs text-slate-600">Combined Experience</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-slate-900 mb-1">{selectedCollab.groupSize}</p>
                        <p className="text-xs text-slate-600">Group Size</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-green-600 mb-1">{selectedCollab.safetyRating}</p>
                        <p className="text-xs text-slate-600">Safety Rating</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-green-600 mb-1">{selectedCollab.successRate}</p>
                        <p className="text-xs text-slate-600">Success Rate</p>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-3xl font-bold mb-1">${packageData.price}</p>
                          <p className="text-sm text-cyan-100">per person • {packageData.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold mb-1">⭐ {packageData.rating}</p>
                          <p className="text-sm text-cyan-100">{packageData.reviews} reviews</p>
                        </div>
                      </div>
                      <button className="w-full py-4 bg-white text-cyan-600 rounded-lg font-bold text-lg hover:bg-cyan-50 transition">
                        Book This Team Package
                      </button>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}