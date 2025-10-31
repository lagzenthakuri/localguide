"use client"

import Link from "next/link"

interface Package {
  id: number
  name: string
  price: number
  duration: string
  destination: string
  rating: number
  reviews: number
  guide: { id: number; name: string; image: string }
  image: string
}

interface PackageCardProps {
  package: Package
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Link href={`/package/${pkg.id}`}>
      <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer group">
        <div className="relative h-40 overflow-hidden">
          <img
            src={pkg.image || "/placeholder.svg?height=160&width=400"}
            alt={pkg.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 font-bold text-cyan-600">
            ${pkg.price}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{pkg.name}</h3>
          <p className="text-sm text-slate-600 mb-3">
            {pkg.duration} • {pkg.destination}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <img src={pkg.guide.image || "/placeholder.svg"} alt={pkg.guide.name} className="w-8 h-8 rounded-full" />
            <p className="text-sm font-medium text-slate-900">{pkg.guide.name}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-lg">⭐</span>
              <span className="font-semibold text-slate-900">{pkg.rating}</span>
              <span className="text-slate-600">({pkg.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
