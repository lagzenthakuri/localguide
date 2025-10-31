"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function GuideCollaborationPage() {
  const [collaborations] = useState([
    {
      id: 1,
      mainGuide: "Ram Chand",
      assistantGuide: "Deepak Gurung",
      experience: "8 years",
      specialization: "High Altitude Trekking",
      package: "5 Day Everest Summit Trek",
      rating: 4.9,
      reviews: 234,
    },
    {
      id: 2,
      mainGuide: "Priya Sharma",
      assistantGuide: "Seema Paudel",
      experience: "6 years",
      specialization: "Cultural & Heritage Tours",
      package: "Kathmandu & Panauti History Tour",
      rating: 4.8,
      reviews: 198,
    },
    {
      id: 3,
      mainGuide: "Rajesh Kumar",
      assistantGuide: "Anita Nepal",
      experience: "10 years",
      specialization: "Adventure Sports & Wildlife",
      package: "Pokhara Adventure Package",
      rating: 4.7,
      reviews: 156,
    },
  ])

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Guide Collaborations</h1>
          <p className="text-lg text-slate-600">Expert guides working together to provide exceptional experiences</p>
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborations.map((collab) => (
            <div key={collab.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
              {/* Guides Section */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Team Guides</h3>

                <div className="space-y-4">
                  {/* Main Guide */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-lg">
                      👨
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{collab.mainGuide}</p>
                      <p className="text-xs text-slate-600">Lead Guide</p>
                    </div>
                    <span className="text-xs font-bold text-cyan-600 bg-cyan-100 px-2 py-1 rounded">Lead</span>
                  </div>

                  {/* Connection Arrow */}
                  <div className="flex justify-center">
                    <div className="text-2xl">🤝</div>
                  </div>

                  {/* Assistant Guide */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-lg">
                      👩
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{collab.assistantGuide}</p>
                      <p className="text-xs text-slate-600">Assistant Guide</p>
                    </div>
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">Assist</span>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-xs text-slate-600 font-semibold mb-1">SPECIALIZATION</p>
                  <p className="font-semibold text-slate-900">{collab.specialization}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-600 font-semibold mb-1">FEATURED PACKAGE</p>
                  <p className="font-semibold text-slate-900">{collab.package}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                  <div>
                    <p className="text-amber-500 font-bold text-lg">⭐ {collab.rating}</p>
                    <p className="text-xs text-slate-600">({collab.reviews} reviews)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-600 text-xs">Combined</p>
                    <p className="text-slate-600 text-xs">Experience</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
                  View Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
