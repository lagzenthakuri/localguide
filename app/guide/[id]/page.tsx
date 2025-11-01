"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import destinationData from "@/data/destination-data.json"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function GuidePage({ params }: PageProps) {
  // Get guide ID from params (default to 1 for demo)
  const guideId = 1
  
  // Find guide from JSON data
  const guide = destinationData.guides.find(g => g.id === guideId) || destinationData.guides[0]
  
  // Find packages for this guide
  const guidePackages = destinationData.packages.filter(pkg => pkg.guideId === guideId)
  
  // Find other guides as collaborators (excluding current guide)
  const collaborators = destinationData.guides
    .filter(g => g.id !== guideId)
    .slice(0, 3)
    .map(g => ({
      id: g.id,
      name: g.name,
      location: g.location,
      rating: g.rating,
      image: g.image
    }))
  
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedTab, setSelectedTab] = useState("about")
  const [showBargainingForm, setShowBargainingForm] = useState(false)
  const [bargainPrice, setBargainPrice] = useState(guide.hourlyRate)
  
  // Mock additional data not in JSON (can be added to JSON later)
  const guideExtras = {
    bio: `Passionate ${guide.specialization.toLowerCase()} guide with ${guide.experience} of experience. Specializes in creating unforgettable experiences in ${guide.location}.`,
    about: `I am ${guide.name}, a dedicated guide with ${guide.experience} of experience. My passion for Nepal's culture and landscapes drives me to provide authentic experiences. Whether you're interested in ${guide.specialization.toLowerCase()}, I can create personalized itineraries that match your interests and pace.`,
    certifications: ["Licensed Tour Guide", "First Aid Certified", "Tourism Board Registered"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "2 weeks ago",
        text: `${guide.name} was incredibly knowledgeable. The experience was amazing!`,
      },
      {
        id: 2,
        author: "Michael Chen",
        rating: 5,
        date: "1 month ago",
        text: "Best guide ever! Very professional, punctual, and passionate about their work.",
      },
      {
        id: 3,
        author: "Emma Wilson",
        rating: 4,
        date: "2 months ago",
        text: "Great experience overall. Would definitely recommend!",
      },
    ],
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guide Header */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-cyan-100 to-blue-100"></div>

          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 -mt-24">
              <img
                src={guide.image || "/placeholder.svg?height=128&width=128"}
                alt={guide.name}
                className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-lg"
              />

              <div className="flex-1 flex flex-col justify-end pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{guide.name}</h1>
                    <div className="flex items-center gap-4 text-slate-600 mb-2">
                      <div className="flex items-center gap-1">
                        <span>📍</span>
                        <span>{guide.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{guide.experience}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition"
                  >
                    <span className="text-2xl">{isFavorite ? "❤️" : "🤍"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="font-bold text-lg text-slate-900">{guide.rating}</span>
                <span className="text-slate-600">({guide.reviews} reviews)</span>
              </div>
              {guide.verified && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">Verified ✓</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 mb-1">${guide.hourlyRate}</div>
                <div className="text-sm text-slate-600">per day</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 mb-1">{guide.languages.length}</div>
                <div className="text-sm text-slate-600">languages</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900 mb-1">{guide.responseTime}</div>
                <div className="text-sm text-slate-600">response time</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="text-2xl">🏅</span>
                <div className="text-sm text-slate-600 mt-1">verified</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="collaborators">Team</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 leading-relaxed">{guideExtras.about}</p>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialization.split(', ').map((spec: string) => (
                      <span key={spec} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang: string) => (
                      <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Certifications</h4>
                  <ul className="space-y-2">
                    {guideExtras.certifications.map((cert: string) => (
                      <li key={cert} className="flex items-center gap-2 text-slate-700">
                        <span>✓</span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-4">
            {guidePackages.length > 0 ? (
              guidePackages.map((pkg: any) => (
                <Card key={pkg.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{pkg.name}</h4>
                        <p className="text-sm text-slate-600">{pkg.duration}</p>
                        <p className="text-xs text-slate-500 mt-1">{pkg.reviews} reviews</p>
                        <p className="text-xs text-blue-600 mt-1">⭐ {pkg.rating}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-cyan-600">${pkg.price}</div>
                        <Button className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-slate-600 text-center">No packages available yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="collaborators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guides I Work With</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {collaborators && collaborators.length > 0 ? (
                  collaborators.map((collab: any) => (
                    <div
                      key={collab.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={collab.image || "/placeholder.svg"}
                          alt={collab.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900">{collab.name}</h4>
                          <p className="text-sm text-slate-600">{collab.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">⭐ {collab.rating}</p>
                        <Link href={`/guide/${collab.id}`}>
                          <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600">No collaborators yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            {guideExtras.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">{review.author}</h4>
                          <p className="text-xs text-slate-600">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i} className="text-lg">
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-white rounded-2xl border-2 border-slate-200 p-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">💰 Negotiate Price</h3>
          {!showBargainingForm ? (
            <Button
              onClick={() => setShowBargainingForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6"
            >
              Make an Offer
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Your Offered Price (per day)</label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={bargainPrice}
                    onChange={(e) => setBargainPrice(Number.parseInt(e.target.value))}
                    className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900"
                    min="20"
                    max={guide.hourlyRate}
                  />
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold">Send Offer</Button>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Original price: ${guide.hourlyRate}/hour | Your offer: ${bargainPrice}/day (
                  {guide.hourlyRate - bargainPrice > 0 ? "-" : ""}${Math.abs(guide.hourlyRate - bargainPrice)})
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href='/chat/1' className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold">
            💬 Message Guide
          </Link>
          <Button size="lg" variant="outline" className="flex-1 border-2 border-cyan-600 text-cyan-600 bg-transparent">
            📅 Check Availability
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  )
}