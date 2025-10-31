"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function BargainingPage() {
  const [negotiations] = useState([
    {
      id: 1,
      guideName: "Ram Chand",
      originalPrice: "$150",
      negotiatedPrice: "$120",
      status: "Accepted",
      lastMessage: "Deal accepted! Confirm your booking now.",
      date: "2 hours ago",
      packageName: "3 Day Everest Trek",
    },
    {
      id: 2,
      guideName: "Priya Sharma",
      originalPrice: "$100",
      negotiatedPrice: "$85",
      status: "Pending",
      lastMessage: "Let me check with my team...",
      date: "5 hours ago",
      packageName: "Kathmandu Heritage Tour",
    },
    {
      id: 3,
      guideName: "Rajesh Kumar",
      originalPrice: "$200",
      negotiatedPrice: "$180",
      status: "Declined",
      lastMessage: "This price is too low for this premium tour.",
      date: "1 day ago",
      packageName: "Luxury Himalayan Trek",
    },
  ])

  const statusColors = {
    Accepted: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Declined: "bg-red-100 text-red-800",
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bargaining History</h1>
          <p className="text-lg text-slate-600">Track all your price negotiations with guides</p>
        </div>

        {/* Negotiations List */}
        <div className="space-y-4">
          {negotiations.map((negotiation) => (
            <div key={negotiation.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Guide Info */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-lg">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{negotiation.guideName}</p>
                      <p className="text-sm text-slate-600">{negotiation.packageName}</p>
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="flex gap-4 items-center">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Original</p>
                    <p className="font-semibold text-slate-900 line-through">{negotiation.originalPrice}</p>
                  </div>
                  <div className="text-slate-400">→</div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Your Offer</p>
                    <p className="font-bold text-cyan-600">{negotiation.negotiatedPrice}</p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <p className="text-sm text-slate-700 truncate">{negotiation.lastMessage}</p>
                  <p className="text-xs text-slate-500 mt-1">{negotiation.date}</p>
                </div>

                {/* Status & Action */}
                <div className="flex flex-col items-end gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[negotiation.status]}`}>
                    {negotiation.status}
                  </span>
                  {negotiation.status === "Accepted" && (
                    <Link href="/booking">
                      <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 transition">
                        Confirm Booking
                      </button>
                    </Link>
                  )}
                  {negotiation.status === "Pending" && (
                    <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300 transition">
                      View Chat
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        {negotiations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-xl text-slate-600 mb-4">No negotiations yet</p>
            <p className="text-slate-500 mb-8">Start negotiating with guides to see your bargaining history here</p>
            <Link href="/packages">
              <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
                Browse Packages
              </button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
