"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PackageDetail({ params }: { params: { id: string } }) {
  const [showBargaining, setShowBargaining] = useState(false)
  const [negotiatedPrice, setNegotiatedPrice] = useState(150)
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([])
  const [messageInput, setMessageInput] = useState("")

  const guide = {
    id: 1,
    name: "Ram Chand",
    rating: 4.8,
    reviews: 245,
    languages: ["English", "Nepali", "Hindi"],
    verificationBadge: true,
  }

  const package_data = {
    name: "3 Day Everest Trek",
    price: 150,
    duration: "3 days",
    destination: "Everest",
    rating: 4.8,
    reviews: 124,
    inclusions: [
      "Professional Mountain Guide",
      "Accommodation in mountain lodges",
      "All meals (breakfast, lunch, dinner)",
      "Trek permits and insurance",
      "Oxygen backup (if needed)",
      "Emergency evacuation support",
    ],
    itinerary: [
      { day: 1, title: "Base Camp Arrival", description: "Arrive at Everest Base Camp and acclimatization" },
      { day: 2, title: "Camp 1 Trek", description: "Trek to Camp 1 with stunning mountain views" },
      { day: 3, title: "Peak Preparation", description: "Preparation day and peak attempt" },
    ],
    places: [
      { name: "Everest Base Camp", location: "Nepal" },
      { name: "South Col", location: "Nepal/Tibet border" },
      { name: "Camp 1", location: "Everest" },
      { name: "Camp 2", location: "Everest" },
    ],
  }

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

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Package Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{package_data.name}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-amber-500">⭐ {package_data.rating}</span>
              <span className="text-sm text-slate-600">({package_data.reviews} reviews)</span>
            </div>
            <span className="text-lg font-bold text-cyan-600">${package_data.price}/person</span>
            <span className="text-slate-600">
              {package_data.duration} • {package_data.destination}
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg h-96 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🏔️</div>
            <p className="text-slate-600">Mountain Trekking Experience</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Guide Info */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Your Guide</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center text-2xl">👤</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900">{guide.name}</h4>
                    {guide.verificationBadge && <span className="text-green-600 font-bold">✓ Verified</span>}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-amber-500">⭐ {guide.rating}</span>
                    <span className="text-slate-600">({guide.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-slate-700">Languages: {guide.languages.join(", ")}</p>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Itinerary</h3>
              <div className="space-y-4">
                {package_data.itinerary.map((item) => (
                  <div key={item.day} className="border-l-4 border-cyan-600 pl-6 py-2">
                    <h4 className="font-bold text-slate-900 mb-1">
                      Day {item.day}: {item.title}
                    </h4>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {package_data.inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Places to Visit */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Places You'll Visit</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {package_data.places.map((place, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-slate-200 rounded-lg p-4 hover:border-cyan-600 hover:bg-cyan-50 transition"
                  >
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">📍 {place.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{place.location}</p>
                  </div>
                ))}
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
                      min="100"
                      max="250"
                      value={negotiatedPrice}
                      onChange={(e) => setNegotiatedPrice(Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>$100</span>
                      <span>$250</span>
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
                  <span className="font-semibold text-slate-900">{package_data.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Group Size</span>
                  <span className="font-semibold text-slate-900">1-4 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cancellation</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
