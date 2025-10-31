"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ReviewsPage() {
  const [reviews] = useState([
    {
      id: 1,
      touristName: "Sarah Johnson",
      guideName: "Ram Chand",
      rating: 5,
      packageName: "Everest Summit Trek",
      date: "2024-10-15",
      comment:
        "Absolutely fantastic experience! Ram was incredibly knowledgeable and made the entire trek memorable. Highly recommended!",
      verified: true,
    },
    {
      id: 2,
      touristName: "Michael Chen",
      guideName: "Priya Sharma",
      rating: 4.5,
      packageName: "Kathmandu Heritage Tour",
      date: "2024-10-10",
      comment:
        "Great cultural insights and excellent storytelling. Priya really knows the history of Kathmandu inside out.",
      verified: true,
    },
    {
      id: 3,
      touristName: "Emma Wilson",
      guideName: "Rajesh Kumar",
      rating: 5,
      packageName: "Pokhara Adventure Package",
      date: "2024-10-05",
      comment:
        "Best adventure guide I've ever had! Rajesh made everything feel safe yet thrilling. Can't wait to book another tour!",
      verified: true,
    },
    {
      id: 4,
      touristName: "David Martinez",
      guideName: "Deepak Gurung",
      rating: 4,
      packageName: "High Altitude Trekking",
      date: "2024-09-28",
      comment: "Very professional and experienced guide. Great attention to detail with altitude acclimatization.",
      verified: true,
    },
    {
      id: 5,
      touristName: "Lisa Anderson",
      guideName: "Seema Paudel",
      rating: 4.5,
      packageName: "Photography Tour",
      date: "2024-09-20",
      comment: "Fantastic photography locations! Seema knew exactly where to find the best shots. Highly creative!",
      verified: true,
    },
  ])

  const renderStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "⭐" : "")
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Tourist Reviews</h1>
          <p className="text-lg text-slate-600">See what travelers say about our guides</p>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-lg">
                      👤
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{review.touristName}</p>
                      <p className="text-sm text-slate-600">Reviewed {review.guideName}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">{renderStars(review.rating)}</div>
                  <p className="text-sm text-slate-600 font-semibold">{review.rating}/5</p>
                </div>
              </div>

              {/* Package & Date */}
              <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-slate-200">
                <span className="text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">
                  {review.packageName}
                </span>
                <span className="text-sm text-slate-600">📅 {review.date}</span>
                {review.verified && (
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    ✓ Verified Purchase
                  </span>
                )}
              </div>

              {/* Review Comment */}
              <p className="text-slate-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Review Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Overall Ratings</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">4.8</p>
              <p className="text-sm text-slate-600">Average Rating</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{reviews.length}</p>
              <p className="text-sm text-slate-600">Total Reviews</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{reviews.filter((r) => r.verified).length}</p>
              <p className="text-sm text-slate-600">Verified</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-3xl font-bold text-orange-600">98%</p>
              <p className="text-sm text-slate-600">Satisfaction</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <p className="text-3xl font-bold text-pink-600">250+</p>
              <p className="text-sm text-slate-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
