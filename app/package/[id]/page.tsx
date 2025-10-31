"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import destinationsData from "@/data/destination-data.json"
import { use } from "react"

export default function PackageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const packageId = Number.parseInt(id) || 1

  const [showBargaining, setShowBargaining] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([])
  const [messageInput, setMessageInput] = useState("")

  // Find package from JSON
  const packageData = destinationsData.packages.find(pkg => pkg.id === packageId) || destinationsData.packages[0]
  
  // Find guide from JSON
  const guide = destinationsData.guides.find(g => g.id === packageData.guideId)

  // Initialize negotiated price with package price
  const [negotiatedPrice, setNegotiatedPrice] = useState(packageData.price)

  const sendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        { role: "user", text: messageInput },
        { role: "guide", text: `Thanks for your message. Let me check that for you: "${messageInput}"` },
      ])
      setMessageInput("")
    }
  }

  if (!guide) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Package not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Package Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{packageData.name}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-amber-500">⭐ {packageData.rating}</span>
              <span className="text-sm text-slate-600">({packageData.reviews} reviews)</span>
            </div>
            <span className="text-lg font-bold text-cyan-600">${packageData.price}/person</span>
            <span className="text-slate-600">
              {packageData.duration} • {packageData.destination}
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg h-96">
          <img 
            src={packageData.image} 
            alt={packageData.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Guide Info */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Your Guide</h3>
              <div className="flex items-start gap-4">
                <img 
                  src={guide.image} 
                  alt={guide.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900">{guide.name}</h4>
                    {guide.verified && <span className="text-green-600 font-bold">✓ Verified</span>}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-amber-500">⭐ {guide.rating}</span>
                    <span className="text-slate-600">({guide.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-slate-700">Languages: {guide.languages.join(", ")}</p>
                  <p className="text-sm text-slate-600 mt-1">{guide.specialization} • {guide.experience}</p>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            {packageData.itinerary && packageData.itinerary.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Itinerary</h3>
                <div className="space-y-4">
                  {packageData.itinerary.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-cyan-600 pl-6 py-2">
                      <h4 className="font-bold text-slate-900 mb-1">
                        Day {item.day}: {item.title}
                      </h4>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions */}
            {packageData.inclusions && packageData.inclusions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {packageData.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center mt-1 flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Package Type & Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Package Details</h3>
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Type</p>
                    <p className="font-semibold text-slate-900">{packageData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Duration</p>
                    <p className="font-semibold text-slate-900">{packageData.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Budget Range</p>
                    <p className="font-semibold text-slate-900">{packageData.budgetRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Destination</p>
                    <p className="font-semibold text-slate-900">{packageData.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sticky top-24 shadow-lg">
              <div className="mb-6">
                <p className="text-sm text-slate-600 mb-1">Price per person</p>
                <p className="text-3xl font-bold text-slate-900">${negotiatedPrice}</p>
              </div>

              {!showBargaining ? (
                <div className="space-y-3">
                  <Link href="/booking">
                    <button className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition">
                      Book Now
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowBargaining(true)}
                    className="w-full border-2 border-cyan-600 text-cyan-600 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition"
                  >
                    Negotiate Price
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Your Offer: ${negotiatedPrice}
                    </label>
                    <input
                      type="range"
                      min={Math.floor(packageData.price * 0.7)}
                      max={Math.floor(packageData.price * 1.5)}
                      value={negotiatedPrice}
                      onChange={(e) => setNegotiatedPrice(Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>${Math.floor(packageData.price * 0.7)}</span>
                      <span>${Math.floor(packageData.price * 1.5)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-100 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
                    {messages.length === 0 ? (
                      <p className="text-sm text-slate-600 italic">Start negotiating with the guide...</p>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-cyan-600 text-white ml-6"
                                : "bg-white text-slate-900 mr-6 border border-slate-300"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Message guide..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 px-3 py-2 border-2 border-slate-300 rounded-lg text-sm focus:outline-none focus:border-cyan-600"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                    >
                      ➤
                    </button>
                  </div>

                  <button
                    onClick={() => setShowBargaining(false)}
                    className="w-full text-slate-600 hover:text-slate-900 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold text-slate-900">{packageData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Group Size</span>
                  <span className="font-semibold text-slate-900">1-4 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cancellation</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Guide Response</span>
                  <span className="font-semibold text-slate-900">{guide.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Similar Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destinationsData.packages
              .filter(pkg => pkg.id !== packageId && pkg.type === packageData.type)
              .slice(0, 3)
              .map(pkg => {
                const pkgGuide = destinationsData.guides.find(g => g.id === pkg.guideId)
                return (
                  <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                    <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-200 hover:shadow-xl transition cursor-pointer">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 mb-1">{pkg.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{pkg.destination}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-cyan-600">${pkg.price}</span>
                          <span className="text-sm text-amber-500">⭐ {pkg.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}