"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function MyBookingsPage() {
  const [bookings] = useState([
    {
      id: 1,
      packageName: "Taj Mahal Sunrise Tour",
      guideName: "Rajesh Kumar",
      date: "2024-11-20",
      time: "5:00 AM",
      guests: 2,
      price: "$85",
      status: "Upcoming",
      location: "Agra, India",
      rating: null,
      bookingRef: "TG-2024-001234",
    },
    {
      id: 2,
      packageName: "3 Day Everest Trek",
      guideName: "Ram Chand",
      date: "2024-11-15",
      time: "6:00 AM",
      guests: 1,
      price: "$150",
      status: "Completed",
      location: "Sagarmatha, Nepal",
      rating: 4.8,
      bookingRef: "TG-2024-001200",
    },
    {
      id: 3,
      packageName: "Kathmandu Heritage Tour",
      guideName: "Priya Sharma",
      date: "2024-11-10",
      time: "9:00 AM",
      guests: 3,
      price: "$95",
      status: "Completed",
      location: "Kathmandu, Nepal",
      rating: 4.9,
      bookingRef: "TG-2024-001150",
    },
  ])

  const statusColors = {
    Upcoming: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">My Bookings</h1>
          <p className="text-lg text-slate-600">Manage and track all your tour bookings</p>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                {/* Package Info */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{booking.packageName}</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>{booking.guideName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🔖</span>
                      <span className="font-mono text-xs">{booking.bookingRef}</span>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <p className="text-xs text-slate-600 mb-2 font-semibold">SCHEDULED</p>
                  <p className="text-lg font-bold text-slate-900">📅 {booking.date}</p>
                  <p className="text-sm text-slate-600">🕐 {booking.time}</p>
                  <p className="text-sm text-slate-600 mt-2">
                    👥 {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Price & Status */}
                <div>
                  <p className="text-xs text-slate-600 mb-2 font-semibold">PRICE</p>
                  <p className="text-2xl font-bold text-cyan-600">{booking.price}</p>
                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {booking.status === "Upcoming" && (
                    <>
                      <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 transition">
                        Contact Guide
                      </button>
                      <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300 transition">
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "Completed" && (
                    <>
                      <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 transition">
                        Leave Review
                      </button>
                      <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300 transition">
                        Book Again
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Rating Section for Completed Tours */}
              {booking.status === "Completed" && booking.rating && (
                <div className="bg-green-50 border-t border-slate-200 px-6 py-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Your Rating:</p>
                  <p className="text-2xl font-bold text-amber-500">
                    {"⭐".repeat(Math.floor(booking.rating))} {booking.rating}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-xl text-slate-600 mb-4">No bookings yet</p>
            <p className="text-slate-500 mb-8">When you book a tour, it will appear here</p>
            <Link href="/packages">
              <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
                Browse Tours
              </button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
