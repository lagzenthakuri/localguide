"use client"

import Link from "next/link"

interface Guide {
  id: number
  name: string
  experience: string
  location: string
  rating: number
  reviews: number
  languages: string[]
  image: string
}

interface GuideCardProps {
  guide: Guide
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guide/${guide.id}`}>
      <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={guide.image || "/placeholder.svg"}
            alt={guide.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 left-3 bg-cyan-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            Verified ✓
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{guide.name}</h3>

          <div className="flex items-center gap-1 mb-3 text-sm text-slate-600">
            <span>💼</span>
            <span>{guide.experience} experience</span>
          </div>

          <div className="flex items-center gap-1 mb-3 text-sm text-slate-600">
            <span>📍</span>
            <span>{guide.location}</span>
          </div>

          <div className="mb-3">
            <p className="text-xs text-slate-600 mb-1">Languages</p>
            <div className="flex flex-wrap gap-1">
              {guide.languages.map((lang) => (
                <span key={lang} className="text-xs bg-slate-100 text-slate-900 px-2 py-1 rounded">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="flex items-center gap-1">
              <span className="text-lg">⭐</span>
              <span className="font-semibold text-slate-900">{guide.rating}</span>
              <span className="text-xs text-slate-600">({guide.reviews})</span>
            </div>
            <button className="text-cyan-600 font-semibold hover:text-cyan-700 transition">View Profile →</button>
          </div>
        </div>
      </div>
    </Link>
  )
}
